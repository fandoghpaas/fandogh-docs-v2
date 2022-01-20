---
id: source-flask
title: پروژه‌های Flask
sidebar_label: پروژه‌های Flask 
description: 'در این بخش به توضیح چگونگی دیپلوی کردن سرویس Flask Project بدون نیاز به دانش docker می‌پردازیم.'
keywords:
  - "سکوی ابری"
  - داکر
  - service
  - container
  - python
  - Flask
  - فلسک
  - پایتون
  - "flask project"
  - framework
  - "اجرای مستقیم کد"
  - "source deployment"
  - "سرویس داکری"
  - docker
  - "سکوی ابری فندق"
  - "زیرساخت ابری"
image: /img/docs/thumbnails/source-deployments/flask-thumbnail.png
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## ![Flask Project](/img/docs/flask-banner.svg "Flask Project")

دیپلوی کردن سرویس‌ها بر روی فندق برای کاربرانی که با docker کار نکرده‌اند ممکن است مقداری مبهم باشد؛ همینطور معمولا آماده سازی پروژه‌ها برای اجرا در محیط واقعی نیاز به تنظیماتی دارد که باعث پیچیده شدن کار برنامه‌نویس می‌شود.<br/>
ما در این بخش به توضیح چگونگی دیپلوی کردن سرویس `Flask Project` بدون نیاز به دانش docker می‌پردازیم.

:::tip fandogh-cli setup
اگر هنوز fandogh-cli  فندق بر روی کامپیوتر شما نصب نیست از طریق این [مستند] [getting_started] می‌توانید cli را بر روی کامپیوتر خود نصب کنید.
:::

## فیلم های آموزشی

<Tabs
  groupId="flask-source-deployment-tutorials"
  defaultValue="deploy"
  values={[
    {label: 'استقرار', value: 'deploy'},
    {label: 'دامنه دلخواه', value: 'domains'},
  ]
}>
<TabItem value="deploy">
<figure class="video-container">
  <video src="https://media.fandogh.cloud/tutorials/source-deployments/flask/flask-source-deploy.mp4" controls></video>
</figure>
</TabItem>

<TabItem value="domains">
<figure class="video-container">
  <video src="https://media.fandogh.cloud/tutorials/source-deployments/flask/flask-add-domain.mp4" controls></video>
</figure>
</TabItem>

</Tabs>

## مستندات قدم به قدم

در پوشه اصلی پروژه، بعد از اینکه در فندق لاگین کردید دستور `fandogh source init` را اجرا کنید. در اولین مرحله شما می‌بایست اسم سرویس را انتخاب نمایید.

```
Service Name: mywebsite
```

 بعد از وارد کردن نام service  برای شما گزینه هایی که بدون نیاز به دانش docker قابل اجرا هستند نمایش داده می‌شود. از بین گزینه های نمایش داده شده گزینه **Flask Project** را انتخاب کنید.

:::note توجه
توجه داشته باشید  برای انتخاب، شماره گزینه مورد نظر را وارد کنید.
:::

```yaml
-[1] Static Website
-[2] Django Project
-[3] Flask Project
-[4] Laravel Project
-[5] ASP.NET Core Project
-[6] Nodejs Project
-[7] Spring Boot
...
Please choose one of the project types above:
```

:::caution نکته
حتما در نظر داشته باشید فایل requirements.txt در root directory پروژه مورد نظرتان وجود داشته باشد؛ در غیر این صورت پیغام خطای عدم وجود این فایل را دریافت خواهید کرد.
:::

در قسمت بعدی شما باید context را وارد کنید. اگر در حال حاضر در پوشه اصلی نیستید می توانید آدرس آن را وارد کنید یا در غیر این صورت خالی بگذارید و دکمه enter را فشار دهید.

```
The context directory [.]:
```

گزینه بعدی انتخاب ورژن پایتون است که به صورت پیش فرض ورژن 3.7 است. شما با وارد کردن ورژن مورد نظر خود می‌توانید آن را تغییر دهید. 

```
Python version [3.7]: 3.5
```

 بعد از اینکه گزینه **Flask Project** را انتخاب کردید فندق از شما نام ماژول `WSGI_MODULE` را خواهد پرسید..<br/>
**منظور از فایل WSGI_MODULE فایل پایتونی است که شما application flask خود را تعریف کرده اید. **


```yaml
The name of the module.:
```

:::tip راهنمایی
در نظر داشته باشید فقط اسم فایل و بدون پسوند وارد کنید. به عنوان مثال اگر application شما در فایلی به اسم app.py است فقط اسم فایل یعنی app را وارد کنید.
:::


:::caution نکته
فندق پروژه شما را با استفاده از Gunicorn دیپلوی می‌کند. به همین دلیل حتما باید instance‌ای که از FLASK می‌سازید به اسم application باشد. در غیر این صورت هنگام راه اندازی سرویس با خطا مواجه خواهید شد. مانند مثال زیر عمل کنید:
```
application = Flask(__name__, static_url_path='/static')
```
:::


پس از مشخص کردن اطلاعات فوق، فایلی با نام fandogh.yml در پوشه جاری شما ساخته می‌شود. 
اکنون با نوشتن دستور `fandogh source run` می توانید پروژه خودتان را بر روی فندق دیپلوی کنید.

:::tip راهنمایی
پس از هر بار تغییر در پروژه تنها کافیست که دستور fandogh source run را مجددا اجرا کنید. 
فایل `fandogh.yml` می‌تواند شامل تمام بخش‌هایی که در [مانیفست] [service_manifest] فندق است باشد٬ شما به صورت 
دستی قادر هستید تا بخش‌های مورد نیاز این فایل را تغییر دهید.
:::

[getting_started]: /docs/preface/getting-started
[mysql_managed_service]: /docs/managed-services/mysql-managed-service
[service_manifest]: /docs/services/service-manifest
