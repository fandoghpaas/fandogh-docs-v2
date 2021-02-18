---
id: mariadb-managed-service
title: MariaDB + phpMyAdmin
sidebar_label: MariaDB + phpMyAdmin
description: 'MariaDB یکی از محبوب‌ترین RDBMS‌های امروزی است که طرفداران زیادی در سرتاسر دنیا دارد؛ به همین دلیل MariaDB به عنوان اولین managed-service به فندق اضافه شد.'
keywords:
  - "سکوی ابری"
  - "سرویس‌های مدیریت شده"
  - سرویس
  - داکر
  - mariadb
  - sql
  - دیتابیس
  - database
  - "managed services"
  - "سکوی ابری فندق"
  - "زیرساخت ابری"
image: /img/docs/thumbnails/managed-services/mysql-phpmyadmin-managed-service-thumbnail.png
---

![MySQL + PHPMyAdmin](/img/docs/mysql-phpmyadmin.svg "MySQL + PHPMyAdmin")

MariaDB یکی از محبوب ترین  RDMBS های open source است که طرفداران خیلی زیادی دارد. <br/>
در جدول زیر تفاوت های عمده ای که بین MariaDB و MySQL وجود دارد را مشاهده می فرمایید:

|Parameter|MariaDB|MySQL|
|:---:	|:---:	|:---:	|
|Storage Engines|MariaDB has 12 new storage engines that you won't find in MySQL.|It has fewer options for storage compared to MariaDB.|
| Speed Improvements |MariaDB shows an improved speed when compared to MySQL.|MySQL exhibits a slower speed when compared to MariaDB. |
|Initial release|2009|1995|
|Faster cache/indexes|With the Memory storage engine of MariaDB, an INSERT statement can be completed 24% faster than in the standard MySQL. |The memory storage engine of MySQL is slower compared to that MariaDB. |
|Larger and Faster Connection Pool |MariaDB comes with an advanced thread pool capable of running faster and supporting up to 200,000+ connections. |The thread pool provided by MySQL cannot support up to 200,000 connections per time. |
|Improved Replication |In MariaDB, replication can be done safer and faster. Updates can also be done 2x faster compared to the traditional MySQL. |MySQL's community edition allows a static number of threads to be connected. MySQL's enterprise plan comes with thread capabilities. |
|New Features/Extensions|MariaDB comes with new features and extensions including the JSON, WITH and KILL statements. |The new MariaDB features are not provided in MySQL. |  
|Missing Features |MariaDB lacks some of the features provided by the MySQL enterprise edition. To address this, it offers alternative open-source plugins. |The Enterprise Edition of MySQL uses a proprietary code. Only users of MySQL Enterprise Edition have access to this. |
|Priority code |MariaDB doesn't allow access to this propriety content and is a closed source. |MySQL uses some proprietary code in its Enterprise Edition. |
|Data Masking |No|Yes|
|Dynamic columns |No|Yes|
|Monitoring|SQLyog|MySQL workbench |
|Routing|MariaDB MaxScale |Mysql Router |
|Analytics|MaraiDB ColumnStore |No|
|Secondary database model |Document store and Graph DBMS |Document store |
|Famous companies using |Nrise, Accenture, Docplanner, Grooveshark. |Airbnb, Uber Technogloeis, Netflix, Dropbox. |

این managed-service از دو image متفاوت تشکیل شده‌است که یکی خود MariaDB و دیگری PHPMyAdmin که یک رابط کاربری تحت وب برای MariaDB است.<br/>
برای دیپلوی کردن یک سرویس MariaDB شما می‌توانید موارد زیر را هنگام دیپلوی مشخص کنید:

|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| mariadb| نامی که برای سرویس مایلید در نظر گرفته شود|
|phpmyadmin_enabled|boolean | true | فعال یا غیرفعال بودن PHPMyAdmin
|mariadb_root_password| string| root| رمز عبور یوزر root دیتابیس|
|volume_name| string| None| نام volumeای که به سرویس وصل می‌شود|
|volume_browser_enabled| boolean| false| آیا سرویس مدیریت Dedicated Volume برای این سرویس ساخته شود یا خیر|

:::tip راهنمایی
توجه داشته باشید که اگر می‌خواهید سرعت I/O در سرویس دیتابیس شما بیشتر شود، می‌توانید از volume‌ها استفاده کنید و نام آن را به صورت `c volume_name=VOLUME_NAME-` موقع ساخت Managed Service در fandogh-cli وارد نمایید. )VOLUME_NAME نام volume‌ای است که موقع ساخت آن تعیین کرده‌اید(.
:::

:::note توجه
توجه داشته باشید برای استفاده از قابلیت Volume Browser سرویس شما باید به یک Dedicated Volume متصل باشد؛ در غیر این صورت با خطای سرور مواجه خواهید شد.
:::

به عنوان مثال برای دیپلوی کردن یک MariaDB می‌توانیم به این شکل عمل کنیم:

```bash
fandogh managed-service deploy mariadb 10.5.8 \
     -c service_name=mydatabase \
     -c mariadb_root_password=12341234\
     -c phpmyadmin_enabled=false
```

این دستور یک سرویس MariaDB ایجاد می‌کند که :
- نام سرویس آن mydatabase است )یعنی در شبکه داخلی فضانام شما باقی سرویس‌ها از طریق نام mydatabase می‌توانند به آن متصل شوند( .
- رمز عبور root آن 12341234 است.
- PHPMyAdmin هم در آن غیر‌فعال شده است.

:::note توجه
پورت پیش فرض برای MariaDB برابر با 3306 می باشد.
:::

:::important مهم
هشدار برای استفاده از سرویس MariaDB باید به نکته زیر توجه داشته باشید. برای حفظ مسائل امنیتی سرویس MariaDB به صورت یک internal service عمل می کند و شما خارج از namespace خود به آن دسترسی ندارید.
:::

:::tip راهنمایی
برای اتصال سایر سرویس های یک فضانام به سرویس MariaDB از اسم سرویسی که ساخته اید می توانید استفاده کنید. 
:::

## افزودن دامنه دلخواه
اگر قصد داشته باشید دامنه یا دامنه‌های دلخواهتان را به سرویس مدیریت شده مورد نظر متصل نمایید، از طریق این بخش می‌توانید لیست این دامنه‌ها را مشخص کنید.<br/>
برای مثال فرض کنید تمایل دارید سرویس مدیریت شده مورد نظر شما روی  [domain.com] [domain]  و  [www.domain.com] [www_domain]  در دسترس باشد:

```yaml
  domains:
     - name: domain.com
     - name: www.domain.com
     ...
```

بدین شکل بخش دامنه را به مانیفست سرویس خود اضافه کرده و آن را مستقر نمایید:

```yaml title="mariadb_deployment.yml"
kind: ManagedService
name: db
spec:
  service_name: mariadb
  version: 10.5.8
  parameters:
    - name: phpmyadmin_enabled
      value: true
    - name: mariadb_root_password
      value: some_long_unpredictable_string
    - name: volume_name
      value: YOUR_VOLUME_NAME
  domains:
  - name: domain.com
  - name: www.domain.com
  resources:
      memory: 800Mi
```

:::note توجه
توجه داشته باشید، دامنه‌هایی که به سرویس مدیریت شده MariaDB اضافه می‌شوند، در اصل به داشبورد مدیریتی آن متصل می‌شوند، نه خود سرویس دیتابیس.
:::

## Deploy With Manifest

شما همچنین می‌توانید برای اجرای راحت‌تر سرویس‌های مدیریت شده از [مانیفست] [service_manifest] همانند مثال زیر استفاده کنید.

```yaml title="mariadb_deployment.yml"
kind: ManagedService
name: db
spec:
  service_name: mariadb
  version: 10.5.8
  parameters:
    - name: phpmyadmin_enabled
      value: true
    - name: mariadb_root_password
      value: some_long_unpredictable_string
    - name: volume_name
      value: YOUR_VOLUME_NAME
  resources:
      memory: 800Mi
```

[www_domain]: http://www.domain.com
[domain]: http://domain.com
[service_manifest]: /docs/services/service-manifest
