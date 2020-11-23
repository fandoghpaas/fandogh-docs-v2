---
id: domains
title: دامنه‌ها
sidebar_label: دامنه‌ها
---

در این مستند شما می‌توانید endpointهای مربوط به عملیات دامنه‌ها و همچنین مدل داده‌های آن‌ها را مشاهده کنید.

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

## /domains

### GET Method

```yaml title="List Domains"
    get:
      tags:
      - "Domains"
      description: "To get list of user domains"
      operationId: "get Domains"
      parameters:
      - in: "header"
        name: "AUTHORIZATION"
        description: "in this format: JWT [USER-TOKEN],  where [USER-TOKEN] is user's token"
        type: string
        required: true
      responses:
        200:
          description: "array of user domains"
          schema:
            type: array
            items:
              $ref: "#/definitions/DomainModel"
        401:
          description: "Authentication required"
          schema:
            $ref: "#/definitions/MessageResponse"
```

#### GET Response Model

```yaml title="Domain Model"
  DomainModel:
    type: object
    properties:
      name:
        type: string
      verification_key:
        type: string
      verified:
        type: boolean
      certificate:
        $ref: "#/definitions/CertificateModel"
```

```yaml title="Certificate Model"
  CertificateModel:
    type: object
    properties:
      id:
        type: integer
      domain_name:
        type: string
      created_at:
        type: string
        format: datetime
      details:
        type: object
        description: "contains further information for user"
```

### POST Method

```yaml title="Create New Domain"
    post:
      tags:
      - "Domains"
      description: "To add new domain"
      operationId: "Add domain"
      parameters:
      - in: "body"
        name: "body"
        description: "Domain object"
        required: true
        schema:
          $ref: "#/definitions/CreateDomain"
      - in: "header"
        name: "AUTHORIZATION"
        description: "in this format: JWT [USER-TOKEN],  where [USER-TOKEN] is user's token"
        type: string
        required: true

      responses:
        200:
          description: "Contains require messages"
          schema:
            $ref: "#/definitions/DomainModel"
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

```yaml title="Create Domain Model"
  CreateDomain:
    type: object
    required:
      - name
    properties:
      name:
        type: string
        description: "a valid domain name"
```

#### POST Method Response Model

```yaml title="Domain Model"
  DomainModel:
    type: object
    properties:
      name:
        type: string
      verification_key:
        type: string
      verified:
        type: boolean
      certificate:
        $ref: "#/definitions/CertificateModel"
```

```yaml title="Certificate Model"
  CertificateModel:
    type: object
    properties:
      id:
        type: integer
      domain_name:
        type: string
      created_at:
        type: string
        format: datetime
      details:
        type: object
        description: "contains further information for user"
```

## /domains/{domain_name}

### DELETE Method

```yaml title="Delete a Domain"
    delete:
      tags:
      - "Domains"
      description: "To delete a domain"
      operationId: "Delete domain"
      parameters:
      - in: "path"
        name: "domain_name"
        type: string
        required: true
      - in: "header"
        name: "AUTHORIZATION"
        description: "in this format: JWT [USER-TOKEN],  where [USER-TOKEN] is user's token"
        type: string
        required: true
      responses:
        200:
          description: "Domain object deleted successfully"
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
message: "Domain {DOMAIN_NAME} has been deleted successfully"
status_code: 200
```

## /domains/{domain_name}/verifications

### POST Method

```yaml title="Verify Domain"
    post:
      tags:
      - "Domains"
      description: "To verify a domain"
      operationId: "Verify domain"
      parameters:
      - in: "path"
        name: "domain_name"
        type: string
        required: true
      - in: "header"
        name: "AUTHORIZATION"
        description: "in this format: JWT [USER-TOKEN],  where [USER-TOKEN] is user's token"
        type: string
        required: true
      responses:
        200:
          description: "Domain object containing verification result"
          schema:
            $ref: "#/definitions/DomainModel"
        401:
          description: "Authentication required"
          schema:
            $ref: "#/definitions/MessageResponse"
        404:
          description: "Domain not found"
          schema:
            $ref: "#/definitions/MessageResponse"
        500:
          description: "Server Error, Do not rely on response body"
```

#### POST Method Response Model

```yaml title="Domain Model"
  DomainModel:
    type: object
    properties:
      name:
        type: string
      verification_key:
        type: string
      verified:
        type: boolean
      certificate:
        $ref: "#/definitions/CertificateModel"
```

```yaml title="Certificate Model"
  CertificateModel:
    type: object
    properties:
      id:
        type: integer
      domain_name:
        type: string
      created_at:
        type: string
        format: datetime
      details:
        type: object
        description: "contains further information for user"
```


## /domains/{domain_name}/certificate

### POST Method

```yaml title="Request Domain Certificate"
    post:
      tags:
      - "Domains"
      description: "To request certificate for a domain"
      operationId: "Request Certificate"
      parameters:
      - in: "path"
        name: "domain_name"
        type: string
        required: true
      - in: "header"
        name: "AUTHORIZATION"
        description: "in this format: JWT [USER-TOKEN],  where [USER-TOKEN] is user's token"
        type: string
        required: true
      responses:
        201:
          description: "Request has been submitted and getting certificate is in progress "
          schema:
            $ref: "#/definitions/CertificateModel"
        401:
          description: "Authentication required"
          schema:
            $ref: "#/definitions/MessageResponse"
        404:
          description: "Domain not found"
          schema:
            $ref: "#/definitions/MessageResponse"
        500:
          description: "Server Error, Do not rely on response body"
```

#### POST Method Response Model

```yaml title="Certificate Model"
  CertificateModel:
    type: object
    properties:
      id:
        type: integer
      domain_name:
        type: string
      created_at:
        type: string
        format: datetime
      details:
        type: object
        description: "contains further information for user"
```

### DELETE Method

```yaml title="Revoke Domain Certificate"
    delete:
        tags:
        - "Domains"
        description: "To revoke a certificate for a domain"
        operationId: "Revoke Certificate"
        parameters:
        - in: "path"
          name: "domain_name"
          type: string
          required: true
        - in: "header"
          name: "AUTHORIZATION"
          description: "in this format: JWT [USER-TOKEN],  where [USER-TOKEN] is user's token"
          type: string
          required: true
        responses:
          200:
            description: "Request has been submitted and getting certificate is in progress "
            schema:
              $ref: "#/definitions/MessageResponse"
          401:
            description: "Authentication required"
            schema:
              $ref: "#/definitions/MessageResponse"
          404:
            description: "Domain not found"
            schema:
              $ref: "#/definitions/MessageResponse"
          500:
            description: "Server Error, Do not rely on response body"
```

#### DELETE Method Response Model

```yaml title="Message Response"
message: "Your certificate has been revoked successfully"
status_code: 200
```


[swagger]: https://swagger.io
[fandogh_contracts]: https://github.com/fandoghpaas/fandogh-cli/tree/master/api-docs