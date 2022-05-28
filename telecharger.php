<?php
include_once("sources/PHP/fonctions_svg.php");
include_once("sources/PHP/fonctions_LaTex.php");

$action = isset($_POST['action'])? $_POST['action'] : '';
$export = isset($_POST['outputExport'])? $_POST['outputExport'] : '';
$nom =  isset($_POST['nomExport'])? $_POST['nomExport'] : 'export';
$format = isset($_POST['selectTypeExport'])? $_POST['selectTypeExport'] : '';









// TELECHARGER =========================================
// La fonction teste si les couleurs sont standards, et en définit de nouvelle si besoin
// Ensuite, on crée le diagramme de gain de la fonction globale.
// Ensuite, on crée le diagramme de gain des autres fonctions
// Ensuite, on crée le diagramme de phase de la fonction globale.
// Ensuite, on crée le diagramme de phase des autres fonctions

if($action=="telechargerGraphe")
{
	if($export!="")
	{
		// JSON ----------------------------
		if($format=="json")
		{
			header('Content-Type: text/plain');
			header('Content-Disposition: attachment; filename="'.$nom.'.json"');
			echo $export;
		}
		else if($format=="svg")
		{
			header('Content-Type: image/svg+xml');
			header('Vary: Accept-Encoding');
			header('Content-Disposition: attachment; filename="'.$nom.'.svg"');
			$valeurs = json_decode($export,true);
			$parametres = $valeurs["parametres"];
			$fonctions = $valeurs["fonctions"];
			$output = '<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" 
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="'.strval($parametres["GRAPHE_BODE_GDB"]["width"]).'" height="'.strval($parametres["GRAPHE_BODE_GDB"]["height"]+$parametres["GRAPHE_BODE_PHASE"]["height"]+20).'" version="1.1"
xmlns="http://www.w3.org/2000/svg">
	<title>Graphique Bode : '.$nom.'</title>
'.construit_Diagramme_Bode_GdB($parametres,$fonctions).'
'.construit_Diagramme_Bode_Phase($parametres,$fonctions).'
</svg>';

//strval($parametres['GRAPHE_BODE_GBD']['width'])
			echo $output;
//			echo var_dump($parametres);
		}
		else if($format=="latex")
		{
			header('Content-Type: text/plain');
			header('Content-Disposition: attachment; filename="'.$nom.'.tex"');
			$valeurs = json_decode($export,true);
			$parametres = $valeurs["parametres"];
			$fonctions = $valeurs["fonctions"];
			$xmin = -$parametres["GRAPHE_BODE_GDB"]["origine"]["x"];	// omega Mini en pixel
			$xmax = -$parametres["GRAPHE_BODE_GDB"]["origine"]["x"]+$parametres["GRAPHE_BODE_GDB"]["width"];	// omega Maxi en pixel
			$wmin = floor($xmin/$parametres['ECHELLE_W']-0.00001)+1;	// omega Mini en rad/s
			$wmax = floor($xmax/$parametres['ECHELLE_W']+0.00001);	// omega Maxi en rad/s
			
			$ydB_min =  -$parametres["GRAPHE_BODE_GDB"]["origine"]["y"];
			$ydB_max =  -$parametres["GRAPHE_BODE_GDB"]["origine"]["y"]+$parametres["GRAPHE_BODE_GDB"]["height"];
			$dBmax = floor(-$ydB_min/$parametres['ECHELLE_DB']-0.00001)+1 ;
			$dBmin = floor(-$ydB_max/$parametres['ECHELLE_DB']+0.00001) ;
			
			$yPhase_min =  -$parametres["GRAPHE_BODE_PHASE"]["origine"]["y"];
			$yPhase_max =  -$parametres["GRAPHE_BODE_PHASE"]["origine"]["y"]+$parametres["GRAPHE_BODE_PHASE"]["height"];
			$phasemax = floor(-$yPhase_min/$parametres['ECHELLE_PHASE']-0.00001)+1 ;
			$phasemin = floor(-$yPhase_max/$parametres['ECHELLE_PHASE']+0.00001) ;
			
			$output = '
% === Diagramme de Bode ==================================
\begin{tikzpicture}
	% Définition des couleurs éventuelles'.definit_couleurs_LaTex($fonctions).'


	% Bode - Gain en dB -----------------
	\begin{scope}[xscale=1,yscale=0.04]
		\semilog{'.strval($wmin).'}{'.strval($wmax).'}{'.strval($dBmin).'}{'.strval($dBmax).'}%
		\UnitedB';
		
		if($fonctions[0]["afficheAsymptotique"])
			$output .= getLaTexAmpAsympt_globale($fonctions,$wmin,$wmax);
		if($fonctions[0]["afficheAnalytique"])
			$output .= getLaTexAmpAnalytique_globale($fonctions,$wmin,$wmax);
		
		$i=0;
		foreach($fonctions as $fonc)
		{
			$maCouleur = getLaTex_couleurStandard($fonc['couleur'])==""?"couleurFonctionBode".strval($i):getLaTex_couleurStandard($fonc['couleur']);
			if($fonc["afficheAsymptotique"])
			{
				$typeTrait = $fonc['typeTraitAsymptotique']=="normal"?"":($fonc['typeTraitAsymptotique']=="pointillés"?"densely dashed,":"dashed,");
				if($fonc["type"]!="globale")
					$output .= '
		\BodeAmp['.$typeTrait.$maCouleur.',samples=100,line width='.strval($fonc['epaisseurAsymptotique']).']{'.strval($wmin).':'.strval($wmax).'}{0'.getLaTex_AmpAsympt_fonction($fonc).'}';
			}
			if($fonc["afficheAnalytique"])
			{
				$typeTrait = $fonc['typeTraitAnalytique']=="normal"?"":($fonc['typeTraitAsymptotique']=="pointillés"?"densely dashed,":"dashed,");
				if($fonc["type"]!="globale")
					$output .= '
		\BodeAmp['.$typeTrait.$maCouleur.',samples=100,line width='.strval($fonc['epaisseurAnalytique']).']{'.strval($wmin).':'.strval($wmax).'}{0'.getLaTex_AmpAnalytique_fonction($fonc).'}';
			}
			$i++;
		}
		$output .= '
	\end{scope}
	% ----------------------------

	% Bode - Phase -----------------
	\begin{scope}[yshift=-3cm,xscale=1,yscale=0.015]
		\semilog{'.strval($wmin).'}{'.strval($wmax).'}{'.strval($phasemin).'}{'.strval($phasemax).'}
		\UniteDegre
		\OrdBode{30}';
		
		if($fonctions[0]["afficheAsymptotique"])
			$output .= getLaTexPhaseAsympt_globale($fonctions,$wmin,$wmax);
		if($fonctions[0]["afficheAnalytique"])
			$output .= getLaTexPhaseAnalytique_globale($fonctions,$wmin,$wmax);
		
		$i=0;
		foreach($fonctions as $fonc)
		{
			$maCouleur = getLaTex_couleurStandard($fonc['couleur'])==""?"couleurFonctionBode".strval($i):getLaTex_couleurStandard($fonc['couleur']);
			if($fonc["afficheAsymptotique"])
			{
				$typeTrait = $fonc['typeTraitAsymptotique']=="normal"?"":($fonc['typeTraitAsymptotique']=="pointillés"?"densely dashed,":"dashed,");
				if($fonc["type"]!="globale")
					$output .= '
		\BodeArg['.$typeTrait.$maCouleur.',samples=100,line width='.strval($fonc['epaisseurAsymptotique']).']{'.strval($wmin).':'.strval($wmax).'}{0'.getLaTex_PhaseAsymptotique_fonction($fonc).'}';
			}
			if($fonc["afficheAnalytique"])
			{
				$typeTrait = $fonc['typeTraitAnalytique']=="normal"?"":($fonc['typeTraitAsymptotique']=="pointillés"?"densely dashed,":"dashed,");
				if($fonc["type"]!="globale")
					$output .= '
		\BodeArg['.$typeTrait.$maCouleur.',samples=100,line width='.strval($fonc['epaisseurAnalytique']).']{'.strval($wmin).':'.strval($wmax).'}{0'.getLaTex_PhaseAnalytique_fonction($fonc).'}';
			}
		$i++;
		}
		$output .= '
	\end{scope}
	% ----------------------------
\end{tikzpicture}
% === Diagramme de Bode ==================================';
			
			echo $output;
		}
	}
	else
		echo "Erreur : pas de de donnée à télécharger";
}



?>
