"use strict";
const eurtoUsd = 1.1;
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const totalDeposite = movements
  .filter((ele) => {
    return ele > 0;
  })
  .map((ele) => {
    return ele * 1.1;
  })
  .reduce((acc, mov) => {
    return acc + mov;
  },0);
console.log(totalDeposite);
