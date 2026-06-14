<?php
// backend/place_order.php
require_once 'db.php';

// Handle JSON input as well as standard POST
if (isset($_SERVER['CONTENT_TYPE']) && (strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== false)) {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    if (is_array($data)) {
        $_POST = array_merge($_POST, $data);
    }
}

// Retrieve and validate fields
$customer_name   = trim($_POST['customer_name'] ?? '');
$customer_phone  = trim($_POST['customer_phone'] ?? '');
$customer_email  = trim($_POST['customer_email'] ?? '');
$pickup_date     = trim($_POST['pickup_date'] ?? '');
$pickup_time     = trim($_POST['pickup_time'] ?? '');
$pickup_type     = trim($_POST['pickup_type'] ?? '');
$payment_method  = trim($_POST['payment_method'] ?? '');
$order_notes     = trim($_POST['order_notes'] ?? '');
$cart_json       = $_POST['cart_json'] ?? '';
$estimated_total = floatval($_POST['estimated_total'] ?? 0);

if (empty($customer_name) || empty($customer_phone) || empty($customer_email) || empty($pickup_date) || empty($pickup_time) || empty($pickup_type) || empty($payment_method) || empty($cart_json)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Please fill all required fields.'
    ]);
    exit;
}

try {
    $pdo->beginTransaction();

    // 1. Check if customer already exists by phone or email
    $customer_stmt = $pdo->prepare("SELECT customer_id FROM customers WHERE customer_email = ? OR customer_phone = ? LIMIT 1");
    $customer_stmt->execute([$customer_email, $customer_phone]);
    $customer = $customer_stmt->fetch();

    if ($customer) {
        $customer_id = $customer['customer_id'];
    } else {
        // Create new customer
        $insert_customer_stmt = $pdo->prepare("INSERT INTO customers (customer_name, customer_phone, customer_email) VALUES (?, ?, ?)");
        $insert_customer_stmt->execute([$customer_name, $customer_phone, $customer_email]);
        $customer_id = $pdo->lastInsertId();
    }

    // 2. Create Order
    $order_stmt = $pdo->prepare("INSERT INTO orders (customer_id, pickup_date, pickup_time, pickup_type, payment_method, order_notes, estimated_total) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $order_stmt->execute([$customer_id, $pickup_date, $pickup_time, $pickup_type, $payment_method, $order_notes, $estimated_total]);
    $order_id = $pdo->lastInsertId();

    // 3. Create Order Items
    $cart_items = json_decode($cart_json, true);
    if (!is_array($cart_items) || empty($cart_items)) {
        throw new \Exception("Cart is empty or invalid format.");
    }

    $item_stmt = $pdo->prepare("INSERT INTO order_items (order_id, item_code, item_name, item_price, quantity) VALUES (?, ?, ?, ?, ?)");
    foreach ($cart_items as $item) {
        $stmt_item_code = $item['id'] ?? '';
        $stmt_item_name = $item['name'] ?? 'Unknown Item';
        $stmt_item_price = floatval($item['price'] ?? 0);
        $stmt_qty = intval($item['qty'] ?? 1);

        $item_stmt->execute([$order_id, $stmt_item_code, $stmt_item_name, $stmt_item_price, $stmt_qty]);
    }

    $pdo->commit();

    echo json_encode([
        'success' => true,
        'message' => 'Pre-order placed successfully!',
        'order_id' => $order_id
    ]);

} catch (\Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Order processing failed: ' . $e->getMessage()
    ]);
}
