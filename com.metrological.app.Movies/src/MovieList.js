import MovieItem from "./MovieItem.js";

export default class MovieList extends lng.Component {
    static _template() {
        return {
            Title: {visible: false, text: {text: "", fontSize: 60, fontStyle: 'bold'}},
            Scroller: {y: 100,
                Items: {}
            }
        }
    }

    set title(v) {
        this.tag("Title").text.text = v;
    }

    _construct() {
        this._index = 0;
        this._restIndex = 0;
    }

    set movies(movies) {
        this.tag("Title").visible = movies.length > 0;

        this.tag("Items").children = movies.map((movie, index) => ({
            type: MovieItem, data: movie, x: index * 640, passSignals: {selected: "select"}
        }));

        this._setIndex(0);
    }

    hasItems() {
        return this._movies.length > 0;
    }

    get _movies() {
        return this.tag("Items").childList;
    }

    _handleRight() {
        if (this._index < this._movies.length - 1) {
            this._setIndex(this._index + 1);
        } else {
            return false;
        }
    }

    _handleLeft() {
        if (this._index > 0) {
            this._setIndex(this._index - 1);
        } else {
            return false;
        }
    }

    set restIndex(v) {
        this._restIndex = v;
    }

    _setIndex(index) {
        this._index = index;
        index = Math.max(index - this._restIndex, 0);
        let x = index * 640;
        this.tag("Items").setSmooth('x', -x);
    }

    _getFocused() {
        return this._movies.getAt(this._index);
    }

}
