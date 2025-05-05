<?php

require "globals.php";

if ($conn->connect_error) {
  echo "-1";
  return;
}

$user = $_POST["u"];
$pass = $_POST["p"];


$sql = "SELECT uName FROM Users WHERE uName = '$user' AND uPass = '$pass'";
//echo "heloeofnsfhdskfjksdjfkjdkfdf";
//echo $sql;
$result = $conn->query($sql);

if ($result->num_rows > 0) {//good
  echo "1";
  $conn->close();
  return; 
}

echo "-2";//user does not exist
$conn->close();