const express = require('express')
const app = express()
const port = 3001

const common = require('./common')


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})