class Handler{
    setNext(handler){
        this._next = handler;
        return handler;
    }
    handle(request){
        if (this._next && this._next.handle)
            return this._next.handle(request);
        else
            return null;
    }
}

class LogHandler extends Handler{
    handle(request){
        console.log(`Log\n ${JSON.stringify(request)}`);
        return super.handle(request);
    }
}

class AuthorizeHandler extends Handler
{
    
    check(login, password){
        return login == "admin" && password == "admin";
    }

    handle(request){
        console.log("Authorize");
        if (!request.login || !request.password){
            console.log("Bed request");
            return null;
        }
        if(!this.check(request.login, request.password)){
            console.log("Wrong login or password");
            return null;
        }
        return super.handle(request);
    }
}

class ResponceHandler extends Handler{
    handle(request){
        console.log("Responce");
        return 42;
    }
}

export {LogHandler, AuthorizeHandler, ResponceHandler};