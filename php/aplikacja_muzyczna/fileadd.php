<?php
session_start();
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["plik"]["name"]);
$uploadOk = 1;
$FileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
// Check if image file is a actual image or fake image

if(file_exists($target_file))
{
    $exists=1;/*zasZla zmiana*/
    $_SESSION['new_name'] = basename(rand(100,10000).$_FILES["plik"]["name"]);
    while (file_exists($_SESSION['new_name']))
    {
        $_SESSION['new_name'] = basename(rand(100,10000).$_FILES["plik"]["name"]);
    }
    $target_file = $target_dir .$_SESSION['new_name'];
}
// Check file size
$size=40000000;
$MB=$size/8000000;
if ($_FILES["plik"]["size"] > $size) 
{
    $_SESSION['e_file'] = '<p>Sorry, your file is too large. maximum size is: '.$MB.'MB</p>';
    $uploadOk = 0;
}
// Allow certain file formats
if($FileType != "mp3") 
{
    $_SESSION['e_file'] = '<p>Sorry, only mp3 files are allowed.</p>';
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 1) 
{

    
    if($exists==1)
    {
        $filename=$_SESSION['new_name'];
        $_SESSION['s_file'] = '<p>file '.basename($_FILES["plik"]["name"]).' has been uploaded. however its name has been changed to: '.$_SESSION['new_name'].'</p>';
    }
    else
    {
        $filename=basename($_FILES["plik"]["name"]);
        $_SESSION['s_file'] = '<p>file '.basename($_FILES["plik"]["name"]).' has been uploaded.</p>';
    }
    
    
    if(move_uploaded_file($_FILES["plik"]["tmp_name"], $target_file))
    {
             //insert file name into database
        require_once "baza.php";
            $db = new mysqli($host,$db_user,$db_password,$db_name);
        if(isset($_SESSION['username']))
        {
            $uz=$_SESSION['username'];
        }
        else
        {
            $uz="Anonymous";
        }
            $insert = $db->query("INSERT into utwory (nazwa,uzytkownik) VALUES ('$filename','$uz');");
            if($insert)
            {
                
            }
            $db->close();
    }
    
}

header('Location: trending.php');
?>