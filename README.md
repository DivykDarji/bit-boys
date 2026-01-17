
---

#  Pehchaan — Privacy-First Digital Identity Platform

**Pehchaan** is a privacy-centric digital identity wallet that empowers users to securely manage and selectively share their personal identity data with third-party services such as hospitals, city portals, and government platforms using explicit consent and biometric verification.

The system is inspired by real-world identity standards like **Google Sign-In** and **DigiLocker**, but is designed with a stronger focus on **user ownership, transparency, and data minimization**.

---

## 🚀 Project Overview

Most traditional identity platforms collect excessive personal information and offer little control to users. Pehchaan introduces a **consent-driven identity ecosystem** where users decide exactly what data is shared, with whom, and for how long.

### Pehchaan Enables

* Full ownership and control of personal identity data
* Explicit permission-based data access
* Biometric verification for sensitive operations
* Transparent access logs and audit history
* Instant permission revocation

Pehchaan acts as a **central digital identity wallet** that securely connects users with verified third-party service providers.

---

## ✨ Key Features

### 🔐 Secure Authentication

* Email and password based login
* OTP verification for account ownership validation
* JWT-based session and authorization management

---

### 👤 Face Biometric Verification

* Face enrollment during user registration
* Liveness verification support
* Face embedding comparison using FaceNet
* No permanent storage of raw biometric images

---

### 🧾 Consent-Based Data Sharing

* Mandatory explicit consent before any data exchange
* Three access permission modes:

  * **One-Time Access** – Automatically revoked after use
  * **Temporary Access** – Time-bound permission
  * **Long-Term Access** – Manual revoke by user

---

### 📊 Identity Wallet Dashboard

* View connected services and integrations
* Monitor granted permissions
* Revoke access instantly
* View historical access activity logs

---

### 🔗 Third-Party Portal Integration

* “Sign in with Pehchaan” authorization flow
* Secure token-based data sharing with service providers

---

## 🛠 Technology Stack

### Frontend (Identity Platform UI)

* React.js
* React Router
* Axios
* HTML5 Camera API

---

### Backend (Identity Server)

* Node.js
* Express.js
* MongoDB
* JWT Authentication
* Bcrypt Password Hashing

---

### Biometric Microservice

* Python Flask
* FaceNet (facenet-pytorch / keras)
* OpenCV
* REST API Integration

---

### Database

* MongoDB with Mongoose ODM

---

## 📁 Project Folder Structure

```
privacy-id/

frontend/
backend/
biometric-service/
portals/
```

### Frontend

```
frontend/src/
components/
pages/
services/
App.jsx
```

### Backend

```
backend/
controllers/
models/
routes/
middleware/
services/
utils/
server.js
```

### Biometric Service

```
biometric-service/
models/
services/
haarcascades/
app.py
requirements.txt
```

---

## ⚙️ Environment Variables Setup

### Backend Configuration

Create file:

```
backend/.env
```

Add:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/pehchaan
JWT_SECRET=your_secret_key
OTP_EMAIL=your_email@example.com
OTP_EMAIL_PASS=your_email_password
BIOMETRIC_SERVICE_URL=http://127.0.0.1:5001
```

---

### Frontend Configuration

Create:

```
frontend/.env
```

Add:

```
VITE_API_URL=http://localhost:5000/api
```

---

### Biometric Service (Optional)

```
FLASK_PORT=5001
MODEL_PATH=models/facenet_keras.h5
```

---

## ▶️ How To Run Locally

Follow the steps below to run the complete platform locally.

---

### 1️⃣ Clone Repository

```
git clone https://github.com/your-username/pehchaan.git
cd pehchaan
```

---

### 2️⃣ Start Backend Server

```
cd backend
npm install
npm start
```

Backend will run on:

```
http://localhost:5000
```

---

### 3️⃣ Start Biometric Service

```
cd biometric-service
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Biometric service will run on:

```
http://127.0.0.1:5001
```

---

### 4️⃣ Start Frontend

```
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 🔑 Test Login Credentials (Demo Use)

You can create a new account or use demo credentials if available.

Example:

```
Email: demo@pehchaan.com
Password: Demo@123
OTP: Sent to registered email
```

---

## ⚠️ Basic Error Handling Implemented

The platform includes handling for:

* Invalid login credentials
* OTP verification failures
* Unauthorized access attempts
* Expired authentication tokens
* Permission denial errors
* Face verification mismatch
* Biometric service unavailability
* Missing or invalid consent scopes

### Standard HTTP Status Codes Used

* **200** — Success
* **400** — Validation Error
* **401** — Unauthorized
* **403** — Forbidden
* **500** — Internal Server Error

---

## 🔒 Security & Privacy Practices

Pehchaan is designed with privacy-by-default principles:

* Password hashing using secure encryption
* Token-based authentication
* Face embeddings stored instead of raw images
* No permanent biometric image storage
* Scoped consent-based data access
* Automatic permission expiry
* Transparent audit logging

---

## ✅ No Secrets In Repository Confirmation

This repository does **NOT** contain:

* API keys
* Production credentials
* Email passwords
* Private authentication tokens
* Database secrets

All sensitive values are managed using environment variables.

---

## 📜 License

This project is developed for academic, educational, and hackathon demonstration purposes.

---

