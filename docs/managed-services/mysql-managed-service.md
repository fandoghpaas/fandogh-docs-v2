---
id: mysql-managed-service
title: Mysql + phpMyAdmin
sidebar_label: MySQL + phpMyAdmin
description: 'MySQL یکی از محبوب‌ترین RDBMS‌های امروزی است که طرفداران زیادی در سرتاسر دنیا دارد؛ به همین دلیل MySQL به عنوان اولین managed-service به فندق اضافه شد.'
keywords:
  - "سکوی ابری"
  - "سرویس‌های مدیریت شده"
  - سرویس
  - داکر
  - mysql
  - sql
  - دیتابیس
  - database
  - "managed services"
  - "سکوی ابری فندق"
  - "زیرساخت ابری"
image: /img/docs/thumbnails/managed-services/mysql-phpmyadmin-managed-service-thumbnail.png
---

![MySQL + PHPMyAdmin](/img/docs/mysql-phpmyadmin.svg "MySQL + PHPMyAdmin")

MySQL یکی از محبوب‌ترین RDBMS‌های امروزی است که طرفداران زیادی در سرتاسر دنیا دارد؛ به همین دلیل MySQL به عنوان اولین managed-service به فندق اضافه شد.<br/>
این managed-service از دو image متفاوت تشکیل شداست که یکی خود MySQL و دیگری PHPMyAdmin که یک رابط کاربری تحت وب برای MySQL است.<br/>
برای دیپلوی کردن یک سرویس MySQL شما می‌توانید موارد زیر را هنگام دیپلوی مشخص کنید:

|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| mysql| نامی که برای سرویس مایلید در نظر گرفته شود|
|phpmyadmin_enabled|boolean | true | فعال یا غیرفعال بودن PHPMyAdmin
|mysql_root_password| string| root| رمز عبور یوزر root دیتابیس|
|volume_name| string| None| نام volumeای که به سرویس وصل می‌شود|
|volume_browser_enabled| boolean| false| آیا سرویس مدیریت Dedicated Volume برای این سرویس ساخته شود یا خیر|

:::tip راهنمایی
توجه داشته باشید که اگر می‌خواهید سرعت I/O در سرویس دیتابیس شما بیشتر شود، می‌توانید از volume‌ها استفاده کنید و نام آن را به صورت `c volume_name=VOLUME_NAME-` موقع ساخت Managed Service در fandogh-cli وارد نمایید. )VOLUME_NAME نام volume‌ای است که موقع ساخت آن تعیین کرده‌اید(.
:::

:::note توجه
توجه داشته باشید برای استفاده از قابلیت Volume Browser سرویس شما باید به یک Dedicated Volume متصل باشد؛ در غیر این صورت با خطای سرور مواجه خواهید شد.
:::

به عنوان مثال برای دیپلوی کردن یک MySQL می‌توانیم به این شکل عمل کنیم:

```bash
fandogh managed-service deploy mysql 5.7 \
     -c service_name=mydatabase \
     -c mysql_root_password=12341234\
     -c phpmyadmin_enabled=false
```

این دستور یک سرویس MySQL ایجاد می‌کند که :
- نام سرویس آن mydatabase است )یعنی در شبکه داخلی فضانام شما باقی سرویس‌ها از طریق نام mydatabase می‌توانند به آن متصل شوند( .
- رمز عبور root آن 12341234 است.
- PHPMyAdmin هم در آن غیر‌فعال شده است.

:::note توجه
پورت پیش فرض برای MySql برابر با 3306 می باشد.
:::

:::important مهم
هشدار برای استفاده از سرویس MySQL باید به نکته زیر توجه داشته باشید. برای حفظ مسائل امنیتی سرویس MySQL به صورت یک internal service عمل می کند و شما خارج از namespace خود به آن دسترسی ندارید.
:::

:::tip راهنمایی
برای اتصال سایر سرویس های یک فضانام به سرویس MySQL از اسم سرویسی که ساخته اید می توانید استفاده کنید. 
:::


## نسخه‌ها )Versions(
سرویس‌های مدیریت شده سکوی ابری فندق، تنها از نسخه‌های `stable` و پشتیبانی شده توسط توسعه ‌دهنده های اصلی آن محصول پشتیبانی می‌کند. به همین خاطر می‌توانید با خیال راحت سرویس مورد نظر خود را به همراه نسخه مورد نیازتان بر روی فضانام مستقر نمایید.

لیست نسخه‌های موجود برای سرویس `MySQL` به شرح زیر هستند:

|لیست نسخه‌ها|لیست نسخه ها |لیست نسخه ها |
|--- |--- |---|
|5.7 | 8.0 ||

برای ایجاد سرویس مدیریت شده `MySQL` با نسخه دلخواه، می‌توانید از دستور زیر استفاده کنید:

```basg
fandogh managed-service deploy mysql 8.0
```

:::caution توجه
توجه داشته باشید شما نمی‌توانید نسخه سرویس در حال اجرا را تغییر دهید. چرا که ممکن است در نسخه‌های متفاوت، تغییراتی وجود داشته باشد که باعث ایجاد تداخل در تنظیمات اصلی و در نتیجه از بین رفتن داده‌ها شود!
:::

:::tip راهنمایی
برای آنکه بتوانید نسخه سرویس خود را تغییر دهید، بهتر است ابتدا یک سرویس جدید با نسخه دلخواه ایجاد کرده؛ سپس از اطلاعات سرویس قبلی Backup تهیه نموده و وارد سرویس جدید کنید.
در صورت وجود خطا یا تداخل، احتمال دارد نیاز داشته باشید برخی داده‌ها یا تنظیمات را بروزرسانی کرده و تغییر دهید.
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

```yaml title="mysql_deployment.yml"
kind: ManagedService
name: db
spec:
  service_name: mysql
  version: 5.7
  parameters:
    - name: phpmyadmin_enabled
      value: true
    - name: mysql_root_password
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
توجه داشته باشید، دامنه‌هایی که به سرویس مدیریت شده MySQL اضافه می‌شوند، در اصل به داشبورد مدیریتی آن متصل می‌شوند، نه خود سرویس دیتابیس.
:::

## Deploy With Manifest

شما همچنین می‌توانید برای اجرای راحت‌تر سرویس‌های مدیریت شده از [مانیفست] [service_manifest] همانند مثال زیر استفاده کنید.

```yaml title="mysql_deployment.yml"
kind: ManagedService
name: db
spec:
  service_name: mysql
  version: 5.7
  parameters:
    - name: phpmyadmin_enabled
      value: true
    - name: mysql_root_password
      value: some_long_unpredictable_string
    - name: volume_name
      value: YOUR_VOLUME_NAME
  resources:
      memory: 800Mi
```

[www_domain]: http://www.domain.com
[domain]: http://domain.com
[service_manifest]: /docs/services/service-manifest
