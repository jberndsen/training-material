// BEFORE YOU start
// npm init -y
// npm install --save node-fetch
const fetch = require('node-fetch');

// INTRO
// Javascript is single threaded, meaning that two bits of script cannot run at the same time.
// Doing something which takes some time (a costly algorithm, a back-end call) causes everything else to halt
// until it completes. In browsers, this often means the UI becomes non-responsive,
// because the rendering of the screen is blocked.
// Promises help alleviate this problem by conceptually off-loading work to a different thread. The main
// thread completes unhindered as normal and the result of the time-costly operation is processed when
// it is available.


// 1. Creating a new Promise

// The constructor takes one function argument (a callback) with two parameters:
// - a resolve function describing that what should be done when the promise resolves
// - a reject function describing  that what should be done when the promise rejects
// The promise immediately starts doing its work when it is created asynchronously. 

var promise = new Promise(function(resolve, reject) {
  // do something slow here
  // we use setTimeout to postpone something for 2 seconds to illustrate the point.
  setTimeout(function() {
    // terminology: resolve
    // the action relating to the promise succeeded
    // using resolve, we can pass back the result data
    resolve("The slow operation completed!");
  }, 2000);

  if (false) {
    // terminology: reject
    // the action relating to the promise failed
    // it is customary to use the Error object here, since it can capture a stack trace for debugging
    reject(Error("It broke"));
  }
});

// 2. If we are interested in the result of the promise, we use the .then function on that object.
// it takes two arguments:
// - one which is called when resolve is called (i.e. success) with the result data
// - one which is called when reject is called (i.e. failure) with the error data
promise.then(function(result) {
  //console.log(result);
}, function(error) {
  //console.log(error);
});

// note! at this point, the promise is still doing work while the main thread continues,
// even though what should happen when it completes has been declared earlier.

// terminology: pending
// the promise hasn't been resolved or rejected yet, it is still doing stuff
//console.log('this happens now');
//console.log(promise);

// You can think of Promise as a box around a value which abstracts the time aspect away
// Such value boxes are called a "Functor" when it has a .map function,
// which transforms the value in the box and returns a new box
// This is true for Promise, except that the function is called .then

// Box.map :: Box<A> -> (A -> B) -> Box<B>
// Promise.then :: Promise<A> -> (A -> B) -> Promise<B>

// So, .then() returns a new Promise, meaning you can chain as many .then() functions as you like!
// Just like you can do with Array.map


// ****************************************************************
// EXERCISE 1
// the goal of this exercise is to print the name of a GitHub user with capital letters.

// the fetch function gets data from an absolute URL and returns a Promise.
// example call: fetch('https://api.github.com/users/jberndsen')
// tip: you need to call .json() on the server response before further processing

// assignment: write code that calls the above URL and logs out "JEROEN" (i.e. the name property capitalized)
// try using simple functions for data transformation (for example, getting a name property or 
// upper-casing some text could be separate reusable functions)
// ****************************************************************

// SOLUTION:

function toUpper(name) {
  return name.toUpperCase();
}

fetch('https://api.github.com/users/jberndsen')
  .then(res => res.json())
  .then(user => user.name)
  .then(toUpper)
  .then(console.log)














// At this point, you might be wondering why they've called it 'then' instead of 'map' if it does the same.
// Well, that's because it doesn't. It is a little more subtle than that.

// Value boxes such as Promise are called a "Monad" when they have a so-called "flatMap" function.
// Imagine the scenario where, when inside a .then() function, a new Promise would be created.
// We'd then have a (future) value inside a Promise inside a Promise, or Promise<Promise<value>>.
// That would be annoying to work with. .flatMap does the same as .map, but it unwraps one level.

// Box.map     :: Box<A> -> (A -> B)      -> Box<B>
// Box.flatMap :: Box<A> -> (A -> Box<B>) -> Box<B>

// the .then() method internally uses .flatMap if the function argument would return a promise,
// or it'll directly call .map if a concrete value would be returned.
// it's intended to make it easier for the developer, he doesn't have to distinguish between .map and .flatMap anymore.

// ****************************************************************
// EXERCISE 2
// the goal of this exercise is to print the all GitHub usernames in the same location as another.

// First, we need to get the user details in the same fashion as we did in exercise 1.
// The response also includes a 'location' property.
// We can then query github for users at this location by fetching the following url
// https://api.github.com/search/users?q=location:${location}

// the response will be an object, containing an 'items' array, which is a list of github user objects
// assignment: print out the list of users at the same location
// ****************************************************************


// SOLUTION:

// fetch('https://api.github.com/users/ekamminga')
//   .then(res => res.json())
//   .then(res => res.location)
//   .then(location => fetch(`https://api.github.com/search/users?q=location:${location}`))
//   .then(res => res.json())
//   .then(res => res.items)
//   .then(items => items.map(item => item.login))
//   .then(console.log)
