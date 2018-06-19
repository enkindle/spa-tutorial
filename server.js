require('dotenv').config(); // read the .env files
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Set the public folder as the root
app.use(express.static('public'));

// Allow the fornt end access to the node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// listen for HTTP requests on port 3000
app.listen(port, () => {
	console.log('listening on %d', port);
});
