---
id: file-browser-managed-service
title: File Browser
sidebar_label: File Browser
---

![Filebrowser](/img/docs/file-browser-managed-service.svg "Filebrowseer")

یکی از مشکلات کاربران بر روی سکو‌های ابری، دسترسی به داده‌های ذخیره‌شده بر روی Storage است، برای آنکه بتوانید به صورت گرافیکی با محل ذخیره‌سازی داده‌ها کار کنید و داده‌های خود را دانلود و آپلود و یا حتی Edit کنید، می‌توانید از سرویس مدیریت شده File Browser فندق استفاده کنید.<br/>

برای اینکه بتوانید این سرویس را دیپلوی کنید٬ پارامتر‌های زیر را می‌توانید مشخص کنید:

|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| filebrowser| نامی که برای سرویس مایلید در نظر گرفته شود|
|volume_name| string| |نام volumeای که به سرویس وصل می شود|

:::tip نام کاربری/رمز عبور
توجه داشته باشید نام کاربری و رمزعبور سرویس FileBrowser به صورت پیش فرض admin/admin است و بهتر است بعد از اولین ورود، از طریق داشبورد رمز عبور خود را تغییر دهید.
:::

برای دیپلوی کردن یک File Browser می‌توانیم به این شکل یک سرویس بسازیم:

```bash
  fandogh managed-service deploy filebrowser latest \
       -c service_name=test-file-browser \
       -c volume_name=VOLUME_NAME
       -m 512
```

این دستور یک سرویس FileBrowser ایجاد می‌کند که:
- نام آن test-file-browser
- میزان رم آن 512 مگابایت.
- و نام volume که داده‌های File Browser بر روی آن ذخیره می‌شود VOLUME_NAME است.

:::danger هشدار
در صورتی که volume_name را مشخص نکنید، این سرویس به Shared Storage متصل می‌شود اما به خاطر داشته باشید که Shared Storage برای هر کاربر ۲.۵ گیگابایت است و در صورتی که مازاد آن داده‌ای را ذخیره کنید، احتمال پاک شدن آن وجود دارد و سکوی ابری فندق مسئولیتی در قبال آن ندارد.
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

```yaml title="filebrowser_deployment.yml"
kind: ManagedService
name: test-file-browser
spec:
  service_name: filebrowser
  version: latest
  domains:
  - name: domain.com
  - name: www.domain.com
  resources:
      memory: 512Mi
```

## Deploy With Manifest
  
شما همچنین می توانید برای اجرای راحت تر سرویس های مدیریت شده از [مانیفست] [service_manifest] همانند مثال زیر استفاده کنید.

- مانیفست File Browser با Dedicated Volume

```yaml title="filebrowser_deployment.yml"
kind: ManagedService
name: test-file-browser
spec:
  service_name: filebrowser
  version: latest
  parameters:
    - name: volume_name
      value: VOLUME_NAME
  resources:
      memory: 512Mi
```

- مانیفست File Browser بدون Dedicated Volume

```yaml title="filebrowser_deployment.yml"
kind: ManagedService
name: test-file-browser
spec:
  service_name: filebrowser
  version: latest
  resources:
      memory: 512Mi
```

[dedicated_volume]: /docs/volumes/dedicated-volume
[www_domain]: http://www.domain.com
[domain]: http://domain.com
[service_manifest]: /docs/services/service-manifest