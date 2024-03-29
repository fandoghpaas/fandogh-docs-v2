---
id: source-spring-boot
title: پروژه‌های Spring Boot
sidebar_label: پروژه‌های Spring Boot 
description: 'در این بخش به توضیح چگونگی دیپلوی کردن سرویس Spring Boot بدون نیاز به دانش docker می‌پردازیم.'
keywords:
  - "سکوی ابری"
  - داکر
  - service
  - container
  - "اجرای مستقیم کد"
  - java
  - spring
  - framework
  - "spring boot"
  - hibernate
  - "source deployment"
  - "سرویس داکری"
  - docker
  - "سکوی ابری فندق"
  - "زیرساخت ابری"
image: /img/docs/thumbnails/source-deployments/springboot-thumbnail.png
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## ![Spring Boot](/img/docs/spring-boot-banner.svg "Spring Boot")

دیپلوی کردن سرویس‌ها بر روی فندق برای کاربرانی که با docker کار نکرده‌اند ممکن است مقداری مبهم باشد؛ همینطور معمولا آماده سازی پروژه‌ها برای اجرا در محیط واقعی نیاز به تنظیماتی دارد که باعث پیچیده شدن کار برنامه‌نویس می‌شود.<br/>
ما در این بخش به توضیح چگونگی دیپلوی کردن سرویس `Spring Boot` بدون نیاز به دانش docker می‌پردازیم.<br/>
برای build پروژه‌های جاوایی معمولا از ابزار‌هایی نظیر `Apache Maven` و یا `Gradle` استفاده می‌شود؛ خوشبختانه فندق از هر دو این Build Toolsها پشتیبانی می‌کند. 
  
:::tip fandogh-cli setup
اگر هنوز fandogh-cli بر روی کامپیوتر شما نصب نیست از طریق این [مستند] [getting_started] می‌توانید cli را بر روی کامپیوتر خود نصب کنید.
:::

## فیلم های آموزشی

<Tabs
  groupId="spring-boot-source-deployment-tutorials"
  defaultValue="deploy"
  values={[
    {label: 'استقرار', value: 'deploy'},
    {label: 'دامنه دلخواه', value: 'domains'},
  ]
}>
<TabItem value="deploy">
<figure class="video-container">
  <video src="https://media.fandogh.cloud/tutorials/source-deployments/spring-boot/spring-source-deploy.mp4" controls></video>
</figure>
</TabItem>

<TabItem value="domains">
<figure class="video-container">
  <video src="https://media.fandogh.cloud/tutorials/source-deployments/spring-boot/spring-add-domain.mp4" controls></video>
</figure>
</TabItem>

</Tabs>


## مستندات قدم به قدم
  
در پوشه اصلی پروژه، بعد از اینکه در فندق login کردید دستور `fandogh source init` را اجرا کنید. در اولین مرحله شما می‌بایست اسم سرویس رو انتخاب نمایید.

```
Service Name: spring-boot-test  
```    
  
 بعد از وارد کردن نام service  برای شما گزینه‌هایی که بدون نیاز به دانش docker قابل اجرا هستند نمایش داده می‌شود. از بین گزینه هایی که نمایش داده شده‌اند **Spring Boot** را انتخاب کنید.  
  
:::note توجه
توجه داشته باشید  برای انتخاب، شماره گزینه مورد نظر را وارد کنید.
:::
  
```yaml {6}
-[1] Static Website
-[2] Django Project
-[3] Laravel Project
-[4] ASP.NET Core Project
-[5] Nodejs Project
-[6] Spring Boot
...
Please choose one of the project types above: 6
```  

در قسمت بعدی شما باید context را وارد کنید. اگر در حال حاضر در پوشه اصلی نیستید می توانید آدرس آن را وارد کنید یا در غیر این صورت خالی بگذارید و دکمه enter را فشار دهید.
  
```  
The context directory [.]:  
```  
  
گزینه بعدی انتخاب نسخه `JDK` است؛ در حال حاضر به صورت پیش‌فرض نسخه ۱۱ انتخاب شده است ولی شما می‌توانید دیگر نسخه‌های رایج جاوا را نیز انتخاب کنید.
  
```  
JDK Version [11]:
```  
  
 گزینه بعدی مشخص کردن نام ‍‍`JAR file`ای است که build پروژه شما تولید می‌کند. اگر نحوه نامگذاری را تغییر نداده باشید به صورت پیش‌فرض JAR file تولید شده با فرمت زیر نامگذاری می‌شود:
 
```
${projectName}-${version}
```


برای مثال اگر نام پروژه شما `demo` و نسخه آن در pom.xml و یا build.gradle به صورت `1.0.0-SNAPSHOT` باشد، مقداری که باید وارد کنید بدین شکل خواهد بود:

```
JAR file name: demo-1.0.0-SNAPSHOT.jar
```
 
## تشخیص نام Jar File از pom.xml
برای نمونه اگر قصد دارید که نام jar file را تشخیص دهید،‌ کافی است به pom.xml پروژه خود رفته و قسمت‌های مورد اشاره را بررسی کنید:

```xml {6,8}
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>cloud.fandogh</groupId>
    <artifactId>demo</artifactId>
    <packaging>jar</packaging>
    <version>1.0.0-SNAPSHOT</version>
    ...
</project>
```
با توجه به نمونه بالا مقادیر `artifactId` و `version` نام نهایی jar file شما را مشخص خواهند کرد:
```yaml
JAR file name: demo-1.0.0-SNAPSHOT.jar
```

پس از مشخص کردن اطلاعات فوق، فایلی با نام fandogh.yml در پوشه جاری شما ساخته می‌شود.   
اکنون با نوشتن دستور `fandogh source run` می‌توانید پروژه خودتان را بر روی فندق دیپلوی کنید.  
  
:::tip راهنمایی
پس از هر بار تغییر در پروژه تنها کافیست که دستور fandogh source run را مجددا اجرا کنید.
:::

:::tip راهنمایی
فایل `fandogh.yml` می‌تواند شامل تمام بخش‌هایی که در [مانیفست] [service_manifest] فندق است باشد، شما به صورت دستی قادر هستید تا بخش‌های مورد نیاز این فایل را تغییر دهید.
:::

[getting_started]: /docs/preface/getting-started
[service_manifest]: /docs/services/service-manifest
