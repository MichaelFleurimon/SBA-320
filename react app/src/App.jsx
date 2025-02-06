import React, { useEffect, useState } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Thermometer } from 'lucide-react';

const WeatherDashboard = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with your OpenWeather API key
  const API_KEY = 'c0efafbc81955cd76c554a04447d2dbf';

  // List of cities to fetch weather data for
  const cityNames = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Moscow'];

  // Function to map weather condition to an icon
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return Sun;
      case 'Clouds':
        return Cloud;
      case 'Rain':
        return CloudRain;
      case 'Snow':
        return CloudSnow;
      case 'Wind':
        return Wind;
      default:
        return Sun;
    }
  };

  // Fetch weather data for all cities
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const promises = cityNames.map(async (city) => {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`
          );
          if (!response.ok) {
            throw new Error(`Failed to fetch data for ${city}`);
          }
          const data = await response.json();
          return {
            name: city,
            temp: Math.round(data.main.temp),
            condition: data.weather[0].main,
            humidity: data.main.humidity,
            windSpeed: Math.round(data.wind.speed),
            icon: getWeatherIcon(data.weather[0].main),
          };
        });

        const weatherData = await Promise.all(promises);
        setCities(weatherData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Global Weather Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cities.map((city) => {
          const WeatherIcon = city.icon;
          return (
            <div key={city.name} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">{city.name}</span>
                  <WeatherIcon className="h-6 w-6" />
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Thermometer className="h-5 w-5 mr-2" />
                    <span className="text-2xl font-bold">{city.temp}°F</span>
                  </div>
                  <span className="text-slate-600">{city.condition}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
                  <div>
                    <span className="block">Humidity</span>
                    <span className="font-medium">{city.humidity}%</span>
                  </div>
                  <div>
                    <span className="block">Wind Speed</span>
                    <span className="font-medium">{city.windSpeed} mph</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherDashboard;