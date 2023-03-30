---
title: "Maple-符号计算"
date: 2022-01-13 07:43:08 +0800
lastmod: 2023-03-30 10:08:35 +0800
summary: 'Maple符号计算的快速入门教程'
tags: ["symbolic calculation", "Maple"]
categories: ["Maple", '教程']
author: "JMx"
showToc: true
TocOpen: true
draft: true
hidemeta: false
comments: true
disableHLJS: true 
disableShare: true
hideSummary: false
searchHidden: false
ShowReadingTime: false
ShowBreadCrumbs: false
ShowPostNavLinks: true

---

{{< katex >}}

这里简单介绍一下Maple的使用. Maple和Mathematica (简称mma)以及Matlab并称为三大科学计算软件.
后两个软件的使用者很多, 网上教程也比较丰富. 
目前国内使用Maple的较少, 资料不多, 网上很多东西都搜不到.
Matlab更加精于数值矩阵运算, 如果需要符号计算, 可以使用其`Mupad`工具箱.
Mma则各方面都可以, 但是我个人用起来不太习惯.
Maple 较强于符号计算, 其输入更加符合数学习惯.
Maple的安装包大概只有`1G`, 后两个动辄`10G`.

---

## 基本用法
学习一门编程语言一般只需要掌握以下几点就可以正常使用了, 至于其它的特性则需要在使用中不断学习. 
不建议上来就抱着一本几百页的数一点一点的看, 太慢了, 而且不用的话, 很难理解.
平时学习中, 要学会偷懒, 能用计算机算, 就不要手算, 这样才能提高编程能力.

> 下面的内容均基于 **Maple 18 (2014.1.24) 版本**. 部分地方可能会与新版本不同 (例如, 似乎2020版矩阵求导不需要`map`), 不过差别不是很大. 而且新版本对常用的命令更改并不多.

### 创建文件
点击左上角`文件` -> `新建` -> `文件模式`. 或者使用快捷键 `Ctrl` + `N`.
![创建文件](images/newfile.png)
之后如下
![空白文件](images/blank.png)


### 输入和输出
上图中可以看到有`文字`和`数学`两个选项.
点击`文字`, 鼠标所在行可以写文字, 不会运行, 可以正常换行等操作. 
文字环境一般用来写程序说明, 即注释, 来说明程序是用来干什么的, 为什么, 以便阅读. 
如果不加注释, 时间久了就容易忘. 而且程序可能会给别人用, 不加注释是很难读的.

点击`数学`, 鼠标所在行会变成数学环境, 并且有虚线框.
![空白文件](images/text-math.png)
两种环境可以用快捷键`F5`来快速切换.
在数学环境下, 按回车键`Enter`会运行当前代码块, 想要换行的话, 需要使用`Shift` + `Enter`.
对于多行的代码块, 尽量一行只进行一个命令, 不要把很多命令全放在一行, 这样太长, 不容易读.
多行代码中每一行代码都需要以分号或者冒号结束, 最后一行可以不加. 如下所示
![换行](images/enter.png)
不加分号或者冒号, 会认为仍然接上一行, 有时会报错.
从上图还可以看出分号会输出, 冒号则不输出.
在数学环境中, 也可以加注释, 但是需要在注释前面加`#`, 该符号后面的内容不会运行, 可以起到注释的作用.
不过一般不这么做, 把代码和注释写在一块太乱.
![注释](images/注释.png)
在数学环境的开头或者结尾可以按`F5`切换至文字环境, 换行后再切换至数学环境来对代码进行分块.

一些输入特性:
|特性|解释|
|:-|:-|
| 自变量 | 定义函数不需要先定义自变量, 直接使用, 这一点与 matlab 不同.|
| 次方 | 输入 `^` 会直接变成上标.|
| 下标 | 需要用 `[]`, 下标放在中括号里面即可.|
| 分式 | 输入 `/` 会直接变成分式.|
| 希腊字母 | 希腊字母的英文名输入直接变成数学符号, 输入中如果用 `^` 作用一次, 也会直接变成数学符号, 更加清晰.|
| 百分号 | 在 Maple 中, 可以用 `%` 来表示上一步运行的结果, 直接引用, 免去定义或者复制.|

示例
![下标](images/input-sub.jpg)
![%](images/%.jpg)

### 定义变量
```javascript
a := 3;  # 定义变量不是用等号， 而是用冒号等号
b := 4:  # 冒号不打印
c := 3 * 4; # 分号打印
#  两个变量或者数字与变量的乘积可以省略乘号，但两个数字的乘积不能省略
f := a x^2 + b x + c;  # 注意不能定义 f(x) := ...
# 需要注意的是, 这里所定义的变量都是全局变量, 运行过以后, 在程序的任何地方都可以引用
# 如果想要删除某个变量, 可以使用如下命令
unassign(`a`, `b`) # 取消给 a 和 b 赋值
# 在后面的自定义函数中, 我们会看到局部变量, 它们只在函数体内有效
# 有时候为了方便输入, 会使用别名来定义变量
alias(u=u(x), v=v(x));
# 这样在后面用u, v的时候就会隐去x, 见下图
```
![alias](images/alias.png)
图中第一行由于 v 没有定义, 默认为常数, 因此求导为 0.

### 变量类型
上面定义的变量都是按个的表达式或者数字, 对于多个表达式, 可以用集合, 矩阵, 列表等类型.

- **矩阵**

基本与数学中的一致.
```javascript
with(LinearAlgebra):  # 使用矩阵及其操作， 需要引入线性代数包
M := Matrix( row, col ); # row * col阶矩阵
M := Matrix( row ); # row阶方阵
M := Matrix([ [1, 2, 3], [4, 5, 6], [7, 8, 9] ]); # 三阶矩阵 或者
M := <1, 2, 3 | 4, 5, 6 |, 7, 8, 9>; # 注意这里与上面定义的M互为转置 
M[1, ..] # M的第一行(向量型)
M[.., 1] # M的第一列
M^-1 # M的逆
M . M # M^2
M[1, 1] := 4 # 可以给矩阵的某个元素赋值
Transpose(M);
HermitianTranspose(M);
Determinant(M);
coeMat, b := GenerateMatrix( [ eq1, eq2, ...], [ x1, x2, ...]);  # 获取系数矩阵和右端项
```
![matrix](images/matrix.png)
需要注意的是, 在使用`alias`时, 有如下区别:
![mat-alias](images/mat-alias.png)
可以看到, 从输入复制的矩阵, alias不起作用, 因此 `M4` 求导为0.

另外需要注意的是, 每一个由单个表达式或者数字定义的变量在计算机内存中的地址都不一样, 如
```javascript
a := 3;
b := a;
```
改变 `a` 的值不会影响 `b` 的值.
但是对于矩阵, 两者指向同一地址.
```javascript
A := [1, 2, 3];
B := A;
```
因此如果改变 `A` 中某个元素的值, 则 `B` 也会发生变化.
![memory](images/memory.png)


- **列表(list)**
```javascript
arr :=[1, 2, 3, 4]:
arr[3] # return 3;
arr[1..2] # return [1, 2];
arr[-1] # return 4
arr + arr # 列表也可以加减
```
![list](images/list.png)
列表引用似乎不会同时改变.

- **集合(set)**

Maple中的集合与数学中的集合一致: 无序, 不重复.
```javascript
arr := { 5, 1, 2, 3, 4 }; # 无序(虽说无序, 但内部会按照数字/字母顺序排列), 不重复
arr[1] # 可能是1
intersect({1, 2, 3}, {3, 4, 5}) # return {3};
union({1, 2, 3}, {3, 4, 5}) # return {1, 2, 3, 4, 5};
{1, 2, 3} \ { 2 } # return {1, 3}
```
集合中的元素可以是任意类型, 但是需要注意, 集合中的元素没有顺序, 上面定义的 `arr[1]` 不是 5.
![set](images/set.png)

- **向量**
```javascript
arr1 := <1, 2, 3, 4>; # 列向量
arr2 := < 1 | 2 | 3>; # 行向量
arr . arr2 # 矩阵
```
![vec](images/vec.png)

- **序列**
```javascript
sequence := seq(1..3) # return 1, 2, 3
arr := [ seq(1..3) ] # 序列加`[]`变列表
set_ := { seq(1..3) } # 变集合, 这里加下划线是因为 set 是程序里面的关键字, 不能作为变量名
# 还有其它一些关键字, 如 if, then, do, list 等
sequence := seq( i^2, i=1..3 ) # return 1, 4, 9
sequence := seq( F[i](x), i=1..3) #
a, b, c := seq(1..3) # 使用序列可以给多个变量赋值
seq( seq(a[j, i](x), i=1..3), j=1..3 ); # return a_{11}, a_{12}, ..., a_{33}. # 多重, 常用来创建矩阵
```
![seq](images/seq.png)

- **字典(table)**
```javascript
T := table([ a = 1, b = x^2, c = "abcde"  ]); 
T[a] #  1.
```

- **字符串**
```javascript
s := "i am a string";
s[1..4] # = "i am";
```
![string](images/string.png)
字符串一般用于输出提示信息. 比如在一个程序中, 可以把各种提示信息打印出来.
```javascript
print("please input U");
```

### 流程控制
- **判断**
```javascript
if x > 0 and (or) x < 4 then
   # do something;
end if;

if x > 0 and (or) x < 4 then
   # do something
elif x < 0 then
	# do something
else
	# do something
end if;
```
注意换行并添加缩进.

- **循环**
```javascript
for i from 1 to 10 do
   # do something;
end do;

for i from 1 to 10 do
   if i mod 2 = 0 then
   	# do something
   end if;
end do;

arr := [1, 2, 3, 4];
for i in arr do
   # do something;
end do;

# 阶乘 n!
prod_ := 1;
n :=10;
for i from 1 to n do
	prod_ := prod_ * i:
end do: # 注意, 这里如果不用冒号, 每次循环都会输出 prod_;
print(prod_);
```
![for](images/for.png)

### 自定义函数
```javascript
func := (x) -> x^2: # 箭头函数

func(4) # 16

# proc里面的量就是变量, 即输入, 而 return 后面是返回的结果, 可以返回多个
func := proc(x)
	global w, z; # 全局变量, 在整个程序中都存在
	local y; # 局部变量, 只存在于本函数体内
	y = x^2;
   return y;
end proc:

# 即 y = func(x);


func(4) # return 16

# 我们把阶乘函数抽象出来
factorial_ := proc(n)
	# local prod_, i; # 程序内除输入以外的变量都要声明是全局变量还是局部变量, 否则可能会有警告信息
	prod_ := 1;
	n :=10;
	for i from 1 to n do
		prod_ := prod_ * i:
	end do; 
	return prod_; 
end proc:

# 使用递归来定义, 递归可以看作一种循环, 适用于知道循环结束判断, 不知道循环次数的问题
factorial_ := proc(n)
	if n = 0 then
		return 1;
	else
		return n factorial_(n-1) ;
	end if
end proc:

# 递归实现汉诺塔问题, (由 ChatGPT 作答)
hanoi := proc(n, A, B, C)
  if n = 1 then
    printf("Move disk from %s to %s\n", A, C);
  else
    hanoi(n-1, A, C, B);
    printf("Move disk from %s to %s\n", A, C);
    hanoi(n-1, B, A, C);
  end if;
end proc:

hanoi(3, "A", "B", "C");
```
![func](images/func.png)
![func](images/func2.png)
![chatgpt-hanoi](images/chatgpt-hanoi.png)
需要注意的是, 函数内部的命令行不论是以分号还是冒号结尾, 都不会打印, 因此需要`print`函数来进行打印.


---

## 常用命令
Maple中的内置命令一般都是选取英文名称或者前几个字母, 注意内置命令也不能作为变量名.

### 化简/因式分解/展开/分子/分母
```javascript
simplify / factor / expand / numer / denom
```
![simplify](images/simplify.png)

### 合并同类项/提取系数/次数
```javascript
expr := x^3 + 2 x^4 + (x+1)^3 + (2 x +3 y)^2 + y^2;
collect(expr, x);
collect(expr, [x, y]); # 先对 x 再对 y
collect(expr, diff); 
collect(expr, exp);
collect(expr, sin);
degree(expr, x) # x的次数
ldegree(expr, x) # x最低次幂
coeff(expr, x, 3) # x^3 的系数
lcoeff(expr, x)  # x最高次幂的系数
tcoeff(expr, x)  # x最低次幂的系数
coeffs(expr, x); # x 的各次幂系数

with(PolynomialTools):
CoefficientVector(x^3 + 2 x^2 + 3 x + 4, x); # <4, 3, 2, 1>

with(PDETools):
dcoeffs(expr, u); # u 的各阶导数的系数
```
![coeff](images/coeff.png)

### 排序
```javascript
sort([1,3,4,2]) # [1,2,3,4]
sort([1,3,4,2], `>`) # [4,3,2,1]
sort(x^3 + 2 x^4 + x + 3 x^2) # 2 x^4 + x^3 + 3 x^2 + x
```

### 替换
```javascript
# 表达式替换
subs(x=1, expr);
subs(x=1, y=2, expr);
subs({ x=1, y=2 }, expr);
subs({ x=1 }, { y=2 }, expr);
 
# 代数替换, subs替换模式是精确替换, 而代数替换会考虑代数关系
subs( x + y + z = t, expr ) # 只有当 x + y + z 项才会被替换
algsubs( x + y + z = t, expr ) # 一次只能有一个代数表达式, 与 subs 不同

# 微分替换, 常用于具有导数的式子
with(PDETools):
dsubs( f(x) = g(x), expr );
```
![subs](images/subs.png)

### 复数/小数
```javascript
sin(1) # sin(1)
evalf( sin(1) ) # 0.8414709848
evalf( sin(1), 4) # 0.8415
evalc( exp(3 I x + y) ) # exp(y)*cos(3*x)+I*exp(y)*sin(3*x)
```
![evalc](images/evalc.png)

### 公式生成 tex 代码
```javascript
latex(expr);
```
![latex](images/latex.png)
此处可以使用在线工具[Maple-Latex](https://jiandandaoxingfu.github.io/maple-latex/)来格式化其生成的tex代码, 去除冗余.
![maple-latex](images/maple-latex.png)

### 公式拆解/获取自变量/函数名
```javascript
op( f(x) ) # return x
op( 0, f(x) ) # return f
op( a + b c ) # return a, b c
op( a b ) # return a, b
op( -f / g) # return [-1, f, 1/g]
op( [1,2,3] ) # list to seq
[ op( [1,2,3] ), 4] # [1,2,3,4], 扩容
nops([1, 2, 3, 4]) # 获取数组长度
indets( A F(x) + B ) # { A, B, F(x), x }
indets( A F(x) + B, name ) # { A, B, x}
indets( A F(x) + B, Function ) # { F(x) }
```
![op](images/op.png)


### 变量转换
```javascript
convert( 1/3, float ) #  return 0.3333333...
convert( f(x), string ) # return "f(x)"
convert( "f", symbol ) # return f
convert( [1, 2, 3, 4], set ) # return {1, 2, 3, 4}
convert(expr, sin); # 把所有函数都用正弦函数来表示
convert(expr, exp); 
convert(expr, sech);

# 也可用 op
{ op( [1, 2, 3, 4] ) }; # { 1, 2, 3, 4 }
convert( [1, 2, 3, 4], Matrix, 2 );
convert( seq( seq(V[j, i](x), i=1..3), j=1..3 ), Matrix, 3, 3 ) # (V_{ij})_{3*3} # 列表转矩阵
```
![convert](images/convert.png)
另外, 有时候在处理一些矩阵或者数组时, 需要转成字符串来处理. 之后再转回来. 这需要使用 `parse` 来解析.
![parse](images/parse.jpg)


### 微分/积分
```javascript
diff(f, x);
diff(f, x$k) # k阶导数
diff(f, x$2, t$3);
int(f, x); # 不定积分
int(f, x=0..1); # 定积分
seq( diff( f(x), x$i ), i=1..3)
```
需要注意的是, 在一些低版本中, 求导积分等一些运算只能作用域单个表达式, 不能作用域集合, 矩阵等.
![diff](images/diff.png)

### 映射
将某个函数作用于数组, 列表, 矩阵等多维表达式的每一个元素.
```javascript
map(f, [x, y, z], a); # return [f(x, a), f(y, a), f(z, a)];
map2(f, a, [x, y, z]) # return [f(x, 1), f(y, 2), f(a, z)];
arr := [ seq(1..3) ];
map( x-> x^2, arr ); # return [1, 4, 9] map可以替代for循环， 更加方便。
map(sin, arr); # sin 函数作用于每一个元素
V := convert( seq( seq(V[j, i](x), i=1..3), j=1..3 ), Matrix, 3, 3 );
map(diff, V, x) # 矩阵求导
map(op, 0, arr) 
map(expand, M);
# 另外, 也可以使用 ~ 来代替map, 如
sin~(arr)
diff~(arr, x)
```
![map](images/map.png)
另外还有`zip`函数, 可以将某个函数同时作用于两个结构体对应的元素
```javascript
zip(f, [1,2,3], [4,5,6]) # [f(1,4), f(2,5), f(3,6)]
zip(`*`, M1, M2) # 两个矩阵对应元素相乘
```

### 求解方程(组)
```javascript
solve( eq = 0, x ); # 右端等于0可以省略
solve( eq, { x });
solve({ eq1=b1, eq2=b2, ... }, { x1, x2, ... });
solve( eq > 0, x);
```
![solve](images/solve.png)


### 求解常微分方程(组)
```javascript
# 常微分方程
dsolve( deq = 0, y );
dsolve({ deq1=b1, deq2=b2, ... }, { y1, y2, ... }) 
# 偏微用 
dsolve( deq = 0, y );
dsolve({ deq1=b1, deq2=b2, ... }, { y1, y2, ... }) 
# 同样右端等于0可以省略
```
![dsolve](images/dsolve.png)


### 泰勒展式与幂级数展开
```javascript
taylor( f(x), x=0, 3 ) #  在 x=0 处展开, 精确到 x^3
series( f(x) / x, x=0, 3 ) # 类似
convert( series( f(x) / x, x=0, 3 ), polynom ) # 去掉大 O 项
```
![taylor](images/taylor.png)


### 符号连接
```javascript
cat('v', 1, 2) # return v12;
seq(cat('v', i), i=1..3) # return v1, v2, v3
seq(seq(cat('v', i, j), i=1..3), j=1..3 ) # return v11, v12, ..., v33
convert([seq(seq(cat('v', j, i), i = 1..3), j = 1..3)], Matrix, 3) # return (vij)_{3*3}
```
![cat](images/cat.png)

### 类型判断
```javascript
is(5 > 10) # false
type(f(x), function) # true
has(f(x), x) # true
has(sin(x) + cos(x), sin) # true
hasfun(diff(g(x), x), diff); # true
whattype(x) # symbol
whattype(exp(x)) # function,
whattype(x - y) # `+`
whattype( x y) # `*`
```

### 选择/移除
```javascript
select(i -> i mod 2 = 0, [1,2,3,4]) # [2,4]
remove(i -> i mod 2 = 0, [1,2,3,4]) # [1,3]
select(has, [f(x), a, b], x) # [f(x)]
select(type, [f(x), a, b], function) # [f(x)]
```

### 绘图
```javascript
plot( sin(x), x=-3..3 );
plot3d( sech^2(x/6 + t) , x=-3..3, t=-3..3);
plot3d( k^n exp(3 t), n=-10..10, t=-5..5, grid=[21, 100] );
```
![plot](images/plot.png)
Maple 还可以绘制动画, 例如我们有一个(2+1)-维偏微分方程的解, 那么可以将时间`t`作为参数进行绘制, 看图形随时间的演化
```javascript
with(plots):
animate(plot3d, [u, x = -10 .. 40, y = -10 .. 40, grid = [100, 100]], frames = 50, t = 0 .. 50);
```
![animation](images/animation.gif)

### 文件读取
```javascript
save var1, var2, ..., "path/var.m"; # 保存多个变量到文件
read "path/var.m";
ExportMatrix("F:data.txt", mat) # 保存矩阵到记事本文件, mat为矩阵
```

--- 

## 一些有趣的例子
### 多项式处理
考虑下面的多项式
```javascript
eq := -u(n+2) v(n-2)^2
	-v(n-4) u(n)
	+3 v(n-3) w(n-3) u(n)^2
	+v(n-3) u(n) w(n-1)
	+v(n-2) u(n+1) w(n)
	+u(n+2) v(n-1) w(n-1)
	+v(n-3) u(n) v(n-2) u(n-1)
	-4 v(n-3) v(n-4) u(n-3) u(n)
	+v(n-4) u(n-2) u(n) v(n-2)
	+v(n+1) u(n+2) v(n-2) u(n+1)
	+u(n+2) v(n-1) v(n-2) u(n-1)
	+u(n+2) u(n) v(n-2) v(n)
	-w(n-2) u(n) v(n-2) w(n-1)
	+u(n)^2 v(n-2)^2+v(n-4) v(n-1) u(n) u(n-1)^2
	+v(n-1) u(n) v(n-2) u(n+1)
	-v(n-1) w(n-1) u(n+1) w(n)
	+-2 v(n-1) u(n)^2 v(n-2) w(n-1)
	-u(n+2) v(n-1) u(n) w(n-1) v(n)
	-v(n-3) w(n-3) u(n-2) u(n) v(n-2)
	-v(n-3) u(n-2) u(n) v(n-2) w(n-1)
	-v(n-3) v(n-1) u(n) u(n-1) w(n-1)
	-v(n+1) u(n+2) v(n-1) w(n-1) u(n+1)
	-w(n-2) u(n) v(n-2)^2 u(n-1)
	-v(n-1)^2 u(n) w(n-1) u(n+1)
	-u(n) v(n-2) v(n) u(n+1) w(n)
	-v(n-1) v(n-2) u(n-1) u(n+1) w(n)
	-v(n-3) w(n-3) v(n-1) u(n) u(n-1)
	+v(n-1)^2 u(n)^2 w(n-1)^2-v(n-3) u(n-2) u(n) v(n-2)^2 u(n-1)
	-2 v(n-1) u(n)^2 v(n-2)^2 u(n-1)
	-v(n+1) u(n+2) u(n) v(n-2) v(n) u(n+1)
	-u(n+2) v(n-1) u(n) v(n-2) u(n-1) v(n)
	-v(n+1) u(n+2) v(n-1) v(n-2) u(n-1) u(n+1)
```
每个单项式由 $u, v, w$ 及其它们的位移相乘, 想要根据因子数(按重数记, 如第一项有三个因子, 第二项有两个)进行分类. 
首先利用 `op` 函数对其分解
```javascript
eqs := [ op(eq) ];
```
然后使用 `map` 函数对每一项进行处理. 问题在于怎么判断因子数.
一个比较简单的想法是令 $u=v=w=10$, 这样每一项都会变成 $10$ 的倍数, 只需要数 $0$ 的个数就可以了 (这里 $10$ 要大于每一项前面的系数, 不然就取更大的数).
```javascript
num := subss( { u(n)=10, v(n)=10, w(n)=10 }, eqs ); # subss 是对 subs 的改写, 可以替换 u(n-1), u(n+1), ...
# 这样, 结果就变成了
# num = [-10^3, -10^2, 3*10^4, ...]
```
那么怎么数 $0$ 的个数呢? 可以考虑对绝对值取以 $10$ 为底的对数(注意到 $\log_{a}b = \frac{\log b}{\log a}$), 即
```javascript
num2 := map( a -> evalf( log( abs(a) ) / log(10) ),  num );  #  [ 3, 2, 4 + log 4/ log 10, ... ]
```
注意, 这里因为每一项前面可能有一个系数 (小于 $10$), 所以会出现小数 (小于 $1$). 因此只需要再取下整即可.
```javascript
num3 := map( floor, num2 ) # [3, 2, 4, ...]
```
这样, 就可以根据每一项对应的 `num3` 中的值来进行分类.
```javascript
map( a -> if floor( evalf( log( abs(subss( { u(n)=10, v(n)=10, w(n)=10 }, a )) ) / log(10) ) ) = 3 then a end if, eqs );
```
这样就把因子数为 $3$ 的单项式挑出来了.
然后再用 `convert` 把它们加起来:
```javascript
convert( map( a -> if floor( evalf( log( abs( subss( { u(n)=10, v(n)=10, w(n)=10 }, a ) ) ) / log(10) ) ) = 3 then a end if, eqs ), `+`); 
```
当然也可以用序列把每一类都加起来:
```javascript
eqs := [ op(eq) ]; 
seq( convert( map( a -> if floor( evalf( log( abs( subss( { u(n)=10, v(n)=10, w(n)=10 },  a) ) ) / log(10) ) ) = i then a end if, eqs ), `+`), i=1..10)
```

### 微分表达式处理
考虑下面的微分多项式
$$
expr := -\frac{i}{2} u^{3}v \alpha_{5}+i u^{2}\alpha_{3}-\frac{i}{2} u^{3}v \alpha_{4}+i u^{2}\alpha_{2}+\frac{i}{2} v^{3}u \alpha_{5}-i v^{2}\alpha_{3}+\frac{i}{2} v^{3}u \alpha_{4}-i v^{2}\alpha_{2}-\frac{1}{2} u_{x} u \alpha_{5}-\frac{1}{2} u_{x} u \alpha_{4}-\frac{1}{2} v_{x} v \alpha_{5}-\frac{1}{2} v_{x} v \alpha_{4} .
$$
我们想要获取上式中不含导数的部分, 只需使用如下命令
```javascript
convert( remove(hasfun, [ op(expr) ], diff), `+`) 
# or
convert( select( f -> not( hasfun(f, diff) ), [ op(expr) ]), `+`) 
```


---

## 注意事项

**帮助文档**

学习一门语言最好的资料是软件自带的帮助文档, 其中详细的介绍了内置函数的各种用法和例子.
![help](images/help.png)
在上面的输入框中输入函数名, 点击进入相应的文档即可.


**注释**

写的程序一定要添加注释, 特别是程序很长的, 要分成若干块. 

**清晰**

写的程序要清晰明了, 特别是流程控制合函数体内, 要使用空格或者缩进来加以区别, 不能都是从头开始.


**简洁**

每一行代码不宜过长, 多用换行. 每个函数也不宜过长, 一个大的函数应该分成若干个子函数.

**一般性**

写的代码要有普适性, 能够很方便的移植到其它地方. 
比如处理二阶谱问题的程序, 应该可以迁移到高阶谱问题.
此类可以将阶数定义出来, 后面用到阶数2的时候用变量代替, 后续改成3就很容易.

**变量命名**

给变量命名要么起一个英文名, 一看就知道是什么意思. 或者和文章中的符号保持一致.


---

## 进阶
### 矩阵符号运算

符号计算中, 当不确定矩阵维数时, 需要保证不满足交换律, 同时保持求导等运算. Maple的`Physics`包中提供了可以定义符号变量为非交换元素, 从而可用于矩阵的符号运算中去. 具体使用如下:
```javascript
with(Physics):
Setup(mathematicalnotation=true):
Set(noncommutativeprefix={U, V, X, ... }):
eq := U V - V U; # eq != 0.
```

### 自定义模块

在日常使用中, 对于经常要使用的代码, 可以封装成模块, 放在Maple库中, 方便使用. 像线性代数包`LinearAlgebra`, 微分方程包`PDETools` 等. 其定义方式类似于`procedure`函数,
```javascript
MyModule := module()
	option package;

	export add; # 要导出的函数, 变量等
	local minus; # 不需要导出的函数, 变量

	add := proc(x, y)
		return x + y;
	end proc:

	minus := proc(x, y)
		return x - y;
 	end proc:

end module:
```
运行上述程序, 然后再运行如下命令将其保存在Maple库中(这里假设Maple安装路径为`D:/maple 18`)
```javascript
savelib(MyModule, "D:/maple 18/lib/MyModule.mla");
```
运行完以后可以在该目录下看到`MyModule.mla`文件. 之后就可以像使用内置包, 如LinearAlgebra包一样使用. 任意一个程序中运行
```javascript
with(MyModule)  # return [add]
```
然后就可以愉快的使用`add`函数了
```javascript
add(3, 5) # return 8
```
非常的方便.


---

## 下载

{{< download url="files/2023-03-02-example.mw" text="Maple 与 Darboux 变换" >}}

{{< download url="files/2023-03-02-张鑫-三位势连续.mw" text="三位势可积方程的 Darboux 变换" >}}

{{< download url="files/2023-02-24-王鑫-离散BC.mw" text="离散可积方程的 Darboux 变换" >}}

{{< download url="files/Maple2020中文用户手册.pdf" text="Maple 2020 中文用户手册" >}}

> 上面的`离散可积方程的Darboux变换`程序中用到了 `SolveDifferenceEq` 和 `DiscreteHierarchy` 两个包中的一些函数, 需要把以上两个包放在Maple安装路径的`lib`文件夹下, 即`maple 18/lib/`里面.
这两个包的下载和使用方法可以参见文档 [SolveDifferenceEq](https://jiandandaoxingfu.github.io/myblog/post/solve-difference-equation/) 和 [DiscreteHierarchy](https://jiandandaoxingfu.github.io/myblog/post/derive-hierarchy/).


