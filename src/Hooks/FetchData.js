
const getSuspender = (promise) => {
    let status = "pending";
    let response;

    const suspender = promise.then(
        (res) => {
            status = "success";
            response = res;
        },
        (err) => {
            status = "error";
            response = err;
        }
    );

    const read = () => {
        if (status === "pending") {
            throw suspender;
        } else if (status === "error") {
            throw response;
        } else {
            return response;
        }
    };
    
    return { read };
};



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
            return data;
        })
        .catch(error => {
            throw error;
        });
        
}



//   export function fetchData(url, options) {
//     const promise = fetch(url, options)
//       .then((response) => response.json())
//       .then((json) => json);

//     return getSuspender(promise);
//   }