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
			<link rel="stylesheet" href="./sources/JS/libraries/jquery-ui/jquery-ui.min.css">
			<script src="./sources/JS/libraries/jquery-ui/jquery-ui.min.js"></script>
		<!-- CreateJS -->
			<script src="./sources/JS/libraries/createjs/createjs.min.js"></script>
		<!-- Menu -->
			<link rel="stylesheet" href="sources/style/style_menu.css" />
		
		<!-- Arboresence des fonctions -->
			<link rel="stylesheet" href="sources/style/style_arborescence.css" />
			
		<!-- Tabs -->
			<link rel="stylesheet" href="sources/style/style_tabs.css" />
			
		<!-- Boites de dialogue -->
			<link rel="stylesheet" href="sources/style/style_boites.css" />
		
		<!-- Fichiers Javascript -->			
			<script src="./sources/JS/main.js"></script>
			<script src="./sources/JS/fonctions.js"></script>
			<script src="./sources/JS/fonctions_BODE.js"></script>
			<script src="./sources/JS/fonctions_TEMPOREL.js"></script>
			<script src="./sources/JS/evenements.js"></script>
		<!-- Classes de fonction -->	
			<script src="./sources/JS/classes/CLASS_Fonction.js"></script>
			<script src="./sources/JS/classes/CLASS_Fonction_Globale.js"></script>
			<script src="./sources/JS/classes/CLASS_Fonction_Gain.js"></script>
			<script src="./sources/JS/classes/CLASS_Fonction_1er_Ordre.js"></script>
			<script src="./sources/JS/classes/CLASS_Fonction_2eme_Ordre.js"></script>
			<script src="./sources/JS/classes/CLASS_Fonction_Integrateur.js"></script>
			<script src="./sources/JS/classes/CLASS_Fonction_Derivateur.js"></script>
			<script src="./sources/JS/classes/CLASS_Fonction_PI.js"></script>
			<script src="./sources/JS/classes/CLASS_Fonction_PD.js"></script>
			<script src="./sources/JS/classes/CLASS_Fonction_Avance_De_Phase.js"></script>
			<script src="./sources/JS/classes/CLASS_Fonction_Retard_De_Phase.js"></script>
			<script src="./sources/JS/classes/CLASS_Fleche.js"></script>
			
			
			<script>
				// Après chargement : lancement de Javascript (fonction main)
				$(document).ready(main);
			</script>
	
	</head>
	<body>
		<header>
			<a style="display:block;background-color:white;padding:5px;width:200px;color:black;border-radius:5px;text-decoration:none;font-weight:bold;" href="OLD">
				<img src="sources/images/click.svg" height="20px" alt=""/> Ancienne version
			</a>
			<h1>
				Diagrammes de Bode
			</h1>
		</header>
