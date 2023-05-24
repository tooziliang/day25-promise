var a = 1
function A() {
  console.log(a) // 1
}

function B() {
  var a = 2
  A()
}

B()
