---
id: managed-services-intro
title: مقدمه
sidebar_label: مقدمه
description: 'شما می‌توانید برخی سرویس‌های پرکاربرد را که نصب سختی دارند را به صورت مدیریت شده از سکوی ابری فندق تهیه کنید بدون آنکه دانش فنی خاصی برای نصب نیاز باشد به این صورت که...'
keywords:
  - "سکوی ابری"
  - "سرویس‌های مدیریت شده"
  - سرویس
  - داکر
  - "managed services"
  - "سکوی ابری فندق"
  - "زیرساخت ابری"
image: /img/fandogh.png
---
## managed-service چیست؟
![Managed Service Intro](/img/docs/managed-service-intro.png "Managed Service Intro")

خیلی از سرویس‌ها مانند MySQL یا PostgreSQL به طور مداوم توسط کاربران استفاده می‌شوند. ما در سکوی ابری فندق برای ساده‌تر کردن راه‌اندازی این نوع سرویس‌ها، امکانی را فراهم آورده‌ایم کردیم که به کمک آن می‌توانید با سهولت بیشتری این نوع سرویس‌ها را راه‌اندازی کنید.
<br/>
در حالت کلی در دسته‌بندی انواع سرویس‌ها، اگر یک سرویس به صورت پیش‌فرض بر روی سکوی ابری فندق وجود داشته باشد، به آن **سرویس مدیریت شده** می‌گوییم اما اگر خود کاربر سرویسی را از طریق یک ایمیج دلخواه ایجاد کند، آن را **سرویس کاربر یا سرویس** می‌نامیم.

:::note توجه
Managed Service‌ها عموما سرویس‌های کاربردی و مهمی هستند که خود سکو وظیفه نگهداری آن‌ها را بر عهده دارد، لذا توصیه ما به کاربران این است که تا حد ممکن از ایمیج‌های دلخواه استفاده نکرده و از سرویس‌های مدیریت شده فندق استفاده کنند تا از مشکلات امنیتی و فنی در آینده جلوگیری شود.
:::

 برای اطلاع از نحوه ساخت سرویس‌ها و انواع آن‌ها می‌توانید به این [اینجا] [services_document] مراجعه نمایید.

### لیست سرویس‌های مدیریت شده یا Managed Service 
|نام سرویس|ورژن|جزئیات|نام سرویس|ورژن|جزئیات|
|---	|---	|---  |---	|---	|---  |
| Gitlab| 13.4.3-ce.0 |[مشاهده] [gitlab_document] | Gitlab Runner| alpine-v13.5.0-rc2 |[مشاهده] [gitlab_runner_document] |
| MySQL| 5.7 |[مشاهده] [mysql_document] | phpMyAdmin| latest |[مشاهده] [phpmyadmin_document]|
| PostgreSQL| 10.4 |[مشاهده] [postgresql_document] | Adminer| latest |[مشاهده] [adminer_document] |
| MongoDB| 4.2 |[مشاهده] [mongo_document] | Mongo Dashboard| latest |[مشاهده] [mongo_dashboard_document]|
| Elasticsearch| 7.8.0 |[مشاهده] [elasticsearch_document]| Kibana| 7.8.0 |[مشاهده] [kibana_document] |
| Redis| 5.0.3 |[مشاهده] [redis_document] | Redis Dashboard| latest |[مشاهده] [redis_dashboard_document]
| MinIO| latest |[مشاهده] [minio_document]| Proxy| latest |[مشاهده] [proxy_document]|


## نحوه دیپلوی کردن ManagedServiceها
برای دیپلوی کردن ManagedServiceها دو راه وجود دارد:
- استفاده از fandogh-cli
- استفاده از manifest

### fandogh-cli
برای اینکه بتوانید یک سرویس را از طریق **fandogh-cli**  دیپلوی کنید، ابتدا همانند دستور زیر با استفاده از دستور `help` لیست سرویس‌های مدیریت شده را مشاهده کنید.

```bash
fandogh managed-servce help
```

بعد از اینکه لیست سرویس‌ها را مشاهده کردید، می‌توانید با استفاده از دستور `deploy`  سرویس مدیریت شده مورد نظر خود را دیپلوی کنید.<br/>
برای مثال به این دستور توجه فرمایید:

```bash
fandogh managed-service deploy mysql 5.7
```

بعد از وارد کردن دستور بالا، فندق یک سرویس مدیریت شده از ایمیج MySQL که ورژن آن 5.7 می‌باشد را برای شما دیپلوی می‌کند.

### manifest
در قسمت [مانیفست سرویس] [service_manifest] بطور کامل در مورد چگونگی استفاده از مانیفست‌ها برای ساخت سرویس صحبت شده است و در اینجا برای مثال یک مورد را با هم بررسی می‌کنیم.<br/>
به مانیفست زیر توجه کنید:

```yaml title="managed_service_deployment.tml"
kind: ManagedService
name: db
spec:
  service_name: mysql
  version: 5.7
  parameters:
    ...
  resources:
      memory: 800Mi
```
برای آنکه بتوانید یک سرویس مدیریت شده را از طریق مانیفست اجرا نمایید، فقط کافی است **kind** را به **ManagedService** تغییر داده و در قسمت **service_name** نام سرویس مدیریت شده ای را که از لیست انتخاب کرده‌اید را جایگزین نموده و در قسمت **version** ورژن مورد نظر از آن سرویس را وارد نمایید.

[services_document]: /docs/services/services
[gitlab_document]: /docs/managed-services/gitlab-managed-service
[gitlab_runner_document]: /docs/managed-services/gitlab-runner-managed-service
[mysql_document]: /docs/managed-services/mysql-managed-service
[phpmyadmin_document]: /docs/managed-services/mysql-managed-service
[postgresql_document]: /docs/managed-services/postgresql-managed-service
[adminer_document]: /docs/managed-services/postgresql-managed-service
[mongo_document]: /docs/managed-services/mongodb-managed-service
[mongo_dashboard_document]: /docs/managed-services/mongodb-managed-service
[elasticsearch_document]: /docs/managed-services/elasticsearch-managed-service
[kibana_document]: /docs/managed-services/kibana-managed-service
[redis_document]: /docs/managed-services/redis-managed-service
[redis_dashboard_document]: /docs/managed-services/redis-managed-service
[minio_document]: /docs/managed-services/minio-managed-service
[proxy_document]: /docs/managed-services/proxy-managed-service
[service_manifest]: /docs/services/service-manifest

