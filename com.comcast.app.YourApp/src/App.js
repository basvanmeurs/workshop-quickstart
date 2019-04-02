export default class App extends ux.App {

    static getFonts() {
        return [
        ]
    }

    static _template() {
        return {
            Hello: {
                text: {text: "Hello world"}
            }
        };
    }

}