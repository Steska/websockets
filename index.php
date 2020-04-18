
<?php

require_once "config.php";


$listManager = new ListManager();

$list = $listManager->getList();

foreach($list as $item){

    echo "<p><a id=".$item['id'].">".$item['name']."</a></p>";
}
?>


<script src="main.js"></script>