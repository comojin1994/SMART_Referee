const days = ["Mon", "Tue", "Wed"];
const otherDays = ["Thu", "Fri", "Sat"];

const allDays1 = days + otherDays; // string
console.log(allDays1); // Mon,Tue,WedThu,Fri,Sat


const allDays2 = [days + otherDays];
console.log(allDays2); // [ 'Mon,Tue,WedThu,Fri,Sat' ]


const allDays3 = [days, otherDays];
console.log(allDays3); // [ [ 'Mon', 'Tue', 'Wed' ], [ 'Thu', 'Fri', 'Sat' ] ]


const allDays4 = [...days, ...otherDays, "Sun"];
console.log(allDays4); // [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ]


const ob = {
    first: "hi",
    second: "hello"
};

const ab = {
    third: "bye bye"
};

const two = { ob, ab };
console.log(two); // { ob: { first: 'hi', second: 'hello' }, ab: { third: 'bye bye' } }

const thr = { ...ob, ...ab };
console.log(thr); // { first: "hi", second: "hello", third: "bye bye" }
