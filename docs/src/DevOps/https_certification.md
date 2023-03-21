---
title: 使用 openssl 申请 https 自签名证书
author: EraserRain
date: '2022-07-11'
tags: 
    - openssl
    - https
categories: Ops
---

## 1. Reference

【[简易实现 HTTPS （二） 自签名证书 | PHP 技术论坛 (learnku.com)](https://learnku.com/articles/49193)】

## 2. 概述

https自签名证书可以在线申请（阿里云DV型SSL证书、腾讯云等），也可以通过 `openssl` 本地申请。这里介绍通过 `openssl` 申请自签名证书。

注：本地申请的无效，无法像普通的https链接那样被信任，如果需要公网验证，还是需要通过在线申请。

## 3. 步骤

### 申请证书

```bash
cd nginx/conf
mkdir -p cert && cd cert
```

检查 `openssl` 版本

```bash
openssl version
```

使用 `des3` 生成 4096 比特位服务器私钥

```bash
openssl genrsa -des3 -out server.key 4096
```

生成证书签名请求文件，注意填写域名或者 IP 地址（Common Name）

```bash
openssl req -new -key server.key -out server.csr
```

生成 4096 位 `ca` 私钥

```bash
openssl genrsa -des3 -out ca.key 4096
```

去除服务器私钥避免以后每次载入文件需要输入密码

```bash
openssl rsa -in server.key -out server.key
```

以 x509 证书格式标准生成 10 年的 crt ，注意填写域名或者 IP 地址（Common Name）

```bash
openssl req -new -x509 -key ca.key -out ca.crt -days 3650
```

请求有效期为 3650 天 传入文件为 `server.csr` 指定 CA 文件为 `ca.crt` 指定私钥文件为 `ca.key` 并自动创建 CA 序列文件 输出证书文件 `server.crt` 至此签名成功

```bash
openssl x509 -req -days 365 -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt
```

完成后，`cert` 目录下应有6个文件

```bash
cert
├── ca.crt
├── ca.key
├── ca.srl
├── server.crt
├── server.csr
└── server.key
```

### Nginx 配置

检查是否安装 `http_ssl_module` 模块

```bash
nginx -V
```

`nginx` 配置

```bash
server {
      listen       58088  ssl;
      server_name     www.trunkey.com; # server_name 为对应IP或域名
      ssl_certificate ./cert/server.crt;
      ssl_certificate_key ./cert/server.key;
      location / { 
      index index.html index.php;
      rewrite ^/(.*)WebService/(.*)Command(.*)$ /webservice.php last;
      root  /server/abchosting/www/isms/wwwroot;
      location ~ .*\.(php|php5)?$
      {   
        fastcgi_pass 127.0.0.1:9000;
        fastcgi_index index.php;
        include fastcgi.conf;
      }
     }
    }
```

重新加载

```bash
service nginx reload
```