<?php
$user = "root";
$password = ""; // windows users leave this blank
$host = "localhost";
$db = "cooperinfo";

$conn = mysqli_connect($host, $user, $password, $db);
mysqli_set_charset($conn, 'utf8');

if (!$conn) {
    echo "connection didn't work...";
    exit;
}

//echo "connected!";



if (isset($_GET["carModel"])) { // check for a parameter ?carModel=R58
    $car = $_GET["carModel"];

    $myQuery = "SELECT * FROM mainmodel WHERE model = '$car'";
    
    $result = mysqli_query($conn, $myQuery);
    $rows = array();

    while($row = mysqli_fetch_assoc($result)) {
        //$rows[] = $row;
        $subQuery =  "SELECT * FROM video WHERE model = '$car' AND id =".$row['id'];
        $subResult = mysqli_query($conn, $subQuery);
        while($subRow = mysqli_fetch_assoc($subResult)) {
            $rows[] = array_merge($row, $subRow);
        }
    }


// send the entire result set as a json encoded array
echo json_encode($rows);
}else {
    //get all the car data
    $myQuery = "SELECT * FROM mainmodel";
    
    // make the query, get the result
    $result = mysqli_query($conn, $myQuery);
    
    $rows = array();
    
    while($row = mysqli_fetch_assoc($result)) {
        //$rows[] = $row;
        $subQuery =  "SELECT * FROM video WHERE id =".$row['id'];
        $subResult = mysqli_query($conn, $subQuery);
        while($subRow = mysqli_fetch_assoc($subResult)) {
            $rows[] = array_merge($row, $subRow);
        }
    }

    echo json_encode($rows);
}

?>