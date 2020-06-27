
class HttpService {
    ajax(method, url, data, headers) {
        const fetchHeaders = new Headers([['Accept','application/json'],['Content-type','application/json ; charset=utf-8']]);

        return fetch(url, {
            method: method,
            headers: fetchHeaders, body: JSON.stringify(data)
        }).then(x => {
            return x.json();
        });
    }
}

export const httpService = new HttpService();