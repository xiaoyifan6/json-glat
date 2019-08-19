const json_glat = require("../libs");

function cmpOf(a, b) {
  let len = Math.min(a.length, b.length);
  for (var i = 0; i < len; i++) {
    if (a[i] != b[i]) {
      return i - 1;
    }
  }
  return -1;
}

console.log(cmpOf("1234", "135"));
console.log(cmpOf("1234", "1235"));
console.log(cmpOf("1234", "345"));
