const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
let idCounter = 1;
const users = [
    {
        id:1,
        name:"kishore",
        age : 21,
        city:"kallikudi"
    }
]

app.get('/users',(req,res) =>{
    res.status(200).json(users);
})

app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    const userId = parseInt(id);
    console.log(userId);
    const result = users.find((user) => user.id === userId);
    if (result) {
        res.send(result);
    } else {
        res.status(404).send("User not found");
    }
});

app.post('/users' , (req,res) =>{
    const {name , age , city} = req.body;
    const newuser = {id : ++idCounter, "name" : name , "age" : parseInt(age) , "city" : city}
    users.push(newuser);
    res.send("Inserted Successfully");
})

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const userId = parseInt(id);
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex !== 0) {
        users.splice(userIndex, 1);
        res.status(200).send('User deleted successfully');
    } else {
        res.status(404).send("User not found");
    }
});

app.put('/users/:id', (req,res) => {
    const {params} = req;
    const id = parseInt(params.id);
    const {name,age,city} =req.body;

    console.log(id);
    if(!id)
    {
        res.status(500).send("user not found");
    }
    const user = users.find((user) => user.id == id);
    user.name = name;
    user.age = age;
    user.city = city;
    res.status(200).send('Updated successfully');
})

app.listen(port , ()=>{
    console.log(`the port is running in ${port}`);
    
})