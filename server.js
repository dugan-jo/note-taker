
const express = require("express");
const res = require("express/lib/response");
const { fs } = require("fs");
const uuid = require('./helpers/uuid');
const path = require("path"); //node module to help handle paths
const { randomUUID } = require("crypto");
const util = require("util")

const app = express();

//  

// PORT INFROMATION - - - - - START - - - - - PORT INFROMATION - - - - - START - - - - - PORT INFROMATION
const PORT = process.env.PORT || 5000;
// PORT INFROMATION - - - - -  END  - - - - - PORT INFROMATION - - - - -  END  - - - - - PORT INFROMATION

//

// MIDDLEWARE - - - - - START - - - - - MIDDLEWARE - - - - - START - - - - - MIDDLEWARE - - - - - START -
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public")); //STATIC FOLDER
/// MIDDLEWARE - - - - -  END  - - - - - MIDDLEWARE - - - - -  END  - - - - - MIDDLEWARE - - - - -  END -

// 

// GET ROUTE for the LANDING PAGE
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/develop/public/index.html"));
});

// GET ROUTE for the NOTES PAGE
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/develop/public/notes.html"))
});

// 

//GET REQUEST for NOTES at ./develop/db/db.json on PAGE LOAD!
app.get('/api/notes', (req, res) => {

  fs.readFile(".db/db.json", "utf8", (err, data) => {
    const savedNotes = JSON.parse(data)
    err ? console.info(err) : savedNotes;
    res.json(savedNotes);
  })
});

// 

const readFromFile = util.promisify(fs.readFile);

// POST REQUEST to add a new NOTE
app.post("/api/notes", (req, res) => {

  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  if (title && text) {
    const notes = {
      title,
      text,
      id: uuid(),
    };

    const entryString = JSON.stringify(notes);

    fs.writeFile('./develop/db/db.json', 'utf8', (err, notes) =>
    err ? console.log(err) : console.log(`SUCCESS, ${notes} has been added!`))

    const response = {
      status: "success",
      body: notes,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("ERROR in posting review");
  }
});

app.listen(PORT, () =>
  console.log(`SERVER LOCATION AT http://localhost:${PORT}`)
);

