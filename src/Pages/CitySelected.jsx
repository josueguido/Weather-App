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
import { BackgroundGradient } from '../Components/ui/background-gradient';


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
            <article className='flex flex-col justify-center items-center text-center py-10 gap-10'>
                {error && <p className="text-red-500">{error}</p>}
                {weatherData && (
                    <>
                        <header className='flex justify-start items-start text-start text-black'>
                            <Link to="/" >Back</Link>
                        </header>

                        <main>
                            <section className='flex flex-col relative max-w-[32rem] items-center justify-center overflow-hidden rounded-lg border bg-background p-8 md:shadow-xl'>
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
                        </main>


                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 py-10'>
                            <section>
                                <BackgroundGradient className="flex flex-col justify-start items-start gap-2 rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
                                    <header className='flex flex-row gap-x-2 items-center'>
                                        <img src={SunsetIcon} alt='Sunset icon' />
                                        <h1 className="text-lg font-semibold">Sunrise</h1>
                                    </header>
                                    <div>
                                        <p>{weatherData.forecast.forecastday[0].astro.sunrise}</p>
                                    </div>
                                    <div>
                                        <p className="text-base">Sunset: {weatherData.forecast.forecastday[0].astro.sunset}</p>
                                    </div>
                                </BackgroundGradient>
                            </section>


                            <section>
                                <BackgroundGradient className="flex flex-col justify-start items-start gap-2 rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
                                    <header className='flex flex-row gap-x-2'>
                                        <img src={PrecipitationIcon} alt='sunset icon' />
                                        <h1>PRECIPITATION</h1>
                                    </header>
                                    <div className='flex flex-col justify-start items-start'>
                                        <p>{weatherData.forecast.forecastday[0].hour[0].precip_mm} mm</p>
                                        <h3>in last 24h</h3>
                                    </div>
                                </BackgroundGradient>
                            </section>

                            <section>
                                <BackgroundGradient className="flex flex-col justify-start items-start gap-2 rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
                                    <header className='flex flex-row gap-x-2'>
                                        <img src={HumidityIcon} alt='sunset icon' />
                                        <h1>HUMIDITY</h1>
                                    </header>
                                    <div className='flex flex-col gap-4 justify-center items-start'>
                                        <p>Change of rain: {weatherData.forecast.forecastday[0].hour[0].chance_of_rain}%</p>
                                        <p>Change of snow: {weatherData.forecast.forecastday[0].hour[0].chance_of_snow}%</p>
                                        <p>Max Humidity: {weatherData.forecast.forecastday[0].day.avghumidity}%</p>
                                    </div>
                                </BackgroundGradient>
                            </section>

                            <section>
                                <BackgroundGradient className="flex flex-col justify-start items-start gap-2 rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
                                    <header className='flex flex-row gap-x-2'>
                                        <img src={FeelIcon} alt='sunset icon' />
                                        <h1>FEELS LIKE</h1>
                                    </header>
                                    <div className='flex flex-col gap-2 justify-center items-start'>
                                        <p>C° {weatherData.forecast.forecastday[0].hour[0].feelslike_c}</p>
                                        <p>F° {weatherData.forecast.forecastday[0].hour[0].feelslike_f}</p>
                                    </div>
                                    <p>{weatherData.forecast.forecastday[0].hour[0].condition.text}</p>
                                </BackgroundGradient>

                            </section>

                            <section>
                                <BackgroundGradient className="flex flex-col justify-start items-start gap-2 rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
                                    <header className='flex flex-row gap-x-2'>
                                        <img src={VisibilityIcon} alt='visibility icon' />
                                        <h1>VISIBILITY</h1>
                                    </header>
                                    <div>
                                        <p>{weatherData.forecast.forecastday[0].hour[0].vis_km} KM</p>
                                        <p>{weatherData.forecast.forecastday[0].hour[0].vis_miles} MH</p>
                                    </div>
                                </BackgroundGradient>
                            </section>

                            <section>
                                <BackgroundGradient className="flex flex-col justify-start items-start gap-2 rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
                                    <header className='flex flex-row gap-x-2'>
                                        <img src={SunIcon} alt='visibility icon' />
                                        <h1>UV INDEX</h1>
                                    </header>
                                    <div>
                                        <p>{weatherData.forecast.forecastday[0].hour[0].uv}</p>
                                    </div>
                                </BackgroundGradient>
                            </section>

                            <section>
                                <BackgroundGradient className="flex flex-col justify-start items-start gap-2 rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
                                    <header className='flex flex-row gap-x-2'>
                                        <img src={WindIcon} alt='visibility icon' />
                                        <h1>WIND</h1>
                                    </header>

                                    <div className='flex flex-row items-start gap-x-2 text-sm'>
                                        <p className='text-4xl'>{weatherData.forecast.forecastday[0].hour[0].wind_kph}</p>
                                        <div>
                                            <h2> KM/H</h2>
                                            <h3>Wind</h3>
                                        </div>
                                    </div>

                                    <hr className="w-full border-t border-gray-500" />

                                    <div className='flex flex-row items-start gap-x-2 text-sm'>
                                        <p className='text-4xl'>{weatherData.forecast.forecastday[0].hour[0].gust_kph}</p>
                                        <div>
                                            <h2> KM/H</h2>
                                            <h3>Gusts</h3>
                                        </div>
                                    </div>
                                </BackgroundGradient>
                            </section>


                            <section>
                                <BackgroundGradient className="flex flex-col justify-start items-start text-start gap-2 rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
                                    <header className='flex flex-row gap-x-2'>
                                        <img src={MoonIcon} alt='visibility icon' />
                                        <h1>{weatherData.forecast.forecastday[0].astro.moon_phase}</h1>
                                    </header>
                                    <div >
                                        <p>Illumination {weatherData.forecast.forecastday[0].astro.moon_illumination}%</p>
                                        <p>Next Moonrise: {weatherData.forecast.forecastday[0].astro.moonrise}</p>
                                        <p>Next Moonset: {weatherData.forecast.forecastday[0].astro.moonset}</p>
                                        <p>Is Sun Up: {weatherData.forecast.forecastday[0].astro.is_sun_up ? 'Yes' : 'No'}</p>
                                    </div>
                                </BackgroundGradient>
                            </section>
                        </div>


                        <section className='flex flex-col items-center bg-light-sky-blue rounded-lg'>
                            <h1 className='text-xl font-bold mb-4 text-gold'>Forecast</h1>
                            <div className='relative w-full flex items-center justify-between px-8'>
                                <button
                                    onClick={prevSlide}
                                    className='z-10 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 mx-2 text-dark-gray'
                                >
                                    &#10094;
                                </button>
                                <div className='flex overflow-hidden w-full justify-center'>
                                    {visibleSlides.map((hourData, index) => (
                                        <div
                                            key={index}
                                            className='flex flex-col items-center justify-center p-4 bg-white bg-opacity-20 rounded-2xl m-2 text-center'
                                            style={{ backdropFilter: 'blur(10px)', minWidth: '100px' }}
                                        >
                                            <p className='text-lg font-semibold text-dark-blue'>{hourData.time.split(' ')[1]}</p>
                                            <p className='text-2xl font-bold text-gold'>{hourData.temp_c}°C</p>
                                            <img src={hourData.condition.icon} alt="Weather icon" className='w-12 h-12' />
                                            <p className='text-sm text-slate-gray'>{hourData.condition.text}</p>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={nextSlide}
                                    className='z-10 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 mx-2 text-dark-gray'
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



