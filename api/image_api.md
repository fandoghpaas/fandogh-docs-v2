---
id: images
title: ایمیج‌ها
sidebar_label: ایمیج‌ها
---

در این مستند شما می‌توانید endpointهای مربوط به عملیات imageها و همچنین مدل داده‌های آن‌ها را مشاهده کنید.

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

## /images

### GET Method

```yaml title="List Images"
    get:
      tags:
      - "Images"
      description: "To get list of images"
      operationId: "get Images"
      parameters:
      - in: "header"
        name: "AUTHORIZATION"
        description: "in this format: JWT [USER-TOKEN],  where [USER-TOKEN] is user's token"
        type: string
        required: true
      responses:
        200:
          description: "array of images"
          schema:
            type: array
            items:
              $ref: "#/definitions/ImageModel"
        401:
          description: "Authentication required"
          schema:
            $ref: "#/definitions/MessageResponse"
```

#### GET Response Model

```yaml title="Image Model Response"
  ImageModel:
    type: object
    properties:
      name:
        type: string
      namespace:
        type: string
      owner:
        type: integer
      last_version:
        $ref: "#/definitions/ImageVersionModel"
      created_at:
        type: string
        format: datetime
```

### POST Method

```yaml title="Create Image"
    post:
      tags:
      - "Images"
      description: "To create a new image"
      operationId: "Create Image"
      parameters:
      - in: "body"
        name: "body"
        description: "Image name"
        required: true
        schema:
          $ref: "#/definitions/CreateImage"
      - in: "header"
        name: "AUTHORIZATION"
        description: "in this format: JWT [USER-TOKEN],  where [USER-TOKEN] is user's token"
        type: string
        required: true

      responses:
        200:
          description: "Contains require messages"
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

#### POST Response Model

```yaml title="Create Image Response Model"
  CreateImage:
    type: object
    required:
      - name
    properties:
      name:
        type: string
        pattern: "^[A-Za-z0-9-_]+$"
```

## /images/{image_name}

### DELETE Method

```yaml title="Delete Image"
    delete:
      tags:
        - Images
      description: "To delete an image and all its versions and build info"
      parameters:
      - in: path
        name: name
        description: Image name
        required: true
        type: string
      responses:
        204:
          description: "Image deleted successfully"
```

#### Delete Image Response Model

```yaml title="Delete Image Response Model"
message: "Image Deleted Successfully"
status_code: 204
```

## /images/{image_name}/versions

### GET Method

```yaml title="List Image Versions"
    get:
      tags:
      - "Images"
      description: "To get list of image versions"
      operationId: "get Image Versions"
      parameters:
        - name: name
          in: path
          required: true
          type: string
        - name: state
          in: query
          required: false
          type: string
          enum:
            - PENDING
            - BUILDING
            - BUILT
            - FAILED
            - BUILD_FAILED
        - in: "header"
          name: "AUTHORIZATION"
          description: "in this format: JWT [USER-TOKEN],  where [USER-TOKEN] is user's token"
          type: string
          required: true

      responses:
        200:
          description: "array of images versions"
          schema:
            type: array
            items:
              $ref: "#/definitions/ImageVersionModel"
        401:
          description: "Authentication required"
          schema:
            $ref: "#/definitions/MessageResponse"
        404:
          description: "Image not found"
          schema:
            $ref: "#/definitions/MessageResponse"
```

#### GET Image Versions Response Model

```yaml title="GET Image Versions Response Model"
  ImageVersionModel:
    type: object
    properties:
      version:
        type: string
      state:
        type: string
      date:
        type: string
        format: datetime
      size:
        type: integer
        format: int64
```

### POST Method

```yaml title="Create New Image Version"
    post:
      tags:
      - "Images"
      description: "To create a new image version"
      operationId: "Create Image Version"
      consumes:
       - "multipart/form-data"
      parameters:
        - name: name
          in: path
          required: true
          type: string
        - name: source
          in: formData
          description: project source file
          required: true
          type: file
        - name: version
          in: formData
          description: version number
          required: true
          type: string
        - in: "header"
          name: "AUTHORIZATION"
          description: "in this format: JWT [USER-TOKEN],  where [USER-TOKEN] is user's token"
          type: string
          required: true

      responses:
        200:
          description: "Contains require messages"
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
        404:
          description: "Image not found"
          schema:
            $ref: "#/definitions/MessageResponse"
        500:
          description: "Server Error, Do not rely on response body"
```

#### POST Image Version Response Model

```yaml title="POST Image Version Response Model"
message: "Version created successfully"
status_code: 200
```

## /images/{imaeg_name}/versions/{image_version}/builds

### GET Method

```yaml title="Get List Of Builds For An Image Version"
    get:
      tags:
      - "Images"
      description: "To get list of builds for an image version"
      operationId: "get Builds for an Image Version"
      produces:
      - "application/json"
      parameters:
        - name: name
          in: path
          required: true
          type: string
        - name: version
          in: path
          required: true
          type: string
        - in: "header"
          name: "AUTHORIZATION"
          description: "in this format: JWT [USER-TOKEN],  where [USER-TOKEN] is user's token"
          type: string
          required: true

      responses:
        200:
          description: "array of builds for an image version"
          schema:
            type: array
            items:
              $ref: "#/definitions/ImageVersionBuildModel"
        401:
          description: "Authentication required"
          schema:
            $ref: "#/definitions/MessageResponse"
        404:
          description: "Image not found"
          schema:
            $ref: "#/definitions/MessageResponse"
```

#### GET Image Version Builds

```yaml title="GET Image Vesion Builds Response Model"
  ImageVersionBuildModel:
    type: object
    properties:
      logs:
        type: string  # possibly lots of string
      start_date:
        type: string
        format: datetime
      end_date:
        type: string
        format: datetime
      state:
        type: string
```

[swagger]: https://swagger.io
[fandogh_contracts]: https://github.com/fandoghpaas/fandogh-cli/tree/master/api-docs