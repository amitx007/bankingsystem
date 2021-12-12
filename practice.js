"use strict ";
let arr1 = [1, 2, 3, 4, 5, 6];

// -------> indexof()
console.log(arr1.indexOf(4));
// index of method we give the element and it return the the index number of that element or else return -1 if element is not present so it equates on equality

// -------> findindex(// call back function)
console.log(arr1[arr1.findIndex((e) => e >= 3)]);
// find index method takes a callback function and in that we put and condition and the which ever element in the array satisfy it returns its index otherwise it returns -1

// spread operator synatx :--> ... it just work alike a loop it returns all the elements in the array  it not only works on the array only it also work on an object a string basically any iterable element This spread opearator actually return elements separated by comma so we can even use it in function having multiple parameter

console.log(...arr1);
console.log(..."amit");

// rest pattern ---> syntax :---> ... its syntax is also quite similar to spread opeartor but its job is quite opposite to the spread operator it actually combines multiple elements into single array

// destructuring array
// old way of assigning elements of the array to variables
let x = arr1[0];
let y = arr1[1];
let z = arr1[2];
console.log(x, y, z);
// in es6 their is an marvelous way of assigning various elements to the variables
let [x1, y1, ...z1] = arr1;
console.log(x1);
console.log(y1);
console.log(z1);

// for nested array
let arr2 = [1, 2, [3, 4]];
let [a, b, [c, d]] = arr2;
console.log(a, b, c, d);

// nulish coaelsing opearator it does operate on nulissh &=
// entries ---> arrayname.entries() it return an array iterator which constains multiple array and this each array constains the index and element
console.log(...arr1.entries());

// various ways of iterating through array 1---> for loop 2---> while loop 3-----> foreach loop 4----> for of loop

// optional chaining
//  if we try to use an indefined object and try to get some method then we will get an error so first we have to check if the obj exist then we can do anyting  syntax ----> ?.

// sets

