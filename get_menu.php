<?php
// backend/get_menu.php
require_once 'db.php';

try {
    $stmt = $pdo->query("SELECT item_code AS id, item_name AS name, category, price, prep_time AS time, calories, tag, image_url AS image, description FROM menu_items WHERE is_available = 1");
    $menu = $stmt->fetchAll();
    
    // Convert price to float
    foreach ($menu as &$item) {
        $item['price'] = (float)$item['price'];
    }
    unset($item); // break reference
    
    echo json_encode([
        'success' => true,
        'menu' => $menu
    ]);
} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to fetch menu: ' . $e->getMessage()
    ]);
}
