<?php
session_start();
include_once("./sources/PHP/fonctions.php");
include_once("./sources/PHP/entete.php");

?>

	
	
	<!-- Liste menu ----->
	<?php include_once("./sources/PHP/menu.php")?>

	<div id="contenu">
		<!-- Liste fonctions ----->
		<?php include_once("./sources/PHP/liste_fonctions.php")?>

		<!-- Différents tabs ----->
		<?php include_once("./sources/PHP/tabs.php")?>
 	</div>


<?php
include_once("./sources/PHP/pied.php");
?>
