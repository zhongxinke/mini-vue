import { h } from "../../lib/guide-mini-vue.esm.js"

export const App = {
    render() {
        return h("div", {
            id: 'root'
        },  [
            h("p", {}, 'hi'),
            h("p", {}, 'mini-vue'),
        ])
    },
    setup() {
        return {
            msg: "mini-vue"
        }
    }
}