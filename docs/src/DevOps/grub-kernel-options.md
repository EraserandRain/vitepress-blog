---
title: 常用的 Grub 内核启动参数设置
author: EraserRain
date: '2022-03-09'
tags: 
    - grub
    - centos
categories: Ops
---

## 1. Reference
【[GNU GRUB Manual 2.06](https://www.gnu.org/software/grub/manual/grub/grub.html)】
## 2. 概述
Grub 可以为内核启动提供多种参数，使用这些参数可以很方便的对系统进行调试或配置。参数的格式为 `name=value` 。

## 3. 参数详情

### `selinux`

```bash
selinux=0
    ## 0: 关闭 selinux 
```

### `init`

设置启动的第一个进程，此进程会负责启动其他进程。

```bash
init=/bin/bash
```

### `rdloaddriver`

详见 【[ CentOS 安装时盘符漂移问题](https://www.notion.so/CentOS-759262a48ae541a59f42f0bc2e41c2a3)】，可以解决盘符漂移问题。

### `nomodeset`

系统启动并运行前不加载视频驱动，以低分辨率运行，可以解决安装系统时显示器分辨率不适配的问题。

### `quiet`

省略内核输出的消息。

### `rhgb`

redhat graphics boot，启动时使用图片代替文本信息。

### 数字

设置 runlevel，1（或 single）为单用户模式。

### `rw | ro`

`rw` ：read-write，`ro` ：read-only