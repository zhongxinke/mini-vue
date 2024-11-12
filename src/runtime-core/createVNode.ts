import { isObject } from "../share/index"
import { ShapeFlags } from "../share/ShapeFlags"

export const Fragment = Symbol('Fragment')
export const Text = Symbol('Text')

export function createVNode(type, props?, children?) {
    const vnode = {
        type,
        props,
        children,
        shapeFlag: getShapeFlag(type),
        el: null
    }

    if (Array.isArray(children)) {
        vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN
    } else if (typeof children === 'string') {
        vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN
    }

    norimalizeChildren(vnode, children)
    return vnode
}
export function norimalizeChildren(vnode, children) {
    if (isObject(children)) {
        if (vnode.shapeFlag & ShapeFlags.ELEMENT) {
            // 如果是 element 类型的话，那么 children 肯定不是 slots
        } else {
            // 这里就必然是 component 了,
            vnode.shapeFlag |= ShapeFlags.SLOTS_CHILDREN;
        }
    }
}

export function createTextVNode(text) {
    return createVNode(Text, {}, text)
}
function getShapeFlag(type) {
    return typeof type === 'string' ? ShapeFlags.ELEMENT : ShapeFlags.STATEFUL_COMPONENT
}