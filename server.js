const express = require('express')
const app = express()
const weatherInformation=require('./components/weather');
const movieInformation=require('./components/movies');
require('dotenv').config()

const PORT=process.env.PORT||8000;
const cors = require('cors')
app.use(cors());

  app.get('/weather',weatherInformation);

app.get('/movie', movieInformation);

app.get('/', function (req, res) {
  res.send(' Hello from The Back-End ! ❤️')
});


app.listen(PORT,()=>{
  console.log(`server started at ${PORT}`);
});