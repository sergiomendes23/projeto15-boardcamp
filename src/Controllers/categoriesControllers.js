import connection from "../postgres.js";

export async function postCategories(req, res){

    try{
        
        const { name } = req.body;
        const {rows: categorieName} = await connection.query(`SELECT * FROM categories WHERE LOWER(name)=LOWER($1)`, [name]);

        if(categorieName.length != 0){
            res.status(409).send('Essa categoria já existe');
            return
        }

        connection.query('INSERT INTO categories (name) VALUES ($1)', [name]);

        return res.sendStatus(201);

    }catch(error){
        return res.status(400);
    }
}
    

export async function getCategories(req, res){
    try{
        const { rows } = await connection.query(`SELECT * FROM categories`);

        return res.send(rows).status(200);

    }catch (error){
        return res.status(500).send("Ocorreu um erro ao obter a informação.");
    }
    
}

