<?php

session_start();
include_once("./fonctions_PHP.php");

$bdd=bddConnect();


$email="";
if(isset($_POST['mail']))	{echo "mail recu !!"; $email=$_POST['mail'];}
$sujet="[bode.allais.eu] Liste de vos enregistrements";


if (!preg_match("#^[a-z0-9._-]+@(hotmail|live|msn).[a-z]{2,4}$#", $email)) // On filtre les serveurs qui rencontrent des bogues.
	$rn = "\r\n";
else
	$rn = "\n";

echo $email;

$requete=$bdd->query("SELECT * FROM enregistrements WHERE email='allais.raphael@free.fr'");
//$requete->execute(array('email'=>$email));


$message="Ce mail recapitule la liste des enregistrements et de leur contenu du site http://bode.allais.eu,$rn
enregistrés avec votre adresse mail : ".$email.$rn;


$existe=false;	//tag pour dire s'il y a au moins un enregistrement
if($rep=$requete->fetch())
	echo "-reponse !!!-";
else
	echo "-pas de reponse-";

$message.="--------------------------------------------------------\n";
while($enregistrement=$requete->fetch())
	{	echo "trouvé";
		$existe=true;
		$message.="* Enregistrement du ".$enregistrement['dateCreation']." (Dernière modification : ".$enregistrement['dateModif'].")$rn";
		$message.="    Description : ".$enregistrement['Description'].$rn;
		$message.="    Mot de passe : ".$enregistrement['mdp'].$rn;

		$fonctions=$bdd->query("SELECT * FROM fonctions WHERE idEnregistrement=".$enregistrement['id']." AND type<>'globale'");
		while($fonction=$fonctions->fetch())
			{
				$message.="      --> ".typeFromSQL($fonction['type'])." ";
				if($fonction['inverse']==1) $message.=' inversé ';
				$message.="(".	param1FromSQL($fonction['type'])."=".$fonction['param1']." ; ".
						param2FromSQL($fonction['type'])."=".$fonction['param2']." ; ".
						param3FromSQL($fonction['type'])."=".$fonction['param3'].";)$rn";
			}
		
		$message.="--------------------------------------------------------\n";
	}




if($existe)
	{
		$header = "Content-type: text/plain; charset=utf8\r\n";
		$header.= "Content-Transfer-Encoding: 8bit\r\n";
		$header.= "From: bode.allais.eu<nepasrepondre@allais.eu>\r\n";
		$header.= "Reply-To: nepasrepondre@allais.eu\r\n";
		$header.= "X-Mailer: PHP/" . phpversion();

		mail($email,$sujet,$message,$header);
		echo "mail envoyé";
	}
?>
