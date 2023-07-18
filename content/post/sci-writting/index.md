---
title: "论文写作与科研工具"
date: 2022-01-08 13:20:52.872 +0800
lastmod: 2023-07-18 13:04:07 +0800
summary: '科研中一些常用的网站'
tags: ["sci", "论文写作", "资源网站"]
categories: ["科研"]
author: "JMx"
showToc: true
TocOpen: true
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
---

{{< katex >}}

收集一些科研和论文写作中常用的网站.


---

## 论文跟踪
> 数学中一些较好的期刊(部分): 
[Ann. Math.](),&nbsp;
[Math. Ann.](),&nbsp;
[Bull. Amer. Math. Soc.](),&nbsp;
[Mem. Amer. Math. Soc.](),&nbsp;
[Trans. Amer. Math. Soc.](),&nbsp;
[Phys. Rev. Lett.](),&nbsp;
[Proc. Amer. Math. Soc.](),&nbsp;
[Comm. Pure Math. Phys.](https://onlinelibrary.wiley.com/journal/10970312),&nbsp;
[Comm. Math. Phys.](https://www.springer.com/journal/220),&nbsp;
[Adv. Math.](https://www.sciencedirect.com/journal/advances-in-mathematics),&nbsp;
[Int. Math. Reseach. Notices.](https://academic.oup.com/imrn),&nbsp;
[Ann. Inst. H. Poincaré Anal. Non Linéaire](https://www.sciencedirect.com/journal/annales-de-linstitut-henri-poincare-c-analyse-non-lineaire),&nbsp;
[Ann. Henri Poincare](https://www.springer.com/journal/23),&nbsp;
[Inverse Problems](https://iopscience.iop.org/journal/0266-5611),&nbsp;
[Stud. Appl. Math.](https://onlinelibrary.wiley.com/journal/14679590),&nbsp;
[Nonlinearity](https://iopscience.iop.org/journal/0951-7715),&nbsp;
[SIAM: J. Math. Appl](https://www.siam.org/publications/journals/siam-journal-on-mathematical-analysis-sima),&nbsp;
[Phys. D](https://www.sciencedirect.com/journal/physica-d-nonlinear-phenomena),&nbsp;
[Chaos, Solitons & Fractals](https://www.sciencedirect.com/journal/chaos-solitons-and-fractals),&nbsp;
[J. Nonlinear Sci.](https://www.springer.com/journal/332),&nbsp;
[J. Math. Phys.](https://aip.scitation.org/journal/jmp),&nbsp;
[J. Phys. Soc. Japan](https://journals.jps.jp/journal/jpsj),&nbsp;
[J. Differential Equation](https://www.sciencedirect.com/journal/journal-of-differential-equations),&nbsp;
[J. Phys. A](https://iopscience.iop.org/journal/1751-8121),&nbsp;
[Phys. Lett. A](https://www.sciencedirect.com/journal/physics-letters-a),&nbsp;
[Lett. Math. Phys.](https://www.springer.com/journal/11005),&nbsp;


除了在各大论文出版网站看最新出版的论文, 还有以下两个途径.

### ResearchGate
[ResearchGate](https://www.researchgate.net/) 网站可以看做是学术微博. 首先在上面注册一个账号, 然后完善个人信息, 例如单位信息, 研究方向等. 之后它会推荐同一个单位的用户, 以及根据我们的研究领域来推荐该领域内的人.
然后我们就会看到关注的人的学术动态, 比如发表/添加/推荐/等一篇论文. 我们可以通过该平台下载文章, 也可以与关注的人进行交流.


### arxiv (预印本网站)
[arxiv](https://arxiv.org) 网站供大家把自己未发表或者已投稿的论文放在上面. 一方面可以告诉别人这个东西自己已经做了, 另一方面也可以在正式发表之前让别人看到, 已提供交流建议. 除此之外, 它还有以下几个用途.

- 查看别人论文的tex文件. 一般而言, arxiv中的论文除了提供PDF版本, 还会提供tex源文件(根据arxiv号打开页面, 选择 ```other format```, 然后点击 ```Download sources```, 最后给下载的文件后缀加上```.tex``` 即可. 当然如果带有图片, 则此文件为压缩文件, 后缀应该加上```.zip```, 然后解压). 


- 可以看到自己感兴趣领域的最新进展. 因为论文正式发表往往需要数月, 而在arxiv上可以让及时看到别人的进展. arxiv 提供了免费订阅服务, 我们可以通过邮件来订阅自己感兴趣的领域, 之后它会在每个工作日把最新的论文通过邮件推送给我们. 

以可积系统为例, 发送如下邮件即可订阅本方向的每日更新论文.
```
To: physics@arxiv.org
主题: subscribe JMx
内容: add Exactly Solvable and Integrable Systems
```




---

## 论文撰写格式规范

### 省略号
latex中有三个常用的水平省略号命令, 分别是 `\cdots`, `\ldots` 和 `\dots`, 其中前两个分别是(竖直)居中和底部, 后一个会自适应, 即根据所在环境自动调整居中或底部, 大多数情况下都能够很好的自适应, 部分环境需要使用前两个来弥补. 通常来说, 数学运算, 如等号, 加法, 乘法, 并, 交需要使用居中省略号, 而列举则使用底部省略号, 如下所示
```latex
1, 2, \dots, N, 
a = b = \dots = f = 0, 
T_1T_2 \dots T_N,  % error
T_1T_2 \cdots T_N, 
T_1 + T_2 + \dots + T_N, 
a_n \lambda^n + a_{n-1}\lambda^{n-1} + \dots, % error
a_n \lambda^n + a_{n-1}\lambda^{n-1} + \cdots, 
S_1 \cup S_2 \cup\dots\cup S_n, 
```
\begin{array}{l}
	1, 2, \dots, N, \\\\
	a = b = \dots = f = 0, \\\\
	T_1T_2 \dots T_N, \\\\
	T_1T_2 \cdots T_N, \\\\
	T_1 + T_2 + \dots + T_N, \\\\
	a_n \lambda^n + a_{n-1}\lambda^{n-1} + \dots, \\\\
	a_n \lambda^n + a_{n-1}\lambda^{n-1} + \cdots, \\\\
	S_1 \cup S_2 \cup\dots\cup S_n.
\end{array}
可以看出 `\dots` 具有很强的适应性, 它根据左右两侧的运算符来进行自适应. 如果缺少, 则可能会判断错误.

### 学位论文
- 论文中的章节安排是接下来要做的工作, 不能使用过去时, 比如 _得到了..._, _给出了..._, 应该把 _了_ 去掉.

- 本文应该翻译为 _in this thesis_, 而不是 _in this paper_.

- _我们_ 不要用的过于频繁.

- 正确运用标点符号, 该断句就断句.




--- 

## 拼写检查
### grammarly
[grammarly](https://app.grammarly.com/) 可以帮助我们检查论文中的拼写, 单复数, 用词不当等明显错误. 它提供在线版和桌面版两种方式, 都需要注册账号. 我们只需要使用免费版即可. 

当然, 由于未发表论文的隐私性, 我们在使用grammarly之前, 应该将论文里面的标题, 公式, 参考文献, 基金号等删除. 这可以借助在线工具 [maple-latex](https://jiandandaoxingfu.github.io/maple-latex/) 的 grammarly 功能来实现. 这个在线工具只在本地运行, 不会将内容上传到网络.

### DeepL Translator && DeepL Writer
人工智能[翻译](https://www.deepl.com/translator)和[写作](https://www.deepl.com/write).

### netspeak && linggle
[netspeak](https://netspeak.org/) 和 [linggle](https://linggle.com/) 两个网站提供写作建议. 当写论文时, 有一些句子我们只知道一部分, 不知道接下来怎么说合适, 就可以用这两个网站. 他们可以根据输入, 提供大量的例句.

### ChatGPT
ChatGPT 是 OpenAI 实验室在2022年年底放出来的人工智能对话机器人, 非常的强大, 可以用来翻译, 写作, 写代码. 
比如让它帮忙找tex编译错误, tex, maple编程等.
ChatGPT 完全颠覆了人们以往对各种语音助手的认知.
官方入口[chatgpt](https://chat.openai.com/chat)需要翻墙, 不容易使用.
目前OpenAI开放了API接口, 然后有一些个人利用这些接口二次开发, 使得它能够支持国内访问, 如[freechatgpt](https://freechatgpt.chat/), [AI EDU](https://chat.forchange.cn/).

---

## 常用数据库

### 论文检索
[Web of Science](https://www.webofscience.com/wos/alldb/basic-search) 几乎覆盖所有数学领域的 SCI 论文信息且都提供强大的检索功能, 能够根据关键词等信息搜索相关的论文.

[Math Review](https://mathscinet.ams.org/mathscinet/index.html): 美国数学评论, 会给每一个作者分配一个id, 记录几乎全部SCI论文信息. 写作论文参考文献的时候, 一般采用 Math Review 提供的作者, 期刊等信息. 可以查作者之间的联系等, 因为只包含数学方向论文呢, 因此比Web of Science更专业.

### 期刊分区/国自然基金查询
[letpub](http://www.letpub.com.cn/index.php?page=journalapp) 和 [中科院分区表](https://www.fenqubiao.com)查询期刊中科院分区.

[国自然](http://www.letpub.com.cn/index.php?page=grant): 查询国自然等信息.


---

## 资源网站 && 下载论文

### Sci-hub && Library Genesis

[Sci-hub1](https://www.sci-hub.ren/), [Sci-hub2](https://www.sci-hub.ee/), [Sci-hub3](https://www.sci-hub.wf/): 全球科研人员都在用的论文下载网站, 可以根据doi号下载论文(目前2022年论文大部分没有).

[Library Genesis](https://libgen.li/): 此网站可以下载绝大部分论文和书籍(英文, 似乎需要翻墙, 或者使用下面iGG插件会员).

[ProQuest](https://www.proquest.com/), [国外学位论文中国集团全文检索平台](https://www.pqdtcn.com/): 
国外博士论文查询, 不过这两个似乎都不支持下载全文, 只能预览一部分.



---

## 工欲善其事必先利其器

### 谷歌学术 && iGG谷歌学术助手
谷歌学术完全吊打百度学术, 但想要使用, 一般需要找镜像网站. 最简单的方法是安装一个插件, 比较好用的是[iGG谷歌学术助手](https://iguge.xyz/), 可以在[Edge浏览器插件中心](https://microsoftedge.microsoft.com/addons/detail/igg%E8%B0%B7%E6%AD%8C%E5%AD%A6%E6%9C%AF%E5%8A%A9%E6%89%8B/mchibleoefileemjfghfejaggonplmmg)下载使用. 

### Texlive + Sublime Text/Visual Studio Code
不管是Texlive还是Ctex都是编译tex文件的编辑器, 但是两者都很笨重而且不好用. 现在有很多优秀轻量的编辑器都支持调用Texlive或者Ctex来编译tex文件. 他们不仅提供了很多快捷键, 而且还支持非常丰富的插件, 比如tex代码自动补全, 自定义脚本, 数学公式预览等等. 因此选用这些编辑器, 如Sublime Text或Visual Studio Code是非常明智的选择.

### Djvu文件转PDF
下载部分书籍时, 可能会遇到Djvu文件, 可以用SumatraPDF查看. 下面的软件可以将Djvu文件转为PDF
{{< download url="files/DjVuToy转换工具.rar" text="DjvuToy下载" >}}

### caj文件转PDF
知网很多论文只提供caj格式, 需要单独下载caj阅读器, 就很烦人. 有两个办法解决这个问题. 一个是访问知网海外版, 上面提供PDF格式, 且海外版用起来和国内的没太大区别.
另外一个办法是利用在[线转换工具](https://caj2pdf.cn/)将下载的caj文件转为PDF格式.

### 学术问答网站
数学方面比较全面的问答网站为[MathOverflow](https://mathoverflow.net/) 和 [Math Stack Exchange](https://math.stackexchange.com/). 前者主要是研究型问题, 上面有来自世界各地的学者, 包括很多大学的教授; 后者是基础性问题, 涉及大学知识, 大学生居多. 当然两者是互通的.
科研或者学习中遇到不明白的一些问题和计算等, 都可以在上面提问, 上面的人都很喜欢分享.
> 问答网站方面国外做的很强, 各种编程, 学术都有专门的网站, 而国内太缺乏这方面的东西了. 百度搜索就是垃圾. 

### 公式识别神器
[Mathpix Tool](https://mathpix.com/desktop-downloads) 是一款通过截图, 将其中的数学公式转化为latex代码的神器, 准确度非常高, 十分方便. 
另外还可以结合在线工具 [maple-latex](https://jiandandaoxingfu.github.io/maple-latex/) 中的 latex2maple 和 maple2mma 功能将其 Mathpix Tool 生成的 latex 代码转化为 Maple 或者 Mathematica 程序. 




---

## 资料
论文写作需要积累一些常用的句子, 表述等. 这可以通过每天读一些本领域大佬的论文, 或者是 arxiv 上的论文来积累. 读的时候可以不理解内容, 只需要把一些好的句子摘抄下来, 进行分类. 
以下是一些笔记.

- [个人笔记](files/notes-of-writing.pdf)

- [Xiaohong Guan(Tsinghua Univ.)](files/write-English.pdf)

- [The Most Common Habits from more than 200 English Papers written by Graduate Chinese Engineering Students (By Felicia Brittman)](files/The-Most-Common-Habits-from-more-than-200-English-Papers-written.pdf)

- [参考文献排列顺序](files/硕士论文格式.pdf)
