import express from "express";
import connectDB from './config/db.js';
import urlsRouter from './routes/urls.js';
import indexRouter from './routes/index.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", indexRouter);
app.use("/api", urlsRouter);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});