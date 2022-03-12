const express = require("express");
const res = require("express/lib/response");
const fs = require("fs");
const uuid = require('./helpers/uuid');
const path = require("path"); //node module to help handle paths
const {
  randomUUID
} = require("crypto");
const util = require("util")

const app = express();

//  

// PORT INFROMATION - - - - - START - - - - - PORT INFROMATION - - - - - START - - - - - PORT INFROMATION
const PORT = process.env.PORT || 1234;

// PORT INFROMATION - - - - -  END  - - - - - PORT INFROMATION - - - - -  END  - - - - - PORT INFROMATION

//

// MIDDLEWARE - - - - - START - - - - - MIDDLEWARE - - - - - START - - - - - MIDDLEWARE - - - - - START -
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static("public")); //STATIC FOLDER
/// MIDDLEWARE - - - - -  END  - - - - - MIDDLEWARE - - - - -  END  - - - - - MIDDLEWARE - - - - -  END -

// 

// GET ROUTE for the LANDING PAGE
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// GET ROUTE for the NOTES PAGE
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"))
});

// 

//GET REQUEST for NOTES at ./develop/db/db.json on PAGE LOAD!
app.get('/api/notes', (req, res) => {

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    // err ? console.info(err) : console.info("yes")
    // const savedNotes = JSON.parse(data)
    // res.json(savedNotes);

    if(err) {
      console.log(err) 
    } else {
      const savedNotes = JSON.parse(data)
      res.json(savedNotes);
    }
  })
});

// 

// - - - - - - - -  - - - - - - - - - - - - - - - - 

// POST request to add a review

app.post('/api/notes', (req, res) => {

  // Log that a POST request was received

  console.info(`${req.method} request received to add a review`);

  // Destructuring assignment for the items in req.body

  const { title, text } = req.body;

  // If all the required properties are present

  if (title && text) {

    // Variable for the object we will save

    const newTitle = {
      title,
      text,
      id: uuid(),
    };

    // Obtain existing reviews

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new review
        parsedNotes.push(newTitle); //needs to match what was in the if statment

        // Write updated reviews back to the file
        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated reviews!')
        );
      }
    });

    const response = {
      status: 'success',
      body: newReview,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting review');
  }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

app.post("/api/notes", (req, res) => {

  console.info(`${req.method} request received to add a note`);

  const {
    title,
    text
  } = req.body;

  if (title && text) {
    const notes = {
      title,
      text,
      id: uuid(),
    };

    const entryString = JSON.stringify(notes);

    fs.writeFile('./db/db.json', 'utf8', (err, notes) =>
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