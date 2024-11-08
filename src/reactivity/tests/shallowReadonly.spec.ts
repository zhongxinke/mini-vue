import { isReadonly, shallowReadonly } from "../reactive"

describe('shallowReadonly', () => {
    test("should not make noe-reactive properites reactive", () => {
        const props = shallowReadonly({ n: { foo: 1 } })
        expect(isReadonly(props)).toBe(true)
        expect(isReadonly(props.n)).toBe(false)
    })

    it("should call console.warn when set", () => {
        console.warn = jest.fn()
        const user = shallowReadonly({
            age: 10
        })

        user.age = 20
        expect(console.warn).toHaveBeenCalled()
    })
})