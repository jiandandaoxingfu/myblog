---
title: "一些常用的代码片段"
date: 2022-01-21 18:34:49 +0800
lastmod: 2025-03-16 12:20:34 +0800
summary: '学习生活中用到的一些代码片段， 多是正则表示式。'
tags: ["regrep", "snippets", "latex"]
categories: ["科研"]
author: "JMx"
showToc: true
TocOpen: true
draft: true
hidemeta: false
comments: false
disableHLJS: true 
disableShare: true
hideSummary: false
searchHidden: false
ShowReadingTime: true
ShowBreadCrumbs: false
ShowPostNavLinks: true
---

这里主要是记录一些平时用到的一些代码片段， 不定时更新。

## Javascript

### 统计数组中每个元素出现的次数
```javascript
const array = [1, 2, 3, 1, 2, 1];
const count = {};

array.forEach(item => {
  if (count[item]) {
    count[item]++;
  } else {
    count[item] = 1;
  }
});

console.log(count);
// 输出: {1: 3, ... }
```

### 集合运算
```javascript
function intersection(setA, setB) {
    return new Set([...setA].filter(x => setB.has(x)));
}

function union(setA, setB) {
    return new Set([...setA, ...setB]);
}

function difference(setA, setB) {
    return new Set([...setA].filter(x => !setB.has(x)));
}
```

### 问卷星-生成随机数据
```javascript
// 获取问卷星数据
const qaq_containers = [...document.getElementById('divQuestion').querySelectorAll('.ui-field-contain')];
let qaqs = qaq_containers.map(qc => {
    // console.log(qc.querySelector('.field-label').innerText);
    // console.log( (qc.querySelector('.ui-controlgroup') || qc.querySelector('.ui-input-text') ).innerText);
    let q = qc.querySelector('.field-label').innerText;
    let a_container = qc.querySelector('.ui-controlgroup') || qc.querySelector('.ui-input-text');
    let a = a_container.innerText.replace(/([ABCDEF]\.?|[ABCDEF] ?)/g, '').split('\n');
    return [q, a];
})

// 初始化每个题目的答案概率(每个答案取相等概率), 对于特定的题目, 自行设定概率. 
let weights = qaqs.map(qaq => qaq[1].map(a => 1/qaq[1].length) );
weights[2] = [0.3, 0.3, 0.35, 0.05];
weights[9] = [0.8, 0.1, 0.1];
weights[19] = [0.8, 0.1, 0.1];
weights[22] = [0.7, 0.1, 0.1, 0.1];
weights[24] = [0.1, 0.8, 0.1];

// 根据概率生成数据
const N = 1500;
const num_qaqs = qaqs.length;
let total_data = new Array(N);
for(j=0; j<N; j++) {
    let data = new Array(num_qaqs);
    for(i=0; i<num_qaqs; i++) {
        let r = Math.random();
        let w = 0;
        for(k=0; k<weights[i].length; k++) {
            w += weights[i][k];
            if(r < w) {
                data[i] = qaqs[i][1][k];
                break;
            }
        }
        total_data[j] = data;
    }    
}

// 生成每个题目的答案的统计数据
let count_arr = new Array(num_qaqs);
for(s=0; s<num_qaqs; s++) {
    let array = total_data.map(data => data[s]);
    let count = {};

    array.forEach(item => {
        if (count[item]) {
            count[item]++;
        } else {
            count[item] = 1;
        }
    });

    count_arr[s] = count;
    // console.log(s+1);
    // console.log(count);
    
}

// 保存数据到txt文件(复制txt文件内容到excel即可生成)
const str_data = total_data.map(data => data.reduce((i, j) => i + '	' + j)).reduce((i, j) => i + '\n' + j);
function download(filename, text) {
  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
 
download("data.txt", str_data);
```



### 处理参考文献

> 良好的习惯是保持每条参考文献都是如下格式(下面我们的操作都以此为基础)
> ```javascript
> \bibitem{name}
> authors.
> title.
> journal ...
> ```
> 即每个参考文献按索引名， 作者， 标题， 刊信息分为四行，同时要求两个参考文献之间空一行。 这样做的好处在于方便统一修改。 



#### 处理人名
不同期刊, 参考文献人名格式也不尽相同, 每次修改总是很麻烦(这里指使用```\bibitem```环境). 
主流期刊的人名格式([]表示可能有空格)以及他们对应的正则匹配
```javascript
M.[]X. Jia, M.[]X. Jia     <=======>     /([A-Z]\. ?)+ ([a-z]+ )?[A-Z][^\s,]+/g
Jia, M.[]X., Jia, M.[]X.   <=======>     /([a-z]+ )?[A-Z][^\s,]+, ([A-Z]\. ?)+/g
Jia M X, Jia M X           <=======>     /([a-z]+ )?[A-Z][^\s,]+ ([A-Z]\. ?)+/g
```
首先我们对参考文献进行处理, 得到文献作者列表
```javascript
var bib = document.getElementById('input').value.split(/\n/).filter( a => a.match('[a-z]') );
var authors = [];
for(let i=1; i<bib.length; i=i+4) authors.push( bib[i].replace(/and /, ', ') );
```
然后根据不同的作者格式来匹配, 正常情况下, 匹配完成后, 只会剩下标点符号, 否则匹配失败.
```javascript
// 3 ---> 2;
const regreps = [
	'',
	'([A-Z]\\. ?)+ (([a-z]+ )?[A-Z][^\\s,]+)',
	'(([a-z]+ )?[A-Z][^\\s,]+), ([A-Z]\\. ?)+',
	'(([a-z]+ )?[A-Z][^\\s,]+) ([A-Z] ?)+',
];
const index_old = 3, 
	  index_new = 2,
      regrep_old = new RegExp( regreps[index_old] ),
	  regrep_new = new RegExp( regreps[index_new] ),
	  regrep_old_g = new RegExp( regreps[index_old], 'g');

var authors_match = authors.map( a => a.match( regrep_old_g ) )
var remaining = authors.map( a => {
	let match = a.match( regrep_old_g );
	match.forEach( m => a = a.replace(m, '') );
	return a.match(/[A-Za-z]/);
})
for( let i=0; i<authors.length; i++) {
	if( remaining[i] === null ) {
		authors_match[i].map( a => a.match(regrep_old) )
	}
}

```


#### 按照引用顺序排列参考文献
整理论文的参考文献时，没有使用bib文件， 想要按照引用的顺序来重新排列已经弄好的参考文献。 这里我们使用 **Sublime-text 3** 编辑器。 首先匹配tex文件中引用的文献索引名
```javascript
\\cite{.*?}
```
然后对其处理， 得到全部文献索引名构成的字符串数组(这里要求文献索引名由数字，字母，下划线，短横杠组成)
```javascript
cites_ = `
\cite{...}
...
\cite{...}
`.replaceAll("cite", "").match(/[\w-]+/g)  // [ "ref1", "ref2", ... ]
```
我们还要去除里面重复的。 对于多次引用的， 只需要保留第一个
```javascript
cites = [];
for (let cite of cites_) {
	if (cites.indexOf(cite) < 0) {
		cites.push(cite);		
	}
}
```
接下来处理参考文献。 这里我们将参考文献复制到Maple-Latex中， 然后利用javascript对其处理并重新排列
```javascript
refs_ = $$('#input')[0].value.split(/\\bibitem/g).slice(1);

// 按索引名生成字典
refs = {};
for (let ref of refs_) {
	let abbr = ref.match(/^{(.*?)}/)[1]
	refs[abbr] = "\\bibitem" + ref;
};
// 根据引用索引名顺序排列参考文献
refs_ = '';
for (let cite of cites) {
	refs_ += refs[cite] + '\n';
}

$$('#input')[0].value = refs_.replaceAll('\n\n', '\n');
```
这样就可以了。



#### 按照姓氏字母排列参考文献
同样地， 我们可以对参考文献按照姓氏字母排列。 这只需对参考文献操作即可(这里参考文献最好能够符合4行格式)。 使用javascript对其处理
```javascript
// 拆分参考文献并获取作者列表
refs_ = $$("#input")[0].value.split(/\\bibitem/).slice(1).map( r => "\\bibitem" + r );
authors_ = refs_.map( r => r.match(/} *\n(.*?)\n/)[1] )
		   		.map( a => a.split(/(,| and)/)
		   			.filter( a => (a !== ",") && (a !== " and") && (a.replace(/ +/, '') !== "") ) 
		    	);
```
这样处理以后， 会根据文献格式得到不同的结果
```
"姓, 名, 姓, 名"  => ["姓", "名", "姓", "名"]
"名, 姓, 名, 姓"  => ["名", "姓", "名", "姓"]
"姓 名, 姓 名"  => ["姓 名", "姓 名"]
"名 姓, 名 姓"  => ["名 姓", "名 姓"]
```
因为排序只比较姓氏，因此，我们只需获取每个参考文献的姓氏，然后重排即可。 首先姓氏相加(针对上述四种情况)
```javascript
authors = authors_.map( a => a.filter((e, i) => i%2 === 0 ).reduce((i, j) => i + j).replaceAll(' ', '') ) // case 1
authors = authors_.map( a => a.filter((e, i) => i%2 === 1 ).reduce((i, j) => i + j).replaceAll(' ', '') ) // case 2
authors = authors_.map( a => a.map( a => a.match(/([a-z]{2,} )?[A-Z][a-zA-Z]+/)[0] ) ).map( a => a.reduce( (i, j) => i+j) ) // case 3/4
```
然后
```javascript
refs = {};
// 首先生成字典， 作者重复的， 加索引加以区分
for (i=0; i<refs_.length; i++) {
	if ( authors.slice(0, i).indexOf( authors[i] ) > -1 ) {
		authors[i] += i;
	}
	refs[ authors[i] ] = refs_[i];
}
// 重排， 然后根据作者顺序排列参考文献
authors = authors.sort();
refs_ = '';
for (let author of authors) {
	refs_ += refs[author] + '\n';
}

$$('#input')[0].value = refs_.replaceAll('\n\n', '\n');
```








