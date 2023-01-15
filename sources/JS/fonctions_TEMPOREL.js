
// ******************************************************************
redessine_Grille_TEMPOREL = function()
{

	SCENE_REPONSE_TEMPORELLE.calque_grille.removeAllChildren()

	dessine_grille_horizontales_y(ECHELLE_VALEUR, PAS_VALEUR, SCENE_REPONSE_TEMPORELLE, SCENE_REPONSE_TEMPORELLE.calque_grille,"")
	dessine_grille_verticales_x(ECHELLE_TEMPS, PAS_TEMPS, SCENE_REPONSE_TEMPORELLE, SCENE_REPONSE_TEMPORELLE.calque_grille,"")
	
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



update_type_entree = function()
{
	var entree = $("#bouton_TEMPOREL_type_entree").val();
	$(".option_entree").css("display","none");
	switch (entree)
	{
		case "echelon":
			$("#TEMPOREL_options_ECHELON").css("display","block");
			break;
		case "rampe":
			$("#TEMPOREL_options_RAMPE").css("display","block");
			break;
		case "sinus":
			$("#TEMPOREL_options_SINUS").css("display","block");
			break;
		case "dirac":
			$("#TEMPOREL_options_DIRAC").css("display","block");
			break;
	}
	
	redessine_Grille_TEMPOREL();
}



// FONCTION qui calcule la valeur de la consigne en fonction de t
// Dépend du type d'entrée sélectionnée
consigne = function(t)
{
	if(t<0)
		return 0;
	var entree = $("#bouton_TEMPOREL_type_entree").val();


	switch (entree)
	{
		case "echelon":
			return Number($("#bouton_TEMPOREL_reglage_ECHELON_gain_numerique").val())
		case "rampe":
			return Number($("#bouton_TEMPOREL_reglage_RAMPE_pente_numerique").val())*t
		case "sinus":
			return Number($("#bouton_TEMPOREL_reglage_SINUS_amplitude_numerique").val())*Math.sin(Number($("#bouton_TEMPOREL_reglage_SINUS_pulsation_numerique").val())*t);
		case "dirac":
			var pas = (get_tMax_TEMPOREL()-get_tMin_TEMPOREL())/NB_POINTS_TEMPOREL*3
			if(t<pas)
				return 1/pas*Number($("#bouton_TEMPOREL_reglage_DIRAC_intensite_numerique").val())
			return 0
		default:
			return 0;
	}
}

// *******************************************************************
// Update largeur de la réponse temporelle
function updateLargeurTemporel(w)
{
	SCENE_REPONSE_TEMPORELLE.canvas.width = w
	redessine_Grille_TEMPOREL();
	SCENE_REPONSE_TEMPORELLE.update(); //<-- semble pas nécessaire (?) Alors que ca l'est pour Bode
}

// *******************************************************************
// Update largeur de la réponse temporelle
function updateHauteurTemporel(h)
{
	SCENE_REPONSE_TEMPORELLE.canvas.height = h
	redessine_Grille_TEMPOREL();
	SCENE_REPONSE_TEMPORELLE.update(); //<-- semble pas nécessaire (?) Alors que ca l'est pour Bode
}

