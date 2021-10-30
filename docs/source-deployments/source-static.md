---
id: source-static
title: Static Website
sidebar_label: وب سایت‌های ایستا 
description: 'در این بخش به توضیح چگونگی دیپلوی کردن سرویس Static Website بدون نیاز به دانش docker می‌پردازیم.'
keywords:
  - "سکوی ابری"
  - داکر
  - service
  - container
  - "اجرای مستقیم کد"
  - html
  - static
  - website
  - "static website"
  - "source deployment"
  - "سرویس داکری"
  - docker
  - "سکوی ابری فندق"
  - "زیرساخت ابری"
image: /img/docs/thumbnails/source-deployments/static-website-thumbnail.png
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## ![Static Website](/img/docs/static-website-banner.svg "Static Website")

دیپلوی کردن سرویس‌ها بر روی فندق برای کاربرانی که با docker کار نکرده‌اند ممکن است مقداری مبهم باشد؛ همینطور معمولا آماده سازی پروژه‌ها برای اجرا در محیط واقعی نیاز به تنظیماتی دارد که باعث پیچیده شدن کار برنامه‌نویس می‌شود.<br/>
ما در این بخش به توضیح چگونگی دیپلوی کردن سرویس `Static Website` بدون نیاز به دانش docker می‌پردازیم.

:::tip fandogh-cli setup
اگر هنوز fandogh-cli بر روی کامپیوتر شما نصب نیست از طریق این [مستند] [getting_started] می‌توانید cli را بر روی کامپیوتر خود نصب کنید.
:::

## فیلم های آموزشی

<Tabs
  groupId="static-website-source-deployment-tutorials"
  defaultValue="deploy"
  values={[
    {label: 'استقرار', value: 'deploy'},
    {label: 'دامنه دلخواه', value: 'domains'},
  ]
}>
<TabItem value="deploy">
<figure class="video-container">
  <video src="https://media.fandogh.cloud/tutorials/source-deployments/static-website/html-source-deploy.mp4" controls></video>
</figure>
</TabItem>

<TabItem value="domains">
<figure class="video-container">
  <video src="https://media.fandogh.cloud/tutorials/source-deployments/static-website/html-add-domain.mp4" controls></video>
</figure>
</TabItem>

</Tabs>


## مستندات قدم به قدم

در پوشه اصلی پروژه، بعد از اینکه در فندق login کردید دستور `fandogh source init` را اجرا کنید. در اولین مرحله شما می‌بایست اسم سرویس رو انتخاب نمایید.

```
Service Name: mystaticweb
```

 بعد از وارد کردن نام service  برای شما گزینه هایی که بدون نیاز به دانش docker قابل اجرا هستند نمایش داده می شود. از بین گزینه های نمایش داده شده٬ **Static Website** را انتخاب کنید.

:::note توجه
توجه داشته باشید برای انتخاب، شماره گزینه مورد نظر را وارد کنید.
:::

```yaml
-[1] Static Website
-[2] Django Project
-[3] Laravel Project
-[4] ASP.NET Core Project
-[5] Nodejs Project
-[6] Spring Boot
...
Please choose one of the project types above:
```

در قسمت بعدی شما باید context )`همان پوشه‌ای که خروجی برنامه شما در آن قراره گرفته است`( را وارد کنید. اگر در حال حاضر در پوشه اصلی نیستید می توانید آدرس آن را وارد کنید یا در غیر این صورت خالی بگذارید و دکمه enter را فشار دهید. 

```
The context directory [.]:
```

 بعد از اینکه گزینه مورد نظر را انتخاب کردید فایلی با نام **fandogh.yml** حاوی اطلاعات مورد نیاز برای دیپلوی سرویس شما به پوشه‌ای که در آن قرار دارید اضافه خواهد شد. <br/> 
حالا با استفاده از دستور `fandogh source run‍‍‍` می‌توانید سرویس خود را بر روی فندق دیپلوی کنید. بعد از اجرای این دستور مراحل **build** و **deploy** آغاز خواهد شد و در کمتر از یک دقیقه وب سایت شما بر روی فندق قابل دسترس خواهد بود. 

:::tip راهنمایی
پس از هر بار تغییر در پروژه تنها کافیست که دستور `fandogh source run` را مجددا اجرا کنید. فایل ```fandogh.yml``` می‌تواند شامل تمام بخش‌هایی که در [مانیفست] [service_manifest] فندق است باشد و شما به صورت دستی قادر هستید بخش‌های مورد نیاز این فایل را تغییر دهید.
:::

[getting_started]: /docs/preface/getting-started
[service_manifest]: /docs/services/service-manifest
