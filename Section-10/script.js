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
