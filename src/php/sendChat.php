<?php
/*
  Does: sends users chat

  Returns:
    -8: this user is blocked by you
    -7: you are blocked
    -5: undeclared variable/ incorrect variable
    -3: no friendship
    -2: user credentials wrong
    -1: server error
    1: success

*/
require "utility/globals.php";
require "class/Messages.php";


$user = declared($_POST["u"]);
$pass = declared($_POST["p"]);
$user2 = declared($_POST['user2']);
$message = declared($_POST['message']);

$row = validate($user, $pass);
$myId = $row['uId'];

//validating message
if(strlen($message) <= 0 || strlen($message) > 1000 || preg_match('/[^\x20-\x7e]/', $message))
{
  finish("-5");
}


//checking if there is a relationship
$sql = "SELECT unfollowed, uId1, uId2 FROM Friendship WHERE (BINARY uName1 = ? AND BINARY uName2 = ?) OR (BINARY uName1 = ? AND BINARY uName2 = ?)";
$result = tryQuery($sql, "ssss", $user2, $user, $user, $user2);
 
//echo "user1: " . $user . " user2: " . $user2;
//$row = $result->fetch_assoc();
//echo "ids: " . $row['uId1'] . " " . $row['uId2'];



if ($result->num_rows <= 0) {//no relation ship or user may not even exist
  finish("-3");
}

//this dosnt particularly matter but no texting a person you have blocked
$row = $result->fetch_assoc();
if($row['unfollowed'] == $user)
{
  finish("-8");
}
else if($row['unfollowed'] == $user2)
{
  finish("-7");
}

$yourId = ($row['uId1'] == $myId ? $row['uId2'] : $row['uId1']);



$sql = "SELECT uId FROM users WHERE uName = ?";
$result = tryQuery($sql, "s", $user2);
$row = $result->fetch_assoc();
//echo $sql . "+++";
//echo $row['uId'];





//these may require error checking like malloc
//get time of text
$d = new DateTime('now');
$d->setTimezone(new DateTimeZone('UTC'));
$time =  $d->format('Y-m-d H:i:s');


$sql = "INSERT INTO Chat (uId1, uId2, content, sentAt, seen) VALUES (?,?,?,?, False)";
$result = tryQuery($sql, "iiss", $myId,$yourId,$message, $time);

finish("1");
