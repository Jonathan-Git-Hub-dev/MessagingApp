<?php

require "globals.php";

if ($conn->connect_error) {
  echo "-1";
  return;
}

$user = $_POST["u"];
$pass = $_POST["p"];
$user2 = $_POST['user2'];


$sql = "SELECT uName FROM Users WHERE uName = '$user' AND uPass = '$pass'";
//echo "heloeofnsfhdskfjksdjfkjdkfdf";
//echo $sql;
$result = $conn->query($sql);

if ($result->num_rows <= 0) {//good
  echo "-2";
  $conn->close();
  return; 
}

//checking if there is a relationship
$sql = "SELECT unfollowed FROM Friendship WHERE (uName1 = '$user' and uName2 = '$user2') or (uName1 = '$user2' and uName2 = '$user') ";
$result = $conn->query($sql);

if ($result->num_rows <= 0) {//no relation ship or user may not even exist
  echo "-5";
  $conn->close();
  return; 
}

//this dosnt particularly matter but no texting a person you have blocked
$row = $result->fetch_assoc();
if($row['unfollowed'] == $user)
{
  echo "-5";
  $conn->close();
  return;
}

echo "success";//user does not exist
$conn->close();