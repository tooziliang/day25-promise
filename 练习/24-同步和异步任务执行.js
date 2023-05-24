// 先同后异，先微后宏

// 宏任务
setTimeout(()=>{
  console.log('宏任务');
},0)

// 微任务
Promise.resolve('success')
  .then((data)=>{
    console.log(data);
  })
