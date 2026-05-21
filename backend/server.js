import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import connectDB from './config/database.js';

const startServer = async() =>{
    await connectDB();

    const PORT = process.env.API_PORT || 4000;

    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    })
}

startServer();
