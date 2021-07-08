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

  try{
    let findData=()=>{
      let city = weather.find((city,idx)=>{
        return city.city_name.toLowerCase() === searchQuery.toLowerCase() && city.lat === Number(lat) && city.lon === Number(lon)
      })
      return city.data.map(item=>{
        return new ForeCast(item)
      }) 
    }
    res.json( findData() );
  
  }catch(error){
    res.status(500).send('something went wrong')
  }
  
});
class ForeCast{
  constructor(weatherData){
  this.date= weatherData.valid_date
  this.description= weatherData.weather.description
   }
}
app.listen(process.env.PORT) ;