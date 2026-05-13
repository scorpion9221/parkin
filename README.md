# Parkin Fullstack Project

Your frontend is now connected to a Node.js / Express / MongoDB backend.

## Run

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Mac/Linux:

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Open: `http://localhost:5000`

Test backend: `http://localhost:5000/backend-status`

## MongoDB

Edit `backend/.env` and set:

```env
MONGO_URI=mongodb://127.0.0.1:27017/parkin
JWT_SECRET=change_this_secret_before_demo
PORT=5000
```

For Atlas, replace `MONGO_URI` with your Atlas connection string.

## Features connected to DB

- Register saves real users.
- Login checks hashed password.
- JWT keeps login session.
- Checkout saves Booking + Payment.
- Dashboard and History read from MongoDB.
- Wallet top-up / transfer updates MongoDB.
