/**
 * 实现 JSON.stringify
 *
 * JSON.stringify(value[, replacer [, space]])
 * Boolean | Number| String 类型会自动转换成对应的原始值。
 * undefined、任意函数以及symbol，会被忽略（出现在非数组对象的属性值中时），或者被转换成 null（出现在数组中时）。
 * 不可枚举的属性会被忽略
 * 如果一个对象的属性值通过某种间接的方式指回该对象本身，即循环引用，属性也会被忽略。
 */

function jsonStringify(obj) {
  let type = typeof obj;
  if (type !== "object") {
    if (/string|undefined|function/.test(type)) {
      obj = '"' + obj + '"';
    }
    return String(obj);
  } else {
    let json = [];
    let arr = Array.isArray(obj);
    for (let k in obj) {
      let v = obj[k];
      let type = typeof v;
      if (/string|undefined|function/.test(type)) {
        v = '"' + v + '"';
      } else if (type === "object") {
        v = jsonStringify(v);
      }
      json.push((arr ? "" : '"' + k + '":') + String(v));
    }
    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
  }
}
jsonStringify({ x: 5 }); // "{"x":5}"
jsonStringify([1, "false", false]); // "[1,"false",false]"
jsonStringify({ b: undefined }); // "{"b":"undefined"}"


/**
 * 方法二 
 * 
 * @param {*} data 
 * @returns 
 */
function jsonStringify(data) {
  let dataType = typeof data;

  if (dataType !== "object") {
    let result = data;
    //data 可能是 string/number/null/undefined/boolean
    if (Number.isNaN(data) || data === Infinity) {
      //NaN 和 Infinity 序列化返回 "null"
      result = "null";
    } else if (
      dataType === "function" ||
      dataType === "undefined" ||
      dataType === "symbol"
    ) {
      //function 、undefined 、symbol 序列化返回 undefined
      return undefined;
    } else if (dataType === "string") {
      result = '"' + data + '"';
    }
    //boolean 返回 String()
    return String(result);
  } else if (dataType === "object") {
    if (data === null) {
      return "null";
    } else if (data.toJSON && typeof data.toJSON === "function") {
      return jsonStringify(data.toJSON());
    } else if (data instanceof Array) {
      let result = [];
      //如果是数组
      //toJSON 方法可以存在于原型链中
      data.forEach((item, index) => {
        if (
          typeof item === "undefined" ||
          typeof item === "function" ||
          typeof item === "symbol"
        ) {
          result[index] = "null";
        } else {
          result[index] = jsonStringify(item);
        }
      });
      result = "[" + result + "]";
      return result.replace(/'/g, '"');
    } else {
      //普通对象
      /**
       * 循环引用抛错(暂未检测，循环引用时，堆栈溢出)
       * symbol key 忽略
       * undefined、函数、symbol 为属性值，被忽略
       */
      let result = [];
      Object.keys(data).forEach((item, index) => {
        if (typeof item !== "symbol") {
          //key 如果是symbol对象，忽略
          if (
            data[item] !== undefined &&
            typeof data[item] !== "function" &&
            typeof data[item] !== "symbol"
          ) {
            //键值如果是 undefined、函数、symbol 为属性值，忽略
            result.push('"' + item + '"' + ":" + jsonStringify(data[item]));
          }
        }
      });
      return ("{" + result + "}").replace(/'/g, '"');
    }
  }
}
