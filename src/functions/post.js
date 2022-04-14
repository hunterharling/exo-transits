export async function POST(url = '', data = {},  form_data=false) {
    let t = localStorage.getItem("token__auth");

    let header = {
        'Content-Type': 'application/json'
    };

    if (t && t !== "undefined")
        header = {
            'Content-Type': 'application/json',
            'Authorization': ` Token ${t}`
        };

    if (t && form_data && t !== "undefined")
        header = {
            'Content-Type': 'multipart/form-data',
            'Authorization': ` Token ${t}`
        };
    
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: header,
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data),
        // mode: 'no-cors'
    });

    return {
        data: await response.json(),
        status: response.status
    };
}

export async function GET(url = '', token = '', p=false) {
    let t = localStorage.getItem("token__auth");

    let header = {
        'Content-Type': 'application/json'
    };

    if (t) header = {
        'Content-Type': 'application/json',
        'authorization': ` Token ${t}`
    };

    const response = await fetch(url, {
        headers: header,
        referrerPolicy: 'no-referrer'
    });

    let post_response = {
        data: await response.json(),
        status: response.status
    };
    return post_response;
}

export const parse = (data) => {
    if (typeof (data) == 'object')
        return (data);
    return(JSON.parse(`${JSON.parse(data)}`.replaceAll(`'`, `"`)))
}
