// function mySetInterVal(fn, a, b){}

class MySetInterVal {
  constructor(fn, a, b) {
    this.fn = fn;
    this.a = a;
    this.b = b;
    this.timer = null;
    this.count = 0;
  }
  mySetInterVal(...args) {
    this.timer = setTimeout(() => {
      this.fn(...args);
      this.count++;
      this.mySetInterVal(...args);
    }, this.a + this.count * this.b);
  }
  myClear() {
    clearInterval(this.timer);
    this.timer = null;
  }
}
