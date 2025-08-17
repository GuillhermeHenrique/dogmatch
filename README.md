# 🐶 DogMatch – Full Stack Adoption Platform

DogMatch is a fully functional and scalable pet adoption platform built from scratch with a modern full-stack architecture. Designed to connect dogs with their ideal human companions, this project highlights robust backend development with Node.js, Express, MySQL, and Prisma, as well as a frontend built with React and TypeScript, complete with JWT authentication and image upload functionality.

---

1. [🐶 DogMatch – Full Stack Adoption Platform](#-dogmatch--full-stack-adoption-platform)
2. [⚡ Main Features](#-main-features)
3. [🛠️ Technologies Used](#️-technologies-used)
4. [💻 Running Locally](#-running-locally)
5. [🌐 API Endpoints](#-api-endpoints)
6. [🧱 Database Schema](#-database-schema)
7. [📸 Screenshots](#-screenshots)
8. [👨‍💻 Author](#-author)

---

## ⚡ Main Features

### Back-end (Node + Express)
- RESTful API built with Node.js + Express
- JWT-based authentication for secure routes
- Password hashing with Bcrypt
- User CRUD operations (register, login, edit, get by ID)
- Pet CRUD operations (create, read, update, delete)
- Schedule and conclude adoptions
- File uploads for user avatars and multiple pet images via Multer
- Database management using Prisma ORM with MySQL
- Relations between users and pets (ownership and adoption)

### Front-end (React + TypeScript)
- UI built with React + TypeScript
- State and global data management using Context API
- Custom hook for API requests: useApi
- Client-side routing with React Router DOM and navigation using useNavigate
- Hooks utilized for component logic: useState, useEffect, useContext, useParams
- User registration, login, and profile editing
- Display all pets, user’s own pets, and adopted pets
- Schedule and track adoptions
- Upload multiple images for each pet
- Client-side form validation
- Integration with backend API using Axios

---

## 🛠️ Technologies Used

### Back-end:
- Node.js
- Express
- Prisma ORM
- MySQL
- JWT for authentication
- Multer for file uploads
- Bcrypt for password hashing
- Cookie-parser & CORS

### Front-end:
- React
- TypeScript
- Context API
- Hooks: UseState, UseEffect, UseParams, UseContext
- React Router
- Axios

---

## 💻 Running Locally

### Back-end Setup

#### 1. Clone the repository
    git clone https://github.com/GuillhermeHenrique/dogmatch
    cd your-repo-name

#### 2. Install dependencies
    npm install

#### 3. Configure environment variables in a <code>.env</code> file:
    DATABASE_URL="mysql://user:password@localhost:3306/dogmatch_db"
    JWT_SECRET="your_secret_key"

#### 4. Run Prisma migrations:
    npx prisma migrate dev

#### 5. Start the server:
    npm start

### Front-end Setup

#### 1. Navigate to the frontend folder:
    cd frontend

#### 2. Install dependencies
    npm install

#### 3. Start the development server:
    npm run dev

---

## 🌐 API Endpoints

### User Routes

| Method | Route         | Description                                  | Auth Required |
|--------|---------------|----------------------------------------------|---------------|
| POST   | /register     | Register a new user                          | No            |
| POST   | /login        | User login                                   | No            |
| GET    | /checkuser    | Check authenticated user                     | No            |
| GET    | /:id          | Get user by ID                               | No            |
| PATCH  | /edit/:id     | Edit user profile with optional image upload | Yes           |

### Pet Routes

| Method | Route             | Description                                   | Auth Required |
|--------|-------------------|-----------------------------------------------|---------------|
| POST   | /create           | Add a new pet with multiple images            | Yes           |
| GET    | /                 | Get all pets                                  | No            |
| GET    | /mypets           | Get all pets created by logged-in user        | Yes           |
| GET    | /myadoptions      | Get all pets adopted by logged-in user        | Yes           |
| GET    | /:id              | Get pet by ID                                 | No            |
| DELETE | /:id              | Delete pet by ID                              | Yes           |
| PATCH  | /:id              | Update pet details with optional images       | Yes           |
| PATCH  | /schedule/:id     | Schedule an adoption                          | Yes           |
| PATCH  | /conclude/:id     | Conclude an adoption                          | Yes           |

---

## 🧱 Database Schema

**The project uses **Prisma** with **MySQL**. Main models:**

### User
- **Fields:**  
  - `id` (String, UUID, Primary Key)  
  - `name` (String)  
  - `email` (String, Unique)  
  - `password` (String)  
  - `image` (String, Optional)  
  - `phone` (String)  
  - `createdAt` (DateTime, default: now)  
  - `updatedAt` (DateTime, auto-updated)
- **Relations:**  
  - `pets`: one-to-many with `Pet` (as owner, relation: `UserPets`)  
  - `adoptions`: one-to-many with `Pet` (as adopter, relation: `UserAdoptions`)  

### Pet
- **Fields:**  
  - `id` (String, UUID, Primary Key)  
  - `name` (String)  
  - `age` (Int)  
  - `weight` (Float)  
  - `color` (String)  
  - `available` (Boolean, default: true)  
  - `userId` (String, Foreign Key → User.id)  
  - `adoptedById` (String, Foreign Key → User.id, Optional)  
  - `createdAt` (DateTime, default: now)  
  - `updatedAt` (DateTime, auto-updated)
- **Relations:**  
  - `images`: one-to-many with `PetImage`  
  - `user`: many-to-one with `User` (owner, relation: `UserPets`, cascade on delete)  
  - `adopter`: many-to-one with `User` (adopter, relation: `UserAdoptions`, cascade on delete)  

### PetImage
- **Fields:**  
  - `id` (String, UUID, Primary Key)  
  - `url` (String)  
  - `petId` (String, Foreign Key → Pet.id)  
  - `createdAt` (DateTime, default: now)
- **Relations:**  
  - `pet`: many-to-one with `Pet` (cascade on delete)  


---

## 📸 Screenshots

### Home page
<img src="./frontend/public/home.png">

### Details pet page
<img src="./frontend/public/pet_details_clean.png">

### Register and login page
<img src="./frontend/public/register_page.png">
<img src="./frontend/public/login_page.png">

### My pets page
<img src="./frontend/public/mypets_page.png">

## Edit pet page
<img src="./frontend/public/editpet_page.png">

### My adoptions page
<img src="./frontend/public/myadoptions_page.png">

### Profile page
<img src="./frontend/public/profile_page.png">

---

## 👨‍💻 Author

**Developed by Guilherme Henrique**

- **E-mail**: guilhermecafe1010@gmail.com
- **Linkedin**: [/in/guilhermehenriique](https://www.linkedin.com/in/guilhermehenriique)
- **GitHub**: [GuillhermeHenrique](https://github.com/guillhermeHenrique)
