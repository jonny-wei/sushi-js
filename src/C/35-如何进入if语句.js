// 如何满足条件进入 if 语句

let val = 1;

Object.defineProperty(window, "a", {
  get() {
    return val++;
  },
});

if (a === 1 && a === 2 && a === 3) {
    console.log('you win!!!')
}
