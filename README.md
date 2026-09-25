# TechKart

An e-commerce storefront for consumer electronics: headphones, earbuds, speakers and smartwatches.

Live: [tech-kart-xi.vercel.app](https://tech-kart-xi.vercel.app)
Admin panel: [TechKart-Admin](https://github.com/yatharthrathii/TechKart-Admin)

<img width="100%" alt="TechKart home page with the hero banner, category strip and product grid" src="https://github.com/user-attachments/assets/a2ade03d-3d5a-4b0e-b1d2-383475d20f73" />

## Why I built it

I wanted a storefront that covers the full path a real shop needs, not a product grid with a cart. Sign up, browse by category, search, read a product page, add to cart, enter an address, pick a payment method, place the order, and then come back later and see its status change as the admin moves it along. The admin side lives in a separate repo so the two apps can be deployed and secured on their own.

## What it does

**Accounts.** Email and password sign up, login, forgot password. The session persists across reloads.

**Catalogue.** Four categories, an all-products page, a search page, and a product page with related items. Product data and images are managed from the admin panel, so the storefront never hardcodes a catalogue.

**Cart and checkout.** Cart with quantities, saved addresses on the profile, and a payment step with UPI, card, net banking and cash on delivery.

**Orders.** Every order is written under the user, and the profile page shows each order with the status the admin has set: pending, shipped or delivered.

## What is not there

- Payment is recorded, not charged. Checkout stores the chosen method with the order and no gateway is called. Stripe is in the dependency list from an earlier attempt and is not wired up.
- No reviews, no wishlist, no stock tracking.

## Stack

React 19, Vite, Redux Toolkit, React Router, Tailwind CSS 4, Framer Motion, Swiper. Firebase Authentication through its REST API and Cloud Firestore for products, categories, addresses and orders. Deployed on Vercel.

## Running it

```bash
npm install
cp .env.example .env    # then fill in your Firebase project values
npm run dev
```

Firestore needs `products`, `categories` and `orders` collections. The easiest way to fill them is to run the admin panel against the same project.

## Screenshots

**Category page**
<img width="100%" alt="Category page listing products in one category" src="https://github.com/user-attachments/assets/1ef00dad-855b-4539-b022-aa74a73b7192" />

**Product page**
<img width="100%" alt="Single product page with images, price, description and related products" src="https://github.com/user-attachments/assets/35609e27-174f-4385-bf0a-4ac819f7bd14" />

**Cart**
<img width="100%" alt="Cart page with line items, quantities and the order total" src="https://github.com/user-attachments/assets/0f780bed-8971-4b9d-bccc-e83d71616100" />

**Search**
<img width="100%" alt="Search results page" src="https://github.com/user-attachments/assets/d39462cf-48c5-49b2-a629-400d698bc44b" />

**Profile and orders**
<img width="100%" alt="Profile page with saved details and past orders" src="https://github.com/user-attachments/assets/a23f0787-1cab-470e-bd22-eb0bd01a52ad" />

**Login**
<img width="100%" alt="Login page" src="https://github.com/user-attachments/assets/8169374e-8855-4d9a-8f8c-6706da3c3ee5" />


---

### Made by Yatharth Rathi



