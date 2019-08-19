const pdata = require("../package.json");

exports = module.exports = (function(_undefined) {
  var json_glat = json_glat || {};
  pdata && (json_glat.version = pdata.version);

  function getData(jsonData, depth, cur) {
    if (depth >= 0 && cur >= depth) {
      return [
        {
          paths: [],
          data: jsonData
        }
      ];
    }

    if (typeof jsonData === "object") {
      let arr = [];
      for (let key in jsonData) {
        let items = getData(jsonData[key], depth, cur + 1);
        arr = arr.concat(
          items.map(item => {
            item.paths.push(key);
            return item;
          })
        );
      }
      return arr;
    } else {
      return [
        {
          paths: [],
          data: jsonData
        }
      ];
    }
  }

  function obj2arr(data) {
    if (typeof data !== "object") return data;
    var keys = Object.keys(data);
    if (keys.length === 0) return data;
    var f = true;
    for (var i = 0; i < keys.length; i++) {
      if (isNaN(keys[i])) {
        f = false;
        break;
      }
    }
    if (!f) {
      for (var i = 0; i < keys.length; i++) {
        data[keys[i]] = obj2arr(data[keys[i]]);
      }
      return data;
    }
    var d = [];
    for (var i = 0; i < keys.length; i++) {
      d[keys[i]] = obj2arr(data[keys[i]]);
    }
    return d;
  }

  // glat
  json_glat.glat = function(jsonData, options) {
    jsonData = jsonData || {};
    if (typeof jsonData === "function") {
      jsonData = jsonData();
    }
    if (typeof jsonData === "string") {
      jsonData = JSON.parse(jsonData);
    }
    var spliteStr = ".";

    if (typeof options === "string") {
      spliteStr = options;
      options = _undefined;
    }

    options = options || {};
    var data = {};

    spliteStr = options.split || spliteStr;
    var items = getData(jsonData, options.depth || -1, 0);
    items.forEach(item => {
      // paths
      if (item.paths.length) {
        let paths = item.paths.reverse();
        if (paths[0] === options.root) {
          if (paths.length > 1) {
            paths.splice(0, 1);
          }
        } else if (options.root) {
          paths.splice(0, 0, paths.length === 0 ? spliteStr : "");
        }
        let path = paths.join(spliteStr);
        if (options.handle) {
          path = options.handle(paths, options) || path;
        }
        data[path] = item.data;
      }
    });
    return data;
  };

  // parse
  json_glat.parse = function(jsonData, options) {
    jsonData = jsonData || {};
    if (typeof jsonData === "function") {
      jsonData = jsonData();
    }
    if (typeof jsonData === "string") {
      jsonData = JSON.parse(jsonData);
    }
    var spliteStr = ".";

    if (typeof options === "string") {
      spliteStr = options;
      options = _undefined;
    }

    options = options || {};
    var data = {};
    var jsonData0 = {};

    spliteStr = options.split || spliteStr;

    var reg = _undefined;
    if (options.extras) {
      if (typeof options.extras === "string") {
        reg = new RegExp(`^(${options.extras})$`);
      } else if (options.extras.length && Array.isArray(options.extras)) {
        reg = new RegExp(`^(${options.extras.join("|")})$`);
      }
    }

    var reg2 = new RegExp(`[${spliteStr}]+`);

    for (key in jsonData) {
      let val = jsonData[key];
      key = key.replace(reg2, spliteStr);
      options.handle && (key = options.handle(key, options) || key);
      if (key.startsWith(spliteStr)) {
        jsonData0[key.substr(1, key.length)] = val;
      } else if (reg && reg.test(key)) {
        jsonData0[key] = val;
      } else if (options.root) {
        jsonData0[`${options.root}${spliteStr}${key}`] = val;
      } else {
        jsonData0[key] = val;
      }
    }

    for (key in jsonData0) {
      let arr = key.split(spliteStr);
      var d0 = data;
      for (var i in arr) {
        let k0 = arr[i];
        if (arr.length - 1 === parseInt(i)) {
          if (d0[k0]) {
            d0[k0] = Object.assign(jsonData0[key], d0[k0]);
          } else {
            d0[k0] = jsonData0[key];
          }
        } else if (!d0[k0]) {
          d0[k0] = {};
          d0 = d0[k0];
        } else {
          d0 = d0[k0];
        }
      }
    }
    if (!options.noarr) {
      data = obj2arr(data);
    }
    return data;
  };
  return json_glat;
})(undefined);
