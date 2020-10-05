/*
The following HTML routes should be created:

  * GET `/notes` - Should return the `notes.html` file.

  * GET `*` - Should return the `index.html` file
*/



// IMPORT MODULES ================================================================================

const path = require('path');



//SET UP HTML ROUTES AND EXPORT THE MODULE ================================================================================

module.exports = function(app) {

  //Define GET `/notes` request route- Should return the `notes.html` file
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"))
  })

  //Set default route to home for all other page  request - should return the `index.html` file
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
  })

}