// // // const post = [{ name: "me" }, { name: "you" }, { name: "us" }];

// // // post.forEach((p) => {});

// // // let i = 0;
// // // for (i; i < post.length; i++) {
// // //   console.log(i);
// // // }
// // // let j = 1;
// // // post.forEach((p) => {
// // //   console.log(j++);
// // // });

// // const array = ["Translate", "Teaches", "Transcends"];

// // function myfn(arr, delegate, delay) {
// //   //init all calls immediately.
// //   arr.forEach((el, i) => {
// //     setTimeout(() => {
// //       delegate(arr[i]);
// //     }, i * delay);
// //   });
// // }

// // // myfn(
// // //   array,
// // //   function (obj) {
// // //     console.log(obj);
// // //   },
// // //   4000
// // // );

// // function arrDelay(arr, delegate, delay) {
// //   let i = 0;
// //   let interval = setInterval(() => {
// //     //each loop, call passed in function.
// //     delegate(arr[i]);
// //     //increment, & if we're past array, clr interval...
// //     if (i++ >= arr.length - 1) clearInterval(interval);
// //   }, delay);
// //   return interval;
// // }
// // let interv = arrDelay(
// //   array,
// //   (obj) => {
// //     console.log(obj);
// //   },
// //   3000
// // );

// let obj = [
//   { name: "fire", translation: "oku", genre: "noun" },
//   { name: "hand", translation: "aka", genre: "noun" },
//   { name: "money", translation: "ego", genre: "noun" },
//   { name: "water", translation: "mmiri", genre: "noun" },
//   { name: "leg", translation: "ukwu", genre: "noun" },
//   { name: "leg", translation: "okpa", genre: "verb" },
//   { name: "head", translation: "isi", genre: "noun" },
// ];

// const arr = { name: "leg", translation: "ukwu", genre: "noun" };

// const trueme = (x) => {
//   console.log("yesoo");
//   console.log(x);
// };

// // const p = obj.some((ob) => {
// //   if (arr.name == ob.name) {
// //     return trueme();
// //   }
// //   return false;
// // });

// const c = obj.map((ob) =>
//   ob.name === arr.name && ob.genre === arr.genre ? (trueme(ob), true) : false
// );

// console.log(c);

// // console.log(p);

//! how to handle the search for a word in JS, rather than multiple requests.
const arrayWords = [
  { name: "Woman", translation: "nwanyi", genre: "noun" },
  { name: "Man", translation: "nwoke", genre: "noun" },
  // { name: "Man", translation: "agadi-nwoke", genre: "noun" },
  { name: "Human", translation: "mmadu", genre: "noun" },
];

const result = arrayWords.find((arr) => arr.name === "Man");

console.log(result);
