<?php
/*
    Does: gets users profile picture

    returns:
        -5: undeclared data
        -2: user's credentials wrong
        -1: Server error

        Success: url of profile picture
*/
require "utility/globals.php";

$user = declared($_POST["u"]);
$pass = declared($_POST["p"]);

$result = validate($user, $pass);
echo $result['uProfile'];
