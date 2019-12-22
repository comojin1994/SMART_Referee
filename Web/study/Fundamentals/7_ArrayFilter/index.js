const numbers = [2, 45, 612, 1234, 4323, 2315, 1, 2, 3, 55];

const biggerThan15 = numbers.filter(number => number > 15);
console.log(biggerThan15); // [ 45, 612, 1234, 4323, 2315, 55 ]


const testCondition = number => number < 15;
const smallerThan15 = numbers.filter(testCondition);
console.log(smallerThan15); // [ 2, 1, 2, 3 ]


let posts = ["Hi", "Hello", "Bye"];
posts = posts.filter(post => post !== "Bye");
console.log(posts); // [ 'Hi', 'Hello' ]
