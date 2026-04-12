# Cafe Menu Management System

A full-stack web application where customers can browse cafe menus without an account, while cafe owners and administrators manage their menus through a secure role-based system.

---

## Live Demo

[cafemenu123.onrender.com](https://cafemenu123.onrender.com/)

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, TypeScript, Tailwind CSS v4, Vite |
| Backend | Node.js, Express 5, TypeScript, tsx |
| Database | MongoDB Atlas (Mongoose) |
| Auth | JWT, bcryptjs |
| File Uploads | Multer |
| Email | Nodemailer |
| Deployment | Render.com |

---

## Features

### Customers (No Login Required)
- Browse all registered cafes
- View menu items with images, descriptions, and prices
- Filter by category and search by name

### Admin (Cafe Owner)
- Secure login with email and password
- Add, edit, and delete menu items with image uploads
- Manage cafe profile and settings
- Request account creation via the Super Admin

### Super Admin
- Full system control
- Create, update, and delete admin accounts
- Review and approve account requests
- Oversee all cafes in the system

### Security
- Role-based access control (RBAC) — `user`, `admin`, `superadmin`
- JWT-protected routes
- Password hashing with bcryptjs
- Password reset via email token

---

## Project Structure

```
cafe-menu-management/
├── backend/
│   ├── config/
│   │   └── db.ts               # MongoDB connection
│   ├── controller/
│   │   ├── userController.ts
│   │   ├── ietmController.ts
│   │   └── accountRequestController.ts
│   ├── middleWare/
│   │   └── auth.ts             # JWT auth middleware
│   ├── models/
│   │   ├── userModel.ts
│   │   ├── itemModel.ts
│   │   └── accountRequestModel.ts
│   ├── route/
│   │   ├── userRouter.ts
│   │   ├── itemRouter.ts
│   │   └── accountRequestRouter.ts
│   ├── uploads/                # Uploaded item images
│   ├── server.ts
│   └── tsconfig.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/         # Reusable UI components
    │   ├── context/            # Global state (StoreContext)
    │   ├── pages/              # Route-level page components
    │   └── App.tsx
    └── index.html
```

---

## Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB Atlas account

### 1. Clone the repo

```bash
git clone https://github.com/your-username/cafe-menu-management.git
cd cafe-menu-management
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=3000
MONGODB_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=your_jwt_secret
EXPIRE_TIME=7d
```

Start the backend:

```bash
npm start
```

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` and the backend at `http://localhost:3000`.

---

## API Reference

### Items

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/items/get` | Get all items (admin view) | Admin |
| GET | `/items/get/:id` | Get single item | Admin |
| GET | `/items/getItem/:id` | Get items by owner | Public |
| POST | `/items/add` | Add new item | Admin |
| PUT | `/items/update/:id` | Update item | Admin |
| DELETE | `/items/delete/:id` | Delete item | Admin |

### Users

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/user/get` | Get all cafes | Public |
| GET | `/user/get/:id` | Get single cafe | Public |
| POST | `/user/login` | Login | Public |
| POST | `/user/register` | Register admin | Super Admin |
| PUT | `/user/update/:id` | Update profile | Admin |
| DELETE | `/user/delete/:id` | Remove admin | Super Admin |

### Account Requests

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/requests/create` | Submit account request | Public |
| GET | `/requests/get` | View all requests | Super Admin |
| DELETE | `/requests/delete/:id` | Remove request | Super Admin |

---

## Routes (Frontend)

| Path | Component | Access |
|---|---|---|
| `/` | UserList | Public |
| `/user` | UserHomePage | Public |
| `/login` | LoginPage | Public |
| `/forgot-password` | ForgotPasswordPage | Public |
| `/reset-password/:token` | ResetPasswordPage | Public |
| `/contact-admin` | ContactAdminPage | Public |
| `/admin/*` | AdminHomePage | Admin |
| `/superadmin/*` | SuperAdminHomePage | Super Admin |

---

## Roadmap

- [ ] Order tracking system
- [ ] Payment integration
- [ ] Dashboard analytics
- [ ] Email notifications for orders

---

## Author

**Teumay Werashe**

If you found this project useful, consider giving it a star.
