# Promise介绍

# 为什么需要promise

需求：异步的按顺序依次去读取1.txt、2.txt、3.txt文件的内容。

假设  1.txt内容为111 ，2.txt内容为222，3.txt内容为333

```javascript
fs.readFile('./1.txt', 'utf8', function (err, data1) {
  console.log(data)
  fs.readFile('./2.txt', 'utf8', function (err, data2) {
    console.log(data2)
    fs.readFile('./3.txt', 'utf8', function (err, data3) {
      console.log(data3)
    })
  })
})
// 结果： 111 222 333
```



上面异步代码带来的问题：回调地狱！！ 非常不优雅，也不利于维护。

回调地狱：回调函数套回调函数，层层嵌套 

所以，promise就是用来解决**回调地狱**的问题。



# 什么是Promise

## 介绍

- Promise是ES6中的新特性,是异步编程的一种解决方案： 它可以获取异步操作成功或失败的结果。
- 使用 Promise 可以使异步操作更加直观和易于管理

Promise英文名是承诺的意思，它承诺一段时间后会给你一个状态（成功，失败）。

## Promise对象的三种状态

- `pending`：初始状态，表示异步操作正在进行中。
- `fulfilled`：表示异步操作成功。
- `rejected`：表示异步操作失败。


且状态不可逆！




# Promise基本使用

Promise是一个构造函数，通过new操作可以创建一个promise对象

```js
const p = new Promise((resolve, reject) => {
    // 执行一些异步操作
});
```

Promise的构造函数接收一个参数函数，并且这个函数需要传入两个参数：

- resolve ：成功的回调函数,将状态从pending变为fulfilled。
- reject：失败的回调函数,将状态从pending变为rejected。


且状态仅能**改变一次**！！改变一次后面不能在变更。

```javascript
const p = new Promise((resolve, reject) => {
  // 执行一些异步操作
  resolve('在一起') // 执行异步成功的回调
  // reject('没缘分')   // 执行异步失败的回调
    throw new Error('没缘分2') // 执行异步失败的回调
})

p.then((data) => {
  // 处理异步操作成功的结果
  console.log('success:', data)
}).catch((err) => {
  // 处理异步操作失败的结果
  console.log('fail:', err)
})
```



在Promise构造函数的原型上有个then、catch的方法 。 

- then ：异步执行成功的回调函数 then(successCallback[,failCallback])，此方法返回一个新的Promise对象
- catch：异步执行失败的回调函数 catch(failCallback)，此方法返回一个新的Promise对象


```js
const { readFile } = require('fs')

const promise = new Promise((resolve, reject) => {
  readFile('./1.txt', 'utf-8', (err, data) => {
    if (err) {
      reject(err) // 将状态改为失败
    }
    resolve(data) // 将状态改为成功
  })
})

promise
  .then((data) => {
    console.log('data:', data)
  })
  .catch((err) => {
    console.log('err:', err.message)
  })
// 如果promise状态为成功（fulFilled）,调用then
// 如果promise状态为失败（rejected）,调用catch
```



# readFile封装promise风格

- 封装一个基于promise异步读取文件的函数

```javascript
const fs = require('fs')

// 封装一个函数，将readFile转成promise调用形式
function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        // 失败
        reject(err.message)
      }
      // 成功
      resolve(data)
    })
  })
}


const promise = readFilePromise('./1.txt')
promise
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })

```



课堂练习：将nodejs中的异步api封装成promise调用形式。

- writeFile


- rename
- unlink
- ...

> 注意：几乎所有的异步api都可以转成promise的调用风格









# 链式调用

采用**链式调用**解决之前的回调地狱问题：

>  **then()** 方法会默认返回一个新的 Promise 对象
>
>  如果then没有返回值，则会返回一个成功状态的promise对象的值，值为函数的返回值

原理：在上一个 then 方法中返回一个新的 Promise 对象，以便在下一个 then 方法中处理它的异步操作结果。

需求：按顺序依次读取1.txt、2.txt、3.txt文件的内容。

```javascript
// 需求：异步的按顺序依次去读取1.txt、2.txt、3.txt文件的内容。
const { readFile } = require('fs')

// 将readFile封装成一个promise风格
function readFilePromise(path) {
  // 1. 返回一个promise对象
  return new Promise((resolve, reject) => {
    // 2. 在promise中的构造函数中执行异步操作，成功调用resolve,失败reject
    readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

// 原理：在上一个 then 方法中返回一个新的 Promise 对象，以便在下一个 then 方法中处理它的异步操作结果。
// 如果then没有返回值，则会返回一个成功状态的promise对象的值，值为函数的返回值
// 需求：异步的按顺序依次去读取1.txt、2.txt、3.txt文件的内容
readFilePromise('./1.txt')
  .then((data) => {
    console.log('data:', data)
    return readFilePromise('./2.txt')
  })
  .then((data) => {
    console.log('data:', data) //
    return readFilePromise('./3.txt')
  })
  .then((data) => {
    console.log('data:', data) // 333
  })

```

由于readFilePromise返回的是一个promise对象，所以可以调用`.then`往后**链式调用**，这正是promise的精髓。



# promisify将异步Api转promise风格

利用nodejs中util模块中的promisify方法，可以将异步的Api转成promise调用风格！

```js
const { promisify } = require('util')
const { writeFile } = require('fs')

// 将writeFile异步api转成promise风格
const writeFilePromise = promisify(writeFile)
const renamePromise = promisify(rename)

writeFilePromise('./5.txt', '我在小小花园里，挖呀挖呀挖')
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })
```



# Promise常用的几个静态方法

- Promise.all()
- Promise.race()
- Promise.resolve()
- Promise.reject()

## Promise.all()

`Promise.all` ：用于并行处理多个异步操作，它返回一个新的 Promise 对象。

作用：可以实现多个异步操作的并发（并行）请求。

- 并行：一起同时请求。

- 串行：按顺序请求。

  ​

```javascript
// 并行执行多个异步任务，
const p = Promise.all([promise3, promise1, promise2])

p.then((data) => {
  // 所有异步操作都成功才执行，会获取所有的结果
  console.log(data)
}).catch((err) => {
 // 任意一个异步失败了，则触发
  console.log(err)
})

// 结果：['333','111','222']

```

注意：Promise.all的成功结果是返回一个数组，数组中的结果顺序与Promise.all数组的传参顺序是一样的。



应用场景：尤其在一个页面需要同时发送多个ajax请求时,为了提高请求效率可以采用并行请求，可以加快页面中资源的获取。



## Promise.race()

顾名思义，Promse.race就是赛跑的意思，意思就是说，哪个异步操作先完成，则优先获取它的结果。

相当于多人赛跑一样，但是金牌只能发给第一名的选手。

```javascript
Promise.race([promise1, promise2, promise3])
  .then(function (data) {
    // 所有异步操作都成功才执行，但只获取最快的哪个结果
    console.log(data)
  })
  .catch((err) => {
    // 任意一个异步失败了，则触发
    console.log(data)
  })
```



两者区别：


- Promise.all并行执行，获取所有的异步操作结果
- Promise.race并行执行，获取异步最快返回的结果



## Promise.resolve()

作用：将promise对象状态改为成功(fulfilled)。

```javascript
const promise = new Promise((resolve) => resolve(8))
// 等价于
const promise = Promise.resolve(8)

promise.then((data) => {
  console.log(data)
})
```



## Promise.reject()

作用：将promise对象状态改为失败(rejected)。

```js
const promise = new Promise((resolve,reject) => reject(0))
// 等价于
const promise = Promise.reject(0)

promise
  .then((data) => {
    console.log('data:', data)
  })
  .catch((err) => {
    console.log('err:', err)
  })

```





# Promise的三种行为

- 值穿透
- 异常穿透
- 中断promise链

## 值穿透

>  **then()** 默认方法返回一个新的 [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

值穿透（value propagation）：当 Promise 对象的 then 方法没有返回值（返回undefined）时，会默认返回一个新的状态为成功（ fulfilled）的Promise 对象。这个过程叫做值穿透。

```js
Promise.resolve('hello')
  .then((data) => {
    console.log('step 1', data)
    // return Promise.resolve(undefined)
  })
  .then((data) => {
    console.log('step 2', data)
    // return Promise.resolve(undefined)
  })
  .then((data) => {
    console.log('step 3', data)
  })

结果：
step 1 hello
step 2 undefined
step 3 undefined

```

## 异常穿透

异常穿透（error propagation）：当 Promise 对象的 catch方法没有返回值时，会默认返回一个新的 状态为 成功的（fulfilled） 的Promise 对象。这个过程叫做异常穿透。



```js
Promise.reject(1)
  .then(() => {
    console.log('step 1')
  })
  .catch(() => {
    console.log('step 2')
  })
  .then(() => {
    console.log('step 3')
  })
  .then(() => {
    console.log('step 4')
  })
结果：
step 2
step 3
step 4
```



## 中断Promise链

有两种方式：

1.  抛出一个异常
2. 返回一个reject状态的promise

```js
Promise.resolve(1)
  .then(() => {
    console.log('step 1')
    return Promise.resolve(2)
  })
  .then(() => {
    console.log('step 2')
    return Promise.reject('fail')
    // 或者
    // throw new Error('fail ')
  })
  .then(() => {
    console.log('step 3')
  })
  .then(() => {
    console.log('step 4')
  })
  .catch((err) => {
    console.log('err')
  }) 

结果：
step 1
step 2
err

```



# promise执行的顺序

注意点：

- new Promise构造函数中代码是同步执行的
- then中回调函数是异步执行的。
```js
console.log(1)
const promise = new Promise((resolve, reject) => {
  // 这里同步执行
  console.log(3)
  resolve(2)
})
promise.then((res) => {
  // 这里是异步执行
  console.log(res) // 2
})
console.log(4)

// 结果：1 3 4 2

```



- 代码分为同步和异步
- 异步代码：分宏任务和微任务



代码执行顺序：先同后异，执行完后所有的同步代码，异步代码按照**先微后宏**。

- 宏任务：setTimeout、setInterval,ajax
- 微任务：then的回调


```js
console.log(1)
setTimeout(() => {
  console.log(2)
}, 100)
console.log(3)
const promise = new Promise((resolve) => {
  console.log(4)
  resolve(5)
})
promise.then((data) => {
  console.log(data)
})
setTimeout(() => {
  console.log(6)
}, 200)
// 结果： 1 3 4 5 2 6
```