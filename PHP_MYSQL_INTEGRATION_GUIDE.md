# PHP + MySQL Integration Guide for Later Development

This project currently contains only the frontend. Use this guide when adding backend connectivity.

## Recommended Backend Folder
Create this folder later:

```text
backend/
├── db.php
├── place_order.php
├── contact_message.php
├── get_menu.php
└── admin/
    └── update_order_status.php
```

## Suggested Database Schema

```sql
CREATE DATABASE brewnest_cafe;
USE brewnest_cafe;

CREATE TABLE customers (
  customer_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(120) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_email VARCHAR(120) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE menu_items (
  item_id INT AUTO_INCREMENT PRIMARY KEY,
  item_name VARCHAR(120) NOT NULL,
  category VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  prep_time VARCHAR(30),
  description TEXT,
  image_url TEXT,
  is_available TINYINT(1) DEFAULT 1
);

CREATE TABLE orders (
  order_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  pickup_date DATE NOT NULL,
  pickup_time TIME NOT NULL,
  pickup_type VARCHAR(60) NOT NULL,
  payment_method VARCHAR(60) NOT NULL,
  order_notes TEXT,
  estimated_total DECIMAL(10,2) NOT NULL,
  order_status VARCHAR(30) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE order_items (
  order_item_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  item_name VARCHAR(120) NOT NULL,
  item_price DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

CREATE TABLE contact_messages (
  message_id INT AUTO_INCREMENT PRIMARY KEY,
  contact_name VARCHAR(120) NOT NULL,
  contact_email VARCHAR(120) NOT NULL,
  contact_message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Frontend Fields Already Prepared
The pre-order form sends these fields:

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

## Important Backend Logic
When writing `place_order.php` later:

1. Validate customer fields.
2. Decode `cart_json` using `json_decode($_POST['cart_json'], true)`.
3. Insert customer record.
4. Insert order record.
5. Insert each cart item into `order_items`.
6. Redirect to a success page or return JSON response.

## Security Notes for Later
- Use prepared statements with PDO or MySQLi.
- Never directly insert raw `$_POST` values into SQL queries.
- Validate phone, email, date, time and cart item quantities on the server.
- Escape output when displaying database values in admin panels.
