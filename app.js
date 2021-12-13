//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 4000;

const dbURL = "mongodb+srv://sinbad:1561Sinbad3389@cluster0.q94ur.mongodb.net/testPerson?retryWrites=true&w=majority";

mongoose.connect(dbURL);

const personSchema = {
    email: String,
    password: String
}

const Person = new mongoose.model("Person", personSchema);


app.set('view engine', 'ejs');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) =>{
    res.render("home")
})


app.get('/login', (req, res) =>{
    res.render("login")
})


app.get('/register', (req, res) =>{
    res.render("register")
})


app.post('/register', (req, res) =>{
    const newPerson = new Person({
        email: req.body.username,
        password: req.body.password
    });

    newPerson.save((err)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("secrets");
        }
    });
    
})

app.post('/login', (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;

    Person.findOne({email: username}, (err, foundPerson)=>{
        if(err){
            console.log(err);
        }
        else{
            if(foundPerson){
                if(foundPerson.password === password){
                    res.render("secrets");
                }
                else{
                    res.write("Incorrect password");
                    res.send();
                }
            }
        }
    })
})




app.listen(port, ()=>{
    console.log("Server is listening on port " + port);
});
