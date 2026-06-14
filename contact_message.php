<?php
// backend/contact_message.php
require_once 'db.php';

// Handle JSON input as well as standard POST
if (isset($_SERVER['CONTENT_TYPE']) && (strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== false)) {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    if (is_array($data)) {
        $_POST = array_merge($_POST, $data);
    }
}

$contact_name = trim($_POST['contact_name'] ?? '');
$contact_email = trim($_POST['contact_email'] ?? '');
$contact_message = trim($_POST['contact_message'] ?? '');

if (empty($contact_name) || empty($contact_email) || empty($contact_message)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Please fill all required fields.'
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO contact_messages (contact_name, contact_email, contact_message) VALUES (?, ?, ?)");
    $stmt->execute([$contact_name, $contact_email, $contact_message]);

    echo json_encode([
        'success' => true,
        'message' => 'Your message has been sent successfully!'
    ]);
} catch (\Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to save message: ' . $e->getMessage()
    ]);
}
