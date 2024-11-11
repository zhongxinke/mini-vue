import { h } from "../../lib/guide-mini-vue.esm.js"

export const Foo = {
    setup(props) {
        console.log(props)
        props.count = 10
    },
    render() {
        return h("div", {}, "foo: " + this.count)
    }
}