# Medication Refill System

## Project Overview

This project is a **Medication Refill Management System** designed to streamline the medication refill request process for users and pharmacists. It enables users to register, log in, view available medications, and request refills, while providing a dashboard with refill request statistics for pharmacists.

## Features

- User Registration and Login
- Medication Catalog with Refill Options
- Refill Request Tracking
- Dashboard for Refill Statistics
- Containerized deployment with Docker

## Setup Instructions

### Prerequisites

- Ensure Docker and Docker Compose are installed on your system.

### Step 1: Clone the Repository

```bash
git clone https://github.com/Ghonem23/medication-refill-system.git
cd medication-refill-system
```

### Step 2: Set Up Environment Variables

Ensure the following environment variables are set in your `docker-compose.yml` file and backend configuration:

**Database Configuration (Docker Compose):**
- `POSTGRES_DB`: Database name (e.g., `refill_system`)
- `POSTGRES_USER`: Database username (e.g., `postgres`)
- `POSTGRES_PASSWORD`: Database password (e.g., `root`)

**Backend Configuration:**
- `DATABASE_URL`: Connection URL for PostgreSQL (e.g., `postgres://postgres:root@db:5432/refill_system`)
- `DJANGO_SETTINGS_MODULE`: Set to `backend.settings`

### Step 3: Run the Application with Docker Compose

To build and run the entire stack (database, backend, and frontend) with Docker Compose, execute the following command in the project root:

```bash
docker-compose up --build
```

### Step 4: Access the Application

- **Backend**: [http://localhost:8000](http://localhost:8000)
- **Frontend**: [http://localhost:3000](http://localhost:3000)

## API Documentation

Here are the available API endpoints:

### Authentication

- **POST** `/api/auth/register`: Register a new user
  - Example: `{ "username": "test", "password": "password123" }`
- **POST** `/api/auth/login`: Log in and receive an access token

### Medications

- **GET** `/api/medications`: Retrieve a list of available medications
- **POST** `/api/refill_requests`: Request a medication refill
  - Example: `{ "medication_id": 1, "quantity": 2 }`

### Dashboard

- **GET** `/api/dashboard/stats`: Retrieve refill statistics for the dashboard

## Environment Variables

The following environment variables are required by the application:

| Variable              | Description                                     |
|-----------------------|-------------------------------------------------|
| `POSTGRES_DB`         | Name of the PostgreSQL database                 |
| `POSTGRES_USER`       | Username for PostgreSQL                         |
| `POSTGRES_PASSWORD`   | Password for PostgreSQL                         |
| `DATABASE_URL`        | PostgreSQL connection URL for Django            |
| `DJANGO_SETTINGS_MODULE` | Django settings module                        |

## Troubleshooting Tips

- **ESLint Warning**: If you see the warning "`response` is assigned a value but never used", this occurs because the `response` variable in `Register.js` is currently unused. To suppress this warning, you can add `// eslint-disable-next-line` above the line, though it has been decided to leave it as is.
- **Docker Build Errors**: Ensure Docker and Docker Compose are up-to-date and that your `docker-compose.yml` file references the correct file paths.
- **Database Connection Issues**: Verify the `DATABASE_URL` environment variable is correctly set in the Docker Compose file and that the PostgreSQL container is running.

## Technology Stack

- **Backend**: Django
- **Frontend**: React
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose