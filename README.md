# BrewNest Café — Pre-Order Café Frontend

## Project Title
BrewNest Café — Pre-Order Café Management System

## Brief Description
BrewNest Café is a creative and practical pre-order café management system. The current version contains only the frontend using HTML, CSS and JavaScript. Customers can browse menu items, filter categories, add food and drinks to an order cart, select pickup details, and submit a pre-order demo form. In the final database-driven version, PHP will connect this frontend with a MySQL database to store customers, menu items, orders, order details, contact messages and admin order-status updates.

## Current Scope
This zip contains frontend only. No backend PHP or MySQL connection is included yet.

## Modules / Features
1. **Home / Landing Page**
   - Animated hero section
   - Café branding
   - Real café images
   - Counter animations

2. **Menu Module**
   - Menu cards with images, prices and preparation time
   - Category filters: coffee, breakfast, meals and dessert
   - Search functionality
   - Favourite button UI

3. **Pre-Order Module**
   - Add-to-order cart
   - Quantity increase/decrease
   - Subtotal, tax estimate and total calculation
   - Customer details form
   - Pickup date and time
   - Pickup type and payment method
   - Special instruction field
   - Hidden `cart_json` field for PHP backend integration

4. **Admin Dashboard Preview**
   - Frontend-only dashboard mock-up
   - Order status preview
   - Sales and order cards
   - Can later be converted into a PHP/MySQL admin panel

5. **Contact Module**
   - Contact form
   - PHP-ready form action placeholder

6. **User Experience Features**
   - Responsive design
   - Dark/light theme toggle
   - Scroll reveal animations
   - Toast notifications
   - Mobile navigation
   - Interactive cart drawer
   - Form validation

## Technologies Used
- HTML5
- CSS3
- JavaScript ES6
- LocalStorage for frontend demo state
- Real image URLs from Unsplash
- Future backend: PHP
- Future database: MySQL

## Suggested MySQL Tables for Later Backend
- `users`
- `menu_items`
- `orders`
- `order_items`
- `payments`
- `contact_messages`
- `admin_users`

## PHP Integration Notes
The forms already contain backend-ready action attributes:

- Pre-order form: `backend/place_order.php`
- Contact form: `backend/contact_message.php`

Important frontend fields for PHP:

- `customer_name`
- `customer_phone`
- `customer_email`
- `pickup_date`
- `pickup_time`
- `pickup_type`
- `payment_method`
- `order_notes`
- `cart_json`
- `estimated_total`

When backend is added, PHP can read these values using `$_POST`, decode `cart_json`, validate the order, and insert records into MySQL.

## Group Members & Roles
Replace the placeholders below with your actual group member names.

1. **Member 1 — Frontend UI/UX Designer**
   - Landing page, layout, visual design and responsiveness

2. **Member 2 — JavaScript Developer**
   - Menu filtering, cart logic, form validation and localStorage demo

3. **Member 3 — Backend Developer**
   - PHP form handling, MySQL connection and order insertion

4. **Member 4 — Database / Documentation Lead**
   - Database schema, project proposal, testing and presentation

## How to Run
1. Extract the zip file.
2. Open `index.html` directly in a browser.
3. For best testing, run it using a local server such as VS Code Live Server.
4. Add PHP backend later in a `backend` folder.

## Folder Structure
```text
brewnest-cafe-frontend/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── app.js
    └── img/
        └── brewnest-logo.svg
```
