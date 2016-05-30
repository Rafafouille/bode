<?php
include_once("./sources/fonctions_PHP.php");


$idc=0;
if(isset($_GET["id"])) $idc=$_GET["id"];
	
$v="rien";
if(isset($_GET["v"])) $v=$_GET["v"];

	

	
$bdd=bddConnect();

$req=$bdd->prepare("SELECT codeValidation as code FROM enregistrements WHERE id=:id");
$req->execute(array(
				'id'=>$idc
			));

if($donnees=$req->fetch())
	{
		echo $donnees["code"].'-';
		echo $v;
		if($donnees["code"]==$v)
			{
				$req=$bdd->prepare("UPDATE enregistrements SET valide=1 WHERE id=:id");
				$req->execute(array(
						'id'=>$idc
					));
				echo 'Enregistrement validé. Retourner à <a href="http://bode.allais.eu">http://bode.allais.eu</a>.';
			}
		else
			{
				echo "Erreur de validation..";
			}
	}
else//Si pas d'entrée dans la base de donnée.
	{
		echo "Erreur de validation...";
	}
?>
