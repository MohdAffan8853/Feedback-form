<?php
include 'db.php';

$result = $conn->query("SELECT * FROM feedback ORDER BY created_at DESC");
$rows = [];

while ($row = $result->fetch_assoc()) {
  $rows[] = $row;
}
echo json_encode($rows);
?>
