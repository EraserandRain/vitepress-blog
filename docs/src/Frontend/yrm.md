---
title: yarn 的源管理器 yrm
author: EraserRain
date: 2022-02-25
image: https://images.unsplash.com/photo-1665129059445-b31f47edf843?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80
tags:
    - yarn
---

# yarn 的源管理器 -- yrm
## 1. Install yrm

安装 `yrm`

```bash
npm install -g @sunweibin/yrm   # npm
yarn global add yrm             # yarn  
```

查看版本

```bash
yrm --version
```

## 2. Usage

列出可选择的源

```bash
yrm ls
```

查看当前使用的源

```bash
yrm now
```

添加与删除源

```bash
yrm add [repo] [url]
	## 添加源

yrm del [repo]
```

切换使用的源

```bash
yrm use [repo]

yrm use now -n
	## -n, --npm: 同步显示 npm 使用的源
```