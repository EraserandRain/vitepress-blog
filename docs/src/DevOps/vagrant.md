---
title: Vagrant 入门
author: EraserRain
date: '2022-02-27'
tags: 
    - vagrant
    - 虚拟化
categories: Ops
---

## 1. Reference

【[How to run Vagrant + VirtualBox on WSL 2 (2021) (thenets.org)](https://blog.thenets.org/how-to-run-vagrant-on-wsl-2/)】
【[https://www.junmajinlong.com/virtual/index/#vagrant](https://www.junmajinlong.com/virtual/index/#vagrant)】

## 2. 概述

`Vagrant` 依赖于 `provider` 提供的虚拟化支持，不同的 `provider` 提供不同的底层虚拟化方式。

`virtualbox`、`hyper-v`、`vmware workstation`、`docker` 等都为 `provider`。

## 3. Install

环境要求：需提前安装 `provider` ，这里 [安装 VirtualBox](https://www.notion.so/VirtualBox-ff9e57ec67ec48e886949052743c2a55)。

官网安装 `vagrant`【[https://www.vagrantup.com/downloads](https://www.vagrantup.com/downloads)】

```bash
vagrant --version
	## 查看 vagrant 版本
```

## 4. Vagrant box

`.box` 是操作系统压缩包，包含了 Vagrant 的配置信息和虚拟机镜像文件。

### box 下载

官方站点（官方站点较慢）

```bash
https://app.vagrantup.com/boxes/search
```

`Ubuntu` 

```bash
https://cloud-images.ubuntu.com/focal/current/
	## Ubuntu cloud 官方镜像站点

http://mirrors.ustc.edu.cn/ubuntu-cloud-images/focal/current/
	## ubuntu cloud 中科大镜像站点
```

`Centos`

```bash
https://cloud.centos.org/centos/7/vagrant/x86_64/images/
	## Centos cloud 官方镜像站点

https://mirrors.ustc.edu.cn/centos-cloud/centos/7/vagrant/x86_64/images/
	## Centos cloud 中科大镜像站点
```

### 设置 `VAGRANT_HOME`

box 文件会默认安装在 `~/.vagrant.d`，要修改下载时默认的镜像保存位置，需设置环境变量 `VAGRANT_HOME`。

```bash
echo 'export VAGRANT_HOME="storge_dir"' >>~/.bashrc
exec bash
```

## 5. 命令详解

[命令详解](https://www.notion.so/03fd271c397047068efccd06008e3657)

## 6. `Vagrantfile` 配置文件

```bash
Vagrant.configure("2") do |config|
  
	config.vm.box = ""
		## box 名称

	config.vm.hostname = ""
		## 设置 hostname

	config.vm.network "",ip:""
		## 见"[网络配置 config.vm.network](https://www.notion.so/Vagrant-d477bdf5df2f4c648d521268153ae2ba)"

	config.vm.synced_folder "",""
		## 设置映射目录,第一个为本机目录,第二个为虚拟机目录
		## 虚拟机的 /vagrant 目录默认挂载宿主机的开发目录

end
```

### 节点配置

定义一个名为 `name` 的 vm 配置，该节点下的配置信息命名为 `config_name`

```bash
config.vm.define name do |config_name|
	config_name.vm.box = ""
	...
end
```

### `Vagrantfile` 配置操作

[Vagrantfile 配置操作](https://www.notion.so/63706f924ceb46768c2170a3a73e382e)

## 7. 插件配置

[插件配置](https://www.notion.so/eab67d70911d4678bee48ba2d5f5592e)