---
id: source-nodejs
title: پروژه‌های Nodejs
sidebar_label: پروژه‌های Nodejs 
description: 'در این بخش به توضیح چگونگی دیپلوی کردن سرویس Nodejs Project بدون نیاز به دانش docker می‌پردازیم.'
keywords:
  - "سکوی ابری"
  - داکر
  - service
  - container
  - "اجرای مستقیم کد"
  - node
  - nodejs
  - framework
  - "نود جی اس"
  - نود
  - "source deployment"
  - "سرویس داکری"
  - docker
  - "سکوی ابری فندق"
  - "زیرساخت ابری"
image: /img/docs/thumbnails/source-deployments/nodejs-thumbnail.png
---

## ![Node.js Framework](/img/docs/node-js-banner.svg "Node.js Framework")

دیپلوی کردن سرویس‌ها بر روی فندق برای کاربرانی که با docker کار نکرده‌اند ممکن است مقداری مبهم باشد؛ همینطور معمولا آماده سازی پروژه‌ها برای اجرا در محیط واقعی نیاز به تنظیماتی دارد که باعث پیچیده شدن کار برنامه‌نویس می‌شود.<br/>
ما در این بخش به توضیح چگونگی دیپلوی کردن سرویس `Nodejs Project` بدون نیاز به دانش docker می‌پردازیم.

:::tip fandogh-cli setup
اگر هنوز fandogh-cli بر روی کامپیوتر شما نصب نیست از طریق این [مستند] [getting_started] می‌توانید cli را بر روی کامپیوتر خود نصب کنید.
:::

در پوشه اصلی پروژه، بعد از اینکه در فندق login کردید دستور `fandogh source init` را اجرا کنید. در اولین مرحله شما می‌بایست اسم سرویس رو انتخاب نمایید.

```
Service Name: MyNodeJSWebsite
```

 بعد از وارد کردن نام service برای شما گزینه هایی که بدون نیاز به دانش docker قابل اجرا هستند نمایش داده می‌شود. از بین گزینه های نمایش داده شده گزینه **Nodejs Project** را انتخاب کنید.

:::note توجه
توجه داشته باشید  برای انتخاب٬ شماره گزینه مورد نظر را وارد کنید.
:::

```yaml
-[1] Static Website
-[2] Django Project
-[3] Laravel Project
-[4] ASP.NET Core Project
-[5] Nodejs Project
Please choose one of the project types above:
```
در قسمت بعدی شما باید context را وارد کنید. اگر در حال حاضر در پوشه اصلی نیستید می توانید آدرس آن را وارد کنید یا در غیر این صورت خالی بگذارید و دکمه enter را فشار دهید.

```
The context directory [.]:
```

گزینه بعدی انتخاب ورژن nodejs است که با وارد کردن ورژن می توانید این قسمت را رد کنید. 

```
The Node version: 10
```

پس از مشخص کردن اطلاعات فوق، فایلی با نام fandogh.yml در پوشه جاری شما ساخته می‌شود. 
اکنون با نوشتن دستور `fandogh source run` می‌توانید پروژه خودتان را بر روی فندق دیپلوی کنید.

:::tip راهنمایی
پس از هر بار تغییر در پروژه تنها کافیست که دستور fandogh source run را مجددا اجرا کنید. 
فایل `fandogh.yml` می‌تواند شامل تمام بخش‌هایی که در [مانیفست] [service_manifest] فندق است باشد٬ شما به صورت دستی قادر هستید تا بخش‌های مورد نیاز این فایل را تغییر دهید.
:::

[getting_started]: /docs/preface/getting-started
[service_manifest]: /docs/services/service-manifest
