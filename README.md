# i-Touch — Sports • Gaming • Mobile

Full-stack website for **i-Touch**: a sports shop + sportswear store + PS5 gaming zone +
mobile phones & accessories store. Product ordering happens **only via WhatsApp** — there is
no cart, checkout, or online payment anywhere in this project (by design).

## Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS + Framer Motion + Lucide Icons
- **Backend:** Node.js + Express.js
- **Database:** MongoDB Atlas (Mongoose)
- **Image Upload:** Cloudinary
- **Auth:** JWT (admin only) + bcrypt password hashing
- **Ordering:** WhatsApp `wa.me` deep links

## Project Structure

```
i-touch/
├── client/        # React frontend (Vite)
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── layouts/
│       ├── hooks/
│       ├── services/
│       ├── utils/
│       └── data/
└── server/        # Express backend
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── config/
    └── utils/      # includes seed.js
```

## 1. Backend Setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env` and fill in:

- `MONGO_URI` — your MongoDB Atlas connection string
- `JWT_SECRET` — any long random string
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — from your Cloudinary dashboard
- `CLIENT_URL` — your frontend URL (e.g. `http://localhost:5173`)
- `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` — credentials for the first admin account

Seed the database with an admin account, starter categories, sample products and an offer:

```bash
npm run seed
```

Start the API server:

```bash
npm run dev      # nodemon, auto-reload
# or
npm start
```

The API runs on `http://localhost:5000/api` by default. Health check: `GET /api/health`.

## 2. Frontend Setup

```bash
cd client
npm install
cp .env.example .env
```

Edit `client/.env`:

- `VITE_API_URL` — e.g. `http://localhost:5000/api`
- `VITE_ADMIN_WHATSAPP_NUMBER` — the shop's WhatsApp number in international format **without** `+`
  or spaces (e.g. `94771234567`)

Start the dev server:

```bash
npm run dev
```

Visit `http://localhost:5173`.

Build for production:

```bash
npm run build
```

## 3. Admin Access

After seeding, log in at `/admin/login` with the `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`
you set in `server/.env`. From the dashboard you can manage products, categories, offers,
PS5 gaming bookings, and contact messages.

**Important:** Change the seed admin password (or create a new admin and remove the seeded one)
before going live.

## 4. WhatsApp Ordering

Every product card, product details page, gaming booking confirmation, and offer card has a
button that opens WhatsApp with a pre-filled message to the number set in
`VITE_ADMIN_WHATSAPP_NUMBER`. There is intentionally **no cart, checkout, or payment flow** —
all ordering happens through WhatsApp conversations with the shop.

## 5. Deployment Notes

- **Backend:** Deploy to any Node host (Render, Railway, Fly.io, a VPS, etc.). Set the same
  environment variables from `server/.env.example` in your host's dashboard. Never commit `.env`.
- **Frontend:** Deploy the `client` folder to Vercel, Netlify, or similar. Set `VITE_API_URL` to
  your deployed backend's URL and `VITE_ADMIN_WHATSAPP_NUMBER` in the host's environment settings.
- **CORS:** Make sure `CLIENT_URL` in the backend `.env` matches your deployed frontend domain.
- **MongoDB Atlas:** Whitelist your backend host's IP (or `0.0.0.0/0` for simplicity, with care).
- **Cloudinary:** Used for all admin-uploaded product/offer images — no local file storage needed.

## 6. Replacing Placeholder Content

This build ships with placeholder images (`placehold.co`) and sample seed data so it runs
out of the box. Replace them by:
- Uploading real product/offer images through the Admin Dashboard (they go to Cloudinary).
- Editing/adding products, categories, and offers from the Admin Dashboard.
- Updating shop phone number, address, and social links in `src/pages/Contact.jsx` and
  `src/components/Footer.jsx`.
