import { useRecoilState, useRecoilValue } from 'recoil';
import imgL from '../assets/react.svg';
import QuantityCounter from './QuantityCounter';
import { CartAtom } from '../Store/Cartitemstate';
import { CartTotal } from '../Store/carttotalselector';
import { useState } from 'react';

function Cart() {

    const [cartItems,setCartItems]=useRecoilState(CartAtom);
    const cartTotal = useRecoilValue(CartTotal);
    const [lastRemoved,setLastRemoved]=useState(null);

    const RemoveCart=(id)=>{
        const removedItem=cartItems.find(item=>item.id===id);
        setLastRemoved(removedItem);
        setCartItems(cartItems.filter(item=>item.id!==id));
    }

    const UndoCart=()=>{
        if(lastRemoved){
            setCartItems([...cartItems,lastRemoved]);
            setLastRemoved(null);
        }
    };
    
    return (
        <div style={{ backgroundColor: '#f2f2f2', minHeight: '100vh', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                {/* Left Side: Shopping Cart */}
                <div style={{
                    backgroundColor: '#ffffff',
                    width: '750px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    <h2 style={{ fontFamily: 'sans-serif', fontSize: '24px', fontWeight: 'bold' }}>
                        Shopping Cart
                    </h2>
                    {lastRemoved && 
                    <button
                                        style={{
                                            marginTop: '10px',
                                            backgroundColor: 'transparent',
                                            color: '#007185',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '5px 0',
                                            fontSize: '14px',
                                            textDecoration: 'underline'
                                        }}
                                        onClick={UndoCart}
                                    >
                                        Undo
                                    </button>
                    }

                    
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} style={{
                                borderBottom: '1px solid #e0e0e0',
                                paddingBottom: '20px',
                                display: 'flex',
                                gap: '20px',
                                alignItems: 'center'
                            }}>
                                <img src={item.url || imgL} alt="product" style={{ width: '100px', height: '100px' }} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                        {item.name}
                                    </div>
                                    <div style={{ color: 'green', margin: '5px 0' }}>In stock</div>
                                    <QuantityCounter id={item.id} />
                                    <button
                                        style={{
                                            marginTop: '10px',
                                            backgroundColor: 'transparent',
                                            color: '#007185',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '5px 0',
                                            fontSize: '14px',
                                            textDecoration: 'underline'
                                        }}
                                    onClick={()=>RemoveCart(item.id)}
                                    >
                                        Delete
                                    </button>
        
                                </div>
                                <div style={{ fontWeight: 'bold' }}>₹{Number(item.price) * (item.quantity || 1)}</div>
                            </div>
                        ))
                    )}
                    

                   
                </div>

                {/* Right Side: Order Summary */}
                <div style={{
                    backgroundColor: '#ffffff',
                    width: '300px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Order Summary</h3>

                    {/* Divider */}
                    <div style={{ width: '100%', height: '1px', backgroundColor: '#e0e0e0' }} />

                    {/* Items Row */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <span>Items ({cartTotal.itemCount}):</span>
                        <span style={{ fontWeight: 'bold' }}>₹{cartTotal.formattedTotal}</span>
                    </div>

                    {/* Total Row */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        fontSize: '18px'
                    }}>
                        <span>Order Total:</span>
                        <span>₹{cartTotal.formattedTotal}</span>
                    </div>

                    {/* Proceed Button */}
                    <button style={{
                        backgroundColor: '#ffd814',
                        color: '#111',
                        padding: '12px',
                        border: '1px solid #fcd200',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}>
                        Proceed to Buy
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
