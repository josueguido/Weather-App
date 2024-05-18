
// const getSuspender = (promise) => {
//     let status = "pending";
//     let response;

//     const suspender = promise.then(
//         (res) => {
//             status = "success";
//             response = res;
//         },
//         (err) => {
//             status = "error";
//             response = err;
//         }
//     );

//     const read = () => {
//         if (status === "pending") {
//             throw suspender;
//         } else if (status === "error") {
//             throw response;
//         } else {
//             return response;
//         }
//     };

//     return { read };
// };

export function fetchData(url, params, headers) {
    return fetch(`${url}?${new URLSearchParams(params)}`, {
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const { location, current } = data;

            if (!location || !current) {
                throw new Error('Invalid API response: Missing location or current data');
            }

            const {
                name,
                region,
                country,
                lat,
                lon,
                localtime,
                timezone_id
            } = location;

            const {
                last_updated,
                temp_c,
                temp_f,
                is_day,
                condition,
                wind_kph,
                wind_degree,
                wind_dir,
                pressure_mb,
                humidity,
                feelslike_c,
                vis_km,
                uv
            } = current;

            const { text, icon } = condition;

            const body = {
                location: {
                    name,
                    region,
                    country,
                    lat,
                    lon,
                    localtime,
                    timezone_id
                },
                current: {
                    last_updated,
                    temp_c,
                    temp_f,
                    is_day,
                    condition: {
                        text,
                        icon
                    },
                    wind_kph,
                    wind_degree,
                    wind_dir,
                    pressure_mb,
                    humidity,
                    feelslike_c,
                    vis_km,
                    uv
                }
            };

            return body;
        })
        .catch(error => {
            throw error;
        });
}
