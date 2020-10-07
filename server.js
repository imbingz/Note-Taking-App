// IMPORT MODULES ================================================================================

const express = require('express');

const app = express(); 


// SET AN INITIAL PORT ======================================================================================

let PORT = process.env.PORT || 8000;

// SET UP TO HANDLE DATA PARSING AND STATIC FILES ======================================================================================

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use( express.static( __dirname + '/public' ));


// IMPORT ROUTES - ORDER IS IMPORTANT ================================================================================

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


// SET UP LISTEN EVENT ON THE SERVER ======================================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT", PORT );
})