import express from "express";
import cors from "cors";
import dotenv from 'dotenv';

import categoriesRouter from "../src/Routes/categoriesRouter.js";
import gamesRouter from "../src/Routes/gamesRouter.js";
import costumersRouter from '../src/Routes/costumersRouter.js';
import rentalsRouter from '../src/Routes/rentalsRouter.js'

const server = express();
server.use(cors());
server.use(express.json());
dotenv.config();

server.use(categoriesRouter);
server.use(gamesRouter);
server.use(costumersRouter);
server.use(rentalsRouter);

const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));