export default {
    request: {
        onRequest: function (req, onRequest) {
            if (app.storage.get('access_token')) {
                req.headers.Authorization =  'Bearer ' + app.storage.get('access_token');
            }
            return onRequest(req);
        },
        onRequest: function (req, onRequest) {
            if (!sessionStorage.getItem('lastRequsetTime')) {
                sessionStorage.setItem('lastRequsetTime', Date.now());
            }

            if ( (Date.now() - (+sessionStorage.getItem('lastRequsetTime'))) > 30*60 * 1000) {
                app.storage.remove('access_token');
                sessionStorage.removeItem('lastRequsetTime');
            }

            if (!req.headers.slient) {
                sessionStorage.setItem('lastRequsetTime', Date.now());
            }

            req.headers.Authorization = app.storage.get('access_token') ? 'Bearer ' + app.storage.get('access_token') : '';
            return onRequest(req);
        },
        onResponse: function(res) {
            if (res.status == 401) {
                return res.json()
                    .then(result => {
                        return Promise.reject(result);
                    })
            }

            if (res.status != 200) {
                return Promise.reject({ code: res.status, message: res.statusText });
            }

            return res.json()
                .then(result => {
                    const { code, body, message } = result;
                    if (code == null) {
                        return result;
                    }
                    if (code === '000000') {
                        return body;
                    }
                    return Promise.reject({ code, body, message });
                });
        }
    },

    service: {
        items: {
            "login": "POST /api/login",
            "register": "POST /api/register",
            "vote": "POST /api/vote",
            "unvote": "POST /api/unvote"
        }
    }
}