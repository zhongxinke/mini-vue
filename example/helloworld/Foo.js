export const Foo = {
    setup(props) {
        console.log(props)
    },
    render() {
        return h("div", {}, "foo: " + this.count)
    }
}