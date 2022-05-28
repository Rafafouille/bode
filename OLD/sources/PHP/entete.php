<!DOCTYPE html>
<html>
  <head>

    <meta charset="utf-8" />
    <title>Éditeur de diagramme de Bode pour LaTex</title>
    <meta name="description" content="Un éditeur de diagramme de Bode en HTML5 pour exporter vers LaTex (et autres formats...)" />
    <meta name="author" content="Raphaël ALLAIS" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />

	<!-- Bibliotheques standards -->
		<!--<script src="raphael.js"></script>-->
		
		<!--Feuille de style pour les applets jquery-ui (interfaces utilisateur)-->
		<!-- <link rel="stylesheet" href="./sources/jquery-ui-1.11.2/jquery-ui.min.css"> -->
		<!-- <link rel="stylesheet" href="./sources/jquery-ui-1.11.2/themes/ui-darkness/jquery-ui.css"> -->
		<!-- <link rel="stylesheet" href="./sources/jquery-ui-1.11.2/themes/smoothness/jquery-ui.css"> -->
		<link rel="stylesheet" href="./sources/jquery-ui-1.11.2.custom/jquery-ui.min.css">

		<!--La bibliothèque jquery (utile à jquery-ui)-->
 		<script src="./sources/jquery-ui-1.11.2.custom/external/jquery/jquery.js"></script>
		<!--La bibliothèque jquery-ui en tant que tel-->
		<script src="./sources/jquery-ui-1.11.2.custom/jquery-ui.min.js"></script>

		<!--Feuille de style pour le treetable (interface en arborescence) -->
		<link href="./sources/treetable/css/jquery.treetable.theme.default.css" rel="stylesheet" type="text/css" />
		<link href="./sources/treetable/css/jquery.treetable.css" rel="stylesheet" type="text/css" />
		<!-- La bibliothèque treetable pour faire une table en arboresence -->
		<!--<script src="./sources/treetable/jquery.treetable.js"></script> -->


		<!-- Bibliothèque qui permet de gérer des dessins à la façon de flahs (movie clips...)-->
		<!--<script charset="utf-8" type="text/javascript" src="./sources/kinetic-v4.6.0.js"></script>-->
		<script charset="utf-8" type="text/javascript" src="./sources/JS/kinetic-v5.1.0.js"></script>
		<script charset="utf-8" type="text/javascript" src="./sources/JS/kineticJS2SVG.js"></script>


		<!--Fonctions perso....-->
		<script charset="utf-8" type="text/javascript" src="./sources/JS/fonctions.js"></script>

	<!-- Classes -->
		<script charset="utf-8" type="text/javascript" src="./sources/JS/CLASSES-fonctions/CLASS-Fonction.js"></script>
		<script charset="utf-8" type="text/javascript" src="./sources/JS/CLASSES-fonctions/CLASS-Globale.js"></script>
		<script charset="utf-8" type="text/javascript" src="./sources/JS/CLASSES-fonctions/CLASS-1erOrdre.js"></script>
		<script charset="utf-8" type="text/javascript" src="./sources/JS/CLASSES-fonctions/CLASS-2emeOrdre.js"></script>
		<script charset="utf-8" type="text/javascript" src="./sources/JS/CLASSES-fonctions/CLASS-Gain.js"></script>
		<script charset="utf-8" type="text/javascript" src="./sources/JS/CLASSES-fonctions/CLASS-Derivee.js"></script>
		<script charset="utf-8" type="text/javascript" src="./sources/JS/CLASSES-fonctions/CLASS-Integrale.js"></script>
		<script charset="utf-8" type="text/javascript" src="./sources/JS/CLASSES-fonctions/CLASS-PIDSerie.js"></script>
		<script charset="utf-8" type="text/javascript" src="./sources/JS/CLASSES-fonctions/CLASS-PI.js"></script>
		<script charset="utf-8" type="text/javascript" src="./sources/JS/CLASSES-fonctions/CLASS-PD.js"></script>
		<script charset="utf-8" type="text/javascript" src="./sources/JS/CLASSES-fonctions/CLASS-avancePhase.js"></script>
		<script charset="utf-8" type="text/javascript" src="./sources/JS/CLASSES-fonctions/CLASS-retardPhase.js"></script>
	<!-- Garphique -->
		<!--<script charset="utf-8" type="text/javascript" src="./sources/CLASSES-graphique/graphique.js"></script>-->
		<script charset="utf-8" type="text/javascript" src="./sources/JS/CLASSES-graphique/CLASS-Graphique.js"></script>
		<script charset="utf-8" type="text/javascript" src="./sources/JS/CLASSES-graphique/CLASS-GraphiqueGdb.js"></script>
		<script charset="utf-8" type="text/javascript" src="./sources/JS/CLASSES-graphique/CLASS-GraphiquePhase.js"></script>		
		<script charset="utf-8" type="text/javascript" src="./sources/JS/CLASSES-graphique/CLASS-Repere.js"></script>
	<link rel="stylesheet" href="./sources/styles/style1-main.css" />
	<link rel="stylesheet" href="./sources/styles/style1-menu.css" />
	<link rel="stylesheet" href="./sources/styles/style1-arborescence.css" />


	<!-- Statistiques -->
	<?php include_once("sources/PHP/matomo.php") ?>

	
  </head>
 
  <body> 
