require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors=require('cors');




const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Create User Schema
const userSchema = new mongoose.Schema({
    name: String,
    
    email: String,
    age: Number,
    city: String,
    country: String
  
});

const User = mongoose.model('user', userSchema);

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/users', async (req, res) => {

  
  

  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
