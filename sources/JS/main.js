
main = function()
{
// **********************************************
// VARIABLES GLOBALES
// **********************************************

	NOM = "diagramme";	// Nom du projet par défaut
		$("#nomExport").val(getNomFichierFromSTR(NOM)); // Pour mettre à jour le nom dans la boite d'export
	
	ECHELLE_W = 200	// Pas entre deux décade (en px)
	
	ECHELLE_TEMPS = 100;	// Echelle de graduation en seconde
	PAS_TEMPS = 1;		// Pas d'affichage de 2 graduations.

	ECHELLE_DB = 5;	// Echelle de graduction en décibel
	PAS_DB = 20 ;	// Pas d'affichage de 2 graduations (par exemple : de 10 en 10)

	ECHELLE_PHASE = 1.5;	// Echelle de graduation en degrés
	PAS_PHASE = 15 ;	// Pas d'affichage de 2 graduations (par exemple : de 10 en 10)
	
	ECHELLE_VALEUR = 20;	// Echelle de graduation verticale de la réponse temporelle
	PAS_VALEUR = 1;		// Pas d'affichage de 2 graduations.
	
	CTRL_PRESSED = false ; // Est-ce que la touche "Ctrl" est appuyée ?
	ALT_PRESSED = false ; // Est-ce que la touche "ALT" est appuyée ?
	SHIFT_PRESSED = false ; // Est-ce que la touche "Shift" est appuyée ?
	
	LISTE_FONCTIONS = [] ;	// Liste des fonctions
	
	N = 0;		// N° de fonction (qui s'incrémente à chaque nouvelle fonction)
	
	NB_POINTS_TEMPOREL = 1000 // Nombre de point à tracer entre les bornes du graphe temporel

	
// **********************************************
// PREPARATION DES GRAPHES
// **********************************************

	// GRAPHE DE GAIN
	SCENE_BODE_GAIN = new createjs.Stage("canvas_bode_gain");
		SCENE_BODE_GAIN.calque_principal = new createjs.Container();
			SCENE_BODE_GAIN.calque_principal.name = "calque_principal"
			SCENE_BODE_GAIN.addChild(SCENE_BODE_GAIN.calque_principal);
		SCENE_BODE_GAIN.calque_grille  = new createjs.Container();
			SCENE_BODE_GAIN.calque_grille.name = "calque_grille"
			SCENE_BODE_GAIN.calque_principal.addChild(SCENE_BODE_GAIN.calque_grille);
		SCENE_BODE_GAIN.calque_fonctions = new createjs.Container();
			SCENE_BODE_GAIN.calque_fonctions.name = "calque_fonctions"
			SCENE_BODE_GAIN.calque_principal.addChild(SCENE_BODE_GAIN.calque_fonctions);
		SCENE_BODE_GAIN.calque_principal.x=400
		SCENE_BODE_GAIN.calque_principal.y=150
		//Evenement
		SCENE_BODE_GAIN.on("stagemousedown",stagemousedown_BODE_GAIN,null,false,{})
		SCENE_BODE_GAIN.canvas.addEventListener("wheel",action_Molette_BODE_GAIN)
		SCENE_BODE_GAIN.on("stagemousemove",afficher_position_souris_BODE_GAIN,null,false,{})
		// Dessin de la grille
		dessine_grille_verticales_log_x(ECHELLE_W, SCENE_BODE_GAIN, SCENE_BODE_GAIN.calque_grille)
		dessine_grille_horizontales_y(ECHELLE_DB, PAS_DB, SCENE_BODE_GAIN, SCENE_BODE_GAIN.calque_grille," dB")



	// GRAPHE DE PHASE
	SCENE_BODE_PHASE = new createjs.Stage("canvas_bode_phase");
		SCENE_BODE_PHASE.calque_principal = new createjs.Container();
			SCENE_BODE_PHASE.calque_principal.name = "calque_principal"
			SCENE_BODE_PHASE.addChild(SCENE_BODE_PHASE.calque_principal);
		SCENE_BODE_PHASE.calque_grille  = new createjs.Container();
			SCENE_BODE_PHASE.calque_grille.name = "calque_grille"
			SCENE_BODE_PHASE.calque_principal.addChild(SCENE_BODE_PHASE.calque_grille);
		SCENE_BODE_PHASE.calque_fonctions = new createjs.Container();
			SCENE_BODE_PHASE.calque_fonctions.name = "calque_fonctions"
			SCENE_BODE_PHASE.calque_principal.addChild(SCENE_BODE_PHASE.calque_fonctions);
		SCENE_BODE_PHASE.calque_principal.x=400
		SCENE_BODE_PHASE.calque_principal.y=150
		//Evenement
		SCENE_BODE_PHASE.on("stagemousedown",stagemousedown_BODE_PHASE,null,false,{})
		SCENE_BODE_PHASE.canvas.addEventListener("wheel",action_Molette_BODE_PHASE)
		SCENE_BODE_PHASE.on("stagemousemove",afficher_position_souris_BODE_PHASE,null,false,{})
		// Dessin de la grille
		dessine_grille_verticales_log_x(ECHELLE_W, SCENE_BODE_PHASE, SCENE_BODE_PHASE.calque_grille)
		dessine_grille_horizontales_y(ECHELLE_PHASE, PAS_PHASE, SCENE_BODE_PHASE, SCENE_BODE_PHASE.calque_grille," °")
	
	
	// GRAPHE DE REPONSE TEMPORELLE
	SCENE_REPONSE_TEMPORELLE = new createjs.Stage("canvas_reponse_temporelle");
		SCENE_REPONSE_TEMPORELLE.calque_principal = new createjs.Container();
			SCENE_REPONSE_TEMPORELLE.calque_principal.name = "calque_principal"
			SCENE_REPONSE_TEMPORELLE.addChild(SCENE_REPONSE_TEMPORELLE.calque_principal);
		SCENE_REPONSE_TEMPORELLE.calque_grille  = new createjs.Container();
			SCENE_REPONSE_TEMPORELLE.calque_grille.name = "calque_grille"
			SCENE_REPONSE_TEMPORELLE.calque_principal.addChild(SCENE_REPONSE_TEMPORELLE.calque_grille);
		SCENE_REPONSE_TEMPORELLE.calque_fonctions = new createjs.Container();
			SCENE_REPONSE_TEMPORELLE.calque_fonctions.name = "calque_fonctions"
			SCENE_REPONSE_TEMPORELLE.calque_principal.addChild(SCENE_REPONSE_TEMPORELLE.calque_fonctions);
		SCENE_REPONSE_TEMPORELLE.calque_principal.x=100
		SCENE_REPONSE_TEMPORELLE.calque_principal.y=300
		//Evenement
		SCENE_REPONSE_TEMPORELLE.on("stagemousedown",stagemousedown_TEMPOREL,null,false,{})
		SCENE_REPONSE_TEMPORELLE.canvas.addEventListener("wheel",action_Molette_TEMPOREL)
		SCENE_REPONSE_TEMPORELLE.on("stagemousemove",afficher_position_souris_TEMPOREL,null,false,{})
		// A FAIRE
		// Dessin de la grille
		dessine_grille_horizontales_y(ECHELLE_VALEUR, PAS_VALEUR, SCENE_REPONSE_TEMPORELLE, SCENE_REPONSE_TEMPORELLE.calque_grille,"")
		dessine_grille_verticales_x(ECHELLE_TEMPS, PAS_TEMPS, SCENE_REPONSE_TEMPORELLE, SCENE_REPONSE_TEMPORELLE.calque_grille,"")
			
	// Evenements keyboard 
	document.addEventListener('keydown',action_key_down)
	document.addEventListener('keyup',action_key_up)
	
	
	// Fonction globale
	
	FONCTION_GLOBALE = new Fonction_Globale();
	FONCTION_GLOBALE.redessine_tout()
	SCENE_BODE_GAIN.update()
	SCENE_BODE_PHASE.update()
	
	updateAffichageListe();
	
	
	
	// CHARGEMENT d'UN JSON EXISTANT =============
	// La variable "CODE_JSON_INITIAL" (si elle existe) a été créé dans le index.php, lors du chargement éventuel d'un fichier json
	if(typeof CODE_JSON_INITIAL != "undefined") 
	{
		chargeJSON(CODE_JSON_INITIAL);
	}
	

}

