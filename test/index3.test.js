const json_glat = require("../libs");

function test_4() {
  const a = {};
  a.__proto__ = {};
  a.__proto__.polluted = "Yes! Its Polluted";

  console.log(a);

  const b = json_glat.parse(a);
  console.log("b", b);
  console.log("After : " + {}.polluted);
  json_glat.parse({ "__proto__.polluted": "Yes! Its Polluted" });
  console.log("After : " + {}.polluted);
}
test_4();
