const server = require('../main/server');
const uuid = require('../helpers/uuid')


app.post('/api/notes', (req, res) => {
   
    const { title, text } = req.body;

    if (title && text) {
        const data = {
            title,
            text,
            id: uuid() 
        }

        const reviewData = JSON.stringify(data)

        fs.writeFile(`./db/db.json`, reviewData, (err) => {
            err ? console.log(err) : console.log(`${data} has been saved to file`)
        })
        const response = {
            status: 'success',
            body: data
        }
        console.log(response);
        res.status(201).json(response) 
    } else {
        res.status(500).json('ERROR in posting information');
    }

})

app.listen(PORT, () => 
console.log(`App listening at the http://localhost:${PORT} 🚀`)
)