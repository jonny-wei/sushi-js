const render = (template, data) =>{
    const regex = /\{\{(\w+)\}\}/g;
    template = template.replace(regex, (match, key) => {
        console.log(match, key)
        return data[key.trim()]
    })
    return template
}

// 测试
let template = "我是{{name}}，年龄{{age}}，性别{{sex}}";
let person = {
  name: "布兰",
  age: 12,
};

console.log(render(template, person))