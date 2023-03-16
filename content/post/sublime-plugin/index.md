---
title: "Sublime-Latex"
date: 2022-11-22 11:20:38 +0800
lastmod: 2023-03-16 14:09:09 +0800
summary: '学习给 sublime 写插件'
tags: ["sublime", "plugin"]
categories: ["编程", "sublime", "python"]
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
cover:
    image: "images/logo.png"  
    alt: "\u56fe\u7247"  
    caption: "" 
    relative: false 
    hidden: true 
---
### Sublime Text
Sublime Text (ST) 是一款轻量, 颜值高的编辑器, 我平时用来写网页, python, tex代码等. 这款编辑器提供了非常多的快捷键, 比如快速选择单词, 选择多个相同的单词, 选择多行同时操作, 快速选择括号里面的内容等. 此外, ST支持支持正则表达式搜索等. 
更重要的是, 它还支持插件功能, 支持自定义脚本等等, 为编程提供了极大的便利. 比如
定义脚本
```html
<snippet>
	<content><![CDATA[
Schr\"odinger equation 
]]></content>
	<tabTrigger>sch</tabTrigger>
</snippet>
```
则在tex文件中输入`sch`并按`tab`键即可生成`Schr\"odinger equation `非常的方便.


### 用ST编写latex文件
平时打论文, Ctex和texlive提供的编辑器都很丑, 用起来也不方便. 而ST则非常方便又好看
![](images/sublime-latex.png)
想要使用ST来编辑, 编译latex代码, 需要安装LatexTools插件. 该插件提供自动补全, 编译, 还可以在编辑过程中实时预览数学公式, 极为方便.
![](images/st-latex-preview.png)



### 编写ST插件
ST提供了丰富的接口给用户, 让用户可以自定义插件, 这些插件使用python来编写.
在打tex时, 想要删除某个行内公式, 需要动用鼠标, 比较麻烦. 为此, 我们来写一个插件, 通过快捷键快速匹配这个行内公式, 按`del`即可删除.
代码如下
```python
import sublime
import sublime_plugin
import re

class MatchDollorCommand(sublime_plugin.TextCommand):
	def run(self, edit):
		idx_init = self.view.sel()[0].a
		idx_begin = self.view.find_by_class(idx_init, False, 4, "$");
		idx_end = self.view.find_by_class(idx_init, True, 8, "$");

		if idx_begin != -1 and idx_end != -1 and (idx_end - idx_begin) < 600:
			region = sublime.Region(idx_begin + 1, idx_end - 1);
			if re.search(r'(begin{(equation|align)|eqref)', self.view.substr(region)) == None:
				self.view.sel().add(region)
		
		# for i in range(1000):
		# 	if self.view.substr(idx_init - i) == "$":
		# 		idx_begin = idx_init - i
		# 		break
		# 	else:
		# 		self.view.run_command("move", {"by": "characters", "forward": False})
```
相关的函数可以在ST的[官方文档](https://www.sublimetext.com/docs/api_reference.html)中查看.
需要注意的是, 函数名要首字母大写(多个单词首字母大写), 且后面必须加Command. 
随后在快捷键定义中使用(多个单词以下划线连接, 首字母小写)
```javascript
"keys": ["alt+d"], "command": "match_dollor"
```
类似地, 可以定义快速选择引号里面内容的函数
```python
import sublime
import sublime_plugin

class MatchQuotationMarkCommand(sublime_plugin.TextCommand):
	def run(self, edit):
		idx_init = self.view.sel()[0].a
		idx_begin1 = self.view.find_by_class(idx_init, False, 4, '"')
		idx_begin2 = self.view.find_by_class(idx_init, False, 4, "'")
		if idx_begin1 > idx_begin2:
			idx_begin = idx_begin1
			idx_end = self.view.find_by_class(idx_init, True, 8, '"')
		else:
			idx_begin = idx_begin2
			idx_end = self.view.find_by_class(idx_init, True, 8, "'")

			
		if idx_begin != -1 and idx_end != -1 and (idx_end - idx_begin) < 200:
			region = sublime.Region(idx_begin + 1, idx_end - 1)
			self.view.sel().add(region)		
```
随后在快捷键定义中使用
```javascript
"keys": ["ctrl+'"], "command": "match_quotation_mark"
```

由 ChatGPT 写的更好, 支持多选
```python
import sublime
import sublime_plugin
import re

class MatchQuotationMarkCommand(sublime_plugin.TextCommand):
    def run(self, edit):
        selections = self.view.sel()
        new_selections = []
        for sel in selections:
            # 获取光标所在位置
            pos = sel.begin()
            # 获取包含光标所在位置的引号
            quote_regions = self.view.find_by_selector('string.quoted')
            for region in quote_regions:
                if region.contains(pos):
                    # 获取引号的内容并创建新的选区
                    quote_char = self.view.substr(region)
                    string_region = self.view.extract_scope(region.begin() + 1)
                    string_region = sublime.Region(string_region.begin() + 1, string_region.end() - 1)
                    new_selections.append(string_region)
                    break
        # 更新选区
        selections.clear()
        for sel in new_selections:
            selections.add(sel)
```