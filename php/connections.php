<?php



require "globals.php";
require "class/Bundle.php";


function sortByOrder($a, $b) {
    if ($a[3] < $b[3]) {
        return 1;
    } elseif ($a[3] > $b[3]) {
        return -1;
    }
    return 0;
}

//usort($myArray, 'sortByOrder');



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
$sql = "SELECT uId FROM Users WHERE uName = '$user' AND uPass = '$pass'";
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
$row = $result->fetch_assoc();
$myUId = $row['uId'];
//echo $myUId;


$store = array();

$sql = "SELECT uName1, uName2, uId1, uId2, unfollowed FROM Friendship WHERE uName1 = '$user' OR uName2 = '$user'";
$query_exec = $conn->query($sql);
if($query_exec) {  
	if($query_exec->num_rows > 0)//for all results
	{
		while($row = $query_exec->fetch_assoc())
		{
			if($row["unfollowed"] != $user)//we dont like this guy so ignore
			{
				$tUId1 = $row['uId1'];
				$tUId2 = $row['uId2'];
				$tempMess = "start convo";
				//SELECT  Max(sentAt) FROM chat WHERE uId1 = 1 and uId2 =7 or uId1 = 7 and uId2 =1;
				$sql = "SELECT MAX(sentAt) FROM chat WHERE uId1 = $tUId1 and uId2 =$tUId2 or  uId1 = $tUId2 and uId2 =$tUId1";
				$qc = $conn->query($sql);
				//if($qc->num_rows > 0)//for all results
				//{
				
				$row2 = $qc->fetch_assoc();
				$max =  $row2['MAX(sentAt)'];
				if(is_null($max) != 1)
				{
				//use max to find last message
					$sql = "SELECT content FROM chat WHERE sentAt='$max' and (( uId1 = $tUId1 and uId2 =$tUId2) or  (uId1 = $tUId2 and uId2 =$tUId1))";
					$qc = $conn->query($sql);
					$row2 = $qc->fetch_assoc();
					$tempMess = $row2['content'];

				}
				else
				{
					//setting max
					$max = "2000-00-00 00:00:00";
				}

				if($row['uName1'] == $user)
				{
					//$a->append_f([$row["uName2"],$row["uId2"]],$tempMess);
					//$a->append_f([$row["uName2"],$row["uId2"], $tempMess]);
					array_push($store, [$row["uName2"],$row["uId2"], $tempMess, strtotime($max), $max]);
					//echo strtotime($max);
					//echo "space";
				}
				else
				{
					//$a->append_f([$row["uName1"],$row["uId2"],$tempMess]);
					//echo strtotime($max);
					//echo "space";
					array_push($store, [$row["uName1"],$row["uId1"], $tempMess, strtotime($max), $max]);
				}
				//echo $tempMess;
			}
		}
	}
} else {
    //error handling
	$a->set_num(-1);
	echo $a->print();
  	$conn->close();
  	return;
}


//sort our new array
usort($store, 'sortByOrder');
/*foreach ($store as $x) {
	foreach ($x as $y => $b) {
		echo "$y,$b,,";
	}
	echo "<br>";
}*/

// add into bundle
foreach ($store as $x)
{
	//$a->append_f([$row["uName1"],$row["uId2"],$tempMess]);
	$a->append_f([$x[0],$x[1],$x[2],$x[4]]);
}
//





//in requests
$sql = "SELECT uName1, uId1 FROM Request WHERE uName2 = '$user'";

$query_exec = $conn->query($sql);
if($query_exec) { 
    //do your success things 
	if($query_exec->num_rows > 0)
	{
		while($row = $query_exec->fetch_assoc())
		{
			$a->append_i([$row["uName1"], $row["uId1"]]);
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


//out requests
$sql = "SELECT uName2, uId2 FROM Request WHERE uName1 = '$user'";

$query_exec = $conn->query($sql);
if($query_exec) { 
    //do your success things 
	if($query_exec->num_rows > 0)
	{
		while($row = $query_exec->fetch_assoc())
		{
			$a->append_o([$row["uName2"], $row["uId2"]]);
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