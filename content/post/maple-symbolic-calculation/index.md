---
title: "Maple-符号计算"
date: 2022-01-13 07:43:08 +0800
lastmod: 2023-03-01 16:34:17 +0800
summary: 'Maple符号计算的快速入门教程'
tags: ["symbolic calculation", "Maple"]
categories: ["Maple", '教程']
author: "JMx"
showToc: true
TocOpen: false
draft: true
hidemeta: false
comments: false
disableHLJS: true 
disableShare: true
hideSummary: false
searchHidden: false
ShowReadingTime: false
ShowBreadCrumbs: false
ShowPostNavLinks: true

---

### 基本使用
#### 定义变量
```javascript
a := 3;  # 定义变量不是用等号， 而是用冒号等号
b := 4:  # 冒号不打印
c := 3 * 4; # 分号打印
f := a x^2 + b x + c; #  两个变量或者数字与变量的乘积可以省略乘号， 两个数字的乘积不能省略
unassign(`a`, `b`) # 取消给 a 和 b 赋值
# 这里#表示注释， 其后面的内容不会运行。 
# 对所写程序添加注释是一个良好的代码习惯。 说明方法和目的， 
# 有助于自己和别人理解
```

#### 变量类型

- 矩阵
```javascript
with(LinearAlgebra):  # 使用矩阵及其操作， 需要引入线性代数包
M := Matrix( row, col ); # row * col阶矩阵
M := Matrix( row ); # row阶方阵
M := Matrix([ [1, 2, 3], [4, 5, 6], [7, 8, 9] ]); # 三阶矩阵 或者
M := <1, 2, 3 | 4, 5, 6 |, 7, 8, 9>; # 注意这里与上面定义的M互为转置 
M[1, ..] # M的第一行(向量型)
M[.., 1] # M的第一列
```
- 列表
```javascript
arr :=[1, 2, 3, 4]:
arr[3] # return 3;
arr[1..2] # return [1, 2];
arr[-1] # return 4
```
- 集合
```javascript
arr := { 1, 2, 3, 4 }; # 无序(虽说无序, 但内部会按照数字/字母顺序排列), 不重复
arr[1] # 可能是1
```
- 向量
```javascript
arr := <1, 2, 3, 4>; # 列向量
arr := < 1 | 2 | 3>; # 行向量
```
- 序列
```javascript
arr := seq(1..3) # return 1, 2, 3
arr := [ seq(1..3) ] # return [1, 2, 3]
arr := seq( i^2, i=1..3 ) # return 1, 4, 9
a, b, c := seq(1..3) # 使用序列可以给多个变量赋值
```
- 字典(table)
```javascript
T := table([ a = 1, b = x^2, c = "abcde"  ]); 
T[a] # = 1.
```
- 字符串
```javascript
s := "i am a string";
s[1..4] # = "i am";
```

#### 流程
- 判断
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

- 循环
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
```

#### 定义函数
```javascript
func := (x) -> x^2: # 箭头函数

func := proc(x)
	global w, z; # 全局变量, 在整个程序中都存在
	local y; # 局部变量, 只存在于本函数体内
	y = x^2;
   return y;
end proc:

func(4) # return 16
```


### 常用命令
Maple中的命令一般都是选取英文名称的前几个字母

- 化简/因式分解/展开/分子/分母
```javascript
simplify / factor / expand / numer / denom
```

- 合并同类项/提取系数/次数
```javascript
expr := x^3 + 2 x^4 + (x+1)^3 + (2 x +3 y)^2 + y^2;
collect(expr, x);
collect(expr, [x, y]); # 先对 x 再对 y
degree(expr, x) # x的次数
ldegree(expr, x) # x最低次幂
coeff(expr, x, 3) # x^3 的系数
lcoeff(expr, x)  # x最高次幂的系数
tcoeff(expr, x)  # x最低次幂的系数

with(PolynomialTools):
CoefficientVector(x^3 + 2 x^2 + 3 x + 4, x); # <4, 3, 2, 1>
```

- 微分/积分 
```javascript
diff(f, x$k) / int(f, x)
map(diff/int/expand, M, x)  # 矩阵各个元素求导/积分/展开
```

- 求解方程(组)
```javascript
solve( eq = 0, x ) / solve({ eq1=b1, eq2=b2, ... }, { x1, x2, ... })
% 右端等于0可以省略
```

- 系数矩阵
```javascript
with(LinearAlgebra):
coeMat, b1 = GenerateMatrix( { eq1, eq2, ...}, { var1, var2, ...} );
```

- 求解常微分方程(组)
```javascript
dsolve( deq = 0, y ) / dsolve({ deq1=b1, deq2=b2, ... }, { y1, y2, ... }) # 偏微用 fsolve
% 右端等于0可以省略
```

- 矩阵运算
```javascript
# 矩阵运算一般需要加载线性代数包, 它内置了各种矩阵运算函数
with(LinearAlgebra):
A . B # 矩阵乘法
A^2 # A . A
Transpose(A) # 矩阵转置, 也可以用 A^%T, 注意不是 A^T
HermitianTranspose(A) #  等价于 A^%H
map(diff, A, x) # 等价于 diff~(A, x);
A^-1 # 矩阵的逆
map(expand, A);
collect(A, lambda)
```

- 公式拆解/获取自变量/函数名
```javascript
op( f(x) ) # return x
op( 0, f(x) ) # return f
op( a + b c ) # return a, b c
op( a b ) # return a, b
op( -f / g) # return [-1, f, 1/g]
nops([1, 2, 3, 4]) # 获取数组长度
```

- 获取未知函数(量)
```javascript
indets( a f(x) + b ) # return { a, b, x, f(x) };
indets( a f(x) + b, Function ) # return { f(x) };
indets( alpha f(x) + beta g(x) + 3, name) # return alpha, beta, x.
```

- 变量转换
```javascript
convert( 1/3, float ) #  return 0.3333333...
convert( f(x), string ) # return "f(x)"
convert( "f", symbol ) # return f
convert( [1, 2, 3, 4], set ) # return {1, 2, 3, 4}
evalf( 1/3 ) # return 0.33333...
```

- 复数操作
```javascript
a := 3 + 4 I:
b := a^*  # return 3 - 4 I;
[ Re(a), Im(a) ] # return [3, 4]
evalc( expr ) # return Re(expr) + I Im(expr)
```

- 映射
```javascript
arr := [ seq(1..3) ];
map( x-> x^2, arr ); # return [1, 4, 9] map可以替代for循环， 更加方便。
map(sin, arr); # sin 函数作用于每一个元素
map(diff, arr, x) # 矩阵求导
# 另外, 也可以使用 ~ 来代替map, 如
sin~(arr)
diff~(arr, x)
```

- 符号连接
```javascript
cat(v, 1, 2) # return v12;
seq(cat(v, i), i=1..3) # return v1, v2, v3
seq(seq(cat(v, i, j), i=1..3), j=1..3 ) # return v11, v12, ..., v33
Transpose(convert([seq(seq(cat(v, i, j), i = 1..3), j = 1..3)], Matrix, 3)) # return (vij)_{3*3}
```

- 判断
```javascript
is(5 > 10) # False
has(sin(x) + cos(x), `sin`) # True
whattype(x) # symbol
whattype(exp(x)) # function
whattype(x - y) # `+`
whattype( x y) # `*`
```

- 绘图
```javascript
plot( sin(x), x=-3..3 );
plot3d( sech^2(x/6 + t) , x=-3..3, t=-3..3);
```

- 文件读取
```javascript
save var1, var2, ..., "path/var.m";
read "path/var.m";
```

### 进阶
#### 矩阵符号运算

符号计算中, 当不确定矩阵维数时, 需要保证不满足交换律, 同时保持求导等运算. Maple的`Physics`包中提供了可以定义符号变量为非交换元素, 从而可用于矩阵的符号运算中去. 具体使用如下:
```javascript
with(Physics):
Setup(mathematicalnotation=true):
Set(noncommutativeprefix={U, V, X, ... }):
eq := U V - V U; # eq != 0.
```

#### 自定义模块

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

<!-- - 完全积分
在一些积分运算中或者求解微分方程时, 一些积分可以被完全积出来, 但是Maple却没有积出来. 此时需要对其进行一些处理.  -->



### 下载

{{< download url="files/example.mw" text="Maple 与 Darboux 变换" >}}

{{< download url="files/example-discrete.mw" text="离散可积方程的 Darboux 变换" >}}

{{< download url="files/Maple2020中文用户手册.pdf" text="Maple 2020 中文用户手册" >}}


