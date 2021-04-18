<?php 
// Initialize the session
session_start();
header('Content-Type: application/json');
$output = new stdClass();
$output->isLoggedIn = (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true) ? true : false;

require 'connection.php';

if ($mysqli->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$watchid = $_GET['watchId'];
// get watch details
$sql = "SELECT * from watch where watchId = ?";
$stmt = $mysqli->prepare($sql);
$stmt->bind_param("s", $watchid);
$stmt->execute();

$stmt->bind_result($watchId, $make, $model, $descr, $active, $circa);
$stmt->fetch();
$output->watchId = $watchId;
$output->make = $make;
$output->model = $model;
$output->descr = $descr;
$output->active = $active;
$output->circa = $circa;
$stmt->close();

// get observations
$sql = "select DATE_FORMAT(date, '%m/%d/%Y') as date, drift, adjusted_drift
from observation o where watchID = ? order by o.date";
$stmt = $mysqli->prepare($sql);
$stmt->bind_param("s", $watchid);
$stmt->execute();
$stmt->bind_result($date, $drift, $adjusted_drift);
$output->observations = array();
while ($stmt->fetch()) {
    $entry = new stdClass();
    $entry->date = $date;
    $entry->drift = $drift;
    $entry->adjusted_drift = $adjusted_drift;
    array_push($output->observations, $entry);
}

// get photos
$dir = "../img/wd/{$watchid}/";
$output->photos = array();
// Open a known directory, and proceed to read its contents
if (is_dir($dir)) {
    if ($dh = opendir($dir)) {
        while (($file = readdir($dh)) !== false) {
            if ($file == "." || $file == ".." || strpos ($file, ".thumb") != false) continue;  // don't use dot and dot dot
            $output->photos[] = "/wd/{$watchid}/" . $file;
        }
        closedir($dh);
    }
}
sort($output->photos);

echo json_encode($output);
$mysqli->close();