import React from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useGetProductByHandle, useGetSelectedVariantProduct } from '../app/queries/getProducts';
import { Image, PlaceholderImage, Button, Placeholder } from 'semantic-ui-react';
import { Option, SelectedOption } from '../app/types/product';


export const ProductDetails = () => {
    const params = useParams();
    const [searchParams] = useSearchParams();

    const selectedOptions: SelectedOption[] = [];

    searchParams.forEach((value, key) => {
        selectedOptions.push({ name: key, value })
    })

    console.log(selectedOptions);
    const { data: productByHandle, error, isLoading: isLoadingByHandle } = useGetProductByHandle({ handle: params.handle ?? '' })
    const { data: productSelected, isLoading: isLoadingByProductSelected } = useGetSelectedVariantProduct({ handle: params.handle ?? '', selectedOptions })

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
            display: "flex"
        }}>
            <div style={{
                flex: "1"
            }}>
                {!isLoadingByProductSelected ? <Image src={productSelected?.variantBySelectedOptions.image.url} /> : <><Placeholder><PlaceholderImage square /></Placeholder></>}
            </div>
            <div style={{
                flex: "2"
            }}>
                <h2>{productByHandle?.title}</h2>
                <span>{price?.amount}</span>
                <Variants options={productByHandle?.options} />
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
                <>
                    <h5>{option.name}</h5>
                    {option.optionValues.map(optionValue => {
                        return (
                            <Button
                                circular
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
                </>
            )
        })
    )
}

// this export default is for lazy loading
export default ProductDetails;