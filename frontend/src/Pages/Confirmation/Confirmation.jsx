import React, { useEffect, useContext, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './Confirmation.css';
import Header from "../../Components/Header/Header";
import bg from '../../Components/Assets/bg.jpg';
import bgo from '../../Components/Assets/bgo.avif';
import { Link } from 'react-router-dom';

const Confirmation = () => {
    const { bookingDetails, setBookingDetails } = useContext(ShopContext);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Booking details in Confirmation:", bookingDetails); // Debug log
    }, [bookingDetails]);

    const remove_reservation = async (id) => {
        try {
            const response = await fetch('https://foodio-0x93.onrender.com/delete-reservation', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            if (result.message === 'Reservation deleted successfully') {
                setBookingDetails(null); // Clear the booking details in context
                alert('Reservation canceled successfully');
            } else {
                setError('Failed to cancel the reservation. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting reservation:', error);
            setError('Failed to cancel the reservation. Please try again.');
        }
    };

    if (!bookingDetails) {
        return (
            <>
                <Header />
                <div className='reservation-confirmm'>
                    <h1>Reservation Cancelled</h1>
                    <p style={{ backgroundImage: `url(${bgo})` }}>Your reservation has been successfully cancelled.</p>
                    <button><Link to="/menu" className='link-style'>Order Online</Link></button>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className='reservation-confirm'>
                <h1>Reservation Confirmation</h1>
                {error && <p className='error-message'>{error}</p>}
                <div className='upper-part' style={{ backgroundImage: `url(${bg})` }}>
                    <div className="grp">
                        <i className="fa-regular fa-square-check"></i>
                        <h1>Reservation has been confirmed</h1>
                    </div>
                    <div className="grp">
                        <i className="fa-regular fa-calendar"></i>
                        <p>The confirmation result has been sent to your email</p>
                    </div>
                </div>
                    <div className="reservation-buttons">
                        <button className='cancel' onClick={() => remove_reservation(bookingDetails.id)}>Cancel<i className="fa-solid fa-ban"></i></button>
                    </div>
            </div>
        </>
    );
};

export default Confirmation;
