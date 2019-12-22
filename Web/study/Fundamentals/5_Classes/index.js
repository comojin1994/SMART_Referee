class Human {
    constructor(name, lastName) {
        this.name = name;
        this.lastName = lastName;
    }
}

const nico = new Human("Nico", "Serrano");
console.log(nico); // Human { name: 'Nico', lastName: 'Serrano' }
console.log(nico.name); // Nico


class Baby extends Human {
    cry() { console.log("Waaaaaaa"); }
    sayName() { console.log(`My name is ${this.name}`); }
}

const myBaby = new Baby("Mini", "me");
console.log(myBaby); //Baby { name: 'Mini', lastName: 'me' }
console.log(myBaby.cry(), myBaby.sayName()); // Waaaaaaa My name is Mini
