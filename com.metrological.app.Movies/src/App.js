import Content from "./Content.js";

export default class App extends ux.App {

    static _template() {
        return {
            Content: {
                alpha: 0,
                type: Content
            },
            Player: {
                alpha: 0,
                type: ux.tools.player.Player
            }
        }
    }

    _init() {
        this._setState("Content");
    }

    $play(item) {
        const player = this.tag('Player');
        if (player.play({item})) {
            this._setState("Player");
        }
    }

    static _states() {
        return [
            class Content extends this {
                $enter() {
                    this.tag("Content").setSmooth('alpha', 1);
                }
                $exit() {
                    this.tag("Content").setSmooth('alpha', 0);
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
                    this._setState("Content");
                }
                _getFocused() {
                    return this.tag("Player");
                }
            }
        ]
    }

}
