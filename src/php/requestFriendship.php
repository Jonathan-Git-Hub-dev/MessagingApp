<?php
/*
	Does: Requests frendship with other users

	Returns:
		-5: Data not declared or in wrong format
		-4: Users already have friendship or Request
		-3: Second user does not exist
		-2: User's credentials wrong
		-1: Server error 
		1: Success
*/
require "utility/globals.php";


$user = declared($_POST["u"]);
$pass = declared($_POST["p"]);
$user2 = declared($_POST["user2"]);

if($user == $user2)
{
	finish("-5");
}

$result = validate($user, $pass);
$uId1 = $result['uId'];


//checking if users already have a friendship
$sql = "SELECT unfollowed FROM Friendship WHERE (BINARY uName1 = ? AND BINARY uName2 = ?) OR (BINARY uName1 = ? AND BINARY uName2 = ?)";
$result = tryQuery($sql, "ssss", $user, $user2, $user2, $user);

if ($result->num_rows > 0) {//relationship already exists
  finish("-4");
}



//check if user real
$sql = "SELECT uId FROM Users WHERE BINARY uName = ?";
$result = tryQuery($sql, "s", $user2);
if ($result->num_rows <= 0) {
  	finish("-3");
}
$row = $result->fetch_assoc();
$uId2 = $row['uId'];

//check if there is already a requested relationship
$sql = "SELECT uName2 FROM Request WHERE (BINARY uName1 = ? AND BINARY uName2 = ?) OR (BINARY uName1 = ? AND BINARY uName2 = ?)";
$query_exec = tryQuery($sql, "ssss", $user,$user2,$user2,$user);
if($query_exec->num_rows > 0)
{
	finish("-4");
}

//creating request
$sql = "INSERT INTO Request (uName1, uName2, uId1, uId2) VALUES (?, ?, ?, ?)";
tryQuery($sql, "ssii", $user, $user2, $uId1, $uId2);
		
finish("1");