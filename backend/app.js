import express from 'express';
import cors from 'cors';

import auth from './middleware/authMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

app.get("/", (req, res)=>{
    res.status(200).send(`
        <a href="${process.env.FRONTEND_URL}" target="_blank">
            Go to Frontend
        </a>
    `);
});

app.get("/welcome", auth, (req, res)=>{
    res.status(200).send("Welcome 🙌 ");
})
export default app;