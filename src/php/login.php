<?php
/*
    Does: checks if username and password exist in the data base

    Returns:
        1: User exists
        0: No such user
        -1: Database interaction error
        -5: Post variable not declared
*/
require "utility/globals.php";

$user = declared($_POST["u"]);
$pass = declared($_POST["p"]);


$sql = "SELECT uName FROM Users WHERE BINARY uName = ? AND BINARY uPass = ?";
//$result = tryQuery($sql);
$result = tryQuery($sql, 'ss', $user, $pass);

if ($result->num_rows > 0)
{
    finish("1");
}

finish("0");
