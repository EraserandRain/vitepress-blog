---
title: curl 的拓展 ssl 版本从默认的 nss 转为 openssl
author: EraserRain
date: 2022-04-20
image: https://images.unsplash.com/photo-1665129059445-b31f47edf843?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80
tags:
    - curl
---

# curl 的拓展 ssl 版本从默认的 nss 转为 openssl

## 1. Reference
【[PHP-把curl扩展的SSL版本从NSS改为OpenSSL](https://blog.51cto.com/happyliu/1838622)】

【[centos6.5 64位ssl_version 是 NSS，不是openssl](https://blog.51cto.com/happyliu/1838622)】
## 2. 概述
Centos6.5 默认安装的 `curl` 使用的 `ssl` 版本是 `NSS(Network Security Services)` ,将其改为 `OpenSSL` 。
## 3. 步骤
检查 `curl` 版本
```bash
curl -V
## or
curl --version
```
安装依赖
```bash
yum -y install openssl openssl-devel
```
官方下载 `curl` 【[Index of /download/archeology](http://curl.haxx.se/download/archeology/)】

编译安装
```bash
tar zxvf curl--..

cd curl...

./configure --prefix=/usr --without-nss --with-ssl

make && make install

ldconfig

echo "/usr/local/lib" >> /etc/ld.so.conf && ldconfig
```
检查并重启服务
```bash
curl -V
service php-fpm restart
service nginx restart
```
## 4. 其他
### curl: (35) SSL connect error 报错
解决：升级 NSS
```bash
yum -y update nss
```
