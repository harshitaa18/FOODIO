import React, { useState, useEffect } from 'react';
import './Checkout.css';
import Header from "../../Components/Header/Header";

const Checkout = () => {
    const [processingPayment, setProcessingPayment] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        name: '',
        phoneNumber: '',
        email: '',
        message: ''
    });

    useEffect(() => {
        const storedTotalPrice = localStorage.getItem('totalPrice');
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedTotalPrice) {
            setTotalPrice(Number(storedTotalPrice));
        }
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    const loadRazorpayScript = async () => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://foodio-0x93.onrender.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
            document.body.appendChild(script);
        });
    };

    const handleOrderNow = async () => {
        setProcessingPayment(true);

        try {
            const res = await loadRazorpayScript();
            if (!res) {
                throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
            }

            const orderData = await fetch('https://foodio-0x93.onrender.com/createOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: totalPrice * 100, // Amount in paise for Razorpay
                    currency: 'INR',
                }),
            }).then((t) => t.json());

            const options = {
                key: 'rzp_test_093iaYQK2ilZ2b', // Replace with your Razorpay key ID
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'Your Company Name',
                description: 'Test Transaction',
                order_id: orderData.id,
                handler: async (response) => {
                    const email = shippingAddress.email || 'customer@example.com'; // Replace with actual customer email

                    const emailData = {
                        email,
                        cartItems,
                        totalPrice,
                    };

                    const result = await fetch('https://foodio-0x93.onrender.com/processPayment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(emailData),
                    }).then((t) => t.json());

                    if (result.error) {
                        alert('Failed to send confirmation email');
                    } else {
                        alert('Payment processed and confirmation email sent');
                        // Navigate or perform any other action after order completion
                    }

                    setProcessingPayment(false);
                },
                prefill: {
                    name: shippingAddress.name || 'Harshita Sharma', // Replace with actual user data
                    email: shippingAddress.email || 'harshita1874@gmail.com', // Replace with actual user data
                    contact: shippingAddress.phoneNumber || '9329776989', // Replace with actual user data
                },
                theme: {
                    color: '#3399cc',
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error('Error processing payment:', error);
            alert('Failed to process payment. Please try again later.');
            setProcessingPayment(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress({
            ...shippingAddress,
            [name]: value
        });
    };

    return (
        <>
            <Header />
            <div className='checkout'>
                <h2>Checkout</h2>
                <div className="checkout-details">
                    <h3>Shipping address</h3>
                    <input type="text" name="address" placeholder='Add Address' value={shippingAddress.address} onChange={handleInputChange} />
                    <input type="text" name="name" placeholder='Name' value={shippingAddress.name} onChange={handleInputChange} />
                    <input type="number" name="phoneNumber" placeholder='Phone Number' value={shippingAddress.phoneNumber} onChange={handleInputChange} />
                    <input type="email" name="email" placeholder='Email address' value={shippingAddress.email} onChange={handleInputChange} />
                    <textarea name="message" placeholder="Message" value={shippingAddress.message} onChange={handleInputChange}></textarea>
                    <button onClick={handleOrderNow} disabled={processingPayment}>
                        {processingPayment ? 'Processing...' : `Order Now ($${totalPrice.toFixed(2)})`}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Checkout;
