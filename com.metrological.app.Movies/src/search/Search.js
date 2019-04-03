import SearchInput from "./SearchInput.js";
import SearchResults from "./SearchResults.js";

export default class Search extends lng.Component {

    static _template() {
        return {
            y: 200,
            Wrapper: {
                x: 50, w: 1820, y: 0,
                Input: {type: SearchInput, signals: {search: "_search"}},
                SearchResults: {type: SearchResults, passSignals: {select: true}}
            }
        }
    }

    _init() {
        this._setState("Input");
    }

    reset() {
        this.tag("Input").clear();
        this.tag("SearchResults").clear();
        this._setState("Input");
    }

    static _states() {
        return [
            class Input extends this {
                _getFocused() {
                    return this.tag("Input");
                }

                _search(value) {
                    this.tag("SearchResults").search(value);
                }

                _handleRight() {
                    if (this.tag("SearchResults").hasResults()) {
                        this._setState("Results");
                    }
                }
            },
            class Results extends this {
                _getFocused() {
                    return this.tag("SearchResults");
                }

                _handleLeft() {
                    this._setState("Input");
                }

                _handleBack() {
                    this._setState("Input");
                }
            }
        ]
    }
}