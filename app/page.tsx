"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const API_KEY = "762ab43071067db34fa20f7f0d5ba384";

export default function Home() {
  const [cityName, setCityName] = useState("halifax");
  const [temp, setTemp] = useState(0);
  const [weather, setWeather] = useState("");
  // const [icon, setIcon] = useState("");
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [pressure, setPressure] = useState(0);

  useEffect(() => {
    // fetch data from API
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
      )
      .then((res) => {
        console.log(res.data);
        setTemp(res.data.main.temp);
        setTemp(Number((res.data?.main?.temp - 273.15).toFixed(2)));
        setWeather(res.data?.weather[0]?.main);
        setHumidity(res.data?.main?.humidity);
        setWind(res.data?.wind?.speed);
        setPressure(res.data?.main?.pressure);
      });
  }, [cityName]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Weather App</h1>
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <input
            className="border border-gray-400 rounded-md p-2"
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white rounded-md p-2 ml-2"
            onClick={() => setCityName(cityName)}
          >
            Search
          </button>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <p>{weather}</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p>Temperature: {temp}</p>
            <p>Humidity: {humidity}</p>
            <p>Wind: {wind}</p>
            <p>Pressure: {pressure}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
