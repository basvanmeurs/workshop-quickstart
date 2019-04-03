import Api from "../../lib/Api.js";
import MovieList from "../MovieList.js";

export default class SearchResults extends lng.Component {

    static _template() {
        return {
            x: 740,
            w: 1200, h: 500, clipping: true,
            List: {x: 10, w: 1100, type: MovieList, title: "Results", passSignals:{select:true}}
        }
    }

    search(value) {
        this.tag("List").title = `Results for "${value}"`;
        this._setState("Searching", [value]);
    }

    hasResults() {
        return this.tag("List").hasItems();
    }

    _getFocused() {
        return this.tag("List");
    }

    _inactive() {
        this._cancelSearching();
    }

    clear() {
        this._cancelSearching();
        this.tag("List").movies = [];
    }

    static _states() {
        return [
            class Searching extends this {
                $enter(context, value) {
                    const search = Api.search(value);
                    this._pendingSearch = search;
                    search.then((results) => {
                        if (search === this._pendingSearch) {
                            this._processResults(results);
                        }
                    })
                }
                $exit() {
                    // Ignore incoming search after searching has stopped.
                    this._pendingSearch = undefined;
                }
                _search(value) {
                    // Restart searching.
                    this._setState("");
                    super._search(value);
                }
                _processResults(results) {
                    this.tag("List").movies = results;
                    this._setState("");
                }

                _cancelSearching() {
                    this._setState("");
                }
            }
        ]
    }

}

