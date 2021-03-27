<?php 
// Initialize the session
session_start();
if (! $_SESSION["loggedin"] ) {
  die("User authentication error");
}
require 'connection.php';

if ($mysqli->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
  
  $date = isset($_POST['date']) ? $_POST['date'] : date("Y-m-d H:i:s");
  $drift = isset($_POST['drift']) ? $_POST['drift'] : null;
  $adjusted_drift = isset($_POST['adjusted_drift']) ? $_POST['adjusted_drift'] : null;
  $watchID = isset($_POST['watchID']) ? $_POST['watchID'] : null;
  $date_last_worn = isset($_POST['date_last_worn']) ? $_POST['date_last_worn'] : date("Y-m-d H:i:s");
  
  $sql = 
  "insert into observation (date, drift, adjusted_drift, watchID, date_last_worn) 
  values (?, ?, ?, (select watchID from watch where watchId = ?), ?)";
  $stmt = $mysqli->prepare(sql);
  $stmt->bind_param("sssss", $date, $drift, $adjusted_drift, $watchID, $date_last_worn);

  if ($mysqli->query($sql) === TRUE) {
    echo "New record created successfully";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
  
  $mysqli->close();