import { fetchData } from "../Hooks/FetchData";
import { Link } from "react-router-dom";
import { useState } from "react";


function Citys() {

    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetchData('https://weatherapi-com.p.rapidapi.com/timezone.json',
                { q: city },
                {
                    'X-RapidAPI-Key': '59c4bf489dmsh068ed231235424ap1695cfjsna2971bd258c2',
                    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
                }
            );
            setWeatherData(response);
            setError(null);
        } catch (error) {
            console.error(error);
            setError('Error al obtener los datos del clima');
            setWeatherData(null);
        }
    };



    return (
        <>
            <header>
                <div>
                    <Link to="/" className=' bg-veryDarkBlue'>
                        <button className='py-2 px-14 rounded-md bg-gray-200 dark:bg-darkBlue '>
                            <img src='' />
                            Back
                        </button>
                    </Link>
                    <h1>Manage Cities</h1>
                </div>
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="flex">
                        <input
                            type="text"
                            id="FavoriteCities"
                            placeholder='Search for a city'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 text-sm"
                        />
                    </div>
                </form>
            </header>

            <section>
                {error && <p className="text-red-500">{error}</p>}
                {weatherData && weatherData.location && (
                    <div>
                        <div>
                            <p><strong>Temperature (Celsius):</strong> {weatherData.location.temp_c}</p>
                            <p><strong>Temperature (Fahrenheit):</strong> {weatherData.location.temp_f}</p>
                        </div>
                        <p><strong>Ubicación:</strong> {weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}</p>
                    </div>
                )}

            </section>

        </>
    );
}

export default Citys;


