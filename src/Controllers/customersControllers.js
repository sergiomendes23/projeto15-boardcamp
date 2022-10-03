import connection from "../postgres.js";

export async function getCustomers(req, res){
    try{
        const {cpf} = req.query
        console.log(cpf)
        if(cpf){
            const cpfCustomers = await connection.query(`SELECT * FROM custumers WHERE cpf ILIKE '$1'`, [cpf]);

            res.send(cpfCustomers.rows);
        }else{
            const listCustomers = await connection.query(`SELECT * FROM custumers`);

            if(listCustomers === 0){
                res.send("CPF inexistente ou não cadastrado!")
            }
        }
    }catch(error){
        res.status(500).send("Ocorreu um erro ao obter a informação.")
    }
}