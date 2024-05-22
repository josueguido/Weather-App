import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Back from "../assets/Icons/back-svgrepo-com.svg"

function Citys() {

    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const options = {
                method: 'GET',
                url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
                params: { q: city }, // Utiliza la ciudad ingresada en el formulario
                headers: {
                    'X-RapidAPI-Key': '59c4bf489dmsh068ed231235424ap1695cfjsna2971bd258c2',
                    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
                }
            };
            const response = await axios.request(options);
            setWeatherData(response.data); // Establece los datos del clima en el estado
            setError(null); // Limpia el estado de error
        } catch (error) {
            setError('Error al obtener los datos del clima');
            setWeatherData(null);
        }
    };



    return (
        <>
            <header className="flex flex-col">
                <div className="flex flex-row items-center py-8 px-10">
                    <div>
                        <Link to="/">
                            <button className='py-2 px-14 rounded-md'>
                                <img src={Back} className="w-10 h-10" />
                            </button>
                        </Link>
                    </div>
                    <div>
                        <h1 className=" text-xl font-medium">Manage Cities</h1>
                    </div>
                </div>

                <div className="flex px-12 ">
                    <form onSubmit={handleSubmit} className="w-96 h-20">
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
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
                                type="search"
                                id="default-search"
                                className="block w-full p-4 ps-10 dark:text-white  dark:hover-bg-slate-900 dark:bg-darkBlue border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-sm"
                                placeholder='Search for a city'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>
                        
                    </form>
                </div>

            </header>

            <section>
                {error && <p className="text-red-500">{error}</p>}
                {weatherData && weatherData.location && (
                    <section className="flex justify-center items-center">
                        <div>
                            <div>
                                <p><strong>Temperature (Celsius):</strong> {weatherData.current.temp_c}</p>
                                <p><strong>Temperature (Fahrenheit):</strong> {weatherData.current.temp_f}</p>
                            </div>
                            <p><strong>Ubicación:</strong> {weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}</p>
                        </div>
                    </section>
                )}


            </section>

        </>
    );
}

export default Citys;


