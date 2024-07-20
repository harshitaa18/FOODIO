import React, { useContext, useState } from 'react';
import './Basket.css';
import { ShopContext } from '../../Context/ShopContext';
import add_icon_green from '../Assets/add_icon_green.png';
import remove_icon_red from '../Assets/remove_icon_red.png';
import { Link } from 'react-router-dom';

const Basket = () => {
    const { cartItems, decre, addToCart, allproduct, removeFromCart, getTotalCartAmount, voucherDiscount, applyVoucher } = useContext(ShopContext);
    const [enteredVoucher, setEnteredVoucher] = useState("");
    const [checkoutError, setCheckoutError] = useState(null);

    const handleApplyVoucher = () => {
        const success = applyVoucher(enteredVoucher.toUpperCase());
        setEnteredVoucher(""); // Clear the input field
    
        if (success) {
            alert('Voucher applied successfully!');
        } else {
            alert('Failed to apply voucher. Please check the code and try again.');
        }
    };    

    const handleCheckout = () => {
        try {
            const totalPrice = getTotalCartAmount() + 20 - voucherDiscount;
            const cartItemsData = allproduct
                .filter(item => cartItems[item.id] > 0)
                .map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: cartItems[item.id],
                    total: item.price * cartItems[item.id]
                }));

            localStorage.setItem('totalPrice', totalPrice);
            localStorage.setItem('cartItems', JSON.stringify(cartItemsData));
        } catch (error) {
            console.error('Error handling checkout:', error);
            // Handle error, e.g., display error message to user
            setCheckoutError('Failed to proceed to checkout');
        }
    };

    return (
        <div className='basket'>
            <div className="basket-items">
                <div className="basket-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {allproduct.map((item) => {
                    if (cartItems[item.id] > 0) {
                        return (
                            <div key={item.id}>
                                <div className="basket-title basket-items-item">
                                    <img src={item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>${item.price}</p>
                                    <div className='icons'>
                                        <img className='decre' onClick={() => decre(item.id)} src={remove_icon_red} alt="" />
                                        <p>{cartItems[item.id]}</p>
                                        <img className='add' onClick={() => addToCart(item.id)} src={add_icon_green} alt="" />
                                    </div>
                                    <p>${item.price * cartItems[item.id]}</p>
                                    <i className="fa-regular fa-trash-can" onClick={() => removeFromCart(item.id)}></i>
                                </div>
                                <hr />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            <div className="basket-bottom">
                <div className="basket-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="basket-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="basket-total-details">
                            <p>Delivery Fee</p>
                            <p>${20}</p>
                        </div>
                        <hr />
                        <div className="basket-total-details">
                            <p>Voucher</p>
                            <p>${voucherDiscount}</p>
                        </div>
                        <hr />
                        <div className="basket-total-details">
                            <p>Total</p>
                            <p>${getTotalCartAmount() + 20 - voucherDiscount}</p>
                        </div>
                    </div>
                    <button onClick={handleCheckout}>
                        <Link to='/checkout' className='link-style'>Proceed To Checkout</Link>
                    </button>
                    {checkoutError && <p className="error-message">{checkoutError}</p>}
                </div>
                <div className="voucher">
                    <div>
                        <p>If you have a Voucher, Enter it here!</p>
                        <div className="voucher-add">
                            <input
                                type="text"
                                placeholder="Enter voucher code"
                                value={enteredVoucher}
                                onChange={(e) => setEnteredVoucher(e.target.value)}
                            />
                            <button onClick={handleApplyVoucher}>+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Basket;
