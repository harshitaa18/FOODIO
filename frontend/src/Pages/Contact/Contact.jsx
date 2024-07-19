import React, { useState } from 'react';
import './Contact.css';
import Header from "../../Components/Header/Header";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to backend)
        setSubmitted(true);
    };

    return (
        <>
            <Header />
            <div className="contact-container">
                <h1>Contact Us</h1>
                <div className="contact-content">
                    {submitted ? (
                        <div className="thank-you-message">
                            <h2>Thank You!</h2>
                            <p>Your message has been sent successfully. We will get back to you soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="contact-form">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder='XYZ'
                                required
                            />

                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='xyz123@gmail.com'
                                required
                            />

                            <label htmlFor="subject">Subject:</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder='Just wanted to contact because'
                                required
                            />

                            <label htmlFor="message">Message:</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder='Write a text Message'
                                required
                            ></textarea>

                            <button type="submit">Send Message</button>
                        </form>
                    )}
                    <div className="map-container">
                        <iframe 
                            width="525" 
                            height="530" 
                            title="contact" 
                            src="https://maps.google.com/maps?width=525&amp;height=500&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                        >
                        </iframe>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactUs;
