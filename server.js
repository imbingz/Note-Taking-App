//The application should have a db.json file on the backend that will be used to store and retrieve notes using the fs module.


// IMPORT MODULES AND FILES ================================================================================

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express(); 

// require("./routes/htmlRoutes")(app);
// require("./routes/apiRoutes")(app);


// SET AN INITIAL PORT ======================================================================================

let PORT = process.env.PORT || 8080;

// SET UP MIDDLEWARES TO HANDLE DATA PARSIING ======================================================================================

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static('public'))


// SET UP LISTEN EVENT ON THE SERVER ======================================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT", PORT );
})