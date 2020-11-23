---
id: secret
title: مقدمه
sidebar_label: مقدمه
---

![Fandogh Secret](/img/docs/secret.svg "Fandogh Secret")

Secretها پیکربندی‌هایی هستند که حاوی اطلاعات محرمانه‌ بوده و در `Namespace` شما ذخیره می‌شوند.<br/>
Secret‌ها می‌توانند شامل اطلاعاتی همچون توکن‌ها یا اطلاعات حساب کاربری، مقادیر environemt variable و خیلی موارد دیگر باشند که ممکن است سرویس شما به آن نیاز داشته باشد.<br/>
شما با تعریف secret‌های متفاوت می‌توانید از داده‌های خود محافظت کرده و دیگر نگرانی از بابت دیده شدن داده‌های حساس توسط عوامل خارجی نداشته باشید.

## انواع Secret

در حال حاضر سکوی ابری فندق از secret‌های زیر پشتیبانی ‌می‌کند.

|نوع سکرت|جزئیات|نوع سکرت|جزئیات|
|---	|---  |---	|---  |
| Docker-registry |[مشاهده] [docker_registry] | Environment-secret |[مشاهده] [env_secret] |

##  مدیریت Secret ها

![ CLI Image](/img/docs/cli_image.svg "CLI Image")

کلیه دستورات مربوط به بخش secrets در ادامه توضیح داده شده اند.<br/><br/>

:::tip fandogh-cli شما همچنین می توانید با وارد کردن دستور`fandogh secret --help` در fandogh-cli لیست دستورات موجود را مشاهده کنید.
:::

###  create

با استفاده از دستور زیر می‌توانید یک secret ایجاد کنید.

```bash
fandogh secret create --name SECRET_NAME -t SECRET_TYPE -f KEY=VALUE .. -f KEY=VALUE
```

**name--**<br/>
پارامتر name نمایانگر نام secretای است که می‌خواهید بسازید.

**t-**<br/>
پارامتر t نمایانگر نوع secretای است که می‌خواهید ایجاد کنید.

**f-**<br/>
پارامتر f مخفف واژه field بوده و به فیلدهایی که برای هر Secret نیاز است وارد شود اشاره دارد.

###  delete

با استفاده از دستور زیر می‌توانید سکرت مورد نظر خود را حذف نمایید.

```bash
fandogh secret delete --name secret_name
```

**name--**<br/>
پارامتر name نمایانگر نام secretای است که می‌خواهید حذف کنید.

###  put

با استفاده از دستور زیر می‌توانید یک سکرت را update نمایید.

```bash
 fandogh secret put --name secret_name -t secret_type -f fields
```

**name--**<br/>
پارامتر name نمایانگر نام secretای است که می‌خواهید update کنید.

**t-**<br/>
پارامتر t نمایانگر نوع secretای است که می‌خواهید update کنید.

**f-**<br/>
پارامتر f نمایانگر نام فیلدهایی از سکرت است که می‌خواهید update کنید.

###  list

با استفاده از دستور `fandogh secret list` می‌توانید تمامی secretهای موجود در namespace خود را مشاهده کنید.

:::tip راهنمایی
در نظر داشته باشید که نام سکرت فقط شامل حروف کوچک ، - ، اعداد و . می تواند باشد.
:::

[docker_registry]: /docs/secrets/docker-registry-secret
[env_secret]: /docs/secrets/environment-secret-secret