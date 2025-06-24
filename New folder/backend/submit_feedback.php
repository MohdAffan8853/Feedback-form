<?php
include 'db.php';
$data = json_decode(file_get_contents("php://input"), true);

$name = $conn->real_escape_string($data['name']);
$email = $conn->real_escape_string($data['email']);
$course = $conn->real_escape_string($data['course']);
$feedback = $conn->real_escape_string($data['feedback']);

$sql = "INSERT INTO feedback (name, email, course, feedback) VALUES ('$name', '$email', '$course', '$feedback')";
if ($conn->query($sql) === TRUE) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["success" => false]);
}
?>
