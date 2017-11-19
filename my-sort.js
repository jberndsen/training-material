let numbers = [1, 5, 10];

Array.prototype.numericSort = function() {
    if (this.length === 0) return [];

    let [first, ...rest] = this;

    return [...rest.filter(x => x < first).numericSort(),
            first, 
            ...rest.filter(x => x >= first).numericSort()];
}

let sorted = numbers.numericSort();
console.log(sorted);