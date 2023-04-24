## Application Setup

### Prerequisites

- Node.js (v14 or higher)
- Docker (if using Docker for running the application in a container)

### Installation
1. Clone the repository to your local machine.

```bash
git clone git@github.com:gustavovalle23/restaurant-monolith-node.git
```

2. Navigate to the project directory.

```bash
cd restaurant-monolith-node
```

3. Install dependencies.

```bash
yarn install
```

### Database Setup

The application uses Prisma for database management. Follow the steps below to set up the database:

1. Up the database migration to create the initial schema.

```bash
task run:db
```

2. Run the database migration to create the initial schema.

```bash
task prisma
```

### Running the Application

1. Start the application.

At local machine:
```bash
node index.js
```

Container:
```bash
task run
```

2. Enter the container to access the application.

```bash
task app
```

### Testing the Application

Use a REST API client (such as Postman or cURL) to test the application. Send a POST request to the following URL with the request body as shown below:

```
POST {{baseUrl}}:3000/users
Content-Type: application/json

{
  "name": "myuser",
  "password": "mypassword",
  "email": "email@gmail.com",
  "birthDate": "1999-01-01",
  "address": {
    "country": "BR",
    "state": "SP",
    "street": "Fake Street",
    "number": 23
  }
}
```
