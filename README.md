# Foodio

Foodio is an online platform for booking reservations and managing payments for your dining experience. This project is built with a React frontend and an Express backend, integrating with Razorpay for payment processing and Ethereal for sending email confirmations.

## Features

- **Reservation System**: Allows users to book reservations with details like name, phone number, email, occasion, and special requests.
- **Email Confirmation**: Sends a confirmation email to users after booking a reservation.
- **Payment Processing**: Integrates with Razorpay to handle payments securely.
- **Admin Portal**: Allows admins to view and manage reservations.
- **Sign-up and Login**: Allows users to signin and login to their accounts and can access their previously saved data.

## Technologies Used

- **Frontend**: React
- **Backend**: Express
- **Database**: MongoDB
- **Email Service**: Ethereal
- **Payment Gateway**: Razorpay

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/foodio.git
    cd foodio
    ```

2. Install the dependencies for both frontend and backend:

    ```bash
    npm install
    cd client
    npm install
    cd ..
    ```

3. Create a `.env` file in the root directory and add your credentials:

    ```plaintext
    # MongoDB
    MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/Foodio

    # Ethereal
    ETHEREAL_HOST=smtp.ethereal.email
    ETHEREAL_PORT=587
    ETHEREAL_USER=your_ethereal_user
    ETHEREAL_PASS=your_ethereal_pass

    # Razorpay
    RAZORPAY_KEY_ID=your_razorpay_key_id
    RAZORPAY_KEY_SECRET=your_razorpay_key_secret
    ```

4. Start the backend server:

    ```bash
    npm start
    ```

5. Start the frontend server:

    ```bash
    cd client
    npm start
    ```

6. Open your browser and go to `http://localhost:3000` to view the application.

## Usage

1. **Booking a Reservation**:
    - Navigate to the reservation page.
    - Fill in the required details: name, phone number, email, occasion, special requests, date, and time.
    - Submit the form to book a reservation.

2. **Payment**:
    - Choose a payment method: Cash on Delivery, BCA Virtual Account, Credit Card, or PayPal.
    - Complete the payment process through the chosen method.
    - Receive a confirmation email after successful booking.

3. **Admin Portal**:
    - Navigate to the admin portal to view and manage reservations.
    - Update or delete reservations as needed.

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, please contact:

- Name: [Harshita Sharma]
- Email: [harshita1874@gmail.com]

---

Thank you for using Foodio!
