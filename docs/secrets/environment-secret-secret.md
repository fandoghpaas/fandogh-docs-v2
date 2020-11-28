---
id: environment-secret-secret
title: Environment Secret
sidebar_label: Environment Secret
description: 'در بیشتر مواقع سرویس‌ها نیاز دارند تا برخی از داده‌های خود را از طریق Environment Variableهای ذخیره شده بر روی سیستم عامل یا محیطی که در آن اجرا شده‌اند به دست آورند...'
keywords:
  - "سکوی ابری"
  - داکر
  - secret
  - env
  - "environment variable"
  - سکرت
  - فضانام
  - "سکوی ابری فندق"
  - "زیرساخت ابری"
image: /img/fandogh.png
---
## Environment-Secret

در بیشتر مواقع سرویس‌ها نیاز دارند تا برخی از داده‌های خود را از طریق Environment Variableهای ذخیره شده بر روی سیستم عامل یا محیطی که در آن اجرا شده‌اند به دست آورند.<br/><br/>
شما نیز می‌توانید داخل سکوی ابری فندق در بخش مانیفست هر سرویس مشخص کنید چه Environment Variableهایی به هنگام استقرار سرویس ایجاد شده و ذخیره شوند.<br/><br/>
اما مشکلی که ممکن است برای شما رخ دهد این است که بطور مثال در برخی مواقع صلاح نمی‌دانید که توسعه‌دهنده‌ای از بخش دیگر یا فردی خارج از تیم شما، به مقدار این متغیرها دسترسی داشته باشد!<br/><br/>
برای این منظور شما می‌توانید هر Environment Variable را به صورت یک سکرت ایجاد کرده و مقدار مورد نظر را در آن ذخیره کنید.<br/><br/>
 بعد از این کار، مقادیر از دید پنهان شده و فقط شخصی که سکرت را ساخته می‌داند مقدار درون سکرت چیست و هیچ کس دیگری به آن دسترسی ندارد.<br/><br/>
این دست سکرت‌ها از نوع `environment-secret` هستند و با توجه به مثال زیر می‌توانید آن‌ها را بسازید:

```bash
fandogh  secret create  \
          --name SECRET_NAME \
          -t environment-secret \
          -f SECRET_KEY=SECRET_VALUE \
```

پارامتر‌هایی که برای این دستور استفاده شده است عبارتند از:

**name--**<br/>
برای مشخص کردن نام Secret، که از طریق این نام مشخص می‌کنید هنگام ساخت Environment Variable از کدام Secret باید استفاده شود.

**t-** یا **type**<br/>
که نوع Secret را مشخص می‌کند، در اینجا برای نیاز بخصوصی که داریم باید `environment-secret` را قرار دهیم.

**f-**<br/>
که فیلد‌های داخل Secret را مشخص می‌کند. هر Secret فیلد‌های خاص خودش را داراست که باید با توجه به مستندات مقادیر مورد نظر خود را مشخص کنید.

:::caution نکته
توجه داشته باشید که environment-secret تنها می‌تواند یک فیلد داشته باشد که اجباری است و نام کلید آن باید SECRET_KEY باشد، در غیر این صورت با خطای سرور مواجه خواهید شد.
:::

:::tip راهنمایی
در نظر داشته باشید که نام سکرت فقط شامل حروف کوچک ، - ، اعداد و . می تواند باشد. 
:::
 
بعد از اجرای دستور create می‌توانید لیست Secret های خود را بررسی کنید تا مطمئن شوید Secret به درستی ساخته شده است:

```bash
fandogh secret list
```

این دستور لیست تمام secret های شما را نمایش می دهد.

### نمونه استفاده از enviroment secret در مانیفست

```yaml title="svc_deployment.yml"
kind: ExternalService
name: nginx
spec:
  image: library/nginx:alpine
  image_pull_policy: Always
  env:
   - name: SAMPLE_ENV
     secret: my-secret-name
  resources:
      memory: 800Mi
```
