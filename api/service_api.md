---
id: services
title: سرویس‌ها
sidebar_label: سرویس‌ها
---

در این مستند شما می‌توانید endpointهای مربوط به عملیات serviceها و همچنین مدل داده‌های آن‌ها را مشاهده کنید.

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

## /services

### GET Method

```yaml title="List Services"
    get:
      tags:
      - "Services"
      description: "To get list of services"
      operationId: "get Services"
      parameters:
      - in: "header"
        name: "AUTHORIZATION"
        description: "in this format: JWT [USER-TOKEN],  where [USER-TOKEN] is user's token"
        type: string
        required: true
      responses:
        200:
          description: "array of services"
          schema:
            type: array
            items:
              $ref: "#/definitions/ServiceModel"
        401:
          description: "Authentication required"
          schema:
            $ref: "#/definitions/MessageResponse"
```

#### GET Response Model

```yaml title="Service Model"
  ServiceModel:
    type: object
    properties:
      name:
        type: string
      state:
        type: string
      service_type:
        type: string
      url:
        type: string
      urls:
        type: array
        items:
          type: string
      pods:
        type: array
        items:
          $ref: "#/definitions/PodModel"
      start_date:
        type: string
        format: datetime
      last_update:
        type: string
        format: datetime
```

```yaml title="Pod Model"
  PodModel:
    type: object
    properties:
      name:
        type: string
        example: "foo-757f6849bd-4sfvf"
      created_at:
        type: string
        format: string
        example: "2018-09-11T09:36:22Z"
      containers:
        type: array
        items:
          $ref: "#/definitions/ContainerModel"
      events:
        type: array
        items:
          $ref: "#/definitions/PodEventModel"
```

```yaml title="ContainerModel"
  ContainerModel:
    type: object
    properties:
      name:
        type: string
        example: "foo"
      image:
        type: string
        example: "registry.hub.docker.com/library/nginx:stable-alpine"
      ready:
        type: boolean
        example: true
```

```yaml title="PodEventModel"
  PodEventModel:
    type: object
    properties:
      message:
        type: string
      first_timestamp:
        type: string
        format: datetime
        example: '2018-09-11T09:36:22Z'
      last_timestamp:
        type: string
        format: datetime
        example: '2018-09-11T09:36:22Z'
      count:
        type: integer
        example: 1
      reason:
        type: string
```

### POST Method

```yaml title="Create New Service"
    post:
      tags:
      - "Services"
      description: "To deploy new service"
      operationId: "Deploy Service"
      parameters:
      - in: "body"
        name: "body"
        description: "Service deployment context"
        required: true
        schema:
          $ref: "#/definitions/ServiceDeploymentModel"
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

:::caution اخطار
این endpoint منقضی شده است و به زودی دیگر در فندق پشتیبانی نخواهد شد.
:::

```yaml title="Service Deployment Model"
  ServiceDeploymentModel:
    type: object
    required:
      - image_name
      - image_version
      - service_name
      - environment_variables
    properties:
      image_name:
        type: string
      image_version:
        type: string
      service_name:
        type: string
        pattern: "^[a-z]+(-*[a-z0-9]+)*$"
      environment_variables:
        type: object
        additionalProperties:
          type: string
      port:
        type: integer
        default: 80
      service_type:
        description: "Please consider using a checkbox for being internal or not"
        type: string
        default: "external"
        enum:
          - internal
          - external
```

## /services/manifests

### POST Method

```yaml title="Deploy Service Using Manifest"
    post:
      tags:
      - "Services"
      description: "To deploy new service using manifest"
      operationId: "Deploy Service Manifest"
      parameters:
      - in: "body"
        name: "body"
        description: "Service deployment context"
        required: true
        schema:
          $ref: "#/definitions/ServiceDeploymentManifestModel"
      - in: "header"
        name: "AUTHORIZATION"
        description: "in this format: JWT [USER-TOKEN],  where [USER-TOKEN] is user's token"
        type: string
        required: true

      responses:
        200:
          description: "Contains require messages"
          schema:
            $ref: "#/definitions/ServiceModel"
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

:::note توجه
برای آشنایی با ServiceDeploymentManifestModel به بخش [مانیفست سرویس][service_manifest] در مستندات مراجعه بفرمایید.
:::

#### POST Method Response Model

```yaml title="Service Model"
  ServiceModel:
    type: object
    properties:
      name:
        type: string
      state:
        type: string
      service_type:
        type: string
      url:
        type: string
      urls:
        type: array
        items:
          type: string
      pods:
        type: array
        items:
          $ref: "#/definitions/PodModel"
      start_date:
        type: string
        format: datetime
      last_update:
        type: string
        format: datetime
```

```yaml title="Pod Model"
  PodModel:
    type: object
    properties:
      name:
        type: string
        example: "foo-757f6849bd-4sfvf"
      created_at:
        type: string
        format: string
        example: "2018-09-11T09:36:22Z"
      containers:
        type: array
        items:
          $ref: "#/definitions/ContainerModel"
      events:
        type: array
        items:
          $ref: "#/definitions/PodEventModel"
```

```yaml title="Container Model"
  ContainerModel:
    type: object
    properties:
      name:
        type: string
        example: "foo"
      image:
        type: string
        example: "registry.hub.docker.com/library/nginx:stable-alpine"
      ready:
        type: boolean
        example: true
```

```yaml title="Pod Event Model"
  PodEventModel:
    type: object
    properties:
      message:
        type: string
      first_timestamp:
        type: string
        format: datetime
        example: '2018-09-11T09:36:22Z'
      last_timestamp:
        type: string
        format: datetime
        example: '2018-09-11T09:36:22Z'
      count:
        type: integer
        example: 1
      reason:
        type: string
```

## /services/{service-name}

### GET Method

```yaml title="Service Details"
    get:
      tags:
      - "Services"
      description: "To get details of a services"
      operationId: "get service"
      parameters:
      - in: "path"
        name: service-name
        required: true
        type: string
      - in: "header"
        name: "AUTHORIZATION"
        description: "in this format: JWT [USER-TOKEN],  where [USER-TOKEN] is user's token"
        type: string
        required: true
      responses:
        200:          
          schema:
            $ref: "#/definitions/ServiceModel"
        401:
          description: "Authentication required"
          schema:
            $ref: "#/definitions/MessageResponse"
        404:
          description: "Service not found"
          schema:
            $ref: "#/definitions/MessageResponse"
```

#### GET Method Response Model

```yaml title="Service Model"
  ServiceModel:
    type: object
    properties:
      name:
        type: string
      state:
        type: string
      service_type:
        type: string
      url:
        type: string
      urls:
        type: array
        items:
          type: string
      pods:
        type: array
        items:
          $ref: "#/definitions/PodModel"
      start_date:
        type: string
        format: datetime
      last_update:
        type: string
        format: datetime
```

```yaml title="Pod Model"
  PodModel:
    type: object
    properties:
      name:
        type: string
        example: "foo-757f6849bd-4sfvf"
      created_at:
        type: string
        format: string
        example: "2018-09-11T09:36:22Z"
      containers:
        type: array
        items:
          $ref: "#/definitions/ContainerModel"
      events:
        type: array
        items:
          $ref: "#/definitions/PodEventModel"
```

```yaml title="Container Model"
  ContainerModel:
    type: object
    properties:
      name:
        type: string
        example: "foo"
      image:
        type: string
        example: "registry.hub.docker.com/library/nginx:stable-alpine"
      ready:
        type: boolean
        example: true
```

```yaml title="Pod Event Model"
  PodEventModel:
    type: object
    properties:
      message:
        type: string
      first_timestamp:
        type: string
        format: datetime
        example: '2018-09-11T09:36:22Z'
      last_timestamp:
        type: string
        format: datetime
        example: '2018-09-11T09:36:22Z'
      count:
        type: integer
        example: 1
      reason:
        type: string
```

### DELETE Method

```yaml title="Destroy a Service"
    delete:
      tags:
      - "Services"
      description: "To destroy a services"
      operationId: "destroy Services"
      parameters:
      - in: "path"
        name: service-name
        required: true
        type: string
      - in: "header"
        name: "AUTHORIZATION"
        description: "in this format: JWT [USER-TOKEN],  where [USER-TOKEN] is user's token"
        type: string
        required: true
      responses:
        200:
          description: "service has been destroyed"
          schema:
            $ref: "#/definitions/MessageResponse"
        401:
          description: "Authentication required"
          schema:
            $ref: "#/definitions/MessageResponse"
        404:
          description: "Service not found"
          schema:
            $ref: "#/definitions/MessageResponse"
```

#### DELETE Method Response Model

```yaml title="Message Response"
message: "service has been destroyed"
status_code: 200
```

## /services/{service-name}/logs

### GET Method

```yaml title="Get Logs Of a Service"
    get:
      tags:
      - "Services"
      description: "To get logs of a service"
      operationId: "get logs of a service"
      parameters:
      - in: "path"
        name: service-name
        required: true
        type: string
      - in: "query"
        name: "last_logged_time"
        required: false
        type: string
        description: "some sort of cursor on log lines"
      - in: "header"
        name: "AUTHORIZATION"
        description: "in this format: JWT [USER-TOKEN],  where [USER-TOKEN] is user's token"
        type: string
        required: true
      responses:
        200:
          $ref: '#/definitions/ServiceLogResponse'
        401:
          description: "Authentication required"
          schema:
            $ref: "#/definitions/MessageResponse"
        404:
          description: "Service not found"
          schema:
            $ref: "#/definitions/MessageResponse"
```

#### GET Service Logs

```yaml title="Service Log Response"
  ServiceLogResponse:
    type: object
    properties:
      last_logged_time:
        type: string
      logs:
        type: string
```


## /services/{service-name}/history

### GET Method

```yaml title="Get Service Deployment History"
    get:
      tags:
      - "Services"
      description: "To get history of a service deployments"
      operationId: "get deployment history of a service"
      parameters:
      - in: "path"
        name: service-name
        required: true
        type: string
      - in: "header"
        name: "AUTHORIZATION"
        description: "in this format: JWT [USER-TOKEN],  where [USER-TOKEN] is user's token"
        type: string
        required: true
      responses:
        200:
          $ref: '#/definitions/ServiceHistoryResponse'
        401:
          description: "Authentication required"
          schema:
            $ref: "#/definitions/MessageResponse"
        404:
          description: "Service not found"
          schema:
            $ref: "#/definitions/MessageResponse"
```

#### GET Method Response Model

```yaml title="Service History Response"
  ServiceHistoryResponse:
    type: object
    properties:
      id:
        type: integer
      name:
        type: string
      manifest:
        type: object
      created_at:
        type: string
```

## /services/{service-name}/history/{history-id}

### DELETE Method

```yaml title="DELETE Service Deployment Hist"
    delete:
      tags:
      - "Services"
      description: "To delete deployment history record of a service"
      operationId: "delete deployment history record of a service"
      parameters:
      - in: "path"
        name: service-name
        required: true
        type: string
      - in: "path"
        name: history-id
        required: true
        type: string
      - in: "header"
        name: "AUTHORIZATION"
        description: "in this format: JWT [USER-TOKEN],  where [USER-TOKEN] is user's token"
        type: string
        required: true
      responses:
        200:
          $ref: '#/definitions/MessageResponse'
        401:
          description: "Authentication required"
          schema:
            $ref: "#/definitions/MessageResponse"
        404:
          description: "Service not found"
          schema:
            $ref: "#/definitions/MessageResponse"
```

#### DELETE Method Response Model

```yaml title="Message Response"
message: "service {SERVICE_NAME}'s history {HISTORY_ID} deleted successfully"
status_code: 200
```

## /services/rollbacks

### POST Method

```yaml title="Rollback a Service to Specific Deployment"
    post:
        tags:
        - "Services"
        description: "To rollback deployment of a service"
        operationId: "rollback deployment of a service"
        parameters:
        - in: "body"
          name: service
          required: true
          schema:
            $ref: "#/definitions/ServiceRollbackModel"
        - in: "header"
          name: "AUTHORIZATION"
          description: "in this format: JWT [USER-TOKEN],  where [USER-TOKEN] is user's token"
          type: string
          required: true
        responses:
          200:
            description: "Contains require messages"
            schema:
              $ref: "#/definitions/ServiceModel"
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

```yaml title="Service Model"
  ServiceModel:
    type: object
    properties:
      name:
        type: string
      state:
        type: string
      service_type:
        type: string
      url:
        type: string
      urls:
        type: array
        items:
          type: string
      pods:
        type: array
        items:
          $ref: "#/definitions/PodModel"
      start_date:
        type: string
        format: datetime
      last_update:
        type: string
        format: datetime
```

```yaml title="Pod Model"
  PodModel:
    type: object
    properties:
      name:
        type: string
        example: "foo-757f6849bd-4sfvf"
      created_at:
        type: string
        format: string
        example: "2018-09-11T09:36:22Z"
      containers:
        type: array
        items:
          $ref: "#/definitions/ContainerModel"
      events:
        type: array
        items:
          $ref: "#/definitions/PodEventModel"
```

```yaml title="Container Model"
  ContainerModel:
    type: object
    properties:
      name:
        type: string
        example: "foo"
      image:
        type: string
        example: "registry.hub.docker.com/library/nginx:stable-alpine"
      ready:
        type: boolean
        example: true
```

[swagger]: https://swagger.io
[fandogh_contracts]: https://github.com/fandoghpaas/fandogh-cli/tree/master/api-docs
[service_manifest]: /docs/services/service-manifest