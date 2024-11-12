import { createTextVNode, h } from "../../lib/guide-mini-vue.esm.js"
import { Foo } from "./Foo.js"

export const App = {
    render() {
        const app = h("div", {}, "App")
        const foo = h(Foo, {}, {
            header: ({age}) => [h("p", {}, `I am ${age} years old`), createTextVNode("This is the header")],
            footer: () => h("p", {}, "This is the footer")
        })
        return h("div", {}, [app, foo])
    },
    setup() {
        return {
            msg: "mini-vue"
        }
    }
}