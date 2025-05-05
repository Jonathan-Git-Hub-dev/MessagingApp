<?php
header("Access-Control-Allow-Origin: *");

$username = $_POST["u"];
$password = $_POST["p"];

$servername = "localhost";
$username = "root";
$password = "";

// Create connection
$conn = new mysqli($servername, $username, $password);
mysqli_query($conn, "use p1");

$Arg= "SELECT * FROM Users";
$result = mysqli_query($conn, $Arg);

function AsCsv($result)
{
		$temp = "";
		while($row = $result->fetch_assoc())
		{
			foreach ($row as $data)
			{
				$temp.=$data;
				$temp.=',';
			}
		}
		return $temp;                          
}

$r1 = AsCsv($result);
	

echo $r1;
// Check connection
/*if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";*/


//echo "Welcome, {$username} {$password}";
//trying php


/**/
//echo $em;
