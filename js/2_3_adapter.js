class Adaptee {
    getSpecificRequest(request, requestLength, mustBeTrue) {
        if (!mustBeTrue)
            throw "MustBeTrue is not true";
        if (request.length != requestLength)
            throw "RequestLength is wrong";
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

export {Adaptee, Adapter};