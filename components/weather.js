const weather=require('../data/weather.json')
require('dotenv').config()
const WEATHER_API_KEY=process.env.WEATHER_API_KEY;
const superagent = require('superagent');
const Cache =require('./cache')
let cache=new Cache();
cache['data']=[];
 

const controlWeather=(req,res)=>{

let lat =req.query.lat
let lon =req.query.lon
let arrOfData=[]
if (lat&&lon){
  if (cache.data.length >0 ){
  
    arrOfData=cache.data.map(data=>new Weather(data))
     
    console.log('data come from cache');
       console.log('Cache hit');
    res.send(arrOfData)
  }else{ 
  
    const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
    
    
superagent.get(weatherUrl).then(weatherData => {
arrOfData = weatherData.body.data.map(data => new Weather(data));
cache['data']=weatherData.body.data
console.log('data come from api');
 console.log('Cache miss');
        res.send(arrOfData);
        if(arrOfData===0){res.status(500).send('Something went wrong')}
  }).catch(error=>res.send( error));

  }
}
   
  
};


class Weather{
    constructor(weth){
      this.description=weth.weather.description,
      this.date=weth.valid_date
      
    }
  }
  module.exports= controlWeather