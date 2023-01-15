<?php

$version_client = isset($_COOKIE['VERSION_Bode'])?$_COOKIE['VERSION_Bode']:"";
$AUTO_OPEN_BOITE_ACCUEIL = false;

if($version_client != $VERSION)
{
	$AUTO_OPEN_BOITE_ACCUEIL = true;
	
	// Mise à jour de la version dans le cookie
	setcookie(
	    'VERSION_Bode',	// Nom du cookie
	    $VERSION,	// On stocke la variable $VERSION
	    [
		'expires' => time() + 365*24*3600,	//Expire dans une an
		//'secure' => true,			//pour la sécurité
		'httponly' => true,			// Pour éviter les failles XSS de Javascript
	    ]
	);
}


?>
