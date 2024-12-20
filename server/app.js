const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

const userRoutes = require('./routes/user');
const researchRoutes = require('./routes/research');
const paperRoutes = require('./routes/papers'); 
const commentRoutes = require('./routes/comments');
const notificationRoutes = require('./routes/notifications');
const favoriteRoutes = require('./routes/favorites'); 

app.use('/api/users', userRoutes);
app.use('/api/research', researchRoutes);
app.use('/api/papers', paperRoutes); 
app.use('/api/comments', commentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/favorites', favoriteRoutes); 

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('Could not connect to MongoDB:', err));