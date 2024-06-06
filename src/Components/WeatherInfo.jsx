import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TypingAnimation from "../Components/ui/typing-animation";
import RetroGrid from '../Components/ui/retro-grid'
import Tooltip from './Tooltip';

function WeatherForm() {

    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCurrentLocationWeather = async (latitude, longitude) => {
            try {
                const options = {
                    method: 'GET',
                    url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
                    params: { q: `${latitude},${longitude}` },
                    headers: {
                        'X-RapidAPI-Key': '59c4bf489dmsh068ed231235424ap1695cfjsna2971bd258c2',
                        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
                    }
                };
                const response = await axios.request(options);
                setWeatherData(response.data);
                setError(null);
            } catch (error) {
                setError('Error al obtener los datos del clima');
                setWeatherData(null);
            }
        };

        const handleSuccess = (position) => {
            const { latitude, longitude } = position.coords;
            getCurrentLocationWeather(latitude, longitude);
        };

        const handleError = () => {
            setError('No se pudo obtener la ubicación');
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
        } else {
            setError('La geolocalización no es compatible con este navegador');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const options = {
                method: 'GET',
                url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
                params: { q: city },
                headers: {
                    'X-RapidAPI-Key': '59c4bf489dmsh068ed231235424ap1695cfjsna2971bd258c2',
                    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
                }
            };
            const response = await axios.request(options);
            setWeatherData(response.data);
            setError(null);
        } catch (error) {
            setError('Error al obtener los datos del clima');
            setWeatherData(null);
        }
    };

    return (
        <>
            <header className='flex flex-col justify-center items-center py-10 px-10 font-normal text-lg gap-10'>
                <TypingAnimation
                    className="text-4xl font-bold text-black dark:text-white"
                    text="Weather App"
                />
                <div className='flex flex-row border border-gray-300 rounded-lg justify-center items-center'>
                    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
                        <label
                            htmlFor="cityInput"
                            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                        >
                            Search
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="cityInput"
                                placeholder="Search a city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            <button
                                type="submit"
                                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
                <RetroGrid />
            </header>



            <article className='flex justify-center items-center px-10 py-2 w-full h-full relative'>
                <Tooltip text="Click for more info!">
                    {weatherData && (
                        <Link to={`/city/${weatherData.location.name}`} className="flex flex-row py-10 justify-around items-center rounded-lg p-4 h-70 w-80 bg-gradient-to-r from-blue-400 to-purple-600 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                            {error && <p className="text-red-500">{error}</p>}
                            <div className='flex flex-col gap-2'>
                                <p className='text-4xl font-bold text-white'>{weatherData.current.temp_c}°</p>
                                <div className='flex flex-row gap-x-4'>
                                    <p className="text-white">H: {weatherData.forecast.forecastday[0].day.maxtemp_c}°</p>
                                    <p className="text-white">L: {weatherData.forecast.forecastday[0].day.mintemp_c}°</p>
                                </div>
                                <p className="text-white">{weatherData.location.name}, {weatherData.location.country}</p>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <img src={weatherData.current.condition.icon} alt="Weather Icon" className="h-16" />
                            </div>
                        </Link>
                    )}
                    {error && <p className="text-red-500">{error}</p>}
                </Tooltip>
            </article>
        </>
    );
}

export default WeatherForm;

