let posts = ["Hi", "Hello", "Bye"];

posts.forEach(post => console.log(post));
// Hi
// Hello
// Bye

posts.push("new");
console.log(posts); // [ 'Hi', 'Hello', 'Bye', 'new' ]

let greetings = ["Hi", "Hello", "Howdy", "Suup"];

if (!greetings.includes("Hello")) {
    greetings.push("Hello");
}

console.log(greetings); // [ 'Hi', 'Hello', 'Howdy', 'Suup' ]
console.log(greetings.reverse()); // [ 'Suup', 'Howdy', 'Hello', 'Hi' ]
