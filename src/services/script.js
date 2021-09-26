export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api'
    }
    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };
    getAllCharacters = async () => {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map(this._transformChar);
    }
    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformChar(character);
    }
    getAllHouses = async () => {
        const res = await this.getResource(`/houses/`);
        return res.map(this._transformHouse)
    }
    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
    }
    getAllBooks = async () => {
        const res = await this.getResource(`/books/`);
        return res.map(this._transformBook);
    }
    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }
    _transformChar(char) {
        const url = char.url.match(/\d/g).join('');

        return {
            name: char.name,
            gender: char.gender,
            born: char.born || "unknown", 
            died: char.died || "did not die", 
            culture: char.culture || "unknown", 
            url: url
        }
    }
    _transformBook(book) {
        const url = book.url.match(/\d/g).join('');

        return {
            name: book.name || 'no data :(',
            numberOfPages: book.numberOfPages || 'no data :(',
            publiser: book.publiser || 'no data :(', 
            released: book.released || 'no data :(', 
            culture: book.culture || 'no data :(',
            url: url
        }
    }
    _transformHouse(house) {
        const url = house.url.match(/\d/g).join('');

        return {
            name: house.name,
            region: house.region || 'no data :(', 
            words: house.words || 'no data :(', 
            titles: house.titles || 'no data :(', 
            overlord: house.overlord || 'no data :(',
            ancestralWeapons: house.ancestralWeapons || 'no data :(',
            url: url
        }
    }
}

