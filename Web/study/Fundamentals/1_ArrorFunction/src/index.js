// Basic Function
function sayHello(name) {
    return "Hello " + name
}

const nicolas = sayHello("Nicolas");
console.log(nicolas); // Hello Nicolas


// Arrow Function have Return Value
const sayHello2 = name => "Hello " + name;
const nicolas2 = sayHello2("Nicolas2");

console.log(nicolas2); // Hello Nicolas2


// Arrow Function don't have Return Value
const sayHello3 = name => { "Hello " + name; }
const nicolas3 = sayHello3("nicolas3");

console.log(nicolas3); // undefined


// Function have default argument
function sayHello4(name = "Nicolas4") {
    return "Hello " + name;
}

const nicolas4 = sayHello4();

console.log(nicolas4); // Hello Nicolas4


// Arrow Function have default argument
const sayHello5 = (name = "Human") => "Hello " + name;
const nicolas5 = sayHello5();

console.log(nicolas5); // Hello Human


// Arrow Function with Const
const button1 = document.getElementById("1");
const handleClick = (event) => console.log(event);
button1.addEventListener("click", handleClick);


// Annonymous Function
const button2 = document.getElementById("2");
button2.addEventListener("click", function(event) {
    console.log(event);
});

// Arrow Function
// 인자가 하나일 때는 괄호가 필요 없다.
const button3 = document.getElementById("3");
button3.addEventListener("click", event => console.log(event));


// Arrow Function with Two Arguments
const button4 = document.getElementById("4");
button4.addEventListener("click", (event, something="Hi") => console.log(event, something));
