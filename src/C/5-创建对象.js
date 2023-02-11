/**
 * 多种创建对象的方式
 */

/**
 * 1. 工厂模式方式
 *
 * 缺点：对象无法识别，所有的实例对象都指向一个原型
 */
function createPerson(name) {
  var o = new Object();
  o.name = name;
  o.getName = function () {
    console.log(this.name);
  };

  return o;
}

var person1 = createPerson("kevin");

/**
 * 2. 构造函数方式
 *
 * 实例可以识别为一个特点类型了 person1 是 Person 的实例
 * 缺点：每次创建实例时，每个方法都要被创建一次
 */
function Person(name) {
  this.name = name;
  this.getName = function () {
    console.log(this.name);
  };
}

var person1 = new Person("kevin");

/**
 * 2.1 构造函数方式优化1
 *
 * 解决了每次创建实例时，每个方法都要被创建一次
 *
 * 缺点是：乱七八糟，封装性不好
 */

function Person(name) {
  this.name = name;
  this.getName = getName;
}
function getName() {
  console.log(this.name);
}

var person1 = new Person("kevin");

/**
 * 3. 原型模式
 *
 * 方法不会重新创建
 *
 * 缺点：1. 所有的属性和方法都共享 2. 不能初始化参数
 */
function Person(name) {}

Person.prototype.name = "keivn";
Person.prototype.getName = function () {
  console.log(this.name);
};

var person1 = new Person();

/**
 * 3.1 原型模式优化1
 *
 * 封装性好了点
 * 缺点：1. 所有的属性和方法都共享 2. 不能初始化参数 3. 重写了原型，丢失了constructor属性
 */
function Person(name) {}

Person.prototype = {
  name: "kevin",
  getName: function () {
    console.log(this.name);
  },
};

var person1 = new Person();

/**
 * 3.2 原型模式优化2
 *
 * 实例可以通过constructor属性找到所属构造函数
 *
 * 缺点：1. 所有的属性和方法都共享 2. 不能初始化参数
 */
function Person(name) {}

Person.prototype = {
  constructor: Person,
  name: "kevin",
  getName: function () {
    console.log(this.name);
  },
};

var person1 = new Person();

/**
 * 4. 组合模式 = 构造函数模式 + 原型模式 （推荐）
 *
 * 优点：1. 该共享的共享，该私有的私有，使用最广泛的方式 2. 可以初始化参数
 * 3. 实例可以通过constructor属性找到所属构造函数
 *
 * 缺点：有的人就是希望全部都写在一起，即更好的封装性
 */
function Person(name) {
  this.name = name;
}

Person.prototype = {
  constructor: Person,
  getName: function () {
    console.log(this.name);
  },
};

var person1 = new Person();

/**
 * 4.1 动态原型模式
 *
 * 使用动态原型模式时，不能用对象字面量重写原型
 *
 */
function Person(name) {
  this.name = name;
  if (typeof this.getName != "function") {
    Person.prototype.getName = function () {
      console.log(this.name);
    };
  }
}

var person1 = new Person();

/**
 * 4.2 动态原型模式
 *
 * 用字面量方式
 */
function Person(name) {
  this.name = name;
  if (typeof this.getName != "function") {
    Person.prototype = {
      constructor: Person,
      getName: function () {
        console.log(this.name);
      },
    };

    return new Person(name);
  }
}

var person1 = new Person("kevin");
var person2 = new Person("daisy");

person1.getName(); // kevin
person2.getName(); // daisy

/**
 * 5. 寄生构造函数模式
 *
 * 寄生-构造函数-模式，也就是说寄生在构造函数的一种方法
 * 所谓的寄生构造函数模式就是比工厂模式在创建对象的时候，多使用了一个new，实际上两者的结果是一样的
 *
 * 缺点：创建的实例使用 instanceof 都无法指向构造函数
 *
 */
function Person(name) {
  var o = new Object();
  o.name = name;
  o.getName = function () {
    console.log(this.name);
  };

  return o;
}

var person1 = new Person("kevin");
console.log(person1 instanceof Person); // false
console.log(person1 instanceof Object); // true

/**
 * 6. 稳妥构造函数模式
 *
 * 所谓稳妥对象，指的是没有公共属性，而且其方法也不引用 this 的对象。
 *
 * 与寄生构造函数模式有两点不同：
 * 1. 新创建的实例方法不引用 this
 * 2. 不使用 new 操作符调用构造函数
 *
 * 稳妥对象最适合在一些安全的环境中。
 * 稳妥构造函数模式也跟工厂模式一样，无法识别对象所属类型。
 */
function person(name) {
  var o = new Object();
  o.sayName = function () {
    console.log(name);
  };
  return o;
}

var person1 = person("kevin");

person1.sayName(); // kevin

person1.name = "daisy";

person1.sayName(); // kevin

console.log(person1.name); // daisy
