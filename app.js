require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require("mongoose");
require('./db/conn')
const products = require("./models/productsSchema");
const DefaultData = require("./defaultdata");
const cors = require('cors')
const cookieParser = require("cookie-parser");
const router = require("./routes/router");

// middleware
app.use(express.json());
app.use(cors())
app.use(cookieParser(""));
app.use(router);

const port = process.env.PORT || 8005

if(process.env.NODE_ENV == "production"){
    app.use('/', express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
      });
}

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

DefaultData()