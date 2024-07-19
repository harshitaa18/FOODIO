import React, { useEffect, useState } from 'react';
import './Addreservation.css';

const Addreservation = () => {
    
    const [reservations, setReservations] = useState([]);
    
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch('http://localhost:4000/reservations');
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setReservations(data);
                } catch (error) {
                    console.error('Error fetching reservations', error);
                }
            };
    
            fetchReservations();
        }, []);
    
        return (
            <div className='add-reservation'>
                <h2>Confirmed Reservations</h2>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Occasion</th>
                            <th>Special Request</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Party Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservation) => (
                            <tr key={reservation._id}>
                                <td>{reservation.firstName}</td>
                                <td>{reservation.lastName}</td>
                                <td>{reservation.phoneNumber}</td>
                                <td>{reservation.email}</td>
                                <td>{reservation.occasion}</td>
                                <td>{reservation.specialRequest}</td>
                                <td>{new Date(reservation.date).toLocaleDateString()}</td>
                                <td>{reservation.time}</td>
                                <td>{reservation.partySize}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
};

export default Addreservation