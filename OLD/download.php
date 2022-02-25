<?php

$formatExport="";
$contenuExport="";
$verif="";
$svg="";

if(isset($_POST['formatExport']))	$formatExport=$_POST['formatExport'];
if(isset($_POST['contenuExport']))	$contenuExport=$_POST['contenuExport'];
if(isset($_POST['verif']))	$verif=$_POST['verif'];
if(isset($_POST['verif']))	$svg=$_POST['verif'];

if($formatExport=="LaTex")	//Si export LaTex
	{
		header('Content-Type: text/plain');
		header('Content-Disposition: attachment; filename="bodeDiagram.tex"');

		echo "%*************************\n";
		echo "% Fichier genere sur le site http://bode.allais.eu\n";
		echo "%*************************\n";
		echo $contenuExport;
	}
	
if($formatExport=="SVG")	//Si export SVG
	{
		header('Content-Type: text/plain');
		header('Content-Disposition: attachment; filename="bodeDiagram.svg"');

		echo $contenuExport;
	}

if($formatExport=="XML")	//Si export XML
	{
		header('Content-Type: text/plain');
		header('Content-Disposition: attachment; filename="bodeDiagram.xml"');

		echo $contenuExport;
	}
?>
