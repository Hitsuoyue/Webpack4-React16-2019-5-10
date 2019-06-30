重学 JavaScript （一）—— 基础知识
# 1.变量
## 1.1 变量规则
> * 变量只能包含字母、下划线、美元符号或数字；
> * 第一个字符不能是数字。
> * ECMAScript 的变量是松散类型的 —— 可以用来保存任何类型的数据，即每个变量仅仅是一个用于保存值的占位符而已。

## 1.2 定义变量
### 1.2.1 var ——ES5及之前使用
```javascript
var name = "jane";
```
**var 没有块级作用域，只有函数级作用域和全局作用域：**
> * 函数级作用域：
在函数内用 var 定义一个变量，则该变量为定义该变量的作用域中的局部变量，函数退出后则销毁。
> * 全局作用域：
省略 var ，则为全局变量，在函数外的任何地方都可被访问到（不推荐，难维护，且在严格模式下会抛出错误）。

### 1.2.2 let & const —— ES6 新增
**ES6 中增加了 let 和 const ：**
> let 用来定义变量，定义后可更改；
> const 用来定义常量，定义后不可更改。

**let 和 var 的区别：**
> * let 是块级作用域，var 是函数级作用域，let 的作用域更小；
> * let 无变量提升。
下面定义的变量，在上面使用会报错；
var有变量提升，下面定义的变量，在上面值为undefined，不会报错。
> * let 同一个变量只能声明一次，而 var 可声明多次。

# 2.数据类型
## 2.1 数据类型
**基本类型：**
> * 空值 （null）
> * 布尔值（boolean）
> * 数值 （number）
> * 字符串（string）
> * 未定义（undefined）
> * symbol（symbol —— ES6新增）

**复杂类型：**
> * 对象 （Object）
> * Object 本质上是由一组无序的名值对组成。
> * 引用类型除 Object 外，还包括 Function 、Array、RegExp、Date 等等。

## 2.2 变量赋值
**基本类型数据赋值：**
从一个基本类型变量向另一个变量赋值时，会在内存中新建一个地址，存放新的变量和复制过来的值；
```javascript
let a = 1;
let b = a;
b = 3;  
console.log(a, b)// =>  a = 1; b = 3; a 和 b 的值存在于内存中的两个地址，互不影响。
```
**引用类型数据赋值：**
从一个引用类型变量向另一个变量赋值时，同上，但引用类型的值，实际上是一个指针，与初始变量指向同一个堆内存的对象。因此，这两个变量会互相影响。
```javascript
let s = {name:"jane"};let y = s; y.name="tom";console.log(s, y)
let a = {name: "jane"};
let b = a;
b.name = "tom"; 
b.city="cc";
console.log(a, b) // =>  {name: "tom", city: "cc"} {name: "tom", city: "cc"} a 和 b 的值存在于内存中的两个地址，但值是同一个指针，指向同一个内存中的对象，属性的改变会相互影响。
```

# 3.原型及原型链
## 3.1 构造函数
**构造函数** —— 一种特殊的方法。
主要用来在创建对象时初始化对象， 即为对象成员变量赋初始值，总与new运算符一起使用在创建对象的语句中。

**实例化一个对象的过程：**
> new 一个新对象
=>  this 指向这个对象
=>  执行代码（对 this 赋值）
=> 返回 this

## 3.2 原型
**所有引用类型其隐式原型都指向它的构造函数的显式原型**
> obj._ proto _ === Object.prototype
> * 当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，会去它的  _ proto _ （即其构造函数的 prototype ）中寻找。

**隐式原型：**
> 所有引用类型（数组、对象、函数），都有一个 _ proto _ 属性，属性值是一个普通对象。

**显式原型：**
> 所有的函数都有一个 prototype 属性，属性值是一个普通对象。

**hasOwnProperty：** 
> 只判断对象本身是否包含某属性，不去其原型链中寻找。

## 3.3 原型链
### 3.3.1 原型链结构图
![原型链](https://img-blog.csdn.net/20180815213541213?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3N1bnNoaW5lOTI4NA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，会去它的  _ proto _ （即其构造函数的 prototype ）中寻找。

### 3.3.2 判断数据类型
#### 3.3.2.1 typeof
**typeof**——返回给定变量的数据类型，可能返回如下字符串：

```
返回字符串 —— 数据类型
'undefined' —— Undefined
'boolean' —— Boolean
'string' —— String
'number' —— Number
'symbol' —— Symbol
'object' —— Object / Null （Null 为空对象的引用）
'function' —— Function
```

* typeof 返回的类型都是字符串形式，需注意，例如：

```
alert(typeof 'abcd' === "string")   =>   true
alert(typeof 'abcd' === String)   =>    false
```

* typeof 对于Array、RegExp、Date 类型统一返回 'object'

```
alert(typeof [] === 'object')   =>    true
alert(typeof new Date)   =>    'object'
```
* typeof 对于 function 类型统一返回 'function'

```
alert(typeof function(){} === 'function')   =>    true
```

* typeof 是操作符而非函数，所以可以使用圆括号，也可以不使用。

```
alert（typeof 'abcd'）； /     alert（typeof （'abcd'））；
```
#### 3.3.2.2 instanceof 
 判断一个函数是否是变量的构造函数
**语法：** objectA instanceof constructorB
**判断逻辑：** 变量a的 _ proto _ 一层一层往上找，用来检测 constructor.prototype 是否存在于参数 object 的原型链上，是则返回 true，不是则返回 false。

```
    alert([1,2,3] instanceof Array) ---------------> true
    alert(new Date() instanceof Date) ------------> true
    alert(function(){this.name="22";} instanceof Function) ------------> true
    alert(function(){this.name="22";} instanceof function) ------------> false
```

#### 3.3.2.3 constructor
返回对象对应的构造函数

```
alert({}.constructor === Object);  =>  true
alert([].constructor === Array);  =>  true
alert('abcde'.constructor === String);  =>  true
alert((1).constructor === Number);  =>  true
alert(true.constructor === Boolean);  =>  true
alert(false.constructor === Boolean);  =>  true
alert(function s(){}.constructor === Function);  =>  true
alert(new Date().constructor === Date);  =>  true
alert(new Array().constructor === Array);  =>  true
alert(new Error().constructor === Error);  =>  true
alert(document.constructor === HTMLDocument);  =>  true
alert(window.constructor === Window);  =>  true
alert(Symbol().constructor);    =>    undefined
 Symbol 值通过Symbol函数生成，是一个原始类型的值，不是对象，不能通过 constructor 判断；
null 和 undefined 是无效的对象，没有 constructor，因此无法通过这种方式来判断。
```

> 注：
> * constructor 不能用来判断 Null 及 Undefined 类型
> * **函数的 constructor 不稳定。**
> 当一个函数被定义时，JS 引擎会为其添加 prototype 原型，然后在 prototype 上添加一个 constructor 属性，并让其指向函数的引用。
但函数的 prototype 被重写后，原有的 constructor 引用会丢失。再次新建一个次函数的实例后，其 constructor 指向的内容已发生改变。
因此为了规范开发，在重写对象原型时，一般都需要重新给 constructor 赋值，以保证对象实例的类型不被更改。 

#### 3.3.2.4 Object.prototype.toString()
> * toString() 是 Object 的原型方法，调用该方法，默认返回当前对象的 [[Class]] 。
> * 这是一个内部属性，其格式为 [object Xxx] ，是一个字符串，其中 Xxx 就是对象的类型。
> * 对于 Object 对象，直接调用 toString() 就能返回 [object Object] 。而对于其他对象，则需要通过 call / apply 来调用才能返回正确的类型信息。

```
Object.prototype.toString.call(new Date) === '[object Date]';   //true
Object.prototype.toString.call(new String) === '[object String]';   //true
Object.prototype.toString.call(Math) === '[object Math]';   //true
Object.prototype.toString.call(undefined) === '[object Undefined]';   //true
Object.prototype.toString.call(null) ==='[object Null]';   //true
Object.prototype.toString.call('') === '[object String]' ;      //true 
Object.prototype.toString.call(123) === '[object Number]' ;       //true
Object.prototype.toString.call(true) === '[object Boolean]' ;    //true 
Object.prototype.toString.call(Symbol()) === '[object Symbol]';    //true
Object.prototype.toString.call(new Function()) === '[object Function]';    //true
Object.prototype.toString.call(new Date()) === '[object Date]' ;    //true
Object.prototype.toString.call([]) === '[object Array]';   //true
Object.prototype.toString.call(new RegExp()) === '[object RegExp]' ;    //true
Object.prototype.toString.call(new Error()) === '[object Error]';   //true
Object.prototype.toString.call(document) === '[object HTMLDocument]';   //true
Object.prototype.toString.call(window) === '[object Window]';   //true
```
> **类型判断小结：**
> * 1）typeof 更适合判断基本类型数据，因为对于引用类型数据，typeof 只会返回 ‘function’ 或 ‘object’，不会返回其他的数组等类型；
> * 2）instanceof 只能用来判断实例类型，包括 Array、Date 等，判断基本类型会永远返回 true，无意义；
> * 3）constructor 不能用来判断 Null 及 Undefined 类型
> * 4）注：new String()、new Number() 生成的实际上为对象，但只能通过 typeof 能判断出来，constructor 和 .toString 只会返回 String 或 Number，无法判断是基本类型或是引用类型。







