
main = function()
{
// **********************************************
// CONSTANTES
// **********************************************

	
	ECHELLE_W = 200	// Pas entre deux décade (en px)

	ECHELLE_DB = 5;	// Echelle de graduction en décibel
	PAS_DB = 20 ;	// Pas d'affichage de 2 graduations (par exemple : de 10 en 10)

	ECHELLE_PHASE = 1.5;	// Echelle de graduction en degrés
	PAS_PHASE = 15 ;	// Pas d'affichage de 2 graduations (par exemple : de 10 en 10)
	
	CTRL_PRESSED = false ; // Est-ce que la touche "Ctrl" est appuyée ?
	ALT_PRESSED = false ; // Est-ce que la touche "ALT" est appuyée ?
	SHIFT_PRESSED = false ; // Est-ce que la touche "Shift" est appuyée ?

// **********************************************
// PREPARATION DES GRAPHES
// **********************************************

	SCENE_BODE_GAIN = new createjs.Stage("canvas_bode_gain");
	SCENE_BODE_GAIN.calque_principal = new createjs.Container();
	SCENE_BODE_GAIN.addChild(SCENE_BODE_GAIN.calque_principal);
	SCENE_BODE_GAIN.calque_grille  = new createjs.Container();
	SCENE_BODE_GAIN.calque_principal.addChild(SCENE_BODE_GAIN.calque_grille);
	SCENE_BODE_GAIN.calque_principal.x=400
	SCENE_BODE_GAIN.calque_principal.y=150
	//Evenement
	SCENE_BODE_GAIN.on("stagemousedown",stagemousedown_BODE_GAIN,null,false,{})
	SCENE_BODE_GAIN.canvas.addEventListener("wheel",action_Molette_BODE_GAIN)

	SCENE_BODE_PHASE = new createjs.Stage("canvas_bode_phase");
	SCENE_BODE_PHASE.calque_principal = new createjs.Container();
	SCENE_BODE_PHASE.addChild(SCENE_BODE_PHASE.calque_principal);
	SCENE_BODE_PHASE.calque_grille  = new createjs.Container();
	SCENE_BODE_PHASE.calque_principal.addChild(SCENE_BODE_PHASE.calque_grille);
	SCENE_BODE_PHASE.calque_principal.x=400
	SCENE_BODE_PHASE.calque_principal.y=150
	//Evenement
	SCENE_BODE_PHASE.on("stagemousedown",stagemousedown_BODE_PHASE,null,false,{})
	SCENE_BODE_PHASE.canvas.addEventListener("wheel",action_Molette_BODE_PHASE)

	dessine_grille_verticales_log_x(ECHELLE_W, SCENE_BODE_GAIN, SCENE_BODE_GAIN.calque_grille)
	dessine_grille_horizontales_y(ECHELLE_DB, PAS_DB, SCENE_BODE_GAIN, SCENE_BODE_GAIN.calque_grille," dB")
	
	dessine_grille_verticales_log_x(ECHELLE_W, SCENE_BODE_PHASE, SCENE_BODE_PHASE.calque_grille)
	dessine_grille_horizontales_y(ECHELLE_PHASE, PAS_PHASE, SCENE_BODE_PHASE, SCENE_BODE_PHASE.calque_grille," °")
	
	
	
	
	// Evenements keyboard 
	document.addEventListener('keydown',action_key_down)
	document.addEventListener('keyup',action_key_up)
	

}

