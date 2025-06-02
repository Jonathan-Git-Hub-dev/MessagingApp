<?php
/*
    Does: creates user when username provied is unique, saves users profile picture

    Returns:
        1: success
        -1: server or sql error
        -2: username in use
        -3: data formatting error    
        -5: Post variable not declared
*/
require "utility/globals.php";

$user = declared($_POST["u"]);
$pass = declared($_POST["p"]);

$result = tryQuery("SELECT uName FROM Users WHERE BINARY uName = ?", 's', $user);
if ($result->num_rows > 0)
{//name in use
    finish("-2");
}


//checking valid username and password
if(!validateUsername($user))
{
  finish("-3");
}
if(!validatePassword($pass))
{
  finish("-3");
}

$fn = "pp.jpeg";//default profile picture

if(isset($_FILES['file']))//if user picked a profile picture fix it
{
    $fn = $user . ".jpeg";
    
    $file = $_FILES['file'];

    $fileName = $_FILES['file']['name'];

    $fileTempName = $_FILES['file']['tmp_name'];
    $fileError = $_FILES['file']['error'];
    

    $fileExt = explode('.', $fileName);
    $fileActualExt = strtolower(end($fileExt));
    $allowed = array('jpg', 'jpeg');

    if(in_array($fileActualExt, $allowed))
    {
      if($fileError === 0)
      {

          //temporary save 
          $newName = "../a1/src/ProfilePic/UsersProfilePic." . $fileActualExt;
          if(!move_uploaded_file($fileTempName, $newName))
          {
            finish("-1");
          }

          //reload image for reformating
          $im = imagecreatefromjpeg($newName);
          if(!$im)
          {
            finish("-1");
          }     
          $s = min(imagesx($im), imagesy($im)); 

          //crop to standard size
          $im2 = imagecrop($im, ['x' => 0, 'y' => 0, 'width' => $s, 'height' => $s]); 
          if(!$im2)
          {
            finish("-1");
          }
          $im3 = imagescale ( $im2 , 200 , 200 );
          if(!$im3)
          {
            finish("-1");
          }
        
          //final save
          $newFN = "../a1/src/ProfilePic/" . $user . ".jpeg";
          if(!imagejpeg($im3, $newFN, 100))
          {
            finish("-1");
          }
      }
      else
      {
        finish("-1");
      }
    }
    else
    {
      finish("-3");
    }

}

//create account
$sql = "INSERT INTO Users (uName, uPass, uProfile) VALUES (?, ?, ?)";
tryQuery($sql, "sss", $user, $pass, $fn);


finish("1");