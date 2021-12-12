"use strict";
let movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// it checks the equality 
console.log(movements.includes(-650));

// it checks the condition but both includes() and some() returns a boolean value
console.log(movements.some(mov=>mov>1000));