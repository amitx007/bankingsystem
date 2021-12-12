"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300, 2000],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-11T23:36:17.929Z",
    "2021-12-03T17:01:17.194Z",
    "2021-12-09T10:51:36.790Z",
    "2021-12-10T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions
const calcDayspassed = (date1, date2) => {
  return Math.trunc(Math.abs(date2 - date1) / (24 * 60 * 60 * 1000));
};

const formatMovementdate = function (date) {
  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = `${date.getFullYear()}`;
  // const displayDate = `${day}/${month}/${year}`;
  const daysPassed = calcDayspassed(new Date(), date);
  if (daysPassed === 0) {
    return "Today";
  } else if (daysPassed === 1) {
    return "Yesterday";
  } else if (daysPassed <= 7) {
    return `${daysPassed} days ago!`;
  }
  return new Intl.DateTimeFormat(currentAccount.locale).format(date);
};

const option = {
  hour: "numeric", // we cannot write hours it will then not show same applies for minute
  minute: "numeric",
  second: "numeric",
  day: "numeric", // long will not work with day
  // month: "numeric", // for the month name instead of writing numeric we can write long
  month: "numeric", // their is also "2-digit" so that it will give month 06 accordingly
  // month: "2-digit",
  year: "numeric",
  // year: "long",// long will not work with year
  // weekday: "long", // numeric and 2-digit will not work with week day and weekday it gives the day
};
const formattedMov = function (acc) {
  let x = new Intl.NumberFormat(acc.locale, {
    style: "currency",
    currency: `${acc.currency}`,
  });
  return x;
};
const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const date = formatMovementdate(new Date(account.movementsDates[i]));

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${date}</div>
        <div class="movements__value">${formattedMov(account).format(
          mov.toFixed(2)
        )}</div>
      </div>
      
    `;
    const now = new Date();
    containerMovements.insertAdjacentHTML("afterbegin", html);
    //its bad to set the locale string by default it should be according to the users browsers so for that we will use navigator.language
    let locale = currentAccount.locale;
    labelDate.textContent = new Intl.DateTimeFormat(locale, option).format(now); // this method takes a locale string which includes language and then country something like this en-US (en=== english,US === country ) this whole Intl.DateTimeFormat("en-US") is a formatter which will format any date that we give into english in us
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${formattedMov(acc).format(
    acc.balance.toFixed(2)
  )}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${formattedMov(acc).format(incomes.toFixed(2))}`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${formattedMov(acc).format(
    Math.abs(out).toFixed(2)
  )}`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${formattedMov(acc).format(
    interest.toFixed(2)
  )}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    clearInterval(timex);
    time = 66;
    startLogouttimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add movement
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    setTimeout(updateUI, 2500, currentAccount);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// fake account logined
// updateUI(account1);
// containerApp.style.opacity = `1`;

//////////////////////////////////////////////////////
// dates near current balance
// const now = new Date();
// const date = (now.getDate() + "").padStart(2, 0);
// const month = (now.getMonth() + "").padStart(2, 0);
// const year = now.getFullYear();
// const hour = (now.getHours() + "").padStart(2, 0);
// const min = (now.getMinutes() + "").padStart(2, 0);
// labelDate.textContent = `${date}/${month}/${year} , ${hour}:${min}`; // this is static it will not change after centain min

// experimenting with internationalization api

const num = 111111111.111;
const option1 = {
  style: "currency",
  // style: "unit",
  unit: "celsius",
  currency: "INR",
};

// console.log(new Intl.NumberFormat("hi-IN", option1).format(num));
// console.log(new Intl.NumberFormat("en-uk", option1).format(num));
// console.log(new Intl.NumberFormat("ar-sy", option1).format(num));
// console.log(new Intl.NumberFormat(navigator.language, option1).format(num));
// console.log(new Intl.DateTimeFormat("en-UK").format(new Date()));

let time;
let timex = () => {
  let minute = (Math.trunc(time / 60) + "").padStart(2, 0);
  let second = ((time % 60) + "").padStart(2, 0);
  labelTimer.textContent = `${minute}:${second}`;
  console.log(minute, second);
  if (time === 0) {
    clearInterval(timex);
    labelWelcome.textContent = "Log in to get started";
    containerApp.style.opacity = 0;
  }
  time--;
};
const startLogouttimer = function () {
  timex();
  setInterval(timex, 1000);
};
