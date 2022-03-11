const express = require('express');
const path = require('path');
const fs = require('fs');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes')

// PORT INFROMATION 
const PORT = process.env.PORT || 3001

const app = express();

// MIDDLEWARE - - - - - - - - - - - - - - - - - - - - - - - - -
app.use('/api', apiRoutes);
app.use('/html', htmlRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
// MIDDLEWARE - - - - - - - - - - - - - - - - - - - - - - - - -





module.exports = app
