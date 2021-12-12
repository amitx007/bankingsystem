"use strict";
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const USD = movements.map(function (element) {
  console.log(element * 1.1);
});
console.log(USD);
const usd2 = movements.map((element) => element * 1.1);
console.log(usd2);
