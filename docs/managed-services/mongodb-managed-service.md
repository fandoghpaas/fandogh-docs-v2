---
id: mongodb-managed-service
title: MongoDB
sidebar_label: MongoDB
---

![MongoDB](/img/docs/MongoDB-managed-service.svg "MongoDB")

پایگاه داده‌های Relational یا رابطه‌ای در سال ۱۹۷۰ معرفی شدند تا بتوان با ایجاد رابطه بین جدول داده‌ها و Queryهای مختلف بسته به نیاز، عملیات متفاوتی را بر روی این داده‌ها انجام داد.<br/>
این مدل پایگاه داده در آن زمان که سخت‌افزارهای ذخیره‌سازی گران بودند و استفاده از رایانه و اینترنت مانند امروز فراگیر نشده بود گزینه بسیار مناسب و خوبی بودند.<br/><br/>
ولی مشکل از آن زمانی شروع شد که در سایت‌های ساده با تعداد کاربر‌های زیاد در هر API Call سرور Queryهای پیچیده‌ و زیادی را برای بدست آوردن داده‌ها انجام میداد و این موضوع هزینه زمانی و سخت‌افزاری را افزایش میداد.<br/>
به همین منظور با گذر زمان و ارزان‌تر شدن سخت‌افزارها، نوع جدیدی از پایگاه‌های داده به نام NoSQL‌ها پا به عرصه گذاشتند تا با جای دادن تکنولوژی‌های پایگاه‌ داده‌ای زیادی در خود، به حل مسائل سرعت بیشتری ببخشند.<br/><br/>
یکی از این پایگاه‌ داده‌های معروف و در دسترس [MongoDB] [mongodb_site] است که در میان توسعه دهندگان از محبوبیت بسیار بالایی برخوردار بوده و نشان داده است که در ساختارها و مقیاس‌های بزرگ و پیچیده به راحتی می‌تواند پاسخگوی نیاز‌های یک پروژه باشد.<br/>
حال برای اینکه بتوانید این سرویس محبوب را بر روی فضانام خود دیپلوی کنید، پارامتر‌های زیر را می‌توانید مشخص کنید:

|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| mongodb| نامی که برای سرویس مایلید در نظر گرفته شود|
|mongodb_init_root_username| string| mongo| نام کاربری پایگاه داده|
|mongodb_init_root_password| string| mongo| گذرواژه پایگاه داده|
|mongodb_init_database| string | main| نام دیتابیسی که در ابتدا برای اجرای scriptهای نصب استفاده می‌شود |
|volume_name| string| None| نام volumeای که به سرویس وصل می شود |
|mongo_dashboard_enabled| boolean| False | در صورت نیاز به داشبورد mongo مقدار این بخش باید True شود |
|mongo_dashboard_username| string| root| نام کاربری داشبورد mongo |
|mongo_dashboard_password| string| root| نام کاربری داشبورد mongo |
|volume_browser_enabled| boolean| false| آیا سرویس مدیریت Dedicated Volume برای این سرویس ساخته شود یا خیر|

:::tip راهنمایی
توجه داشته باشید که سرویس ‌MongoDB برای آنکه بتواند داده‌های خود را ذخیره کند و از سرعت و کارایی مناسبی برخوردار باشد باید حتما به یک [dedicated volumes] [dedicated_volumes] متصل شود در غیر این صورت با خطا مواجه شده و سرویس به درستی عمل نمی‌کند.
:::

:::note توجه
توجه داشته باشید برای استفاده از قابلیت Volume Browser سرویس شما باید به یک Dedicated Volume متصل باشد؛ در غیر این صورت با خطای سرور مواجه خواهید شد.
:::

به عنوان مثال برای دیپلوی کردن یک MongoDB می‌توانیم به این شکل یک سرویس بسازیم:

```bash
  fandogh managed-service deploy mongodb 4.2 \
       -c service_name=test-mongo \
       -c mongo_init_root_password=pass123 \
       -c mongo_init_root_username=test-user \
       -c volume_name=mongo-volume
```

این دستور یک سرویس MongoDB ایجاد می‌کند که:
- نام آن test-mongo )یعنی در شبکه داخلی فضانام شما باقی سرویس‌ها از طریق نام test-mongo و بر روی پورت 27017 می‌توانند به آن متصل شوند( است .
- نام کاربری سرویس test-user است.
- رمز عبور آن pass123 است.
- و نام volume که به آن متصل بوده و داده‌های خود را بر روی آن ذخیره می‌کند mongo-volume است.

:::caution نکته
برای استفاده از سرویس MongoDB باید به نکته زیر توجه داشته باشید:
برای حفط مسائل امنیتی سرویس MongoDB به صورت یک [Internal Service] [internal_service] عمل می‌کند و شما خارج از namespace خود به آن دسترسی ندارید.
:::

## افزودن دامنه دلخواه
اگر قصد داشته باشید دامنه یا دامنه‌های دلخواهتان را به سرویس مدیریت شده مورد نظر متصل نمایید، از طریق این بخش می‌توانید لیست این دامنه‌ها را مشخص کنید.<br/>
برای مثال فرض کنید تمایل دارید سرویس مدیریت شده مورد نظر شما روی  [domain.com] [domain]  و  [www.domain.com] [www_doamin]  در دسترس باشد:

```yaml
  domains:
     - name: domain.com
     - name: www.domain.com
     ...
```

بدین شکل بخش دامنه را به مانیفست سرویس خود اضافه کرده و آن را مستقر نمایید:

```yaml title="mongodb_deployment.yml"
kind: ManagedService
name: test-mongo
spec:
  service_name: mongodb
  version: 4.2
  parameters:
    - name: mongodb_init_root_username
      value: YOUR_USERNAME
    - name: mongodb_init_root_password
      value: YOUR_PASSWORD
    - name: mongodb_init_database
      value: main
    - name: volume_name
      value: YOUR_VOLUME_NAME
    - name: mongo_dashboard_enabled
      value: 'true'
    - name: mongo_dashboard_username
      value: YOUR_DASHBOARD_USERNAME
    - name: mongo_dashboard_password
      value: YOUR_DASHBOARD_PASSWORD
  domains:
  - name: domain.com
  - name: www.domain.com
  resources:
      memory: 512Mi
```

:::note توجه
توجه داشته باشید، دامنه‌هایی که به سرویس مدیریت شده MongoDB اضافه می‌شوند، در اصل به داشبورد مدیریتی آن متصل می‌شوند، نه خود سرویس دیتابیس.
:::

## Deploy With Manifest  

شما همچنین می توانید برای اجرای راحت تر سرویس های مدیریت شده از [مانیفست] [service_manifest] همانند مثال زیر استفاده کنید.

- مانیفست MongoDB بدون داشبورد مدیریتی

```yaml title="mongodb_deployment.yml"
kind: ManagedService
name: test-mongo
spec:
  service_name: mongodb
  version: 4.2
  parameters:
    - name: mongodb_init_root_username
      value: YOUR_USERNAME
    - name: mongodb_init_root_password
      value: YOUR_PASSWORD
    - name: mongodb_init_database
      value: main
    - name: volume_name
      value: YOUR_VOLUME_NAME
  resources:
      memory: 512Mi
```

- مانیفست MongoDB همراه با داشبورد مدیریتی

```yaml title="mongodb_deployment.yml"
kind: ManagedService
name: test-mongo
spec:
  service_name: mongodb
  version: 4.2
  parameters:
    - name: mongodb_init_root_username
      value: YOUR_USERNAME
    - name: mongodb_init_root_password
      value: YOUR_PASSWORD
    - name: mongodb_init_database
      value: main
    - name: volume_name
      value: YOUR_VOLUME_NAME
    - name: mongo_dashboard_enabled
      value: 'true'
    - name: mongo_dashboard_username
      value: YOUR_DASHBOARD_USERNAME
    - name: mongo_dashboard_password
      value: YOUR_DASHBOARD_PASSWORD
  resources:
      memory: 512Mi
```

[mongodb_site]: https://mongodb.com
[internal_service]: /docs/services/services#%DB%B1--%D8%B3%D8%B1%D9%88%DB%8C%D8%B3-%D9%87%D8%A7%DB%8C-%D8%AF%D8%A7%D8%AE%D9%84%DB%8C-%DB%8C%D8%A7-internal-service
[dedicated_volume]: /docs/volumes/dedicated-volume
[www_domain]: http://www.domain.com
[domain]: http://domain.com
[service_manifest]: /docs/services/service-manifest
