const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config({ path: './.env' });

const DB = process.env.DATABASE;

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected! DB host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log('MongoDB connection ERROR:', error);
    }
};

const app = express();
app.use(express.json());
app.use(cors());


app.get('/api/hello', (req, res) => {
    res.send('Hello world from apiserver');
});

app.use(require('./Routes/logs'));


connectDB().then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`SERVER RUNNING AT PORT: ${process.env.PORT || 5000}`);
    });
}).catch((error) => {
    console.log('MONGO DB CONNECTION FAILED:', error);
});
