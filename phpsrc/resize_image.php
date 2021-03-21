<?php
$output_width = 80;
$output_height = 80;

if (isset($_GET['height']))
{
    $output_height = $_GET['height'];
}
if (isset($_GET['width']))
{
    $output_width = $_GET['width'];
}

$path = ((isset($_REQUEST['path'])) ? $_REQUEST['path'] : "");
$thumbPath = $path . '.thumb';
$thumbAtime = fileatime($thumbPath);
$imageAtime = fileatime($path);
if ($imageAtime)
{
    $size_arr = getimagesize($path);

    // error_log('Path: ' . $path , 0);
    // error_log('fileatime: ' . $imageAtime, 0);
    // error_log('thumbAtime: ' . $thumbAtime, 0);
    if (!$thumbAtime || $imageAtime > $thumbAtime)
    {
        if ($size_arr[2] == IMAGETYPE_GIF) $image = imagecreatefromgif($path);
        else if ($size_arr[2] == IMAGETYPE_JPEG) $image = imagecreatefromjpeg($path);
        else if ($size_arr[2] == IMAGETYPE_PNG) $image = imagecreatefrompng($path);
        else die_default_image();

        resize_image($thumbPath, $image, $size_arr, $output_width, $output_height);
    }

    header('Content-Type: image/jpg');
    header('Content-Disposition: inline; filename="' . basename($path) . '"');
    echo file_get_contents($thumbPath);

}
else
{
    die_default_image();
}

function die_default_image()
{
    //43byte 1x1 transparent pixel gif
    header("content-type: image/gif");
    echo base64_decode("R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==");
}

function resize_image($thumbname, $image, $size_arr, $max_width, $max_height) //maintain aspect ratio

{
    $width = $max_width;
    $height = $max_height;
    list($width_orig, $height_orig, $img_type) = $size_arr;
    $ratio_orig = $width_orig / $height_orig;

    if ($width / $height > $ratio_orig)
    {
        $width = floor($height * $ratio_orig);
    }
    else
    {
        $height = floor($width / $ratio_orig);
    }

    // Resample
    $tempimg = imagecreatetruecolor($width, $height);
    imagecopyresampled($tempimg, $image, 0, 0, 0, 0, $width, $height, $width_orig, $height_orig);
    imagejpeg($tempimg, $thumbname, 80);
}

