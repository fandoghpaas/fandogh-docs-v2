---
id: source-fastapi
title: پروژه‌های FastAPI 
sidebar_label: پروژه‌های FastAPI 
description: 'در این بخش به توضیح چگونگی دیپلوی کردن سرویس FastAPI Project بدون نیاز به دانش docker می‌پردازیم.'
keywords:
- "سکوی ابری"
- داکر
- service
- container
- python
- FastApi
- فست ای پی آی 
- پایتون
- "fastapi project"
- framework
- "اجرای مستقیم کد"
- "source deployment"
- "سرویس داکری"
- docker
- "سکوی ابری فندق"
- "زیرساخت ابری"
image: /img/docs/thumbnails/source-deployments/fastapi-thumbnail.png
---

## ![FastAPI Project](/img/docs/fastapi-banner.svg "FastAPI Project")

دیپلوی کردن سرویس‌ها بر روی فندق برای کاربرانی که با docker کار نکرده‌اند ممکن است مقداری مبهم باشد؛ همینطور معمولا آماده سازی پروژه‌ها برای اجرا در محیط واقعی نیاز به تنظیماتی دارد که باعث پیچیده شدن کار برنامه‌نویس می‌شود.<br/>
ما در این بخش به توضیح چگونگی دیپلوی کردن سرویس `FastAPI Project` بدون نیاز به دانش docker می‌پردازیم.

:::tip fandogh-cli setup
اگر هنوز fandogh-cli  فندق بر روی کامپیوتر شما نصب نیست از طریق این [مستند] [getting_started] می‌توانید cli را بر روی کامپیوتر خود نصب کنید.
:::

در پوشه اصلی پروژه، بعد از اینکه در فندق لاگین کردید دستور `fandogh source init` را اجرا کنید. در اولین مرحله شما می‌بایست اسم سرویس را انتخاب نمایید.

```
Service Name: mywebsite
```

بعد از وارد کردن نام service  برای شما گزینه هایی که بدون نیاز به دانش docker قابل اجرا هستند نمایش داده می‌شود. از بین گزینه های نمایش داده شده گزینه **FastAPI Project** را انتخاب کنید.

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
-[8] FastAPI Project
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

گزینه بعدی انتخاب ورژن پایتون است که به صورت پیش فرض ورژن 3.8 است. شما با وارد کردن ورژن مورد نظر خود می‌توانید آن را تغییر دهید.

```
Python version [3.8]: 3.6
```

:::caution نکته
حتما در نظر داشته باشید ورژن پایتون شما باید یکی از ورژن های 3.6 ،3.7 و 3.8 باشد.
:::
بعد از اینکه گزینه **FastAPI Project** را انتخاب کردید فندق از شما نام ماژول `WSGI_MODULE` را خواهد پرسید..<br/>
**منظور از فایل WSGI_MODULE فایل پایتونی است که شما application fastapi خود را تعریف کرده اید. **


```yaml
The name of the module.:
```

:::tip راهنمایی
در نظر داشته باشید فقط اسم فایل و بدون پسوند وارد کنید. به عنوان مثال اگر app شما در فایلی به اسم main.py است فقط اسم فایل یعنی main را وارد کنید.
اگر فایل شما در پوشه‌ای قرار دارد اسم پوشه را هم وارد کنید. به عنوان مثال اگر فایل main شما در پوشه‌ای به اسم 
project است شما باید project.main وارد کنید. 
:::


:::caution نکته
فندق پروژه شما را با استفاده از uvicorn-gunicorn دیپلوی می‌کند. به همین دلیل حتما باید instance‌ای که از fastapi می‌سازید به اسم app باشد. در غیر این صورت هنگام راه اندازی سرویس با خطا مواجه خواهید شد. مانند مثال زیر عمل کنید:
```
app = FastAPI()
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
