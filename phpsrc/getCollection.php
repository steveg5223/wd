<?php 
// Initialize the session
session_start();

require 'connection.php';

// $sqlquery = "SELECT * from watch";
$query = "select watchId,  circa, make, model, description,
(SELECT date_last_worn last FROM `observation` o where w.watchId = o.watchId order by last desc limit 1) last_worn
from watch w 
order by make, model";
$result = $mysqli->query($query);

/* fetch associative array */
$watch_list = array();
while ($row = $result->fetch_assoc()) {
    array_push($watch_list, $row);
}
/* free result set */
mysqli_free_result($result);
$output = new stdClass();
$output->watchList = $watch_list;
$output->isLoggedIn = (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true) ?
    true : false;
echo json_encode($output);
/* close connection */
mysqli_close($mysqli);