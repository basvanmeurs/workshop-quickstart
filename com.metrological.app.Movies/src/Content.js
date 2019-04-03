import MovieList from "./MovieList.js";
import MovieDetails from "./MovieDetails.js";
import Search from "./Search.js";

export default class Content extends lng.Component {

    static _template() {
        return {
            List: {alpha: 0, type: MovieList, signals: {select: "_select"}},
            Details: {alpha: 0, type: MovieDetails},
            Search: {alpha: 0, type: Search}
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
                _select(movie) {
                    this._setState("Details", [movie.data]);
                }
            },
            class Search extends this {
                $enter() {
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
                    this._setState("List");
                }
            }
        ]
    }

}
