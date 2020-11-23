---
id: mssql-managed-service
title: MSSQL Server
sidebar_label: MSSQL Server
---

![MSSQL](/img/docs/mssql-managed-service.svg "MSSQL")

Microsoft SQL Server یک سیستم مدیریت پایگاه داده رابطه ای (RDBMS) است که از طیف گسترده ای از برنامه های پردازش تراکنش، هوش تجاری و تجزیه و تحلیل پشتیبانی می کند. Microsoft SQL Server به همراه اوراکل دیتابیس و IBM DB2 یکی از سه فناوری پیشرو در بازار هستند.<br/>
Microsoft SQL Server مانند سایر نرم افزارهای RDBMS دیگر، بر اساس SQL ساخته شده است؛ یک زبان برنامه نویسی استاندارد که مدیران بانک اطلاعاتی (DBA) و دیگر متخصصان فناوری اطلاعات برای مدیریت پایگاه داده و پرس و جو از داده های موجود در آن استفاده می کنند.<br/>
SQL Server با Transact-SQL (T-SQL) پیوند و ارتباط نزدیکی دارد؛ پیاده‌سازی منحصر به فردی از SQL توسط مایکروسافت که مجموعه ای از extensionهای برنامه نویسی اختصاصی را به زبان استاندارد اضافه کرده است.<br/>

حال برای اینکه بتوانید این سرویس محبوب را بر روی فضانام خود دیپلوی کنید، پارامتر‌های زیر را می‌توانید مشخص کنید:

|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| sql-server| نامی که برای سرویس مایلید در نظر گرفته شود|
|volume_name| string| None| نام volumeای که به سرویس وصل می شود |
|adminer_enabled| boolean| True | فعال یا غیرفعال بودن Adminer |
|mssql_agent_enabled| boolean| False | فعال یا غیرفعال بودن MSSQL Agent |
|mssql_sa_password| string| MicrosoftSQL@123| رمز عبور دیتابیس |
|volume_browser_enabled| boolean| false| آیا سرویس مدیریت Dedicated Volume برای این سرویس ساخته شود یا خیر|

:::tip راهنمایی
توجه داشته باشید که سرویس ‌MSSQL Server برای آنکه بتواند داده‌های خود را ذخیره کند و از سرعت و کارایی مناسبی برخوردار باشد باید حتما به یک [dedicated volumes] [dedicated_volumes] متصل شود در غیر این صورت با خطا مواجه شده و سرویس به درستی عمل نمی‌کند.
:::

:::caution نکته
از آنجایی که سرویس MSSQL Server یکی از سرویس‌های سنگین حساب می‌شود، برای ساخت این سرویس حداقل میزان رم برای عملکرد بهینه طبق [مستندات مایکروسافت] [microsoft_document] باید حداقل ۲ گیگابایت باشد.
:::

:::note توجه
توجه داشته باشید برای استفاده از قابلیت Volume Browser سرویس شما باید به یک Dedicated Volume متصل باشد؛ در غیر این صورت با خطای سرور مواجه خواهید شد.
:::

به عنوان مثال برای دیپلوی کردن یک MSSQL Server می‌توانیم به این شکل یک سرویس بسازیم:

```bash
  fandogh managed-service deploy mssql 4.2 \
       -c service_name=test-mssql \
       -c mssql_sa_password=MicrosoftSQL@123 \
       -c adminer_enabled=True \
       -c volume_name=mssql-volume
```

این دستور یک سرویس MSSQL Server ایجاد می‌کند که:
- نام آن test-mssql ( یعنی در شبکه داخلی فضانام شما باقی سرویس‌ها از طریق نام test-mssql و بر روی پورت 1433 می‌توانند به آن متصل شوند) است .
- نام کاربری سرویس sa است.
- رمز عبور آن MicrosoftSQL@123 است.
- و نام volume که به آن متصل بوده و داده‌های خود را بر روی آن ذخیره می‌کند mssql-volume است.

:::important مهم
برای استفاده از سرویس MSSQL Server باید به نکته زیر توجه داشته باشید:
برای حفط مسائل امنیتی سرویس MSSQL Server به صورت یک [Internal Service] [internal_service] عمل می‌کند و شما خارج از namespace خود به آن دسترسی ندارید.
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

```yaml title="mssql_deployment.yml"
kind: ManagedService
name: test-mssql
spec:
  service_name: mssql
  version: latest
  parameters:
    - name: adminer_enabled
      value: false
    - name: mssql_sa_password
      value: YOUR_PASSWORD
    - name: volume_name
      value: YOUR_VOLUME_NAME
  domains:
  - name: domain.com
  - name: www.domain.com
  resources:
      memory: 2048Mi
```

:::note توجه
توجه داشته باشید، دامنه‌هایی که به سرویس مدیریت شده MSSQL SERVER اضافه می‌شوند، در اصل به داشبورد مدیریتی آن متصل می‌شوند، نه خود سرویس دیتابیس.
:::

## Deploy With Manifest
  

شما همچنین می توانید برای اجرای راحت تر سرویس های مدیریت شده از [مانیفست] [service_manifest] همانند مثال زیر استفاده کنید.

- مانیفست MSSQL Server بدون داشبورد مدیریتی

```yaml title="mssql_deployment.yml"
kind: ManagedService
name: test-mssql
spec:
  service_name: mssql
  version: latest
  parameters:
    - name: adminer_enabled
      value: false
    - name: mssql_sa_password
      value: YOUR_PASSWORD
    - name: volume_name
      value: YOUR_VOLUME_NAME
  resources:
      memory: 2048Mi
```

- مانیفست MSSQL Server همراه با داشبورد مدیریتی

```yaml title="mssql_deployment.yml"
kind: ManagedService
name: test-mssql
spec:
  service_name: mssql
  version: latest
  parameters:
    - name: adminer_enabled
      value: true
    - name: mssql_sa_password
      value: YOUR_PASSWORD
    - name: volume_name
      value: YOUR_VOLUME_NAME
  resources:
      memory: 2048Mi
```

[microsoft_document]: https://docs.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker?view=sql-server-ver15&pivots=cs1-bash#requirements
[internal_service]: /docs/services/services#%DB%B1--%D8%B3%D8%B1%D9%88%DB%8C%D8%B3-%D9%87%D8%A7%DB%8C-%D8%AF%D8%A7%D8%AE%D9%84%DB%8C-%DB%8C%D8%A7-internal-service
[dedicated_volume]: /docs/volumes/dedicated-volume
[www_domain]: http://www.domain.com
[domain]: http://domain.com
[service_manifest]: /docs/services/service-manifest
