<?php
// backend/get_orders.php
require_once 'db.php';

try {
    // 1. Fetch recent orders
    $orders_query = "
        SELECT o.order_id, o.pickup_date, o.pickup_time, o.pickup_type, o.payment_method, o.order_notes, o.estimated_total, o.order_status, o.created_at,
               c.customer_name, c.customer_phone, c.customer_email
        FROM orders o
        JOIN customers c ON o.customer_id = c.customer_id
        ORDER BY o.created_at DESC
        LIMIT 50
    ";
    $orders_stmt = $pdo->query($orders_query);
    $orders = $orders_stmt->fetchAll();

    // Fetch items for each order
    foreach ($orders as &$order) {
        $items_stmt = $pdo->prepare("SELECT item_name, item_price, quantity FROM order_items WHERE order_id = ?");
        $items_stmt->execute([$order['order_id']]);
        $order['items'] = $items_stmt->fetchAll();
    }
    unset($order); // break reference

    // 2. Fetch stats
    // Today's total orders
    $today_stmt = $pdo->query("SELECT COUNT(*) FROM orders WHERE DATE(created_at) = CURDATE()");
    $today_count = $today_stmt->fetchColumn();

    // Pending orders count
    $pending_stmt = $pdo->query("SELECT COUNT(*) FROM orders WHERE order_status = 'Pending'");
    $pending_count = $pending_stmt->fetchColumn();

    // Total Revenue
    $revenue_stmt = $pdo->query("SELECT SUM(estimated_total) FROM orders");
    $total_revenue = floatval($revenue_stmt->fetchColumn());

    echo json_encode([
        'success' => true,
        'orders' => $orders,
        'stats' => [
            'today_count' => intval($today_count),
            'pending_count' => intval($pending_count),
            'total_revenue' => $total_revenue
        ]
    ]);
} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to fetch dashboard data: ' . $e->getMessage()
    ]);
}
