<?php
session_start();

include_once("./fonctions_PHP.php");



$i=rand(0,sizeof($liste_capchien)-1);
$_SESSION['capchien']=$i;
$source=$liste_capchien[$i][0];
//echo getcwd();
$poids=filesize($source);

header('Content-Type: application/octet-stream');
header('Content-Length: '. $poids);
header('Content-disposition: attachment; filename=capchien'.rand(1,100000).'.jpg');
header('Pragma: no-cache');
header('Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0');
header('Expires: 0');
readfile($source);

exit();
?>
