/*
GET /api/notes - Should read the db.json file and return all saved notes as JSON.


POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.


DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
*/

// IMPORT MODULES AND FILES ================================================================================

const fs = require('fs');

const db = require('../db/db.json');

//SET UP API ROUTES AND EXPORT THE MODULE ================================================================================
console.log("line 18 db:", db);

module.exports = function(app) {
	//API GET request
	app.get('/api/notes', (req, res) => {
		res.json(db);
	});

	//API POST request
	app.post('/api/notes', (req, res) => {
		//Read json data file
		fs.readFile('./db/db.json', 'utf-8', (err, data) => {
			if (err) throw err;

			const notes = JSON.parse(data);

			//Add id prop to each new note saved
			if (req.body.title && req.body.text) {
				req.body['id'] = notes.length + 1;
				//Add new note to parsed data
				notes.push(req.body);
      } else {
        console.log("Enter note title and text before saving the new note.");
      }

      console.log("line 40 req.body:", req.body);

			//Write the updated notes to db.json
			fs.writeFile('./db/db.json', JSON.stringify(notes, null, '\t'), (err) => {
				if (err) throw err;

				//Send all notes to client
        res.json(req.body);
        console.log("New note saved!");
			});
		});
	});

	//API DELETE request
	app.delete('/api/notes/:id', (req, res) => {
		//Read json data file
		fs.readFile('../db/db.json', 'utf-8', (err, data) => {
			if (err) throw err;

			//Parse json data
			const notes = JSON.parse(data);

			//Remove the note with given id
			notes.filter((note) => {
				return note.id !== req.param.id;
			});

			//Write the updated notes to db.json
			fs.writeFile('../db/db.json', JSON.stringify(notes, null, '\t'), (err) => {
				if (err) throw err;
			});
		});
	});
};
