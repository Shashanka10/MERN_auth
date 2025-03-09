# MERN Advanced Authentication

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue)
![License](https://img.shields.io/badge/License-MIT-green)

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that implements advanced authentication features such as **forgot password**, **reset password**, **signup with verification code**, **login**, and more. This project is designed to provide a secure and scalable authentication system for modern web applications.

---

## Features

- **User Registration**: Users can sign up with their email , password and username. A verification code is sent to their email for account activation.
- **Email Verification**: Users must verify their email address using a one-time verification code sent to their inbox.
- **Login**: Secure login using email and password with JWT (JSON Web Token) authentication.
- **Forgot Password**: Users can request a password reset link if they forget their password.
- **Reset Password**: Users can reset their password where password reset link will be sent to their email.
- **Protected Routes**: Certain routes are protected and can only be accessed by authenticated users.
- **Error Handling**: Comprehensive error handling for both client and server-side errors.
- **Clean Design**: A clean user interface built with React.js, tailwindcss and framer motion.

---

## Technologies Used

- **Frontend**:
  - React.js
  - Axios (for API requests)
  - React Router (for routing)
  - Tailwind CSS (for styling)
  - framer motion (for animation)
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (for database)
  - Mongoose (for MongoDB object modeling)
  - JSON Web Tokens (JWT) (for authentication)
  - Nodemailer (for sending emails)
- **Other Tools**:
  - Postman (for API testing)
  - Git (for version control)

---

## Installation

Follow these steps to set up the project locally:

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB Atlas account or a local MongoDB instance.
- An email service provider (e.g., Gmail) for sending emails.

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Shashanka10/MERN_auth.git
2. **For Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev 
   Access the application (localhost:5173)
3. **For Backend**:
   ```bash
   cd backend
   npm install
   npm run dev
4. **Setup Environmental Variables**:
   ```bash
   .env
   PORT
   MONGODB_URI
   JWT_SECRET
   SMTP_HOST
   SMTP_PORT
   SMTP_SECURE
   SMTP_USER
   SMTP_PASS
   CLIENT_URL
   NODE_ENV
