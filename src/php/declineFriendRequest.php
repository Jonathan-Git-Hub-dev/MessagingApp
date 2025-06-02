<?php
/*
	Does: declines request from other user for friendship

	Returns:
		-5: Undeclared data
		-3: Request does not exist
		-2: User's credentials incorect
		-1: Server error
		1: Success
*/
require "utility/globals.php";


$user = declared($_POST["u"]);
$pass = declared($_POST["p"]);
$user2 = declared($_POST["user2"]);


validate($user, $pass);


//find request in table
$sql = "SELECT uName2 FROM Request WHERE BINARY uName1 = ? and BINARY uName2 = ?";
$query_exec = tryQuery($sql, "ss", $user2, $user);

	if($query_exec->num_rows <= 0)
	{//other user reneged or false data

		finish("-3");
	}
	else
	{//found so remove it
		$sql = "DELETE FROM Request WHERE BINARY uName1 = ? and BINARY uName2 = ?";
		tryQuery($sql, "ss", $user2, $user);

		finish("1");
	}

return;