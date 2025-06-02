<?php
/*
	Does: gets users with names that contain search term who are not your friends 

	Returns:
		-5: post variable not declared
		-3: no results
		-2: user credentials wrong
		-1: sql/ sever error

		On success a string of users is sent back
*/
require "utility/globals.php";


$user = declared($_POST["u"]);
$pass = declared($_POST["p"]);
$search = declared($_POST["search"]);

validate($user, $pass);

//used to track results
$myhashmap1 = array();


//get all matches of search term
$sql = "SELECT uName FROM users WHERE uName LIKE CONCAT('%',?,'%')";
$query_exec = tryQuery($sql, "s", $search);

if($query_exec->num_rows <= 0)
{
	finish("-3");
}

while($row = $query_exec->fetch_assoc())//save results
{
	$myhashmap1[((string)$row['uName'])] = 1;
}


//marking results that user already has a relationship with
$myhashmap1[$user] = 5;

//friendships
$sql = "SELECT uName1, uName2 FROM Friendship WHERE BINARY uName1 = ? OR BINARY uName2 = ? ";
$query_exec = tryQuery($sql, "ss", $user, $user);
while($row = $query_exec->fetch_assoc())
{

	if($row['uName1'] != $user)
	{
		$b = (string)$row['uName1'];
		if(isset($myhashmap1[$b]))
		{
			$myhashmap1[$b]=2;
		}
	}
	else
	{
		$b = (string)$row['uName2'];
		if(isset($myhashmap1[$b]))
		{
			$myhashmap1[$b]=2;
		}
	}
}

//requests to and from user
$sql = "SELECT uName1, uName2 FROM Request WHERE BINARY uName1 = ? OR BINARY uName2 = ?";
$query_exec = tryQuery($sql, "ss", $user, $user);
while($row = $query_exec->fetch_assoc())
{
	if($row['uName1'] != $user)
	{
		$b = (string)$row['uName1'];
		if(isset($myhashmap1[$b]))
		{
			$myhashmap1[$b]=2;
		}
	}
	else
	{
		$b = (string)$row['uName2'];
		if(isset($myhashmap1[$b]))
		{
			$myhashmap1[$b]=2;
		}
	}
}

$count = 0;
foreach ($myhashmap1 as $key => $val)//echo new users
{
	if ($val == 1)
  	{
		echo $key . ",";
		$count++;
	}	 
}
echo ":";
foreach ($myhashmap1 as $key => $val)//echo users we have relationships with
{
	if ($val == 2)
  	{
		echo $key . ",";
		$count++;
	}	 
}


if($count == 0)//no vaible results
{
	finish("-3");
}

