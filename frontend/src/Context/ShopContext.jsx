import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getdefaultcart = () => {
    let cart = {};
    for (let i = 1; i < 100 + 1; i++) {
        cart[i] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getdefaultcart());
    const [allproduct, setallproduct] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error('Network response was not ok ' + resp.statusText);
                }
                return resp.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    console.log("Fetched Products:", data);
                    setallproduct(data);
                } else {
                    console.error("Fetched data is not an array:", data);
                }
            })
            .catch((error) => console.error("Error fetching products:", error));

        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/getcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
                body: "",
            })
                .then((resp) => {
                    if (!resp.ok) {
                        throw new Error('Network response was not ok ' + resp.statusText);
                    }
                    return resp.json();
                })
                .then((data) => {
                    if (Array.isArray(data)) {
                        console.log("Fetched Cart Items:", data);
                        setCartItems(data);
                    } else {
                        console.error("Fetched cart data is not an array:", data);
                    }
                })
                .catch((error) => console.error("Error fetching cart items:", error));
        }
    }, []);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId }),
            })
                .then((resp) => resp.json())
                .then((data) => console.log(data))
                .catch((error) => console.error("Error adding to cart:", error));
        }
    };

    const add = (itemId) => {
        alert(`Item ${itemId} added to cart`);
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId })
            })
                .then((resp) => resp.json()).then((data) => console.log(data));
        }
    };

    const removeFromCart = (itemId) => {
        alert(`Item ${itemId} removed from cart`);
        setCartItems((prev) => {
            const updatedCartItems = { ...prev };
            delete updatedCartItems[itemId];
            return updatedCartItems;
        });
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId })
            })
                .then((resp) => resp.json()).then((data) => console.log(data));
        }
    };

    const decre = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId })
            })
                .then((resp) => resp.json()).then((data) => console.log(data));
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const quantity = cartItems[itemId];
            if (quantity > 0) {
                const itemInfo = allproduct.find((product) => product.id === parseInt(itemId));
                if (itemInfo && itemInfo.price) {
                    totalAmount += itemInfo.price * quantity;
                } else {
                    console.log(`No product found or price is missing for itemId ${itemId}.`);
                    // Handle this case, such as showing an error message or skipping the item
                }
            }
        }
        return totalAmount;
    };

    const [voucherCode, setVoucherCode] = useState("");
    const [voucherDiscount, setVoucherDiscount] = useState(0);

    const applyVoucher = (code) => {
        if (code === "ABC" || code === "DEF" || code === "GHI") {
            // Set discount amount based on voucher code
            setVoucherCode(code);
            setVoucherDiscount(5); // Example discount amount
            return true;
        } else {
            // Invalid voucher code
            setVoucherCode("");
            setVoucherDiscount(0);
            return false;
        }
    };

    const totalPrice = getTotalCartAmount() + 20 - voucherDiscount;

    const [bookingDetails, setBookingDetails] = useState({
        date: "14 July 2024",
        time: "5:00 PM",
        partySize: "2 members",
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: 'customer@example.com',
        occasion: '',
        specialRequest: '',
    });

    const contextValue = {
        allproduct,
        totalPrice,
        setallproduct,
        bookingDetails,
        setBookingDetails,
        cartItems,
        getTotalCartAmount,
        setCartItems,
        removeFromCart,
        decre,
        add,
        addToCart,
        voucherCode,
        voucherDiscount,
        applyVoucher,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
