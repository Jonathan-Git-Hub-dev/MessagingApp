<?php
/*
    Does: saves user's new profile picture

    Returns:
      -8: No image selected
      -6: Image is not jpeg
      -5: Undeclared data
      -2: User has wrong credentials
      -1: Server error
      1: success

*/
require "utility/globals.php";

$user = declared($_POST["u"]);
$pass = declared($_POST["p"]);

validate($user, $pass);


if(isset($_FILES['file']))
{
    $fn = $user . ".jpeg";
    
    $file = $_FILES['file'];

    $fileName = $_FILES['file']['name'];

    $fileTempName = $_FILES['file']['tmp_name'];
    $fileSize = $_FILES['file']['size'];
    $fileError = $_FILES['file']['error'];
    $fileType = $_FILES['file']['type'];
    
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
          
          $newFN = "../a1/src/ProfilePic/" . $user . ".jpeg";
          if(!imagejpeg($im3, $newFN, 100))
          {
            finish("-1");
          }

          //user maybe using default profile picture so change bd to point to new picture
          $sql = "UPDATE Users SET uProfile = ? WHERE uName = ?";
          $profilePicturePath = $user . ".jpeg";
          tryQuery($sql, "ss", $profilePicturePath, $user);
          finish("1");
      }
      else
      {
        finish("-1");//ranodm number
      }
    }
    else
    {
      finish("-6");//random number
    }

}
else
{
  finish("-8");
}

