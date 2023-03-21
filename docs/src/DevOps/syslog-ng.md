---
title: syslog-ng 服务配置系统日志
author: EraserRain
date: '2022-02-25'
tags: 
    - syslog
categories: Ops
---
## 1. 安装 `syslog-ng`

```bash
yum -y install syslog-ng
```

`syslog-ng` 会与系统默认安装的 `rsyslog` 冲突。

## 2. `syslog-ng` 服务配置

配置文件（`/etc/syslog-ng/syslog-ng.conf`）大致分为全局配置、消息源、过滤器、消息目的地和日志路径几部分。

### 配置解析

```bash
@version:3.5
@include "scl.conf"
```

全局配置

```bash
options{opt1;opt2;...};
```

日志源：指定日志从本机的哪个IP哪个端口接收信息

```bash
source [sourcename] {sourcedriver params; sourcedriver params; ... };
```

过滤规则

```bash
filter [filtername] {expression;};
```

消息目的地：接收到信息保存在哪个文件

```bash
destination [destname] {destdriver params;destdriver params;...;};
```

日志路径：将来源信息写入到目的文件中

```bash
log{sourceS1;sourceS2;...filter F1;filter F2;... destination D1;destination D2;...};
```

### 单机配置

```bash
@version:3.5
@include "scl.conf"
options {
    flush_lines (0);
    time_reopen (10);
    log_fifo_size (1000);
    chain_hostnames (off);
    use_dns (no);
    use_fqdn (no);
    create_dirs (yes);
    keep_hostname (yes);
};

source s_sys {
    system();
    internal();
    # udp(ip(0.0.0.0) port(514));
};

destination d_cons { file("/dev/console"); };
destination d_mesg { file("/var/log/messages"); };
destination d_auth { file("/var/log/secure"); };
destination d_mail { file("/var/log/maillog" flush_lines(10)); };
destination d_spol { file("/var/log/spooler"); };
destination d_boot { file("/var/log/boot.log"); };
destination d_cron { file("/var/log/cron"); };
destination d_kern { file("/var/log/kern"); };
destination d_mlal { usertty("*"); };

filter f_kernel     { facility(kern); };
filter f_default    { level(info..emerg) and
                        not (facility(mail)
                        or facility(authpriv) 
                        or facility(cron)); };
filter f_auth       { facility(authpriv); };
filter f_mail       { facility(mail); };
filter f_emergency  { level(emerg); };
filter f_news       { facility(uucp) or
                        (facility(news) 
                        and level(crit..emerg)); };
filter f_boot   { facility(local7); };
filter f_cron   { facility(cron); };

#log { source(s_sys); filter(f_kernel); destination(d_cons); };
log { source(s_sys); filter(f_kernel); destination(d_kern); };
log { source(s_sys); filter(f_default); destination(d_mesg); };
log { source(s_sys); filter(f_auth); destination(d_auth); };
log { source(s_sys); filter(f_mail); destination(d_mail); };
log { source(s_sys); filter(f_emergency); destination(d_mlal); };
log { source(s_sys); filter(f_news); destination(d_spol); };
log { source(s_sys); filter(f_boot); destination(d_boot); };
log { source(s_sys); filter(f_cron); destination(d_cron); };

source s_remote {
    file ("/proc/kmsg"log_prefix("kernel: "));
    unix-stream ("/dev/log");
    internal();
    udp(ip(0.0.0.0) port(514));
};

destination d_mysql {
    program("/usr/bin/mysql-uroot -pChinafu1502! < /tmp/mysql.pipe");
    pipe("/tmp/mysql.pipe"
    template("INSERT INTO logs(host,facility,priority,level,tag,date,time,program,msg) VALUES ('$HOST','$FACILITY','$PRIORITY','$LEVEL','$TAG','$YEAR-$MONTH-$DAY','$HOUR:$MIN:$SEC','$PROGRAM','$MSG');\n")     template-escape(yes));
};

log { source(s_remote);destination(d_mysql); };
```

### 配置输出到本地文件中

```bash
@version: 3.5
@include "scl.conf"
source s_local {
    system();
    internal();
    # unix-stream("/dev/log");
    file("/proc/kmsg");
    udp(ip(0.0.0.0) port(514));
};
destination d_syslog_tcp {
              file("/var/log/syslog-ng/syslog-ng.log"); };
log { source(s_local);destination(d_syslog_tcp); };
```

### 配置输出到远程设备

服务端

```bash
source s_remote {
    system();
    internal();
    # unix-stream("/dev/log");
    file("/proc/kmsg");
    udp(ip(192.168.1.102) port(514));
};
destination d_syslog_tcp {
              file("/var/log/syslog-ng/syslog-ng.log"); };
log { source(s_remote);destination(d_syslog_tcp); };
```

客户端

```bash
source s_sys {
file ("/proc/kmsg"log_prefix("kernel: "));
unix-stream ("/dev/log");
internal();
};
destination d_mesg {udp(ip(0.0.0.0) port(514));};
log { source(s_sys);destination(d_mesg); };
```