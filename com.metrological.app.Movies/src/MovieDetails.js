export default class MovieDetails extends lng.Component {
    static _template() {
        return {
            rect: true, w: 1920, h: 1080, color: 0xFF005500,
            Title: {mountY: 1, y: 800,
                text: {fontSize: 90, fontStyle: 'bold'}}
        }
    }

    set movie(data) {
        this._data = data;
        this.tag("Title").text.text = data.title;
    }

    _handleEnter() {
        if (this._data.teaserUrl) {
            this.fireAncestors('$play', {stream: {src: this._data.teaserUrl}, title: this._data.title})
        }
    }

}
