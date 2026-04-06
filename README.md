# Verity
A Debate Social Media Platform for Capstone Project

Verity is a full-stack web application that allows users to post, discuss, and engage in debates, with future support for AI-based features such as toxic content detection and content summarization.

## Required Installations:
### MySQL
https://dev.mysql.com/downloads/installer/
- Choose MySQL Installer (Web version)
- Use Default Setup
- Set username and password during installation (recommended: root / root)

### Node.js
https://nodejs.org/
After installation, verify:
```
node -v
npm -v
```

### Git
https://git-scm.com/
After installation, verify:
```
git --version
```

## How to Run the Project
### 1. Run Frontend (React)
Open a terminal:
```
cd frontend
npm install
npm run dev
```
Frontend will run at: http://localhost:5173

### 2. Run Backend (Spring Boot)
Open a second terminal:
```
cd backend
.\mvnw spring-boot:run
```
Backend will run at: http://localhost:8080

### 3. Database Setup (MySQL)
Make sure MySQL is running, then create the database in MYSQL command line client:
```
CREATE DATABASE verity;
```

# Project Architecture
Frontend (React + Tailwind), Backend (Spring Boot), Database (MySQL)
