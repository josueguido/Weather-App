import { Suspense, useState } from 'react';
import axios from 'axios';

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
            console.error(error);
            setError('Error al obtener los datos del clima');
            setWeatherData(null);
        }
    };

    return (
        <>
            <header className='flex flex-col justify-center items-center py-10 px-10 font-normal text-lg'>
                <h1 className='text-lg font-semibold'>Weather</h1>
                <div className='flex py-4'>
                    <form onSubmit={handleSubmit} className="mb-4">
                        <div className="flex">
                            <input
                                type="text"
                                id="cityInput"
                                placeholder='Ingrese la ciudad:'
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 text-sm"
                            />
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none text-sm">Enviar</button>
                        </div>
                    </form>
                </div>

            </header>
            <section className=''>
                {error && <p className="text-red-500">{error}</p>}
                <Suspense fallback={<div>Cargando...</div>}>
                    {weatherData && (
                        <div className="border border-gray-300 rounded p-4">
                            <p><strong>Temperatura Máxima:</strong> {weatherData.forecast.forecastday[0].day.maxtemp_c}°C</p>
                            <p><strong>Temperatura Mínima:</strong> {weatherData.forecast.forecastday[0].day.mintemp_c}°C</p>
                            <p><strong>Condición:</strong> {weatherData.current.condition.text}</p>
                            <p><strong>Humedad:</strong> {weatherData.current.humidity}%</p>
                            <p><strong>Viento:</strong> {weatherData.current.wind_kph} km/h</p>
                        </div>
                    )}
                </Suspense>
            </section>

        </>
    );
}

export default WeatherForm;
