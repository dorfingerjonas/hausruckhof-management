<?php
$req = $_POST['req'];

if ($req === 'children') {
    $file = fopen("../data/children.csv", "r") or die("Unable to open file!");
    $content = [];
    $children = [];
    
    while (!feof($file)) {
        $content[] = fgets($file);
    }
    
    for ($i = 1; $i < sizeof($content); $i++) {
        $children[] = explode(";", $content[$i]);
    }
    
    echo json_encode($children);
} else if ($req === 'rooms') {
    $file = fopen("../data/rooms.csv", "r") or die("Unable to open file!");
    $content = [];
    $rooms = [];
    
    while (!feof($file)) {
        $content[] = fgets($file);
    }
    
    for ($i = 1; $i < sizeof($content); $i++) {
        $rooms[] = explode(";", $content[$i]);
    }
    
    echo json_encode($rooms);
} else if ($req === 'horses') {
    $file = fopen("../data/horses.csv", "r") or die("Unable to open file!");
    $content = [];
    $horses = [];
    
    while (!feof($file)) {
        $content[] = fgets($file);
    }
    
    for ($i = 1; $i < sizeof($content); $i++) {
        $horses[] = explode(";", $content[$i]);
    }
    
    echo json_encode($horses);
}