export default class MovieDetails extends lng.Component {
    static _template() {
        return {
            rect: true, w: 1920, h: 1080, color: 0xFF005500,
            Title: {mountY: 1, y: 800,
                text: {fontSize: 90, fontStyle: 'bold'}}
        }
    }

    set movie(data) {
        this.tag("Title").text.text = data.title;
    }
}
