"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

let arr = ["a", "b", "c", "d", "e"];
// slice------> method doesn't mutate the original array and it gives a new array
console.log(arr.slice(2));
console.log([...arr]);

// splice------> method DOES mutate the original array it slice out the array and return and array that is sliced out and makes the diiference in the orignal array it cut outs the element form the array
console.log(arr.splice(2, 2));
console.log(arr);

// reverse -------->
const arr2 = [5, 4, 3, 2, 1];
console.log(arr2.reverse());

// at ------->
const arr3 = [23, 11, 78];
console.log(arr3[arr3.length - 1]);
console.log(arr3.slice(-1)[0]);
// console.log(arr3[-1]); negative no is not allowed like this
// so here comes the role of at we can use negative indexes at at
console.log(arr3.at(-1));

// for each --------->>>>>>>
let bank = [1, -1, 2, -2, 3, -3, 4, -4];
// bank = Object.entries(bank);
console.log(bank);
bank.forEach(function (element, index) {
  console.log(index, element);
});

// for each for sets
let setx = new Set([0, 2, 3, 4, 5, 5]);
console.log(setx);
setx.forEach(function (value, index, set) {
  console.log(index, value);
});

// for each for maps
let mapx = new Map([
  [1, "amit"],
  [2, "asit"],
  [3, "usudhgsh"],
  [false, "yhuvscdsh"],
]);
mapx.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
