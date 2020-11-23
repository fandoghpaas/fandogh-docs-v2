---
id: secrets
title: سکرت‌ها
sidebar_label: سکرت‌ها
---

در این مستند شما می‌توانید endpointهای مربوط به عملیات سکرت‌ها و همچنین مدل داده‌های آن‌ها را مشاهده کنید.

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

## /secrets

### GET Method

```yaml title="List Secrets"
    get:
      tags:
      - "Secret"
      description: "To get list of secrets"
      operationId: "List secrets"
      parameters:
      - in: "header"
        name: "AUTHORIZATION"
        description: "in this format: JWT [USER-TOKEN],  where [USER-TOKEN] is user's token"
        type: string
        required: true
      responses:
        200:
          description: "List of secrets"
          schema:
            $ref: "#/definitions/SecretModel"
        401:
          description: "Authentication required"
          schema:
            $ref: "#/definitions/MessageResponse"
        500:
          description: "Server Error, Do not rely on response body"
```

#### GET Response Model

```yaml title="Secret Model"
  SecretModel:
    type: object
    properties:
      name:
        type: string
      namespace:
        type: string
      type:
        type: string
      created_at:
        type: string
        format: datetime
```

### POST Method

```yaml title=""
    post:
      tags:
      - "Secret"
      description: "to create a secret"
      operationId: "Create Secret"
      parameters:
      - in: "body"
        name: "body"
        description: "Secret object"
        required: true
        schema:
          $ref: "#/definitions/CreateSecretModel"
      - in: "header"
        name: "AUTHORIZATION"
        description: "in this format: JWT [USER-TOKEN],  where [USER-TOKEN] is user's token"
        type: string
        required: true
      responses:
        200:
          description: "Response has been created"
          schema:
            $ref: "#/definitions/MessageResponse"
        400:
          description: "Invalid input"
          schema:
            $ref: "#/definitions/ErrorResponse"
```

#### POST Method Response Model

```yaml title="Create Secret Model"
  CreateSecretModel:
    type: object
    properties:
      name:
        type: string
      type:
        type: string
      fields:
        type: object
        description: "depends on type of secret"
```


[swagger]: https://swagger.io
[fandogh_contracts]: https://github.com/fandoghpaas/fandogh-cli/tree/master/api-docs