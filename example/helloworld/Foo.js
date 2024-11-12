import { h } from "../../lib/guide-mini-vue.esm.js"

export const Foo = {
    setup(props, {emit} = {}) {
        props.count = 10

        const emitAdd = () => {
            emit('add', 1)
        }

        return {
            emitAdd
        }
    },
    render() {
        const btn = h("button", {
            onClick: this.emitAdd
        }, 'click me')

        const foo = h("p", {}, "foo")
        return h("div", {}, [foo, btn])
    }
}