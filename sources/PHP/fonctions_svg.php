<?php



//
function construit_Diagramme_Bode_GdB($parametres,$fonctions)
{
	$retour = '
	<!-- DIAGRAMME DE GAIN - - - - - - - - - -->
	<g id="groupe_graphe_bode_Gdb">
		<rect width="'.strval($parametres["GRAPHE_BODE_GDB"]["width"]).'" height="'.strval($parametres["GRAPHE_BODE_GDB"]["height"]).'" fill="white"/>	<!-- ARRIERE-PLAN -->
		<mask id="mask_graphe_bode_GBD">
			<rect width="'.strval($parametres["GRAPHE_BODE_GDB"]["width"]).'" height="'.strval($parametres["GRAPHE_BODE_GDB"]["height"]).'" stroke="black" fill="white"/>
		</mask>
		<g  mask="url(#mask_graphe_bode_GBD)">
			<g id="groupe_bode_GdB_quadrillage" transform="translate('.$parametres["GRAPHE_BODE_GDB"]["origine"]["x"].','.$parametres["GRAPHE_BODE_GDB"]["origine"]["y"].')">
'.makeQuadrillageSVGY($parametres["GRAPHE_BODE_GDB"]["height"], $parametres["GRAPHE_BODE_GDB"]["width"],  $parametres["GRAPHE_BODE_GDB"]["origine"]["x"], $parametres["GRAPHE_BODE_GDB"]["origine"]["y"], $parametres['ECHELLE_DB'], $parametres['PAS_DB']," dB").'
'. makeQuadrillageSVGlogX($parametres["GRAPHE_BODE_GDB"]["height"], $parametres["GRAPHE_BODE_GDB"]["width"], $parametres["GRAPHE_BODE_GDB"]["origine"]["x"], $parametres["GRAPHE_BODE_GDB"]["origine"]["y"], $parametres['ECHELLE_W']).'
			</g>
			<g id="groupe_bode_courbes_GdB" transform="translate('.$parametres["GRAPHE_BODE_GDB"]["origine"]["x"].','.$parametres["GRAPHE_BODE_GDB"]["origine"]["y"].')">
				'.traceCourbesGdB($parametres,$fonctions).'
			</g>
		</g>
		<rect width="'.strval($parametres["GRAPHE_BODE_GDB"]["width"]).'" height="'.strval($parametres["GRAPHE_BODE_GDB"]["height"]).'" stroke="black" fill="none"/>	<!-- CADRE DU GRAPHE -->
	</g>';
	return $retour;
}






function construit_Diagramme_Bode_Phase($parametres,$fonctions)
{
$margin = 20;
$retour = '
	<!-- DIAGRAMME DE PHASE - - - - - - - - - -->
	<g id="groupe_graphe_bode_phase" transform="translate(0,'.strval($parametres["GRAPHE_BODE_GDB"]["height"]+$margin).')">
		<rect width="'.strval($parametres["GRAPHE_BODE_PHASE"]["width"]).'" height="'.strval($parametres["GRAPHE_BODE_PHASE"]["height"]).'" fill="white"/>	<!-- ARRIERE-PLAN -->
		<mask id="mask_graphe_bode_phase">
			<rect width="'.strval($parametres["GRAPHE_BODE_PHASE"]["width"]).'" height="'.strval($parametres["GRAPHE_BODE_PHASE"]["height"]).'" stroke="black" fill="white"/>
		</mask>
		<g  mask="url(#mask_graphe_bode_phase)">
			<g id="groupe_bode_phase_quadrillage" transform="translate('.$parametres["GRAPHE_BODE_PHASE"]["origine"]["x"].','.$parametres["GRAPHE_BODE_PHASE"]["origine"]["y"].')">
'.makeQuadrillageSVGY($parametres["GRAPHE_BODE_PHASE"]["height"], $parametres["GRAPHE_BODE_PHASE"]["width"],  $parametres["GRAPHE_BODE_PHASE"]["origine"]["x"], $parametres["GRAPHE_BODE_PHASE"]["origine"]["y"], $parametres['ECHELLE_PHASE'], $parametres['PAS_PHASE'],"°").'
'. makeQuadrillageSVGlogX($parametres["GRAPHE_BODE_PHASE"]["height"], $parametres["GRAPHE_BODE_PHASE"]["width"], $parametres["GRAPHE_BODE_PHASE"]["origine"]["x"], $parametres["GRAPHE_BODE_PHASE"]["origine"]["y"], $parametres['ECHELLE_W']).'
			</g>
			<g id="groupe_bode_courbes_Phase" transform="translate('.$parametres["GRAPHE_BODE_PHASE"]["origine"]["x"].','.$parametres["GRAPHE_BODE_PHASE"]["origine"]["y"].')">
				'.traceCourbesPhase($parametres,$fonctions).'
			</g>
		</g>
		<rect width="'.strval($parametres["GRAPHE_BODE_PHASE"]["width"]).'" height="'.strval($parametres["GRAPHE_BODE_PHASE"]["height"]).'" stroke="black" fill="none"/>	<!-- CADRE DU GRAPHE -->
	</g>';
	return $retour;
}



















// h = height
function makeQuadrillageSVGY ($h, $w, $xOrigine, $yOrigine, $echelleY, $pasY, $unite="")
{
	$jmin = -intval($yOrigine/($echelleY*$pasY))-1;
	$jmax = intval((-$yOrigine+$h)/($echelleY*$pasY))+1;
	$lignes = '';
	$unites = '';
	
	//Changement du pas (si trop petit)
	while($echelleY*$pasY < 30)
		$pasY *= 2;
	while($echelleY*$pasY >100)
		if($pasY>1)
			$pasY = intval($pasY/2);
		else
			$pasY = $pasY/2;
	
	
	
	for($y = $jmin*$echelleY*$pasY ; $y<$jmax*$echelleY*$pasY ; $y+=$pasY*$echelleY)
	{
	
		
		// Unités
		$unites .= '
					<text x="0" y="'.strval($y).'" font-family="Sans Serif, Arial" style="stroke:#FFFFFF;stroke-width:0.2px" font-size="">'.strval(round(-$y/$echelleY)).$unite.'</text>';
		// Graduations principales
		$lignes .= '
					<line x1="'.strval(-$xOrigine).'" x2="'.strval(-$xOrigine+$w).'" y1="'.strval($y).'" y2="'.strval($y).'" stroke="black" stroke-width="1" stroke-opacity="0.5"/>';
		// Graduations secondaires
		for($yy=$y+$pasY*$echelleY/5;$yy<$y+$pasY*$echelleY;$yy+=$pasY*$echelleY/5)
		{
			$lignes .= '
						<line x1="'.strval(-$xOrigine).'" x2="'.strval(-$xOrigine+$w).'" y1="'.$yy.'" y2="'.$yy.'" stroke="black" stroke-width="'.strval(round($y)==0?2:1).'"  stroke-opacity="0.2"/>';
		}
	}
	
	
	$return = "
				<!-- graduations verticales -->
				<g>
".$lignes."
				</g>
				<!-- unités verticales -->
				<g>
".$unites."
				</g>";
	
	return $return;
}
function makeQuadrillageSVGlogX($h, $w, $xOrigine, $yOrigine, $echelleX)
{
	// p veut dire "puissance de 10"
	$pmin = -intval($xOrigine/($echelleX))-1;
	$pmax = intval((-$xOrigine+$w)/($echelleX))+1;
	$lignes = "";
	$unites = "";
	for($p = $pmin ; $p<$pmax ; $p+=1)
	{
	
		$x = $p*$echelleX;
		
		
		// Unités
		$unites .= '
					<g>
						<text style="text-anchor:middle;" x="'.strval($x).'" y="0" font-family="Sans Serif, Arial" style="stroke:#FFFFFF;stroke-width:0.4" font-size="">10<tspan style="baseline-shift:super,">'.strval($p).'</tspan></text>
					</g>';
	
	
		// Graduations principales
		$lignes .= '
				<line x1="'.strval($x).'" x2="'.strval($x).'" y1="'.strval(-$yOrigine).'" y2="'.strval(-$yOrigine+$h).'" stroke="black" stroke-width="'.strval(round($p)==0?2:1).'" stroke-opacity="0.5"/>';
	
		// Graduations secondaires
		for($n=2 ; $n<=9 ; $n++)// Sous unités
		{
			$x = ($p+log10($n))*$echelleX;
			$lignes .= '
					<line x1="'.strval($x).'" x2="'.strval($x).'" y1="'.strval(-$yOrigine).'" y2="'.strval(-$yOrigine+$h).'" stroke="black" stroke-width="1"  stroke-opacity="0.2"/>';
		}
	}
	
	
	
	
	$return = "
				<!-- graduations horizontales -->
				<g>
".$lignes."
				</g>
				<!-- unités horizontales -->
				<g>
".$unites."
				</g>";
	return $return;
}







function convertitListeCoordonneesCourbeEnPath($courbe)
{
	$retour = "M";
	for($i=1;$i<count($courbe);$i++)
	{
		if(array_key_exists("x",$courbe[$i]))
		{
			$x = $courbe[$i]["x"];
			$y = $courbe[$i]["y"];
			if($i!=1)
				$retour.=" L";
			$retour.=" ".strval($x)." ".strval($y);
		}
	}
	return $retour;
}




function traceCourbesGdB($parametres,$fonctions)
{
	$return = "";
	foreach($fonctions as $fonc)
	{
		if($fonc["afficheAnalytique"])
		{
			$typeTrait = "";
			if($fonc["typeTraitAnalytique"]=="pointillés")
				$typeTrait = ' stroke-dasharray="20,8"  ';
			else if($fonc["typeTraitAnalytique"]=="pointillés fins")
				$typeTrait = ' stroke-dasharray="5,5"  ';
			$return .= '
				<path stroke="'.$fonc["couleur"].'" stroke-width="'.$fonc['epaisseurAnalytique'].'" fill="none" '.$typeTrait.' d="'.convertitListeCoordonneesCourbeEnPath($fonc["courbes"]["GdBAnalytique"]).'"/>';
		}
		if($fonc["afficheAsymptotique"])
		{
			$typeTrait = "";
			if($fonc["typeTraitAsymptotique"]=="pointillés")
				$typeTrait = ' stroke-dasharray="20,8"  ';
			else if($fonc["typeTraitAsymptotique"]=="pointillés fins")
				$typeTrait = ' stroke-dasharray="5,5"  ';
			$return .= '
				<path stroke="'.$fonc["couleur"].'" stroke-width="'.$fonc['epaisseurAsymptotique'].'" fill="none" '.$typeTrait.' d="'.convertitListeCoordonneesCourbeEnPath($fonc["courbes"]["GdBAsymptotique"]).'"/>';
		}
	}
	return $return;
}




function traceCourbesPhase($parametres,$fonctions)
{
	$return = "";
	foreach($fonctions as $fonc)
	{
		if($fonc["afficheAnalytique"])
		{
			$typeTrait = "";
			if($fonc["typeTraitAnalytique"]=="pointillés")
				$typeTrait = ' stroke-dasharray="20,8"  ';
			else if($fonc["typeTraitAnalytique"]=="pointillés fins")
				$typeTrait = ' stroke-dasharray="5,5"  ';
			$return .= '
				<path stroke="'.$fonc["couleur"].'" stroke-width="'.$fonc['epaisseurAnalytique'].'" fill="none" '.$typeTrait.' d="'.convertitListeCoordonneesCourbeEnPath($fonc["courbes"]["phaseAnalytique"]).'"/>';
		}
		if($fonc["afficheAsymptotique"])
		{
			$typeTrait = "";
			if($fonc["typeTraitAsymptotique"]=="pointillés")
				$typeTrait = ' stroke-dasharray="20,8"  ';
			else if($fonc["typeTraitAsymptotique"]=="pointillés fins")
				$typeTrait = ' stroke-dasharray="5,5"  ';
			$return .= '
				<path stroke="'.$fonc["couleur"].'" stroke-width="'.$fonc['epaisseurAsymptotique'].'" fill="none" '.$typeTrait.' d="'.convertitListeCoordonneesCourbeEnPath($fonc["courbes"]["phaseAsymptotique"]).'"/>';
		}
	}
	return $return;
}

?>
