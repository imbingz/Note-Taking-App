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

  //API GET request 
  app.get('/api/notes', (req, res) => {
    //Read json data file 
    fs.readFile('../db/db.json', "utf-8", (err, data) => {
      if (err) throw err;
    //Send data json file
      res.json(data)
    })
  })

  //API POST request 
  app.post('/api/notes', (req, res) => {
    //Read json data file 
    fs.readFile('../db/db.json', "utf-8", (err, data) => {
      if (err) throw err;
    
      const notes = JSON.parse(data)
      
      //Add new note to parsed data
      notes.push(req.body)

      //Write the updated notes to db.json
      fs.writeFile('../db/db.json', JSON.stringify(notes, null, '\t'), err => {
        if (err) throw err;
      })

      res.json(notes)
  })

  //API DELETE request 
  
    app.delete('/api/notes/:id', (req, res) => {
    
  })

}