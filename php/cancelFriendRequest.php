<?php
require "globals.php";


$user = $_POST["u"];
$pass = $_POST["p"];
$user2 = $_POST["user2"];


if($user == "" || $pass == "" || $user2 == "")
{//sent values have been tampered with or frontend is buggy
	echo "-2";
	return; 
}


if ($conn->connect_error) {
	echo "-1";
  	return; 
}
//validate creds
$sql = "SELECT uName FROM Users WHERE uName = '$user' AND uPass = '$pass'";

$result = $conn->query($sql);
//no really error checking here

if ($result->num_rows <= 0) {//no user
  	echo "-2";
  	return; 
}

//check if request has been accepted
$sql = "SELECT uName2 FROM Request WHERE uName1 = '$user' and uName2 = '$user2'";

$query_exec = $conn->query($sql);
if($query_exec)
{ 
	if($query_exec->num_rows <= 0)
	{
		//user may have tampered with second users name so request does not exist
		//or this may no longer exist because the other user has accepted it
		echo "-3";
	}
	else
	{
		//remove request
		$sql = "DELETE FROM Request WHERE uName1 = '$user' and uName2 = '$user2'";
		$query_exec = $conn->query($sql);

		echo "1";
	}
}
else
{
    echo "-1";
}

return;

