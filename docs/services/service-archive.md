---
id: service-archive
title: آرشیو سرویس
sidebar_label: آرشیو سرویس
description: 'اگر قصد دارید سرویسی را موقتا از چرخه خارج کنید، بدون آنکه تنظیمات آن حذف شود، می‌توانید از ویژگی آرشیو سرویس سکوی ابری فندق استفاده کنید...'
keywords:
  - "سکوی ابری فندق"
  - "زیرساخت ابری"
  - "سکوی ابری"
  - داکر
  - service
  - container
  - سرویس
  - مانیفست
  - manifest
  - "سرویس داکری"
  - docker
  - "آرشیو سرویس"
  - "سکوی ابری فندق"
  - "زیرساخت ابری"
image: /img/docs/thumbnails/services/service-archive-thumbnail.png
---

![Service Archive](/img/docs/service-archive-banner.svg "Service Archive")

شاید مواقعی پیش آمده باشد که موقتا تصمیم گرفته باشید سرویس فعال خود را از مدار خارج کنید ولی فراموش کرده باشید که فایل مانیفست آن را در جایی ذخیره کنید یا برای استقرار دوباره به آن دسترسی نداشته باشید.<br/><br/>
یکی از روش‌ها برای این موضوع توقف موقت یا Pause خواهد بود اما این روش هزینه‌بر است چرا که کاربر باید میزان مشخصی از منابع موجود را به سرویس pause شده تخصیص دهد!<br/><br/>
روش دیگری که سکوی ابری فندق ارائه می‌دهد، قابلیت `آرشیو کردن سرویس` است؛ به این صورت که کاربر می‌تواند در هنگام حذف کردن سرویس، آن را ابتدا آرشیو و بعد حذف کند.<br/><br/>
برای مشخص شدن روند به شکل زیر توجه کنید:

![Service Archive Procedure](/img/docs/service-archive-procedure.svg "Service Archive Procedure")

همانطور که در تصویر بالا مشاهده می‌کنید، کاربر درخواستی مبنی بر حذف سرویس با نام `svc` را به سرور ارسال می‌کند. بعد از آنکه درخواست به سرورهای فندق رسید بررسی ۲ حالت رخ خواهد داد:
- اگر درخواست حذف بدون آرشیو باشد، سکو به صورت مستقیم و همانطور که در شکل `)Destroy Without Archive(` نمایش داده، سرویس را از فضانام کاربر حذف می‌کند.
- اگر درخواست حذف با آرشیو باشد، سکو ابتدا تنظیمات سرویس را ذخیره و سپس در صورت موفقیت آمیز بودن روند آرشیو، سرویس را از فضانام کاربر حذف می‌کند.

:::danger هشدار
توجه داشته باشید در روند آرشیو، سکو آخرین مانیفست از سرویس فعلی شما را با نام همان سرویس ذخیره می‌کند و در صورتی که سرویس دیگری با همان نام را آرشیو کنید، مانیفست جدید جایگزین مانیفست قبلی خواهد شد، لذا قبل از آرشیو از درستی روند اطمینان حاصل کنید.
:::

## آرشیو کردن سرویس
کاربران به دو روش قادر به آرشیو کردن سرویس‌های خود خواهند بود:
- با استفاده از داشبورد مدیریتی بخش سرویس‌ها یا جزئیات سرویس، گزینه `حذف و آرشیو سرویس` را انتخاب نمایید.
- با استفاده از دستور `destroy` در `fandogh-cli`.

```bash title="destroy and archive service"
fandogh service destroy --name SERVICE_NAME --archived
```

همانظور که در دستور بالا مشاهده می‌کنید، با قرار دادن پارامتر `archived--` شما به سکو اطلاع می‌دهید که سرویس مورد نظر با نام `SERVICE_NAME` قبل از حذف آرشیو شد.

## ساخت سرویس از آرشیو

برای آنکه بتوانید سرویس خود را از آرشیو سرویس‌ها مستقر کنید می‌توانید به دو روش زیر عمل کنید:
- با مراجعه به صفحه سرویس‌ها در داشبورد مدیریتی و انتخاب گزینه `سرویس‌های آرشیو شده`، آرشیو مورد نظر را پیدا و سپس از منو موجود، گزینه `راه‌اندازی سرویس` را انتخاب نمایید.
- با استفاده از دستور `fandogh service apply` موجود در `fandogh-cli` :
‍
```bash title="Deploy Service From Archive"
fandogh service apply --from-archive ARCHIVE_NAME
```
با استفاده از دستور بالا و قرار دادن نام آرشیو به جای `ARCHIVE_NAME` می‌توانید سرویس مورد نظر را بر روی فضانام خود مستقر نمایید.

## مدیریت آرشیو سرویس‌ها
شما می‌توانید با استفاده از `داشبورد مدیریتی` یا `fandogh-cli` آرشیو سرویس‌های خود را مدیریت کنید.

### مشاهده لیست آرشیوها

- **داشبور مدیریتی**: با مراجعه به صفحه سرویس‌ها و انتخاب گزینه `سرویس‌های آرشیو شده` می‌توانید لیست سرویس‌های آرشیو شده را مشاهده کنید.
- **Fandogh CLI**: با استفاده از دستور زیر در `fandogh-cli` می‌توانید لیست سرویس‌های آرشیو شده را مشاهده کنید:

```bash title="Service Archive List"
fandogh service archive list
```

### حذف آرشیو سرویس

- **داشبور مدیریتی**: با مراجعه به صفحه سرویس‌ها و انتخاب گزینه `سرویس‌های آرشیو شده` از لیست آرشیو نمایش داده شده، آرشیو مورد نظر را انتخاب و از طریق منو آن گزینه `حذف آرشیو` را انتخاب نمایید.
- **Fandogh CLI**: با استفاده از دستور زیر در `fandogh-cli` می‌توانید لیست آرشیو سرویس مورد نظر خود را حذف کنید:

```bash title="Service Archive Delete"
fandogh service delete --name ARCHIVE_NAME
```
همانطور که در دستور بالا مشاهده می‌کنید، با قرار دادن نام آرشیو سرویس به جای متغیر `ARCHIVE_NAME` می‌توانید آن را حذف کنید.

##  مدیریت آرشیو سرویس‌ها در CLI

![ CLI Image](/img/docs/cli_image.svg "CLI Image")

:::tip fandogh-cli
شما همچنین می توانید با وارد کردن دستور`fandogh service archive --help` در fandogh-cli لیست دستورات موجود را مشاهده کنید.
:::

###  list
با استفاده از دستور `fandogh service archive list` می‌توانید لیست آرشیو سرویس‌های موجود خود را مشاهده کنید.

###  delete
با وارد کردن دستور `fandogh service archive delete --name ARCHIVE_NAME` می‌توانید آرشیو سرویس با نام `ARCHIVE_NAME` حذف نمایید.

**name--** یا **n-** <br/>
پارامتر name یا n نمایانگر نام آرشیو سرویسی است که می‌خواهید آن را حذف کنید.

