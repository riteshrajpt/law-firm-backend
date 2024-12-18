# Law Firm Web Application

This is a web application built for managing appointments, invoicing, and user management in a law firm, developed using the MERN stack (MongoDB, Express.js, React, Node.js). It includes features like appointment scheduling, invoicing, and user authentication for both clients and lawyers.

## Features

- **User Authentication**: Registration, login, and JWT-based authentication for secure access.
- **Appointment Management**: Schedule, view, and manage client-lawyer appointments.
- **Invoicing**: Create, view, and manage invoices for completed appointments.
- **Role-based Access Control**: Different access levels for admin and regular users.
- **Notifications**: Email notifications for clients and lawyers regarding appointments.

## Tech Stack

- **Frontend**: React.js, Redux, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Email Notifications**: Nodemailer
- **Deployment**: Heroku / AWS (For production)

## Installation

### Backend

1. Clone this repository:

   ```bash
   git clone https://github.com/riteshrajpt/law-firm-backend.git
2. Navigate to the backend directory:

```bash
   cd law-firm-backend
   Install the required dependencies:
   npm install
   Create a .env file in the root directory and add the necessary environment variables, such as:
   MONGO_URI=your_mongo_database_uri
   JWT_SECRET=your_jwt_secret
   EMAIL_HOST=your_email_smtp_host
   EMAIL_PORT=your_email_smtp_port
   EMAIL_USER=your_email_address
   EMAIL_PASS=your_email_password
   Start the backend server:
   npm start
   The backend will be running on http://localhost:5000.

```
3. API Endpoints
```bash
User Authentication
POST /api/auth/register - Register a new user.
POST /api/auth/login - Login an existing user.
Appointment Management
GET /api/appointments - Get all appointments.
GET /api/appointments/:id - Get a single appointment by ID.
POST /api/appointments - Create a new appointment.
PUT /api/appointments/:id - Update an existing appointment.
DELETE /api/appointments/:id - Delete an appointment.
Invoice Management
GET /api/invoices - Get all invoices.
GET /api/invoices/:id - Get a single invoice by ID.
POST /api/invoices - Create a new invoice.
PUT /api/invoices/:id - Update an existing invoice.
DELETE /api/invoices/:id - Delete an invoice.
Folder Structure
bash
Copy code
/backend
  /controllers        # Contains controller functions for each API route
  /models             # Mongoose models for database schema
  /routes             # API routes for appointment, invoicing, and auth
  /middleware         # Middleware for authentication and authorization
  /utils              # Utility functions (e.g., email sending)
  .env                # Environment variables for the backend
  server.js           # Entry point for the backend

/frontend
  /src
    /components       # React components for UI
    /pages            # Different pages of the application (e.g., Dashboard, Login)
    /redux            # Redux store and actions for state management
    App.js            # Main React component
  .env                # Environment variables for the frontend
  package.json        # Frontend dependencies and scripts
  index.js            # Entry point for the frontend
```
4. Contributing

We welcome contributions to the project! If you'd like to contribute, please fork the repository, make your changes, and submit a pull request.

Steps to contribute:
Fork the repository.
Clone your forked repository.
Create a new branch for your changes.
Make your changes and commit them.
Push your changes to your fork.
Submit a pull request to the main repository.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
Author: Ritesh Singh
Email: ritesh.singh@example.com
