import instance from '../axios'

export function configureBackend(url, param, catchMethod = null, finallyMethod = null) {
    let link = url.link;
    let method = url.method.toLowerCase();
    let body = getBody(method, link, param, {});
    // console.log(body)
    return new Promise((resolve, reject) => {
        instance(body).then(
            (response) => {
                console.log('data..', response)
                if (response.data)
                    resolve(response.data)
                else
                    reject(response.statusText + ' ' + response.status)
            },
            (error) => {
                console.log('error..', error)
                reject(error.statusText + ' ' + error.status)
            }).catch(catchMethod).finally(finallyMethod);
    })
}

function getBody(method, link, params, header) {
    let requestBody = {
        method: method,
        url: link,
        header: {}
    }
    if (method.toLowerCase() == 'get') {
        requestBody = {
            ...requestBody,
            params: params.params
        }
    } else {
        requestBody = {
            ...requestBody,
            data: params
        }
    }
    return requestBody;
}

