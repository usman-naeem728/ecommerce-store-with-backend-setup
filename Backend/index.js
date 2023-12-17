const coonectToMongo = require('./db.js');
const express = require('express')
const cors = require('cors')
coonectToMongo();

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/cart', require('./routes/cart.js'));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})