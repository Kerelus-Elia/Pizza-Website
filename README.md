# 🍕 Pizza K
A dynamic and interactive pizza restaurant website built using TypeScript, Node.js, and Express, allowing users to sign up, log in, order pizza, and reserve tables online with data persistence using local JSON files.

## 🌐 Live Demo
👉 https://pizza-website-production.up.railway.app/

## 🖼️ Screenshots

![image](https://github.com/user-attachments/assets/e71e0014-61b6-4f0f-aeb9-ae28349dce0d)


## 📌 Overview
Pizza K is a modern pizza restaurant website with user authentication, interactive menus, and real-time table reservation functionality. The project simulates a restaurant ordering system with static front-end pages and a back-end logic built using Express and file-based storage.

```
✨ Key Features

🔐 User Authentication (Signup & Login)

🧾 Pizza Ordering System with dynamic form handling

📅 Table Reservation feature with date & time input

📂 Data persistence using .json files (for orders, reservations, and customers)

🌐 Clean HTML/CSS Frontend hosted via Railway

🧠 Modular codebase with middleware, routing, and models
```

```
## 📁 Project Structure

PIZZA-K-MAIN/
├── dist/                    # Compiled JavaScript files (from TypeScript)
├── node_modules/            # Project dependencies
├── public/                  # Static frontend assets
│   ├── img/                 # Images used in the website
│   ├── login.html           # Login page
│   ├── main.html            # Homepage
│   ├── order.html           # Pizza ordering page
│   ├── reservation.html     # Table reservation page
│   └── signup.html          # Signup page
├── src/                     # TypeScript source code
│   ├── middleware/          # Custom middleware
│   │   ├── validator.ts     # Input validation logic
│   │   └── writejsonfile.ts # Utility to write to JSON files
│   ├── modules/             # Data models
│   │   ├── customer.ts      # Customer model
│   │   └── Table.ts         # Table reservation model
│   ├── routes/              # Express routes
│   │   ├── loginRoute.ts
│   │   ├── mainRoute.ts
│   │   ├── orderRoute.ts
│   │   ├── reserveRoute.ts
│   │   └── signupRoute.ts
│   └── server.ts            # Main server entry point
├── customers.json           # Stores registered users
├── order.json               # Stores placed orders
└── reservations.json        # Stores table reservations
```

## ⚙️ Technologies Used
| Layer       | Tools / Tech Used                                       |
|-------------|----------------------------------------------------------|
| **Frontend**| HTML5, CSS3, JavaScript, AOS.js                          |
| **Backend** | Node.js, Express.js, Express-Session                     |
| **Storage** | Local JSON files (`orders.json`, `Customers.json `, `reservations.json`)       |
| **Session** | `express-session` for authentication                    |
| **Middleware** | Custom session check and JSON handling              |


## 🧠 Code Highlights
All route files in src/routes/ map to specific endpoints and handle form submissions.

Validation logic (like checking for existing users or duplicate reservations) is inside validator.ts.

File-writing utility (writejsonfile.ts) ensures JSON storage is updated reliably.

Models like customer.ts and Table.ts define the structure of data stored in the system


## 📬 API Routes (Examples)
| Method   | Route	Description          |
|----------|-----------------------------|
| **POST** | /signup	Register new user  |
| **POST** | /login	Authenticate user    |
| **POST** | /order	Submit pizza order   |
| **POST** | /reserve	Submit reservation |


## 📄 Pages Description
|    Page    |          	           Description                                     |
|------------|-----------------------------------------                              |
| **main.html** |	The homepage showing welcome message and navigation to other pages |
| **login.html** |	      Form for registered users to log in                        |
| **signup.html** |      	Form for new users to sign up (saved in customers.json)    |
| **order.html** |	      Submit pizza orders (saved in order.json)                  |
| **reservation.html** |  Submit table reservations (saved in reservations.json)     |


