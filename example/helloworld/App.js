import { h } from "../../lib/guide-mini-vue.esm.js"

window.self = null
export const App = {
    render() {
        window.self = this
        return h("div", {
            id: 'root',
            onClick() {
                console.log('clicked')
            }
        },  [
            h("p", {}, 'hi'),
            h("p", {}, this.msg),
        ])
    },
    setup() {
        return {
            msg: "mini-vue"
        }
    }
}