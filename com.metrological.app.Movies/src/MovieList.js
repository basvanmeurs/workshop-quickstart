import MovieItem from "./MovieItem.js";

export default class MovieList extends lng.Component {
    static _template() {
        return {
            y: 200,
            Title: {x: 50, text: {text: "Top movies", fontSize: 60, fontStyle: 'bold'}},
            Scroller: {y: 100, w: 1920, h: 400,
                Items: {}
            }
        }
    }

    _construct() {
        this._index = 0;
    }

    set movies(movies) {
        this.tag("Items").children = movies.map((movie, index) => ({
            type: MovieItem, data: movie, x: index * 640 + 50, passSignals: {selected: "select"}
        }));
    }

    get _movies() {
        return this.tag("Items").childList;
    }

    _handleRight() {
        if (this._index < this._movies.length - 1) {
            this._setIndex(this._index + 1);
        }
    }

    _handleLeft() {
        if (this._index > 0) {
            this._setIndex(this._index - 1);
        }
    }


    _setIndex(index) {
        this._index = index;
        let x = Math.max(0, Math.min(index - 2, this._movies.length - 3)) * 640;
        this.tag("Items").setSmooth('x', -x);
    }

    _getFocused() {
        return this._movies.getAt(this._index);
    }

}
