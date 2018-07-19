import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { userRoutes } from './routes';

dotenv.config();
const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ "extended": true }));

app.use('/user', userRoutes);

export default app;
