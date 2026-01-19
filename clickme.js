let obj = {};
let y = { name: "Ronny" };
let z = { name: "John" };

obj [y] = { name: "Vivek" };
obj [z] = { name: "Akki" };

console.log (obj[z]);

function runFunc (){
  console.log ("1" + 1);
  console.log ("A" + 1);
  console.log (2 + "-2" + "2");
  console.log ("Hello" - "World" + 78);
  console.log ("Hello" + "78");
}

runFunc();

let a = 0;
let b = false;

console.log (a == b);
console.log (a === b);