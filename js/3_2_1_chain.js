class Handler{
    SetNext(handler){
        this._next = handler;
        return handler;
    }
    Handle(request){
        if (this._next && this._next.Handle)
            return this._next.Handle(request);
        else
            return null;
    }
}

class LogHandler extends Handler{
    Handle(request){
        console.log(`Log\n ${JSON.stringify(request)}`);
        return super.Handle(request);
    }
}

class AuthorizeHandler extends Handler
{
    
    Check(Login, Password){
        return Login == "admin" && Password == "admin";
    }

    Handle(request){
        console.log("Authorize");
        if (!request.Login || !request.Password){
            console.log("Bed request");
            return null;
        }
        if(!this.Check(request.Login, request.Password)){
            console.log("Wrong login or password");
            return null;
        }
        return super.Handle(request);
    }
}

class ResponceHandler extends Handler{
    Handle(request){
        console.log("Responce");
        return 42;
    }
}

export {LogHandler, AuthorizeHandler, ResponceHandler};