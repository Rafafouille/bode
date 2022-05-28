<?php
session_start();
include_once("./sources/PHP/fonctions.php");
include_once("./sources/PHP/entete.php");

?>

	
	
	<!-- Liste menu ----->
	<?php include_once("./sources/PHP/menu.php")?>

	<div id="contenu">
		<!-- Liste fonctions ----->
		<?php include_once("./sources/PHP/arborescence.php")?>



		<!-- Affichage souris ----->
		<div id="affichage_curseur">
		<table class="affichage">
			<tr>
				<td class="affichage_titre_abcisse"></td>
				<td class="affichage_valeur_abcisse"></td>
			</tr>
			<tr>
				<td class="affichage_titre_ordonnee"></td>
				<td class="affichage_valeur_ordonnee"></td>
			</tr>
		</table>
		</div>
		
		<br/>

		<!-- Différents tabs ----->
		<?php include_once("./sources/PHP/tabs.php")?>
 	</div>


<?php
include_once("./sources/PHP/pied.php");
?>
