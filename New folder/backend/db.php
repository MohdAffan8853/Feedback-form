<?php
$conn = new mysqli("localhost", "root", "", "feedback_portal");
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>
