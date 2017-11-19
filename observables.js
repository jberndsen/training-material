// BEFORE YOU start
// npm init -y
// npm install --save node-fetch rx
const Rx = require('rx');
const fetch = require('node-fetch');

// 1. create a stream based on an array using Rx.Observable.fromArray

const list = [1, 2, 3, 4, 5];                      // list is a regular Array
const streamA = Rx.Observable.fromArray(list);     // stream is an Observable, it will emit all values immediately

const double = x => x * 2;

// streamA
//     .map(double)
//     .subscribe(console.log);



















// 2. fromPromise
const promise = fetch('https://api.github.com/users/jberndsen')     // promise is a Promise
const streamB = Rx.Observable.fromPromise(promise)                  // stream is an Observable, it will emit exactly once when the promise completes
    .flatMap(response => response.json());                          // Observable.flatMap is also able to 'flatten' a nested Promise :-D

// streamB
//     .subscribe(console.log);                                              























// ****************************************************************
// ASSIGNMENT 1
//
// Watch the following two videos:
// - funfunfunction - Streams: https://www.youtube.com/watch?v=UD2dZw9iHCc
// - funfunfunction - Declarative Programming: https://www.youtube.com/watch?v=yGh0bjzj4IQ
// ****************************************************************

// ****************************************************************
// Exercise 1
//
// Create a stream of GitHub user data for the following array of usernames
// and log their name and location (or a nice message if it isn't known) out to the console.
// - tip: to get the user data, you can use the fetch library as used in the promise lesson
// - tip: the URL to get user data from the GitHub API is https://api.github.com/users/${username}
// ****************************************************************
const users = ['jberndsen', 'ernstkamminga', 'theoheijmen', 'jarendsen'];


// ****************************************************************
// Optional exercise
//
// Do the exercises at http://reactivex.io/learnrx/
// ****************************************************************


// SOLUTION TO EXERCISE 1

//const users = ['jberndsen', 'ernstkamminga', 'theoheijmen', 'jarendsen'];

function getMessage(user) {
    const location = user.location ? user.location : 'an unknown location';
    return `${user.login} lives in ${location}.`;
}

const streamC = Rx.Observable.fromArray(users)
    .flatMap(user => fetch(`https://api.github.com/users/${user}`))
    .flatMap(userResponse => userResponse.json())
    .map(getMessage)
    .map(text => text.toUpperCase());

// const subscriptionC = streamC
//     .subscribe(console.log);


// IDENTITY FUNCTOR

// const Identity = x => ({
//     value: x,
//     map: fn => Identity(fn(x))
// });

function Identity(x) {
    return {
        __value: x,
        map: function(fn) {
            return Identity(fn(x));
        },
        flatMap: function(fn) {
            return fn(x); // indien verstande dat fn een Identity oplevert
        },
        fold: function(fn) {
            return fn(x);
        }
    }
}

const theo = Identity('theo');
//console.log(theo);

const iets1 = theo
    .map(x => `Hello, ${x}`)
    .fold(x => `${x}. You rock!`);

const iets2 = theo
    .map(x => x.toUpperCase())
    .fold(x => `${x}, WHY ARE YOU YELLING?`);

const iets3 = theo    
    .flatMap(x => Identity(x));
    
console.log(iets1);
console.log(iets2);
console.log(iets3);
