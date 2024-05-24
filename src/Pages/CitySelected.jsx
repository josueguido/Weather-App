import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SunsetIcon from "../assets/Icons/sunset.svg"
import PrecipitationIcon from "../assets/Icons/droplet.svg"
import HumidityIcon from "../assets/Icons/ripple.svg"
import FeelIcon from "../assets/Icons/temperature.svg"
import VisibilityIcon from "../assets/Icons/eye.svg"
import WindIcon from "../assets/Icons/wind.svg"
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

    return (
        <>
            <nav></nav>

            <article className='flex flex-col justify-center items-center text-center py-10 gap-10'>
                {error && <p className="text-red-500">{error}</p>}
                {weatherData && (
                    <>
                        <section className='flex flex-col gap-2'>
                            <h2 className=' font-medium text-lg'>{weatherData.location.name}, {weatherData.location.country}</h2>
                            <p className='font-medium  text-xl'> {weatherData.current.temp_c}°C</p>
                            <p className=' font-medium'>{weatherData.current.condition.text}</p>
                            <div className='flex flex-row justify-center gap-2 font-medium'>
                                <p>H: {weatherData.forecast.forecastday[0].day.maxtemp_c}°</p>
                                <p>L: {weatherData.forecast.forecastday[0].day.mintemp_c}°</p>
                            </div>
                            <p className=' font-medium'>{weatherData.location.localtime}</p>

                        </section>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 py-10'>
                            <section>
                                <BackgroundGradient className="flex flex-col justify-start items-start gap-2 rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
                                    <header className='flex flex-row gap-x-2'>
                                        <img src={SunsetIcon} alt='sunset icon' />
                                        <h1>SUNSET</h1>
                                    </header>
                                    <div>
                                        <p>{weatherData.forecast.forecastday[0].astro.sunset}</p>
                                    </div>
                                    <div>
                                        <p>Sunrise: {weatherData.forecast.forecastday[0].astro.sunrise}</p>
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
                                        <img src={VisibilityIcon} alt='visibility icon' />
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
                                <BackgroundGradient className="flex flex-col justify-start items-start gap-2 rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
                                    <header className='flex flex-row gap-x-2'>
                                        <img src={VisibilityIcon} alt='visibility icon' />
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
                    </>
                )}
            </article>
        </>
    );
}

export default CityDetail;
