class Adaptee {
    getSpecificRequest(request, requestLength, mustBeTrue) {
        if (!mustBeTrue)
            throw "mustBeTrue is not true";
        if (request.length != requestLength)
            throw "requestLength is wrong";
        return `Responce for ${request}`;
    }
}

class Adapter
{
    constructor (adaptee)
    {
        if (adaptee && adaptee.getSpecificRequest)
            this._adaptee = adaptee;
        else 
            throw `Can't adapt ${adaptee}`;
    }

    getRequest(request)
    {
        return `This is adapted '${this._adaptee.getSpecificRequest(request, request.length, true)}'`;
    }
}

function adapt(adaptee){
    function adaptRequest(method){
        return function(request){
           return `This is adapted '${method.apply(adaptee, [request, request.length, true])}'`;
        }
    }

    if (!(adaptee && adaptee.getSpecificRequest))
        throw `can't adapt ${adaptee}`;
    adaptee.getRequest = adaptRequest(adaptee.getSpecificRequest);
    return adaptee;
}

export {Adaptee, Adapter, adapt};