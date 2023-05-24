// 同步任务：
// 异步任务：宏任务（时间器，ajax），微任务(then)
// 记住执行顺序： 先同后异，先微后宏

console.log(1) // 同步
setTimeout(function () {
  console.log(0) // 异步-宏
}, 2000)
const promise = new Promise((resolve, reject) => {
  console.log(4) // 同步
  resolve(2)
})
promise.then((data) => {
  console.log(data) // 异步-微
})
console.log(3) // 同步

// 1 4 3 2 0
