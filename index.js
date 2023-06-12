import express from "express";

// import usersRoutes from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let users = [
    { id : 1, first_name : 'Sakshi', last_name : 'Soni', email : 'sonisakshi569@gmail.com', mobile_number : 7906050853},
    { id : 2, first_name : 'Adarsh', last_name : 'Soni', email : 'adarsh.soni41@gmail.com', mobile_number : 7906050853},
    { id : 3, first_name : 'Mamta', last_name : 'Soni', email : 'mamta123@gmail.com', mobile_number : 7906050853},
]
app.get("/", (req, res) => res.send("Welcome to the Users API!"));

app.get('/users', (req,res)=>{
    res.send(users);
});

app.get('/users/:id', (req,res)=>{
    const user = users.find(c => c.id === parseInt(req.params.id));
    if(!user)
        res.status(404).send("The user with given ID is not in database");
    res.send(user);
});

app.post('/users',(req,res)=>{
    const user = {
        id: users.length+1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        mobile_number: req.body.mobile_number

    };
    users.push(user);
    res.send(user);
});

app.post('/users/:id',(req,res)=>{
    const user = users.find((user) => user.id === parseInt(req.params.id));
    if(!user)
        return res.status(404).send("The user with given ID is not in database");
    user.email = req.body.email,
    user.mobile_number = req.body.mobile_number
    res.send(user);
});

app.delete('/users/:id',(req,res)=>{
    // const user = users.find((user) => user.id === parseInt(req.params.id));
    // if(!user)
    //     return res.status(404).send("The user with given ID is not in database");
    // const index = users.indexOf(user);
    // console.log(index);
    // users.slice(index,1);
    users = users.filter((user) => user.id !== parseInt(req.params.id));
    // res.send(user);
});

app.all("*", (req, res) =>res.send("You've tried reaching a route that doesn't exist."));

app.listen(PORT, () =>console.log(`Server running on port: http://localhost:${PORT}`));