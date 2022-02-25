<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Éditeur de diagramme de Bode pour LaTex</title>
		<meta name="description" content="Un éditeur de diagramme de Bode en HTML5 pour exporter vers LaTex (et autres formats...)" />
		<meta name="author" content="Raphaël ALLAIS" />
		<link rel="stylesheet" href="sources/style/style.css" />
		<!-- Jquery(-UI) -->
			<script src="./sources/JS/libraries/jquery/jquery.js"></script>
			<link rel="stylesheet" href="./sources/JS/libraries/jquery-ui/jquery-ui.css">
			<script src="./sources/JS/libraries/jquery-ui/jquery-ui.min.js"></script>
		<!-- CreateJS -->
			<script src="./sources/JS/libraries/createjs/createjs.min.js"></script>
			<link rel="stylesheet" href="./sources/JS/libraries/jquery-ui/jquery-ui.css">
			<script src="./sources/JS/libraries/jquery-ui/jquery-ui.min.js"></script>
		<!-- Menu -->
			<link rel="stylesheet" href="sources/style/style_menu.css" />
		
		<!-- Fonctions -->
			<link rel="stylesheet" href="sources/style/style_liste_fonctions.css" />
		
		<!-- Fichiers Javascript -->			
			<script src="./sources/JS/main.js"></script>
			<script src="./sources/JS/fonctions.js"></script>
			<script src="./sources/JS/evenements.js"></script>
			
			
			<script>
				// Après chargement : lancement de Javascript (fonction main)
				$(document).ready(main);
			</script>
	
	</head>
	<body>
		<header>
			<h1>
				Diagrammes de Bode
			</h1>
		</header>
