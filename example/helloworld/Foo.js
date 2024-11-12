import { h, renderSlots } from "../../lib/guide-mini-vue.esm.js"

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
        const foo = h("p", {}, "foo")
        const age = 19
        console.log(this.$slots)
        return h('div', {}, [
            renderSlots(this.$slots, "header", {age}),
            foo,
            // renderSlots(this.$slots, "footer", {age}),
        ])
    }
}