// 函数字符串

// 实现 sprintf('a: ${a+b},b: ${b}', {a: 1,b: 2}); // a:3,b:2

const sprintf = (template, obj) => {
    const fn = new Function("obj", `with(obj){return \`${template}\`;}`)
    return fn(obj)
}

console.log(sprintf("a:${a+b},b:${b}", { a: 1, b: 2 }));