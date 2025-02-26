// const express = require('express');
// const app = express();
// const port = 3000;

// app.get('/' , (req,res) => {
//     res.send('Welcome to the new express');
// })
// app.listen(port , ()=> {
//     console.log("Hello new world ends..");
// })

// using params

// const express = require('express');
// const app = express();
// const port = 3000;
// app.get('/user/:name' , (req,res) => {
//     const name = req.params.name;
//     res.send(`Hello world ${name}`);
// })
// app.get('/user/:id' , (req,res) => {

//     const id = req.params.id;
//     res.send(`the id is ${id}`);
// })
// app.listen(port , () => {
//     console.log(`the port is ${port}`);
// })

let arr = [{
    "id":"1",
    "name":"kishore",
    "age":"21",
},
{
    "id":"2",
    "name":"morgan",
    "age":"35",
},
{
    "id":"3",
    "name":"buttler",
    "age":"34",
},
{
    "id":"4",
    "name":"root",
    "age":"33",
}]

const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req,res) => {
    res.send(arr);
})

app.get('/:id', (req,res) => {
    const id = req.params.id;
    const item = arr.find((element) => element.id === id);
    if(item)
    {
        res.send(item);
    }
    else
    {
        res.status(404).send('Item not found');
        
    }
})

app.listen(port , ()=>{
    console.log(`The port is running in ${port}`);
    
})