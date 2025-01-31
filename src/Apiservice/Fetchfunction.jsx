export const _fetch = async (url, method, data, header) => {
    const LoginToken = localStorage.getItem("token");

    if (method === 'get' || method === 'GET') {

        console.log('1')
        return fetch(url,
            {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": LoginToken,

                },

            })
            .then((response) => response.json())
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return { 'status': 0, 'message': 'Something went wrong, ERROR: ' + error }

            })
        // .done();
    } else if (method === 'patch' || method === 'PATCH') {
        console.log('2')
        return fetch(url,
           
            
            {
                method: method,
                headers: {
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json',
                    "Authorization": "Bearer " + LoginToken,
                },
                body: data,

            })
            .then((response) => response.json())
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return { 'status': 0, 'message': 'Something went wrong, ERROR: ' + error }

            })
        // .done();
    } else if (method === 'delete' || method === 'DELETE') {
        console.log('3')
        return fetch(url,
            {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + LoginToken,
                },
                body: JSON.stringify(data),

            })
            .then((response) => response.json())
            .then((result) => {
                return result;
            })
            .catch((error) => {
                return { 'status': 0, 'message': 'Something went wrong, ERROR: ' + error }

            })
        // .done();
    } else {
        console.log('4')
        
        // return fetch(url, {
        //     method: method,
        //     headers: {
        //         'Content-Type': 'application/json',
        //         "Authorization": LoginToken,

        //     },
        //     body: JSON.stringify(data),
        // }).then((response) => response.json())
        //     .then((result) => {
        //         if(result.success == false && result.message == "Unauthorized!"){
        //             localStorage.removeItem("token")
        //             return result;
        //         }else{
        //             return result;
        //         }
        //     })
        //     .catch((error) => {
        //         return { 'status': 0, 'message': 'Something went wrong, ERROR: ' + error }

        //     })
        return fetch(url, {
            method: method,
            headers: {
                ...(!(data instanceof FormData) && { 'Content-Type': 'application/json' }), 
                "Authorization": LoginToken,
            },
            body: data instanceof FormData ? data : JSON.stringify(data), 
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.success === false && result.message === "Unauthorized!") {
                    localStorage.removeItem("token");
                }
                return result;
            })
            .catch((error) => {
                return { status: 0, message: `Something went wrong, ERROR: ${error.message}` };
            });
    }

}
export default _fetch;
