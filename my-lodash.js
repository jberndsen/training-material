// our cool own lodash implementation

var _ = {
    /*
    * Find is a function that searches an array and returns the first occurrence it finds given a comparison function
    */
    find: function(arr, searchFn) {
        for (var i = 0; i < arr.length; i++) {
            if (searchFn(arr[i])) return arr[i];
        }
    }
}

// our enterprise grade software project
var animals = [
    {name: 'Fluffykins', species: 'cat' },
    {name: 'Bello', species: 'dog'},
    {name: 'Maple', species: 'rabbit'},
    {name: 'Clooney', species: 'rabbit'},
    {name: 'Blub', species: 'fish'},
    {name: 'Captain smartpants', species: 'Parrot'}
]

var fluffyName = _.find(animals, function(animal) {
    return animal.name.startsWith('Fluffy');
});

console.log(fluffyName);

var someBunny = _.find(animals, x => x.species === 'rabbit');

console.log(someBunny);