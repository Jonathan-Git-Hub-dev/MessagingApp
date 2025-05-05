<?php
//header("Access-Control-Allow-Origin: *");
require "globals.php";


$user = $_POST["u"];
$pass = $_POST["p"];
$user2 = $_POST["user2"];


//what if user also friended while search
//check if user exists


if($user == "" || $pass == "" || $user2 == "")
{//sent values have been tampered with or frontend is buggy
	echo "-4";
	return; 
}


if ($conn->connect_error) {
	echo "-1";
  	return; 
}
//validate creds
$sql = "SELECT uId FROM Users WHERE uName = '$user' AND uPass = '$pass'";
//echo $sql;
$result = $conn->query($sql);
//no really error checking here

if ($result->num_rows <= 0) {//no user
  	echo "-2";
  	return; 
}
$row = $result->fetch_assoc();
$uId1 = $row['uId'];



//check if user real
$sql = "SELECT uId FROM Users WHERE uName = '$user2'";
//echo $sql;
$result = $conn->query($sql);
//no really error checking here

if ($result->num_rows <= 0) {//no user
  	echo "-3";
  	return; 
}
$row = $result->fetch_assoc();
$uId2 = $row['uId'];




//chekc if other user hasent already request first
//echo $user;
//echo $user2;
$sql = "SELECT uName2 FROM Request WHERE uName1 = '$user2' and uName2 = '$user'";

$query_exec = $conn->query($sql);
if($query_exec)
{ 
	if($query_exec->num_rows <= 0)
	{
		//create the request
		$sql = "INSERT INTO Request (uName1, uName2, uId1, uId2) values ('$user', '$user2', '$uId1', '$uId2');";
		$query_exec = $conn->query($sql);
		echo "success";
	}
	else
	{//already donem, not sure how to tell user
		echo "-19";
	}

}
else
{
    echo "-1";
}

return;