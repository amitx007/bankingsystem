"use strict";
const x = new Array(7);
console.log(x);
x.fill(1, 2, 4);
console.log(x);
x.splice(2, 4);
console.log(x);

// Array.form
const y = Array.from({ length: 10 }, (_, i) => i + 1);
console.log(y);
const z = Array.from({ length: 100 }, (_, i) => i + 1);
console.log(z);
