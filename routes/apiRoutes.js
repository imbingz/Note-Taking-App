
// IMPORT MODULES AND FILES ================================================================================

const fs = require('fs');

const db = require('../db/db.json')

//SET UP API ROUTES AND EXPORT THE MODULE ================================================================================

module.exports = function(app) {

  //API GET request
  app.get('/api/notes', (req, res) => {
    //add id to each note when sending response 
    res.json(db.map((note, i) => ({...note, id: i + ""})))
  })

  //API POST request
  app.post("/api/notes", (req, res) => {
   
    //add new note to notes data
    db.push(req.body);
  
    //Write the updated notes to db.json
    fs.writeFileSync("./db/db.json", JSON.stringify(db, null, '\t')); 

    //Return newNote to user
    res.json(req.body)
  })
			
  //API DELETE request
  app.delete('/api/notes/:id', (req, res) => {

    //Remove the note with given id
    db.splice(req.params.id, 1)

    //Write the updated notes to db.json
    fs.writeFileSync("./db/db.json", JSON.stringify(db, null, '\t'))

    //send response back without body
    res.status(200).end();
  });
};

