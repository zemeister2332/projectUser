const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// mongodb connection ----------------------------------
mongoose.connect('mongodb://localhost/project',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
const db = mongoose.connection;

db.once('open', () => {
    console.log("Mongo DB is Connected");
});
db.on('error', (err) => {
    console.log(err)
});
// mongo db close ----------------------------------------
// express chaqiridi
const app = express();

// body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Model chaqirildi
const User = require('./model/User');

// static folderla
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// public set static
app.use(express.static(path.join(__dirname, 'public')));

//
app.get('/', (req,res) => {
      User.find({}, (err, users) => {
        if (err){
            console.log(err)
        }else{
            res.render('index', {
                title: 'Users',
                users: users
            })
        }
    });

});

// Bosh sahifa routi
app.get('/users/add', (req,res) => {
    res.render('add_user', {
        title: 'Add User'
    });
});

app.post('/users/add', (req,res) => {
    const user = new User();
    user.title = req.body.title;
    user.author = req.body.author;
    user.body = req.body.body;

    user.save((err) => {
       if (err)
           console.log(err);
       else
           res.redirect('/');
    });

});

app.listen(3000, () => {
    console.log("Server ishga tushdi !!!");
});