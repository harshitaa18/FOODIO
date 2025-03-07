require('dotenv').config();
const port = process.env.PORT || 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');
const Razorpay = require('razorpay');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(cors({
    origin: 'https://foodio-frontend-zlgk.onrender.com', // Allow requests from your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}));

const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));

//api creation
app.get("/",(req,res)=>{
    res.send("Express App is running")
})

const fs = require('fs');
const uploadDir = path.join(__dirname, 'upload', 'images');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Initialize multer
const upload = multer({ storage });

// Serve static files from the 'upload/images' folder
app.use('/images', express.static(uploadDir));

// Upload endpoint for images
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `https://foodio-0x93.onrender.com/images/${req.file.filename}`
    });
});

//schema for creating products
const Product = mongoose.model("Product",{
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
})

app.post('/addproduct', async (req, res) => {
    try {
        // Fetch existing products to determine the new product ID
        let products = await Product.find({});
        let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        // Ensure the filename is being received from the client
        const { name, image_filename, category, price } = req.body;

        if (!image_filename) {
            return res.status(400).json({
                success: false,
                message: 'Image filename is required'
            });
        }

        // Construct the image URL
        const image_url = `https://foodio-0x93.onrender.com/images/${image_filename}`;

        const product = new Product({
            id: id,
            name: name,
            image: image_url, // Use the constructed image_url
            category: category,
            price: price,
        });

        console.log(product);

        await product.save();
        console.log('Product saved');

        res.json({
            success: true,
            name: name,
        });
    } catch (error) {
        console.error('Error saving product:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});


app.post('/removeproduct', async (req,res)=>{
    await Product.findOneAndDelete({id: req.body.id});
    console.log("removed");
    res.json({
        success: true,
        name: req.body.name,
    })
})

app.get('/allproducts', async (req, res) => {
    const response = await Product.find({});
    res.send(response);
});

const Users = mongoose.model("Users",{
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

app.post('/signup',async (req,res)=>{

    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success: false,error: "existing user found with same email id"})
    }
    let cart = {};
    for(let i=0;i<100;i++){
        cart[i]=0;
    }
    const user = new Users({
        name:req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data,'secret_ecom');
    res.json({success: true,token})
})

app.post('/login',async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user: {
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success: true,token})
        }
        else{
            res.json({
                success:false,errors: "wrong password"
            });
        }
    }
    else{
        res.json({
            success: false,errors: "wrong email id"
        })
    }
})
//creating middleware to fetch user
const fetchuser = async (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors: "Please authenticate using valid token"})
    }
    else{
        try{
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        }catch(error){
            res.status(401).send({errors: "please authenticate using valid token"})
        }
    }
}
//creating endpoint for cartdata
app.post('/addtocart',fetchuser, async(req,res)=>{
    let userdata = await Users.findOne({_id:req.user.id});
    userdata.cartData[req.body.itemId] +=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userdata.cartData});
    res.send("Added");
})

app.post('/removefromcart',fetchuser, async(req,res)=>{
    let userdata = await Users.findOne({_id:req.user.id});
    if(userdata.cartData[req.body.itemId]>0)
    userdata.cartData[req.body.itemId] -=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userdata.cartData});
    res.send("Removed");
})

app.post('/getcart',fetchuser,async(req,res)=>{
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

const Reservation = mongoose.model('Reservation',{
    firstName: 
        {   type: String,
            required: true 
        },
    lastName: 
        {   type: String,
            required: true 
        },
    phoneNumber: 
        {   type: String,
            required: true 
        },
    email: 
        {   type: String, 
            required: true 
        },
    occasion: 
        {   type: String, 
            required: true 
        },
    specialRequest: 
        {   type: String, 
        },
    date: 
        {   type: Date, 
            required: true 
        },
    time: 
        {   type: String, 
            required: true 
        },
    partySize: 
        {   type: String, 
            required: true 
        },
})

app.post('/reservation', async (req, res) => {
    try {
        const newReservation = new Reservation(req.body);
        await newReservation.save();
        res.status(201).json(newReservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/reservations', async (req, res) => {
    try {
        const reservations = await Reservation.find({});
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/delete-reservation', async (req,res)=>{
    await Reservation.findOneAndDelete({id: req.body.id});
    console.log("removed");
    res.json({ message: 'Reservation deleted successfully' });
})

// Create transporter using nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.GMAIL_HOST,
    port: process.env.GMAIL_PORT,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

app.post('/sendConfirmationEmail', async (req, res) => {
    const { email, bookingDetails } = req.body;

    // Email content
    let mailOptions = {
        from: {
            name: 'foodio',
            address: process.env.GMAIL_USER
        },
        to: email,
        subject: 'Reservation Confirmation',
        html: `<p>Your reservation has been confirmed!</p>
               <p>Date: ${new Date(bookingDetails.date).toDateString()}</p>
               <p>Time: ${bookingDetails.time}</p>
               <p>Party Size: ${bookingDetails.partySize}</p>`
    };

    try {
        // Send email
        let info = await transporter.sendMail(mailOptions);
        
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info)); // Log preview URL
        
        res.status(200).send('Confirmation email sent'); // Send success response to client
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        res.status(500).send('Error sending confirmation email'); // Send error response to client
    }
});

app.post('/processPayment', async (req, res) => {
    const { email, cartItems, totalPrice } = req.body;

    // Email content
    let mailOptions = {
        from: {
            name: 'foodio',
            address: process.env.GMAIL_USER
        },
        to: email,
        subject: 'Order Confirmation',
            html: ` <h2>Thank you so much for your purchase</h2>
                    <p>Your order has been confirmed! You will receive your order as soon as possible.</p>
                    <p>Purchased items: ${JSON.stringify(cartItems)}</p>
                    <p>Total Price: $${totalPrice}</p>`
    };

    try {
        // Send email
        let info = await transporter.sendMail(mailOptions);
        
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info)); // Log preview URL
        
        res.status(200).send('Confirmation email sent'); // Send success response to client
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        res.status(500).send('Error sending confirmation email'); // Send error response to client
    }
});

app.post('/send', async (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: email,
        to: {
            name: 'foodio',
            address: process.env.GMAIL_USER
        },
        subject: `Contact Form Submission: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    try {
        // Send email
        let info = await transporter.sendMail(mailOptions);
        
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info)); // Log preview URL
        
        res.status(200).send('Confirmation email sent'); // Send success response to client
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        res.status(500).send('Error sending confirmation email'); // Send error response to client
    }
});

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

app.post('/createOrder', async (req, res) => {
    const { amount, currency } = req.body;

    try {
        const options = {
            amount: amount, // amount in smallest currency unit
            currency: currency,
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create order' });
    }
});

app.listen(port,(error)=>{
    if(!error)
        console.log("Server Running on port "+port);
    else
        console.log("Error : "+error);
})