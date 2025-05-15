const express= require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

const mongoose=require('./db.js');

const app=express();

const router=require('../backend/routes.js');

const route = require('../backend/routes.js');

app.use(bodyParser.json())

app.use(cors({origin:'http://localhost:4200'}));

app.listen(3000, ()=>{
   console.log('Server started on port 3000');
});

app.use('/post', route );
