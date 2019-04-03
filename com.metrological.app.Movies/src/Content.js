import MovieList from "./MovieList.js";
import MovieDetails from "./MovieDetails.js";
import Search from "./search/Search.js";

export default class Content extends lng.Component {

    static _template() {
        return {
            List: {x: 50, y: 200, w: 640 * 3, alpha: 0, title: "Top Movies", type: MovieList, restIndex: 1, signals: {select: "_select"}},
            Details: {alpha: 0, type: MovieDetails},
            Search: {alpha: 0, type: Search, signals: {select: "_select"}}
        }
    }

    _init() {
        this._setState("List");
    }

    set movies(movies) {
        this.tag("List").movies = movies;
    }

    setActivePage(value) {
        this._setState(value);
    }

    _select(movie) {
        this._setState("Details", [movie.data]);
    }

    static _states() {
        return [
            class List extends this {
                $enter() {
                    this.tag("List").setSmooth('alpha', 1);
                }
                $exit() {
                    this.tag("List").setSmooth('alpha', 0);
                }
                _getFocused() {
                    return this.tag("List");
                }
            },
            class Search extends this {
                $enter(context) {
                    if (context.prevState !== "Details") {
                        // Do not reset while showing details page from the search results.
                        this.tag("Search").reset();
                    }
                    this.tag("Search").setSmooth('alpha', 1);
                }
                $exit() {
                    this.tag("Search").setSmooth('alpha', 0);
                }
                _getFocused() {
                    return this.tag("Search");
                }
            },
            class Details extends this {
                $enter(context, movieData) {
                    this._prevState = context.prevState;
                    this.tag("Details").movie = movieData;
                    this.tag("Details").setSmooth('alpha', 1);
                }
                $exit() {
                    this.tag("Details").setSmooth('alpha', 0);
                }
                _getFocused() {
                    return this.tag("Details");
                }
                _handleBack() {
                    this._setState(this._prevState);
                }
            }
        ]
    }

}
