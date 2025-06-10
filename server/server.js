import express from 'express';
import { configDotenv } from 'dotenv';
import Dbconnect from './configs/dbconnect.js';
import initRouter from './routers/index.js';
import { errorHandler, notFound } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
configDotenv();

const app = express();
const port = process.env.PORT_SERVER || 3000;
app.use(
  cors({
    origin: process.env.CORS_SERVER,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
Dbconnect();
initRouter(app);
app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('SERVER E-COMMERCE ĐÃ CHẠY');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
