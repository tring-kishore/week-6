const express = require('express');             // require is noting but like an import
const db = require('./db'); // Ensure this path is correct
const bodyParser = require('body-parser');                  // to insert from postman api if we give data in postman from there if we want to take we use bodyParser
const app = express();
const port = 3000;
app.use(bodyParser.json());                          // middle ware 


// printing all the row from Accounts table
app.get('/Accounts', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Accounts');
        console.log(result.rows); // Log the result to the console
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});


// priting only one row from Accounts table by id 

// app.get('/Accounts/:id', async (req,res) =>{
//     try{
//         const {params} = req;
//         const id =  parseInt(params.id);
//         const result = await db.query(`SELECT * FROM Accounts WHERE account_id = ${id} `);
//         res.json(result.rows);
//     }
//     catch(error)
//     {
//         console.log(error);
        
//         res.status(500).send(error, "Unable to read from db");
//     }
// })

// printing all the row from Transactions

app.get('/Transactions' , async (req,res)=>{
    try{

        const result = await db.query('SELECT * FROM Transactions');
        res.json(result.rows);
        console.log("Data retrived");
    }
    catch(error)
    {
        res.status(500).send(`Unable to fetch data ${error}`);
    }
})

//printing one row by id
app.get('/Transactions/:id', async (req,res) => {
    try{
        const {params} = req;
        // console.log(params);
        const id = parseInt(params.id);
        // console.log(id);
        const result = await db.query(`SELECT * FROM Transactions WHERE transaction_id = ${id}`);
        if(!result.rows.length == 0)
        {
            res.json(result.rows);
        }
        else
        {
            res.send("There is no data in id");
        }
    }
    catch(error)
    {
        res.status(500).send("unable to fetch data");
    }
})


app.get('/transfer', async (req,res) => {
    try{
        const result = await db.query('SELECT * FROM transfer');
        res.json(result.rows);
    }
    catch(error)
    {
        res.status(500).send('Unable to fetch th data');
    }
})

app.get('/transfer/:id' , async (req,res) =>{
    try{
        const {params} = req;
        console.log(params);
        
        const id = parseInt(params.id);
        console.log(id);
        
        const result= await db.query(`SELECT * FROM transfer WHERE transfer_id = ${id}`);
        if(!result.rows.length == 0)
        {
            res.json(result.rows);
        }
        else
        {
            res.send("There is no data in the id");
        }
    }
    catch(error)
    {
        res.status(500).send('Unable to fetch data');
    }
})

app.get('/Accounts/:id', async (req,res) =>{
    try{
        const {params} = req;

        console.log(params);
        
        const id = params.id;
        console.log(id);
        
        const result = await db.query(`SELECT a.account_num , a.account_holder_name , a.balance, t.transaction_type , t.amount FROM Accounts a
                                        INNER JOIN Transactions t ON a.account_num = t.account_num
                                            WHERE a.account_num = $1`,[id]);
        if(result.rows.length !=0){
            res.json(result.rows);
        }
        else{
            res.status(404).send('Error in accounts');
        }
    }
    catch(error)
    {
        res.status(500).send('Unable to fetch data');
    }
})


// inserting a row , the value will be given in postman
app.post('/Accounts',async (req,res) => {
    try{
        const {account_num,account_holder_name,balance} = req.body;
        const result = await db.query(`INSERT INTO Accounts (account_num,account_holder_name,balance) VALUES ($1 , $2 , $3) RETURNING *` ,[account_num,account_holder_name,balance]);
        res.status(200).json(result.rows[0]);
        console.log("Inserted successfully");
    }
    catch(error)
    {
        res.status(500).send(`Unable to insert the query`);
    }    
})


// update a row , the value will be given in postman
app.put('/Accounts', async (req,res) => {
    try{
        const {balance,account_id}  = req.body;
        const result = await db.query(`UPDATE Accounts SET balance = $1 WHERE account_id = $2`,[balance,account_id]);
        res.status(200).json(result.rows[0]);
    }
    catch(error)
    {
        res.status(500).send('Unable to update');
    }
})

// deleting a row 
app.delete('/Accounts', async (req,res) =>{
    try{
        const {account_id} = req.body;
        const result = await db.query(`DELETE FROM Accounts WHERE account_id = $1`,[account_id]);
        res.status(200).json(result.rows[0]);
    }
    catch(error)
    {
        res.status(500).send('Unable to delete data');
    }
})

app.listen(port, () => {
    console.log(`The port is running on ${port}`);
});