let numbers = [10,5,21,7];

Array.prototype.mySort = function() {
    if (this.length === 0) return [];
    let [curr, ...xs] = this;

    return [...xs.filter(x => x < curr).mySort(), curr, ...xs.filter(x => x >= curr).mySort()];
}

console.log(numbers.mySort());