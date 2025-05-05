<?php

require "globals.php";

if ($conn->connect_error) {
  echo "-1";
  return;
}

$user = $_POST["u"];
$pass = $_POST["p"];


$sql = "SELECT uName FROM Users WHERE uName = '$user'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {//is this username available
  echo "-2";
  $conn->close();
  return; 
}

$sql = "INSERT INTO Users (uName, uPass) VALUES ($user, $pass)";

if ($conn->query($sql) === TRUE) {
  echo "1";
} else {
  echo "-1";
}

$conn->close();
