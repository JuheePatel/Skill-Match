<?php
// Set CORS headers for both OPTIONS and POST requests
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow any origin (for development)
header('Access-Control-Allow-Methods: GET, POST, OPTIONS'); // Allow GET, POST, and OPTIONS
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow Content-Type and Authorization headers

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Respond with status 200 for preflight request
    http_response_code(200);
    exit;
}

// Read the raw POST data
$data = json_decode(file_get_contents('php://input'), true);

// Log the raw data for debugging purposes
error_log("Raw POST data: " . file_get_contents('php://input'));

// Validate input data
if (!$data || !isset($data['SKAValueList']) || !is_array($data['SKAValueList'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input, missing or invalid "SKAValueList".']);
    exit;
}

// CareerOneStop API credentials
$apiKey = '6r3wltWC/4bJqZGy/nZQuxGT4Q09QKYKh7P80VlbIhKZG84gtPhRcbHdmRKbIev76HMc3irkCijfIHIkEAPBfA=='; // Replace with your actual API key
$userId = 'q9kAeKb1Ygivqmp'; // Replace with your actual user ID
$url = "https://api.careeronestop.org/v1/skillsmatcher/$userId";

// Prepare the API request data
$requestData = json_encode(['SKAValueList' => $data['SKAValueList']]);

// Log the request payload
error_log("API request payload: " . $requestData);

// Initialize cURL session
$ch = curl_init($url);

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  // Return the response as a string
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Authorization: Bearer $apiKey"
]);
curl_setopt($ch, CURLOPT_POST, true);  // Use POST method
curl_setopt($ch, CURLOPT_POSTFIELDS, $requestData);  // Set the POST body content
curl_setopt($ch, CURLOPT_TIMEOUT, 30);  // Set a timeout for the request

// Execute the cURL request
$response = curl_exec($ch);

// Check for cURL errors
if ($response === false) {
    // Log the cURL error
    error_log("cURL Error: " . curl_error($ch));
    http_response_code(500);
    echo json_encode(['error' => 'Failed to communicate with CareerOneStop API.']);
    curl_close($ch);
    exit;
}

// Get HTTP response code
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Log the API response
error_log("API response code: $httpCode");
error_log("API response: $response");

if ($httpCode != 200) {
    // Log the HTTP error
    error_log("HTTP Error: $httpCode - $response");
    http_response_code($httpCode);
    echo json_encode(['error' => 'Failed to communicate with CareerOneStop API.', 'details' => $response]);
    curl_close($ch);
    exit;
}

// Close the cURL session
curl_close($ch);

// Output the result from the API
echo $response;
?>
