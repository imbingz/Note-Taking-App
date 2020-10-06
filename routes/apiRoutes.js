/*
GET /api/notes - Should read the db.json file and return all saved notes as JSON.


POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.


DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
*/

// IMPORT MODULES AND FILES ================================================================================

const fs = require('fs');


// GET NOTES FOR API RESPONSE ================================================================================

let notes = getNotes()

function getNotes() {
  //use fs readFile to turn db.json 
  let data = fs.readFileSync("./db/db.json", "utf8") 
  
  //parse returned json file
  return JSON.parse(data);
}


//SET UP API ROUTES AND EXPORT THE MODULE ================================================================================
console.log('notesData: ', notes);

module.exports = function(app) {
	//API GET request
	app.get('/api/notes', (req, res) => {
		res.json(notes)
	});

	//API POST request
  app.post("/api/notes", (req, res) => {

      //set id prop for each note obj
      req.body["id"] = notes.length + 1
      //add new note to notes data
      notes.push(req.body);
    
      //Write the updated notes to db.json
      fs.writeFileSync("./db/db.json", JSON.stringify(notes, null, '\t'), "utf8");
      
      //res.json(true)
      res.json(notes);
  })

			
	//API DELETE request
	app.delete('/api/notes/:id', (req, res) => {
	
    //Remove the note with given id
    notes = notes.filter((note) => note.id !== req.params.id);

    //Write the updated notes to db.json
    fs.writeFileSync("./db/db.json", JSON.stringify(notes, null, '\t'), "utf8")

    res.json("Selected note deleted")
	});
};
