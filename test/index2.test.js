const json_glat = require("../libs");

var a = json_glat.glat(
  {
    a: {
      b: 1,
      c: [1, 2, 3, 4],
      d: {
        h: "mm"
      }
    },
    c: 3
  },
  {
    split: "_"
    // root: "a",
    // depth: 2
  }
);

console.log(JSON.stringify(a));
