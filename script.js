"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function movements(movements, sort = false) {
  containerMovements.innerHTML = "";
  const array = sort
    ? [...movements].sort((a, b) => {
        if (a > b) {
          return 1;
        } else {
          return -1;
        }
      })
    : movements;
  array.forEach((element, index) => {
    let x = element >= 0 ? "deposit" : "withdrawal";
    // const div = document.createElement("div");
    // div.className = "movements__row";
    // div.innerHTML = `<div class="movements__type movements__type--${x}">${
    //   index + 3
    // } ${x} </div>
    // <div class="movements__value">${element}€</div>
    // </div>`;
    // containerMovements.prepend(div);
    const html = `
          <div class="movements__row">
          <div class="movements__type movements__type--${x}">${
      index + 1
    } ${x} </div>
          <div class="movements__value">${element}€</div>
          </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const createUsername = function (user) {
  const username = user.owner
    .toLowerCase()
    .split(" ")
    .map((element) => {
      return element[0];
    })
    .join("");
  user.username = username;
};
accounts.forEach(createUsername);

const currentBalance = function (account) {
  const balance = account.movements.reduce((acc, ele) => {
    return acc + ele;
  }, 0);
  labelBalance.innerHTML = `${balance} EUR`;
  account.balance = balance;
};

const sumin = function (movements) {
  const sum = movements
    .filter((ele) => ele > 0)
    .reduce((sum, ele) => sum + ele);
  labelSumIn.textContent = `${sum}€`;
};

const sumout = function (movements) {
  const sum = movements
    .filter((ele) => ele < 0)
    .reduce((sum, ele) => sum + ele);
  labelSumOut.textContent = `${-1 * sum}€`;
};

const interest = function (account) {
  const sum = account.movements
    .filter((ele) => ele > 0)
    .map((ele) => (ele * account.interestRate) / 100)
    .reduce((acc, ele) => acc + ele, 0);
  labelSumInterest.textContent = `${sum}€`;
};

let currentaccount;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentaccount = accounts.find((acc) => {
    return acc.username === inputLoginUsername.value;
  });
  if (currentaccount?.pin === Number(inputLoginPin.value)) {
    //display ui with welcome message
    containerApp.style.opacity = "1";
    labelWelcome.textContent = `Welcome ${
      currentaccount.owner.split(" ")[0]
    } !`;
    displayMovements(currentaccount.movements);
    currentBalance(currentaccount);
    sumin(currentaccount.movements);
    sumout(currentaccount.movements);
    interest(currentaccount);
  }
  inputLoginUsername.value = "";
  inputLoginPin.value = "";
  inputLoginPin.blur();
});

//transfer
// const inputTransferTo = document.querySelector(".form__input--to");
// const inputTransferAmount = document.querySelector(".form__input--amount");btnTransfer
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const act = accounts.find((acc) => {
    return acc.username === inputTransferTo.value;
  });
  if (
    amount > 0 &&
    currentaccount.balance >= amount &&
    act &&
    act?.username !== currentaccount.username
  ) {
    console.log(act, currentaccount);
    currentaccount.movements.push(-1 * amount);
    act.movements.push(amount);
    displayMovements(currentaccount.movements);
    currentBalance(currentaccount);
    sumin(currentaccount.movements);
    sumout(currentaccount.movements);
    interest(currentaccount);
  }
  inputTransferTo.value = "";
  inputTransferAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    currentaccount.username === inputCloseUsername.value &&
    Number(inputClosePin.value) === currentaccount.pin
  ) {
    accounts.splice(
      accounts.findIndex((acc) => acc.username === inputCloseUsername.value),
      1
    );
  }
  containerApp.style.opacity = "0";
});

// btnLoan
// inputLoanAmount
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentaccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    currentaccount.movements.push(amount);
    displayMovements(currentaccount.movements);
    currentBalance(currentaccount);
    sumin(currentaccount.movements);
    sumout(currentaccount.movements);
    interest(currentaccount);
  }
  inputLoanAmount.value = "";
});
let sort = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  if (sort === false) {
    sort = true;
  } else {
    sort = false;
  }
  displayMovements(currentaccount.movements, sort);
});
