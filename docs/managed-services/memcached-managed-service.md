---
id: memcached-managed-service
title: Memcached
sidebar_label: Memcached
description: 'Memcached یک پایگاه داده متن‌باز و توزیع شده است که با قابلیت ذخیره داده‌ها به صورت in-memory‍ باعث بالا رفتن سرعت ذخیره و بازیابی داده‌ها می‌شود.'
keywords:
  - "سکوی ابری"
  - "سرویس‌های مدیریت شده"
  - سرویس
  - داکر
  - memcached
  - cache
  - "in-memory database"
  - database
  - "managed services"
  - "سکوی ابری فندق"
  - "زیرساخت ابری"
image: /img/docs/thumbnails/managed-services/memcached-managed-service-thumbnail.png
---

![Memcached](/img/docs/memcached-managed-service.svg "Memcached")

طبق توضیحات سایت [Memcached.org] [memcached_site] آنطور که بیان شده، `Memcached` یک پایگاه داده متن‌باز، با سرعت عملکرد بالا، با قابلیت ذخیره و بازیابی Objectها به صورت توزیع شده، با ماهیتی کلی و عمومی است که با کاهش بار موجود بر روی دیتابیس‌ها، باعث بالا رفتن سرعت اپلیکیشن شما می‌شود.<br/>
سرویس `Memcached` با قابلیت ذخیره داده‌ها با ساختار `key-value` به صورت `In Memory` به دور از هر گونه پیچیدگی و با نصب، راه‌اندازی و عملکرد بسیار ساده، راندمان بسیار مناسبی را در اختیار شما قرار خواهد داد.<br/>
برای اینکه بتوانید این سرویس را دیپلوی کنید، پارامتر‌های زیر را می‌توانید مشخص کنید:

|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| memcached| نامی که برای سرویس مایلید در نظر گرفته شود|
|memcached_username| string| memcache| نام کاربری سرویس Memcached|
|memcached_password| string| memcache| رمز عبور سرویس Memcached|
|cache_size| string | 256| میزان cache کلی سرویس Memcached|

:::tip راهنمایی
توجه داشته باشید که سرویس ‌`Memcached` به صورت پیش فرض داده‌های خود را در `Memory` نگهداری می‌کند و این حالت پایدار نیست و میزان cache در نظر گرفته شده، بسته به اینکه چه میزان از این سرویس استفاده شود باید افزایش یابد تا راندمان مورد نظر حفظ شود.
:::

برای دیپلوی کردن یک Memcached می‌توانیم به این شکل یک سرویس بسازیم:

```bash
  fandogh managed-service deploy memcached 1.6 \
       -c service_name=test-memcached \
       -c memcached_username=memcache \
       -c memcached_password=memcache \
       -c cache_size=256
       - --memory 256Mi
```

این دستور یک سرویس Memcache ایجاد می‌کند که:
- نام سرویس آن test-memcached )یعنی در شبکه داخلی فضانام شما باقی سرویس‌ها از طریق نام test-memcached و بر روی پورت 11211 می‌توانند به آن متصل شوند(.
- رمز عبور آن memcache است.
- نام کاربری آن memcache است.
- میزان cache_size آن برابر با 256 مگابایت بوده
- و رم کلی سرویس 256 مگابایت است.

:::caution نکته
برای استفاده از سرویس Memcached باید به نکته زیر توجه داشته باشید:
- برای حفط مسائل امنیتی سرویس Memcached به صورت یک [Internal Service] [internal_service] عمل می‌کند و شما خارج از namespace خود به آن دسترسی ندارید.
:::

## نسخه ها )Versions(
سرویس های مدیریت شده سکوی ابری فندق، تنها از نسخه های `stable` و پشتیبانی شده توسط توسعه  دهنده های اصلی آن محصول پشتیبانی می کند. به همین خاطر می توانید با خیال راحت سرویس مورد نظر خود را به همراه نسخه $

لیست نسخه های موجود برای سرویس `Memcached` به شرح زیر هستند:

|لیست نسخه ها|لیست نسخه ها |لیست نسخه ها |
|--- |--- |---|
|1.6 |||

برای ایجاد سرویس مدیریت شده `Memcached` با نسخه دلخواه، می توانید از دستور زیر استفاده کنید:

```bash
fandogh managed-service deploy memcached 1.6
```

:::caution توجه
توجه داشته باشید شما نمی توانید نسخه سرویس در حال اجرا را تغییر دهید. چرا که ممکن است در نسخه های متفاوت، تغییراتی وجود داشته باشد که باعث ایجاد تداخل در تنظیمات اصلی و در نتیجه از بین رفتن داده ها شود!
:::

:::tip راهنمایی
برای آنکه بتوانید نسخه سرویس خود را تغییر دهید، بهتر است ابتدا یک سرویس جدید با نسخه دلخواه ایجاد کرده؛ سپس از اطلاعات سرویس قبلی Backup تهیه نموده و وارد سرویس جدید کنید.
در صورت وجود خطا یا تداخل، احتمال دارد نیاز داشته باشید برخی داده ها یا تنظیمات را بروزرسانی کرده و تغییر دهید.
:::



## Deploy With Manifest
  
شما همچنین می توانید برای اجرای راحت تر سرویس های مدیریت شده از [مانیفست] [service_manifest] همانند مثال زیر استفاده کنید.

- مانیفست Memcached

```yaml title="memcached_deployment.yml"
kind: ManagedService
name: test-memcached
spec:
  service_name: memcached
  version: 1.6
  parameters:
    - name: memcached_username
      value: memcache
    - name: memcached_password
      value: memcache
    - name: cache_size
      value: 256
  resources:
      memory: 256Mi
```

## اتصال به سرویس Memcached در پروژه Django
برای آنکه با چگونگی اتصال یک سرویس )Client( به سرویس `Memcached` آشنا شوید از مستندات سایت [Django] [django_site] استفاده می‌کنیم.<br/><br/>

### تنظیمات Memcached در Django
ابتدا نیاز است تا قابلیت `Cache` را در بخش `settings.py` پروژه جانگویی خود فعال نمایید:

```yaml title='settings.py'
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
        'LOCATION': 'MEMCACHED_SERVICE_NAME:11211',
    }
}
```

:::tip راهنمایی
توجه داشته باشید برای آنکه اپلیکیشن جانگویی شما داخل فضانام بتواند به سرویس Memcached متصل شود، نیاز دارد تا آدرس آن را در settings خود داشته باشد.
همانطور که مشاهده می‌کنید MEMCACHED_SERVICE_NAME نشانگر این موضوع است که شما باید نامی که برای سرویس Memcached به هنگام ساخت آن انتخاب نموده‌اید را در این بخش قرار دهید.
:::

### تنظیمات per-site cache
بعد از آنکه قابلیت `Cache` را داخل settings تنظیم کردید، نوبت به استفاده از آن میرسد.<br/>
برای این کار باید داخل فایل `settings.py` در بلاک مربوط به `MIDDLEWARE` تنظیمات زیر را به ترتیبی که مشاهده می‌کنید وارد نمایید:

```yaml title='settings.py'
MIDDLEWARE = [
    'django.middleware.cache.UpdateCacheMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.cache.FetchFromCacheMiddleware',
]
```
بعد از آنکه `MIDDLEWARE` را به درستی ایجاد کردید، باید متغیرهای زیر را در settings قرار دهید:

* CACHE_MIDDLEWARE_ALIAS
* CACHE_MIDDLEWARE_SECONDS
* CACHE_MIDDLEWARE_KEY_PREFIX

### تنظیمات per-page cache
حال اگر هر متد از `view` اپلیکیشن جانگویی خود را با اسم `cache_page@` نشانه‌گذاری یا همان annotate نمایید، پاسخ‌های آن view به مدت `CACHE_MIDDLEWARE_SECONDS` که در settings قرار داده‌اید Cache خواهد شد و در بازه مشخص شده هر درخواستی که به سمت این view می‌آید بدون آنکه query جدیدی به دیتابیس شما زده شود، پاسخ موجود از روی Memcached فراخوانی شده و به کاربر ارسال می‌شود.

```python title='ptyhon view.py'
from django.views.decorators.cache import cache_page

@cache_page(60 * 15)
def my_view(request):
    ...
```

توجه داشته باشید در مثال بالا مقدار `CACHE_MIDDLEWARE_SECONDS` به صورت مستقیم داده شده است و این بدان معنی است که این view مقدار `CACHE_MIDDLEWARE_SECONDS` را از settings فراخوانی نمی‌کند.


[memcached_site]: https://memcached.org
[django_site]: https://docs.djangoproject.com/en/3.1/topics/cache/
[service_manifest]: /docs/services/service-manifest
[internal_service]: /docs/services/services#%DB%B1--%D8%B3%D8%B1%D9%88%DB%8C%D8%B3-%D9%87%D8%A7%DB%8C-%D8%AF%D8%A7%D8%AE%D9%84%DB%8C-%DB%8C%D8%A7-internal-service

