import connection from "../postgres.js";

export async function getRentals(req, res){
    try{
        const {customerId, gameId} = req.query;

        if(customerId){
            const findCustomer = await connection.query(`SELECT * FROM customers WHERE id=$1`, [customerId]);

            res.status(200).send(findCustomer.rows);
            return
        }
        if(gameId){
            const findGame = await connection.query(`SELECT * FROM games WHERE id=$1`, [gameId]);

            res.status(200).send(findGame.rows);
            return
        }

        const rentalsList = await connection.query(`SELECT rentals.*, games.id as "gameId", games.name as "gameName", games."categoryId" as "gameCategoryId", customers.name as "customerName", customers.id as "customerId", categories.id as "categoryId", categories.name as "categoryName" FROM rentals
        JOIN games
        ON rentals."gameId" = games.id
        JOIN customers
        ON rentals."customerId" = customers.id
        JOIN categories
        ON games."categoryId" = categories.id`);

        res.status(200).send(rentalsList.rows);
    }catch(error){
        console.log(error);
        res.status(500).send("Erro ao obter a informação.")
    };
};

export async function postRentals(req, res){
    try{
        const {customerId, gameId, daysRented} = req.body;

        const checkCustomerId = await connection.query(`SELECT * FROM customers WHERE id=$1`, [customerId]);

        if(checkCustomerId.rows.length === 0){
            res.status(400).send('Registro não encontrado no sistema')
            return
        }
        
        const checkGameId = await connection.query(`SELECT * FROM games WHERE id=$1`, [gameId]);

        if(checkGameId.rows.length === 0){
            res.status(400).send('Jogo sem registro no sistema')
            return
        }

        const availableGame = await connection.query(`SELECT "stockTotal" FROM games WHERE id=$1`, [gameId]);

        if(availableGame.rows[0].stockTotal === 0){
            res.status(400).send("Jogo não disponível");
            return
        }

        const rentDate = new Date();
        const pricePerDay = await connection.query(`SELECT "pricePerDay" FROM games WHERE id=$1`, [gameId]);
        const finalPrice = (pricePerDay.rows[0].pricePerDay)*daysRented;

        await connection.query(`INSERT INTO rentals 
        ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee") 
        VALUES ($1,$2,$3,$4,$5,$6,$7)`, 
        [customerId, gameId, rentDate, daysRented, null, finalPrice, null]);

        res.sendStatus(201);

    }catch(error){
        console.log(error);
        res.status(500).send("Erro ao obter a informação.")
    }
};

export async function finishRentals(req, res){
    try{
        const {id} = req.params;

        const checkRentId = await connection.query(`SELECT * FROM rentals WHERE id=$1`, [id]);

        if(checkRentId !== 0){
            res.status(400).send('Aluguel não consta no cadastro.')
            return
        }

        const rental = checkRentId.rows[0];

        if(rental.checkRentId){
            res.status(400).send('Aluguel finalizado!')
            return
        }else{
            const delay = new Date().getTime() - new Date(rental.rentDate).getTime();
            const delayDays = (delay / (24 * 3600 * 1000));

            let fee = 0
            if(delayDays > rental.daysRented){
                const extraDays = delayDays - rental.daysRented;
                fee = extraDays * rental.finalPrice;
                console.log("fee", extraDays);
            }
        }

        await connection.query(`UPDATE rentals SET "returnDate"=NOW(), "fee"=$1 WHERE id=$2`, [fee, id]);

        res.sendStatus(200);

    }catch(error){
        console.log(error);
        res.status(500).send("Erro ao obter a informação.")
    }
};

export async function deleteRentals(req, res){
    try{
        const {id} = req.params;
        const checkId = await connection.query(`SELECT * FROM rentals WHERE id=$1`, [id]);

        if(checkId.rows.length === 0 || checkId.rows[0].returnDate !== null){
            res.status(400).send("Aluguel não existe ou já foi finalizado")
            return
        }

        await connection.query(`DELETE FROM rentals WHERE id=$1`, [id])
        
        res.sendStatus(200);

    }catch(error){
        console.log(error);
        res.status(500).send("Erro ao obter a informação.")
    }
}