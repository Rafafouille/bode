<?php


//Verif email ==========================
function verifEmail($e)
{
	if(preg_match("#^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$#", $e))
		return true;

	echo "Erreur mail";
	return false;
}


//Verif XML ==========================
function verifXML($x)
{
	libxml_use_internal_errors(true);
	$sxe = simplexml_load_string($x);

	if(!$sxe)
		{
			echo "erreur XML";
			return false;
		}
	return true;
}

//Verif Capchien ==========================
function verifCapChien($c)
{
	global $liste_capchien;
	$i=$_SESSION['capchien'];
	$listeReponsesSTR=$liste_capchien[$i][1];
	$listeRep=explode("|",$listeReponsesSTR);
	foreach($listeRep as $rep)
		{
			if(strtolower($rep)==$c)
				return true;
		}
	echo "Erreur de Captcha.";
	return false;
}



//==============================================================================================
//Verifie si le fichier à sauvegarder est en bonne et due forme
function verifSauvegarde($_email,$_contenu,$_capchien)
{
	return verifEmail($_email) && verifXML($_contenu) && verifCapchien($_capchien);
}


//==============================================================================================
//Connecte à la base de données et renvoie le pointeur vers l'objet BDD
function bddConnect()
	{

		$sql_serveur="localhost";
		$sql_login="raf";
		$sql_db="bode";
		$sql_mdp="XrMsP33_q";
		try
			{
				$bdd=new PDO('mysql:host='.$sql_serveur.';dbname='.$sql_db.';charset=utf8',$sql_login,$sql_mdp, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
			}
		catch (Exception $e)
			{
				die('Erreur : '.$e->getMessage());
			}
		return $bdd;
	}


//==============================================================================================
//genere un mot de passe
function newMdp()
	{
		$consonnes="bcdfghjklmnpqrstvwxz";
		$voyellesS="aeiou";
		$voyellesP=array("ie","oa","ia","eo","ea","ai","au","ao","an","am","en","em","in","im");
		$mdp="";
		
		for($i=0;$i<3;$i++)
			{
				$mdp.=$consonnes[rand(0,strlen($consonnes)-1)];
				$a=rand(0,10);
				if($a<7)
					$mdp.=$voyellesS[rand(0,strlen($voyellesS)-1)];
				else
					$mdp.=$voyellesP[rand(0,count($voyellesP)-1)];
			}
		$mdp.=rand(0,99);
		return $mdp;
	}
	
	
	
function newCodeValidation()
	{
		$characts    = 'abcdefghijklmnopqrstuvwxyz';
        $characts   .= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';	
		$characts   .= '1234567890'; 
		$code_aleatoire    = ''; 

		for($i=0;$i < 10;$i++)    //10 est le nombre de caractères
			{ 
				$code_aleatoire .= substr($characts,rand()%(strlen($characts)),1); 
			}
		return $code_aleatoire;
	}

	
//Liste des images et des réponse du Capcha ============================================
$liste_capchien=array(
		array("./capchien/q1943.jpg","rad s|rad/s|radian par seconde|rad par seconde|rad s-1"),
		array("./capchien/z8463.jpg","peau"),
		array("./capchien/mm44dd.jpg","basses-fréquences|basse-fréquences|basses-fréquence|basse-fréquence|basses-frequences|basse-frequences|basses-frequence|basse-frequence|basses|basses fréquences|basse fréquences|basses fréquence|basse fréquence|basses frequences|basse frequences|basses frequence|basse frequence|basses")
	);
	



//Supprime un enregistrement
function supprimeEnregistrement($bdd,$id)
	{
		$bdd->query("DELETE FROM fonctions WHERE idEnregistrement=".$id);
		$bdd->query("DELETE FROM graphes WHERE idEnregistrement=".$id);
		$bdd->query("DELETE FROM enregistrements WHERE id=".$id);
	}

//Nettoye la base de donnée (avec les enregistrements périmées) ==========================
function nettoieBDD($bdd)
	{
		//Les non-validés **********
		$reponse=$bdd->query("SELECT id FROM enregistrements WHERE valide=0 AND DATEDIFF(NOW(),dateModif)>10");
		while($donnees=$reponse->fetch())
			{
				supprimeEnregistrement($bdd,$donnees['id']);
			}
		
		//Les plus de 1 an **********
		$reponse=$bdd->query("SELECT id FROM enregistrements WHERE DATEDIFF(NOW(),dateModif)>366");
		while($donnees=$reponse->fetch())
			{
				supprimeEnregistrement($bdd,$donnees['id']);
			}

	}

//Fonction qui donne le type de fonction à partir de son mot clé SQL
function typeFromSQL($type)
	{
		switch($type){
			case "1erOrdre" :	return "1er Ordre";
			case "2emeOrdre" :	return "2ème Ordre";
			case "gain"	:	return "gain";
			case "derivee"	:	return "dérivée";
			case "integrale" : 	return "intégrale";
			case "PID"	:	return "correcteur PID série";
			case "PI"	:	return "correcteur PI";
			case "PD"	:	return "correcteur PD";
			case "avanceDePhase" :	return "correcteur à avance de phase";
			case "retardeDePhase" : return "correcteur à retard de phase";
			default : 		return "inconnu";
		}
			
		
	}

function param1FromSQL($type)
	{
		switch($type){
			case "1erOrdre" :	return "K";
			case "2emeOrdre" :	return "K";
			case "gain"	:	return "K";
			case "derivee"	:	return "K";
			case "integrale" : 	return "K";
			case "PID"	:	return "Kp";
			case "PI"	:	return "Kp";
			case "PD"	:	return "Kp";
			case "avanceDePhase" :	return "Kp";
			case "retardDePhase" : return "Kp";
			default : 		return "inconnu";
		}
	}
function param2FromSQL($type)
	{
		switch($type){
			case "1erOrdre" :	return "T";
			case "2emeOrdre" :	return "w0";
			case "gain"	:	return "_";
			case "derivee"	:	return "_";
			case "integrale" : 	return "_";
			case "PID"	:	return "Ti";
			case "PI"	:	return "Ti";
			case "PD"	:	return "Td";
			case "avanceDePhase" :	return "Ti";
			case "retardDePhase" : return "Ti";
			default : 		return "inconnu";
		}
	}
function param3FromSQL($type)
	{
		switch($type){
			case "1erOrdre" :	return "_";
			case "2emeOrdre" :	return "z";
			case "gain"	:	return "_";
			case "derivee"	:	return "_";
			case "integrale" : 	return "_";
			case "PID"	:	return "Td";
			case "PI"	:	return "_";
			case "PD"	:	return "_";
			case "avanceDePhase" :	return "a";
			case "retardDePhase" : return "a";
			default : 		return "inconnu";
		}
	}


//Fonction qui enregistre l'activité du site
function spy()
{
	$bdd=bddConnect();
	//Est-ce un robot ?
	$crawler = 0;
	if ( preg_match('/(bot|spider|yahoo)/i', $_SERVER[ "HTTP_USER_AGENT" ] )) $crawler = 1 ;

	//if(!$crawler)

	$SERVER_HTTP_REFERER="";
	if(isset($_SERVER['HTTP_REFERER'])) $SERVER_HTTP_REFERER=$_SERVER['HTTP_REFERER'];//On met dans une variable car elle n'existe pas toujours

	$REMOTE_USER="";
	if(isset($_SERVER['REMOTE_USER'])) $REMOTE_USER=$_SERVER['REMOTE_USER'];//On met dans une variable car elle n'existe pas toujours

	$reponse=$bdd->prepare("INSERT INTO spy(url,date,SRV_REMOTE_ADDR,SRV_REMOTE_USER,SRV_REQUEST_METHOD,SRV_HTTP_REFERER,SRV_HTTP_USER_AGENT,SRV_REMOTE_PORT)
		 VALUES(?,NOW(),?,?,?,?,?,?)");
	$reponse->execute(array(	$_SERVER['REQUEST_URI'],
					//$_SESSION['login'],
					//$_SESSION['statut'],
					//$_SESSION['nom'],
					//$_SESSION['id'],
					$_SERVER['REMOTE_ADDR'],
					$REMOTE_USER,
					$_SERVER['REQUEST_METHOD'],
					$SERVER_HTTP_REFERER,
					$_SERVER['HTTP_USER_AGENT'],
					$_SERVER['REMOTE_PORT']
				)) or die(print_r($reponse->errorInfo()));
//	$reponse=mysql_query("INSERT INTO LPM_spy(url,date,LOG_login,LOG_statut,LOG_nom,LOG_id,SRV_REMOTE_ADDR,SRV_REMOTE_USER,SRV_REQUEST_METHOD,SRV_HTTP_REFERER,SRV_HTTP_USER_AGENT,SRV_REMOTE_PORT,SESSIONID,mode,action) VALUES('".$_SERVER['REQUEST_URI']."',NOW(),'".$_SESSION['login']."','".$_SESSION['statut']."','".$_SESSION['nom']."','".$_SESSION['id']."','".$_SERVER['REMOTE_ADDR']."','".$_SERVER['REMOTE_USER']."','".$_SERVER['REQUEST_METHOD']."','".$_SERVER['HTTP_REFERER']."','".$_SERVER['HTTP_USER_AGENT']."','".$_SERVER['REMOTE_PORT']."','".session_id()."','".$mode."','".$action."')") or die(mysql_error());
}
?>
