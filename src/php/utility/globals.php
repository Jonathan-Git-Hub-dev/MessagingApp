<?php
header("Access-Control-Allow-Origin: *");//can be changed to be more specific

$servername = "localhost";
$username = "root";
$password = "";
$database = "p1";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error)
{
    echo "-1";
    exit();
}

function finish($str)
{
    echo $str;
    $GLOBALS['conn']->close();
    exit();
}

function declared($var)
{
    if(!isset($var))
    {
        finish("-5");//arbitrary error code;
    }   
    return $var;//used for assignment
}


function tryQuery($sql, $numVars, ...$vars)
{
    $stmt = $GLOBALS['conn']->prepare($sql);
    if(!$stmt)
    {
        finish("-1");
    }
    if(!$stmt->bind_param($numVars, ...$vars))
    {
        finish("-1");
    }
    if(!($stmt->execute()))
    {
        finish("-1");
    }
    return $stmt->get_result();
}

function tryQueryInputless($sql)
{
    $result =  $GLOBALS['conn']->query($sql);

    if(!$result)
    {
        finish("-1");
    }

    return $result;
}



function validate($username, $password)//validate($user, $pass);
{//i imagine this will be changed
    $sql = "SELECT * FROM Users WHERE BINARY uName = ? AND BINARY uPass = ?";
    $result = tryQuery($sql, "ss", $username, $password);

    if ($result->num_rows <= 0)
    {//user could not be validated
        finish("-2");
    }

    //result may be needed so return them
    return $result->fetch_assoc();
}

function validateUsername($username)
{
    if(preg_match('/[^\x20-\x7e]/', $username))//utf8 check
    {
        return false;  
    }

    if(!is_string($username))
    {
        return false;
    }

    if(strlen($username) > 30 || strlen($username) < 3)
    {
        return false;
    }

    if(!preg_match('#^[a-zA-Z0-9-_]+$#', $username))//a-z, A-Z, 0-9, -_
    {
        return false;
    }

    return true;
}

function validatePassword($password)
{
    if(preg_match('/[^\x20-\x7e]/', $password))//utf8 check
    {
        return false;  
    }

    if(!is_string($password))
    {
        return false;
    }

    if(strlen($password) > 30 || strlen($password) < 3)
    {
        return false;
    }

    return true;
}




