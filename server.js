const path = require('path');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');

connectDB();

const app = express();

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// cors middleware
app.use(cors({
    origin: ['http://localhost:5000', 'http://localhost:3000'],
    credentials: true
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/', (req, res) => {
    res.send({message: 'Welcome to the RandomIdeas API'});
});

const ideasRouter = require('./routes/ideas');
app.use('/api/ideas', ideasRouter);



app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})
