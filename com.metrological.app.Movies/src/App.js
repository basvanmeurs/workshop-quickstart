import Content from "./Content.js";
import Menu from "./Menu.js";
import Api from "../lib/Api.js";

export default class App extends ux.App {

    static _template() {
        return {
            Loader: {rect: true, color: 0xFF000000, w: 1920, h: 1080,
                Label: {text: {text: "Loading..", fontSize: 60}, mount: 0.5, x: 1920/2, y: 1080/2}
            },
            Main: {
                alpha: 0,
                Menu: {type: Menu, zIndex: 1, signals: {select: "_selectMenuItem"}},
                Content: {
                    type: Content
                },
            },
            Player: {
                alpha: 0,
                type: ux.tools.player.Player
            }
        }
    }

    _init() {
        this._setState("Loading");
    }

    $play(item) {
        const player = this.tag('Player');
        if (player.play({item})) {
            this._setState("Player");
        }
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
                    this.tag("Content").movies = movies;
                    this._setState("Main.Content");
                }
            },
            class Main extends this {
                $enter() {
                    this.tag("Main").setSmooth('alpha', 1);
                }
                $exit() {
                    this.tag("Main").setSmooth('alpha', 0);
                }
                static _states() {
                    return [
                        class Menu extends this {
                            _getFocused() {
                                return this.tag("Menu");
                            }
                            _handleDown() {
                                this._setState("Main.Content");
                            }
                            _selectMenuItem(value) {
                                this.tag("Content").setActivePage(value);

                                // Automatically switch over to content focus.
                                this._setState("Main.Content");
                            }
                        },
                        class Content extends this {
                            _getFocused() {
                                return this.tag("Content");
                            }
                            _handleUp() {
                                this._setState("Main.Menu");
                            }
                            _handleBack() {
                                this._setState("Main.Menu");
                            }
                        }
                    ]
                }
                _getFocused() {
                    return this.tag("Content");
                }
            },
            class Player extends this {
                $enter() {
                    this.tag("Player").setSmooth('alpha', 1);
                }
                $exit() {
                    this.tag("Player").setSmooth('alpha', 0);
                }
                _handleBack() {
                    this._setState("Main.Content");
                }
                _getFocused() {
                    return this.tag("Player");
                }
            }
        ]
    }

    _setFocusSettings(settings) {
        settings.showMenu = true;
    }

    _handleFocusSettings(settings) {
        this.tag("Menu").show = settings.showMenu;
    }

}
