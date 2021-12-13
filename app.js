//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 4000;


app.set('view engine', 'ejs');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) =>{
    res.render("home")
})


app.listen(port, ()=>{
    console.log("Server is listening on port " + port);
});
