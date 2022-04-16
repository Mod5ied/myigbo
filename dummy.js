const post = [{ name: "me" }, { name: "you" }, { name: "us" }];

post.forEach((p) => {});

let i = 0;
for (i; i < post.length; i++) {
  console.log(i);
}
let j = 1;
post.forEach((p) => {
  console.log(j++);
});
