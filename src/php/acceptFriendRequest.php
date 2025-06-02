<?php
/*
	Does: Accepts freind request from another user

	Returns:
		-5: Data uneclared or in incorrect format
		-3: Request does not exist
		-2: User's credentials incorect
		-1: Sever error
		1: Success
*/
require "utility/globals.php";


$user = declared($_POST["u"]);
$pass = declared($_POST["p"]);
$user2 = declared($_POST["user2"]);


if($user == "" || $pass == "" || $user2 == "")
{//sent values have been tampered with or frontend is buggy
	finish("-5");
}

validate($user, $pass);

//find request in table
$sql = "SELECT uName1, uName2, uId1, uId2  FROM Request WHERE BINARY uName1 = ? AND BINARY uName2 = ?";
$result = tryQuery($sql, "ss", $user2, $user);



if($result->num_rows <= 0)
{//other user reneged or values tamper with
	finish("-3");
}
else
{
	//creating the friendship
	$row = $result->fetch_assoc();
	$myId = $row['uId2'];
	$yourId = $row['uId1'];
	//echo "ids " . $myId . " " . $yourId;
	$sql = "insert into Friendship (uId1, uId2, uName1, uName2) Values (?, ?, ?, ?)";
	$result = tryQuery($sql, "iiss", $yourId, $myId, $user2, $user);



	//remove old request
	$sql = "DELETE FROM Request WHERE BINARY uName1 = ? AND BINARY uName2 = ?";
	$result = tryQuery($sql, "ss", $user2, $user);

	finish("1");
}