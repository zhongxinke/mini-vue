import { camelize, toHandlerKey } from "../share/index"

export function emit(instance, event, ...args) {
    const { props } = instance
    const handerName = toHandlerKey(camelize(event))
    const handler = props[handerName]
    handler?.(...args)
}