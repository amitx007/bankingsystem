"use strict";
const checkdogs = (arr1, arr2) => {
  let carr1 = [...arr1];
  carr1.pop();
  carr1.pop();
  carr1.shift();
  let combined = [...carr1, ...arr2];
  combined.forEach(function (element, index) {
    if (element < 3) {
      console.log(`Dog Number ${index + 1} is still a puppy.`);
    } else {
      console.log(
        `Dog Number ${index + 1} is an adult , and is ${element} year old.`
      );
    }
  });
};

checkdogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
