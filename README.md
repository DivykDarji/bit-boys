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
