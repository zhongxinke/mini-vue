import { createVNode } from "./createVNode"
import { render } from "./renderer"

export function createApp(rootComponent: any) {
    return {
        mount(rootContainer) {
            // 转vnode
            const vnode = createVNode(rootComponent)

            render(vnode, rootContainer)
        }
    }
}
