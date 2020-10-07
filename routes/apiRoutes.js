
// IMPORT MODULES AND FILES ================================================================================

const fs = require('fs');


//SET UP API ROUTES AND EXPORT THE MODULE ================================================================================

function data() {
  return JSON.parse(fs.readFileSync("./db/db.json", "utf8"))
}

module.exports = function(app) {

  //API GET request
  app.get('/api/notes', function(req, res) {
    res.json(data())
  })

  //API POST request
  app.post("/api/notes", (req, res) => {
    let db = data();
    //Set the newNote obj from user input
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: Date.now() + ""
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
  let db = data();
  //Remove the note with given id
  db = db.filter((note) => note.id !== req.params.id);

  //Write the updated notes to db.json
  fs.writeFileSync("./db/db.json", JSON.stringify(db, null, '\t'))

  res.json(db)
  });
};

