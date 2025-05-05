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
	//$a->set_num(-2);
	//echo $a->print();
  	//$conn->close();
  	return; 
}



//check if actual relationship
//$unfollowed;
$sql = "SELECT unfollowed FROM Friendship WHERE uName1 = '$user' and uName2 = '$user2' or uName1 = '$user2' and uName2 = '$user'";
//echo $sql;
$query_exec = $conn->query($sql);
if($query_exec)
{ 
	if($query_exec->num_rows <= 0)
	{
		echo "-1";
		return;
	}
	$row = $query_exec->fetch_assoc();
	$unfollowed = $row['unfollowed'];
	if($unfollowed != "")//check if other user has already defreded
	{
		if($unfollowed == $user2)
		{//other user want to sever friendship so remove all friend history
			//REMOVE CHAT REMOVE CHAT REMOVE CHAT REMOVE CHAT REMOVE CHAT REMOVE CHAT REMOVE CHAT REMOVE CHAT REMOVE CHAT
			$sql = "DELETE FROM Friendship WHERE uName1 = '$user' and uName2 = '$user2' or uName1 = '$user2' and uName2 = '$user'";
			$query_exec = $conn->query($sql);
			//echo "deleted record";
			echo "1";
			return;
		}
		else
		{//this only happens if logical error
			echo "-1";
			return;
		}
	}
	else
	{
		$sql = "UPDATE Friendship SET unfollowed = '$user' WHERE uName1 = '$user' and uName2 = '$user2' or uName1 = '$user2' and uName2 = '$user'";
		$query_exec = $conn->query($sql);
		//echo "unfollowed set";
		echo "2";
		return;
	}
}
else
{
    echo -1;
  	return;
}