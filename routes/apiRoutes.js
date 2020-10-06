/*
GET /api/notes - Should read the db.json file and return all saved notes as JSON.


POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.


DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
*/

// IMPORT MODULES AND FILES ================================================================================

const fs = require('fs');
const db = require('../db/db.json')

//SET UP API ROUTES AND EXPORT THE MODULE ================================================================================

module.exports = function(app) {

  console.log("json database: ", db);

	//API GET request
  app.get('/api/notes', function(req, res) {
    res.json(db)
  })

	//API POST request
  app.post("/api/notes", (req, res) => {
    
    //Set the newNote obj from user input
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: (db.length + 1).toString()
    }
    //add new note to notes data
    db.push(newNote);
  
    //Write the updated notes to db.json
    fs.writeFileSync("./db/db.json", JSON.stringify(db, null, '\t')); 

    //Return newNote to user
    res.json(newNote)
  })
			
	//API DELETE request
	app.delete('/api/notes/:id', (req, res) => {

    //Remove the note with given id
    notes = db.filter((note) => note.id != req.params.id);

    //Refresh note id after deleting
    refreshID(notes);

    //Write the updated notes to db.json
    fs.writeFileSync("./db/db.json", JSON.stringify(notes, null, '\t'))

    res.json("Selected note deleted")
	});
};

function refreshID(notes) {
  notes.forEach((note, index) => {
    note["id"] = (index + 1).toString();
  })
}