---
id: volumes
title: فضای ذخیره‌سازی
sidebar_label: فضای ذخیره‌سازی
---

در این مستند شما می‌توانید endpointهای مربوط به عملیات فضای ذخیره‌سازی و همچنین مدل داده‌های آن‌ها را مشاهده کنید.

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

## /volumes

### GET Method

```yaml title="List of Dedicated Volumes"
    get:
      tags:
      - "Volumes"
      description: "To get list of user volumes"
      operationId: "get volumes"
      parameters:
      - in: "header"
        name: "AUTHORIZATION"
        description: "in this format: JWT [USER-TOKEN], where [USER-TOKEN] is user's token"
        type: string
        required: true
      responses:
        200:
          description: "array of user volumes"
          schema:
            type: array
            items:
              $ref: "#/definitions/VolumeModel"
        401:
          description: "Authorization required"
          schema:
            $ref: "#/definitions/MessageResponse"
```

#### GET Response Model

```yaml title="Volume Model"
  VolumeModel:
    type: object
    description: "A model to represent entities of a volume"
    properties:
      name:
        type: string
      status:
        type: string
      capacity:
        type: string
      age:
        type: string
      mounted_to:
        type: boolean
```

### POST Method

```yaml title="Create New Dedicated Volume"
    post:
      tags:
      - "Volumes"
      description: "To create a volume with name and capacity"
      operationId: "add new volume"
      parameters:
      - in: "header"
        name: "AUTHORIZATION"
        description: "in this format: JWT [USER-TOKEN], where [USER-TOKEN] is user's token"
        type: string
        required: true
      - in: "body"
        name: "body"
        description: "Volume model"
        required: true
        schema:
          $ref: "#/definitions/CreateVolumeModel"

      responses:
        200:
          description: "A volume model"
          schema:
            $ref: "#/definitions/VolumeModel"
        400:
          description: "Invalid input"
          schema:
            $ref: "#/definitions/ErrorResponse"
        401:
          description: "Authentication required"
          schema:
            $ref: "#/definitions/MessageResponse"
        500:
          description: "Server Error, Do not rely on response body"
```

#### POST Method Response Model

```yaml title="Create Volume Model"
  CreateVolumeModel:
    type: object
    description: "A model to represent desired volume to be created"
    properties:
      name:
        type: string
      capacity:
        type: string
```

## /volumes/{volume_name}

### DELETE Method

```yaml title="Delete Dedicated Volume"
    delete:
      tags:
      - "Volumes"
      description: "To delete an existing volume by name"
      operationId: "delete a volume"
      parameters:
      - in: "path"
        name: "volume_name"
        required: true
        type: string
        description: "name of the volume to be deleted"
      - in: "header"
        name: "AUTHORIZATION"
        description: "in this format: JWT [USER-TOKEN], where [USER-TOKEN] is user's token"
        type: string
        required: true

      responses:
        200:
          description: "A message from server"
          schema:
            $ref: "#/definitions/MessageResponse"
        400:
          description: "Invalid input"
          schema:
            $ref: "#/definitions/ErrorResponse"
        401:
          description: "Authentication required"
          schema:
            $ref: "#/definitions/MessageResponse"
        500:
          description: "Server Error, Do not rely on response body"
```

#### DELETE Method Response Model

```yaml title="Message Response"
message: "Volume {VOLUME_NAME} deleted successfully for namespace {NAMESPACE_NAME}"
status_code: 200
```


[swagger]: https://swagger.io
[fandogh_contracts]: https://github.com/fandoghpaas/fandogh-cli/tree/master/api-docs