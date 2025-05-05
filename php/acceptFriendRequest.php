<?php
//header("Access-Control-Allow-Origin: *");
require "globals.php";


$user = $_POST["u"];
$pass = $_POST["p"];
$user2 = $_POST["user2"];


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
$sql = "SELECT uName FROM Users WHERE uName = '$user' AND uPass = '$pass'";
//echo $sql;
$result = $conn->query($sql);
//no really error checking here

if ($result->num_rows <= 0) {//no user
  	echo "-2";
  	return; 
}



//find request in table
$sql = "SELECT uName2 FROM Request WHERE uName1 = '$user2' and uName2 = '$user'";

$query_exec = $conn->query($sql);
if($query_exec)
{ 
	if($query_exec->num_rows <= 0)
	{
		//user may have tampered with second users name so request does not exist
		//or other user canceled 
		echo "-3";
	}
	else
	{
		//found request remove it and create friend ship
		$sql = "DELETE FROM Request WHERE uName1 = '$user2' and uName2 = '$user'";
		$query_exec = $conn->query($sql);

		//get ids of the users
		$sql = "SELECT uId FROM Users WHERE uName = '$user2'";
		$query_exec = $conn->query($sql);
		$row = $query_exec->fetch_assoc();
		$uId1 = $row['uId'];


		$sql = "SELECT uId FROM Users WHERE uName = '$user'";
		$query_exec = $conn->query($sql);
		$row = $query_exec->fetch_assoc();
		$uId2 = $row['uId'];
		//echo $uId1;
		//echo " + ";
		//echo $uId2;

		//echo "fdsgsd";


		$sql = "insert into Friendship (uId1, uId2, uName1, uName2) Values ($uId1, $uId2, '$user2', '$user')";
		$query_exec = $conn->query($sql);

		echo "1";
	}
}
else
{
    echo "-1";
}

return;