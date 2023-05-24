var a = { n: 1 }
var b = a
// 先算 a.x
// 后算 =
a.x = a = { n: 2 }
console.log(a) // { n: 2 }
console.log(b) // { n: 1, x: { n: 2 } }
