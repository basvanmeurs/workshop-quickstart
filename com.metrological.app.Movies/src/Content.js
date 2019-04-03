import MovieList from "./MovieList.js";
import MovieDetails from "./MovieDetails.js";
import Api from "../lib/Api.js";

export default class Content extends lng.Component {

    static _template() {
        return {
            Content: {
                alpha: 0,
                List: {alpha: 0, type: MovieList, signals: {select: "_select"}},
                Details: {alpha: 0, type: MovieDetails}
            },
            Loader: {rect: true, color: 0xFF000000, w: 1920, h: 1080,
                Label: {text: {text: "Loading..", fontSize: 60}, mount: 0.5, x: 1920/2, y: 1080/2}
            }
        }
    }

    _init() {
        this._setState("Loading");
    }

    static _states() {
        return [
            class Loading extends this {
                $enter() {
                    this.tag("Loader").visible = true;

                    Api.getTopMovies().then((movies) => {
                        this._loaded(movies);
                    });
                }
                $exit() {
                    this.tag("Loader").visible = false;
                }
                _loaded(movies) {
                    this.tag("List").movies = movies;
                    this._setState("Content.List");
                }
            },
            class Content extends this {
                $enter() {
                    this.tag("Content").setSmooth('alpha', 1);
                }
                $exit() {
                    this.tag("Content").setSmooth('alpha', 0);
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
                                this._setState("Content.Details", [movie.data]);
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
                                this._setState("Content.List");
                            }
                        }
                    ]
                }

            }
        ]
    }

}
