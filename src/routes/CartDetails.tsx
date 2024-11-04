import React from 'react';
import { useGetCart } from '../app/queries/getCart';


export const CartDetails = () => {

    const cartId = JSON.parse(window.localStorage.getItem('cart') ?? '""');

    const { data, isLoading } = useGetCart({ cartId });

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (cartId === "" || !data?.lines.edges.length) {
        return <h1>Cart is empty</h1>
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '80vw',
            height: '80vh',
            overflow: 'auto'
        }}>
            <h1>Cart</h1>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '10px'
            }}>
                {data?.lines.edges.map(edge => {
                    return (
                        <div style={{
                            display: 'flex',
                            margin: '10px'
                        }}>
                            <div style={{
                                display: 'flex',
                                flex: '1'
                            }}>
                                <img src={edge.node.merchandise.image.url} height={'100px'} />
                                <div style={{
                                    marginLeft: '10px'
                                }}>
                                    <h4>{edge.node.merchandise.product.title}</h4>
                                    {edge.node.merchandise.product.selectedOrFirstAvailableVariant.selectedOptions.map(selected => {
                                        return (
                                            <div>
                                                <span>{selected.name}:{selected.value}</span>
                                            </div>
                                        );
                                    })}
                                    <div>
                                        <span>Price: {edge.node.merchandise.price.amount}</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{
                                display: 'flex',
                                flex: '1',
                                justifyContent: 'flex-end'
                            }}>
                                <span>Quantity: {edge.node.quantity}</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                flex: '1',
                                justifyContent: 'flex-end'
                            }}>
                                <span>Total: {edge.node.cost.totalAmount.amount}</span>
                            </div>

                        </div>
                    )
                })}
            </div>
            <div style={{
                display: 'flex',
                flex: '1',
                justifyContent: 'flex-end'
            }}>
                Subtotal: {data?.cost.subtotalAmount.amount}
            </div>
        </div>
    );
}

export default CartDetails;