# STRIKERS NO TITLE CARS - E-Commerce Platform

## Overview
A full-stack car dealership platform where users can browse vehicles, contact sellers, and purchase directly via cryptocurrency.

## Tech Stack
- **Frontend:** React + Vite, Tailwind CSS, Zustand (state), Framer Motion, React Router
- **Backend:** Node.js + Express, MongoDB + Mongoose, Redis (ioredis), Nodemailer, Multer
- **Auth:** JWT (httpOnly cookies)
- **Payments:** Cryptocurrency (USDT TRC20, Bitcoin) — direct wallet transfers with screenshot upload

## Architecture
- Monorepo: `/backend` (Express API on port 5000), `/frontend` (Vite dev server on port 5173)
- Start command: `npm run dev` (backend) / `npm run dev` (frontend) — or use the "Run" workflow which runs both

## Key Features
- Car inventory with search, filter, category browsing
- **Buy Now flow:** Collect buyer info → select crypto payment method → display wallet address → upload payment screenshot → email admin
- **Contact Seller flow:** Direct inquiry form sent via email (Nodemailer)
- Favorites system, user auth (login/signup)
- Admin dashboard (product/category management, analytics)
- Floating Telegram button for quick contact
- PWA support

## Payment Flow
1. User clicks "Buy Now" on a car card or product page
2. Step 1: Enter email (required), phone and address (optional)
3. Step 2: Choose payment method — USDT TRC20, Bitcoin, or "Other" (redirects to contact form)
4. Step 3 (crypto): View wallet address with copy button, upload payment screenshot
5. Screenshot + buyer details emailed to admin via Nodemailer + Multer (multipart/form-data)

## Crypto Wallet Addresses
- USDT (TRC20): `TQdbH954hGM4KQt5CWZqgDNGDYuUTZym9b`
- Bitcoin (BTC): `147wjRuBmYSSc3zjBfSNB1SLDySmWGXCMD`

## Contact Info
- Email: hfvn637909@gmail.com
- Telegram: @yourz_bans (configurable via Admin → Contact Settings)

## Environment Variables Required
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — JWT signing secret
- `REDIS_URL` — Redis connection URL
- `SMTP_EMAIL` — Gmail address for sending emails
- `SMTP_APP_PASSWORD` — Gmail App Password
- `ADMIN_EMAIL` — Admin email to receive notifications (should be hfvn637909@gmail.com)
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — Image uploads
- `STRIPE_SECRET_KEY` — Stripe (legacy, not primary payment method)
- `CLIENT_URL` — Frontend URL for CORS

## Important Files
- `frontend/src/components/BuyNowModal.jsx` — The full 3-step Buy Now modal
- `frontend/src/components/ProductCard.jsx` — Car card with "Contact Seller" + "Buy Now"
- `frontend/src/pages/ProductDetailsPage.jsx` — Full product page with Buy Now
- `frontend/src/pages/ContactPage.jsx` — Inquiry form (Contact Seller flow)
- `backend/controllers/contact.controller.js` — sendInquiry + sendPurchaseNotification
- `backend/routes/contact.route.js` — /inquiry and /purchase endpoints
- `backend/models/contactSettings.model.js` — Contact info stored in DB
