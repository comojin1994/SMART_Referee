// ''이 아닌 ``를 사용해야한다.
const sayHello = (name = "Human") => `Hello ${name}`;
const nicolas = sayHello();
console.log(nicolas);
