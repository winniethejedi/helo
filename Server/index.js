const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const controller = require('./controller.js');

require('dotenv').config();

const app = express();

massive(process.env.CONNECTION_STRING)
    .then((db)=>{
        console.log('Massive connected to the database. Oh, baby!');
        app.set('db', db);
    })
    .catch(err => {
        console.warn('Massive failed to connect to the database:');
        console.error(err);
    });

app.use(cors());
app.use(bodyParser.json());
app.use(session({
    name: 'helo',
    secret: process.env.SESSION_SECRET,
    cookie: {
        //days hours minutes seconds milseconds
        expires:  5 * 24 * 60 * 60 *1000,
    },
    saveUninitialized: false,
    rolling: true,
    resave: false,
}));

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(checkDb());

app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    
    req.db.users.findOne({ username, password })
        .then(user => {
            if (!user) {
                return res.status(401).send({ success: false, message: 'It didn\'t work' });
            }
            req.session.user = user.id;
            res.send({ success: true, message: 'Logged in successfully' });
        })
        .catch(handleDbError(res));
});

app.post('/api/auth/register', (req, res) => {
    const profilePic = `https://robohash.org/${req.body.username}.png`
    const newUsername = req.body.username;
    const newPassword = req.body.password;
    const newUser = {username: newUsername, password: newPassword, profile_pic: profilePic};

    req.db.users.insert(newUser)
        .then(user => {
            req.session.user = user.id;
            console.log(req.session.user)
            res.send({ success: true, message: 'Logged in successfully' });
        })
        .catch(handleDbError(res));
});


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`The server at port ${port} is working. WooHoo!`)
});

function checkDb() {
    return (req, res, next) => {
        const db = app.get('db');
        
        if (db) {
            req.db = db;
            next();
        }
        else {
            res.status(500).send({ message: 'This died' });
        }
    };
}

function handleDbError(res) {
    return (err) => {
        console.warn('Hit a snag');
        console.error(err);
        
        if (err.code == 'ECONNRESET') {
            return res.status(500).send({ message: 'Something died again' });
        }
        if (err.code == '22P02') {
            res.status(422).send({ message: 'The request had incorrect or missing properties: ' + err.message });
        }
        res.status(500).send({ message: 'Internal Server Error' })
    };
}
