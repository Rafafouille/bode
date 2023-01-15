

// ******************************************************************
redessine_Grille_BODE_complet = function()
{

	SCENE_BODE_GAIN.calque_grille.removeAllChildren()
	SCENE_BODE_PHASE.calque_grille.removeAllChildren()

	dessine_grille_verticales_log_x(ECHELLE_W, SCENE_BODE_GAIN, SCENE_BODE_GAIN.calque_grille)
	dessine_grille_horizontales_y(ECHELLE_DB, PAS_DB, SCENE_BODE_GAIN, SCENE_BODE_GAIN.calque_grille," dB")
	
	dessine_grille_verticales_log_x(ECHELLE_W, SCENE_BODE_PHASE, SCENE_BODE_PHASE.calque_grille)
	dessine_grille_horizontales_y(ECHELLE_PHASE, PAS_PHASE, SCENE_BODE_PHASE, SCENE_BODE_PHASE.calque_grille," °")
	
	redessine_toutes_fonctions();
}




// *******************************************************************
// Renvoie (en px) la position du bord gauche du canvas, dans le repère de "calque_principal"
get_xMin_BODE = function()
{
	return -SCENE_BODE_GAIN.calque_principal.x
}

// *******************************************************************
// Renvoie (en px) la position du bord droite du canvas, dans le repère de "calque_principal"
get_xMax_BODE = function()
{
	return get_xMin_BODE()+SCENE_BODE_GAIN.canvas.width
}

// ************************************
// Renvoie (en px) la position du bord haut du canvas, dans le repère de "calque_principal"
get_yMin_BODE = function()
{
	return -SCENE_BODE_GAIN.calque_principal.y
} 

// *******************************************************************
// Renvoie (en px) la position du bord bas du canvas, dans le repère de "calque_principal"
get_yMax_BODE = function()
{
	return get_yMin_BODE()+SCENE_BODE_GAIN.canvas.height
}

// *******************************************************************
// Renvoie le omega correspondant à l'abscisse dans le calque SCENE_BODE_GAIN.calquePrincipal
get_wFromPixel_BODE = function(x)
{
	return Math.pow(10,x/ECHELLE_W)
}

// *******************************************************************
// Renvoie le omega correspondant à l'abscisse dans le calque SCENE_BODE_GAIN.calquePrincipal
get_PixelFromw_BODE = function(w)
{
	return Math.log10(w)*ECHELLE_W
}

// *******************************************************************
// Update largeur Bode
function updateLargeurBode(w)
{
	SCENE_BODE_GAIN.canvas.width = w
	SCENE_BODE_PHASE.canvas.width = w
	
	redessine_Grille_BODE_complet();
	SCENE_BODE_GAIN.update();
	SCENE_BODE_PHASE.update();

}

// *******************************************************************
// Update hauteur du diagramme de gain - Bode
function updateLargeurBodeGain(h)
{
	SCENE_BODE_GAIN.canvas.height = h
	redessine_Grille_BODE_complet();
	SCENE_BODE_GAIN.update();
}

// *******************************************************************
// Update hauteur du diagramme de phase - Bode
function updateLargeurBodePhase(h)
{
	SCENE_BODE_PHASE.canvas.height = h
	redessine_Grille_BODE_complet();
	SCENE_BODE_PHASE.update();
}
