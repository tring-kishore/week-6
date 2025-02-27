const express = require('express');
const db = require('./db');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
async function insertAccount(account_num,account_holder_name,balance)
{
    console.log(`hello`);
    
    const result = await db.query(`INSERT INTO Accounts (account_num , account_holder_name , balance) VALUES ($1 , $2 , $3) RETURNING *`,[account_num,account_holder_name,balance]);
    console.log(result);
    
    return result.rows[0];
}

app.post('/Accounts' , async (req,res) =>{
    try{
        const {account_num,account_holder_name,balance} = req.body;
        const ans = await insertAccount(account_num,account_holder_name,balance);
        console.log(ans);
        
        res.status(200).json(ans);
    }
    catch(error)
    {
        res.status(500).send(`Unable to insert data`);
    }
})

app.get('/Accounts' , async (req,res) =>{
    try{
        const result = await db.query('SELECT * FROM Accounts');
        res.status(200).json(result.rows);
    }
    catch(error)
    {
        res.status(500).send(`unable to fetch data`);
    }
})

app.get('/Transactions',async (req,res) =>{
    try{
        const result = await db.query('SELECT * FROM Transactions');
        res.status(200).json(result.rows);
    }
    catch(error)
    {
        res.status(500).send("Failed to fetch");
    }
})

//function to withdraw
async function withdrawAmount(account_num,amount)
{
    const updateAccount = await db.query(`UPDATE Accounts SET balance = balance - $1 WHERE account_num = $2`,[amount,account_num]);
    const insertTransaction = await db.query(`INSERT INTO Transactions (account_num,transaction_type,amount) VALUES ($1 , $2 , $3)`,[account_num,"withdraw",amount]);

}

//function for deposit
async function depositAmount(account_num,amount) {
    const updateAccount = await db.query(`UPDATE Accounts SET balance = balance + $1 WHERE account_num = $2` , [amount,account_num]);
    const insertTransaction = await db.query(`INSERT INTO Transactions (account_num , transaction_type , amount) VALUES ($1 , $2 , $3)` ,[account_num,"deposit",amount]);
}

//calling deposit function
app.post('/deposit' ,async (req,res) =>{
    const {account_num,amount} = req.body;
    try{
        await depositAmount(account_num,amount);
        res.status(200).json({message : "deposited successfully"});
    }
    catch(error)
    {
        res.status(500).send({message : "amount did not deposited"});
    }
})

//callingwithdraw function
app.post('/withdraw', async (req,res) =>{
    const {account_num,amount} = req.body;
    try{
        await withdrawAmount(account_num,amount);
        res.status(200).json({message : "withdrawal successfully"})
    }
    catch(error)
    {
        res.status(500).json({message :"failed to withdraw money"});
    }
})



app.listen(port , ()=>{
    console.log(`the port is running in ${port}`);
    
})