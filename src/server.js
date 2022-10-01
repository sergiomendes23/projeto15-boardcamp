import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import connection from "./postgres.js";

import categoriesRouter from "../src/Routes/categoriesRouter.js";

const server = express();
server.use(cors());
server.use(express.json());
dotenv.config();

server.use(categoriesRouter);

const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));