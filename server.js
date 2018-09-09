'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const webhook = require('./webhook')

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
	next();
});

app.post('/webhook', webhook)

app.listen((process.env.PORT || 3000), () => {
  console.log("Server is up and running...");
});

