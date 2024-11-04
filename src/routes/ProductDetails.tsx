import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useGetProductByHandle, useGetSelectedVariantProduct } from '../app/queries/getProducts';
import { useCreateCart } from '../app/queries/createCart';
import { useUpdateCart } from '../app/queries/updateCart';
import { Image, PlaceholderImage, Button, Placeholder, Input } from 'semantic-ui-react';
import { Option, SelectedOption } from '../app/types/product';
import { useLocalStorage } from '../app/hooks/useLocalStorage';


export const ProductDetails = () => {
    const params = useParams();
    const [searchParams] = useSearchParams();
    const [quantity, setQuantity] = useState(0);
    const [cartId, setCartId] = useLocalStorage('cart', '')
    const navigate = useNavigate();

    const selectedOptions: SelectedOption[] = [];

    searchParams.forEach((value, key) => {
        selectedOptions.push({ name: key, value })
    })

    const { data: productByHandle, error, isLoading: isLoadingByHandle } = useGetProductByHandle({ handle: params.handle ?? '' });
    const { data: productSelected, isLoading: isLoadingByProductSelected } = useGetSelectedVariantProduct({ handle: params.handle ?? '', selectedOptions });
    const { mutateAsync: createCartAsync, isLoading: isLoadingCreatingCart } = useCreateCart();
    const { mutateAsync: updateCartAsync, isLoading: isLoadingUpdatingCart } = useUpdateCart();

    if (error) {
        return (<span style={{
            color: 'red'
        }}>{error.message}</span>)
    }

    const price = productByHandle?.variants.nodes[0].price;

    if (isLoadingByHandle) {
        return <>Loading...</>
    }

    return (
        <div style={{
            display: "flex",
            margin: '10px',

        }}>
            <div style={{
                flex: "2"
            }}>
                {!isLoadingByProductSelected ? <Image src={productSelected?.variantBySelectedOptions.image.url} /> : <><Placeholder><PlaceholderImage square /></Placeholder></>}
            </div>
            <div style={{
                flex: "2",
                margin: '10px'
            }}>
                <h2>{productByHandle?.title}</h2>
                <span>{price?.amount}</span>
                <Variants options={productByHandle?.options} />
                <div style={{
                    margin: '10px 0px'
                }}>
                    <h5>Quantity</h5>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '50%'
                    }}>
                        <Button fluid color={'green'} onClick={() => setQuantity(prevQuantity => prevQuantity - 1)}>-</Button>
                        <Input style={{
                            width: '50%'
                        }} disabled value={quantity} />
                        <Button fluid color={'green'} onClick={() => setQuantity(prevQuantity => prevQuantity + 1)}>+</Button>
                    </div>
                    <div style={{
                        margin: '10px 0px'
                    }}>
                        <Button
                            style={{
                                width: '50%'
                            }}
                            color={'green'}
                            loading={isLoadingCreatingCart || isLoadingUpdatingCart}
                            disabled={quantity === 0}
                            onClick={async () => {
                                if (cartId) {
                                    const response = await updateCartAsync({
                                        cartId,
                                        merchandiseId: productSelected?.variantBySelectedOptions.id ?? '',
                                        quantity
                                    });
                                    console.log(response);
                                } else {
                                    const cartCreated = await createCartAsync({
                                        merchandiseId: productSelected?.variantBySelectedOptions.id ?? '',
                                        quantity
                                    });
                                    setCartId(cartCreated.id);
                                    console.log(cartCreated);
                                }
                                navigate('/cart');

                            }}>Add to Cart</Button>
                    </div>

                </div>
                <div>
                    <br />
                    <h5>Description</h5>
                    <span>{productByHandle?.description}</span>
                </div>

            </div>
        </div>
    );
}


interface VariantsProps {
    options?: Option[];
}

const Variants = ({ options }: VariantsProps) => {
    const [searchParams] = useSearchParams();
    const params = useParams();
    const navigate = useNavigate();

    return (
        options?.map(option => {

            return (
                <div style={{
                    margin: '0p 10px'
                }}>
                    <h5>{option.name}</h5>
                    {option.optionValues.map(optionValue => {
                        return (
                            <Button
                                color={'black'}
                                active={searchParams.has(option.name, optionValue.name)}
                                onClick={() => {
                                    searchParams.delete(option.name);
                                    searchParams.set(option.name, optionValue.name);
                                    searchParams.sort();
                                    navigate('/product-details/' + params.handle + '?' + searchParams.toString());
                                }}>
                                <span>{optionValue.name}</span>
                            </Button>
                        )
                    })}
                </div>
            )
        })
    )
}

// this export default is for lazy loading
export default ProductDetails;