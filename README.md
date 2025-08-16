# DogMatch – Full Stack Adotion Plataform

DogMatch is a fully functional and scalable pet adoption platform built from scratch with a modern full-stack architecture. Designed to connect dogs with their ideal human companions, this project highlights robust backend development with Node.js, Express, MySQL, and Prisma, as well as a frontend built with React and TypeScript, complete with JWT authentication and image upload functionality.

---

## Main Features

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
- Responsive UI built with React + TypeScript
- User registration, login, and profile editing
- Display all pets, user’s own pets, and adopted pets
- Schedule and track adoptions
- Upload multiple images for each pet
- Client-side form validation
- Routing using React Router DOM
- API integration using Axios

---

## Technologies Used

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

## Running Locally

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

## API Endpoints

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

## Database Schema

The project uses Prisma with MySQL. Main models:

### User
- id, name, email, password, phone, image
- Relations: pets (UserPets), adoptions (UserAdoptions)

### Pet
- id, name, age, weight, color, available
- Relations: images (PetImage), owner (UserPets), adopter (UserAdoptions)
  
### PetImage
- id, url
- Relation: pet

---

## Author

Developed by Guilherme Henrique

- **E-mail**: guilhermecafe1010@gmail.com
- **Linkedin**: [/in/guilhermehenriique](https://www.linkedin.com/in/guilhermehenriique)
- **GitHub**: [GuillhermeHenrique](https://github.com/guillhermeHenrique)
