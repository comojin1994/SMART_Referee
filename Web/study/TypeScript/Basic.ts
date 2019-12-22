// ----------------------------------------------------------
// 변수 Type을 지정해서 선언
let hello: string = "hello";
// ----------------------------------------------------------

// ----------------------------------------------------------
// 함수 Parameter Type을 지정해서 선언
const plus = (a: number, b: number) => a + b;
console.log(plus(1, 2));
// ----------------------------------------------------------

// ----------------------------------------------------------
// 함수 Parameter와 Return Type을 지정해서 선언
const greet = (name: string, age: number): string => {
  return `Hello ${name} you are ${age} years old`;
};
console.log(greet("Nicolas", 18));
// ----------------------------------------------------------

// ----------------------------------------------------------
// Object를 Parameter로 사용할 때 interface를 사용
const human = {
  name: "Nicolas",
  age: 18,
  hungry: true
};

interface IHuman {
  name: string;
  age: number;
  hungry: boolean;
}

const helloToHuman = (human: IHuman) => {
  console.log(`Hello ${human.name} you are ${human.age} years old`);
};

helloToHuman(human);
// ----------------------------------------------------------

// ----------------------------------------------------------
// interface의 타입 선언 앞에 ?를 사용하면 선택적 요소 가능
const lynn = {
  name: "Lynn",
  hungry: false
};

interface OptionalHuman {
  name: string;
  age?: number;
  hungry: boolean;
}

helloToHuman(lynn);
// ----------------------------------------------------------
