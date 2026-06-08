# Verity
**A Debate Social Media Platform for Capstone Project**

Verity is a full-stack web application that allows users to post, discuss, and engage in debates. It comes fully equipped with moderation & administration features to manage posts, topics and users. Users are also free to vote for their stance and upvote/downvote comments. Verity has a built in function known as the **Consensus Service** to determine which comments are commonly accepted by both sides in a debate. AI Summarisation features are also applied to Posts to summarise debate contents.

---

## 🛠 Prerequisites
Ensure you have the following installed before proceeding:

* **Java 17 or higher** (JDK)
* **Node.js** (v18+) & **npm**
* **MySQL Server 8.0+**
* **Git**

---

## 🚀 Installation & Setup

### 1. Database Configuration
Open your MySQL Command Line Client or Workbench and run:
```sql
CREATE DATABASE verity;
```
- Import the verity.sql file (located in the zipped folder) into MySQL Workbench by navigating [ Server -> Import Data ]
- Select TestData Provided in the Repository

Admin: 
- email: haojerhs@gmail.com
- password: @Haojerh123

Moderator:
- email: haojerh@gmail.com
- password: @Haojerh123

User:
- email: celine@gmail.com
- password: @Celine123

- email: johndoe@gmail.com
- password: @Johndoe123

- email: bro@gmail.com
- password: @Bro1234

- email: johnny@gmail.com
- password: @Johnny123

### 2. Backend Setup (Spring Boot)
Navigate to the backend directory:

``` Bash
cd backend
```
**Environment Variables**: Create a .env file in the backend/ root (same folder as pom.xml). Use the following template:

``` Plaintext
API_KEY=your_gemini_api_key
DATABASE_URL=jdbc:mysql://localhost:3306/verity?useSSL=false&serverTimezone=UTC
DATABASE_USERNAME=root
DATABASE_PASSWORD=root
```
(Note: Use .env.example as a reference. Never commit your actual .env file.)

Run the Application:

``` Bash
./mvnw spring-boot:run
```
The backend will start at: http://localhost:8080

---
### 3. Frontend Setup (React + Tailwind)
Open a new terminal and navigate to the frontend directory:

``` Bash
cd frontend
```
Install dependencies:

```Bash
npm install
```
Launch the development server:

``` Bash
npm run dev
```
The frontend will start at: http://localhost:5173

## 🏗 Project Architecture
Verity uses a Decoupled Architecture to ensure scalability and security:

- **Frontend**: React.js with Tailwind CSS for a responsive, modern UI.

- **Backend**: Spring Boot (Java) implementing a Hybrid Security model (JWT + Persistence-based validation).

- **AI Integration**: Google Gemini API for real-time debate contents summarisation.

- **Database**: MySQL for relational data integrity.

---

## 🛡 Security & Best Practices
- **Environment Isolation**: Sensitive keys are managed via .env files and are excluded from version control via .gitignore.

- **Role-Based Access Control (RBAC)**: Distinct permissions for USER, MODERATOR, and ADMIN.

- **Audit Logging**: Automatic tracking of system actions (CreatedBy, ModifiedBy, DeletedFlags).
---

## 📝 Troubleshooting
- **Database Connection Failed**: Ensure your MySQL service is running and that the DATABASE_URL in your .env matches your local settings.

- **Port 8080 already in use**: Stop any other local services or change the port in application.yml.

- **Missing API Key**: Ensure the API_KEY in your .env is a valid Google Gemini key from Google AI Studio.
"""
