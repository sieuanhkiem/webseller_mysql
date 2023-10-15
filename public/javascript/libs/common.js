const common = new function () {
    var secrectkey = 'E821752166E916AEEF940855';

    this.method = {
        POST: 'POST',
        GET: 'GET'
    }

    this.toastLevel = {
        SUCCESS: 100000000,
        ERROR: 100000001,
        WARRING: 100000002
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


    this.arrayBufferToBase64 = function(buffer) {
        let binary = '';
        var bytes = new Uint8Array(buffer);
        for (let index = 0; index < bytes.length; index++) {
            binary += String.fromCharCode(bytes[index]);            
        }
        return window.btoa(binary);
    }

    this.base64ToArrayBuffer = function (base64) {
        let binary_string = window.atob(base64);
        let len = binary_string.length;
        let bytes = new Uint8Array(len);
        for (let index = 0; index < len; index++) {
            bytes[index] = binary_string.charCodeAt(index);
        }
        return bytes.buffer;
    }


    this.callAPIHandler = function (method, path, body, callback, callbackFaild) {
        const url = `${window.location.protocol}//${window.location.host}/${path}`;
        const xhttpRequest = new XMLHttpRequest();
        xhttpRequest.open(method, url);
        xhttpRequest.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhttpRequest.onreadystatechange = function() {
            if(this.readyState == 4) {
                if(this.status == 200) {
                    const jsonResult = JSON.parse(this.responseText);
                    if(jsonResult.code == 200) {
                        if(callback != null || callback != undefined) callback(jsonResult);
                    }
                    else {
                        if(callbackFaild != null || callbackFaild != undefined) callbackFaild(jsonResult);
                        console.error(jsonResult);
                    } 
                }
                else {
                    console.error(`Error: ${this.status} - ${this.statusText} - ${this.responseText}`);
                }
            }
        };

        if(body && method == this.method.POST) xhttpRequest.send(JSON.stringify(body))
        else xhttpRequest.send(); 
    }

    this.ToastMessage = function (message, toastLevel) {
        let backgroundColor = '#d4edda';
        let fontColor = '#447c51';

        if(toastLevel == common.toastLevel.ERROR) {
            backgroundColor = '#f8d7da';
            fontColor = '#8a3d44';
        }

        if(toastLevel == common.toastLevel.WARRING) {
            backgroundColor = '#fff3cd';
            fontColor = '#977922';
        }

        showToast(message, {
            duration: 3000,
            background: backgroundColor,
            color: fontColor,
            borderRadius: '8px'
        });
    }
}();

