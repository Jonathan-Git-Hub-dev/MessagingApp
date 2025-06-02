<?php
/*
  Does: gets a page of chats

  returns:
    -7: no relationship with user or you are blocking them
    -5: variable not decalsed
    -4: no more chats
    -2: user credentials wrong
    -1: server error

    succes: encoded string of texts
      -4: code means not a full page could be retrieved
      -7: user is blocking you no texting
      -11: both
*/
require "utility/globals.php";
require "class/Messages.php";


$a = new Messages();//hold all messages and has an error feild

$user = declared($_POST["u"]);
$pass = declared($_POST["p"]);
$user2 = declared($_POST['user2']);


$result = validate($user, $pass);
$myId = $result['uId'];



$lim = declared($_POST['page']);
if($lim == -1)//means this is the first page
{
  $sql = "SELECT MAX(chatId) FROM Chat";
  $result = tryQueryInputless($sql);

  if ($result->num_rows <= 0)
  {
    finish("-4");//no chats at all
  }
  else
  {
    $row = $result->fetch_assoc();
    $lim = $row['MAX(chatId)'] + 1;
  }

}


//checking if there is a relationship
$sql = "SELECT unfollowed, uId1, uId2 FROM Friendship WHERE (BINARY uName1 = ? and BINARY uName2 = ?) or (BINARY uName1 = ? and BINARY uName2 = ?)";
$result = tryQuery($sql, "ssss", $user2, $user, $user, $user2);

if ($result->num_rows <= 0) {//no relation ship or user may not even exist
  finish("-7");
}
$row = $result->fetch_assoc();
if($row['unfollowed'] == $user)//we are blocking this user
{
  finish("-7");
}
else if($row['unfollowed'] == $user2)//this user is blocking us
{
  $a->set_num_add(-7);
}
$yourId = ($row['uId1'] == $myId ? $row['uId2'] : $row['uId1']);


$sql = "SELECT * FROM Chat WHERE
((uId1 = ? and uId2 = ?) or (uId1 = ? and uId2 = ?)) and chatId < ?
ORDER BY chatId DESC
LIMIT 41";//pagesize 40 extra for checking if there is a later page 
$result = tryQuery($sql, "iiiii", $myId, $yourId, $yourId, $myId, $lim);

$a->set_num_add(-4);//used to track if there is another page after

if ($result->num_rows <= 0)//no chats
{
  finish("-4");
}

$min;//used to set chats to seen
$max;
$index = 0;
while($row = $result->fetch_assoc())//saving chats
{
  if($index == 0)
  {
    $min = $row['chatId'];
  }
  if($index == 40)
  {
      $a->set_num_add(4);
      break;
  }

  $max = $row['chatId'];
  $a->append_m($a->asOneString($row['content'], $row['seen'], $row['sentAt'], 
    ($row['uId1'] == $myId? 0: 1), $row['chatId'])); 
    
  $index++;
}

//setting chats as seen
//echo $min. "<>". $max;
$sql = "UPDATE chat SET seen = True WHERE (uId1 = ? AND uId2 = ?) AND (chatId BETWEEN ? AND ?)";
$result = tryQuery($sql, "iiii", $yourId, $myId, $max, $min);
  
$a->print();