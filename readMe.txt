# Book Store

This project was developed as part of a practice test at Techin.

## Overview

This project is a simple Node.js application that serves as a backend for managing books and orders. It utilizes Express.js for handling API routes, Mongoose for MongoDB database interaction, and provides various endpoints for performing CRUD (Create, Read, Update, Delete) operations on books and orders.

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running

### Installation

1. Clone the repository:

   ```bash
   git clone [repository_url]
   ```

2. Install dependencies:

   ```bash
   cd [project_folder]
   npm install
   ```

3. Set up environment variables:
Create a .env file in the root directory with the following content:

```bash
PORT=3000
DATABASE_URL=[Your MongoDB Connection URL]
```

4. Start the server:

   ```bash
   npm start
   ```
5. Use import_delete_books.js to import/delete books to/from database.


   ```bash
   node import_delete_books.js --import
   or
   node import_delete_books.js --delete
   ```

## API Endpoints

- **GET /api/v1/books**: Retrieve a list of books based on query parameters.
- **GET /api/v1/books/:id**: Retrieve a specific book by ID.
- **POST /api/v1/books**: Create a new book.
- **PUT /api/v1/books/:id**: Update a specific book by ID.
- **DELETE /api/v1/books/:id**: Delete a specific book by ID.

- **GET /api/v1/orders**: Retrieve a list of orders.
- **GET /api/v1/orders/:id**: Retrieve a specific order by ID.
- **POST /api/v1/orders**: Create a new order.
- **PUT /api/v1/orders/:id**: Update a specific order by ID.
- **DELETE /api/v1/orders/:id**: Delete a specific order by ID.


## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Author

- [Dmitrij](https://github.com/darkeris345)


