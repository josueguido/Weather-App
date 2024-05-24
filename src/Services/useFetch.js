// import  { useState, useEffect } from 'react';
// import axios from 'axios';

//  export const WeatherComponent = ({ city }) => {
//   const [ setWeatherData] = useState(null);
//   const [ setError] = useState(null);

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       try {
//         const options = {
//           method: 'GET',
//           url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
//           params: { q: city },
//           headers: {
//             'X-RapidAPI-Key': '59c4bf489dmsh068ed231235424ap1695cfjsna2971bd258c2',
//             'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
//           }
//         };

//         const response = await axios.request(options);
//         setWeatherData(response.data);
//         setError(null);
//       } catch (error) {
//         setError('Error al obtener los datos del clima');
//         setWeatherData(null);
//       }
//     };

//     fetchWeatherData();

//   }, [city, setError, setWeatherData]);
// }


import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                setError(error.message || 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
