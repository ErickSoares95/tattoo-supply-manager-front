# 🎨 Tattoo Supply Manager — Frontend

React + TypeScript client for the [tattoo-supply-manager](https://github.com/ErickSoares95/tattoo-supply-manager) backend — a Spring Boot API built as a modular monolith with JWT auth, RBAC, and ownership-based authorization.

## MVP Scope

- Login / registration (public registration always creates a `CLIENT`).
- Product catalog.
- Place an order (client-side cart, submitted as a single request).
- "My orders" — the backend filters by owner: `CLIENT` sees only their own, `ADMIN` sees all.
- Order detail.

Admin screens (product/user management, notification reprocessing) are intentionally out of scope for this MVP.

## Tech Stack

- React 19 + TypeScript
- Vite
- React Router
- Axios (with a request interceptor for the JWT and a response interceptor for 401 handling)
- Tailwind CSS

## Running locally

Requires the backend running (see the [backend README](https://github.com/ErickSoares95/tattoo-supply-manager) for `docker compose` instructions).

```bash
npm install
cp .env.example .env   # adjust VITE_API_BASE_URL if the backend isn't on localhost:8080
npm run dev
```

## Project structure

```
src/
  api/        # axios client + one file per backend resource (auth, products, orders)
  auth/       # AuthContext (token/user state) + RequireAuth route guard
  types/      # TypeScript interfaces mirroring the backend DTOs
  pages/      # one component per route
  components/ # shared UI pieces (Navbar, ProductCard)
```

## Notes

- The JWT is stored in `localStorage` — the simplest approach for this MVP. A production system would likely use an httpOnly cookie to reduce XSS exposure; noted here as a known trade-off, not an oversight.
- Order items only carry `productId` (not the product name) because that's exactly what the backend's `OrderItemResponse` returns today.
