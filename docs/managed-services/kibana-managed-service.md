---
id: kibana-managed-service
title: Kibana
sidebar_label: Kibana 
---

![Kibana](/img/docs/kibana-managed-service.svg "Kibana")

**Kibana** یک داشبورد مدیریتی و متن‌باز برای دسترسی به داده‌های ثبت شده داخل Elasticsearch است. کاربرها می‌توانند بر اساس داده‌های موجود جداول و گراف‌های متفاوتی ایجاد کنند.<br/>
Kibana همچنین قابلیتی برای Present کردن داده‌ها به اسم Canvas دارد که به کاربر اجازه می‌دهد تا از داده‌های مورد نیاز Slideهایی برای نمایش ایجاد کرده و خروجی بگیرد.<br/>

حال برای اینکه بتوانید این سرویس محبوب را بر روی فضانام خود دیپلوی کنید، پارامتر‌های زیر را می‌توانید مشخص کنید:

|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| elastic-search| نامی که برای سرویس مایلید در نظر گرفته شود|
|elastic_service_name| string| elastic-search | نام سرویس Elasticsearch |
|elastic_password| string| changeme| رمز عبور دیتابیس Elasticsearch |

:::caution نکته
حداقل رم قابل سفارش برای سرویس Kibana باید ۱۰۲۴ مگابایت باشد تا سرویس عملکرد قابل قبولی داشته باشد.
:::

برای دیپلوی کردن Kibana می‌توانیم به این شکل یک سرویس بسازیم:

```bash
  fandogh managed-service deploy kibana latest \
       -c service_name=kibana \
       -c elastic_service_name=ELASTICE_SERVICE_NAME \
       -c elastic_password=changeme \
       -m 1024
```

این دستور یک سرویس Kibana ایجاد می‌کند که:
- نام آن kibana است .
- رمز عبور دیتابیس Elasticsearch آن changeme است.
- نام کاربری elastic یا kibana است.
- نام سرویس Elasticsearch که قرار است داده‌های آن نمایش داده شوند ELASTICE_SERVICE_NAME است که شما از قبل آن را مشخص و بر روی فضانام خود مستقر کرده‌اید.
- و میزان رم کلی که به سرویس اختصاص یافته است ۱۰۲۴ مگابایت است.

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

```yaml title="kibana_deployment.yml"
kind: ManagedService
name: kibana
spec:
  service_name: kibana
  version: latest
  parameters:
    - name: elastic_service_name
      value: ELASTICE_SERVICE_NAME
    - name: elastic_password
      value: changeme
  domains:
  - name: domain.com
  - name: www.domain.com
  resources:
      memory: 1024Mi
```

## Deploy With Manifest
  
شما همچنین می توانید برای اجرای راحت تر سرویس های مدیریت شده از [مانیفست] [service_manifest] همانند مثال زیر استفاده کنید.

- مانیفست Kibana بدون داشبورد مدیریتی

```yaml title="kibana_deployment.yml"
kind: ManagedService
name: kibana
spec:
  service_name: kibana
  version: latest
  parameters:
    - name: elastic_service_name
      value: ELASTICE_SERVICE_NAME
    - name: elastic_password
      value: changeme
  resources:
      memory: 1024Mi
```

[dedicated_volume]: /docs/volumes/dedicated-volume
[www_domain]: http://www.domain.com
[domain]: http://domain.com
[service_manifest]: /docs/services/service-manifest