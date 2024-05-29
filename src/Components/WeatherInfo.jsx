import axios from 'axios';
import { Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import TypingAnimation from "../Components/ui/typing-animation";
import RetroGrid from '../Components/ui/retro-grid'

function WeatherForm() {

    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);


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
            <header className='flex flex-col justify-center items-center py-10 px-10 font-normal text-lg'>
                <TypingAnimation
                    className="text-4xl font-bold text-black dark:text-white"
                    text="Weather App"
                />
                <div className='flex py-10'>
                    <form onSubmit={handleSubmit} className="mb-4">
                        <div className="flex">
                            <input
                                type="text"
                                id="cityInput"
                                placeholder='Search for a city'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                            />
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none text-sm">Search</button>
                        </div>
                    </form>
                </div>
                <RetroGrid />
            </header>

            <article className='flex justify-center items-center px-10 py-2 w-full h-full relative'>

                {weatherData && (
                    <Link to={`/city/${weatherData.location.name}`} className="flex flex-row py-10 justify-around items-center  rounded-lg p-4 h-70 w-80 bg-gray-200">
                        {error && <p className="text-red-500">{error}</p>}
                        <Suspense fallback={<div>Cargando...</div>}>
                            <div className='flex flex-col gap-2'>
                                <p className='text-3xl font-bold'>{weatherData.current.temp_c}°</p>
                                <div className='flex flex-row gap-x-4'>
                                    <p>H: {weatherData.forecast.forecastday[0].day.maxtemp_c}°</p>
                                    <p>L: {weatherData.forecast.forecastday[0].day.mintemp_c}°</p>
                                </div>
                                <p>{weatherData.location.name}, {weatherData.location.country}</p>
                            </div>
                            <div>
                                <img src={weatherData.current.condition.icon} alt="Weather Icon" />
                            </div>
                        </Suspense>
                    </Link>
                )}
            </article>
        </>
    );
}

export default WeatherForm;



