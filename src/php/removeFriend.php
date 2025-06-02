<?php
/*
	Does: if unfollowed null sets unfollowed to user who wants to unfriend otherwise terminates the conection

	Returns:
		-5: Post variables either not decared or formated wrong
		-4: No friendship to befin with
		-3: you are alreading blocking
		-2: User's credentials dont match

		success: 1/2


*/
require "utility/globals.php";


$user = declared($_POST["u"]);
$pass = declared($_POST["p"]);
$user2 = declared($_POST["user2"]);


validate($user, $pass);


//check if actual relationship between users
$sql = "SELECT unfollowed FROM Friendship WHERE (BINARY uName1 = ? AND BINARY uName2 = ?) OR (BINARY uName1 = ? AND BINARY uName2 = ?)";
$query_exec = tryQuery($sql, "ssss", $user, $user2, $user2, $user);
if($query_exec->num_rows <= 0)
{
	finish("-4");
}

$row = $query_exec->fetch_assoc();
if($row['unfollowed'] == $user2)
{//other user want to sever friendship so remove all friendship history
	$sql = "DELETE FROM Friendship WHERE (BINARY uName1 = ? AND BINARY uName2 = ?) OR (BINARY uName1 = ? AND BINARY uName2 = ?)";
	$query_exec = tryQuery($sql, "ssss", $user, $user2, $user2, $user);
		
	$sql = "DELETE FROM Chat WHERE (BINARY uName1 = ? AND BINARY uName2 = ?) OR (BINARY uName1 = ? AND BINARY uName2 = ?)";
	$query_exec = tryQuery($sql, "ssss", $user, $user2, $user2, $user);

	finish("1");
}
else if($row['unfollowed'] == $user)//this only happens if logical error
{
	finish("-3");
}
else
{//set the unfriended flag
	$sql = "UPDATE Friendship SET unfollowed = ? WHERE (BINARY uName1 = ? AND BINARY uName2 = ?) OR (BINARY uName1 = ? AND BINARY uName2 = ?)";
	$query_exec = tryQuery($sql, "sssss", $user, $user, $user2, $user2, $user);

	finish("2");
}