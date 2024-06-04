import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import SunsetIcon from "../assets/Icons/sunset.svg"
import PrecipitationIcon from "../assets/Icons/droplet.svg"
import HumidityIcon from "../assets/Icons/ripple.svg"
import FeelIcon from "../assets/Icons/temperature.svg"
import VisibilityIcon from "../assets/Icons/eye.svg"
import WindIcon from "../assets/Icons/wind.svg"
import MoonIcon from "../assets/Icons/moon.svg"
import SunIcon from "../assets/Icons/sun.svg"
import BackIcon from "../assets/Icons/back.svg"


function CityDetail() {

    const { cityName } = useParams();
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const options = {
                    method: 'GET',
                    url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
                    params: { q: cityName },
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

        fetchWeatherData();
    }, [cityName]);

    const [currentIndex, setCurrentIndex] = useState(0);

    if (!weatherData || !weatherData.forecast || !weatherData.forecast.forecastday) {
        return <p>Loading data...</p>;
    }

    const hours = weatherData.forecast.forecastday[0]?.hour || [];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % hours.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + hours.length) % hours.length);
    };

    const getVisibleSlides = () => {
        const start = currentIndex;
        const end = start + 5;
        return hours.slice(start, end);
    };

    const visibleSlides = getVisibleSlides();

    return (
        <>


            <nav className='flex justify-start items-start text-start text-black px-10 py-10 bg-light-sky-blue'>
                <Link to="/" >
                    <img src={BackIcon} className=' h-10' />
                </Link>
            </nav>

            <header className='flex justify-center px-10 py-10  bg-light-sky-blue'>
                <section className='flex flex-col relative  items-center justify-center overflow-hidden rounded-lg border bg-background p-8 md:shadow-xl bg-white'>
                    <div className='flex flex-col gap-4 text-center font-bold leading-none tracking-tighter bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-transparent pointer-events-none z-10 whitespace-pre-wrap'>
                        <h2 className='text-lg font-medium'>{weatherData.location.name}, {weatherData.location.country}</h2>
                        <div className='flex flex-row justify-center gap-4 text-lg font-medium'>
                            <p>H: {weatherData.forecast.forecastday[0].day.maxtemp_c}°C</p>
                            <p>L: {weatherData.forecast.forecastday[0].day.mintemp_c}°C</p>
                        </div>
                        <p className='text-2xl'>{weatherData.current.temp_c}°C</p>
                        <p className='text-lg'>{weatherData.current.condition.text}</p>
                        <p className='text-md'>{weatherData.location.localtime}</p>
                    </div>
                </section>
            </header>


            <article className='flex flex-col justify-center items-center text-center py-10 gap-10 bg-l bg-light-sky-blue  dark:bg-gray-900 shadow-lg'>
                {error && <p className="text-red-500">{error}</p>}
                {weatherData && (
                    <>
                        <main className='grid grid-cols-1 sm:grid-cols-2 gap-4 py-10'>
                            <section className="flex flex-col justify-start items-start gap-2 rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 shadow-lg transition-all duration-300">
                                <header className='flex flex-row gap-x-2 items-center'>
                                    <img src={SunsetIcon} alt='Sunset icon' className="w-8 h-8" />
                                    <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Sunrise</h1>
                                </header>
                                <div>
                                    <p className="text-gray-600 dark:text-gray-300">{weatherData.forecast.forecastday[0].astro.sunrise}</p>
                                </div>
                                <div>
                                    <p className="text-base text-gray-600 dark:text-gray-300">Sunset: {weatherData.forecast.forecastday[0].astro.sunset}</p>
                                </div>
                            </section>


                            <section className="flex flex-col justify-start items-start gap-2 rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 shadow-lg transition-all duration-300">
                                <header className='flex flex-row gap-x-2 items-center'>
                                    <img src={PrecipitationIcon} alt='precipitation icon' className="w-8 h-8" />
                                    <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">PRECIPITATION</h1>
                                </header>
                                <div className='flex flex-col justify-start items-start'>
                                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{weatherData.forecast.forecastday[0].hour[0].precip_mm} mm</p>
                                    <h3 className="text-base text-gray-600 dark:text-gray-300">in last 24h</h3>
                                </div>
                            </section>

                            <section className="flex flex-col justify-start items-start gap-4 rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 shadow-lg transition-all duration-300">
                                <header className='flex flex-row gap-x-2 items-center'>
                                    <img src={HumidityIcon} alt='humidity icon' className="w-8 h-8" />
                                    <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">HUMIDITY</h1>
                                </header>
                                <div className='flex flex-col gap-2 justify-center items-start'>
                                    <p className="text-base text-gray-800 dark:text-gray-100">Chance of rain: {weatherData.forecast.forecastday[0].hour[0].chance_of_rain}%</p>
                                    <p className="text-base text-gray-800 dark:text-gray-100">Chance of snow: {weatherData.forecast.forecastday[0].hour[0].chance_of_snow}%</p>
                                    <p className="text-base text-gray-800 dark:text-gray-100">Max Humidity: {weatherData.forecast.forecastday[0].day.avghumidity}%</p>
                                </div>
                            </section>

                            <section className="flex flex-col justify-start items-start gap-4 rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 shadow-lg transition-all duration-300">
                                <header className='flex flex-row gap-x-2 items-center'>
                                    <img src={FeelIcon} alt='feels like icon' className="w-8 h-8" />
                                    <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">FEELS LIKE</h1>
                                </header>
                                <div className='flex flex-col gap-2 justify-center items-start'>
                                    <p className="text-base text-gray-800 dark:text-gray-100">C° {weatherData.forecast.forecastday[0].hour[0].feelslike_c}</p>
                                    <p className="text-base text-gray-800 dark:text-gray-100">F° {weatherData.forecast.forecastday[0].hour[0].feelslike_f}</p>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{weatherData.forecast.forecastday[0].hour[0].condition.text}</p>
                            </section>

                            <section className="flex flex-col justify-start items-start gap-4 rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 shadow-lg transition-all duration-300">
                                <header className='flex flex-row gap-x-2 items-center'>
                                    <img src={VisibilityIcon} alt='visibility icon' className="w-8 h-8" />
                                    <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">VISIBILITY</h1>
                                </header>
                                <div className='flex flex-col gap-2'>
                                    <p className="text-base text-gray-800 dark:text-gray-100">{weatherData.forecast.forecastday[0].hour[0].vis_km} KM</p>
                                    <p className="text-base text-gray-800 dark:text-gray-100">{weatherData.forecast.forecastday[0].hour[0].vis_miles} Miles</p>
                                </div>
                            </section>

                            <section className="flex flex-col justify-start items-start gap-4 rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 shadow-lg transition-all duration-300">
                                <header className='flex flex-row gap-x-2 items-center'>
                                    <img src={SunIcon} alt='sun icon' className="w-8 h-8" />
                                    <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">UV INDEX</h1>
                                </header>
                                <div>
                                    <p className="text-base text-gray-800 dark:text-gray-100">{weatherData.forecast.forecastday[0].hour[0].uv}</p>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">The UV index measures the strength of the sun`s ultraviolet radiation. Higher values indicate greater potential for damage to your skin and eyes.</p>
                            </section>

                            <section className="flex flex-col justify-start items-start gap-4 rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 shadow-lg transition-all duration-300">
                                <header className='flex flex-row gap-x-2 items-center'>
                                    <img src={WindIcon} alt='wind icon' className="w-8 h-8" />
                                    <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">WIND</h1>
                                </header>
                                <div className='flex flex-row  gap-x-4 text-sm'>
                                    <div>
                                        <p className='text-4xl text-gray-800 dark:text-gray-100'>{weatherData.forecast.forecastday[0].hour[0].wind_kph}</p>
                                        <h2 className="text-base text-gray-600 dark:text-gray-300">KM/H</h2>
                                        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">Wind Speed</h3>
                                    </div>
                                    <div>
                                        <p className='text-4xl text-gray-800 dark:text-gray-100'>{weatherData.forecast.forecastday[0].hour[0].gust_kph}</p>
                                        <h2 className="text-base text-gray-600 dark:text-gray-300">KM/H</h2>
                                        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">Gusts</h3>
                                    </div>
                                </div>
                                <hr className="w-full border-t border-gray-500" />
                                <p className="text-sm text-gray-600 dark:text-gray-300">Wind speed refers to the average speed of the wind over a given period of time, while gusts are sudden increases in wind speed that occur for short durations. Both are important factors to consider when assessing weather conditions and their potential impact.</p>
                            </section>


                            <section className="flex flex-col justify-start items-start gap-4 rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 shadow-lg transition-all duration-300">
                                <header className='flex flex-row gap-x-2 items-center'>
                                    <img src={MoonIcon} alt='moon icon' className="w-8 h-8" />
                                    <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{weatherData.forecast.forecastday[0].astro.moon_phase}</h1>
                                </header>
                                <div className="flex flex-col justify-start  items-start text-sm text-gray-800 dark:text-gray-100">
                                    <p>Illumination: {weatherData.forecast.forecastday[0].astro.moon_illumination}%</p>
                                    <p>Next Moonrise: {weatherData.forecast.forecastday[0].astro.moonrise}</p>
                                    <p>Next Moonset: {weatherData.forecast.forecastday[0].astro.moonset}</p>
                                    <p>Is Sun Up: {weatherData.forecast.forecastday[0].astro.is_sun_up ? 'Yes' : 'No'}</p>
                                </div>
                                <hr className="w-full border-t border-gray-500" />
                                <p className="text-sm text-gray-600 dark:text-gray-300">The moon phase indicates the fraction of the moon`s disk that is illuminated. It is an important factor in determining tides and has cultural significance in many societies.</p>
                            </section>
                        </main>


                        <section className='flex flex-col items-center bg-Light-Sky-Blue-2 rounded-lg py-4 md:py-8'>
                            <h1 className='text-xl font-bold mb-2 md:mb-4 text-gold'>Forecast</h1>
                            <div className='relative w-full flex items-center justify-between px-2 md:px-8'>
                                <button
                                    onClick={prevSlide}
                                    className='z-10 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 mx-1 md:mx-2 text-dark-gray'
                                >
                                    &#10094;
                                </button>
                                <div className='flex overflow-x-auto max-w-full justify-between'>
                                    {visibleSlides.map((hourData, index) => (
                                        <div
                                            key={index}
                                            className='flex flex-col items-center justify-center p-2 md:p-4 bg-white bg-opacity-20 rounded-2xl m-1 md:m-2 text-center'
                                            style={{ backdropFilter: 'blur(10px)', minWidth: '60px', maxWidth: '40%' }}
                                        >
                                            <p className='text-base md:text-lg font-semibold text-dark-blue'>{hourData.time.split(' ')[1]}</p>
                                            <p className='text-lg md:text-2xl font-bold text-gold'>{hourData.temp_c}°C</p>
                                            <img src={hourData.condition.icon} alt="Weather icon" className='w-10 md:w-12 h-10 md:h-12' />
                                            <p className='text-xs md:text-sm text-slate-gray'>{hourData.condition.text}</p>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={nextSlide}
                                    className='z-10 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 mx-1 md:mx-2 text-dark-gray'
                                >
                                    &#10095;
                                </button>
                            </div>
                        </section>



                    </>
                )}
            </article>
        </>
    );
}

export default CityDetail;



