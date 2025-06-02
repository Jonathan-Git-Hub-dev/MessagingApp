<?php
/*
    Does: gets block list, may unblock a user

    Returns:
        -5: Data not declared
        -4: Relationship between users does not match this description
        -2: User has wrong credentials
        -1: Server error

        Success: 0 error code followed by blocked friends list
*/
require "utility/globals.php";


$user = declared($_POST["u"]);
$pass = declared($_POST["p"]);

$row = validate($user, $pass);
$myId = $row['uId'];


if(isset($_POST['u2']))//if set user is trying to unblock
{
  $user2 = $_POST['u2'];

  //check if actaul friendship with us blocking
  $sql = "SELECT unfollowed FROM Friendship WHERE (BINARY uName1 = ? AND BINARY uName2 = ?) OR (BINARY uName1 = ? AND BINARY uName2 = ?)";
  $result = tryQuery($sql, "ssss", $user, $user2, $user2, $user);
  if($result->num_rows > 0)
  {
      $row = $result->fetch_assoc();
      if($row['unfollowed'] == $user)
      {
        $sql = "UPDATE friendship SET unfollowed = null WHERE (BINARY uName1 = ? AND BINARY uName2 = ?) OR (BINARY uName1 = ? AND BINARY uName2 = ?)";
        $result = tryQuery($sql, "ssss", $user, $user2, $user2, $user);
      }
      else//thry are unfollowing us
      {
        //this should not happen unless tampered with
        finish("-4");
      }
  }
  else
  {//user may have blocked us back resulting in no relationship or data has been tampered with
    finish("-4");
  }
}

//get blocked friends list
$sql = "SELECT uName1, uName2 FROM Friendship WHERE (BINARY uName1 = ? OR BINARY uName2 = ?) AND BINARY unfollowed = ?";
$result = tryQuery($sql, "sss", $user, $user, $user);

echo "0";//exit code idicating all good

while($row = $result->fetch_assoc())
{
  if($row['uName1'] == $user)
  {
    echo "," . $row['uName2'];
  }
  else
  {
    echo "," . $row['uName1'];
  }
}

