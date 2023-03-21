---
title: Mysql 安全配置
author: EraserRain
date: '2022-03-25'
tags: 
    - mysql
categories: Ops
---

## Reference

【[MySQL安全配置详解 - 简书 (jianshu.com)](https://www.jianshu.com/p/7dcaf4c616b0)】

【[MySQL 数据库安全加固 | Coding and Fixing (vxhly.github.io)](https://vxhly.github.io/views/liunx/mysql-database-user-policy.html#%E4%BF%AE%E6%94%B9-root-%E7%94%A8%E6%88%B7%E5%8F%A3%E4%BB%A4)】

## 概述

记录下 `mysql` 常用的安全配置。

mysql 配置文件： `/etc/my.cnf`

## 安全配置

### mysql 设置最大最小连接数

查看最大连接数

```sql
show variables like 'max_connections';
```

MySQL默认的最大连接数为100，MySQL服务器允许的最大连接数16384。
`my.cnf` 配置
```bash
[mysqld]
max_connections = 256
```

### 设置 SSL 连接

【[Mysql配置ssl证书 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/137535760)】

MYSQL 5.7 版本可以通过 `mysql_ssl_rsa_setup`  自动生成 SSL 证书。

### 更改 root 用户名

```sql
use mysql;
select user,host from mysql.user;
update user set user='sysroot' where user='root';
flush privileges;

//or 

rename user root@'localhost' to sysroot@'localhost';
flush privileges;
```

修改用户密码

```sql
set password for [user]@[ip]=password('password') 
```

### 删除匿名账号

```sql
delete from mysql.user where user='';
delete from mysql.db where user='';
delete from mysql.tables_priv where user='';
delete from mysql.columns_priv where user='';
delete from mysql.procs_priv where user='';
```

删除登录主机可以是任意主机的MySQL账号

```sql
delete from mysql.user where host='%' or host='';
delete from mysql.db where host='%' or host='';
delete from mysql.tables_priv where host='%' or host='';
delete from mysql.columns_priv where host='%' or host='';
delete from mysql.procs_priv where host='%' or host='';
```

### 禁止远程连接
`my.cnf` 配置
```bash
[mysqld]
bind_address=localhost
skip-networking=on
```

### 日志配置
`my.cnf` 配置
```sql
[mysqld]
general_log_file=/server/abchosting/database/mysql-general.log
general_log=0

log_slow_queries=/server/abchosting/database/mysql-slow.log
long_query_time = 2
log-queries-not-using-indexes
```

运行时开启

```sql
set global log=on; ## 打开日志功能
set global general_log = 'ON';
set global slow_query_log = 'ON';
```

### 用户权限配置

移除用户权限

```sql
revoke insert,update,create,drop on *.* from trunkey@'localhost';
```

### 打开安全验证

```sql
set global secure_auth=on;
```