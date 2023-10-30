import express from 'express'
import { routes } from './routes';
import dotenv from "dotenv"
import cors from "cors"

dotenv.config();

const app =  express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.listen(3333, () => console.log("Server init in port 3333"))