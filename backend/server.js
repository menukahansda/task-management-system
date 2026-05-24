import 'dotenv/config';

import app from './app.js';
import connectDB from './config/database.js';

const startServer = async() =>{
    try{
        await connectDB();
        console.log("MongoDB connected successfully");
        const PORT = process.env.API_PORT || 4000;

        app.listen(PORT, ()=>{
            console.log(`Server running on port ${PORT}`);
        })
    }catch(err){
        console.log("Failed to start server", err);
        process.exit(1);
    }
}

startServer();
