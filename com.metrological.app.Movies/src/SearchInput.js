export default class SearchInput extends lng.Component {

    static _template() {
        return {
            Wrapper: {
                texture: lng.Tools.getRoundRect(720, 60, 5, 3, 0xFF000000),
                color: 0xFFFFFFFF,
                InputGroup: {
                    x: 15, y: 4,
                    flex: {},
                    Input: {text: {fontSize: 42}, color: 0xFF000000},
                    Cursor: {
                        rect: true, w: 3, h: 40, y: 8, color: 0xFF000000
                    }
                }
            },
            Keyboard: {
                y: 80,
                type: ux.tools.keyboard.Keyboard,

                // Choose ux.tools.keyboard.AdvancedKeyboardTemplate for more characters.
                template: ux.tools.keyboard.SimpleKeyboardTemplate,

                signals: {valueChanged: "_valueChanged", ok: "_enter"}
            }
        };
    }

    _getFocused() {
        return this.tag("Keyboard");
    }

    _focus() {
        this.tag("Cursor").setSmooth('alpha', 1);
    }

    _unfocus() {
        this.tag("Cursor").setSmooth('alpha', 0);
    }

    _inactive() {
        this._clear();
    }

    _valueChanged({value}) {
        this.tag("Input").text.text = value;
    }

    _clear() {
        this.tag("Keyboard").value = "";
    }

    _enter() {
    }

}