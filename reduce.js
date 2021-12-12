"use strict";
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const balance = movements.reduce(function (acc, cur) {
    console.log(acc);
  return acc + cur;
}, 0); //=----> this 0 is the value of the accumulator
console.log(balance);
