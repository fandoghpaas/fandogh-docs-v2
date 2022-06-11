---
id: attach-volume-to-service
title: اتصال فضای ذخیزه‌سازی به سرویس
sidebar_label: اتصال فضای ذخیزه‌سازی به سرویس
description: 'بعد از اینکه شما یک dedicate volume ایجاد کردید، قدم بعدی اتصال آن به یک سرویس است تا داده‌های سرویس مورد نظر در مسیرهای مشخص شده در آن volume ذخیره شوند. این روال در ادامه توضیح داده شده است.'
keywords:
  - "سکوی ابری"
  - داکر
  - volume
  - volumes
  - "dedicated volume"
  - فضا
  - service
  - اتصال
  - "فضای ذخیره سازی"
  - "ذخیره سازی"
  - storage
  - file
  - docker
  - "سکوی ابری فندق"
  - "زیرساخت ابری"
image: /img/docs/thumbnails/volumes/volume-attach-thumbnail.png
---

بعد از اینکه شما یک dedicate volume ایجاد کردید، قدم بعدی اتصال آن به یک سرویس است تا داده‌های سرویس مورد نظر در مسیرهای مشخص شده در آن volume ذخیره شوند.<br/>
این روال در ادامه توضیح داده شده است.

## چگونگی اتصال سرویس به فضای ذخیره‌سازی

![Volume Attachment](/img/docs/volume_attachment.svg "Volume Attachment")

بعد از آنکه شما یک volume را ایجاد کردید، با استفاده از [مانیفست] [service_manifest] می‌توانید سرویس خود را به volume دلخواهتان متصل کنید.<br/><br/>
تنها کاری که باید انجام دهید این است که مانیفست سرویس فعلی را باز کرده و mount_pathای که می‌خواهید به volume متصل شود را نوشته و volume_name را که همان نام volume ساخته شده است را همانند مانیفست زیر به آن اضافه کنید.

```yaml
volume_mounts:
- mount_path: /data
  volume_name: vol1
```

```yaml title="service_deployment.yml"
kind: InternalService  
name: cache  
spec:  
  image: library/redis:latest  
  image_pull_policy: IfNotPresent  
  replicas: 1  
  volume_mounts:  
   - mount_path: /data
     volume_name: vol1  
```
همجنین در نظر داشته باشید شما می توانید به هر سرویس بیش از یک Dedicated Volume متصل کنید.

```yaml
volume_mounts:
- mount_path: /data
  volume_name: vol1
- mount_path: /image
  volume_name: vol2
```
در نظر داشته باشید path های متفاوت را به شکل زیر قرار دهید. 
```yaml
volume_mounts:
- mount_path: path_1
  sub_path: sub_path_1
  volume_name: volume_name_1
- mount_path: path_2
  sub_path: sub_path_2
  volume_name: volume_name_2
```
یا برای یک managed-service می‌توانید بسته به نوع آن از parameter مربوط به volume استفاده کنید:

```yaml title="managed_svc_deployment.yml"
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
      value: name_of_volme
  resources:
      memory: 500Mi
```

حال با استفاده از دستور `service apply` می‌توانید سرویس خود را مستقر کرده و در آخر ببینید که سرویس شما به درستی به volume متصل شده و اطلاعات مورد نیاز از مسیر data/ را در volume با نام vol1 ذخیره سازی می‌کند.

:::tip راهنمایی
توجه داشته باشید مانند تکه کد زیر، شما می‌توانید sub_path را هم به volume خود اضافه کنید تا از شلوغ شدن فضای ذخیره سازی جلوگیری به عمل آورید.
:::

```yaml
volume_mounts:
 - mount_path: /data
   sub_path: /sub_directory
   volume_name: vol1
```

## چگونگی جدا کردن سرویس از volume

برای آنکه بتوانید یک سرویس را از یک volume جدا کنید یا اصطلاحا detach کنید، کافی است سرویسی را که به آن متصل است destroy کرده و نام volume‌ای )volume_name( که در مانیفست آن سرویس بوده را حذف کنید.

[service_manifest]: /docs/services/service-manifest