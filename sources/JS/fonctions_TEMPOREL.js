
// ******************************************************************
redessine_Grille_TEMPOREL = function()
{

	SCENE_REPONSE_TEMPORELLE.calque_grille.removeAllChildren()

	dessine_grille_horizontales_y(ECHELLE_VALEUR, PAS_VALEUR, SCENE_REPONSE_TEMPORELLE, SCENE_REPONSE_TEMPORELLE.calque_grille,"")
	dessine_grille_verticale_y(ECHELLE_TEMPS, PAS_TEMPS, SCENE_REPONSE_TEMPORELLE, SCENE_REPONSE_TEMPORELLE.calque_grille,"")
	
	redessine_toutes_fonctions();
}




get_tMin_TEMPOREL = function()
{
	return -SCENE_REPONSE_TEMPORELLE.calque_principal.x/ECHELLE_TEMPS;
}



get_tMax_TEMPOREL = function()
{
	return (-SCENE_REPONSE_TEMPORELLE.calque_principal.x+SCENE_REPONSE_TEMPORELLE.canvas.width)/ECHELLE_TEMPS;
}
