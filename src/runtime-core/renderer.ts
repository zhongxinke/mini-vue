import { ShapeFlags } from "../share/ShapeFlags"
import { createComponentInstance, setupComponent } from "./component"
import { Fragment, Text } from "./createVNode"

export function render(vnode, container) {
    patch(vnode, container, null)
}

function patch(vnode, container, parentComponent) {

    // TODO 判断vnode是不是element
    // 是element, 处理element
    const { shapeFlag, type } = vnode
    switch (type) {
        case Fragment:
            processFragment(vnode, container, parentComponent)
            break;
        case Text:
            processText(vnode, container)
            break;
        default:
            if (shapeFlag & ShapeFlags.ELEMENT) {
                processElement(vnode, container, parentComponent)
            } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
                processComponent(vnode, container, parentComponent)
            }
            break;
    }
}
function processText(vnode, container) {
    const { children } = vnode
    const textNode = (vnode.el = document.createTextNode(children))
    container.append(textNode)
}

function processFragment(vnode, container, parentComponent) {
    mountChildren(vnode, container, parentComponent)
}

function processElement(vnode, container, parentComponent) {
    mountElement(vnode, container, parentComponent)
}

function mountElement(vnode, container, parentComponent) {
    const el = (vnode.el = document.createElement(vnode.type))
    const { children, props, shapeFlag } = vnode

    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
        el.textContent = children
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        mountChildren(vnode, el, parentComponent)
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

function mountChildren(vnode, container, parentComponent) {
    vnode.children.forEach(child => {
        patch(child, container, parentComponent)
    })
}

function processComponent(vnode, container, parentComponent) {
    mountComponent(vnode, container, parentComponent)
}

function mountComponent(vnode, container, parentComponent) {
    const instance = createComponentInstance(vnode, parentComponent)

    setupComponent(instance)
    setupRenderEffect(instance, vnode, container)
}

function setupRenderEffect(instance, vnode, container) {
    const { proxy } = instance;
    const subTree = instance.render.call(proxy)

    patch(subTree, container, instance)

    vnode.el = subTree.el
}