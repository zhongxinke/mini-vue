import { ShapeFlags } from "../share/ShapeFlags"
import { createComponentInstance, setupComponent } from "./component"
import { Fragment, Text } from "./createVNode"

export function render(vnode, container) {
    patch(vnode, container)
}

function patch(vnode, container) {

    // TODO 判断vnode是不是element
    // 是element, 处理element
    const { shapeFlag, type } = vnode
    switch (type) {
        case Fragment:
            processFragment(vnode, container)
            break;
        case Text:
            processText(vnode, container)
            break;
        default:
            if (shapeFlag & ShapeFlags.ELEMENT) {
                processElement(vnode, container)
            } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
                processComponent(vnode, container)
            }
            break;
    }
}
function processText(vnode, container) {
    const { children } = vnode
    const textNode = (vnode.el = document.createTextNode(children))
    container.append(textNode)
}

function processFragment(vnode, container) {
    mountChildren(vnode, container)
}

function processElement(vnode, container) {
    mountElement(vnode, container)
}

function mountElement(vnode, container) {
    const el = (vnode.el = document.createElement(vnode.type))
    const { children, props, shapeFlag } = vnode

    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
        el.textContent = children
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        mountChildren(vnode, el)
    }


    for (const key in props) {
        const val = props[key]

        const isOn = (key: string) => /^on[A-Z]/.test(key)
        if (isOn(key)) {
            const event = key.slice(2).toLowerCase()
            el.addEventListener(event, val)
        } else {
            el.setAttribute(key, val)
        }

    }

    container.append(el)
}

function mountChildren(vnode, container) {
    vnode.children.forEach(child => {
        patch(child, container)
    })
}

function processComponent(vnode, container) {
    mountComponent(vnode, container)
}

function mountComponent(vnode, container) {
    const instance = createComponentInstance(vnode)

    setupComponent(instance)
    setupRenderEffect(instance, vnode, container)
}

function setupRenderEffect(instance, vnode, container) {
    const { proxy } = instance;
    const subTree = instance.render.call(proxy)

    patch(subTree, container)

    vnode.el = subTree.el
}