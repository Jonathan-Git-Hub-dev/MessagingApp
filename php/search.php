<?php
require "globals.php";
require "class/Bundle.php";
$a = new Bundle();//used to hold all search results



if ($conn->connect_error) {
	$a->set_num(-1);
	echo $a->print();
  	$conn->close();
  	return; 
}
  
$user = $_POST["u"];
$pass = $_POST["p"];
$search = $_POST["search"];


//validate creds
$sql = "SELECT uName FROM Users WHERE uName = '$user' AND uPass = '$pass'";
//echo $sql;
$result = $conn->query($sql);
//no really error checking here

if ($result->num_rows <= 0)
{//good
  //echo "1";
	$a->set_num(-2);
	echo $a->print();
  	$conn->close();
  	return; 
}




//
$myhashmap1 = array();


//get all matches
$sql = "SELECT uName FROM users WHERE uName LIKE '%$search%'";

$query_exec = $conn->query($sql);
if($query_exec)
{ 
    //do your success things 
	if($query_exec->num_rows > 0)
	{
		while($row = $query_exec->fetch_assoc())
		{
			//add all to hash map for later checks
			$b = (string)$row['uName'];
			$myhashmap1[$b] = 1;
			//echo $row['uName'];
		}
		//return;
	}
	else
	{//no results
		$a->set_num(-3);
		echo $a->print();
  		$conn->close();
  		return;
	}
} else {
    //error handling
	$a->set_num(-1);
	echo $a->print();
  	$conn->close();
  	return;
}


//add self and frineds and requests to set
$myhashmap1[$user] = 0;

$sql = "SELECT uName1, uName2 FROM Friendship WHERE uName1 = '$user' OR uName2 = '$user' ";
$query_exec = $conn->query($sql);
while($row = $query_exec->fetch_assoc())
{
	if($row['uName1'] != $user)
	{
		$b = (string)$row['uName1'];
		$myhashmap1[$b] = 0;
	}
	else
	{
		$b = (string)$row['uName2'];
		$myhashmap1[$b] = 0;
	}
}

$sql = "SELECT uName1, uName2 FROM Request WHERE uName1 = '$user' OR uName2 = '$user' ";
$query_exec = $conn->query($sql);
while($row = $query_exec->fetch_assoc())
{
	if($row['uName1'] != $user)
	{
		$b = (string)$row['uName1'];
		$myhashmap1[$b] = 0;
	}
	else
	{
		$b = (string)$row['uName2'];
		$myhashmap1[$b] = 0;
	}
}

foreach ($myhashmap1 as $key => $val)
{
	if ($val == 1)
  	{
		$a->append_f($key);
  	}	 
}

echo $a->print();
$conn->close();
return;


