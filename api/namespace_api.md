---
id: namespaces
title: فضانام‌ها
sidebar_label: فضانام‌ها
---

در این مستند شما می‌توانید endpointهای مربوط به عملیات فضانام‌ها و همچنین مدل داده‌های آن‌ها را مشاهده کنید.

:::note توجه
فرمت کلی این داده‌ها به صورت [swagger contract][swagger] نگارش شده است که می‌توانید آن را از آدرس مخزن [fandogh contracts][fandogh_contracts] مشاهده و دریافت کنید.
:::

## مشخصات اولیه

```yaml title="Contract Main Part"
swagger: "2.0"
info:
  description: "Fandogh API"
  version: "1.0.0"
  title: "Fandogh API"
host: "api.fandogh.cloud"
basePath: "/api"
schemes:
- "https"
consumes:
  - "application/json"
produces:
  - "application/json"
```

### مدل های پاسخ سرور

```yaml title="General Response Models"
  ErrorItem:
    type: object
    additionalProperties:
      type: array
      items:
        type: string
      # in form of "field name": ["error1", "error2",..]

  ErrorResponse:
    type: object
    properties:
      errors:
        type: array
        items:
          $ref: "#/definitions/ErrorItem"
  MessageResponse:
    type: object
    properties:
      contents:
        type: object
        properties:
          message:
            type: string
```

## /users/namespaces/{namespace}

### GET Method

```yaml title="Namespace Status"
    get:
      tags:
      - "Namespace"
      description: "To get namespace status"
      operationId: "Detail Services"
      parameters:
      - in: "path"
        name: namespace
        required: true
        type: string
      - in: "header"
        name: "AUTHORIZATION"
        description: "in this format: JWT [USER-TOKEN],  where [USER-TOKEN] is user's token"
        type: string
        required: true
      responses:
        200:
          description: "details of namespace"
          schema:
            $ref: "#/definitions/NamespaceModel"
        401:
          description: "Authentication required"
          schema:
            $ref: "#/definitions/MessageResponse"
        404:
          description: "Service not found"
          schema:
            $ref: "#/definitions/MessageResponse"
```

#### GET Response Model

```yaml title="Namespace Model"
  NamespaceModel:
    type: object
    properties:
      name:
        type: string
      quota:
        $ref: "#/definitions/QuotaModel"
      current_used_resources:
        $ref: "#/definitions/UsedResourcesModel"
```

```yaml title="Quota Model"
  QuotaModel:
    type: object
    properties:
      memory_limit:
        type: integer
      cpu_limit:
        type: number
      service_limit:
        type: integer
      max_replica:
        type: integer
      pending_certificate_limit:
        type: integer
```

```yaml title="Used Resources Model"
  UsedResourcesModel:
    type: object
    properties:
      service_count:
        type: integer
      memory_usage:
        type: integer
      cpu_usage:
        type: number
```


[swagger]: https://swagger.io
[fandogh_contracts]: https://github.com/fandoghpaas/fandogh-cli/tree/master/api-docs