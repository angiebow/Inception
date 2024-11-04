// app.js (or server.js)

// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());
app.use(fileUpload()); // Enables file uploading

// Import routes
const userRoutes = require('./routes/user');
const researchRoutes = require('./routes/research');
const paperRoutes = require('./routes/paper'); // Add this line if papers have their own route

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/research', researchRoutes);
app.use('/api/papers', paperRoutes); // Ensure this is here

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('Could not connect to MongoDB:', err));