import React, { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import ReactFlagsSelect from "react-flags-select";
import './Reserve.css';
import { ShopContext } from '../../Context/ShopContext';

const Reserve = () => {
    const [selected, setSelected] = useState("");
    const { bookingDetails, setBookingDetails } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        occasion: '',
        specialRequest: '',
        date: bookingDetails.date || '',
        time: bookingDetails.time || '',
        partySize: bookingDetails.partySize || '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            date: bookingDetails.date || '',
            time: bookingDetails.time || '',
            partySize: bookingDetails.partySize || '',
        }));
    }, [bookingDetails]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const response = await fetch('https://foodio-0x93.onrender.com/reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setBookingDetails({
                    ...formData,
                    date: formData.date,
                    time: formData.time,
                    partySize: formData.partySize,
                });
                await sendConfirmationEmail({ ...formData, ...data });
                setSuccess('Reservation successful!');
                setTimeout(() => {
                    window.location.href = '/confirmation';
                }, 2000);
            } else {
                setError('Failed to submit reservation. Please try again.');
            }
        } catch (error) {
            setError('Error creating reservation. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const sendConfirmationEmail = async (bookingDetails) => {
        try {
            const response = await fetch('https://foodio-0x93.onrender.com/sendConfirmationEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: bookingDetails.email,
                    bookingDetails: bookingDetails
                })
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error sending confirmation email:', error);
        }
    };

    return (
        <div>
            <Header />
            <div className="reservation">
                <div className="headingg">
                    <h2>Reservation</h2>
                    <p>Due to limited availability, we can hold this table for you for <span>5:00 minutes</span></p>
                </div>
                <div className="reserve">
                    <div className="reserve-left">
                        <h2>Data order</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                            <div className="phone-input-container">
                                <ReactFlagsSelect className="menu-flags" selected={selected} onSelect={(code) => setSelected(code)} searchable searchPlaceholder="Search countries" />
                                <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} value={formData.phoneNumber} required />
                            </div>
                            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} value={formData.email} required />
                            <select name="occasion" onChange={handleChange} value={formData.occasion} required>
                                <option value="">Select an occasion</option>
                                <option value="birthday">Birthday Party</option>
                                <option value="anniversary">Anniversary Celebration</option>
                                <option value="farewell">Farewell Party</option>
                                <option value="dinner">Normal Dinner Night</option>
                            </select>
                            <textarea name="specialRequest" placeholder="Add a special request" onChange={handleChange} value={formData.specialRequest}></textarea>
                            <button type="submit" className="confirm" disabled={loading}>Confirm Reservation</button>
                        </form>
                        {loading && <p>Submitting your reservation...</p>}
                        {error && <p className="error">{error}</p>}
                        {success && <p className="success">{success}</p>}
                    </div>
                    <div className="reserve-right">
                        <div className="details_right">
                            <h2>Reservation detail</h2>
                            <div className="details">
                                <div className="details-icons">
                                    <i className="fa-regular fa-calendar"></i>
                                    <i className="fa-regular fa-clock"></i>
                                    <i className="fa-solid fa-person"></i>
                                </div>
                                <div className="details-theory">
                                    <p>Date: {bookingDetails.date ? new Date(bookingDetails.date).toDateString() : "Not selected"}</p>
                                    <p>Time: {bookingDetails.time}</p>
                                    <p>Party Size: {bookingDetails.partySize}</p>
                                </div>
                            </div>
                        </div>
                        <div className="reserve-right-part">
                            <h2>Restaurant Information</h2>
                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reserve;
