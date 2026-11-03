# Project Name

Community Server

Also known in the code as the Event Server.

# Project Description

This project is a backend server for managing community events. It provides APIs to create, retrieve, update, delete, and join events. The application uses MongoDB as its database, Express.js as the server framework, and JWT-based authentication to protect sensitive routes.

The server is mainly designed for an event management system where organizers can manage events and users can join events. It stores event records and join records in MongoDB collections named `events` and `event-joins`.

# Project Tool, Technology and Package

Project tools and technologies used in this project:

- Node.js
- JavaScript (ES Modules)
- Express.js
- MongoDB
- CORS
- dotenv
- jose

Packages used in `package.json`:

- `express` - Web server framework
- `cors` - Enable cross-origin requests
- `dotenv` - Load environment variables from `.env`
- `mongodb` - MongoDB database driver
- `jose` - JWT verification and JWK support

Important environment variables:

- `PORT` - Server port (default: `3200`)
- `MONGODB_URI` - MongoDB connection string
- `CLIENT_URL` - Base URL used for the authentication JWKS endpoint

# API Documentation

Base URL:

- `http://localhost:3200` (or the configured `PORT`)

Authentication:

- Most write and protected routes require an `Authorization` header:
  - `Authorization: Bearer <token>`
- The server verifies the token using the JWK set from `${CLIENT_URL}/api/auth/jwks`.

## 1) Home API

### `GET /`

- Purpose: Welcome route
- Returns: A simple text response: `Welcome to the Event Server`

## 2) Event APIs

### `GET /events`

- Purpose: Get all events
- Returns: An array of event objects from the MongoDB `events` collection
- Data example: event title, description, date, location, organizer ID, etc.

### `GET /events/:id`

- Purpose: Get one specific event by MongoDB `_id`
- Protected: Yes
- Returns: A single event document

### `GET /myevents/:userId`

- Purpose: Get all events created by a specific organizer/user
- Protected: Yes
- Returns: An array of events where `organizerId` matches the given `userId`

### `POST /events`

- Purpose: Create a new event
- Protected: Yes
- Request body: New event data in JSON format
- Returns: MongoDB insert result

### `PATCH /events/:id`

- Purpose: Update an existing event
- Protected: Yes
- Request body: Updated event fields
- Returns: MongoDB update result

### `DELETE /events/:id`

- Purpose: Delete an event by ID
- Protected: Yes
- Returns: MongoDB delete result

## 3) Event Join APIs

### `GET /event-joins`

- Purpose: Get all event-join records
- Protected: Yes
- Returns: An array of join records from the MongoDB `event-joins` collection

### `POST /event-joins`

- Purpose: Create a new join registration
- Protected: Yes
- Request body: Join data in JSON format
- Returns: MongoDB insert result

### `GET /event-joins/:userId/event/:eventId`

- Purpose: Check whether a user has joined a specific event
- Protected: Yes
- Returns: A single join record matching the `userId` and `eventId`

### `DELETE /event-joins/:id`

- Purpose: Remove a join record by its MongoDB ID
- Protected: Yes
- Returns: MongoDB delete result

### `GET /event-joins/:userId`

- Purpose: Get all join records for one user
- Protected: Yes
- Returns: An array of join records where `joinerdata.joinerId` matches the selected user

## API Data Overview

This server mainly exposes two types of data:

1. Event Data
   - Event information such as title, description, date, location, organizer, and event metadata
   - Stored in the `events` collection

2. Event Join Data
   - User participation records, including which user joined which event
   - Stored in the `event-joins` collection

## Summary

This project is a backend event community management server that helps organize and manage event information and user participation using MongoDB and Express. It exposes REST APIs for event management and join tracking, with token-based protection for secure operations.
