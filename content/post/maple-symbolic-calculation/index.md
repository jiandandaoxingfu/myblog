---
title: "Maple-符号计算"
date: 2022-01-13 07:43:08 +0800
Last_Modified:  2022-01-15 10:37:54
summary: 'Maple符号计算的快速入门教程'
tags: ["symbolic calculation", "Maple", "tutorial"]
categories: ["Maple"]
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
- 定义变量
```javascript
a := 3;  # 定义变量不是用等号， 而是用冒号等号
b := 4:  # 冒号不打印
c := 3 * 4; # 分号打印
f := a x^2 + b x + c; #  两个变量或者数字与变量的乘积可以省略乘号， 两个数字的乘积不能省略
# 这里#表示注释， 其后面的内容不会运行。 
# 对所写程序添加注释是一个良好的代码习惯。 说明方法和目的， 
# 有助于自己和别人理解
```

- 变量类型
  - 矩阵
	```javascript
	with(LinearAlgebra):  # 使用矩阵及其操作， 需要引入线性代数包
	M := Matrix( row, col ); # row * col阶矩阵
	M := Matrix( row ) ; # row阶方阵
	M[1, ..] # M的第一行(向量型)
	```
  - 列表
	```javascript
	arr :=[1, 2, 3, 4]:
	arr[3] # return 3;
	```
  - 集合
  	```javascript
	arr := { 1, 2, 3, 4 }:
  	```

  - 向量
    ```javascript
    arr := <1, 2, 3, 4>;
    ```

  - 序列
	```javascript
    arr := seq(1..3) # return 1, 2, 3
    arr := [ seq(1..3) ] # return [1, 2, 3]
    arr := seq( i^2, i=1..3 ) # return 1, 4, 9
    ```


- 判断
```javascript
if x > 0 and (or) x < 4 then
   do something;
end if;
```

- 循环
```javascript
for i from 1 to 10 do
   do something;
end do;

arr := [1, 2, 3, 4];
for i in arr do
   do something;
end do;
```

- 函数
```javascript
func := (x) -> x^2: # 箭头函数

func := proc(x)
   return x^2;
end proc:

func(4) # return 16
```


### 常用命令

- 化简/因式分解/展开/
```javascript
simplify / factor / expand
```

- 微分/积分 
```javascript
diff(f, x$k) / int(f, x)
```

- 求解方程(组)
```javascript
solve( eq = 0, x ) / solve({ eq1=b1, eq2=b2, ... }, { x1, x2, ... })
% 右端等于0可以省略
```

- 求解微分方程(组)
```javascript
dsolve( deq = 0, y ) / dsolve({ deq1=b1, deq2=b2, ... }, { y1, y2, ... })
% 右端等于0可以省略
```

- 公式拆解/获取自变量
```javascript
op( f(x) ) # return x
op( a + b c ) # return a, b c
op( a b ) # return a, b
```

- 获取未知函数(量)
```javascript
indets( a f(x) + b ) # return { a, b, x, f(x) };
indets( a f(x) + b, Function ) # return { f(x) };
```

- 变量转换
```javascript
convert( 1/3, float ) #  return 0.3333333...
convert( f(x), string ) # return "f(x)"
convert( "f(x)", symbol ) # return f(x)
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
```

- 符号连接
```javascript
cat(v, 1, 2) # return v12;
seq(cat(v, i), i=1..3) # return v1, v2, v3
seq(seq(cat(v, i, j), i=1..3), j=1..3 ) # return v11, v12, ..., v33
Transpose(convert([seq(seq(cat(v, i, j), i = 1..3), j = 1..3)], Matrix, 3)) # return (vij)_{3*3}
```




### 示例

{{< embed-pdf url="post/maple-symbolic-calculation/files/example.pdf" >}}

{{< download url="post/maple-symbolic-calculation/files/example.mw" text="下载源代码" >}}


