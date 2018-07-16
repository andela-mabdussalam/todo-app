import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

dotenv.config();
const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ "extended": true }));

export default app;
