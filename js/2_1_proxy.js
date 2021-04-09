class RealSubject {
    request() {
        return "Real subject response";
    }
}

class MyProxy {
    constructor(realSubject) {
        if (realSubject && realSubject.request)
            this.realSubject = realSubject;
        else
            this.realSubject = new RealSubject();
    }

    request() {
        if (this.checkAccess()) {
            const response = this.realSubject.request();
            this.logAccess(response);
            return response;
        }
        else
            return "Proxy response";
    }

    checkAccess() {
        return Math.random() < 0.5;
    }

    logAccess(message) {
        console.log(`Request was proxied: ${message}`);
    }
}

function ProxyFunction(realSubject) {
    function proxyMethod(method) {
        return function () {
            if (checkAccess()) {
                const response = method.apply(realSubject);
                logAccess(response);
                return response;
            }
            else
                return "Proxy response";
        }

        function checkAccess() {
            return  Math.random() < 0.5;
        }

        function logAccess(message) {
            console.log(`Request was proxied by function: ${message}`);
        }
    }

    realSubject.request = proxyMethod(realSubject.request);
    return realSubject;
}

export { RealSubject, MyProxy, ProxyFunction }