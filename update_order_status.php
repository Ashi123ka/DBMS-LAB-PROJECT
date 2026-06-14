<?php
// backend/update_order_status.php
require_once 'db.php';

// Handle JSON input as well as standard POST
if (isset($_SERVER['CONTENT_TYPE']) && (strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== false)) {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    if (is_array($data)) {
        $_POST = array_merge($_POST, $data);
    }
}

$order_id = intval($_POST['order_id'] ?? 0);
$status = trim($_POST['status'] ?? '');

$allowed_statuses = ['Pending', 'Preparing', 'Ready', 'Completed'];

if ($order_id <= 0 || !in_array($status, $allowed_statuses)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid order ID or status value.'
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE orders SET order_status = ? WHERE order_id = ?");
    $stmt->execute([$status, $order_id]);

    // Check if order exists
    $check_stmt = $pdo->prepare("SELECT COUNT(*) FROM orders WHERE order_id = ?");
    $check_stmt->execute([$order_id]);
    if ($check_stmt->fetchColumn() == 0) {
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'message' => 'Order not found.'
        ]);
        exit;
    }

    echo json_encode([
        'success' => true,
        'message' => 'Order status updated to ' . $status
    ]);
} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to update status: ' . $e->getMessage()
    ]);
}
