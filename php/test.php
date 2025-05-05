<?php

require "globals.php";
require "class/Bundle.php";
$a = new Bundle();//hold all frinedship types and has an error feild

//-1 normal error 
//-2 login error


if ($conn->connect_error) {
	$a->set_num(-1);
	echo $a->print();
  	$conn->close();
  	return; 
}
  

//echo "hello friend";


$user = $_POST["u"];
$pass = $_POST["p"];

//validate creds
$sql = "SELECT uName FROM Users WHERE uName = '$user' AND uPass = '$pass'";
//echo $sql;
$result = $conn->query($sql);
//no really error checking here

if ($result->num_rows <= 0) {//good
  //echo "1";
	$a->set_num(-2);
	echo $a->print();
  	$conn->close();
  	return; 
}




$sql = "SELECT uName2 FROM Friendship WHERE uName1 = '$user'";

$query_exec = $conn->query($sql);
if($query_exec) { 
    //do your success things 
	if($query_exec->num_rows > 0)
	{
		while($row = $query_exec->fetch_assoc())
		{
			$a->append_f($row["uName2"]);
			//$a->append_f("hello");
		  	//echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
		}
	}
} else {
    //error handling
	$a->set_num(-1);
	echo $a->print();
  	$conn->close();
  	return;
}

//now backwards foe when backwards
$sql = "SELECT uName1 FROM Friendship WHERE uName2 = '$user'";

$query_exec = $conn->query($sql);
if($query_exec) { 
    //do your success things 
	if($query_exec->num_rows > 0)
	{
		while($row = $query_exec->fetch_assoc())
		{
			$a->append_f($row["uName1"]);
			//$a->append_f("hello");
		  	//echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
		}
	}
} else {
    //error handling
	$a->set_num(-1);
	echo $a->print();
  	$conn->close();
  	return;
}


echo $a->print();
$conn->close();