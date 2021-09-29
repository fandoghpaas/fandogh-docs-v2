---
id: minio-modern-managed-service
title: MinIO
sidebar_label: MinIO Modern
description: 'اگر شما به دنبال راه حلی برای ذخیره‌سازی داده‌های متفاوت هستید بهتر است از Object Storageها استفاده کنید؛ یکی از این Object Storageها، MinIO است.'
keywords:
  - "سکوی ابری"
  - "سرویس‌های مدیریت شده"
  - سرویس
  - داکر
  - MinIO
  - مینیو
  - "object storage"
  - storage
  - s3
  - "s3 object storage"
  - "managed services"
  - "سکوی ابری فندق"
  - "زیرساخت ابری"
image: /img/docs/thumbnails/managed-services/minio-managed-service-thumbnail.png
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

![Minio](/img/docs/minio-managed-service.svg "Minio")

اگر شما به دنبال راه حلی برای ذخیره‌سازی داده‌های متفاوت هستید بهتر است از Object Storageها استفاده کنید.
یکی از این Object Storageها MinIO است. <br/>
MinIO یک  [Cloud Storage] [cloud_storage] سازگار با [Amazon S3] [amazon_s3] است که به شما این امکان را می دهد تا فایل‌های خود را بر روی آن ذخیره کنید و سرویس‌ها از طریق ارتباط API به آن‌ها دسترسی داشته باشند.<br/>

:::caution نکته
توجه داشته باشید maximum اندازه یک فایل برای یک Object نمیتواند بیشتر از ۵ ترابایت باشد.
:::

برای اینکه بتوانید این سرویس را دیپلوی کنید، پارامتر‌های زیر را می‌توانید مشخص کنید:

|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| minio| نامی که برای سرویس مایلید در نظر گرفته شود|
|minio_access_key| string| | مقدار access key|
|minio_secret_key| string| |مقدار secret key|
|volume_name| string| |نام volumeای که به سرویس وصل می شود|
|volume_browser_enabled| boolean| false| آیا سرویس مدیریت Dedicated Volume برای این سرویس ساخته شود یا خیر|

:::caution نکته
توجه داشته باشید طول **minio_access_key** و **minio_secret_key** باید بیشتر از ۱۲ کاراکتر باشد، در غیر این صورت با خطای سرور مواجه خواهید شد.
:::

:::note توجه
توجه داشته باشید برای استفاده از قابلیت **Volume Browser** سرویس شما باید به یک **Dedicated Volume** متصل باشد؛ در غیر این صورت با خطای سرور مواجه خواهید شد.
:::

برای دیپلوی کردن یک سرویس MinIO می‌توانیم به شکل زیر عمل کنیم:

```bash
  fandogh managed-service deploy minio modern \
       -c service_name=test-minio \
       -c minio_access_key=12charchters \
       -c minio_secret_key=12charchters \
       -c volume_name=VOLUME_NAME \
       -m 512Mi
```

این دستور یک سرویس MinIO ایجاد می‌کند که:
- نام آن test-minio )یعنی در شبکه داخلی فضانام شما باقی سرویس‌ها از طریق نام test-minio و بر روی پورت 80 می‌توانند به آن متصل شوند( است.
- میزان رم آن 512 مگابایت.
- minio_access_key آن 12charchters
- minio_secret_key آن 12charchters 
- و نام volume که داده‌های minio بر روی آن ذخیره می‌شود VOLUME_NAME است.

بعد از آن که سرویس MinIO ساخته شد، از طریق لینکی که در اختیار شما قرار می‌گیرد می‌توانید وارد داشبورد مدیریتی MinIO شده و access_key و secret_key را وارد نمایید و از سرویس استفاده کنید.

## Deploy With Manifest

شما همچنین می توانید برای اجرای راحت تر سرویس های مدیریت شده از [مانیفست] [service_manifest] همانند مثال زیر استفاده کنید.

- مانیفست MinIO

```yaml title="minio_deployment.yml"
kind: ManagedService
name: test-minio
spec:
  service_name: minio
  version: modern
  parameters:
    - name: minio_access_key
      value: 12charachters
    - name: minio_secret_key
      value: 12charachters
    - name: volume_name
      value: VOLUME_NAME
  resources:
      memory: 512Mi
```

## MinIO Console (Dashboard)
بعد از استقرار سرویس مدیریت شده MinIO سکوی ابری فندق تعدادی دامنه در اختیار شما قرار می‌دهد.
برای دسترسی به داشبورد سرویس MinIO، دامنه با فرمت زیر را در مرورگر خود وارد نمایید:

```http title="MinIO Console (Dashboard) Address"
https://console-service_name-namespace_name.fandogh.cloud
```

برای ورود به داشبورد در صفحه ورود از شما نام کاربری و رمز عبور درخواست خواهد شد؛ این مقادیر به ترتیب به شرح زیر هستند:
* **username:** برای این بخش مقدار minio_access_key را وارد نمایید.
* **password:** برای این بخش مقدار minio_secret_key را وارد نمایید.

## MinIO Server
در اصل MinIO Server همان آدرس مستقیم برای برقراری ارتباط به سرویس MinIO از طریق API است.

```http title="MinIO Server Address"
https://service_name-namespace_name.fandogh.cloud
```

:::note توجه
اگر شما دامنه دلخواه به سرویس MinIO اضافه کرده باشید، این دامنه جایگزین آدرس پیشفرض فندقی خواهد شد.
:::

## افزودن دامنه دلخواه
اگر قصد داشته باشید دامنه دلخواهتان را به سرویس مدیریت شده مورد نظر متصل نمایید، میتوانید به صورت زیر عمل کنید.<br/>
:::caution مهم
توجه داشته باشید شما فقط یک دامنه می‌توانید به سرویس مدیریت شده **MinIO** متصل نمایید و این آدرس جایگزین آدرس سرور خواهد شد؛ برای استفاده از داشبورد MinIO همچنان باید به آدرس پیشفرضی که سکو در اختیار شما قرار می‌دهد مراجعه نمایید.
:::
برای مثال فرض کنید تمایل دارید سرویس مدیریت شده مورد نظر شما روی  [domain.com] [domain]   در دسترس باشد:

```yaml
  domains:
     - name: domain.com
     ...
```

بدین شکل بخش دامنه را به مانیفست سرویس خود اضافه کرده و آن را مستقر نمایید:

```yaml title="minio_deployment.yml"
kind: ManagedService
name: test-minio
spec:
  service_name: minio
  version: modern
  parameters:
    - name: minio_access_key
      value: 12charachters
    - name: minio_secret_key
      value: 12charachters
    - name: volume_name
      value: VOLUME_NAME
  domains:
  - name: domain.com
  resources:
      memory: 512Mi
```

## تغییر تنظیمات امنیتی
اگر قصد داشته باشید `secret key` و `access key` که قبلا بر روی سرویس MinIO خود ایجاد کرده‌اید را تغییر دهید، تنها کافی است مقادیر **minio_access_key** و **minio_secret_key** را تغییر دهید.<br/><br/>
بعد از این تغییر و تایید، سکو سرویس شما را دوباره ساخته و مقادیر جدید بر روی سرویس MinIO قرار خواهد گرفت.<br/><br/>

:::caution نکته
اگر قصد تغییر مقادیر **minio_access_key** و **minio_secret_key** را دارید، باید به این نکته توجه داشته باشید که تمامی سرویس‌هایی که از طریق آدرس سرور با MinIO در تماس هستند باید مقادیر جدید را داشته باشند تا اختلالی در ارتباط بوجود نیاید.
:::

برای مثال فرض کنید سرویس MinIO شما در ابتدا با مانیفست زیر ایجاد شده باشد:

```yaml title="minio_deployment.yml"
kind: ManagedService
name: test-minio
spec:
  service_name: minio
  version: modern
  parameters:
    - name: minio_access_key
      value: 12charachters
    - name: minio_secret_key
      value: 12charachters
    - name: volume_name
      value: VOLUME_NAME
  resources:
      memory: 512Mi
```

حال قصد داریم مقادیر **minio_access_key** و **minio_secret_key** را بنا به دلایلی تغییر دهیم؛ حال مانیفست بالا را به صورت زیر ویرایش می‌کنیم:

```yaml title="minio_deployment.yml"
kind: ManagedService
name: test-minio
spec:
  service_name: minio
  version: modern
  parameters:
    - name: minio_access_key
      value: 12charachtersnew
    - name: minio_secret_key
      value: 12charachtersnew
    - name: volume_name
      value: VOLUME_NAME
  resources:
      memory: 512Mi
```

## کار با MC

برای بررسی و استفاده از MinIO خارج از محیط سکوی ابری فندق شما می‌توانید از ابزار [mc] [mc_link] که یک Client رسمی از MinIO است استفاده کنید.

برای نصب این ابزار به روش‌های زیر می‌توانید عمل کنید:

<Tabs
  groupId="operating-systems"
  defaultValue="mac"
  values={[
    {label: 'GNU/Linux', value: 'linux'},
    {label: 'Windows', value: 'win'},
    {label: 'Homebrew(macOS)', value: 'mac'},
  ]
}>
<TabItem value="mac">

```bash
brew install minio/stable/mc
mc --help
```

</TabItem>
<TabItem value="linux">

|پلتفرم|معماری|لینک|
|---	|---	|---	|
|GNU/Linux|64-bit Intel|https://dl.min.io/client/mc/release/linux-amd64/mc|
|GNU/Linux|64-bit PPC|https://dl.min.io/client/mc/release/linux-ppc64le/mc|

```bash
chmod +x mc
./mc --help
```

</TabItem>
<TabItem value="win">

  |پلتفرم|معماری|لینک|
  |---	|---	|---	|
  |Microsoft Windows|64-bit Intel|https://dl.min.io/client/mc/release/windows-amd64/mc.exe|

```bash
mc.exe --help
```

</TabItem>
</Tabs>

<br/><br/>
بعد از اینکه MinIO Client را نصب کردید باید تنظیمات امنیتی آن را تکمیل کنید تا mc بتواند به Object Storage شما متصل شود؛ برای این کار به ترتیب زیر عمل کنید: <br/><br/>

```bash
mc config minio MINIO_SERVER_DOMAIN
```

در این دستور MINIO_SERVER_DOMAIN همان دامنه‌ای است که فندق در انتهای ساخت، به سرویس شما تخصیص می‌دهد.<br/><br/>

```
Enter Access Key: MINIO_ACCESS_KEY_FROM_MANIFEST
Enter Secret Key: MINIO_SECRET_KEY_FROM_MANIFEST
```

در انتها زمانی که همه چیز به درستی انجام شود باید پیغام زیر برای شما نمایش داده شود:

```bash
Added `minio` successfully.
```

حال برای آنکه متوجه شوید mc به درستی کار می‌کند ابتدا وارد داشبورد Minio شوید و از طریق گزینه پایین سمت راست یک Bucket با نام دلخواه ایجاد نمایید.<br/><br/>
بعد از آنکه Bucket را ایجاد کردید، داخل CLI دستور زیر را وارد کنید:

```bash
mc minio ls
```

خروجی این دستور حاوی لیستی از Bucketهای موجود در Object Storage شما خواهد بود.<br/><br/>
MinIO Client حاوی دستورات دیگری ‌است که می‌توانید از طریق [مستندات] [minio_docs]، آن را مطالعه نموده و استفاده نمایید.

## مهاجرت از Legacy به Modern
اگر شما از آن دسته کاربرانی هستید که نسخه **Legacy**)قدیمی( سرویس MinIO استفاده می‌کنید، می‌توانید به ترتیب زیر عمل کنید.

:::caution مهم
در صورت مشاهده خطا در هر یک از قدم‌های بیان شده در ادامه مستندات، می‌توانید موضوع را به صورت تیکت با پشتیبانی سکو مطرح کنید تا در اسرع وقت مشکل شما حل شود.
:::

### ۱- بکاپ مانیفست
قبل از هر کاری ابتدا یک نسخه پشتیبان از مانیفست سرویس خود دریافت نمایید. شما به دو روش می‌توانید این کار را انجام دهید:
#### Fandogh CLI
با دستور زیر می‌توانید مانفست سرویس خود را دریافت کنید.
```bash
fandogh service dump --service service_name
```
بعد از آنکه مانیفست را مشاهده کردید، آن را در یک فایل با فرمت `yaml` ذخیره نمایید.

#### Fandogh Dashboard
ابتدا وارد حساب کاربری خود شوید، سپس از منو سمت راست `سرویس‌ها` را انتخاب نمایید.
سپس در لیست سرویس‌های خود، روی سرویس MinIO مورد نظر کلیک نمایید.
بعد از آنکه وارد صفحه جزئیات سرویس شدید، روی دکمه `دانلود مانیفست` کلیک نمایید تا فایل مانیفست به صورت خودکار دانلود شود.

### ۲- ذخیره Access Key و Secret Key
بعد از ذخیره مانیفست، مقادیر زیر را تا پایان پروسه مهاجرت ذخیره نمایید.
* minio_access_key
* minio_secret_key
* service_name

### ۳- حذف سرویس فعلی
سرویس MinIO فعلی را حذف نمایید.
:::note توجه
در صورت حذف سرویس فعلی داده‌های شما حذف نمی‌شوند، فقط سرویس از Dedicated Volume جدا شده و حذف می‌گردد.
:::

### ۴- ساخت سرویس جدید
حال که سرویس قبلی حذف شده است، با مشخصات زیر یک سرویس MinIO جدید ایجاد کرده به Dedicated Volume که داشتید متصل نمایید.
* service_name
* minio_access_key
* minio_secret_key
* volume_name

:::tip راهنمایی
توجه داشته باشید همانطور که قبلا هم بیان شد، مقادیر بالا باید کاملا همان مقادیر سرویس MinIO قبلی باشند.
:::


[cloud_storage]: https://en.wikipedia.org/wiki/Cloud_storage
[amazon_s3]: https://en.wikipedia.org/wiki/Amazon_S3
[dedicated_volume]: /docs/volumes/dedicated-volume
[www_domain]: http://www.domain.com
[domain]: http://domain.com
[service_manifest]: /docs/services/service-manifest
[mc_link]: https://docs.min.io/docs/minio-client-complete-guide
[minio_docs]: https://docs.min.io/docs/minio-client-complete-guide
