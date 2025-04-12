const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req,res) => {
    res.send("Welcome to the backend!")
});

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}')
});

let users= [
    {id: 1, name: "Eddie" },
    {id: 2, name: "Kai"}

];

app.get("/users", (req,res) => {
    res.json(users);
});

app.get("/users/:id", (req,res)=> {
    const user =users.find(u => u.id == parseInt(req.params.id));
    //user did something wrong
    if(!user) return res.status(404).json({error: "User not found"});
    res.json(user);

});

//expect json fromat 
app.post("/users", (req, res) => {
    const newUser = {
        id: users.length +1,
        name: req.body.name
    };
    users.push(newUser);
    res.status(201).json(newUser);
})

// app.put("/users/:id", (req,res)=>{
//     const user = users.find(u => u.id )

// })

//bank demo

let balance = 0 ;
let transactions = [];

app.get("/balance", (req, res)=> {
    res.json({balance});
});

app.post("/deposit", (req,res)=>{
    const amount = req.body.amount;

    if(typeof amount !== "number" || amount <= 0){
        return res.status(400).json({error: "Invalid deposit amount"})
    }

    balance += amount;
    transactions.push({
        type: "deposit",
        amount,
        date: new Date().toISOString()
    })
});

// app.post("/withdraw", (req,res)=>{
//     const amount = req.body.amount;

//     if(typeof amount !== "number" || amount <= 0){
//         return res.status(400).json({error: "Invalid deposit amount"})
//     }

//     balance -= amount;

//     // transactions.push({
//     //     type: "deposit",
//     //     amount,
//     //     date: new Date().toISOString()
//     // })
// });


