---
id: mariadb-managed-service
title: MariaDB + phpMyAdmin
sidebar_label: MariaDB + phpMyAdmin
description: 'سرویس MariaDB یکی از محبوب ترین RDMBS های open source است که طرفداران خیلی زیادی دارد. این سرویس اگرچه از زیرشاخه‌های MySQL حساب می‌شود اما سعی شده است تا در آن جدا از دسترسی آزاد، بهبودهایی ایجاد شود و تا حد امکان نواقص و کمبودهای موجود در MySQL جبران شود.'
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



سرویس MariaDB یکی از محبوب ترین RDMBS های open source است که طرفداران خیلی زیادی دارد. این سرویس اگرچه از زیرشاخه‌های MySQL حساب می‌شود اما سعی شده است تا در آن جدا از دسترسی آزاد، بهبودهایی ایجاد شود و تا حد امکان نواقص و کمبودهای موجود در MySQL جبران شود.<br/>
در جدول زیر تفاوت های عمده ای که بین MariaDB و MySQL وجود دارد را مشاهده می فرمایید:

|پارامتر|MariaDB|MySQL|
|:---:	|:---:	|:---:	|
|موتورهای ذخیره سازی |<div dir="rtl">MariaDB دارای 12 موتور ذخیره سازی جدید است که در MySQL پیدا نخواهید کرد.</div>|در مقایسه با MariaDB گزینه کمتری برای ذخیره سازی دارد.|
| بهبود سرعت |<div dir="rtl">MariaDB در مقایسه با MySQL سرعت بهبود یافته ای را نشان می دهد. </div>|<div dir="rtl">MySQL در مقایسه با MariaDB سرعت کمتری از خود نشان می دهد. </div>|
|انتشار اولیه|2009|1995|
|Faster cache/indexes|با استفاده از موتور ذخیره سازی حافظه MariaDB ، بیانیه INSERT می تواند 24٪ سریعتر از MySQL استاندارد تکمیل شود. |موتور ذخیره سازی حافظه MySQL در مقایسه با MariaDB کندتر است.|
|Larger and Faster Connection Pool |<div dir="rtl">MariaDB دارای یک استخر نخ پیشرفته است که می تواند با سرعت بیشتری کار کند و از 200000+ اتصال پشتیبانی می‌کند.</div>|استخر نخ ارائه شده توسط MySQL نمی تواند تا 200،000 اتصال در هر زمان را پشتیبانی کند.|
|Improved Replication |در MariaDB ، همانند سازی می تواند با اطمینان و سریعتر انجام شود. همچنین می توان به روزرسانی ها را در مقایسه با MySQL سنتی 2 برابر سریعتر انجام داد. |MySQL's community edition allows a static number of threads to be connected. MySQL's enterprise plan comes with thread capabilities. |
|New Features/Extensions|<div dir="rtl">MariaDB همراه با ویژگی ها و پسوندهای جدید از جمله دستورات JSON ، WITH و KILL است.</div>|ویژگی های جدید MariaDB در MySQL ارائه نشده است.|  
|Missing Features |<div dir="rtl">MariaDB فاقد برخی از ویژگی های ارائه شده توسط نسخه سازمانی MySQL است. برای پرداختن به این موضوع ، پلاگین های منبع باز جایگزین ارائه می دهد</div>|نسخه Enterprise از MySQL از یک کد اختصاصی استفاده می کند. فقط کاربران MySQL Enterprise Edition به این دسترسی دارند.|
|Priority code |<div dir="rtl">MariaDB اجازه دسترسی به این محتوای مناسب را نمی دهد و یک منبع بسته است.</div> |<div dir="rtl">MySQL از کد اختصاصی در Enterprise Edition خود استفاده می کند.</div>|
|پوشاندن اطلاعات|No|Yes|
|ستون های پویا |No|Yes|
|Monitoring|SQLyog|MySQL workbench |
|مسیریابی|MariaDB MaxScale |Mysql Router |
|تجزیه و تحلیل|MaraiDB ColumnStore |No|
|Secondary database model |Document store and Graph DBMS |Document store |
|شرکت‌های معروف|Nrise, Accenture, Docplanner, Grooveshark. |Airbnb, Uber Technogloeis, Netflix, Dropbox. |

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
