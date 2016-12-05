// 1, 1, 2, 3, 5, 8, 13, 21, ...

function fibonacci(n) {
    if (n == 0 || n == 1) {
        return 1;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}

console.log(fibonacci(9));

// f(0) = 1
// f(1) = 1
// f(2) = f(1) + f(0) = 1 + 1 = 2
// f(3) = f(2) + f(1) = f(1) + f(0) + 1 = 1 + 1 + 1 = 3
// f(4) = (f3) + f(2) = f(2) + f(1) + f(1) + f(0) = f(1) + f(0) + 1 + 1 + 1 = 1 + 1 + 1 + 1 + 1 = 5