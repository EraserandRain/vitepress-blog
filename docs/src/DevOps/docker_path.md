---
title: 修改 Docker 镜像默认存储位置
author: EraserRain
date: '2022-07-10'
tags: 
    - docker
categories: Ops
---

## 1. Reference

【[CentOS7修改Docker容器和镜像默认存储位置 - SegmentFault 思否](https://segmentfault.com/a/1190000040326126)】

## 2. 概述

查看当前 Docker 信息，`Docker Root Dir` 即 Docker 容器的存放位置，默认情况下在 `/var/lib/docker` 目录下。

```bash
docker info
```

## 3. 解决

停止 Docker 服务

```bash
service docker stop
```

修改 Docker 服务启动文件（`/usr/lib/systemd/system/docker.service`），定位到 `ExecStart` 添加参数

```bash
ExecStart=...
	...
	...
	...
	--graph=/path/to/docker
		## graph 等号后为新的存放位置
```

移动原文件至新目录

```bash
/bin/cp -r /var/lib/docker/* /path/to/docker/
```

重新加载配置并启动

```bash
systemctl daemon-reload
systemctl start docker
```