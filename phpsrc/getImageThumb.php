<?php
$output_width = 250;
$output_height = 250;

if (isset($_GET['height']) && (int)$_GET['height'] > 0)
{
    $output_height = (int)$_GET['height'];
}
if (isset($_GET['width']) && (int)$_GET['width'] > 0)
{
    $output_width = (int)$_GET['width'];
}

$path = ((isset($_REQUEST['path'])) ? $_REQUEST['path'] : "");
$thumbPath = $path . '.thumb';
$thumbAtime = is_file($thumbPath) ? fileatime($thumbPath) : false;
$imageAtime = is_file($path) ? fileatime($path) : false;
if ($imageAtime) {
    $size_arr = getimagesize($path);
    if (!$size_arr) die_default_image();

    if (!$thumbAtime || $imageAtime > $thumbAtime)
    {
        if ($size_arr[2] == IMAGETYPE_GIF) {
            $image = imagecreatefromgif($path);
        }
        else if ($size_arr[2] == IMAGETYPE_JPEG) {
            $image = imagecreatefromjpeg($path);
        }
        else if ($size_arr[2] == IMAGETYPE_PNG) {
            $image = imagecreatefrompng($path);
        }
        else die_default_image();

        resize_image($thumbPath, $image, $size_arr, $output_width, $output_height);
    }

    if ($size_arr[2] == IMAGETYPE_GIF) {$contentType = 'image/gif';}
    else if ($size_arr[2] == IMAGETYPE_JPEG) {$contentType = 'image/jpg';}
    else {$contentType = 'image/png';}

    header('Pragma: public');
    header('Cache-Control: max-age=3600');
    header('Expires: '. gmdate('D, d M Y H:i:s \G\M\T', time() + 3600));
    header('Content-Type: ' . $contentType);
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
    exit;
}

function resize_image($thumbname, $image, $size_arr, $max_width, $max_height) //maintain aspect ratio

{
    $width = $max_width;
    $height = $max_height;
    list($width_orig, $height_orig, $img_type) = $size_arr;
    $ratio_orig = $width_orig / $height_orig;

    if ($width / $height > $ratio_orig)
    {
        $width = max(1, (int)floor($height * $ratio_orig));
    }
    else
    {
        $height = max(1, (int)floor($width / $ratio_orig));
    }

    // Resample
    $tempimg = imagecreatetruecolor($width, $height);
    imagecopyresampled($tempimg, $image, 0, 0, 0, 0, $width, $height, $width_orig, $height_orig);
    imagejpeg($tempimg, $thumbname, 100);
}
