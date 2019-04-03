export default class Menu extends lng.Component {

    static _template() {
        return {
            rect: true,
            color: 0xAA444444,
            flex: {},
            Items: {
                w: 1870,
                flex: {paddingTop: 10, paddingBottom: 10, paddingLeft: 50, paddingRight: 50, wrap: true},
                List: {
                    type: MenuItem,
                    label: "List",
                    value: "List"
                },
                Search: {
                    type: MenuItem,
                    label: "Search",
                    value: "Search"
                }
            },
            BorderBottom: {
                flexItem: false,
                w: w=>w,
                h: 2,
                y: h=>h-2,
                rect: true,
                color: 0xFFEEEEEE
            }
        }
    }

    get _items() {
        return this.tag("Items").childList;
    }

    _construct() {
        this._index = 0;
    }

    _build() {
        this.activeItem = this._selectedItem.value;
    }

    _handleRight() {
        if (this._index < this._items.length - 1) {
            this._index++;
        }
    }

    _handleLeft() {
        if (this._index > 0) {
            this._index--;
        }
    }

    get _selectedItem() {
        return this._items.getAt(this._index);
    }

    _handleEnter() {
        const value = this._selectedItem.value;
        this.activeItem = value;
        this.signal("select", value);
    }

    _getFocused() {
        return this._items.getAt(this._index);
    }

    set activeItem(value) {
        this._items.forEach(item => {
            item.active = item.value === value;
        })
    }

    set show(v) {
        this.setSmooth('mountY', v ? 0 : 1);
    }

}

class MenuItem extends lng.Component {

    static _template() {
        return {
            flex: {paddingTop: 20},
            flexItem: {marginRight: 30},
            Label: {
                text: {text: "List", fontSize: 48}
            },
            Underline: {
                alpha: 0,
                flexItem: false,
                w: w=>w,
                x: 0,
                h: 3,
                y: h=>h - 3,
                rect: true
            }

        }
    }

    set label(l) {
        this.tag("Label").text.text = l;
    }

    set value(v) {
        this._value = v;
    }

    get value() {
        return this._value;
    }

    set active(v) {
        this.tag("Label").color = v ? 0xFFFFFFFF : 0xFFAAAAAA;
    }

    _focus() {
        this.tag("Underline").setSmooth('alpha', 1);
    }

    _unfocus() {
        this.tag("Underline").setSmooth('alpha', 0);
    }

}