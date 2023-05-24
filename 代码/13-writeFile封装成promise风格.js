const { writeFile } = require('fs')

// 将writeFile异步api函数封装成一个promise函数风格
function writeFilePromise(path, data) {
  return new Promise((resolve, reject) => {
    writeFile(path, data, (err) => {
      if (err) {
        reject(err)
      }

      resolve('ok')
    })
  })
}

writeFilePromise('./4.txt', '小鸡炖蘑菇')
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err.message)
  })
