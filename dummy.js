// // const post = [{ name: "me" }, { name: "you" }, { name: "us" }];

// // post.forEach((p) => {});

// // let i = 0;
// // for (i; i < post.length; i++) {
// //   console.log(i);
// // }
// // let j = 1;
// // post.forEach((p) => {
// //   console.log(j++);
// // });

// const array = ["Translate", "Teaches", "Transcends"];

// function myfn(arr, delegate, delay) {
//   //init all calls immediately.
//   arr.forEach((el, i) => {
//     setTimeout(() => {
//       delegate(arr[i]);
//     }, i * delay);
//   });
// }

// // myfn(
// //   array,
// //   function (obj) {
// //     console.log(obj);
// //   },
// //   4000
// // );

// function arrDelay(arr, delegate, delay) {
//   let i = 0;
//   let interval = setInterval(() => {
//     //each loop, call passed in function.
//     delegate(arr[i]);
//     //increment, & if we're past array, clr interval...
//     if (i++ >= arr.length - 1) clearInterval(interval);
//   }, delay);
//   return interval;
// }
// let interv = arrDelay(
//   array,
//   (obj) => {
//     console.log(obj);
//   },
//   3000
// );

let obj = [
  { name: "fire", translation: "oku", genre: "noun" },
  { name: "hand", translation: "aka", genre: "noun" },
];

const arr = { name: "hand", translation: "aka", genre: "noun" };

const trueme = () => {
  console.log("yesoo");
};

const p = obj.some((ob) => {
  if (arr.name == ob.name) {
    return trueme();
  }
  return false;
});

console.log(p);
