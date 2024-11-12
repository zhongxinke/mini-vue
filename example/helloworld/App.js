import { provide, inject, h} from "../../lib/guide-mini-vue.esm.js"

const Provider = {
    name: "Provider",
    setup() {
        provide("foo", 'foovalue1');
        provide("bar", "barvalue1");
    },
    render() {
        return h("div", {}, [h("p", {}, "provide"), h(ProviderTwo)])
    }
}
const ProviderTwo = {
    name: "ProviderTwo",
    setup() {
        provide("footwo", 'footwovalue');
        const foo = inject("foo");
        return {
            foo
        }
    },
    render() {
        return h("div", {}, [h("p", {}, "providerTwo, parent foo: " + this.foo), h(Consumer)])
    }
}

const Consumer = {
    name: "Consumer",
    setup() {
        const foo = inject("foo");
        const bar = inject("bar");
        const baz = inject("baz", "default baz value");
        return {
            foo,
            bar,
            baz
        }
    },
    render() {
        return h("div", {}, [h("p", {}, `foo: ${this.foo}, bar: ${this.bar} baz: ${this.baz}`)])
    }
}

export const App = {
    render() {
        return h("div", {}, [h("p", {}, "apiInject"), h(Provider)])
    },
    setup() {}
}