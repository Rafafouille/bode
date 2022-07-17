<?php

$action = isset($_POST['action'])?$_POST['action']:"";


if($action=="getSystemes")
{

	$liste=array();
	$dossiers_systemes = scandir("SYSTEMES");
	for($i=0;$i<sizeof($dossiers_systemes);$i++)
	{
		if($dossiers_systemes[$i]!="." && $dossiers_systemes[$i]!="..")
		{
		
			$nom = $dossiers_systemes[$i];
			$image = "./SYSTEMES/".$dossiers_systemes[$i]."/icone.png";
			if(!file_exists($image))
				$image = "./sources/images/icone_engrenage.svg";
			$lien = $dossiers_systemes[$i];
		
		
			$infos = array(
					"nom"=>$nom,
					"image"=>$image,
					"lien"=>$lien
					);
			array_push($liste,$infos);
		}
	}
	$reponse=array(
		'systemes'=>$liste
		);
	
	$reponseJSON = json_encode($reponse);
	echo $reponseJSON;
}

?>
