<?php
$output = array("messages" => array());
$target_dir = "assets/";
$target_file = $target_dir . basename(getRandomName());
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        array_push($output['messages'], "File is an image - " . $check["mime"] . ".");
        $uploadOk = 1;
    } else {
        array_push($output['messages'], "File is not an image.");
        $uploadOk = 0;
    }
}
// Check if file already exists
if (file_exists($target_file)) {
    array_push($output['messages'], "Sorry, file already exists.");
    $uploadOk = 0;
}
// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
    array_push($output['messages'], "Sorry, your file is too large.");
    $uploadOk = 0;
}
// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    array_push($output['messages'], "Sorry, only JPG, JPEG, PNG & GIF files are allowed.");
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    array_push($output['messages'], "Sorry, your file was not uploaded.");
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        array_push($output['messages'], "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.");
    } else {
        array_push($output['messages'], "Sorry, there was an error uploading your file.");
    }
}

echo json_encode( $output );

function getRandomName() {
    $fName = "";
    for($i = 0; $i < 10; $i++){
        $fName .= rand(0, 9);
    }
    return $fName;
}
?>