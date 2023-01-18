

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
// EVENEMENTS TEMPOREL
// *********************************************************

afficher_position_souris_TEMPOREL = function(event)
{
	var xS = event.stageX - SCENE_REPONSE_TEMPORELLE.calque_principal.x
	var yS = event.stageY - SCENE_REPONSE_TEMPORELLE.calque_principal.y
	
	var t = xS/ECHELLE_TEMPS
	var val = -yS / ECHELLE_VALEUR
	
	$("#affichage_curseur .affichage_titre_abcisse").html("Temps (s) : ")
	$("#affichage_curseur .affichage_valeur_abcisse").text(t.toFixed(3))
	$("#affichage_curseur .affichage_titre_ordonnee").html("Valeur (en USI) : ")
	$("#affichage_curseur .affichage_valeur_ordonnee").text(val.toFixed(1))
}



stagemousedown_TEMPOREL = function(event,data)
{
	if(event.pointerID==-1 && event.nativeEvent.which == 2) // Si c'est une souris et qu'en plus c'est la molette
	{
		var evenement = this.on("stagemousemove",suivreSouris_TEMPOREL,null,false,{mouseDepart:{x:event.stageX ,y:event.stageY}, positionDepart:{x: SCENE_REPONSE_TEMPORELLE.calque_principal.x, y: SCENE_REPONSE_TEMPORELLE.calque_principal.y} })
		
		// On créee l'événement quand on releve la souris
		this.on("stagemouseup",arreteSuivreSouris,null,true,{evenement_a_supprimer : evenement})
	}
}


suivreSouris_TEMPOREL = function(event,data)
{
	var position_initiale = data.positionDepart
	var souris_initiale = data.mouseDepart
	
	
	if(!CTRL_PRESSED)
		SCENE_REPONSE_TEMPORELLE.calque_principal.x = position_initiale.x + event.stageX - souris_initiale.x
	else
		SCENE_REPONSE_TEMPORELLE.calque_principal.x = position_initiale.x
	
	if(!SHIFT_PRESSED)
		SCENE_REPONSE_TEMPORELLE.calque_principal.y = position_initiale.y + event.stageY - souris_initiale.y
	else
		SCENE_REPONSE_TEMPORELLE.calque_principal.y = position_initiale.y 
		
		
	
	redessine_Grille_TEMPOREL();
	
	SCENE_REPONSE_TEMPORELLE.update();
}



action_Molette_TEMPOREL = function(event)
{
	// La cible
	//var cible = data.cible
	//var stage = data.stage

	// La molette
	event.preventDefault(); // Supprime le scrolling d'origine
	var val = event.wheelDelta;
	var facteur = 1+val/1000;
	
	if(!SHIFT_PRESSED)
		ECHELLE_VALEUR *= facteur
	if(!CTRL_PRESSED)
		ECHELLE_TEMPS *= facteur
	
	
	var posSouris = {x:event.x, y:event.y}
	var posCible = {x:SCENE_REPONSE_TEMPORELLE.canvas.getBoundingClientRect().x+SCENE_REPONSE_TEMPORELLE.calque_principal.x,y:SCENE_REPONSE_TEMPORELLE.canvas.getBoundingClientRect().y+SCENE_REPONSE_TEMPORELLE.calque_principal.y}
	
	//var dx =  
	//var dy =
	
	// MAJ de la position du dessin et des axes
	if(!SHIFT_PRESSED)
		SCENE_REPONSE_TEMPORELLE.calque_principal.y -= (1-facteur)*(posCible.y-posSouris.y)
	if(!CTRL_PRESSED)
		SCENE_REPONSE_TEMPORELLE.calque_principal.x -= (1-facteur)*(posCible.x-posSouris.x)
	

	
	redessine_Grille_TEMPOREL();
	
	SCENE_REPONSE_TEMPORELLE.update();
}


// *********************************************************
// EVENEMENTS POUR L'IMPORT / L'EXPORT
// *********************************************************

ouvreBoiteExporter=function()
{
	updateBoiteExporter();
	$("#dialogExporter").dialog("open");
}



ouvreBoiteOuvrirSysteme = function()
{
	//Supprime le contenu
	$("#dialog_ouvrir_systeme_contenu").empty();
	//met le'icone
	$("#dialog_ouvrir_systeme_contenu").append("<div style='text-align:center;'><img style='width:50px;' src='./sources/images/chargement.svg' alt='Chargement...'/></div>");
	$("#dialog_ouvrir_systeme").dialog("open");
	// Lancement de la requete de recherche des systemes
	$.post(	"repondeur.php",
			{action:"getSystemes"},
			getSystemes_callback,
			"json"
	)
}

// *************************************************
// Fonction callback qui recoit la liste des systemes
getSystemes_callback = function(data)
{
	var systemes = data.systemes
	//Supprime le contenu
	$("#dialog_ouvrir_systeme_contenu").empty();
	for(i=0;i<systemes.length;i++)
	{
		var systeme = systemes[i];
		var nom = systeme.nom;
		var image = systeme.image;
		var lien = systeme.lien;
		var code = "<a class='systeme_a_ouvrir' href='?sys="+lien+"'><h1>"+nom+"</h1><div class='image_systeme_a_ouvrir'><img src='"+image+"'/></div></div>"
		$("#dialog_ouvrir_systeme_contenu").append(code);
	}	
}



// *********************************************************
// EVENEMENTS POUR LES OPTIONS
// *********************************************************
// Fonction qui ouvre la boite d'options, en mettant à jour les items
ouvreBoiteOptions=function()
{
	// On récupère les dimensions et données
	// Hauteur Gain
	var canvas_gain = $("#canvas_bode_gain")
		var width_bode = Number(canvas_gain.attr("width"));
		var height_gain = Number(canvas_gain.attr("height"));
		$("#option_bode_largeur").val(width_bode);
		$("#option_bode_hauteur_gain").val(height_gain);
	// Hauteur Phase
	var canvas_phase = $("#canvas_bode_phase")
		var height_phase = Number(canvas_phase.attr("height"));
		$("#option_bode_hauteur_phase").val(height_phase);
	// PAS
		$("#option_bode_pas").val(PAS_DESSIN_BODE)
	// bornes de omega
		$("#option_bode_wmin").val(get_wMin_BODE());//get_xMin_BODE()/ECHELLE_W)
		$("#option_bode_wmax").val(get_wMax_BODE());//get_xMax_BODE()/ECHELLE_W)
	var canvas_temporel = $("#canvas_reponse_temporelle")
		var height_temporel = Number(canvas_temporel.attr("height"));
		var width_temporel = Number(canvas_temporel.attr("width"));
		$("#option_temporel_largeur").val(width_temporel);
		$("#option_temporel_hauteur").val(height_temporel);
	
	
	$("#boite_options").dialog("open");
}

