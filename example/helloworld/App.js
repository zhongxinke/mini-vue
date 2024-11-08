export const App = {
    return() {
        return h("div", "hi, mini-vue" + this.msg)
    },
    setup() {
        return {
            msg: "mini-vue"
        }
    }
}