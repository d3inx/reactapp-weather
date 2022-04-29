import Head from 'next/head'
import react from 'react';
import Image from 'next/image'
import { useState , useEffect } from 'react';
import MyListbox from '../components/ListBox';
import styles from '../styles/Home.module.css'

const api = {
  key : '2dfcc3454fe4501551c3daff13295821',
  base : 'https://api.openweathermap.org/data/2.5/'
}

const city = [
  { name: 'Shiraz' , id:'1' , weatherCity:'Shiraz,IR' },
  { name: 'Rome' , id:'2', weatherCity:'rome,IT' },
  { name: 'California' , id:'3', weatherCity:'California,US' },
  { name: 'Tokyo'  , id:'4', weatherCity:'Tokyo,JP'},
  { name: 'Moscow' , id:'5', weatherCity:'Moscow,RU' },
  { name: 'Dubai' , id:'6', weatherCity:'Dubai,AE' },
]

export const WeatherContext = react.createContext();

export default function Home() {


  const [selected, setSelected] = useState(city[0])
  const [query , setQuery] = useState({});
  
  
  useEffect(() => {
    fetch(`${api.base}weather?q=${selected.weatherCity}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(result => setQuery(result))
    
  },[selected])  
   
  return (
    <>
      <WeatherContext.Provider value={{city , selected , setSelected}}>
        {(typeof query.main !== 'undefined') ? (
          <div className="container mx-auto h-full flex items-center justify-center flex-col lg:flex-row mt-24">
          <div className="weather-side w-2/3 lg:w-1/3 py-24 px-8 z-30">
            <div className={`weather-gradient -z-10 ${query.main.temp < 20 ? 'bg-cold' : 'bg-hot'}`}></div>
            <div className="date-container">
              <span className="location text-neutral-900">{`${selected.name} ,${query.sys.country}`}</span>
            </div>
            <div className="weather-container">
              <Image src={`http://openweathermap.org/img/wn/${query.weather[0].icon}@2x.png`} alt='weather-icon' width={100} height={100} />
              <h1 className="weather-temp">{Math.round(query.main.temp)}°C</h1>
              <h3 className="weather-desc">{query.weather[0].main}</h3>
            </div>
          </div>
          <div className=" w-2/4 lg:w-1/4 h-2/3 py-24 bg-gray-800 rounded-3xl relative px-4 lg:px-12 font-bold -top-8 lg:-left-8 -z-0 ">
            <div className="">
              <div className="">
                <div className="text-white"> <span className="title ">HUMIDITY  </span><span className="value">{query.main.humidity} %</span>
                  <div className=""></div>
                </div>
                <div className="text-white"> <span className="title ">WIND  </span><span className="value">{Math.floor(query.wind.speed)} km/h</span>
                  <div className=""></div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <MyListbox />
            </div>
          </div>
        </div>  
        ) : ('')}
      </WeatherContext.Provider> 
    </>
  )
}
