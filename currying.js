///////// 
// LESSION MATERIAL FOR .map, .filter, .reduce, function composition and currying
/////////

const list = [1, 2, 3, 4, 5];
const anotherList = ['h', 'e', 'l', 'l', 'o'];

let result;

// map is used to transform each element in the array
function double(x) {
    return x + x;
}

result = list.map(double);

// filter uses a 'predicate function' to return a subset of the original data
function isGreaterThanTree(x) {
    return x > 3;
}

result = list.filter(isGreaterThanTree);

// reduce iterates over a list and returns one single value
// first argument is the accumulator
// second argument is the current element in the list
function sum(x, y) {
    return x * y;
}

result = list.reduce(sum);
















///////////////////////////////////////////////////
// OPDRACHT 1: Bouw een .map met .reduce
///////////////////////////////////////////////////
function opdracht1(acc, current) {
    acc.push(current + current);
    return acc;
}

result = list.reduce(opdracht1, []); // [2, 4, 6, 8, 10]
//console.log('OPDRACHT 1:', result);

///////////////////////////////////////////////////
// OPDRACHT 2: Bouw een .filter met .reduce
///////////////////////////////////////////////////
function opdracht2(acc, current) {
    if (current > 3) {
        acc.push(current);
    }
    return acc;
}

result = list.reduce(opdracht2, []); // [4, 5]
//console.log('OPDRACHT 2:', result);

























///////////////////////////////////////////////////
// TOWARDS A GENERIC SOLUTION
///////////////////////////////////////////////////

function mapForReduce(fn) {
    return function(acc, current) {
        acc.push(fn(current));
        return acc;
    }
}
result = list.reduce(mapForReduce(double), []);
//console.log('OPDRACHT 1 met functie als argument', result);







function filterForReduce(fn) {
    return function(acc, current) {
        if (fn(current)) {
            acc.push(current);
        }
        return acc;
    }
}

result = list.reduce(filterForReduce(isGreaterThanTree), []);
//console.log('OPDRACHT 2 met functie als argument', result);




















///////////////////////////////////////////////////
// GENERIC SOLUTION
///////////////////////////////////////////////////

function map(fn, arr) {
    return arr.reduce(mapForReduce(fn), [])
}

result = map(double, list);
//console.log('GENERIC MAP', result);







function filter(fn, arr) {
    return arr.reduce(filterForReduce(fn), []);
}

result = filter(isGreaterThanTree, list);
//console.log('GENERIC FILTER', result);
























///////////////////////////////////////////////////
// REUSABLE / COMPOSABLE SOLUTION
///////////////////////////////////////////////////

function curriedMap(fn) {
    return function(arr) {
        return arr.reduce(mapForReduce(fn), []);
    }
}
// let curriedMap = fn => arr => arr.reduce(mapForReduce(fn), []);

let doubler = curriedMap(double);
//console.log('doubler:', doubler(list));

function curriedFilter(fn) {
    return function(arr) {
        return arr.reduce(filterForReduce(fn), []);
    }
}
// let curriedFilter = fn => arr => arr.reduce(filterForReduce(fn), []);

let filterer = curriedFilter(isGreaterThanTree);
//console.log('filterer:', filterer(list));





































///////////////////////////////////////////////////
// USE COMPOSITION WITH TWO FUNCTIONS
///////////////////////////////////////////////////
function composeTwo(f, g) {
    return function(x) {
        return g(f(x));
    }
}
//let compose = (f, g) => x => g(f(x));

let filterAndDouble = composeTwo(filterer, doubler);
let doubleTwice = composeTwo(doubler, doubler);

result = filterAndDouble(list);
//console.log(result);






















///////////////////////////////////////////////////
// DEALING WITH AN ARBITRARY NUMBER OF ARGUMENTS
///////////////////////////////////////////////////
function anyNumberOfArgs(...args) {
    console.log(args); // args holds all arguments in an array
}

//anyNumberOfArgs(1, 2, 3, 4);





























// REMEMBER WHAT WE COULD DO WITH ARRAYS? RIGHT! REDUCE OVER THEM
// LETS APPLY THAT IDEA TO AN ARRAY OF FUNCTIONS,
// WHERE THE REDUCTION IS FUNCTION COMPOSITION
function compose(...fns) {
    return fns.reduce(function(acc, curr) {
        return function(x) {
            return curr(acc(x));
        }
    });
}

//let compose = (...fns) => fns.reduce((f, g) => x => f(g(x)));
//let compose = (...fns) => fns.reduce((f, g) => (...x) => f(g(...x)));

let powerDoubler = compose(doubler, doubler, doubler, doubler, doubler);
//console.log(powerDoubler(list));

let filterAndDoubleTwice = compose(filterer, doubler, doubler);
//console.log(filterAndDoubleTwice(list));