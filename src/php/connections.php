<?php
/*
    Does: gets all connections with users, these are friendships ore requests in either direction

    Returns:
        -1: server or SQL error
        -2: user does not exist 
        -5: Post variable not declared

		when no errors encountered a encoded string is returned
*/
require "utility/globals.php";
require "class/Connections.php";

$a = new Connections();
$store = array();//saves friend data for sorting

$user = declared($_POST["u"]);
$pass = declared($_POST["p"]);

$res = validate($user, $pass);
$myUId = $res['uId'];


//get user's friends
$sql = "SELECT uName1, uName2, uId1, uId2, unfollowed FROM Friendship WHERE BINARY uName1 = ? OR BINARY uName2 = ?";
$query_exec = tryQuery($sql, "ss", $user, $user);
  
$row = null;
if($query_exec->num_rows > 0)//for all results
{
	$row = $query_exec->fetch_assoc();
}
while($row != null)
{
	if($row["unfollowed"] != $user)//only add friends user is not blocking
	{
		$secondUser = ($row['uName1'] != $user ? $row['uName1'] : $row['uName2']);

		$sql = "SELECT uProfile FROM Users WHERE BINARY uName = ?";//get friends profile pic
		$qc = tryQuery($sql, "s", $secondUser);
		$row2 = $qc->fetch_assoc();
		$profilePic = $row2['uProfile'];

		$friendId = ( $myUId == $row['uId1']?$row['uId2']:$row['uId1']);
		$friendName = ($row['uName1'] == $user? $row['uName2'] : $row['uName1']);

		$max = 0;
		$tempMess = "start convo";
		$seen = 1;
		$sentAt = "-1";

		//get most recent chat with this user
		$sql = "SELECT MAX(chatId) FROM chat WHERE uId1 = ? and uId2 =? or  uId1 =? and uId2 =?";
		$qc = tryQuery($sql, "iiii", $myUId, $friendId, $friendId, $myUId);
		$row2 = $qc->fetch_assoc();	
		if($row2['MAX(chatId)'] != null)
		{
				$max = $row2['MAX(chatId)'];
				//echo $max;
			
				$sql = "SELECT sentAt, uId1, content, seen FROM chat WHERE chatId = ?";
				$qc = tryQuery($sql, "i", $max);
				$row2 = $qc->fetch_assoc();

				$tempMess = $row2['content'];

				//checking seen but only if other user sent the message
				$seen = ($row2['uId1']==$myUId?1:($row2['seen']? 1: 0));
				$sentAt = $row2['sentAt'];
		}

		array_push($store, [$tempMess, $friendName, $sentAt, $max, $profilePic, $seen]);
			
		}
	$row = $query_exec->fetch_assoc();
}



function sortByOrder($a, $b) {
    if ($a[3] < $b[3]) {
        return 1;
    } elseif ($a[3] > $b[3]) {
        return -1;
    }
    return 0;
}

//sort friends by when you last texted them
usort($store, 'sortByOrder');
foreach ($store as $x)
{
	$a->append_f($a->asOneString($x[0],$x[1],$x[2],$x[3],$x[4], $x[5]));
}
//





//in requests
$sql = "SELECT uName1 FROM Request WHERE BINARY uName2 = ?";
$query_exec = tryQuery($sql, "s", $user);
if($query_exec->num_rows > 0)
{
	while($row = $query_exec->fetch_assoc())
	{
		$a->append_i($row["uName1"]);
	}
}


//out requests
$sql = "SELECT uName2 FROM Request WHERE BINARY uName1 = ?";
$query_exec = tryQuery($sql, "s", $user);
if($query_exec->num_rows > 0)
{
	while($row = $query_exec->fetch_assoc())
	{
		$a->append_o($row["uName2"]);
	}
}

echo $a->print();