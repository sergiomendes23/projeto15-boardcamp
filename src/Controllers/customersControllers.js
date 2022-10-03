import connection from "../postgres.js";

export async function getCustomers(req, res){
    try{
        const {cpf} = req.query
        
        if(cpf){
            const cpfCustomers = await connection.query(`SELECT * FROM custumers WHERE cpf ILIKE '$1'`, [cpf]);
            
            res.send(cpfCustomers.rows);
        }else{
            const listCustomers = await connection.query(`SELECT * FROM custumers`);
            
            if(listCustomers.rows.length === 0){
                res.send("CPF inexistente ou não cadastrado!")
            }
        }
        
    }catch(error){
        res.status(500).send("Ocorreu um erro ao obter a informação.")
    };
};

export async function getOne(req, res){
    try{
        const { id } = req.params
        const idCustomer = await connection.query(`SELECT * FROM custumers WHERE id=$1`, [id]);

        if(idCustomer.rows.length === 0){
            res.status(404).send("Cliente inexistente");
        }

        res.send(idCustomer.rows[0]).status(200);

    }catch(error){
        res.status(500).send("Erro ao obter a informação.");
    }
};

export async function postCustomer(req, res){
    try{
        const {name, phone, cpf, birthday} = req.body;
        const findCPF = await connection.query(`SELECT * FROM custumers WHERE cpf=$1`, [cpf]);
        console.log("passou aqui")
        if(findCPF.rows.length === 0){
            res.status(409).status("CPF já cadastrado")
            return
        }

        const newCostumer= await connection.query(`INSERT INTO costumers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday]);

        res.status(201).send(newCostumer.rows);
    }catch(error){
        res.status(500).send("Ocorreu um erro ao obter a informação.")
    }

}