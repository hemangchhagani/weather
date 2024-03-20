import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { Button , Table } from 'react-bootstrap';

const WeatherForecast = () => {

    const navigate = useNavigate(); 
  // State to hold the weather forecast data
  const [forecastData, setForecastData] = useState(null);
  // State to handle loading and error status
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


 const BackButton = (e) => {
     navigate('/');
  };

 

   const convertUnixToDate = (unixTimestamp) => {
    // Create a new Date object with the timestamp multiplied by 1000 to convert to milliseconds
    const date = new Date(unixTimestamp * 1000);
    // Return the formatted date string
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };



  useEffect(() => {
    // Function to fetch weather forecast data
    const fetchWeatherData = async () => {
      try {
        // Send GET request to the OpenWeatherMap API endpoint
       
        const cityName= localStorage.getItem('city'); 
        const apiKey = '883a5313182e08a20bdc33f9075caa1f';
        const response = await fetch(
           `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`
        );

        // Check if the response is successful
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        // Parse response body as JSON
        const jsonData = await response.json();

        // Set forecastData state with fetched data
        setForecastData(jsonData);
        // Set loading to false, indicating data fetching is complete
        setLoading(false);
      } catch (error) {
        // Set error state if request fails
        setError(error.message);
        // Set loading to false, indicating data fetching is complete (even if it failed)
        setLoading(false);
      }
    };

    // Call fetchWeatherData function when component mounts
    fetchWeatherData();
  }, []);

  // JSX to render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // JSX to render error state
  if (error) {
    return <div><Button onClick={() => BackButton()}>Back</Button>
    Error: {error}</div>;
  }

  // JSX to render fetched weather forecast data
  return (
    <div>
    <Button onClick={() => BackButton()}>Back</Button>
    <div>
      {/* Map through forecast data and display */}
      {forecastData.list.map((item, index) => (
        <div key={index}  class="divider" >
          <p>Date: {convertUnixToDate(item.dt)}</p>

          <p>temp: {item.main.temp}</p>
           <p>feels_like: {item.main.feels_like }</p>
           <p>Temperature min: {item.main.temp_min }</p>
           <p>Temperature max : {item.main.temp_max }</p>
           <p>Sea level  : {item.main.sea_level }</p>


          <p>City: {forecastData.city.name}</p>
          <p>Country: {forecastData.city.country}</p>
          
          {/* Display other weather data */}
          {/* For example: <p>Temperature: {item.main.temp}</p> */}
         ===============================================================
        </div>
        
      ))}

    </div>

    </div>
  );
};

export default WeatherForecast;
