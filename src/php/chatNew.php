<?php
/*
  Does: takes index of the most recent seen chat to get new chats
  
  Returns:
    -8: you are blocking or no reationship
    -7: we are blocked
    -5: undeclared var
    -2: wrong credential
    -1: server error
    0: no new messages
    success: string of messages
*/
require "utility/globals.php";
require "class/Messages.php";

$a = new Messages();//holds all messages and has an error feild

$user = declared($_POST["u"]);
$pass = declared($_POST["p"]);
$user2 = declared($_POST['user2']);
$old = declared($_POST['old']);

$row = validate($user, $pass);//validating and getting id
$myId = $row['uId'];


//checking if there is a relationship
$sql = "SELECT unfollowed, uId1, uId2 FROM Friendship WHERE (BINARY uName1 = ? and BINARY uName2 = ?) or (BINARY uName1 = ? and BINARY uName2 = ?)";
$result = tryQuery($sql, "ssss", $user2, $user, $user, $user2);

if ($result->num_rows <= 0) {//no relation ship or user may not even exist
  finish("-8");
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


//get chatw that are newer that $old
$sql = "SELECT * FROM chat WHERE chatId > ? AND ((uId1 = ? AND uId2 = ?) OR (uId1 = ? AND uId2 = ?))";
$result = tryQuery($sql, "iiiii", $old, $yourId, $myId, $myId, $yourId);

if ($result->num_rows <= 0) {
  finish("0");
}

//storing the range of the new chats we are getting so they can be set to senn
$min = null;
$max = null;

while($row = $result->fetch_assoc())
{
    if(!isset($min))
    {
      $min = $row['chatId'];
    }
    else
    {
      $min = ($min > $row['chatId'] ? $row['chatId'] : $min);
    }

    if(!isset($max))
    {
      $max = $row['chatId'];
    }
    else
    {
      $max = ($max < $row['chatId'] ? $row['chatId'] : $max);
    }
    $a->append_m($a->asOneString($row['content'], $row['seen'], $row['sentAt'], ($row['uId1'] == $myId? 0: 1), $row['chatId'])); 
}

//now setting all those messages to seen
$sql = "UPDATE chat SET seen = true WHERE uId1 = ? AND uId2 = ? AND chatId BETWEEN ? AND ?";
$result = tryQuery($sql, "iiii", $yourId, $myId, $min, $max);

$a->print();