import React, { useContext} from 'react'
import './Booktable.css'
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import table from '../Assets/table.jpg';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext'

const Booktable = () => {

    const { bookingDetails, setBookingDetails } = useContext(ShopContext);

    const handleDateChange = (date) => {
        setBookingDetails({ ...bookingDetails, date });
    };

    const handleTimeChange = (event) => {
        setBookingDetails({ ...bookingDetails, time: event.target.value });
    };

    const handlePartySizeChange = (event) => {
        setBookingDetails({ ...bookingDetails, partySize: event.target.value });
    };

  return (
    <div className='booktable'>
        <img src={table} alt="" />
        <div className='form'>
            <h1>Book a Table</h1>
            <div className="form-input">
            <Datepicker selected={bookingDetails.date} onChange={handleDateChange}  placeholderText='Date'/>
            <select name="Time" value={bookingDetails.time} onChange={handleTimeChange}>
                        <option value="5:00 PM">5:00 PM</option>
                        <option value="6:00 PM">6:00 PM</option>
                        <option value="7:00 PM">7:00 PM</option>
                        <option value="8:00 PM">8:00 PM</option>
                        <option value="9:00 PM">9:00 PM</option>
                    </select>
            <select name="Party Size" value={bookingDetails.partySize} onChange={handlePartySizeChange}>
                        <option value="2 members">2 members</option>
                        <option value="4 members">4 members</option>
                        <option value="6 members">6 members</option>
                        <option value="10 members">10 members</option>
            </select>
            </div>
            <button><Link to="/reserve" className='link-style'>Book Now</Link></button>
        </div>
    </div>
  )
}

export default Booktable