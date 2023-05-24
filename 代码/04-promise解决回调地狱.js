// 需求：异步的按顺序依次去读取1.txt、2.txt、3.txt文件的内容。
const { readFile } = require('fs')

// 回调地狱：就是回调函数层层嵌套
readFile('./1.txt', 'utf-8', (err, data) => {
  console.log(data)
  readFile('./2.txt', 'utf-8', (err, data) => {
    console.log(data)
    readFile('./3.txt', 'utf-8', (err, data) => {
      console.log(data)
    })
  })
})
