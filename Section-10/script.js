'use strict';

/**
 * * * Lecture no 1 Of section 10.
 * * * Default Parameters.
 *
 */

// const bookings = [];

// const createBooking = (flightNum, numPassengers = 1, price = 200 * numPassengers) => {

//     /**
//      * * ES5
//      * *  numPassengers = numPassengers || 1;
//      * *  price = price || 199;
//      */

//     const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };

// createBooking("LH123")
// createBooking("LH123",3,600)
// createBooking("LH123",4)
// createBooking("LH123",7)

/**
 * * * Lecture no 2 Of section 10.
 * * * How Passing Arguments Works Value.
 */

// const flight = "LH123";
// const zeeshan = {
//     name: "Muhammad Zeeshan Muneer",
//     passport: 274482629862,
// }

// const checkIn = (flightNum,passenger) => {
//     flightNum = "LH199";
//     passenger.name = 'Mr. ' + passenger.name;
//     passenger.passport === 274482629862 ? alert('Checked in') : alert('Wrong Passport');
// }

// checkIn(flight,zeeshan);
// console.log(flight);
// console.log(zeeshan);

// // Is the Same as doing
// // const flightNum = flight;
// // const passenger = zeeshan;

// const newPassport = (person)=>{
//     person.passport= Math.trunc(Math.random() * 1000000000000000);
// }

// newPassport(zeeshan)
// checkIn(flight,zeeshan);
// console.log(flight);
// console.log(zeeshan);

/**
 * * * Lecture no 3 Of section 10.
 * * * First-Class & Higher-Order Functions.
 */

/**
 * * Points
 */

/**
 * * * First-Class Functions:
 * * * ---- JavaScript treats functions as first-class citizens.
 * * * ---- This means that functions are simply values.
 * * * ---- Functions are just another "Type" of Object.
 * * * ---- Store functions in variables or properties.
 * * * ---- Pass functions as arguments to other functions.
 * * * ---- Return function FROM Functions.
 * * * ---- Call methods on function.
 */
/**
 * * * Higher-Order Functions:
 * * * ---- A functions that receives another function as an arguments, taht returns a new function, or both.
 * * * ---- This is only possible because of first-class functions.
 * * * ---- Functions that receives another function.
 * * * ---- Functions that returns new function.
 */

/**
 * * * Lecture no 4 Of section 10.
 * * * Functions Accepting Callback Function.
 */

// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

// /**
//  * * High Order Function
//  */

// const transformer = function (str, fn) {
//   console.log(`Original String : ${str}`);
//   console.log(`Transformed String : ${fn(str)}`);

//   console.log(`Transformed by: ${fn.name}`);
// };

// transformer('JavaScript is the best!', upperFirstWord);

// /**
//  * * JS uses callback All the time
//  */

// const high5 = function () {
//   console.log('👋');
// };

// document.body.addEventListener('click', high5);
// ['Zeeshan', 'Omar', 'Hamza', 'Aaraf', 'Waheed'].forEach(high5);

// /**
//  * * * Lecture no 5 Of section 10.
//  * * * Functions Returning Functions.
//  */

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greeterHey = greet('Hey');
// greeterHey('Omar');
// greeterHey('Zeeshan');
// greeterHey('Aaraf');

// greet('Hello')('Zeeshan');

// const greet1 = greeting => name => {
//   console.log(`${greeting} ${name}`);
// };

// const greeterHey1 = greet1('hello');
// greeterHey1('Waheed');
// greeterHey1('Goku');
// greeterHey1('Gohan');

// /**
//  * * * Lecture no 6 Of section 10.
//  * * * The call and Apply Methods.
//  */

// const lufthansa = {
//   airline: 'lufthansa',
//   iataCode: 'LH',
//   bookings: [],
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
//     );

//     this.bookings.push({
//       flight: `${this.iataCode}${flightNum}`,
//       name,
//     });
//   },
// };

// lufthansa.book(244, 'Muhammad Zeeshan Muneer');
// lufthansa.book(244, 'Omar Ahmed');
// console.log(lufthansa);

// const eurowings = {
//   airline: 'Eurowings',
//   iataCode: 'EW',
//   bookings: [],
// };

// const swiss = {
//   airline: 'Swiss Air Line',
//   iataCode: 'LX',
//   bookings: [],
// };

// const book = lufthansa.book;

// // Does NOT work
// // book(135, 'Kashan Muneer');

// /**
//  * * Call Method
//  */

// book.call(eurowings, 213, 'Muhammad Kashan Muneer');
// console.log(eurowings);

// book.call(lufthansa, 123, 'Muneer Ahmed');
// console.log(lufthansa);

// book.call(swiss, 123, 'Muhammad Zeeshan Muneer');
// console.log(swiss);

// /**
//  * * Apply Method
//  */

// const flightData = [543, 'Omar Ahmed'];
// book.apply(swiss, flightData);
// console.log(swiss);

// book.call(swiss, ...flightData);

// /**
//  * * * Lecture no 7 Of section 10.
//  * * * The Bind Methods.
//  */

// /**
//  * * Bind Method
//  */

// const bookEW = book.bind(eurowings);
// const bookLH = book.bind(lufthansa);
// const bookLX = book.bind(swiss);

// bookEW(23, 'Azlan');

// const bookEW23 = book.bind(eurowings, 23);
// bookEW23('Muhammad Zeeshan Muneer');

// /**
//  * * With Event Listeners
//  */

// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log(this);

//   this.planes++;
//   console.log(this.planes);
// };

// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// /**
//  * * Partial Application
//  */

// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// const addVat = addTax.bind(null, 0.23);
// // addVat = value =>value + value * 0.23;

// console.log(addVat(100));
// console.log(addVat(23));

// const addTaxRate = function (rate) {
//   return function (value) {
//     return value + value * rate;
//   };
// };

// const addVat2 = addTaxRate(0.23);
// console.log(addVat2(100));
// console.log(addVat2(23));

/*
 * * Coding Challenge #1
 */
/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],

  // This generates [0,0,0,0]. More in the next Section...
  answer: new Array(4).fill(0),

  registerNewAnswer() {
    // Get Answer
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    // Register Answer
    typeof answer === 'number' &&
      answer < this.answer.length &&
      this.answer[answer]++;

    this.displayResult();
    this.displayResult('string');
  },

  displayResult(type = 'array') {
    if (type === 'array') {
      console.log(this.answer);
    } else if (type === 'string') {
      console.log(`Poll result are ${this.answer.join(', ')}`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResult.call({
    answer: [5, 2, 3],
  },
  'string'
);
poll.displayResult.call({
    answer: [1, 5, 3, 9, 6, 1],
  },
  'string'
);
poll.displayResult.call({
  answer: [1, 5, 3, 9, 6, 1],
});

/**
 * * * Lecture no 8 Of section 10.
 * * * Immediately Invoked Function Expression (IIFE).
 */

const runOnce = () => {
  console.log('This will never run again');
};

runOnce();

/**
 * * IIFE
 */

(function () {
  console.log('This will never run again');

  const isPrivate = 23;
})();

// console.log(isPrivate);

(() => console.log('This will ALSO never run again'))();

{
  const isPrivate = 23;
  var notPrivate = 46;
}

// console.log(isPrivate);
console.log(notPrivate);

/**
 * * * Lecture no 9 Of section 10.
 * * * Clousers.
 */

/**
 * ! 👉 Any function always has access to the variable Envirnment Of the Execution    Context in which  the function was created...
 * ! 👉 Closure: VE attached to the function, exactly as it was at the time and place the function was created.
 */

const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();
booker();

booker();
booker();

/**
 * * * Lecture no 10 Of section 10.
 * * * More Examples Clousers.
 */

// Example 1

let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();

// Re-assigning F Function

h();
f();

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers.`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

boardPassengers(180, 3);

/**
 * * Coding Challenge 2
 */

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'white';
  });
})();