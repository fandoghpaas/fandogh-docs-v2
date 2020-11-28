---
id: proxy-managed-service
title: Proxy
sidebar_label: Proxy
description: 'هنگامی که شما سرویس‌های خود را دیپلوی می‌کنید، سکوی ابری فندق ترافیک خروجی سرویس شما را بر روی IP های متفاوتی برمی‌گرداند. این حالت در برخی شرایط که نیاز به یک IP Address مشخص وجود دارد، کار را کمی دشوار می‌کند.'
keywords:
  - "سکوی ابری"
  - "سرویس‌های مدیریت شده"
  - سرویس
  - داکر
  - proxy
  - "managed services"
  - "سکوی ابری فندق"
  - "زیرساخت ابری"
image: /img/docs/thumbnails/managed-services/proxy-managed-service-thumbnail.png
---

![Proxy](/img/docs/proxy-managed-service.png "Proxy")

هنگامی که شما سرویس‌های خود را دیپلوی می‌کنید، سکوی ابری فندق ترافیک خروجی سرویس شما را بر روی IP های متفاوتی برمی‌گرداند.<br/>
این حالت در برخی شرایط که نیاز به یک `IP Address` مشخص وجود دارد، کار را کمی دشوار می‌کند.<br/>
برای اینکه بتوانید از این مشکل جلوگیری به عمل آورید می‌توانید از `Proxy Managed Service` استفاده کنید. تنها کافی‌ است با استفاده از دستور `fandogh managed-service deploy proxy 1 -c service_name=proxy-server`  یک سرویس Proxy ایجاد کرده و داخل سرویسی که می‌خواهید ترافیک خروجی آن بر روی `Range IP` مشخصی قرار گیرد تنظیم می‌کنید که این سرویس، responseهای خود را به **proxy-server:3128** هدایت  کند.<br/><br/>
برای اینکه بتوانید این سرویس را دیپلوی کنید، پارامتر‌های زیر را می‌توانید مشخص کنید:

|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| proxy| نامی که برای سرویس مایلید در نظر گرفته شود|

## Deploy With Manifest
  
شما همچنین می توانید برای اجرای راحت تر سرویس های مدیریت شده از [مانیفست] [service_manifest] همانند مثال زیر استفاده کنید.

```yaml title="proxt_deployment.yml"
kind: ManagedService
name: proxy-server
spec:
  service_name: proxy
  version: latest
  resources:
      memory: 800Mi
```

[service_manifest]: /docs/services/service-manifest