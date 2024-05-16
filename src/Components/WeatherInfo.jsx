import { Suspense, useState } from 'react';
import { fetchData } from '../Hooks/FetchData';

function WeatherForm() {
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
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="cityInput">Ingrese la ciudad:</label>
                <input
                    type="text"
                    id="cityInput"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
                <button type="submit">Enviar</button>
            </form>
            {error && <p>{error}</p>}
            <Suspense fallback={<div>Cargando...</div>}>
                {weatherData && (
                    <div>
                        <h2>Datos del clima:</h2>
                        <pre>{JSON.stringify(weatherData, null, 2)}</pre>
                    </div>
                )}
            </Suspense>
        </div>
    );
}

export default WeatherForm;
