import connection from "../postgres.js";

export async function postCustomer(req, res){
    try{
        const {name, phone, cpf, birthday} = req.body;
        const findCPF = await connection.query(`SELECT * FROM customers WHERE cpf=$1`, [cpf]);

        if(findCPF.rows.length !== 0){
            res.status(409).send("CPF já cadastrado")
            return
        }
        const newCostumer= await connection.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday]);
        res.status(201).send(newCostumer.rows);
        
    }catch(error){
        console.log(error)
        res.status(500).send("Ocorreu um erro ao obter a informação.")
    }
};

export async function getCustomers(req, res){
        
    try{
        const {cpf} = req.query;
        console.log("cpf: ",cpf)
        if(cpf){

            const cpfCustomers = await connection.query('SELECT * FROM customers WHERE cpf LIKE $1', [`${cpf}%`]);
            console.log('passou aqui')
            
            res.send(cpfCustomers.rows);
        }else{
            const listCustomers = await connection.query(`SELECT * FROM customers`);
            
            if(listCustomers.rows.length === 0){
                res.send("CPF inexistente ou não cadastrado!")
            }
        }
        
    }catch(error){
        console.log(error)
        res.status(500).send("Ocorreu um erro ao obter a informação.")
    };
};

export async function getOne(req, res){
    try{
        const { id } = req.params
        const idCustomer = await connection.query(`SELECT * FROM customers WHERE id=$1`, [id]);

        if(idCustomer.rows.length === 0){
            res.status(404).send("Cliente inexistente");
        }

        res.send(idCustomer.rows[0]).status(200);

    }catch(error){
        res.status(500).send("Erro ao obter a informação.");
    }
};

export async function putCustomer(req, res){
    try{
        const {name, phone, cpf, birthday} = req.body;
        const {id} = req.params;

        const findCPF = await connection.query(`SELECT * FROM customers WHERE cpf=$1 AND id<>$2`, [cpf,id]);

        if(findCPF.rows.length !== 0){
            res.status(409).send("CPF já cadastrado");
            return
        }

        const updateCustomer = await connection.query(`UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5`, [name, phone, cpf, birthday, id]);

        res.status(200).send(updateCustomer.rows);

    }catch(error){
        console.log(error);
        res.status(500).send("Ocorreu um erro ao obter a informação.")
    }

}