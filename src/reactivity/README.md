# reactive

## 实现 stop

## 实现 readonly

实现 readonly 比较简单，在触发 set 时，提示报错即可

```js
const obj = readonly({ age: 10 });
obj.age++; // 报错
```
