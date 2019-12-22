const human = {
    name: "Nico",
    lastName: "Serrano",
    nation: "Wish i was Korean",
    favFood : {
        breakfast: "Sang",
        lunch: "Donccas",
        dinner: "Sang + Donccas",
    }
};

// const name = human.name;
// const lastName = human.lastName;
// const difName = human.nation;
// const dinner = human.favFood.dinner;

// console.log(name, lastName);

const { 
    name, 
    lastName, 
    nation: difName, 
    favFood: { dinner, breakfast, lunch } 
} = human;

console.log(name, lastName, difName, dinner, breakfast, lunch);
