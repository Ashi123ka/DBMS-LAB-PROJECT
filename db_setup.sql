-- Create database
CREATE DATABASE IF NOT EXISTS `database`;
USE `database`;

-- 1. Customers Table
CREATE TABLE IF NOT EXISTS customers (
  customer_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(120) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_email VARCHAR(120) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
  item_id INT AUTO_INCREMENT PRIMARY KEY,
  item_code VARCHAR(50) NOT NULL UNIQUE,
  item_name VARCHAR(120) NOT NULL,
  category VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  prep_time VARCHAR(30) DEFAULT '10 min',
  calories VARCHAR(30) DEFAULT '',
  tag VARCHAR(50) DEFAULT '',
  description TEXT,
  image_url TEXT,
  is_available TINYINT(1) DEFAULT 1
);

-- 3. Orders Table
CREATE TABLE IF NOT EXISTS orders (
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
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);

-- 4. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  order_item_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  item_code VARCHAR(50) NOT NULL,
  item_name VARCHAR(120) NOT NULL,
  item_price DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
);

-- 5. Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  message_id INT AUTO_INCREMENT PRIMARY KEY,
  contact_name VARCHAR(120) NOT NULL,
  contact_email VARCHAR(120) NOT NULL,
  contact_message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Menu Items
INSERT INTO menu_items (item_code, item_name, category, price, prep_time, calories, tag, description, image_url, is_available)
VALUES
('latte-classic', 'Classic Café Latte', 'coffee', 520.00, '8 min', '160 kcal', 'Best Seller', 'Smooth espresso with steamed milk and a soft foam finish.', 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=900&q=85', 1),

('iced-mocha', 'Iced Mocha Cloud', 'coffee', 620.00, '7 min', '210 kcal', 'Cold Brew', 'Chocolate espresso over ice with cold milk and cream.', 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85', 1),

('cappuccino', 'Velvet Cappuccino', 'coffee', 560.00, '8 min', '130 kcal', 'Hot', 'Bold espresso, velvety milk foam and balanced roasted notes.', 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=85', 1),

('espresso-shot', 'Double Espresso', 'coffee', 410.00, '5 min', '10 kcal', 'Strong', 'Two intense espresso shots for a quick caffeine boost.', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=85', 1),

('croissant', 'Butter Croissant', 'breakfast', 390.00, '6 min', '270 kcal', 'Fresh Baked', 'Flaky golden croissant baked with rich butter layers.', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85', 1),

('avocado-toast', 'Avocado Toast', 'breakfast', 780.00, '11 min', '340 kcal', 'Healthy', 'Sourdough toast topped with avocado, herbs and chili flakes.', 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=85', 1),

('pancake-stack', 'Honey Pancake Stack', 'breakfast', 690.00, '13 min', '430 kcal', 'Sweet Morning', 'Soft pancakes with honey drizzle, butter and fresh fruit.', 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=85', 1),

('club-sandwich', 'Grilled Club Sandwich', 'meals', 890.00, '14 min', '520 kcal', 'Lunch', 'Layered sandwich with grilled chicken, egg, lettuce and sauce.', 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=85', 1),

('chicken-bowl', 'Smoky Chicken Rice Bowl', 'meals', 1040.00, '16 min', '610 kcal', 'Filling', 'Rice bowl with grilled chicken, vegetables and signature sauce.', 'https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=900&q=85', 1),

('pasta-alfredo', 'Creamy Alfredo Pasta', 'meals', 1150.00, '18 min', '650 kcal', 'Chef Pick', 'Creamy pasta with mushrooms, parmesan and grilled chicken.', 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=85', 1),

('brownie', 'Chocolate Fudge Brownie', 'dessert', 450.00, '5 min', '310 kcal', 'Chocolate', 'Dense chocolate brownie with soft fudge center.', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85', 1),

('cheesecake', 'Berry Cheesecake Slice', 'dessert', 680.00, '5 min', '370 kcal', 'Chilled', 'Creamy cheesecake topped with berry compote and biscuit base.', 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=85', 1)
ON DUPLICATE KEY UPDATE
  item_name=VALUES(item_name),
  category=VALUES(category),
  price=VALUES(price),
  prep_time=VALUES(prep_time),
  calories=VALUES(calories),
  tag=VALUES(tag),
  description=VALUES(description),
  image_url=VALUES(image_url),
  is_available=VALUES(is_available);
