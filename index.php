<?php
session_start();
include_once("./sources/fonctions_PHP.php");
spy();//Fonction qui enregistre l'activité dans la BDD




include_once("./sources/PHP/entete.php");

?>


 	


	<h1>Éditeur de diagramme de Bode pour LaTex</h1>
	<h1 style="font-size:small;margin-top:-10px;">(Encore en développement...)</h1>
	<!-- ----------------------------------------------- -->

	 <!-- =====================================================
		MENU
	======================================================== -->

	<?php
	include_once("./sources/PHP/menu.php");
	?>



	<!-- =====================================================
		ARBORESCENCE
	======================================================== -->

		<div id="blocArborescence">
			<div id="titreArborescence">
				Liste des fonctions
				<br/>
				<span style="font-size:small;">(Cliquer sur les fonctions)</span>
			</div>
			<div id="arborescence2">
			</div>
			<!-- 
			<table id="arborescence">
				
			</table>
			-->
		</div>

		<script>
			//OLD
			//arbre=$("#arborescence").treetable({expandable: true, clickableNodeNames:true});			
		</script>




	<!-- =====================================================
		GRAPHIQUE
	======================================================== -->

	<?php
	include_once("./sources/PHP/graphiques.php");
	?>

	<!-- =====================================================
		BOITES DE DIALOGUE
	======================================================== -->

	<?php
	include_once("./sources/PHP/boitesDialogue.php");
	?>

<?php
include_once("./sources/PHP/pied.php");
?>
