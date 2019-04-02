import App from "./App.js";

export default class MovieItem extends lng.Component {
    static _template() {
        return {
            w: 600,
            h: 400,
            clipping: true,
            Background: {
            },
            Info: {
                mountY: 1,
                y: 444,
                w: 600,
                rect: true, color: 0x99000000,
                flex: {direction: 'column'},
                Title: {
                    flexItem: {marginLeft: 10, marginRight: 10},
                    text: {wordWrapWidth: 580, fontSize: 60, fontStyle: 'bold'}
                },
                Metadata: {
                    flexItem: {alignSelf: 'stretch'},
                    flex: {padding: 14, paddingTop: 0, justifyContent: 'space-between'},
                    Left: {
                        flex: {},
                        Year: {
                            flexItem: {marginRight: 10},
                            text: {fontSize: 20, fontStyle: 'bold'}
                        },
                        Genre: {
                            text: {fontSize: 20, fontStyle: 'bold'}
                        }

                    },
                    Rating: {
                        y: 4,
                        w: 107,
                        h: 17,
                        flexItem: {marginRight: 10},
                        Back: {
                            texture: {
                                type: lng.textures.ImageTexture,
                                src: App.getPath("./live/img/star-back.png")
                            }
                        },
                        Front: {
                            texture: {
                                type: lng.textures.ImageTexture,
                                src: App.getPath("./live/img/star-front.png")
                            }
                        }

                    }
                }

            }
        }
    }

    get data() {
        return this._data;
    }

    set data(data) {
        this._data = data;
        this.patch({
            Background: {src: App.getPath(data.image)},
            Info: {
                Title: {
                    text: {text: data.title}
                },
                Metadata: {
                    Left: {
                        Year: {text: {text: data.year}},
                        Genre: {text: {text: data.genre}},
                    },
                    Rating: {
                        Front: {
                            texture: {w: (data.rating * (107 / 10))},
                        }
                    }
                }
            }
        });
    }

    _focus() {
        this.tag("Info").setSmooth('y', 400);
    }

    _unfocus() {
        this.tag("Info").setSmooth('y', 444);
    }

    _handleEnter() {
        this._setState("Selecting");
    }

    _build() {
        this._selectAnimation = this.animation({duration: 0.1, autostop: true, stopDuration: 0.2,
            actions: [
                {p:'scale',v:{0:1,1:1.05}}
            ]
        });

        this._selectAnimation.on('finish', () => {
            this._selectAnimationFinished();
        });

    }

    static _states() {
        return [
            class Selecting extends this {
                $enter() {
                    this._selectAnimation.start();
                }

                _unfocus() {
                    this._setState("");
                    super._unfocus();
                }

                _selectAnimationFinished() {
                    this.signal('selected', this);
                }
            }
        ]
    }
}