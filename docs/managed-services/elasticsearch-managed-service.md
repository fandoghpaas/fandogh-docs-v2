---
id: elasticsearch-managed-service
title: Elasticsearch
sidebar_label: Elasticsearch 
description: 'Elasticsearch محبوب‌ترین موتور جست‌و‌جو (Search Engine) در بین کاربران است که بر پایه کتابخانه Lucene و زبان برنامه‌نویسی Java توسعه یافته و از قدرت بالایی برخوردار است. این موتور جست‌و‌جو قابلیت جست‌و‌جو تمام متن را با پشتیبانی از پروتکل HTTP را به صورت توزیع شده در اختیار کاربران قرار می‌دهد.'
keywords:
  - "سکوی ابری"
  - "سرویس‌های مدیریت شده"
  - سرویس
  - داکر
  - الستیک
  - elasticsearch
  - "managed services"
  - "سکوی ابری فندق"
  - "زیرساخت ابری"
image: /img/fandogh.png
---

![Elasticsearch](/img/docs/elasticsearch-managed-service.svg "Elasticsearch")

**Elasticsearch** محبوب‌ترین موتور جست‌و‌جو )Search Engine( در بین کاربران است که بر پایه کتابخانه Lucene و زبان برنامه‌نویسی Java توسعه یافته و از قدرت بالایی برخوردار است. این موتور جست‌و‌جو قابلیت جست‌و‌جو تمام متن را با پشتیبانی از پروتکل HTTP را به صورت توزیع شده در اختیار کاربران قرار می‌دهد.<br/><br/>
همچنین بخش‌هایی از این سرویس به صورت متن‌باز تحت لیسانس‌هایی مانند Apache توسعه یافته و بخش‌هایی دیگر تحت عنوان Elastic License توسعه یافته‌اند.<br/><br/>
برای آنکه بتوانید از مزایای Elasticsearch استفاده کنید، باید داده‌ها را به آن بدهید که این کار یا با استفاده از کتابخانه‌های موجود برای زبان‌هایی همچون Java، Python، PHP، Apache Groovy و ...   و یا با استفاده از سرویس‌های واسطی مانند Fluentd یا Beats انجام دهید.

## مزایای Elasticsearch

سرویس Elasticsearch در میان شرکت‌های بزرگی همچون Github، Udemy، Shopify و ... از محبوبیت‌ بالایی برخوردار است و از دلایل این محبوبیت می‌توان به دو مزیت زیر اشاره کرد:
- **مقیاس‌پذیری**<br/>شما می‌توانید Elasticsearch را بسته به نیاز خود روی لپ‌تاپ شخصی گرفته تا صدها سرور به صورت توزیع شده و به راحتی مستقر کنید.
- **Relevance:**<br/>سرویس Elasticsearch این اطمینان را به شما می‌دهد که با سرعت بالا به صورت دقیق به هر داده‌ای که نیاز دارید دسترسی داشته باشید.

حال برای اینکه بتوانید این سرویس محبوب را بر روی فضانام خود دیپلوی کنید، پارامتر‌های زیر را می‌توانید مشخص کنید:

|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| elastic-search| نامی که برای سرویس مایلید در نظر گرفته شود|
|min_heap_memory| string| 512 | حداقل رم مصرفی Heap Size |
|max_heap_memory| string| 1024| حداکثر رم مصرفی Heap Size |
|elastic_password| string| changeme| رمز عبور سرویس |
|volume_name| string| | نام volumeای که به سرویس وصل می شود |
|elastic_search_exposed| true/false| true | مشخص میکند که سرویس از طریق وب در دسترس باشد یا خیر|
|volume_browser_enabled| boolean| false| آیا سرویس مدیریت Dedicated Volume برای این سرویس ساخته شود یا خیر|

:::tip راهنمایی
توجه داشته باشید که سرویس ‌Elasticsearch برای آنکه بتواند داده‌های خود را ذخیره کند و از سرعت و کارایی مناسبی برخوردار باشد باید حتما به یک [dedicated volumes] [dedicated_volume] متصل شود در غیر این صورت با خطا مواجه شده و سرویس به درستی عمل نمی‌کند.
:::

:::caution نکته
حداقل رم قابل سفارش برای سرویس Elasticsearch باید ۲۰۴۸ مگابایت باشد تا سرویس عملکرد ایده‌آلی داشته باشد، در غیر این صورت خطاهای متفاوتی را تجربه خواهید کرد.
:::

:::note توجه
توجه داشته باشید برای استفاده از قابلیت Volume Browser سرویس شما باید به یک Dedicated Volume متصل باشد؛ در غیر این صورت با خطای سرور مواجه خواهید شد.
:::

برای دیپلوی کردن Elasticsearch می‌توانیم به این شکل یک سرویس بسازیم:

```bash
  fandogh managed-service deploy elastic-search latest \
       -c service_name=elastic-search \
       -c min_heap_memory=512 \
       -c max_heap_memory=1024 \
       -c elastic_password=changeme \
       -c volume_name=VOLUME_NAME \
       -m 2048Mi
```

این دستور یک سرویس Elasticsearch ایجاد می‌کند که:
- نام آن elastic-search )یعنی در شبکه داخلی فضانام شما باقی سرویس‌ها از طریق نام elastic-search و بر روی پورت 9200 می‌توانند به آن متصل شوند( است .
- حداقل رم مصرفی ۵۱۲ مگابایت است.
- حداکثر رم مصرفی ۱۰۲۴ مگابایت است.
- رمز عبور دیتابیس آن changeme است.
- اسم محل ذخیره سازی که به آن متصل است VOLUME_NAME بوده.
- و میزان رم کلی که به سرویس اختصاص یافته است ۲۰۴۸ مگابایت است.

:::note توجه
برای استفاده از سرویس URL سرویس Elasticsearc در توجه داشته باشید که در صورت Expose شدن این سرویس، باید username و password را به مرورگر خود بدهید؛ مقدار password چیزی است که به هنگام ساخت سرویس به عنوان پارامتر به فندق می‌دهید و username هم `elastic` خواهد بود.
:::

:::tip connection string
 در صورتی که برای ارتباط با سرویس Elasticsearch نیاز به Connection String داشته باشید، مقدار آن به شکل زیر است:
```http
http://elastic:YOUR_PASSWORD@ELASTIC_SERVICE_NAME:9200
```
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

```yaml title="elasticsearch_deployment.yml"
kind: ManagedService
name: elastic-search
spec:
  service_name: elastic-search
  version: latest
  parameters:
    - name: min_heap_memory
      value: 512
    - name: max_heap_memory
      value: 1024
    - name: elastic_password
      value: changeme
    - name: volume_name
      value: VOLUME_NAME
    - name: elastic_search_exposed
	  value: true
  domains:
  - name: domain.com
  - name: www.domain.com
  resources:
      memory: 2048Mi
```

:::note توجه
توجه داشته باشید، دامنه‌هایی که به سرویس مدیریت شده Elasticsearch اضافه می‌شوند، در صورتی که این سرویس elastic_search_exposed شده باشد در دسترس خواهند بود.
:::

## Deploy With Manifest
  
شما همچنین می توانید برای اجرای راحت تر سرویس های مدیریت شده از [مانیفست] [service_manifest] همانند مثال زیر استفاده کنید.

- مانیفست Elasticsearch بدون داشبورد مدیریتی

```yaml title="elasticsearch_deployment.yml"
kind: ManagedService
name: elastic-search
spec:
  service_name: elastic-search
  version: latest
  parameters:
    - name: min_heap_memory
      value: 512
    - name: max_heap_memory
      value: 1024
    - name: elastic_password
      value: changeme
    - name: volume_name
      value: VOLUME_NAME
    - name: elastic_search_exposed
	  value: true
  resources:
      memory: 2048Mi
```

[dedicated_volume]: /docs/volumes/dedicated-volume
[www_domain]: http://www.domain.com
[domain]: http://domain.com
[service_manifest]: /docs/services/service-manifest
