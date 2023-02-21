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

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/**
 * * Lecture 6 of Section 11
 * * Creating DOM Elements
 */

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice.sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${mov}€</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = acc => {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = acc => {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((mov, acc) => acc + mov, 0);
  const outcome = acc.movements
    .filter(mov => mov < 0)
    .reduce((mov, acc) => acc + mov, 0);
  const interestRate = 1.2;
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${income}€`;
  labelSumOut.textContent = `${Math.abs(outcome)}€`;
  labelSumInterest.textContent = `${interest}€`;
};

const createUserName = accs => {
  accs.forEach(acc => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserName(accounts);

const updateUI = acc => {
  // Display Movements
  displayMovements(acc.movements);
  // Display Balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};
// Event Handlers
let currentAccount;

btnLogin.addEventListener('click', e => {
  // Prevent form from submitting
  e.preventDefault();
  // currentAccount = accounts.find(acc => acc.userName === inputLoginUsername.value && acc.pin === Number(inputLoginPin.value))
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and Message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  } else {
    containerApp.style.opacity = 0;
    alert('Invalid Credentials');
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.userName !== currentAccount.userName
  ) {
    // Doing the Transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  } else {
    alert('Invalid Transfer');
  }

  // console.log(accounts);
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movements
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', e => {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );
    // Delete Account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
});

let sorted = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/**
 * * *** Lecture 8 of Section 11
 * * *** Coding Callenge NO 1
 */

// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice();
//   const dogs = dogsJuliaCorrected.slice(1, 3).concat(dogsKate);
//   dogs.forEach(function (dog, i) {
//     dog >= 3 ?
//       console.log(`Dog number ${i+1} is an adult, and is ${dog} years old`) :
//       console.log(`Dog number ${i+1} is  is still a puppy 🐶`);
//   })

// }

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

/**
 * * Lecture 8 of Section 11
 * * Data Transformations: map, filter, reduce
 *
 * ! Maps:
 * * Map create a brand new Array BAsed on the original array.
 * * Map methods take an array  loops over that array and each irreation its applies a Call back function  to the current array element
 * * map returns a new array containing the result of applying an operation on all original array elements.
 * ! Filter:
 * * is Used to filter for elements in the original Array which satisfy a certain condition
 * * Filter Returns a new Array containing the array elements that passed a specific condition
 * ! Reduce:
 * * Reduce Boils ("reduces") all array elements down to one single value (e.g adding all elements together)
 */

/**
 * * Lecture 9 of Section 11
 * * The MAP Method
 */

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const euroToUsd = 1.1;

// const movementsUSD = movements.map(mov => mov * euroToUsd)

// console.log(movementsUSD)

// const movementsUSDfor = []
// for (const mov of movements) movementsUSDfor.push(mov * euroToUsd)
// console.log(movementsUSDfor)

// const movementsDescriptions = movements.map((mov, i) =>
//   `Movement ${i + 1}: You ${mov>0 ? "deposited" : "withdrew"} ${Math.abs(mov)}`
// )

// console.log(movementsDescriptions)

/**
 * * Lecture 10 of Section 11
 * * Computing Username
 */

// const createUserName = (accs) => {
//   accs.forEach(acc => {
//     acc.userName = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
//   })
// }

// createUserName(accounts)
// console.log(accounts);

/**
 * * Lecture 11 of Section 11
 * * Filter Methods
 */

// With Filter

// const desposits = movements.filter(mov => mov > 0);
// console.log(desposits);

// const withDrawals = movements.filter(mov => mov < 0)
// console.log(withDrawals);

// With for of Loop
// const despositsArray = [];
// for (const mov of movements)
//   if (mov > 0) {
//     despositsArray.push(mov)
//   }

// console.log(despositsArray);

/**
 * * Lecture 12 of Section 11
 * * The Reduce Method
 */

// // accumulator -> SNOWBAll
// const balance = movements.reduce((acc, mov) => acc + mov, 0);
// console.log(balance);

// // With For Of loop

// let balance2 = 0;
// for (const mov of movements) balance2 += mov;
// console.log(balance2);

// Maximun Value

// const max = movements.reduce((acc, mov) => acc > mov ? acc : mov, movements[0])
// const min = movements.reduce((acc, mov) => acc < mov ? acc : mov, movements[0])

// console.log(max)
// console.log(min)

/**
 * * *** Lecture 13 of Section 11
 * * *** Coding Callenge NO 2
 */

// const calcAverageHumanAge = ages => {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adults = humanAges.filter(age => age >= 18);
//   // Average
//   // 2 3. (2+3)/2 = 2.5 === 2/2+3/2 =2.5
//   const average = adults.reduce(
//     (acc, age, i, arr) => acc + age / arr.length,
//     0
//   );
//   return average;
// };

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// console.log(avg1, avg2);

/**
 * * *** Lecture 14 of Section 11
 * * *** The MAgic of chaining Methods
 */

// // PIPELINE
// const euroToUsd = 1.1;
// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   // .map(mov => mov * euroToUsd)
//   .map((mov, i, arr) => {
//     return mov * euroToUsd
//   })
//   .reduce((acc, mov) => acc + mov, 0);
// console.log('totalDepositsUSD');
// console.log(totalDepositsUSD);

/**
 * * *** Lecture 15 of Section 11
 * * *** Coding Callenge NO 3
 */

// const calcAverageHumanAge = ages =>
//   ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4)).filter(age => age >= 18).reduce((acc, age, i, arr) => acc + age / arr.length, 0);;

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// console.log(avg1, avg2);

/**
 * * *** Lecture 16 of Section 11
 * * *** The find Method
 */

// const firstWithDrawal = movements.find(mov => mov < 0);
// console.log(movements)
// console.log(firstWithDrawal)

// const account = accounts.find(acc => acc.owner === "Jessica Davis")
// console.log(account)

/**
 * * Lecture 18 of Section 11
 * * Some and Every
 */

/**
 * * Some
 */
// console.log(movements);

/**
 * * Equality
 */
// console.log(movements.includes(-130));

/**
 * * Condition
 */
// console.log(movements.some(mov => mov === -130));

// const anyDeposits = movements.some(mov => mov > 0);
// console.log(anyDeposits);

/**
 * * Every
 */

// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

// Seprate CallBacks

// const desposit = mov => mov > 0;
// console.log(movements.some(desposit));
// console.log(movements.every(desposit));
// console.log(movements.filter(desposit));

/**
 * * Lecture 19 of Section 11
 * * Flat anf FlatMap
 */

// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());

// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat());

// const overAllBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overAllBalance);

/**
 * * Flat Map
 */
// const overAllBalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overAllBalance);

/**
 * * Lecture 20 of Section 11
 * * Sorting Arrays
 */

/**
 * * Strings
 */
// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort());
// console.log(owners);

/**
 * * Numbers
 */

// console.log(movements);
// Return < 0 , 0, A, B (Keep order)
// Return > 0 , 0, B, A (switch order);

/**
 * * Ascending
 */
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
// console.log(movements);
// movements.sort((a, b) => a - b);
// console.log(movements);

/**
 * * Descending
 */
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a > b) return 1;
// });
// console.log(movements);

// movements.sort((a, b) => b - a);
// console.log(movements);

// const arr = [1, 2, 3, 4, 5, 6, 7, 8];
// console.log(new Array(1, 2, 3, 4, 5, 6, 7, 8));
// // Empty Arrays + fill methods
// const x = new Array(8);
// console.log(x);
// // console.log(x.map(() => 5));
// x.fill(1, 3, 5);
// console.log(x);

// arr.fill(23, 2, 6);
// console.log(arr);

// // Array.From
// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

// const z = Array.from({ length: 7 }, (_, i) => i + 1);
// console.log(z);

// const diceRolls = Array.from({ length: 100 }, () =>
//   (Math.random() * 6).toFixed()
// );
// console.log(diceRolls);

// labelBalance.addEventListener('click', () => {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     el => Number(el.textContent.replace('€', ''))
//   );
//   console.log(movementsUI);

//   const movementsUI2 = [...document.querySelectorAll('.movements__value')];
//   console.log(movementsUI2);
// });

/**
 * * Lecture 21 of Section 11
 * * Arrays Method Pratice
 */

/**
 * * 1.
 */

// const bankDepositSum = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 0)
//   .reduce((sum, cur) => sum + cur, 0);
// console.log(bankDepositSum);

/**
 * * 2.
 */

// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(dep => dep >= 1000).length;

// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);

// console.log(numDeposits1000);

/**
 * * 3
 */

// const { deposits, withdarwals } = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sums, cur) => {
//       cur > 0 ? (sums.deposits += cur) : (sums.withdarwals += cur);
//       return sums;
//     },
//     { deposits: 0, withdarwals: 0 }
//   );

// console.log(deposits);
// console.log(withdarwals);

/**
 * * 4
 */

// this is a nice title -> This Is a Nice Title
// const convertTitleCase = title => {
//   const capitalize = str => str[0].toUpperCase() + str.slice(1);

//   const expections = ['a', 'an', 'the', 'And', 'but', 'or', 'on', 'in', 'with'];
//   const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(word => (expections.includes(word) ? word : capitalize(word)))
//     .join(' ');

//   console.log(capitalize(titleCase));
// };

// convertTitleCase('this is a nice title');
// convertTitleCase('this is a LONG title but not to long');
// convertTitleCase('and here is another title with an EXAMPLE');

// TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.

dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

// 2.
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
  }`
);

// 3

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

// 4.

("Matilda and Alice and Bob's dogs eat too much!");
("Sarah and John and Michael's dogs eat too little!");

console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// 5.
console.log(dogs.some(dog => dog.curFood === dog.recFood));

// 6.

const checkEatingOkay = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;
console.log(dogs.some(checkEatingOkay));

// 7.
console.log(dogs.filter(checkEatingOkay));

// 8.

const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);
