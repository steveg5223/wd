<?php 
    $diff  =  $_GET['diff'];
    $sched =  $_GET['sched'];
    $start =  $_GET['start'];
    $log_msg = sprintf("%s, %s, %s\n", $start, $sched, $diff);
    $now   = date('Y-m-d');
    $filename = "../log/" . $now . '.csv';

    error_log($log_msg, 3, $filename);
    $response = new stdClass();
    $response->msg = $log_msg;
    header('Content-type: application/json');
    echo json_encode($response);
    