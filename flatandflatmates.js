"use strict";
const arr = [[1, 2, 3], [4, 5, 6, [7, [8]]], 9, 10];
console.log(arr.flat(3));

// sorting
const owner = ["Jonas", "Zach", "Adam", "Martha"];
console.log(owner.sort());
console.log(owner);

// sorting using number
let movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// bubble sort
// console.log(movements.sort());
// for (let i = 0; i < movements.length - 1; i++) {
//   for (let j = 1; j < movements.length - i; j++) {
//     if (movements[j - 1] > movements[j]) {
//       let temp = movements[j - 1];
//       movements[j - 1] = movements[j];
//       movements[j] = temp;
//     }
//   }
// }


// return <0  A,B (keep order)
// return >0 B,A (switch order)

movements.sort((a, b) => {
  if (a > b) {
    return 1;
  } else {
    return -1;
  }
});
console.log(movements);