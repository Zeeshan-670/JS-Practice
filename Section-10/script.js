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

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

/**
 * * High Order Function
 */

const transformer = function (str, fn) {
  console.log(`Original String : ${str}`);
  console.log(`Transformed String : ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);

/**
 * * JS uses callback All the time
 */

const high5 = function () {
  console.log('👋');
};

document.body.addEventListener('click', high5);
['Zeeshan', 'Omar', 'Hamza', 'Aaraf', 'Waheed'].forEach(high5);

/**
 * * * Lecture no 5 Of section 10.
 * * * Functions Returning Functions.
 */

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Omar');
greeterHey('Zeeshan');
greeterHey('Aaraf');

greet('Hello')('Zeeshan');

const greet1 = greeting => name => {
  console.log(`${greeting} ${name}`);
};

const greeterHey1 = greet1('hello');
greeterHey1('Waheed');
greeterHey1('Goku');
greeterHey1('Gohan');

/**
 * * * Lecture no 6 Of section 10.
 * * * The call and Apply Methods.
 */

const lufthansa = {
  airline: 'lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );

    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(244, 'Muhammad Zeeshan Muneer');
lufthansa.book(244, 'Omar Ahmed');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const swiss = {
  airline: 'Swiss Air Line',
  iataCode: 'LX',
  bookings: [],
};

const book = lufthansa.book;

// Does NOT work
// book(135, 'Kashan Muneer');

/**
 * * Call Method
 */

book.call(eurowings, 213, 'Muhammad Kashan Muneer');
console.log(eurowings);

book.call(lufthansa, 123, 'Muneer Ahmed');
console.log(lufthansa);

book.call(swiss, 123, 'Muhammad Zeeshan Muneer');
console.log(swiss);

/**
 * * Apply Method
 */

const flightData = [543, 'Omar Ahmed'];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData);

/**
 * * * Lecture no 7 Of section 10.
 * * * The Bind Methods.
 */

/**
 * * Bind Method
 */

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Azlan');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Muhammad Zeeshan Muneer');

/**
 * * With Event Listeners
 */

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

/**
 * * Partial Application
 */

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVat = addTax.bind(null, 0.23);
// addVat = value =>value + value * 0.23;

console.log(addVat(100));
console.log(addVat(23));

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVat2 = addTaxRate(0.23);
console.log(addVat2(100));
console.log(addVat2(23));
