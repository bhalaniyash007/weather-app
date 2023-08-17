"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

// MUI Icons
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import CompressOutlinedIcon from "@mui/icons-material/CompressOutlined";
import { TextField } from "./components";
import { error } from "console";

const API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;

const WEATHER_CONDITIONS = {
  Thunderstorm: {
    icon: "/icons/rain.png",
    color: "#616161",
  },
  Drizzle: {
    icon: "/icons/drizzle.png",
    color: "#616161",
  },
  Rain: {
    icon: "/icons/rain.svg",
    color: "#616161",
  },
  Snow: {
    icon: "/icons/snow.png",
    color: "#616161",
  },
  Mist: {
    icon: "/icons/mist.png",
    color: "#616161",
  },
  Smoke: {
    icon: "/icons/mist.png",
    color: "#616161",
  },
  Haze: {
    icon: "/icons/mist.png",
    color: "#616161",
  },
  Dust: {
    icon: "/icons/mist.png",
    color: "#616161",
  },
  Fog: {
    icon: "/icons/mist.png",
    color: "#616161",
  },
  Sand: {
    icon: "/icons/mist.png",
    color: "#616161",
  },
  Ash: {
    icon: "/icons/mist.png",
    color: "#616161",
  },
  Squall: {
    icon: "/icons/mist.png",
    color: "#616161",
  },
  Tornado: {
    icon: "/icons/mist.png",
    color: "#616161",
  },
  Clear: {
    icon: "/icons/clear.png",
    color: "#616161",
  },
  Clouds: {
    icon: "/icons/clouds.png",
    color: "#616161",
  },
};

interface Quote {
  quote: string;
  author: string;
  category: string;
}

const QUOTE = [
  {
    quote: "It is always the simple that produces the marvelous.",
    author: "Amelia Barr",
    category: "inspirational",
  },
];
const DataCard = ({
  icon,
  title,
  data,
}: {
  icon: React.ReactNode;
  title: string;
  data: string;
}) => {
  return (
    <>
      <div className="flex flex-row gap-5 items-center justify-center">
        <div className="flex items-center justify-center w-10 h-10 p-5 text-white opacity-60">
          <div className="w-50 h-50">{icon}</div>
        </div>
        <div className="flex flex-col items-left justify-center text-white opacity-60 font-poppins">
          <p className="text-lg">{title}</p>
          <p className="text-2xl font-semibold">{data}</p>
        </div>
      </div>
    </>
  );
};

export default function Home() {
  const [cityName, setCityName] = useState("");
  const [temp, setTemp] = useState(0);
  const [weather, setWeather] = useState("");
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [weatherIcon, setWeatherIcon] = useState("");
  const [weatherCondition, setWeatherCondition] = useState("");
  const [quote, setQuote] = useState<Quote>({
    quote: "",
    author: "",
    category: "",
  });

  const searchButtonClickHandler = () => {
    setCityName(cityName.toLowerCase());
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
      )
      .then((res) => {
        console.log(res.data);
        setTemp(res.data.main.temp);
        setTemp(Number((res.data?.main?.temp - 273.15).toFixed(0)));
        setWeather(res.data?.weather[0]?.main);
        setHumidity(res.data?.main?.humidity);
        setWind(res.data?.wind?.speed);
        setPressure(res.data?.main?.pressure);
        // map weather condition to icon
        setWeatherCondition(res.data?.weather[0]?.main);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const TemperatureDataCard = ({ temperature }: { temperature: number }) => {
    return (
      <>
        <DataCard
          icon={<DeviceThermostatOutlinedIcon sx={{ width: 50, height: 50 }} />}
          title="Temperature"
          data={`${temperature}°C`}
        />
      </>
    );
  };

  const HumidityDataCard = ({ humidity }: { humidity: number }) => {
    return (
      <>
        <DataCard
          icon={<WaterDropOutlinedIcon sx={{ width: 50, height: 50 }} />}
          title="Humidity"
          data={`${humidity}%`}
        />
      </>
    );
  };

  const WindDataCard = ({ windSpeed }: { windSpeed: number }) => {
    return (
      <>
        <DataCard
          icon={<AirOutlinedIcon sx={{ width: 50, height: 50 }} />}
          title="Wind"
          data={`${windSpeed}m/s`}
        />
      </>
    );
  };

  const PressureDataCard = ({ pressure }: { pressure: number }) => {
    return (
      <>
        <DataCard
          icon={<CompressOutlinedIcon sx={{ width: 50, height: 50 }} />}
          title="Pressure"
          data={`${pressure}hPa`}
        />
      </>
    );
  };

  useEffect(() => {
    axios
      .get("https://api.api-ninjas.com/v1/quotes?category=inspirational", {
        headers: {
          "X-Api-Key": process.env.NEXT_PUBLIC_QUOTES_API_KEY,
        },
      })
      .then((response: any) => {
        setQuote(response.data[0]);
      })
      .catch((error) => {
        console.log("Quotes Error: ", error);
      });
  }, []);

  return (
    <main>
      <Image
        src="/images/background.jpg"
        alt="background"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />

      <div className="absolute z-1 flex items-center justify-center bg-gradient-to-t from-black to-transparent h-[100vh] lg:h-[100vh] w-full">
        <div className="flex flex-col items-center justify-center gap-10">
          <TextField
            label="Enter city name"
            value={cityName}
            onChangeHandler={(e) => setCityName(e.target.value.toLowerCase())}
            placeholder="Enter city name"
            onClickHandler={searchButtonClickHandler}
            onMouseDownHandler={searchButtonClickHandler}
          />

          <div className="flex flex-col items-left justify-center text-white opacity-60 font-poppins gap-2 mx-52">
            <p className="text-xl">{`" ${quote.quote} "`}</p>

            <p className="text-center opacity-80">{`- ${quote.author}`}</p>
          </div>

          <div className="flex flex-col items-center justify-center bottom-32 absolute gap-10">
            <div className="flex flex-row gap-40 items-center justify-center">
              <TemperatureDataCard temperature={temp} />
              <HumidityDataCard humidity={humidity} />
              <WindDataCard windSpeed={wind} />
              <PressureDataCard pressure={pressure} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
