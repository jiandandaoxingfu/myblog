---
title: "Maple自动推导方程族"
date: 2022-01-11 19:48:46 +0800
Last\_Modified:  2022-01-11 19:52:40
summary: '对于给定的谱问题U， 利用Maple自动导出方程族相应的V'
tags: ["Maple", "Lax pairs", "spectral problem"]
categories: ["Maple", "integrable system"]
author: "JMx"
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: false
disableHLJS: true 
disableShare: true
hideSummary: false
searchHidden: false
ShowReadingTime: false
ShowBreadCrumbs: false
ShowPostNavLinks: true
cover:
    image: ""  
    alt: "\u56fe\u7247"  
    caption: "" 
    relative: false 
    hidden: true 
---


{{< katex >}}


	
这里我们记录一下使用Maple自动推导离散谱问题的时间部分的$V$的形式。

我们以$4$阶谱问题为例。 给定空间谱问题$U(n, \lambda)=(U\_{ij})\_{4\times 4}$ (这里我们限定$U$中的同一位势不重复出现)，我们设$V(n, \lambda)=(V\_{ij})\_{4\times 4}$，则静态零曲率方程
\begin{equation}
	S=V^+U - UV = 0
\end{equation}
是包含$16$个未知量的线性方程。 

我们的目的是构造恰当的$V$的形式，使得静态零曲率方程满足下面两个条件：
- (C1): 如果$ \dfrac{\partial U\_{ij}}{\partial n}\neq 0$，则$S\_{ij}$形如$A+\lambda^k B=0$，其中$A，B$与谱参数$ \lambda$无关，且$U\_{ij}$中位势的系数为$\lambda$的$0$次或者$k$次幂。

- (C2): 如果$ \dfrac{\partial U\_{ij}}{\partial n}= 0$，则$S\_{ij}$形如$\lambda^k A=0$，其中$A$与谱参数$\lambda$无关。

接下来我们给出Maple实现的思想和步骤。 记$ \dfrac{\partial U\_{ij}}{\partial n}= 0$所对应的$S$的子集为$S\_0$。 我们分为两个步骤： 

- 第一步: 减少未知量的个数。 对于$eq\in S\_0$， 如果某个变量可以用其它变量表示出来，则将$S$中所有该变量替换。 此时，方程数和未知量个数都减少一个。 重复该操作，直到不存在某个变量可以用其它变量表示。 此时$S\_0$剩余的式子仍记为$S\_0$。

- 第二步: 平衡$\lambda$。 对于$eq\in S\_0$， 如果$\lambda$的最大最小次幂不等， 则为了满足(C2)，我们将最低次幂的系数中的未知量替换为$\lambda^k$乘以这些未知量， 使得该式达到平衡。 因此我们需要找到这些未知量，然后对$S$整体进行替换。 重复上述操作。


对于不能满足(C2)或者满足(C2)但不满足(C1)的问题，我们无法给出$V$的形式。

下面我们对程序中的函数做一些说明。

- `size:` 返回向量，集合或者列表的元素个数。

- `format-szce`: 消去(C2)中的$\lambda^k$。

- `cancel-var`: 返回某个未知量用其它未知量表示的表达式。

- `reduce-szce`: 将上面的结果代入$S$，减少方程个数。

- `find-V`: 返回需要乘以$\lambda^k$的未知量。

- `balance-lambda`: 将上面结果代入$S$， 平衡$\lambda$。

- `check`: 检查$S$是否满足(C1)和(C2)。


基于此， 我们也可以随机生成$U$，看是否可以找到满足(C1)和(C2)的$V$。 我们也用程序实现了这一想法， 这里我们不再描述。 这一方法很容易推广到连续谱问题，这里也不在给出。

我们将程序放在[Github代码库](https://github.com/jiandandaoxingfu/derive-hierarchy-V)， 这里不在附上。
