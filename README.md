<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Order Processing API

A NestJS-based REST API for processing and managing customer orders with PostgreSQL database integration.

## Description

This is a production-ready order processing system built with [NestJS](https://github.com/nestjs/nest), a progressive Node.js framework for building efficient and scalable server-side applications. The application provides endpoints for creating, retrieving, updating, and deleting orders along with their associated items.

## Features

- **Order Management**: Create, read, update, and delete orders
- **Item Management**: Manage order items with product information and pricing
- **Data Validation**: Request validation using class-validator and class-transformer
- **Database**: PostgreSQL with TypeORM ORM
- **Error Handling**: Comprehensive exception handling with proper HTTP status codes
- **Testing**: Unit tests and e2e tests with Jest

## Prerequisites

- Node.js (v18 or higher)
- npm
- PostgreSQL 15 (or use Docker)
- Docker and Docker Compose (optional, for running PostgreSQL)

## Project Setup

### 1. Install dependencies

```bash
$ npm install
```

### 2. Set up PostgreSQL

**Option A: Using Docker Compose (Recommended)**

```bash
$ docker-compose up -d
```

This will start a PostgreSQL container with the following credentials:
- Host: `localhost`
- Port: `5432`
- Username: `nestuser`
- Password: `nestpassword`
- Database: `nestdb`

**Option B: Use existing PostgreSQL instance**

Update the database configuration in [src/app.module.ts](src/app.module.ts) with your PostgreSQL credentials.

## Compile and Run the Project

```bash
# development
$ npm run start

# watch mode (recommended for development)
$ npm run start:dev

# debug mode
$ npm run start:debug

# production mode
$ npm run start:prod
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Health Check

- `GET /` - Returns "Hello World!" (health check endpoint)

### Orders

- `POST /order` - Create a new order
- `GET /order` - Get all orders
- `GET /order/:id` - Get a specific order by ID
- `PATCH /order/:id` - Update an order
- `DELETE /order/:id` - Delete an order

### Example Request: Create Order

```bash
curl -X POST http://localhost:3000/order \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": 1,
    "value": 150.50,
    "items": [
      {
        "id": 1,
        "productId": 101,
        "quantity": 2,
        "price": 75.25
      }
    ]
  }'
```

## Project Structure

```
src/
├── orders/                 # Orders module
│   ├── dto/               # Data Transfer Objects
│   │   ├── create-order.dto.ts
│   │   └── update-order.dto.ts
│   ├── entities/          # TypeORM entities
│   │   ├── order.entity.ts
│   │   └── item.entity.ts
│   ├── mappers/          # Mappers
│   │   └── order.mapper.ts
│   ├── order.controller.ts
│   ├── order.service.ts
│   ├── order.module.ts
│   ├── order.controller.spec.ts
│   └── order.service.spec.ts
├── app.controller.ts       # Main app controller
├── app.service.ts          # Main app service
├── app.module.ts           # Root module
└── main.ts                 # Application entry point
```

## Database Schema

### Order Entity
- `orderId` (number, primary key) - Unique order identifier
- `value` (decimal) - Total order value
- `creationDate` (date) - Order creation timestamp
- `items` (relationship) - One-to-many relationship with Item entity

### Item Entity
- `id` (number, primary key) - Item identifier
- `orderId` (foreign key) - Reference to Order
- `productId` (number) - Product identifier
- `quantity` (number) - Item quantity
- `price` (decimal) - Item price

## Environment Variables

The application uses hardcoded database configuration in [src/app.module.ts](src/app.module.ts). For production, consider moving to `.env` variables:

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=nestuser
DB_PASSWORD=nestpassword
DB_DATABASE=nestdb
```

## Technologies

- **NestJS** ^11.0.1 - Framework
- **TypeORM** ^0.3.27 - ORM
- **PostgreSQL** - Database
- **class-validator** - Request validation
- **class-transformer** - DTO transformation
- **Jest** - Testing framework
- **TypeScript** ^5.7.3 - Language

## License

This project is [UNLICENSED](LICENSE).
