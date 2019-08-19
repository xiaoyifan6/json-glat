const json_glat = require("../libs");

function test_1() {
  console.log(json_glat.version);
}

function test_2() {
  var a = json_glat.parse(
    {
      "a/b": 1,
      "/c": 2,
      d: "aaa"
    },
    {
      root: "opts",
      split: "/",
      handle: key => {
        if (!key.startsWith("/") && key.split("/").length > 1) {
          return "/" + key;
        }
        return key;
      }
    }
  );

  var b = json_glat.parse(
    {
      "a/b": 1,
      "/c": 2,
      d: "aaa"
    },
    "/"
  );

  var c = json_glat.parse(
    {
      "0/1/a": "a",
      "0/0": "cc",
      "1": "c",
      "0/2/c": 123
    },
    {
      split: "/"
      // noarr: true
    }
  );

  var d = json_glat.parse(
    {
      "a/b/c": 1,
      "a/b": { a: 2, d: 90 }
    },
    { split: "/" }
  );

  console.log(JSON.stringify(a));
  console.log(JSON.stringify(b));
  console.log(JSON.stringify(c));
  console.log("d,", JSON.stringify(d));
}

function test_3() {
  var a = json_glat.glat({ a: { b: 1, c: "aaa", d: { h: "mm" } }, c: 3 }, "_");
  var b = json_glat.glat(
    { a: { b: 1, c: "aaa", d: { h: "mm", v: [2, 3, 4, 5] } }, c: 3 },
    {
      split: ".",
      root: "a",
      depth: 3
    }
  );
  var c = json_glat.glat(
    {},
    {
      split: ".",
      root: "a",
      depth: 3
    }
  );
  console.log(JSON.stringify(a));
  console.log(JSON.stringify(b));
  console.log(JSON.stringify(c));
}

test_1();
test_2();

test_3();
