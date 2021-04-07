class RealSubject {
    request() {
        return "Real subject response";
    }
}

class Proxy {
    constructor(realSubject) {
        if (realSubject)
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
        return Math.random() > 0.5;
    }

    logAccess(message) {
        console.log(`Request was proxied: ${message}`);
    }
}

function ProxyFunction(realSubject) {
    if (realSubject && realSubject.request) {
        const request = realSubject.request;
        realSubject.request = () => {
            if (checkAccess()) {
                const response = request.apply (realSubject);
                logAccess(response);
                return response;
            }
            else
                return "Proxy response";
        }
        return realSubject;
    }

    function checkAccess() {
        return Math.random() < 0.5;
    }

    function logAccess(message) {
        console.log(`Request was proxied by function: ${message}`);
    }
}

export { RealSubject, Proxy, ProxyFunction }