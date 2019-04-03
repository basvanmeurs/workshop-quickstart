import SearchInput from "./SearchInput.js";

export default class Search extends lng.Component {

    static _template() {
        return {
            y: 200,
            Wrapper: {
                x: 50, w: 1820, y: 0,
                Input: {type: SearchInput}
            }
        }
    }

    _getFocused() {
        return this.tag("Input");
    }

}