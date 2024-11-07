
text/x-generic updateDateWorn.php ( PHP script, ASCII text )
<?php 
// Initialize the session
session_start();
if ( ! $_SESSION["loggedin"] ) {
  header('HTTP/1.1 401 Unauthorized');
}
else {
  require 'connection.php';

  if ($mysqli->connect_error) {
      die("Connection failed: " . $mysqli->connect_error);
  }
    $post_data = json_decode(file_get_contents('php://input'), true);
    $date = isset($post_data['date']) ? $post_data['date'] : date("Y-m-d H:i:s");
    $drift = isset($post_data['drift']) ? $post_data['drift'] : null;
    $adjusted_drift = isset($post_data['adjusted_drift']) ? $post_data['adjusted_drift'] : null;
    $watchID = isset($post_data['watchId']) ? $post_data['watchId'] : null;
    $date_last_worn = isset($post_data['date_last_worn']) ? $post_data['date_last_worn'] : date("Y-m-d H:i:s");

    $sql = 
    "INSERT INTO observation(watchID, date, date_last_worn) 
    VALUES ((SELECT watchId from watch where watchId = ?), NOW(),  NOW())";
    $stmt = $mysqli->prepare($sql);
    
    $stmt->bind_param("s", $watchID);
    $stmt->execute();
  
    if ($stmt->error == '') {
      $response = (object)[];
      $response->message = 'New record created successfully';
      header('Content-Type: application/json');
      echo json_encode($response);
    } else {
      echo "Error: " . $sql . "<br>" . $mysqli->error;
    }
    
    $mysqli->close();
}