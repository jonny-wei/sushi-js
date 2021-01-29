/**
 * 私有变量的实现
 */

 /**
  * 方法一
  * 
  * 使用 Proxy 代理所有含有 _ 开头的变量，使其不可被外部访问
  * 
  * 缺点：私有变量需以'_'开头命名
  */
const proxy = function(obj){
    return new Proxy(obj,{
        get(target,key){
            if(key.startsWith('_')){
                throw new Error("private key")
            }
            return Reflect.get(target,key)
        }, 
        ownKeys(target){
            return Reflect.ownKeys(target).filter(key => !key.startsWith('_'))
        }
    });
}

/**
 * 方法二
 * 
 * 通过闭包的形式保存私有变量
 * 
 * 缺点：在于类的所有实例访问的都是同一个私有变量
 */
const Person = (function(){
    const _name = Symbol('name')
    class Person{
        constructor(name){
            this[_name] = name
        }

        getName(){
            return this[_name]
        }
    }
    return Person
})()

/**
 * 方法三
 * 解决了上面那种闭包的缺点，每个实例都有各自的私有变量，
 * 缺点是舍弃了 class 语法的简洁性，
 * 将所有的特权方法（访问私有变量的方法）都保存在构造函数中
 */
class Person{
    constructor(name){
        let _name = name;
        this.getName = function(){
            return _name;
        }
    }
}

/**
 * 方法四
 * 
 * 通过 WeakMap 和闭包，在每次实例化时保存当前实例和所有私有变量组成的对象，
 * 外部无法访问闭包中的 WeakMap，
 * 使用 WeakMap 好处在于当没有变量引用到某个实例时，
 * 会自动释放这个实例保存的私有变量，减少内存溢出的问题
 */
const Person = (function(){
    let wp = new WeakMap()

    class Person {
        constructor(name){
            wp.set(this,{name})
        }

        getName(){
            return wp.get(this).name
        }
    }

    return Person
})()