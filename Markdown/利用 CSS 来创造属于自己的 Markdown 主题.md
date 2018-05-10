# 利用 CSS 来创造属于自己的 Markdown 主题

`Markdown` `CSS`

-------------------
> - 在我们使用 Markdown 编辑器时，可以使用编辑 CSS 文件来自定义 Markdown 文章的样式，CSS 其实不难用，各种编辑器对于 CSS 支持加上现成的模板，让不懂 CSS 语法的人也可以使用它们，把自己的文章样式变得更有个性。
> - 这篇文章中的用法虽然基础，但是可以很快获得预期的主题效果，希望你激起你对 CSS 的兴趣。以下是相关的CSS 模板:
## MWeb 主题
``` css
html,body{ font-family: "SF UI Display", ".PingFang SC","PingFang SC", "Neue Haas Grotesk Text Pro", "Arial Nova", "Segoe UI", "Microsoft YaHei", "Microsoft JhengHei", "Helvetica Neue", "Source Han Sans SC", "Noto Sans CJK SC", "Source Han Sans CN", "Noto Sans SC", "Source Han Sans TC", "Noto Sans CJK TC", "Hiragino Sans GB", sans-serif;
  font-size: 16px;
  color:#222;
  -webkit-text-size-adjust:none;  min-width: 200px;
  max-width: 760px;
  margin: 0 auto; padding: 1rem;
  line-height: 1.5rem;

}
h1,h2,h3,h4,h5,h6{font-family: "PT Sans","SF UI Display", ".PingFang SC","PingFang SC", "Neue Haas Grotesk Text Pro", "Arial Nova", "Segoe UI", "Microsoft YaHei", "Microsoft JhengHei", "Helvetica Neue", "Source Han Sans SC", "Noto Sans CJK SC", "Source Han Sans CN", "Noto Sans SC", "Source Han Sans TC", "Noto Sans CJK TC", "Hiragino Sans GB", sans-serif;
text-rendering:optimizelegibility;margin-bottom:1em;font-weight:bold; line-height: 1.8rem;

}
h1,h2{position:relative;padding-top:1rem;padding-bottom:0.2rem;margin-bottom:1rem;background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAABCAYAAACsXeyTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAFUlEQVQIHWNIS0sr/v//PwMMDzY+ADqMahlW4J91AAAAAElFTkSuQmCC') bottom left repeat-x;}
h2{padding-top:0.8rem;padding-bottom:0.2rem;}
h1{ font-size: 1.6rem;}
h2{ font-size: 1.4rem;}
h3{ font-size: 1.2rem;}
h4{ font-size: 1.1rem;}
h5{ font-size: 1.0rem;}
h6{ font-size: 0.9rem;}

table{border-collapse:collapse;border-spacing:0;
  margin-top: 0.8rem;
  margin-bottom: 1.4rem;
}
tr{  background-color: #fff;
  border-top: 1px solid #ccc;}
th,td{padding: 5px 14px;
  border: 1px solid #ddd;}

blockquote{font-style:italic;font-size:1.1em;line-height:1.5em;padding-left:1em; border-left:4px solid #D5D5D5;    margin-left: 0;
    margin-right: 0;
    margin-bottom: 1.5rem; }

a{color:#1863a1}

pre,code,p code,li code{font-family:Menlo,Monaco,"Andale Mono","lucida console","Courier New",monospace}

pre{-webkit-border-radius:0.4em;-moz-border-radius:0.4em;-ms-border-radius:0.4em;-o-border-radius:0.4em;border-radius:0.4em;border:1px solid #e7dec3;line-height:1.45em;font-size:0.9rem;margin-bottom:2.1em;padding:.8em 1em;color:#586e75;overflow:auto; background-color:#fdf6e3;}

p code,li code{display:inline-block;white-space:no-wrap;background:#fff;font-size:0.9rem;line-height:1.5em;color:#555;border:1px solid #ddd;-webkit-border-radius:0.4em;-moz-border-radius:0.4em;-ms-border-radius:0.4em;-o-border-radius:0.4em;border-radius:0.4em;padding:0 .3em;margin:-1px 4px;}
p pre code,li pre code{font-size:1em !important;background:none;border:none}

img{max-width:100%;-webkit-border-radius:0.3em;-moz-border-radius:0.3em;-ms-border-radius:0.3em;-o-border-radius:0.3em;border-radius:0.3em;-webkit-box-shadow:rgba(0,0,0,0.15) 0 1px 4px;-moz-box-shadow:rgba(0,0,0,0.15) 0 1px 4px;box-shadow:rgba(0,0,0,0.15) 0 1px 4px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;border:#fff 0.5em solid}


hr {
  height: 0;
  margin: 15px 0;
  overflow: hidden;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #ddd;
}


/*

Orginal Style from ethanschoonover.com/solarized (c) Jeremy Hull <sourdrums@gmail.com>

*/

.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  background: #fdf6e3;
  color: #657b83;
  -webkit-text-size-adjust: none;
}

.hljs-comment,
.diff .hljs-header,
.hljs-doctype,
.hljs-pi,
.lisp .hljs-string {
  color: #93a1a1;
}

/* Solarized Green */
.hljs-keyword,
.hljs-winutils,
.method,
.hljs-addition,
.css .hljs-tag,
.hljs-request,
.hljs-status,
.nginx .hljs-title {
  color: #859900;
}

/* Solarized Cyan */
.hljs-number,
.hljs-command,
.hljs-string,
.hljs-tag .hljs-value,
.hljs-rule .hljs-value,
.hljs-doctag,
.tex .hljs-formula,
.hljs-regexp,
.hljs-hexcolor,
.hljs-link_url {
  color: #2aa198;
}

/* Solarized Blue */
.hljs-title,
.hljs-localvars,
.hljs-chunk,
.hljs-decorator,
.hljs-built_in,
.hljs-identifier,
.vhdl .hljs-literal,
.hljs-id,
.css .hljs-function,
.hljs-name {
  color: #268bd2;
}

/* Solarized Yellow */
.hljs-attribute,
.hljs-variable,
.lisp .hljs-body,
.smalltalk .hljs-number,
.hljs-constant,
.hljs-class .hljs-title,
.hljs-parent,
.hljs-type,
.hljs-link_reference {
  color: #b58900;
}

/* Solarized Orange */
.hljs-preprocessor,
.hljs-preprocessor .hljs-keyword,
.hljs-pragma,
.hljs-shebang,
.hljs-symbol,
.hljs-symbol .hljs-string,
.diff .hljs-change,
.hljs-special,
.hljs-attr_selector,
.hljs-subst,
.hljs-cdata,
.css .hljs-pseudo,
.hljs-header {
  color: #cb4b16;
}

/* Solarized Red */
.hljs-deletion,
.hljs-important {
  color: #dc322f;
}

/* Solarized Violet */
.hljs-link_label {
  color: #6c71c4;
}

.tex .hljs-formula {
  background: #eee8d5;
}
```

## 少数派
```
body {
  font-size: 15px;
  color: #333;
  background: #fff;
  font-family: Helvetica, Arial, "PingFang SC", "Microsoft YaHei", "WenQuanYi Micro Hei", "tohoma,sans-serif";
  margin: 0;
  padding: 10%;
}

h1 {
  font-size: 2.2em;
  font-weight: 700;
  line-height: 1.1;
  padding-top: 16px;
  margin-bottom: 4px;
}

h2,
h3,
h4,
h5,
h6 {
  line-height: 1.5em;
  margin-top: 2.2em;
  margin-bottom: 4px;
}

h2 {
  font-size: 1.4em;
  margin: 40px 10px 20px 0;
  padding-left: 9px;
  border-left: 6px solid #ff7e79;
  font-weight: 700;
  line-height: 1.4;
}

h3 {
  font-weight: 700;
  font-size: 1.2em;
  line-height: 1.4;
  margin: 10px 0 5px;
  padding-top: 10px;
}

h4 {
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.1em;
  line-height: 1.4;
  margin: 10px 0 5px;
  padding-top: 10px
}

h5,
h6 {
  font-size: .9em;
}

h5 {
  font-weight: bold;
  text-transform: uppercase;
}

h6 {
  font-weight: normal;
  color: #AAA;
}

img {
  width: 100%;
  border-radius: 5px;
  display: block;
  margin-bottom: 15px;
  height: auto;
}

dl,
ol,
ul {
  margin-top: 12px;
  margin-bottom: 20px;
  padding-left: 5%;
  line-height: 1.8;
}

p {
  margin: 0 0 20px;
  padding: 0;
  line-height: 1.8;
}

a {
  color: #f22f27;
  text-decoration: none;
}

a:hover {
  color: #f55852;
  text-decoration: underline;
}

a:focus {
  outline-offset: -2px;
}

blockquote {
  font-size: 1em;
  font-style: normal;
  padding: 30px 38px;
  margin: 0 0 15px;
  position: relative;
  line-height: 1.8;
  text-indent: 0;
  border: none;
  color: #888;
}

blockquote:before {
  content: "";
  left: 12px;
  top: 0;
  color: #E0E0E0;
  font-size: 4em;
  font-family: Arial, serif;
  line-height: 1em;
  font-weight: 700;
  position: absolute;
}

blockquote:after {
  content: "";
  right: 12px;
  bottom: -26px;
  color: #E0E0E0;
  font-size: 4em;
  font-family: Arial, serif;
  line-height: 1em;
  font-weight: 700;
  position: absolute;
  bottom: -31px;
}

strong,
dfn {
  font-weight: 700;
}

em,
dfn {
  font-style: italic;
  font-weight: 400;
}

del {
  text-decoration: line-through;
}

/*code {font-size:90%;}*/

/*pre {text-align:left; overflow-x: scroll; color: #257fa0; background: #f6f6f6; padding: 10pt 15pt; border-radius: 3px; border: solid 1px #e2e2e2;}*/

pre {
  margin: 0 0 10px;
  font-size: 13px;
  line-height: 1.42857;
  word-break: break-all;
  word-wrap: break-word;
  border-radius: 4px;
  white-space: pre-wrap;
  display: block;
  background: #f8f8f8;
  padding: 10px 20px;
  border: none;
  margin-bottom: 25px;
  color: #666;
  font-family: Courier, sans-serif;
}

code {
  color: #c7254e;
  background-color: #f9f2f4;
  border-radius: 4px;
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
  padding: 2px 4px;
  font-size: 90%;
}

p>code {
  color: #c7264e;
  background-color: #f9f2f4;
  font-size: .95em;
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
}

figure {
  margin: 1em 0;
}

figcaption {
  font-size: 0.75em;
  padding: 0.5em 2em;
  margin-bottom: 2em;
}

figure img {
  margin-bottom: 0px;
}

hr {
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-top: 1px solid #eee;
}

ol p,
ul p {
  margin-bottom: 0px;
}

li {
  margin-bottom: 0.75em;
  margin-top: 0.75em;
}

ol#footnotes {
  font-size: 0.95em;
  padding-top: 1em;
  margin-top: 1em;
  margin-left: 0;
  border-top: 1px solid #eaeaea;
  counter-reset: footer-counter;
  list-style: none;
  color: #555;
  padding-left: 5%;
  margin: 20px 0;
}

ol#footnotes li {
  margin-bottom: 10px;
  margin-left: 16px;
  font-weight: 400;
  line-height: 2;
  list-style-type: none;
}

ol#footnotes li:before {
  content: counter(footer-counter) ". ";
  counter-increment: footer-counter;
  font-weight: 800;
  font-size: .95em;
}

@keyframes highfade {
  0% {
    background-color: none;
  }
  20% {
    background-color: yellow;
  }
  100% {
    background-color: none;
  }
}

@-webkit-keyframes highfade {
  0% {
    background-color: none;
  }
  20% {
    background-color: yellow;
  }
  100% {
    background-color: none;
  }
}

a:target,
ol#footnotes li:target,
sup a:target {
  animation-name: highfade;
  animation-duration: 2s;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  -webkit-animation-name: highfade;
  -webkit-animation-duration: 2s;
  -webkit-animation-iteration-count: 1;
  -webkit-animation-timing-function: ease-in-out;
}

a:target {
  border: 0;
  outline: 0;
}

a:target {
  border: 0;
  outline: 0;
}

a:target {
  border: 0;
  outline: 0;
}
```

## Markdownhere 主题

``` css
.markdown-here-wrapper {
  font-size: 16px;
  line-height: 1.8em;
  letter-spacing: 0.1em;
}


pre, code {
  font-size: 14px;
  font-family: Roboto, 'Courier New', Consolas, Inconsolata, Courier, monospace;
  margin: auto 5px;
}

code {
  white-space: pre-wrap;
  border-radius: 2px;
  display: inline;
}

pre {
  font-size: 15px;
  line-height: 1.4em;
  display: block; !important;
}

pre code {
  white-space: pre;
  overflow: auto;
  border-radius: 3px;
  padding: 1px 1px;
  display: block !important;
}

strong, b{
  color: #BF360C;
}

em, i {
  color: #009688;
}

hr {
  border: 1px solid #BF360C;
  margin: 1.5em auto;
}

p {
  margin: 1.5em 5px !important;
}

table, pre, dl, blockquote, q, ul, ol {
  margin: 10px 5px;
}

ul, ol {
  padding-left: 15px;
}

li {
  margin: 10px;
}

li p {
  margin: 10px 0 !important;
}

ul ul, ul ol, ol ul, ol ol {
  margin: 0;
  padding-left: 10px;
}

ul {
  list-style-type: circle;
}

dl {
  padding: 0;
}

dl dt {
  font-size: 1em;
  font-weight: bold;
  font-style: italic;
}

dl dd {
  margin: 0 0 10px;
  padding: 0 10px;
}

blockquote, q {
  border-left: 2px solid #009688;
  padding: 0 10px;
  color: #777;
  quotes: none;
  margin-left: 1em;
}

blockquote::before, blockquote::after, q::before, q::after {
  content: none;
}

h1, h2, h3, h4, h5, h6 {
  margin: 20px 0 10px;
  padding: 0;
  font-style: bold !important;
  color: #009688 !important;
  text-align: center !important;
  margin: 1.5em 5px !important;
  padding: 0.5em 1em !important;
}

h1 {
  font-size: 24px !important;
  border-bottom: 1px solid #ddd !important;
}

h2 {
  font-size: 20px !important;
  border-bottom: 1px solid #eee !important;
}

h3 {
  font-size: 18px;
}

h4 {
  font-size: 16px;
}


table {
  padding: 0;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 1em;
  font: inherit;
  border: 0;
  margin: 0 auto;
}

tbody {
  margin: 0;
  padding: 0;
  border: 0;
}

table tr {
  border: 0;
  border-top: 1px solid #CCC;
  background-color: white;
  margin: 0;
  padding: 0;
}

table tr:nth-child(2n) {
  background-color: #F8F8F8;
}

table tr th, table tr td {
  font-size: 16px;
  border: 1px solid #CCC;
  margin: 0;
  padding: 5px 10px;
}

table tr th {
  font-weight: bold;
  color: #eee;
  border: 1px solid #009688;
  background-color: #009688;
}
```
>  参考文章：[少数派社区内收藏的 Markdown 主题](https://sspai.com/post/43873)