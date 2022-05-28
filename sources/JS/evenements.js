

// *********************************************************
// CAS GÉNÉRAL
// *********************************************************


// Fonction qui fait arrêter le suivi (valable pour plusieurs graphe, selon lequel est appelé)
function arreteSuivreSouris(event,data)
{
	this.off("stagemousemove",data.evenement_a_supprimer);
}

action_key_down = function(event)
{
	var touche = event.key
	if(touche == "Shift")
		SHIFT_PRESSED = true ;
	else if(touche == "Control")
		CTRL_PRESSED = true ;
	else if(touche == "Alt")
		ALT_PRESSED = true ;
}

action_key_up = function(event)
{
	var touche = event.key
	if(touche == "Shift")
		SHIFT_PRESSED = false ;
	else if(touche == "Control")
		CTRL_PRESSED = false ;
	else if(touche == "Alt")
		ALT_PRESSED = false ;
}

// *********************************************************
// EVENEMENTS POUR LE DIAGRAMME DE BODE - GAIN
// *********************************************************

stagemousedown_BODE_GAIN = function(event,data)
{
	if(event.pointerID==-1 && event.nativeEvent.which == 2) // Si c'est une souris et qu'en plus c'est la molette
	{
		var evenement = this.on("stagemousemove",suivreSouris_BODE_GAIN,null,false,{mouseDepart:{x:event.stageX ,y:event.stageY}, positionDepart:{x: SCENE_BODE_GAIN.calque_principal.x, y: SCENE_BODE_GAIN.calque_principal.y} })
		
		
		// On créee l'événement quand on releve la souris
		this.on("stagemouseup",arreteSuivreSouris,null,true,{evenement_a_supprimer : evenement})
	}
}


suivreSouris_BODE_GAIN = function(event,data)
{
	var position_initiale = data.positionDepart
	var souris_initiale = data.mouseDepart
	
	if(!CTRL_PRESSED)
		SCENE_BODE_GAIN.calque_principal.x = position_initiale.x + event.stageX - souris_initiale.x
	else
		SCENE_BODE_GAIN.calque_principal.x = position_initiale.x
		
	if(!SHIFT_PRESSED)
		SCENE_BODE_GAIN.calque_principal.y = position_initiale.y + event.stageY - souris_initiale.y
	else 
		SCENE_BODE_GAIN.calque_principal.y = position_initiale.y
	
	SCENE_BODE_PHASE.calque_principal.x = SCENE_BODE_GAIN.calque_principal.x
	
	redessine_Grille_BODE_complet();
	
	SCENE_BODE_GAIN.update();
	SCENE_BODE_PHASE.update();
}



action_Molette_BODE_GAIN = function(event)
{
	// La cible
	//var cible = data.cible
	//var stage = data.stage

	// La molette
	event.preventDefault(); // Supprime le scrolling d'origine
	var val = event.wheelDelta;
	var facteur = 1+val/1000;
	
	if(!SHIFT_PRESSED)
		ECHELLE_DB *= facteur
	if(!CTRL_PRESSED)
		ECHELLE_W *= facteur
	
	
	var posSouris = {x:event.x, y:event.y}
	var posCible = {x:SCENE_BODE_GAIN.canvas.getBoundingClientRect().x+SCENE_BODE_GAIN.calque_principal.x,y:SCENE_BODE_GAIN.canvas.getBoundingClientRect().y+SCENE_BODE_GAIN.calque_principal.y}
	
	//var dx =  
	//var dy =
	
	// MAJ de la position du dessin et des axes
	if(!SHIFT_PRESSED)
		SCENE_BODE_GAIN.calque_principal.y -= (1-facteur)*(posCible.y-posSouris.y)
	if(!CTRL_PRESSED)
		SCENE_BODE_GAIN.calque_principal.x -= (1-facteur)*(posCible.x-posSouris.x)
	
	
	SCENE_BODE_PHASE.calque_principal.x = SCENE_BODE_GAIN.calque_principal.x
	

	
	redessine_Grille_BODE_complet();
	
	SCENE_BODE_GAIN.update();
	SCENE_BODE_PHASE.update();
	
}


afficher_position_souris_BODE_GAIN = function(event)
{
	var xS = event.stageX - SCENE_BODE_GAIN.calque_principal.x
	var yS = event.stageY - SCENE_BODE_GAIN.calque_principal.y
	
	var w = Math.pow(10 , xS/ECHELLE_W)
	var Gdb = -yS / ECHELLE_DB
	
	$("#affichage_curseur .affichage_titre_abcisse").html("&#969; (rad/s) : ")
	$("#affichage_curseur .affichage_valeur_abcisse").text(w.toFixed(3))
	$("#affichage_curseur .affichage_titre_ordonnee").html("G<sub>dB</sub> (en dB) : ")
	$("#affichage_curseur .affichage_valeur_ordonnee").text(Gdb.toFixed(2)); // Avec 2 chiffres après la virgule
	
	
}


// *********************************************************
// EVENEMENTS POUR LE DIAGRAMME DE BODE - PHASE
// *********************************************************




stagemousedown_BODE_PHASE = function(event,data)
{
	if(event.pointerID==-1 && event.nativeEvent.which == 2) // Si c'est une souris et qu'en plus c'est la molette
	{
		var evenement = this.on("stagemousemove",suivreSouris_BODE_PHASE,null,false,{mouseDepart:{x:event.stageX ,y:event.stageY}, positionDepart:{x: SCENE_BODE_PHASE.calque_principal.x, y: SCENE_BODE_PHASE.calque_principal.y} })
		
		
		// On créee l'événement quand on releve la souris
		this.on("stagemouseup",arreteSuivreSouris,null,true,{evenement_a_supprimer : evenement})
	}
}


suivreSouris_BODE_PHASE = function(event,data)
{
	var position_initiale = data.positionDepart
	var souris_initiale = data.mouseDepart
	
	
	if(!CTRL_PRESSED)
		SCENE_BODE_PHASE.calque_principal.x = position_initiale.x + event.stageX - souris_initiale.x
	else
		SCENE_BODE_PHASE.calque_principal.x = position_initiale.x
	
	if(!SHIFT_PRESSED)
		SCENE_BODE_PHASE.calque_principal.y = position_initiale.y + event.stageY - souris_initiale.y
	else
		SCENE_BODE_PHASE.calque_principal.y = position_initiale.y 
		
		
	SCENE_BODE_GAIN.calque_principal.x = SCENE_BODE_PHASE.calque_principal.x
	
	redessine_Grille_BODE_complet();
	
	SCENE_BODE_GAIN.update();
	SCENE_BODE_PHASE.update();
}


action_Molette_BODE_PHASE = function(event)
{
	// La cible
	//var cible = data.cible
	//var stage = data.stage

	// La molette
	event.preventDefault(); // Supprime le scrolling d'origine
	var val = event.wheelDelta;
	var facteur = 1+val/1000;
	
	if(!SHIFT_PRESSED)
		ECHELLE_PHASE *= facteur
	if(!CTRL_PRESSED)
		ECHELLE_W *= facteur
	
	
	var posSouris = {x:event.x, y:event.y}
	var posCible = {x:SCENE_BODE_PHASE.canvas.getBoundingClientRect().x+SCENE_BODE_PHASE.calque_principal.x, y:SCENE_BODE_PHASE.canvas.getBoundingClientRect().y+SCENE_BODE_PHASE.calque_principal.y}
	
	//var dx =  
	//var dy =
	
	// MAJ de la position du dessin et des axes
	if(!SHIFT_PRESSED)
		SCENE_BODE_PHASE.calque_principal.y -= (1-facteur)*(posCible.y-posSouris.y)
	if(!CTRL_PRESSED)
		SCENE_BODE_PHASE.calque_principal.x -= (1-facteur)*(posCible.x-posSouris.x)
	
	
	SCENE_BODE_GAIN.calque_principal.x = SCENE_BODE_PHASE.calque_principal.x
	
		
	redessine_Grille_BODE_complet();
	
	SCENE_BODE_GAIN.update();
	SCENE_BODE_PHASE.update();
	
}

afficher_position_souris_BODE_PHASE = function(event)
{
	var xS = event.stageX - SCENE_BODE_PHASE.calque_principal.x
	var yS = event.stageY - SCENE_BODE_PHASE.calque_principal.y
	
	var w = Math.pow(10 , xS/ECHELLE_W)
	var phi = -yS / ECHELLE_PHASE
	
	$("#affichage_curseur .affichage_titre_abcisse").html("&#969; (rad/s) : ")
	$("#affichage_curseur .affichage_valeur_abcisse").text(w.toFixed(3))
	$("#affichage_curseur .affichage_titre_ordonnee").html("&#966; (en °) : ")
	$("#affichage_curseur .affichage_valeur_ordonnee").text(phi.toFixed(1))
	
	
}










// *********************************************************
// EVENEMENTS POUR L'IMPORT / L'EXPORT
// *********************************************************

ouvreBoiteExporter=function()
{
	updateBoiteExporter();
	$("#dialogExporter").dialog("open");
}






