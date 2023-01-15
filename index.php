<?php
session_start();
$VERSION = "2023-01-13";
include_once("./sources/PHP/gestion_version.php"); // Affiche ou pas la boite d'accueil
include_once("./sources/PHP/fonctions.php");
include_once("./sources/PHP/entete.php");
include_once("./sources/PHP/matomo.php");


?>


	<script>
		VERSION = "<?php echo $VERSION; ?>"; // Version du programme
		AUTO_OPEN_BOITE_ACCUEIL = Boolean(<?php echo $AUTO_OPEN_BOITE_ACCUEIL; ?>);	// Est-ce qu'on ouvre la fenetre d'accueil ou pas ?
	</script>
	
	
	<!-- Liste menu ----->
	<?php include_once("./sources/PHP/menu.php")?>

	<div id="contenu">
		<!-- Liste fonctions ----->
		<?php include_once("./sources/PHP/arborescence.php")?>


		
		<br/>

		<!-- Différents tabs ----->
		<?php include_once("./sources/PHP/tabs.php")?>
		
		
		

		<!-- Affichage souris ----->
		<div id="affichage_curseur">
		<table class="affichage">
			<tr>
				<td class="affichage_titre_abcisse">test</td>
				<td class="affichage_valeur_abcisse"></td>
			</tr>
			<tr>
				<td class="affichage_titre_ordonnee"></td>
				<td class="affichage_valeur_ordonnee"></td>
			</tr>
		</table>
		</div>
 	</div>



<?php


include_once("./sources/PHP/pied.php");





// OUVERTURE d'UN SYSTEME ENREGISTRE
// ============================================================

if(isset($_GET['sys']))
{
	echo "
	<script>";

	$sys_a_ouvrir = $_GET['sys'];
	$fichier = "./SYSTEMES/".$sys_a_ouvrir."/code.json";
	//on vérifie que le dossier existe
	if(file_exists($fichier))
	{
		$code = fopen($fichier, 'r');
            	echo 'CODE_JSON_INITIAL='.fread($code, filesize($fichier));
	}
	else // Si le fichier n'est pas dans la BDD (si c'est pas un dossier)
	{
		echo '$("#dialog_ouvrir_systeme_absent").dialog("open")';
	}
	echo "
	</script>";
}
?>
