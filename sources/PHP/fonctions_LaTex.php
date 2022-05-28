<?php

// Renvoie la fonction d'amplitude asymptotique au format LaTex, de la forme "+\POAmpAsymp{K}{tau}" (avec le signe devant)
function getLaTex_AmpAsympt_fonction($fonc)
{
	$signe = $fonc['inverse']?"-":"+";
	
	if($fonc["type"]=="1er ordre")
		return  $signe.'\POAmpAsymp{'.strval($fonc['parametres']['K']).'}{'.strval($fonc['parametres']['tau']).'}';
	if($fonc["type"]=="2ème ordre")
		return  $signe.'\SOAmpAsymp{'.strval($fonc['parametres']['K']).'}{'.strval($fonc['parametres']['xi']).'}{'.strval($fonc['parametres']['w0']).'}';
	if($fonc["type"]=="avance de phase")
		return  $signe.'\APAmpAsymp{'.strval($fonc['parametres']['Kd']).'}{'.strval($fonc['parametres']['Td']).'}{'.strval($fonc['parametres']['a']).'}';
	if($fonc["type"]=="dérivateur")
		return  $signe.'(-\IntAmp{'.strval($fonc['parametres']['Kd']).'})';
	if($fonc["type"]=="gain")
		return  $signe.'\KAmp{'.strval($fonc['parametres']['K']).'}';
	if($fonc["type"]=="intégrateur")
		return  $signe.'\IntAmp{'.strval($fonc['parametres']['Ki']).'}';
	if($fonc["type"]=="PD")
		return  $signe.'\PDAmpAsymp{'.strval($fonc['parametres']['Kd']).'}{'.strval($fonc['parametres']['Td']).'}';
	if($fonc["type"]=="PI")
		return  $signe.'\PIAmpAsymp{'.strval($fonc['parametres']['Ki']).'}{'.strval($fonc['parametres']['Ti']).'}';
	if($fonc["type"]=="retard de phase")
		return  $signe.'\RPAmpAsymp{'.strval($fonc['parametres']['Ki']).'}{'.strval($fonc['parametres']['Ti']).'}{'.strval($fonc['parametres']['a']).'}';
		
	return "";
}


// Renvoie la fonction d'amplitude analytique au format LaTex, de la forme "+\POAmp{K}{tau}" (avec le signe devant)
function getLaTex_AmpAnalytique_fonction($fonc)
{
	$signe = $fonc['inverse']?"-":"+";
	
	if($fonc["type"]=="1er ordre")
		return  $signe.'\POAmp{'.strval($fonc['parametres']['K']).'}{'.strval($fonc['parametres']['tau']).'}';
	if($fonc["type"]=="2ème ordre")
		return  $signe.'\SOAmp{'.strval($fonc['parametres']['K']).'}{'.strval($fonc['parametres']['xi']).'}{'.strval($fonc['parametres']['w0']).'}';
	if($fonc["type"]=="avance de phase")
		return  $signe.'\APAmp{'.strval($fonc['parametres']['Kd']).'}{'.strval($fonc['parametres']['Td']).'}{'.strval($fonc['parametres']['a']).'}';
	if($fonc["type"]=="dérivateur")
		return  $signe.'(-\IntAmp{'.strval($fonc['parametres']['Kd']).'})';
	if($fonc["type"]=="gain")
		return  $signe.'\KAmp{'.strval($fonc['parametres']['K']).'}';
	if($fonc["type"]=="intégrateur")
		return  $signe.'\IntAmp{'.strval($fonc['parametres']['Ki']).'}';
	if($fonc["type"]=="PD")
		return  $signe.'\PDAmp{'.strval($fonc['parametres']['Kd']).'}{'.strval($fonc['parametres']['Td']).'}';
	if($fonc["type"]=="PI")
		return  $signe.'\PIAmp{'.strval($fonc['parametres']['Ki']).'}{'.strval($fonc['parametres']['Ti']).'}';
	if($fonc["type"]=="retard de phase")
		return  $signe.'\RPAmp{'.strval($fonc['parametres']['Ki']).'}{'.strval($fonc['parametres']['Ti']).'}{'.strval($fonc['parametres']['a']).'}';
	return "";
}


// Renvoie la fonction de phase asymptotique au format LaTex, de la forme "+\POArgAsymp{K}{tau}" (avec le signe devant)
function getLaTex_PhaseAsymptotique_fonction($fonc)
{
	$signe = $fonc['inverse']?"-":"+";
	
	if($fonc["type"]=="1er ordre")
		return  $signe.'\POArgAsymp{'.strval($fonc['parametres']['K']).'}{'.strval($fonc['parametres']['tau']).'}';
	if($fonc["type"]=="2ème ordre")
		return  $signe.'\SOArgAsymp{'.strval($fonc['parametres']['K']).'}{'.strval($fonc['parametres']['xi']).'}{'.strval($fonc['parametres']['w0']).'}';
	if($fonc["type"]=="avance de phase")
		return  $signe.'\APArgAsymp{'.strval($fonc['parametres']['Kd']).'}{'.strval($fonc['parametres']['Td']).'}{'.strval($fonc['parametres']['a']).'}';
	if($fonc["type"]=="dérivateur")
		return  $signe.'(-\IntArg{'.strval($fonc['parametres']['Kd']).'})';
	if($fonc["type"]=="gain")
		return  '0';
	if($fonc["type"]=="intégrateur")
		return  $signe.'\IntArg{'.strval($fonc['parametres']['Ki']).'}';
	if($fonc["type"]=="PD")
		return  $signe.'\PDArgAsymp{'.strval($fonc['parametres']['Kd']).'}{'.strval($fonc['parametres']['Td']).'}';
	if($fonc["type"]=="PI")
		return  $signe.'\PIArgAsymp{'.strval($fonc['parametres']['Ki']).'}{'.strval($fonc['parametres']['Ti']).'}';
	if($fonc["type"]=="retard de phase")
		return  $signe.'\RPArgAsymp{'.strval($fonc['parametres']['Ki']).'}{'.strval($fonc['parametres']['Ti']).'}{'.strval($fonc['parametres']['a']).'}';
	return "";
}



// Renvoie la fonction de phase asymptotique au format LaTex, de la forme "+\POArg{K}{tau}" (avec le signe devant)
function getLaTex_PhaseAnalytique_fonction($fonc)
{
	$signe = $fonc['inverse']?"-":"+";

	if($fonc["type"]=="1er ordre")
		return  $signe.'\POArg{'.strval($fonc['parametres']['K']).'}{'.strval($fonc['parametres']['tau']).'}';
	if($fonc["type"]=="2ème ordre")
		return  $signe.'\SOArg{'.strval($fonc['parametres']['K']).'}{'.strval($fonc['parametres']['xi']).'}{'.strval($fonc['parametres']['w0']).'}';
	if($fonc["type"]=="avance de phase")
		return  $signe.'\APArg{'.strval($fonc['parametres']['Kd']).'}{'.strval($fonc['parametres']['Td']).'}{'.strval($fonc['parametres']['a']).'}';
	if($fonc["type"]=="dérivateur")
		return  $signe.'(-\IntArg{'.strval($fonc['parametres']['Kd']).'})';
	if($fonc["type"]=="gain")
		return  '0';
	if($fonc["type"]=="intégrateur")
		return  $signe.'\IntArg{'.strval($fonc['parametres']['Ki']).'}';
	if($fonc["type"]=="PD")
		return  $signe.'\PDArg{'.strval($fonc['parametres']['Kd']).'}{'.strval($fonc['parametres']['Td']).'}';
	if($fonc["type"]=="PI")
		return  $signe.'\PIArg{'.strval($fonc['parametres']['Ki']).'}{'.strval($fonc['parametres']['Ti']).'}';
	if($fonc["type"]=="retard de phase")
		return  $signe.'\RPArg{'.strval($fonc['parametres']['Ki']).'}{'.strval($fonc['parametres']['Ti']).'}{'.strval($fonc['parametres']['a']).'}';
	return "";
}




// ==================================================================
function getLaTexAmpAsympt_globale($fonctions,$wmin,$wmax)
{
	$signe = $fonctions[0]["inverse"]?"-":"";
	$maCouleur = getLaTex_couleurStandard($fonctions[0]['couleur'])==""?"couleurFonctionBode0":getLaTex_couleurStandard($fonctions[0]['couleur']) ;
	$output = '
		\BodeAmp['.$maCouleur.',samples=100,line width=2]{'.strval($wmin).':'.strval($wmax).'}{'.$signe.'(0';
		
	foreach($fonctions as $fonc)
	{
		if($fonc["type"]!="globale" && $fonc["combineGlobal"])
		{
			//$signe = $fonc["inverse"]?"-":"+";
			$output .= getLaTex_AmpAsympt_fonction($fonc);
		}
	}
	$output .= ")}";
	return $output;
}

// ==================================================================
function getLaTexAmpAnalytique_globale($fonctions,$wmin,$wmax)
{
	$signe = $fonctions[0]["inverse"]?"-":"";
	$maCouleur = getLaTex_couleurStandard($fonctions[0]['couleur'])==""?"couleurFonctionBode0":getLaTex_couleurStandard($fonctions[0]['couleur']) ;
	$output = '
		\BodeAmp['.$maCouleur.',samples=100,line width=2]{'.strval($wmin).':'.strval($wmax).'}{'.$signe.'(0';
		
	foreach($fonctions as $fonc)
	{
		if($fonc["type"]!="globale" && $fonc["combineGlobal"])
		{
			//$signe = $fonc["inverse"]?"-":"+";
			$output .= getLaTex_AmpAnalytique_fonction($fonc);
		}
	}
	$output .= ")}";
	return $output;
}

// ==================================================================
function getLaTexPhaseAsympt_globale($fonctions,$wmin,$wmax)
{
	$signe = $fonctions[0]["inverse"]?"-":"";
	$maCouleur = getLaTex_couleurStandard($fonctions[0]['couleur'])==""?"couleurFonctionBode0":getLaTex_couleurStandard($fonctions[0]['couleur']) ;
	$output = '
		\BodeArg['.$maCouleur.',samples=100,line width=2]{'.strval($wmin).':'.strval($wmax).'}{'.$signe.'(0';
		
	foreach($fonctions as $fonc)
	{
		if($fonc["type"]!="globale" && $fonc["combineGlobal"])
		{
			//$signe = $fonc["inverse"]?"-":"+";
			$output .= getLaTex_PhaseAsymptotique_fonction($fonc);
		}
	}
	$output .= ")}";
	return $output;
}

// ==================================================================
function getLaTexPhaseAnalytique_globale($fonctions,$wmin,$wmax)
{
	$signe = $fonctions[0]["inverse"]?"-":"";
	$maCouleur = getLaTex_couleurStandard($fonctions[0]['couleur'])==""?"couleurFonctionBode0":getLaTex_couleurStandard($fonctions[0]['couleur']) ;
	$output = '
		\BodeArg['.$maCouleur.',samples=100,line width=2]{'.strval($wmin).':'.strval($wmax).'}{'.$signe.'(0';
		
	foreach($fonctions as $fonc)
	{
		if($fonc["type"]!="globale" && $fonc["combineGlobal"])
		{
			$signe = $fonc["inverse"]?"-":"+";
			$output .= getLaTex_PhaseAnalytique_fonction($fonc);
		}
	}
	$output .= ")}";
	return $output;
}



// ===========================================================
// Convertit les couleurs HTML en couleur standard. Si pas standard, renvoie ""
function getLaTex_couleurStandard($coul)
{
	$coul = strtolower($coul);
	if($coul == "#000000")
		return "black";
	if($coul == "#ff0000")
		return "red";
	if($coul == "#0000ff")
		return "blue";
	if($coul == "#bf8040")
		return "brown";
	if($coul == "#00b9f2")
		return "cyan";
	if($coul == "#404040")
		return "darkgray";
	if($coul == "#808080")
		return "gray";
	if($coul == "#00ff00")
		return "green";
	if($coul == "#bfbfbf")
		return "lightgray";
	if($coul == "#bfff00")
		return "lime";
	if($coul == "#fb3199")
		return "magenta";
	if($coul == "#9f8c18")
		return "olive";
	if($coul == "#ff8000")
		return "orange";
	if($coul == "#ffbfbf")
		return "pink";
	if($coul == "#bf0040")
		return "purple";
	if($coul == "#008080")
		return "teal";
	if($coul == "#ffffff")
		return "white";
	if($coul == "#800080")
		return "violet";
	if($coul == "#ffeb3d")
		return "yellow";
		
	return "";
}



// ================================================
function definit_couleurs_LaTex($fonctions)
{
	$i=0;
	$output = "";
	foreach($fonctions as $fonc)
	{
		$couleur = $fonc["couleur"];
		if(getLaTex_couleurStandard($couleur) == "")
		{
			$output .= '
		\definecolor{couleurFonctionBode'.strval($i).'}{HTML}{'.substr($couleur,1).'}';
		}
		$i++;
	}
	return $output;
}


?>
