---
id: postgresql-managed-service
title: PostgreSQL + Adminer
sidebar_label: PostgreSQL + Adminer
description: 'PostgreSQL یک ORDBMS معروف و پرطرفدار است که می‌توانید به سادگی به عنوان یک managed-service روی Namespace خود دیپلوی کنید.'
keywords:
  - "سکوی ابری"
  - "سرویس‌های مدیریت شده"
  - سرویس
  - داکر
  - postgresql
  - sql
  - دیتابیس
  - database
  - "managed services"
  - "سکوی ابری فندق"
  - "زیرساخت ابری"
image: /img/docs/thumbnails/managed-services/postgresql-adminer-managed-service-thumbnail.png
---

![Postgresql + Adminer](/img/docs/postgresql-adminer.svg "Postgresql + Adminer")

PostgreSQL یک ORDBMS معروف و پرطرفدار است که می توانید به سادگی به عنوان یک managed-service روی فضانام خود دیپلوی کنید؛ در زیر می‌توانید لیست نسخه‌های رسمی پشتیبانی شده را مشاهده کنید:

* **PostgreSQL 10.16**
* **PostgreSQL 11.11**
* **PostgreSQL 12.6**
* **PostgreSQL 13.2**

|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| postgresql| نامی که برای سرویس مایلید در نظر گرفته شود|
|adminer_enabled|boolean | true | فعال یا غیرفعال بودن Adminer
|postgres_password| string| postgres| رمز عبور دیتابیس|
|volume_name| string| None| نام volumeای که به سرویس وصل می‌شود|
|volume_browser_enabled| boolean| false| آیا سرویس مدیریت Dedicated Volume برای این سرویس ساخته شود یا خیر|

:::tip راهنمایی
توجه داشته باشید که اگر میخواهید سرعت I/O در سرویس دیتابیس شما بیشتر شود، می‌توانید از volume‌ها استفاده کنید و نام آن را به صورت `c volume_name=VOLUME_NAME-` موقع ساخت Managed Service در fandogh-cli وارد نمایید. )VOLUME_NAME نام volume‌ای است که موقع ساخت آن تعیین کرده‌اید(.
:::

:::note توجه
توجه داشته باشید برای استفاده از قابلیت Volume Browser سرویس شما باید به یک Dedicated Volume متصل باشد؛ در غیر این صورت با خطای سرور مواجه خواهید شد.
:::

به عنوان مثال برای دیپلوی کردن یک PostgreSQL می‌توانیم به این شکل یک سرویس بسازیم:

```bash
  fandogh managed-service deploy postgresql 10.16 \
       -c service_name=test-dbms \
       -c adminer_enabled=false \
       -c postgres_password=test123
```

این دستور یک سرویس PostgreSQL ایجاد می‌کند که:
- نام سرویس آن test-dbms )یعنی در شبکه داخلی فضانام شما باقی سرویس‌ها از طریق نام test-dbms می‌توانند به آن متصل شوند(.
- رمز عبور آن test123 است.
- نام کاربری نیز postgres می‌باشد
- Adminer هم در آن غیر‌فعال شده است.

:::note توجه
پورت پیشفرض برای PostgreSQL برابر با 5432 می باشد. 
:::

:::caution هشدار
 در صورتی که از کاراکتر # در رمز عبور استفاده کنید، با خطای سروری مواجه خواهید شد   
:::

## نسخه‌ها )Versions(
سرویس‌های مدیریت شده سکوی ابری فندق، تنها از نسخه‌های `stable` و پشتیبانی شده توسط توسعه ‌دهنده های اصلی آن محصول پشتیبانی می‌کند. به همین خاطر می‌توانید با خیال راحت سرویس مورد نظر خود را به همراه نسخه مورد نیازتان بر روی فضانام مستقر نمایید.

لیست نسخه‌های موجود برای سرویس `PostgreSQL` به شرح زیر هستند:

* **PostgreSQL 10.16**
* **PostgreSQL 11.11**
* **PostgreSQL 12.6**
* **PostgreSQL 13.2**

برای ایجاد سرویس مدیریت شده `PostgreSQL` با نسخه دلخواه، می‌توانید از دستور زیر استفاده کنید:

```bash
fandogh managed-service deploy postgresql 10.16
```

:::caution توجه
توجه داشته باشید شما نمی‌توانید نسخه سرویس در حال اجرا را تغییر دهید. چرا که ممکن است در نسخه‌های متفاوت، تغییراتی وجود داشته باشد که باعث ایجاد تداخل در تنظیمات اصلی و در نتیجه از بین رفتن داده‌ها شود!
:::

:::warning هشدار
سکوی ابری فندق دیگر از نسخه‌ `10.4` سرویس `PostgreSQL` پشتیبانی‌ نمی‌کند.
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

```yaml title="postgresql_deployment.yml"
kind: ManagedService
name: db
spec:
  service_name: postgresql
  version: 10.16
  parameters:
    - name: adminer_enabled
      value: true
    - name: postgres_password
      value: some_long_unpredictable_string
    - name: volume_name
      value: YOUR_VOLUME_NAME
  domains:
  - name: domain.com
  - name: www.domain.com
  resources:
      memory: 3072Mi
```

:::note توجه
توجه داشته باشید، دامنه‌هایی که به سرویس مدیریت شده PostgreSQL اضافه می‌شوند، در اصل به داشبورد مدیریتی آن متصل می‌شوند، نه خود سرویس دیتابیس.
:::


:::important مهم
هشدار برای استفاده از سرویس PostgresSQL باید به نکته زیر توجه داشته باشید: برای حفط مسائل امنیتی سرویس PostgresSQL به صورت یک Internal Service عمل می‌کند و شما خارج از namespace خود به آن دسترسی ندارید.
:::

## Deploy With Manifest
 
شما همچنین می‌توانید برای اجرای راحت‌تر سرویس‌های مدیریت شده از [مانیفست] [service_manifest] همانند مثال زیر استفاده کنید.

```yaml title="postgresql_deployment.yml"
kind: ManagedService
name: db
spec:
  service_name: postgresql
  version: 10.16
  parameters:
    - name: adminer_enabled
      value: true
    - name: postgres_password
      value: some_long_unpredictable_string
    - name: volume_name
      value: YOUR_VOLUME_NAME
  resources:
      memory: 600Mi
```

[www_domain]: http://www.domain.com
[domain]: http://domain.com
[service_manifest]: /docs/services/service-manifest
