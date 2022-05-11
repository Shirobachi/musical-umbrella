require('dotenv').config(); // for environment variables

const express = require('express') // Import express
var app = express() // Create an instance of express
const bp = require('body-parser') // Import body-parser
const port = process.env.PORT || 3001 // Set port

// For body purpose
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

// ROUTES
const auth = require('./routers/auth');
app.use('/auth', auth);

// START
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})