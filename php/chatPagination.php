<?php

/*
takes number gives 20? older chats
if chats run out also tell calling js

need way to encode messages as they have no real format



what is needed for a message and how will it be structured

read or not, time sent, sender, content
eg
1,2024-10-24 02:28:33,tommy,blahblah
so appand as string and will be unformated as a string
*/


require "globals.php";
require "class/Messages.php";


$a = new Messages();//hold all frinedship types and has an error feild
$a->append_m("sfdgsdgsy");
//$a->append_m(["aaa","bbb"]);
$a->set_num(-1);
$a->asOneString('aaa','bbb','ccc');
$a->print();

//$a->set_num(-1);
//$a->append_o(["sfdgsdgs", "y"]);
//echo serialize($a);
//echo " spaces ";
//-1 normal error 
//-2 login error


return;

/*
if ($conn->connect_error) {
	$a->set_num(-1);


if ($conn->connect_error) {
  echo "-1";
  return;
}

$user = $_POST["u"];
$pass = $_POST["p"];
$user2 = $_POST['user2'];


$sql = "SELECT uName FROM Users WHERE uName = '$user' AND uPass = '$pass'";
//echo "heloeofnsfhdskfjksdjfkjdkfdf";
//echo $sql;
$result = $conn->query($sql);

if ($result->num_rows <= 0) {//good
  echo "-2";
  $conn->close();
  return; 
}

//checking if there is a relationship
$sql = "SELECT unfollowed FROM Friendship WHERE (uName1 = '$user' and uName2 = '$user2') or (uName1 = '$user2' and uName2 = '$user') ";
$result = $conn->query($sql);

if ($result->num_rows <= 0) {//no relation ship or user may not even exist
  echo "-5";
  $conn->close();
  return; 
}

//this dosnt particularly matter but no texting a person you have blocked
$row = $result->fetch_assoc();
if($row['unfollowed'] == $user)
{
  echo "-5";
  $conn->close();
  return;
}

echo "success";//user does not exist
$conn->close();*/