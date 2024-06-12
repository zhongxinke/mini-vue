# reactive

## 实现 stop

## 实现 readonly

实现 readonly 比较简单，在触发 set 时，提示报错即可

```js
const obj = readonly({ age: 10 });
obj.age++; // 报错
```

## 实现 isReactive 和 isReadonly

实现 isReactive 和 isReadonly，可以通过特殊的 key，透过 get 来判断

```js
const obj = new Proxy(, {
    get: (target, key) {
        if (key === 'isReactive') {
            return !isReadonly
        }

        if (key === 'isReadonly') {
            return isReadonly
        }
    }
})
```
