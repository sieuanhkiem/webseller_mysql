const common = new function () {
    var secrectkey = 'E821752166E916AEEF940855';

    this.method = {
        POST: 'POST',
        GET: 'GET'
    }

    this.decrypt = function (cripherText) {
        const vi = secrectkey.split('').slice(0, 8).join('');
        const wordArray = CryptoJS.TripleDES.decrypt(cripherText, CryptoJS.enc.Utf8.parse(secrectkey), {
            iv: CryptoJS.enc.Utf8.parse(vi),
            mode: CryptoJS.mode.CBC
        });
        return JSON.parse(wordArray.toString(CryptoJS.enc.Utf8));
    }

    this.encrypt = function (data) {
        const message = JSON.stringify(data);
        const iv = secrectkey.split('').slice(0, 8).join('');
        const cripher = CryptoJS.TripleDES.encrypt(message, CryptoJS.enc.Utf8.parse(secrectkey), {
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode.CBC
        });
        return cripher.toString();
    }


    this.callAPIHandler = function (method, path, body, callback) {
        const url = `${window.location.protocol}//${window.location.host}/${path}`;
        const xhttpRequest = new XMLHttpRequest();
        xhttpRequest.open(method, url);
        xhttpRequest.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhttpRequest.onreadystatechange = function() {
            if(this.readyState == 4) {
                if(this.status == 200) {
                    const jsonResult = JSON.parse(this.responseText);
                    if(jsonResult.code == 200) {
                        if(callback != null) callback(jsonResult);
                    }
                    else console.error(jsonResult);
                }
                else {
                    console.error(`Error: ${this.status} - ${this.statusText} - ${this.responseText}`);
                }
            }
        };

        if(body && method == this.method.POST) xhttpRequest.send(JSON.stringify(body))
        else xhttpRequest.send(); 
    }
}();

