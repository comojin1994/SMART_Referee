const days = ["Mon", "Tue", "Wed", "Thr", "Fri"]; 

const mapDays = days.map(day => console.log(day));
// Mon
// Tue
// Wed
// Thr
// Fri

console.log(mapDays); // [ undefined, undefined, undefined, undefined, undefined ]

const smilingDays1 = days.map(day => `Smile ${day}`);
console.log(smilingDays1); // [ 'Smile Mon', 'Smile Tue', 'Smile Wed', 'Smile Thr', 'Smile Fri' ]

const addSmile = day => `Smile ${day}`;
const smilingDays2 = days.map(addSmile);
console.log(smilingDays2); // [ 'Smile Mon', 'Smile Tue', 'Smile Wed', 'Smile Thr', 'Smile Fri' ]

const smilingDays3 = days.map((day, index) => `#${index + 1} ${day}`)
console.log(smilingDays3); // [ '#1 Mon', '#2 Tue', '#3 Wed', '#4 Thr', '#5 Fri' ]

const addNumber = (day, index) => `#${index + 1} ${day}`;
const smilingDays4 = days.map(addNumber);
console.log(smilingDays4); // [ '#1 Mon', '#2 Tue', '#3 Wed', '#4 Thr', '#5 Fri' ]
