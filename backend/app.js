const express = require('express')
const app = express()
const port = 3001

const common = require('./common')

// ROUTES
const auth = require('./routers/auth');
app.use('/auth', auth);

// START
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})