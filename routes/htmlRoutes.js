const server = require('../main/server.js');

// this is loading the html page on the browser 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

// this is loading the information from the db.json file.
app.get('/api/db', (req, res) => {
    res.json(`${req.method} request to recieve data`);
})

module.exports = htmlRoutes;