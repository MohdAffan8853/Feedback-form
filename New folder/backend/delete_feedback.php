<?php
include 'db.php';
$data = json_decode(file_get_contents("php://input"), true);
$id = intval($data['id']);

$sql = "DELETE FROM feedback WHERE id = $id";
if ($conn->query($sql) === TRUE) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["success" => false]);
}
?>
