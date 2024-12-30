<?php
// Enable CORS for all origins (allow cross-origin requests)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Replace with your CareerOneStop API token and user ID
$apiToken = "6r3wltWC/4bJqZGy/nZQuxGT4Q09QKYKh7P80VlbIhKZG84gtPhRcbHdmRKbIev76HMc3irkCijfIHIkEAPBfA==";
$userId = "q9kAeKb1Ygivqmp";

// Define the CareerOneStop API endpoint
$url = "https://api.careeronestop.org/v1/skillsmatcher/$userId";

// Set up HTTP request options
$options = [
    "http" => [
        "header" => "Content-Type: application/json\r\n" .
                    "Authorization: Bearer $apiToken\r\n",
        "method" => "GET",
    ],
];

// Create a stream context
$context = stream_context_create($options);

// Fetch the API response
$response = @file_get_contents($url, false, $context);

if ($response === FALSE) {
    // Capture error details for debugging
    $error = error_get_last();
    http_response_code(500);
    echo json_encode([
        "error" => "Failed to fetch skills from CareerOneStop API",
        "details" => $error['message'] ?? 'Unknown error',
    ]);
    exit;
}

// Decode the JSON response
$data = json_decode($response, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(500);
    echo json_encode([
        "error" => "Invalid JSON response from CareerOneStop API",
        "details" => json_last_error_msg(),
    ]);
    exit;
}

// Return the data as JSON
echo json_encode($data);
?>

