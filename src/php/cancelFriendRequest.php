<?php
/*
	Does: User is reneging on trying to befrend another user

	Returns:
		-5: Data not Declared
		-3: could not complete
		-2: User's credential wrong
		-1: Server error
		1: Success

*/
require "utility/globals.php";


$user = declared($_POST["u"]);
$pass = declared($_POST["p"]);
$user2 = declared($_POST["user2"]);

validate($user, $pass);

//check if request has been accepted
$sql = "SELECT uName2 FROM Request WHERE BINARY uName1 = ? and BINARY uName2 = ?";
$result = tryQuery($sql, "ss", $user, $user2);

if($result->num_rows <= 0)
{//request has already been accepted or data faulty
	finish("-3");
}
else
{
	//remove request
	$sql = "DELETE FROM Request WHERE BINARY uName1 = ? and BINARY uName2 = ?";
	tryQuery($sql, "ss", $user, $user2);

	finish("1");
}
