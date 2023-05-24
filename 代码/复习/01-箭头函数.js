const add5 = () => ({ a: 1 })
let result = add5()
console.log(result) // { a: 1 }

function foo() {
  return
  1
}

console.log(foo()) // undefined

// good
const obj = {
  a: 1,
  b: 2,
}
