import connection from "../postgres.js";

export async function postGames(req, res) {
    try{
        const {name, image, stockTotal, categoryId, pricePerDay} = req.body

        connection.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)', [name, image, stockTotal, categoryId, pricePerDay]);

        return res.sendStatus(201);
    }catch(error){
        res.status(500).send("Ocorreu um erro ao obter a informação.")
    }
}

export async function getGames(req, res) {
    try{
        const { name } = req.query
        
        if(name){
            const listGame = await connection.query(`SELECT * FROM games WHERE name ILIKE '${name}%'`);
            console.log(listGame)
        if(listGame.rows.length !== 0){
            res.status(200).send(listGame.rows)
            return
        }
        }else{
            const listGame = await connection.query(`SELECT games.*, categories.name as categoryName FROM games JOIN categories ON games."categoryId" = categories.id`);
            
            res.status(200).send(listGame.rows);
        }
    }catch(error){
        res.status(500).send("Erro ao obter a informação.")
    }
}