/*
    Example from https://dev.to/tomekbuszewski/facade-pattern-in-javascript-3on4
*/

class FetchMusic {
    get resources() {
        return [
            { id: 1, title: "The Fragile" },
            { id: 2, title: "Alladin Sane" },
            { id: 3, title: "OK Computer" }
        ];
    }

    fetch(id) {
        return this.resources.find(item => item.id === id);
    }
}

class GetMovie {
    constructor(id) {
        this.id = id
    }

    get value() {
        return this.resources.find(item => item.id === this.id);
    }

    get resources() {
        return [
            { id: 1, title: "Apocalypse Now" },
            { id: 2, title: "Die Hard" },
            { id: 3, title: "Big Lebowski" }
        ];
    }
}

const getTvShow = function (id) {
    const resources = [
        { id: 1, title: "Twin Peaks" },
        { id: 2, title: "Luther" },
        { id: 3, title: "The Simpsons" }
    ];

    return resources.find(item => item.id === id);
};

const booksResource = [
    { id: 1, title: "Ulysses" },
    { id: 2, title: "Ham on Rye" },
    { id: 3, title: "Quicksilver" }
];


const NOT_FOUND = { status: 404, error: `No item with this id found` };

class CultureFacade {
    constructor(type) {
        switch (type) {
            case "music":
                this._find = this._findMusic;
                break;
            case "movie":
                this._find = this._findMovie
                break;
            case "tv":
                this._find = this._findTVShow
                break;
            case "book":
                this._find = this._findBook
                break;
            default:
                throw new Error("No type set!");
        }
    }

    get(id) {
        return this._find(id) || NOT_FOUND;
    }

    _findMusic(id) {
        const db = new FetchMusic();
        return db.fetch(id);
    }

    _findMovie(id) {
        const db = new GetMovie(id);
        return db.value;
    }

    _findTVShow(id) {
        return getTvShow(id);
    }

    _findBook(id) {
        return booksResource.find(item => item.id === id);
    }
}

export default CultureFacade;