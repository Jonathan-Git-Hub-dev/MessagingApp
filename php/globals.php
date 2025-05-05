<?php
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "root";
$password = "";
$database = "p1";

$conn = new mysqli($servername, $username, $password, $database);