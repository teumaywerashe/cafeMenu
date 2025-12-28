# ☕ Cafe Menu Management System

A full-stack **Cafe Menu Management System**
   where customers can browse products without authentication(wothout logging in or creating account),
   while cafe owners and administrators manage the menu through a secure role-based system.

---

## 🚀 Live Demo

- **Frontend:**[https://cafemenu123.onrender.com/](clike_here)
- **Backend API:** [https://cafemenu-serverside.onrender.com](click_here)

---

## 🛠 Tech Stack

### Frontend
- React
- Tailwind css

### Backend
- Node.js
- Express.js
- MongoDB Atlas 

### Deployment
- Render..com

---

## ✨ Main Features

### 👥 Customers (No Login Required)
-Select his interseted cafe from the list of cafe registered in the system
- View cafe's products
- Browse by category
- search by name
- See prices and descriptions


### 🛠 Admin (Cafe Owner)
- Secure login using his email and password ,
- if dont have account contact the supper admin and ask him to create account
- Add, update, and delete products
- Manage cafe menu and orders
- Access protected admin routes

### 🛡 Super Admin
- Full system control
- Create, update, and remove admin accounts
- Manage admin privileges
- Oversee the entire cafe system

### 🔐 Security
- Role-based access control (RBAC)
- Protected admin and super admin routes
- Public access limited to browsing and ordering

---

## 📁 Project Structure
├── backend

│ ├── routes

│ ├── controllers

│ ├── middleware

│ ├── prisma

│ ├── config

│ └── server.js

│
├── frontend

│ ├── src

│ ├── components

│ ├── pages

│ └── main.jsx

│

└── README.md




---

## ⚙️ Environment Variables

The backend uses environment variables for configuration.  

.env


Example:

PORT=3000

MONGODB_URL=mongodb+srv://realUser:realPassword@cluster.mongodb.net/realDB

JWT_SECRET='<your_secret_key_of_json_web_token>'

EXPIRE_TIME=<'token _expire_time'>


## 🧪 Prisma Setup

Run the following commands inside the backend directory:

npx prisma generate

npx prisma migrate deploy


For local development:

npx prisma migrate dev


## ▶️ Run Locally

# Backend

cd backend

npm install

npm run dev

# Frontend
cd frontend
npm install
npm run dev

## 📡 API Overview

Method	Endpoint	Description

GET	/items/get	   Get all products

GET	/items/get/:id	Get single product

GET	/items/getItem/:id	Get user item product

POST	/items/add	Create product (Admin)

PUT	/items/update/:id	Update product (Admin)

DELETE	/items/delete/:id	Delete product (Admin)

GET   /user/get 	get all cafes

GET   /user/get/:id 	get single cafes

POST	/user/login	Admin login

POST	/user/register	Admin register

POST	/user/update/:id	Admin update profile

POST	/user/delete/:id	remove Admin





## 🧠 What This Project Demonstrates

Full-stack application architecture

RESTful API design

Role-based authentication & authorization


Secure environment variable handling

Production deployment with Render

## 📌 Future Improvements

Order tracking system

Payment integration

Dashboard analytics

Image upload for products

Email notifications

## 👤 Author
 
 Software Engineering Student — AAU

⭐ If you like this project, feel free to give it a star!
