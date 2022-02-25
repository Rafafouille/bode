<?php
session_start();
include_once("./fonctions_PHP.php");

$bdd=bddConnect(); 
//Avant toute chose, on nettoye la BDD
nettoieBDD($bdd);



$email="";
if(isset($_POST['sauvBDDemail']))		$email=$_POST['sauvBDDemail'];

//if($email=="") $email="allais.raphael@free.fr";

$contenu="";
if(isset($_POST['contenuSauvegardeXML']))	$contenu=$_POST['contenuSauvegardeXML'];

$capchien="";
if(isset($_POST['sauvBDDCapchien']))		$capchien=$_POST['sauvBDDCapchien'];


//==============================================================================================
//ENREGISTREMENT....
if(verifSauvegarde($email,$contenu,$capchien))
	{



		//Preparation des variables ****************
		$mdp=newMdP();
		$codeValidation= newCodeValidation();



		//XML ********************************
		///$dom=new DomDocument();
		///$dom->loadXML($contenu);
		$dom=simplexml_load_string($contenu) or die("Error: Cannot create object");


		//Enregistrement ***********************
		$req=$bdd->prepare("INSERT INTO enregistrements (email,mdp,dateModif,version,physicien,codeValidation,valide) VALUES(:email,:mdp,NOW(),:version,:physicien,:codeValidation,0)");
		$req->execute(array(
				'email'=>$email,
				'mdp'=>$mdp,
				'version'=>$dom["version"],
				'physicien'=>$dom->options->physicien=="true",
				'codeValidation'=>$codeValidation
			));


		//Recupere l'ID ***********************
		$id=$bdd->lastInsertId();




		//diagrammes *******************
		$diagrammes=$dom->diagram;
		foreach($diagrammes as $diagram)
			{
				$req=$bdd->prepare("INSERT INTO graphes (idEnregistrement,type,affiche,borneXmin,borneXmax,borneYmin,borneYmax,uniteX,uniteY,echelleX,echelleY,backgroundColor,lineColor,pasAxeSecondaireX,pasAxeSecondaireY) VALUES(:idEnregistrement,:type,:affiche,:borneXmin,:borneXmax,:borneYmin,:borneYmax,:uniteX,:uniteY,:echelleX,:echelleY,:backgroundColor,:lineColor,:pasAxeSecondaireX,:pasAxeSecondaireY)");//   ,:affiche,:borneXmin,:borneXmax,:borneYmin,:borneYmax,:uniteX,:uniteY,:echelleX,:echelleY

				$req->execute(array(
					'idEnregistrement'=>$id,
					'type'=>$diagram["type"],
					'affiche'=>$diagram->affiche=="true",
					'borneXmin'=>$diagram->bornesX->min,
					'borneXmax'=>$diagram->bornesX->max,
					'borneYmin'=>$diagram->bornesY->min,
					'borneYmax'=>$diagram->bornesY->max,
					'uniteX'=>$diagram->unite->x,
					'uniteY'=>$diagram->unite->y,
					'echelleX'=>$diagram->echelle->x,
					'echelleY'=>$diagram->echelle->y,
					'backgroundColor'=>$diagram->backgroundColor,
					'lineColor'=>$diagram->lineColor,
					'pasAxeSecondaireX'=>$diagram->pasAxesSecondaires->x,
					'pasAxeSecondaireY'=>$diagram->pasAxesSecondaires->y
				));
			}




		//Fonctions **************************
		$fonctions=$dom->fonction;
		foreach($fonctions as $fonction)
			{
				$req=$bdd->prepare("INSERT INTO fonctions (idEnregistrement,type,param1,param2,param3,inverse,afficheAnalytique,typeTraitAnalytique,epaisseurAnalytique,combineAnalytique,afficheAsymptotique,typeTraitAsymptotique,epaisseurAsymptotique,combineAsymptotique,couleur,borneMin,borneMax,nbPoints) VALUES(:idEnregistrement,:type,:param1,:param2,:param3,:inverse,:afficheAnalytique,:typeTraitAnalytique,:epaisseurAnalytique,:combineAnalytique,:afficheAsymptotique,:typeTraitAsymptotique,:epaisseurAsymptotique,:combineAsymptotique,:couleur,:borneMin,:borneMax,:nbPoints)");//   
				
				$parametres=$fonction->parametres->children();//Dom des parametres
				$paramsBDD=array(0,0,0);//Liste des 3 parametres par defaut
				for($i=0;$i<sizeof($parametres)-1;$i++)//Pour chaque parametre (sauf le dernier qui doit être "inverse")
					{
						$paramsBDD[$i]=$parametres[$i];
					}
				
				
				
				$req->execute(array(
					'idEnregistrement'=>$id,
					'type'=>$fonction["type"],
					'param1'=>$paramsBDD[0],
					'param2'=>$paramsBDD[1],
					'param3'=>$paramsBDD[2],
					'inverse'=>$paramsBDD[sizeof($paramsBDD)-1]=="true",
					'afficheAnalytique'=>$fonction->affichage->afficheAnalytique->affiche=="true",
					'typeTraitAnalytique'=>$fonction->affichage->afficheAnalytique->typeTrait,
					'epaisseurAnalytique'=>$fonction->affichage->afficheAnalytique->epaisseur,
					'combineAnalytique'=>$fonction->affichage->combineAnalytique=="true",
					'afficheAsymptotique'=>$fonction->affichage->afficheAsymptotique->affiche=="true",
					'typeTraitAsymptotique'=>$fonction->affichage->afficheAsymptotique->typeTrait,
					'epaisseurAsymptotique'=>$fonction->affichage->afficheAsymptotique->epaisseur,
					'combineAsymptotique'=>$fonction->affichage->combineAsymptotique=="true",
					'couleur'=>$fonction->affichage->couleur,
					'borneMin'=>$fonction->affichage->bornes->mini,
					'borneMax'=>$fonction->affichage->bornes->maxi,
					'nbPoints'=>$fonction->affichage->nbPoints
				));
			}
			
			
			
			
			
			
		//Mail **********************

		if (!preg_match("#^[a-z0-9._-]+@(hotmail|live|msn).[a-z]{2,4}$#", $email)) // On filtre les serveurs qui rencontrent des bogues.
				$rn = "\r\n";
		else
				$rn = "\n";

		$to=$email;
		$subject="[bode.allais.eu] Validation + mot de passe";

		$message="Ceci est un mail généré automatiquement.$rn";
		$message.="Merci de ne pas y répondre$rn";
		$message.="$rn";
		$message.="=====================================================$rn";
		$message.="http://bode.allais.eu$rn";
		$message.="=====================================================$rn";
		$message.="$rn";
		$message.="Bonjour !$rn";
		$message.="$rn";
		$message.="Vous recevez ce mail car vous venez d'enregistrer un diagramme de Bode avec cette adresse sur notre base de données.$rn";
		$message.="$rn";
		$message.="Pour valider votre enregistrement, cliquer (ou recopiez) sur le lien suivant$rn";
		$message.="(sinon, l'enregistrement sera automatiquement détruit au bout de 10 jours):$rn";
		$message.="$rn";
		$message.="http://bode.allais.eu/valide.php?id=$id&v=$codeValidation$rn";
		$message.="$rn";
		$message.="Pour récupérer ce diagramme ultérieurement, il vous suffira de rentrer votre adresse mail (celle avec laquelle vous lisez ce mail),$rn";
		$message.="ainsi que votre mot de passe, indiqué ci-après.$rn";
		$message.="$rn";
		$message.="S'il n'y a aucun problème (ce que je ne peux garantir... je ne suis qu'un amateur),";
		$message.="ce diagramme restera stocké pendant 1 an d'inactivité (+/- 1 jour.).$rn";
		$message.="Cette durée sera automatiquement reconduite à chaque fois que vous chargerez ce diagramme.$rn";
		$message.="Je me laisse le droit de modifier/supprimer toutes les données que vous aurez stocké (je dis ça pour ne pas avoir de problème...$rn";
		$message.="Mais dans les faits, je n'ai aucune raison de toucher à quoi que ce soit).$rn";
		$message.="Également, je ne compte pas toucher à votre adresse email (ni pour la donner à des services tiers, commerciaux, ni pour la rendre publique, etc.).$rn";
		$message.="Peut être un petit message automatique en cas de changement majeur sur le site, ou lorsque votre sauvegarde aura bientôt expiré).$rn";
		$message.="$rn";
		$message.="**********************************************$rn";
		$message.="Votre mot de passe : $mdp$rn";
		$message.="**********************************************$rn";
		$message.="$rn";
		$message.="(Note : votre mot de passe ne sera pas modifiable. Concervez-le).$rn";
		$message.="-- $rn";
		$message.="Le robot du site bode.allais.eu$rn";
		$message.="(id=$id)";

		$header = "Content-type: text/plain; charset=utf8\r\n";
		$header.= "Content-Transfer-Encoding: 8bit\r\n";
		$header.= "From: bode.allais.eu<nepasrepondre@allais.eu>\r\n";
		$header.= "Reply-To: nepasrepondre@allais.eu\r\n";
		$header.= "X-Mailer: PHP/" . phpversion();
		mail($to,$subject,$message,$header);
		
		
		
		
		
		//Renvoie de la réponse
		echo "OK";
	}





?>
