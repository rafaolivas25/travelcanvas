<?php
$results = [];
header('Content-Type: application/json');

$servername = "db4free.net";
$username = "rafacarol";
$password = "RafaCarol123456789";
$dbname = "travelcanvas";

$db = new mysqli($servername, $username, $password, $dbname);

$sql = "SELECT * from div_countries";
$result = $db->query($sql) or die($db->error);

while ($obj = $result->fetch_object()) {
    $obj->xml = simplexml_load_string($obj->geometry);
    $obj->geometry = '';

    foreach ($obj->xml->Polygon as $value) {
        $obj->multi = 'multigeo';
    }

    $results[] = $obj;
}

echo json_encode($results, JSON_PARTIAL_OUTPUT_ON_ERROR);
?>