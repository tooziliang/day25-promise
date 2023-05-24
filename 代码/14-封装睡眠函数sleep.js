function sleep(wait) {
  return new Promise((resolve) => {
    // setTimeout(function () {
    //   resolve()
    // }, wait)
    // 简写
    setTimeout(resolve, wait)
  })
}

sleep(3000).then(() => {
  console.log('3s后看见我')
})

// setTimeout(function () {
//   console.log('3s后看见我')
// }, 3000)
