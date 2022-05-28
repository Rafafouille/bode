

// *************************************************************************************************************
// Dessine des graduction logarithmique entre le début et la fin du stage, horizontalement, avec un pas d'une unité (px) par décade.
// stage est le canvas sur lequel dessiner. Calque est le calque dans lequel on va dessiner, et dont le x=0 du parent correspond à 10^0 (le graphe doit donc être contenu dans un container dédié)
dessine_grille_verticales_log_x = function(unite, stage, calque)
{
	var largeur = stage.canvas.width
	var hauteur = stage.canvas.height
	
	var xmin = -calque.parent.x
	var xmax = xmin + largeur
	
	var ymin = -calque.parent.y
	var ymax = ymin + hauteur
	
	
	var logwmin = parseInt(xmin/unite)-1;
	var logwmax = parseInt(xmax/unite);
	
	
	
	for(var i=logwmin ; i<=logwmax ; i++)
	{
		for(var j=1 ; j<= 9 ; j++)
		{
			var w = Math.pow(10,i)*j;
			var x = Math.log10(w)*unite
			
			var ligne = new createjs.Shape();
			calque.addChild(ligne)
			if(j==1)
				var couleur = "rgba(0,0,0,0.5)";
			else
				var couleur = "rgba(0,0,0,0.2)";
			ligne.graphics.setStrokeStyle(1).beginStroke(couleur);
			ligne.graphics.moveTo(x,ymin);
			ligne.graphics.lineTo(x,ymax);
		}
		
		// Ecriture
		var ecriture = new createjs.Container();
		calque.addChild(ecriture);
		var dix = new createjs.Text("10", "12px Arial", "#000000");
		ecriture.addChild(dix)
		var exposant = new createjs.Text(String(i), "10px Arial", "#000000");
		ecriture.addChild(exposant)
		exposant.x = dix.getBounds().width;
		exposant.y = -exposant.getBounds().height/2;
		ecriture.x = i*unite - ecriture.getBounds().width/2
		if(ecriture.getBounds().y < ymin)
			ecriture.y = ymin + ecriture.y-ecriture.getBounds().y
		else if(ecriture.getBounds().y+ecriture.getBounds().height > ymax)
			ecriture.y = ymax - (ecriture.getBounds().height-ecriture.y+ecriture.getBounds().y)
		ajouteRectangleBlanc(ecriture)
		
	}
	
	stage.update();
}






// *************************************************************************************************************
// Dessine des graduction logarithmique entre le début et la fin du stage, verticalement.
// Unité : en px (correpond à 1 unité)
// pas : correpond aux graduactions à afficher (par exemple : 20 veut dire qu'on affichera une graduaction sur 20)
// stage est le canvas sur lequel dessiner. Calque est le calque dans lequel on va dessiner, et dont le x=0 du parent correspond à 0 (le graphe doit donc être contenu dans un container dédié)
dessine_grille_horizontales_y = function(unite, pas, stage, calque, suffixe = "")
{

	//Changement du pas (si trop petit)
	while(unite*pas < 30)
		pas *= 2
	while(unite*pas >100)
		if(pas>1)
			pas = parseInt(pas/2)
		else
			pas = pas/2


	var largeur = stage.canvas.width
	var hauteur = stage.canvas.height
	
	var xmin = -calque.parent.x
	var xmax = xmin + largeur
	
	var ymin = -calque.parent.y
	var ymax = ymin + hauteur
	
	
	var j_grad = Math.floor(ymin/(unite*pas)) // Numéro de la graduation (entière) la plus en HAUT (0 = origine)

	
	// On dessine en GROS les axes principaux
	var ligne = new createjs.Shape();
		calque.addChild(ligne)
		ligne.graphics.setStrokeStyle(2).beginStroke("rgba(0,0,0,0.4)");
		ligne.graphics.moveTo(xmin,0);
		ligne.graphics.lineTo(xmax,0);
	
	
	
	
	while(j_grad*unite*pas <= ymax)
	{
		var ligne = new createjs.Shape();
		calque.addChild(ligne)
		ligne.graphics.setStrokeStyle(1).beginStroke("rgba(0,0,0,0.5)");
		ligne.graphics.moveTo(xmin,j_grad*unite*pas);
		ligne.graphics.lineTo(xmax,j_grad*unite*pas);
		
		
		// Lignes secondaires
		for(jj=2;jj<=9;jj+=2)
		{
			var ligne = new createjs.Shape();
			calque.addChild(ligne)
			ligne.graphics.setStrokeStyle(1).beginStroke("rgba(0,0,0,0.2)");
			ligne.graphics.moveTo(xmin,(j_grad+jj/10)*unite*pas);
			ligne.graphics.lineTo(xmax,(j_grad+jj/10)*unite*pas);
		}
		
		// Ecriture
		var ecriture = new createjs.Container();
		calque.addChild(ecriture);
		var valeur = new createjs.Text(String(Math.round(-j_grad*pas))+suffixe, "12px Arial", "black");
		ecriture.addChild(valeur)
		ecriture.y = j_grad*pas*unite - ecriture.getBounds().height/2
		if(ecriture.getBounds().x < xmin)
			ecriture.x = xmin + ecriture.x-ecriture.getBounds().x
		else if(ecriture.getBounds().x+ecriture.getBounds().width > xmax)
			ecriture.x = xmax - (ecriture.getBounds().width-ecriture.x+ecriture.getBounds().x)
		// Rectangle blanc
		ajouteRectangleBlanc(ecriture)
			
		j_grad ++;
	}
	
	stage.update();
}




// *************************************************************************************************************
// Ajoute un rectangle blanc en arrière plan (pour les écritures des graduations, par exemple)
// Objet est un container dans lequel ajouter le blanc, et qui contient déjà un truc
ajouteRectangleBlanc = function(objet)
{
	var marge = 4 // en pixel
	bounds = objet.getBounds();
	var rect = new createjs.Shape();
			rect.graphics.beginFill('white');
			rect.graphics.drawRect(bounds.x-marge, bounds.y-marge, bounds.width+2*marge, bounds.height+2*marge);
			rect.graphics.endFill();
			
	objet.addChild(rect)
	objet.setChildIndex(rect,0)
}





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


