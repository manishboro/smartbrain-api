const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const saltRounds = 10;
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : '1999',
        database : 'smartbrain'
    }
});

app.get('/', (req,res) => { res.send(db.database) })

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, bcrypt, db, saltRounds)})

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})

app.put('/image', (req, res) => image.handleImage(req, res, db));

app.post('/imageurl', (req, res) => image.handleApiCall(req, res));

app.listen(3001, () => { console.log('app is running at port 3001') });