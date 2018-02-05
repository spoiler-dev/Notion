# vscode-git 配置说明及注意事项
`vscode-git` `Founder`
------

>最近在接触GitHub过程中，想实现将公司与家中的代码同步的目的，在使用vscode -git插件的过程中，遇到了很多的小坎坷，在查找相关的资料后发现很多资料的记录并不详细且存在错误，现将本人的步骤记录并发布，好让像我这样的麻瓜们早日脱坑。

### 1. 下载 [Git](https://git-scm.com/)
按照安装提示安装即可（环境变量一般会自动配置）

### 2. Git配置
打开Git的Git Bash配置全局设置（主程序）

![vscode-git](http://p3nlrkpll.bkt.clouddn.com/vscode-git-2.png)

```
用户名：
$ git config --global user.name "FounderInxx"

邮箱：
$ git config --global user.email "founder1994@icloud.com"

记住提交的邮箱及密码：
$ git config --global credential.helper store
```

### 3. vscode配置
1.打开D盘创建一个自定义的文件夹，再创建一个文件。
2.打开vscode，打开刚刚创建的文件夹，点击git源代码管理图标，初始化存储库，你文件夹下的文件就会出现在窗口中

点击 + 号（暂存所有更改），点击更多，选中提交所有更改，

![vscode-git](http://p3nlrkpll.bkt.clouddn.com/vscode-git-5.png)

出现窗口（自定义的上传注释），输入后，按Enter。

![vscode-git](http://p3nlrkpll.bkt.clouddn.com/vscode-git-4.png)

3.这时刷新之前创建的文件夹，会出现.git文件夹（文件夹一般是隐藏的，打开文件管理器的让隐藏的文件显示的选项）。

![vscode-git](http://p3nlrkpll.bkt.clouddn.com/vscode-git-1.png)

4.鼠标右键，出现相关的Git右键快捷命令，选中Git Bash here，出现命令窗口（与主程序一样的界面），输入命令。

![vscode-git](http://p3nlrkpll.bkt.clouddn.com/vscode-git-3.png)

```
github项目的地址（此时gitHub中已经预先创建了Note这个repository）：
$ git remote add origin https://github.com/FounderInxx/Note.git

初始化仓库：
$ git pull --rebase origin master

提交到仓库：
$ git push -u origin master
```

5.再次回到vscode中，再次点击更多，点击推送(push)，出现输入GitHub邮箱窗口，输入后，出现输入Github密码窗口,vscode控制台可以看到git的相关输出。
此时文件夹中的文件便以成功提交到GitHub中，浏览器刷新查看。

6.同步GitHub代码到本地，选择'拉取'即可

**注：**若如仍无法解决问题，也可以参考以下的博文：
> * http://blog.csdn.net/lhb_11/article/details/77837078
> * https://www.cnblogs.com/ashidamana/p/6122619.html
> * https://www.cnblogs.com/xuanhun/p/6019038.html?utm_source=tuicool&utm_medium=referral
