"use strict";
// const calcAverageHumanAge = function (ages) {
//   const ageslessthan2 = ages.filter((ele) => ele <= 2);
//   const agesgreaterthan2 = ages.filter((ele) => ele > 2);
//   const adultarr = agesgreaterthan2.map((ele) => 16 + ele * 4);
//   const adultavg =
//     adultarr.reduce((acc, val) => acc + val, 0) / adultarr.length;
//   console.log(adultavg);
// };

const calcAverageHumanAge = (ages) => {
  const agex = ages
    .map((ele) => (ele > 2 ? 16 + ele * 4 : ele * 2))
    .filter((ages) => {
      return ages >= 18;
    });
  const avg =
    agex.reduce((acc, ele) => {
      return acc + ele;
    }, 0) / agex.length;
  console.log(avg);
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
