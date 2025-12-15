import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './config/db.js';
import { authrouter } from './routes/auth.js';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running successfully"
  });
});

app.use("/api/v1/auth", authrouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDb();
});