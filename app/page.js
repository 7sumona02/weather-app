"use client"

import Image from 'next/image';
import React, { useState } from 'react';
import { Search } from 'lucide-react';

const API_KEY = "a6e08763e9b230b2881a985af397c237";

const Page = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  async function getWeatherData() {
    console.log("button pressed");

    try {
      const serverResponse = await fetch("https://api.openweathermap.org/data/2.5/weather?" + "q=" + city + "&appid=" + API_KEY + "&units=metric");

      const data = await serverResponse.json(); // Await the json() method
      console.log(data);
      if (data?.cod === "400") throw data;
      setWeatherData(data);
    } catch (err) {
      console.log(err);
    }
  }

  console.log(city);

  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const dateOptions = {
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  const getWeatherIcon = (icon) => {
    return `https://openweathermap.org/img/w/${icon}.png`;
  };

  return (
    <div className='project h-screen w-full overflow-hidden'>

      <div className='grid grid-cols-3 h-screen overflow-hidden'>
        <div className='col-span-2 side1 relative'>
          <button className='text-zinc-100 px-20 py-10 hover:text-zinc-300 transition-all title'>find.your.weather</button>
          {weatherData && (
            <div className='text-zinc-100 flex gap-8 items-end absolute left-32 bottom-32 content'>
              <div>
                <h1 className='text-6xl font-semibold'>{weatherData.main.temp}°C</h1>
              </div>
              <div>
                <p className='text-2xl'>{weatherData.name}</p>
                <p>{new Date(weatherData.dt * 1000).toLocaleTimeString('en-US', timeOptions)} - {new Date(weatherData.dt * 1000).toLocaleDateString('en-US', dateOptions)}</p>
              </div>
              <div className='flex flex-col justify-center items-center'>
                <img className='h-14 w-14 translate-y-2' src={getWeatherIcon(weatherData.weather[0].icon)} alt={weatherData.weather[0].description} />
                <p className='capitalize'>{weatherData.weather[0].description}</p>
              </div>
            </div>
          )}
        </div>
        <div className='h-screen col-span-1 bg-zinc-700 bg-opacity-30 backdrop-blur-md rounded-lg p-8 shadow-lg'>
          <div className='flex flex-col gap-20'>
            <div className='section1'>
              <div className='flex gap-4 absolute right-4 top-4'>
                <label className="input input-bordered flex items-center gap-2 bg-transparent border-none text-white">
                  <input type="text" className="grow" placeholder="Enter location" onChange={(e) => setCity(e.target.value)} />
                </label>
                <button className="bg-emerald-400 size-12 flex items-center justify-center" onClick={() => getWeatherData()}><Search /></button>
              </div>
            </div>
            <div className='section2'>
             
            </div>
            <div className='section3'>
              {weatherData && (
                <div className='text-zinc-400 px-10 pt-[300px]'>
                  <h2 className='font-bold text-zinc-200'>Weather Details</h2>
                  <div className='translate-y-10 flex flex-col gap-4'>
                    <p>Cloudiness: {weatherData.clouds.all}%</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                    <div className='h-[1px] w-[50vh] bg-zinc-300 translate-y-4'></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page;
