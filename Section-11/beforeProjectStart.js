'use strict';


/**
 * * BANKIST APP
 */

/**
 * * Data
 */

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

/**
 * * Elements
 */
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/**
 * * Lectures
 */

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];


/**
 * ! Points:
 * * Why Arrays do have Actually Methods?
 * * * Well, Remember that methods are simply a Function That we can call on objects.
 */


/**
 * * Lecture 1 of Section 11
 * *
 */

// let arr = ['a', 'b', 'c', "d", "e"];

/**
 * * Slice
 */

// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));
// console.log(arr.slice());
// console.log([...arr]);

/**
 * * Splice
 * ! Splice actually does mutate the original array
 */

// console.log(arr.splice(2))

// arr.splice(-1);
// console.log(arr);
// console.log(arr.splice(1, 2));
// console.log(arr);



/**
 * * Reverse
 * ! Reverse actually does mutate the original array
 */

// arr = ['a', 'b', 'c', "d", "e"];
// const arr2 = ['j', 'i', 'h', 'g', 'h']
// console.log(arr2.reverse());
// console.log(arr2);


/**
 * * Concat
 */

// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

/**
 * * Join
 */
// console.log(letters.join('   -   '));


/**
 * * Lecture 2 of Section 11
 * * The NEW AT Method
 */

// const arr = [23, 11, 64];
// console.log(arr[0]);
// console.log(arr.at(0));


// Getting last array element
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-1));

// console.log("zeeshan".at(0))
// console.log("zeeshan".at(-1))


/**
 * * Lecture 3 of Section 11
 * * Looping Arrays: forEach
 */

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const [index, movement] of Object.entries(movements)) {
//   if (movement > 0) {
//     console.log(`Movement ${Number(index) + 1}: You deposited ${movement}`)
//   } else {
//     console.log(`Movement ${Number(index) + 1}: You withdrew ${Math.abs(movement)}`)
//   }
// }

// console.log('-------------------')
// console.log('----- FOREACH -----')
// console.log('-------------------')

// movements.forEach(function (movement, index, array) {
//   console.log(array)
//   if (movement > 0) {
//     console.log(`Movement ${index+1}: You deposited ${movement}`)
//   } else {
//     console.log(`Movement ${index+1}: You withdrew ${Math.abs(movement)}`)
//   }
// })


/**
 * * Lecture 3 of Section 11
 * * forEach With Maps and Sets
 */

// // Map
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);


// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`)
// })

// // Set
// const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);
// console.log(currenciesUnique);

// currenciesUnique.forEach(function (value, key, set) {
//   console.log(`${key}: ${set}`)
// })