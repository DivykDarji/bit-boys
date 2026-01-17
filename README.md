
```md
#  Pehchaan — Privacy-First Digital Identity Platform

Pehchaan is a privacy-centric digital identity wallet that enables users to securely manage and selectively share their personal identity data with third-party services such as hospitals, city portals, and government services using explicit consent and biometric verification.

The platform follows real-world authorization standards similar to Google Sign-In and DigiLocker while prioritizing user data ownership, transparency, and security.

---

## 🚀 Project Overview

Traditional identity systems collect and store excessive personal data without clear user control. Pehchaan solves this problem by introducing a consent-driven identity ecosystem where:

- Users fully control their identity data  
- Services request permission instead of automatically collecting data  
- Sensitive data access requires biometric verification  
- All data access events are logged and auditable  
- Permissions can be revoked anytime  

Pehchaan works as a central identity wallet that securely connects users with third-party service providers.

---

## ✨ Key Features

### 🔐 Secure Authentication
- Email and password login
- OTP verification for account ownership
- JWT-based session management

### 👤 Face Biometric Verification
- Face enrollment during registration
- Liveness verification support
- Face embedding matching using FaceNet
- No raw biometric image storage

### 🧾 Consent-Based Data Sharing
- Explicit consent before data sharing
- Three permission modes:
  - One-time access
  - Temporary time-limited access
  - Long-term access with manual revoke

### 📊 Identity Wallet Dashboard
- View connected services
- Manage granted permissions
- Revoke access anytime
- View access logs

### 🔗 Third-Party Portal Integration
- "Sign in with Pehchaan" authorization flow
- QR-based authentication support
- Secure token-based data sharing

---

## 🛠 Tech Stack

### Frontend (Identity Platform UI)
- React.js
- React Router
- Axios
- HTML5 Camera API

### Backend (Identity Server)
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Bcrypt Password Hashing

### Biometric Microservice
- Python Flask
- FaceNet (facenet-pytorch / keras)
- OpenCV
- REST API Integration

### Database
- MongoDB with Mongoose ODM

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

frontend/src
├── components
├── pages
├── services
└── App.jsx

```

### Backend
```

backend/
├── controllers
├── models
├── routes
├── middleware
├── services
├── utils
└── server.js

```

### Biometric Service
```

biometric-service/
├── models
├── services
├── haarcascades
├── app.py
└── requirements.txt

```

---

## ⚙️ Environment Variables Setup

### Backend Environment File

Create file:

```

backend/.env

```

Add:

```

PORT=5000
MONGO_URI=mongodb://localhost:27017/pehchaan
JWT_SECRET=your_secret_key
OTP_EMAIL=[your_email@example.com](mailto:your_email@example.com)
OTP_EMAIL_PASS=your_email_password
BIOMETRIC_SERVICE_URL=[http://127.0.0.1:5001](http://127.0.0.1:5001)

```

---

### Frontend Environment File

Create:

```

frontend/.env

```

Add:

```

VITE_API_URL=[http://localhost:5000/api](http://localhost:5000/api)

```

---

### Biometric Service Environment (Optional)

```

FLASK_PORT=5001
MODEL_PATH=models/facenet_keras.h5

```

---

## ▶️ How To Run Locally

---

### 1️⃣ Clone Repository

```

git clone [https://github.com/your-username/pehchaan.git](https://github.com/your-username/pehchaan.git)
cd pehchaan

```

---

### 2️⃣ Start Backend Server

```

cd backend
npm install
npm start

```

Backend runs on:

```

[http://localhost:5000](http://localhost:5000)

```

---

### 3️⃣ Start Biometric Service

Create virtual environment:

```

cd biometric-service
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py

```

Biometric service runs on:

```

[http://127.0.0.1:5001](http://127.0.0.1:5001)

```

---

### 4️⃣ Start Frontend

```

cd frontend
npm install
npm run dev

```

Frontend runs on:

```

[http://localhost:5173](http://localhost:5173)

```

---

## 🔑 Test Login Credentials (For Demo)

You can create your own account or use demo credentials if pre-seeded.

Example:

```

Email: [demo@pehchaan.com](mailto:demo@pehchaan.com)
Password: Demo@123
OTP: Received on registered email

```

---

## ⚠️ Basic Error Handling Implemented

The platform includes handling for:

- Invalid login credentials  
- OTP verification failure  
- Unauthorized access attempts  
- Token expiration  
- Permission denial  
- Face verification mismatch  
- Biometric service downtime  
- Missing consent scopes  

Standard HTTP response codes are used:

- 200 — Success  
- 400 — Validation Error  
- 401 — Unauthorized  
- 403 — Forbidden  
- 500 — Internal Server Error  

---

## 🔒 Security & Privacy Practices

Pehchaan follows privacy-first design principles:

- Passwords stored using secure hashing  
- JWT-based authentication  
- Face embeddings stored instead of raw images  
- No biometric image storage  
- Consent-based scoped data sharing  
- Automatic permission expiry  
- Activity logging and auditing  

---

## ✅ No Secrets in Repository Confirmation

This repository does NOT contain:

- API keys  
- Production credentials  
- Email passwords  
- Private tokens  
- Database passwords  

All sensitive values are managed using `.env` files and environment variables.

---

## 👥 Contributors

IEEE Ahmedabad University Student Branch must be added as a contributor:

https://github.com/IEEE-Ahmedabad-University-SB-Official

---

## 📜 License

This project is developed for academic, educational, and hackathon demonstration purposes.
```

---

If you want, I can also generate:

* API documentation section for README
* Architecture diagram text block
* Badges (build, license, tech stack)
* Professional GitHub repo description + tags
* Hackathon submission description

Just say the word 👍
