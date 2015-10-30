
iDebug 就像是一个魔术桶，把页面倒进去，可以出来任意你想要的东西。
============================

他包含以下功能：
----------
 * 抓网页：
   通过点击 Bookmarklet 把网页抓过来，或修改，或存档
 * responder：
   模拟 Fiddler 的 Responder 功能，对 HTML 内容进行替换
 * 查看所有 CSS 和 JS：
   模拟 YSlow 里包含的一个功能，对于不常开 Firefox 的 Chrome 用户来说非常有用
 * JS Beautify：
   格式化压缩后的脚本文件(不支持 Packer 解压缩)，格式化 JSON
 * HTML Beautify：
   格式化HTML

以下为淘宝特色功能：
----------
 * 还原 Combo：
    前：http://a.tbcdn.cn/??a.js,b.js
    后：http://a.tbcdn.cn/a.js, http://a.tbcdn.cn/b.js
 * 删除 assets 路径上的 -min
    前：http://a.tbcdn.cn/a-min.css
    后：http://a.tbcdn.cn/a.css
 * 切换 Hosts：
   不用修改 Hosts，直接切换 Taobao 环境的日常／预发／线上等环境

快捷键：
----------
 * Shift + A：查看所有 CSS 和 JS
 * Shift + V：查看 Demo
 * Shfit + ?：查看帮助
 * Ctrl + Enter：保存

规则示例：
----------
    a.css
    ----
    b.css
    ====
    c.js
    ----
    d.js
    e.js

说明PPT：
----------
见 docs/idebug_20101030.pdf