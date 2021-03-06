---
id: service-lifecycle-handlers
title: دستورات چرخه حیات
sidebar_label: دستورات چرخه حیات
description: 'هر سرویس در طول دوره حیات خود دو نقطه مهم را طی می‌کند؛ یکی نقطه شروع (start)  و دیگری نقطه پایان (stop). شما می‌توانید با استفاده از دستورهایی که در ادامه در مورد آن‌ها توضیح داده‌ شده است، درست هنگام شروع و دقیقا قبل از پایان یافتن حیات یک سرویس.'
keywords:
  - "سکوی ابری"
  - داکر
  - service
  - container
  - سرویس
  - "چرخه حیات"
  - "سرویس داکری"
  - docker
  - "سکوی ابری فندق"
  - "زیرساخت ابری"
image: /img/docs/thumbnails/services/service-lifecycle-commands-thumbnail.png
---

## اتصال دستور به سرویس‌ها در چرخه‌ حیات

هر سرویس در طول دوره حیات خود دو نقطه مهم را طی می‌کند؛ یکی `نقطه شروع )start(`  و دیگری `نقطه پایان )stop(`.<br/>
شما می‌توانید با استفاده از دستورهایی که در ادامه در مورد آن‌ها توضیح داده‌ شده است، درست هنگام شروع و دقیقا قبل از پایان یافتن حیات یک سرویس و بدون آنکه نیاز باشد تا تغییری در **Dockerfile** سرویس ایجاد کنید، با استفاده از دستورهای `post_start_command` و `pre_stop_command` دستورات مورد نیاز خود را اجرا کنید.

### تعریف دستورهای post_start_command و pre_stop_command
برای آنکه بتوانید دستورات چرخه حیات را به درستی به سرویس خود اضافه‌ کنید می‌توانید به روش زیر آن‌ها را به مانیفست سرویس اضافه کنید.

```yaml title="deployment_manifest.yml"
kind: ExternalService
name: nginx
spec:
  image: _/nginx:alpine
  image_pull_policy: Always
  post_start_command:
  - touch
  - sample.txt
  pre_stop_command:
  - /bin/sh
  - -c
  - "nginx -s quit; while killall -0 nginx; do sleep 1; done"
  resources:
    memory: 200Mi
```
مانیفست بالا را داخل یک **yaml** فایل با اسم انتخابی `nginx_manifest.yml` ذخیره و با استفاده از دستور زیر آن را بر روی سکوی ابری فندق مستقر کنید:
```bash
fandogh service apply -f nginx_manifest.yml
```
دستور بالا یک سرویس از ایمیج رسمی **nginx** ایجاد می‌کند و همانطور که مشاهده می‌کنید هر دو دستور `post_start_command` و `pre_stop_command` در آن استفاده شده است.<br/><br/>
حال وقت آن است که ببینیم برای مثال آیا دستور `post_start_command` به درستی اجرا شده است یا خیر ولی قبل از آنکه صحت اجرای دستور را بررسی کنیم باید بدانیم انتظار چه چیزی را داریم!<br/><br/>
طبق دستو **touch  sample.txt** انتظار داریم یک فایل با نام **sample.txt** داخل مسیر اصلی سرویس ایجاد شده باشد.<br/><br/>
برای مشاهده فایل می‌توانید با استفاده از دستور زیر وارد سرویس شوید:
```bash
fandogh exec -i -s nginx "sh"
```
بعد از ورود به سرویس می‌توانید با دستور `ls` مشاهده فایل‌های موجود در مسیر سرویس را مشاهده کنید.
### توضیحات اجمالی
فندق دستور `post_start_command` را سریعا بعد از اجرای سرویس اجرا می‌کند ولی ضمانتی وجود ندارد که این دستور دقیقا قبل از اجرای دستورات **entrypoint** اجرا شود.<br/><br/>
دستور `post_start_command` به صورت موازی اجرا می‌شود ولی فندق تا زمان پایان یافتن دستور post_start_command اجرای سرویس را به تاخیر می‌اندازد.<br/><br/>
همچنین فندق دستور `pre_stop_command` را درست قبل از پایان یافتن یا همان **destroy** شدن سرویس اجرا می‌کند و تا زمانی که این دستور بطور کامل اجرا نشده باشد، پایان یافتن سرویس را به تاخیر می‌اندازد.<br/><br/>
با توجه به مباحث مطرح شده، شما بسته به نیاز خود می‌توانید قبل از خاتمه حیات یک سرویس و همینطور دقیقا بعد از اجرای یک سرویس دستورات مهمی مثل ایجاد **permission** خاص یا اجرای یک **bash script** یا هر دستور دیگری که نیاز دارید را به راحتی اجرا کنید.