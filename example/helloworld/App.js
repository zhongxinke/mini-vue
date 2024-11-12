import { h } from "../../lib/guide-mini-vue.esm.js"
import { Foo } from "./Foo.js"

export const App = {
    render() {
        return h("div", {
            id: 'root',
        },  [
            h("p", {}, 'hi'),
            h(Foo, {
                count: 1, 
                onAdd(...args) {
                    console.log('add', args)
                }
            })
        ])
    },
    setup() {
        return {
            msg: "mini-vue"
        }
    }
}