import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import connection from "./postgres.js";

const server = express();
server.use(cors());
server.use(express.json());
dotenv.config();

server.post('/categories', (req, res) => {
    const { name } = req.body;

    connection.query(`INSERT INTO categories (name) VALUES ($1)`, [name])

    return res.sendStatus(201);
})

server.get('/categories', async (req, res) => {

    const { rows } = await connection.query(`SELECT * FROM categories`)
    console.log(rows)
    return res.send(rows).status(200);
})

const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));