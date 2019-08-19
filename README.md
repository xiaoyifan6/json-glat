json glat

json扁平化


```shell
npm i json-glat
```

```javascript
const json_glat = require("json-glat");
```

`json_glat.parse(json,options|string)`

```javascript
{
    "split": "/", // string default "."
    "root": "param", // string default undefined
    "noarr": false, // bool default false
    "handle": null, // function(key:string):string default undefined
}
```

**ex1:**

```javascript
var a = json_glat.parse(
    {
      "a/b": 1,
      "/c": 2,
      "d": "aaa"
    },
    "/"
  );
console.log(JSON.stringify(a))
```

result:

```json
{"a":{"b":1},"c":2,"d":"aaa"}
```

**ex2:**

```javascript
var a = json_glat.parse(
  {
    "a/b": 1,
    "/c": 2,
    d: "aaa"
  },
  {
    split: "/",
    root: "result"
  }
);
console.log(JSON.stringify(a))
```

result:

```json
{"result":{"a":{"b":1},"d":"aaa"},"c":2}
```

**ex3:**

```javascript
var a = json_glat.parse(
  {
    "0/b": 1,
    "1/c": 2,
    "0/a": "aaa"
  },
  {
    split: "/",
    root: "result",
    // noarr : true
  }
);
console.log(JSON.stringify(a))
```

result:

```json
{"result":[{"b":1,"a":"aaa"},{"c":2}]}
// {"result":{"0":{"b":1,"a":"aaa"},"1":{"c":2}}}
```


`json_glat.glat(json,options|string)`

```javascript
{
    "split": "/", // string default "."
    "root": "param", // string default undefined
    "depth": 4, // number default -1
    "handle": null, // function(key:string[]):string[] default undefined
}
```

**ex4:**

```javascript
var a = json_glat.glat(
  {
    a: {
      b: 1,
      c: "aaa",
      d: {
        h: "mm"
      }
    },
    c: 3
  },
  "_"
);
```

```json
{"a_b":1,"a_c":"aaa","a_d_h":"mm","c":3}
```

**ex5:**

```javascript
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
    split: "_",
    root: "a",
    // depth: 2
  }
);

console.log(JSON.stringify(a));

```

```json
{"b":1,"c_0":1,"c_1":2,"c_2":3,"c_3":4,"d_h":"mm","_c":3}
// {"b":1,"c":[1,2,3,4],"d":{"h":"mm"},"_c":3}
```

**ex5:**

```javascript
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
  }
}

console.log(JSON.stringify(a));
```


```json
{"a_b":1,"a_c_0":1,"a_c_1":2,"a_c_2":3,"a_c_3":4,"a_d_h":"mm","c":3}
```