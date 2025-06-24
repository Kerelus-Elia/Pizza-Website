# 🍕 Pizza K - Full Stack Pizza Ordering Website

**Pizza K** is a full-stack pizza restaurant website that allows users to view a menu, register, log in, browse pizzas, add them to a cart, and place an order.  
This project was built to simulate a real-world pizza store experience with session-based authentication, animated UI, and local JSON-based order saving.

---

## 🌐 Live Preview

> https://pizza-website-production.up.railway.app/

---

## 🖼️ Screenshots

![Uploading image.png…]()


## 📌 Features

- Responsive landing page with background image and smooth animations
- Session-based login and signup system
- Dynamic navbar that reflects user session state
- Full menu page with add-to-cart and order confirmation
- Live cart view and quantity management
- Orders saved persistently in `orders.json`
- Frontend animations powered by [AOS.js](https://michalsnik.github.io/aos/)
- Clear UI/UX using pure HTML/CSS + Vanilla JS

---

## 🛠️ Technologies Used

| Layer       | Tools / Tech Used                                       |
|-------------|----------------------------------------------------------|
| **Frontend**| HTML5, CSS3, JavaScript, AOS.js                          |
| **Backend** | Node.js, Express.js, Express-Session                     |
| **Storage** | Local JSON files (`orders.json`, `Customers.json`)       |
| **Session** | `express-session` for authentication                    |
| **Middleware** | Custom session check and JSON handling              |

---

## 🗂️ Project Structure

```bash
Pizza-K/
├── public/
│   ├── img/                        # All images used (menu items, logo...)
│   ├── login.html                  # Login page
│   ├── signup.html                 # Signup page
│   ├── index.html                  # Homepage
│   ├── order.html                  # Order menu page
│
├── src/
│   ├── routes/
│   │   ├── authrouter.ts          # Login, signup, logout handling
│   │   ├── orderrouter.ts         # Order placing and cart API
│   │
│   ├── app.ts                     # Express app config & middleware
│
├── orders.json                    # Stores all orders with user & time
├── Customers.json                 # Stores registered users
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Project dependencies
```
```
🔐 Authentication Flow

Users can register via /signup.html

After registration, they're stored in users.json

Once logged in, session is set via express-session

Orders cannot be placed without logging in
```
```
🛒 Cart System Logic

Cart managed fully on client side (JavaScript)

Items can be added with "Add to Cart" button

Cart stored in-memory on frontend

When clicking Confirm Order, the cart is sent via POST to /api/cart

Server saves it in orders.json along with logged-in user info
```
