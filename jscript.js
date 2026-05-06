// 1. History & Evolution
// Created in 1995. ECMAScript is the standard. ES6+ added modern features.

// 2. Variables & Scope
var oldVar = 'var';       // Function-scoped
let modernVar = 'let';    // Block-scoped
const constVar = 'const'; // Block-scoped, immutable reference

// 3. Data Types
let str = "Hello", num = 42, bool = true, empty = null, undef, sym = Symbol('id');
let obj = { name: "John" };

// 4. Operators
let and = (true && false), or = (true || false), not = !true;
let strictEq = (5 === 5), canVote = (18 >= 18) ? "Yes" : "No";

// 5. Control Flow
if (num > 10) {} else {}
switch(str) { case "Hello": break; default: break; }

for (let i = 0; i < 5; i++) {}
while (false) {}
for (let key in obj) {}
for (let val of [1, 2]) {}

// 6. Functions, Scoping, Hoisting
function add(a, b) { return a + b; }
const subtract = (a, b) => a - b;

// 7. Closures
function createCounter() {
  let count = 0;
  return () => ++count;
}

// 8. Higher-Order Functions
setTimeout(() => console.log("Delay"), 1000);

// 9. Arrays & Objects
const arr = [1, 2, 3];
const doubled = arr.map(n => n * 2);
const sum = arr.reduce((acc, curr) => acc + curr, 0);

const car = { make: "Toyota", [str]: "Dynamic" };

// 10. Destructuring & JSON
const [first, second] = arr;
const { make } = car;
const json = JSON.stringify(car);
const parsed = JSON.parse(json);

// 11. DOM Manipulation & Events
// const el = document.querySelector(".class");
// el.textContent = "Text";
// document.body.appendChild(document.createElement("div"));
// el.addEventListener("click", e => e.preventDefault());

// 12. BOM & Storage
// alert("Hi");
// localStorage.setItem("key", "val");

// 13. Asynchronous JS
const promise = new Promise((res, rej) => res("Done"));
promise.then(console.log).catch(console.error);

async function fetchData() {
  const res = await fetch("url");
  return await res.json();
}

// 14. Git Basics
// git init, git add ., git commit -m "msg"
// git branch, git merge, git push
