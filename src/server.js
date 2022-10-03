import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import connection from "./postgres.js";

import categoriesRouter from "../src/Routes/categoriesRouter.js";
import gamesRouter from "../src/Routes/gamesRouter.js";
import costumersRouter from '../src/Routes/costumersRouter.js';

const server = express();
server.use(cors());
server.use(express.json());
dotenv.config();

server.use(categoriesRouter);
server.use(gamesRouter);
server.use(costumersRouter);

const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));