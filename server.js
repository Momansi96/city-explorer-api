const express = require('express') ;
const app = express() ;
const cors = require('cors');
require('dotenv').config();
const weather = require('./data/weather.json'); 
app.use(cors()) ;
 

app.get('/', (req, res)=> { res.send('Hello World') }); 

app.get('/weather', (req, res)=>{
  let lat= req.query.lat; 
  let lon= req.query.lon; 
  let searchQuery= req.query.searchQuery; 
  
  let findData=()=>{
    let city=weather.find((city,idx)=>{
      return city.city_name.toLowerCase() === searchQuery.toLowerCase()
    })
    return city.date.map(item=>{
      return new ForeCast(item)
    })
  }
  res.json( findData() );
});
 
class ForeCast{
  constructor(weatherData){
  this.date= weatherData.valid_date
  this.description= weatherData.weather.description
  

  }

}
app.listen(process.env.PORT) ;