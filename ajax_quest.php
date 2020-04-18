<?php

require_once "config.php";

$listManager = new ListManager();

$data = $_POST;
$validate = new Validator($data);

$result = $validate->validate();

if (!$result){
    echo false; die();
    
}

$listManager->updateList($data);

echo true; die();