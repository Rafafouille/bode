<?php
session_start();
include_once("./fonctions_PHP.php");

$bdd=bddConnect(); 
//Avant toute chose, on nettoye la BDD




$email="";
if(isset($_POST['chargeBDDemail']))		$email=$_POST['chargeBDDemail'];

//if($email=="") $email="allais.raphael@free.fr";

$mdp="";
if(isset($_POST['chargeBDDMdp']))		$mdp=$_POST['chargeBDDMdp'];

$req=$bdd->prepare("SELECT * FROM enregistrements WHERE email=:email AND mdp=:mdp");

$reponse=$req->execute(array(
			'email'=>$email,
			'mdp'=>$mdp

		));




function buildXMLGraphe($datas)
	{
		echo '	<diagram type="'.$datas['type'].'">'."\n";
		echo '		<affiche>'.$datas['affiche'].'</affiche>'."\n";
		echo '		<bornesX>'."\n";
		echo '			<min>'.$datas['borneXmin'].'</min>'."\n";
		echo '			<max>'.$datas['borneXmax'].'</max>'."\n";
		echo '		</bornesX>'."\n";
		echo '		<bornesY>'."\n";
		echo '			<min>'.$datas['borneYmin'].'</min>'."\n";
		echo '			<max>'.$datas['borneYmax'].'</max>'."\n";
		echo '		</bornesY>'."\n";
		echo '		<unite>'."\n";
		echo '			<x>'.$datas['uniteX'].'</x>'."\n";
		echo '			<y>'.$datas['uniteY'].'</y>'."\n";
		echo '		</unite>'."\n";
		echo '		<echelle>'."\n";
		echo '			<x>'.$datas['echelleX'].'</x>'."\n";
		echo '			<y>'.$datas['echelleY'].'</y>'."\n";
		echo '		</echelle>'."\n";
		echo '		<backgroundColor>'.$datas['backgroundColor'].'</backgroundColor>'."\n";
		echo '		<lineColor>'.$datas['lineColor'].'</lineColor>'."\n";
		echo '		<pasAxesSecondaires>'."\n";
		echo '			<x>'.$datas['pasAxeSecondaireX'].'</x>'."\n";
		echo '			<y>'.$datas['pasAxeSecondaireY'].'</y>'."\n";
		echo '		</pasAxesSecondaires>'."\n";
		echo '	</diagram>'."\n";
	}


function buildXMLFonction($datas)
	{
		echo '	<fonction type="'.$datas['type'].'">'."\n";	
		echo '		<parametres>'."\n";

		switch($datas['type'])
			{
				case "globale": break;
				case "1erOrdre" :
					echo '			<K>'.$datas['param1'].'</K>'."\n";
					echo '			<tau>'.$datas['param2'].'</tau>'."\n";
					break;
				case "2emeOrdre" :
					echo '			<K>'.$datas['param1'].'</K>'."\n";
					echo '			<w0>'.$datas['param2'].'</w0>'."\n";
					echo '			<z>'.$datas['param3'].'</z>'."\n";
					break;
				case "PID" :
					echo '			<Kp>'.$datas['param1'].'</Kp>'."\n";
					echo '			<Ti>'.$datas['param2'].'</Ti>'."\n";
					echo '			<Td>'.$datas['param3'].'</Td>'."\n";
					break;
				case "PI" :
					echo '			<Kp>'.$datas['param1'].'</Kp>'."\n";
					echo '			<Ti>'.$datas['param2'].'</Ti>'."\n";
					break;
				case "PD" :
					echo '			<Kp>'.$datas['param1'].'</Kp>'."\n";
					echo '			<Td>'.$datas['param3'].'</Td>'."\n";
					break;
				case "avanceDePhase" :
					echo '			<Kp>'.$datas['param1'].'</Kp>'."\n";
					echo '			<Ti>'.$datas['param2'].'</Ti>'."\n";
					echo '			<a>'.$datas['param3'].'</a>'."\n";
					break;
				case "retardDePhase" :
					echo '			<Kp>'.$datas['param1'].'</Kp>'."\n";
					echo '			<Ti>'.$datas['param2'].'</Ti>'."\n";
					echo '			<a>'.$datas['param3'].'</a>'."\n";
					break;
				default:
					echo '			<K>'.$datas['param1'].'</K>'."\n";
					break;
			}
				

		echo '			<inverse>'.$datas['inverse'].'</inverse>'."\n";
		echo '		</parametres>'."\n";
		echo '		<affichage>'."\n";
		echo '			<afficheAnalytique>'."\n";
		echo '				<affiche>'.$datas['afficheAnalytique'].'</affiche>'."\n";
		echo '				<typeTrait>'.$datas['typeTraitAnalytique'].'</typeTrait>'."\n";
		echo '				<epaisseur>'.$datas['epaisseurAnalytique'].'</epaisseur>'."\n";
		echo '			</afficheAnalytique>'."\n";
		echo '			<afficheAsymptotique>'."\n";
		echo '				<affiche>'.$datas['afficheAsymptotique'].'</affiche>'."\n";
		echo '				<typeTrait>'.$datas['typeTraitAsymptotique'].'</typeTrait>'."\n";
		echo '				<epaisseur>'.$datas['epaisseurAsymptotique'].'</epaisseur>'."\n";
		echo '			</afficheAsymptotique>'."\n";
		echo '			<combineAnalytique>'.$datas['combineAnalytique'].'</combineAnalytique>'."\n";
		echo '			<combineAsymptotique>'.$datas['combineAsymptotique'].'</combineAsymptotique>'."\n";
		echo '			<couleur>'.$datas['couleur'].'</couleur>'."\n";
		echo '			<bornes>'."\n";
		echo '				<mini>'.$datas['borneMin'].'</mini>'."\n";
		echo '				<maxi>'.$datas['borneMax'].'</maxi>'."\n";
		echo '			</bornes>'."\n";
		echo '			<nbPoints>'.$datas['nbPoints'].'</nbPoints>'."\n";
		echo '		</affichage>'."\n";
		echo '	</fonction>'."\n";
	}


if($donnees=$req->fetch())
	{
		echo '<?xml version = "1.0" encoding="UTF-8" standalone="yes" ?>'."\n";
		echo '<bodeOnline version="'.$donnees['version'].'">'."\n";
		echo '	<options>'."\n";
		echo '		<physicien>'.$donnees['physicien'].'</physicien>'."\n";
		echo '	</options>'."\n";

		$repGrapheGdb=$bdd->query("SELECT * FROM graphes WHERE idEnregistrement=".$donnees['id']." AND type='Bode-Gdb'");
		$repGraphePhase=$bdd->query("SELECT * FROM graphes WHERE idEnregistrement=".$donnees['id']." AND type='Bode-Phase'");

		if($grapheGdb=$repGrapheGdb->fetch())		buildXMLGraphe($grapheGdb);
		if($graphePhase=$repGraphePhase->fetch())	buildXMLGraphe($graphePhase);

		$repfonctions=$bdd->query("SELECT * FROM fonctions WHERE idEnregistrement=".$donnees['id']);


		while($fonction=$repfonctions->fetch())
			{
				buildXMLFonction($fonction);
			}

		echo "</bodeOnline>";
	}
else
	{
		echo "Erreur :<br/>L'enregistrement n'a pas été trouvé (mail et/ou mot de passe mauvais ?)";
	}
nettoieBDD($bdd);
?>
