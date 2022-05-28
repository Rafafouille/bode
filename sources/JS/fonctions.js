


// *******************************************************************
// Fonction qui ajoute une nouvelle fonction de transfert
ajoute_fonction = function(f)
{
	LISTE_FONCTIONS.push(f)
//	f.ajouteLigneArbre();
	updateAffichageListe();
	
	f.redessine_tout()
	FONCTION_GLOBALE.redessine_tout();
	
	SCENE_BODE_GAIN.update()
	SCENE_BODE_PHASE.update()
}


// *******************************************************************
// Fonction qui redessine l'ensemble des fonctions
redessine_toutes_fonctions = function()
{

	FONCTION_GLOBALE.redessine_tout();
	LISTE_FONCTIONS.forEach(function(f)
		{
			f.redessine_tout();
		})
}



// *******************************************************************
// Fonction qui renvoie la référence d'une fonction, en l'appelant par son numéro
getFonctionByNum = function(n=-1)
{
	if(!n)
		return FONCTION_GLOBALE
	for(var i=0 ; i<LISTE_FONCTIONS.length ; i++)
	{
		if(LISTE_FONCTIONS[i].n() == n)
			return LISTE_FONCTIONS[i]
	}
	return null;
}




// *******************************************************************
// Fonction qui fait un "update" de tous les canvas
updateTousLesGraphes = function()
{
	SCENE_BODE_GAIN.update()
	SCENE_BODE_PHASE.update()
}

// ===================================================================
// COULEURS
// ===================================================================

// *******************************************************************
//fonction qui converti une couleur hex en rgb
function hexToRgb(hex)
	{
		// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
		var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace(shorthandRegex, function(m, r, g, b) {
							return r + r + g + g + b + b;
						});
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	}
	
	
//fonction qui convertie une valeur en hexa
function componentToHex(c)
	{
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}
	
	
// *******************************************************************
//Fonction qui converti une couleur rgb en hexa
function rgbToHex(r, g, b)
	{
		return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	}
	

// *******************************************************************
//fonction qui eclaircit une couleur (la distance au blanc sera "bright")
eclaircitCouleurHex=function(c,bright)
	{
		var rgb=hexToRgb(c);
		if(Math.sqrt((255-rgb.r)*(255-rgb.r)+(255-rgb.g)*(255-rgb.g)+(255-rgb.b)*(255-rgb.b))==0)
			var rapport=1;
		else
			var rapport=(255-bright)/(Math.sqrt((255-rgb.r)*(255-rgb.r)+(255-rgb.g)*(255-rgb.g)+(255-rgb.b)*(255-rgb.b)));
		var newRGB={r:Math.floor((rgb.r-255)*rapport+255),g:Math.floor((rgb.g-255)*rapport+255),b:Math.floor((rgb.b-255)*rapport+255)};
		return rgbToHex(newRGB.r,newRGB.g,newRGB.b);
	}
	
	
	
	
	
//Fonction qui efface et recréer la liste des fonctions (HTML)
//===================================================================
updateAffichageListe=function()
	{
		effaceArborescence();
		
		FONCTION_GLOBALE.ajouteLigneArbre();
		
		for(ifct in LISTE_FONCTIONS)
			{
				var fct = LISTE_FONCTIONS[ifct];//Objet equation
				fct.ajouteLigneArbre();
			}

		//Gestion des événements

		//Toggle du titre des fonctions
		$(".fonction .titre-fonction").click(function(){
							if($(this).parent().children(".options-fonctions").is(":visible"))
								$(this).children(".fleche-arbo").css("transform",'rotate(0deg)');
							else
								$(this).children(".fleche-arbo").css("transform",'rotate(90deg)');
							$(this).parent().children(".options-fonctions").slideToggle("fast");//On ouvre/ferme les enfants
					});

		//Toggle des sous-parties
		$(".fonction .options-fonctions .parametres-titre,.fonction .options-fonctions .Affichage-titre").click(function(){
							if($(this).parent().children(".items").is(":visible"))
								$(this).children(".fleche-arbo").css("transform",'rotate(0deg)');
							else
								$(this).children(".fleche-arbo").css("transform",'rotate(90deg)');
							$(this).parent().children(".items").slideToggle("fast");
					});

	}


// Supprime les éléments de l'arborescence
effaceArborescence=function()
	{
		$("#arborescence2").empty();	//Vide l'arborescence
	}




// ***************************************************
// Couleur choisit sur une échelle
// rouge = min
// bleu = max
couleurEchelle = function(val,min,max)
{
	if(val<=min)
		return "#FF0000";
	if(val >= max)
		return "#0000FF";
	
	val = (val-min)/(max-min)
	var R=0
	var G=0
	var B=0
	if(val<0.25)
	{
		R=255
		G=parseInt(val*4*255)
	}
	else if(val<0.5)
	{
		R=parseInt(255*(2-4*val))
		G=255
	}
	else if(val<0.75)
	{
		G=255
		B=parseInt(255*(4*val-2))
	}
	else
	{
		G=parseInt(255*(4-4*val))
		B=255
	}
	return rgbToHex(R,G,B)
}








// **************************************************
// EXPORTER
// **************************************************


// ***************************************************
// Fonction qui met à jour la boite de dialogue pour l'export
updateBoiteExporter = function()
{
	var format = $("#selectTypeExport").val();
	
	if(format=="json")
	{
		$("#description_export").text("Ce format permet de sauvegarder les informations du diagramme sur son disque, en vue de les ré-importer plus tard.")
		$("#outputExport").val(JSON.stringify(getJSON(),null,2))
	}
	else if(format=="svg")
	{
		$("#description_export").text("Format d'image vectoriel.")
		$("#outputExport").val(JSON.stringify(getJSON(true)))
	}
	else if(format=="latex")
	{
		$("#description_export").html('Tracé des diagrammes au format LaTex, avec le <a href="https://sciences-indus-cpge.papanicola.info/Bode-Black-et-Nyquist-avec-Tikz">package de Robert Papanicolas</a>.')
		$("#outputExport").val(JSON.stringify(getJSON(false)))
	}
}


updateNomExport=function()
{
	var nom = $("#nomExport").val();
	var format =  $("#selectTypeExport").val();
	if(format=="json" && nom.substring(nom.length-5).toLowerCase()==".json")
	{
		$("#nomExport").val(nom.substring(0,nom.length-5));
	}
}

// ***********************************************
// Fonction qui prépare les infos au format json
// trace = true si on veut renvoyé la liste des coordonnées des points (en vue de les tracer sur le serveur).
getJSON = function(trace = false)
{
	var retour = {
		version: 1.0,
		parametres: get_parametres_json(),
		fonctions: get_liste_fonctions_json(trace)
		};
	return retour
}


// ***********************************************
// Fonction qui prépare les infos au format json
get_parametres_json = function()
{
	var retour = {
		NOM : NOM,
		GRAPHE_BODE_GDB : {origine : {x:SCENE_BODE_GAIN.calque_principal.x, y: SCENE_BODE_GAIN.calque_principal.y},width : parseInt($("#canvas_bode_gain").attr("width")), height: parseInt($("#canvas_bode_gain").attr("height"))},
		GRAPHE_BODE_PHASE : {origine : {x:SCENE_BODE_PHASE.calque_principal.x, y:SCENE_BODE_PHASE.calque_principal.y}, width : parseInt($("#canvas_bode_phase").attr("width")), height: parseInt($("#canvas_bode_phase").attr("height"))},
		ECHELLE_W : ECHELLE_W,
		ECHELLE_DB : ECHELLE_DB,
		PAS_DB : PAS_DB,
		ECHELLE_PHASE : ECHELLE_PHASE,
		PAS_PHASE : PAS_PHASE,
	};	
	return retour
}


// ***********************************************
// Fonction qui prépare les infos au format json
get_liste_fonctions_json = function(trace = false)
{
	var liste = [FONCTION_GLOBALE.getJSON(trace)];
	LISTE_FONCTIONS.forEach(function(f)
		{
			liste.push(f.getJSON(trace))
		})
		
	return liste
}




// **************************************************
// Fonction qui lance l'ouverture d'un fichier local 
// refFichier est ce qui sort de <input type='file' />
ouvre_fichier_local_JSON = function()
{
	var lecteur = new FileReader();
	lecteur.onload=function(){
		var jsonText = lecteur.result;
	console.log(jsonText)
		chargeJSON(JSON.parse(jsonText));
        }
        lecteur.readAsText($("#dialogImporter_input_fichier")[0].files[0]);
}




// ***************************************************
// Fonction qui charge et parse le fichier JSON
chargeJSON = function(json)
{
	// CHARGEMENT DES OPTIONS GENERALES
	
		var PARAMETRES = json.parametres ;
	
		NOM = PARAMETRES.NOM ;
			$("#nomExport").val(getNomFichierFromSTR(NOM)); // Pour mettre à jour le nom dans la boite d'export
	
		var Bode_Gbd = PARAMETRES.GRAPHE_BODE_GDB ;
		SCENE_BODE_GAIN.calque_principal.x = Bode_Gbd.origine.x ;
		SCENE_BODE_GAIN.calque_principal.y = Bode_Gbd.origine.y ;
		
		var Bode_phase = PARAMETRES.GRAPHE_BODE_PHASE ;
		SCENE_BODE_PHASE.calque_principal.x = Bode_phase.origine.x ;
		SCENE_BODE_PHASE.calque_principal.y = Bode_phase.origine.y ;
		
		ECHELLE_W = PARAMETRES.ECHELLE_W;
		ECHELLE_DB = PARAMETRES.ECHELLE_DB;
		PAS_DB = PARAMETRES.PAS_DB ;
		ECHELLE_PHASE = PARAMETRES.ECHELLE_PHASE ;
		PAS_PHASE = PARAMETRES.PAS_PHASE ;

		N = json.fonctions.length;		// 

		redessine_Grille_BODE_complet();

	// CHARGEMENT DES FONCTIONS
	json.fonctions.forEach(function(f)
	{
		if(f.type != "globale")
		{
			fonction = null;
			switch (f.type)
			{
				case "1er ordre":
					fonction = new Fonction_1er_Ordre(f.parametres.K,f.parametres.tau);
					break;
				case "2ème ordre":
					fonction = new Fonction_2eme_Ordre(f.parametres.K,f.parametres.xi,f.parametres.w0);
					break;
				case "avance de phase":
					fonction = new Fonction_Avance_De_Phase(f.parametres.Kd,f.parametres.Td,f.parametres.a);
					break;
				case "dérivateur":
					fonction = new Fonction_Derivateur(f.parametres.Kd);
					break;
				case "gain":
					fonction = new Fonction_Gain(f.parametres.K);
					break;
				case "intégrateur":
					fonction = new Fonction_Integrateur(f.parametres.Ki);
					break;
				case "PD":
					fonction = new Fonction_PD(f.parametres.Kd,f.parametres.Td);
					break;
				case "PI":
					fonction = new Fonction_PI(f.parametres.Ki,f.parametres.Ti);
					break;
				case "retard de phase":
					fonction = new Fonction_Retard_De_Phase(f.parametres.Ki,f.parametres.Ti,f.parametres.a);
					break;
				default:
					fonction = null;
			}
			if(fonction != null)
			{
				ajoute_fonction(fonction);
				fonction.setUpOptionsFromJson(f); //Met à jour les options (couleur, etc.)
			}
			else
			{
				console.log("=========================================")
				console.log("Erreur de chargement. Objet JSON reçu :");
				console.log(f)
			}
		}
		else // Si c'est la fonction globale
		{
			FONCTION_GLOBALE.setUpOptionsFromJson(f);
		}
	});
}



// ***********************************************
// Fonction qui convertit la chaîne de caractère n en une autre chaine compatible avec un nom de fichier
getNomFichierFromSTR = function(n)
{
	return n.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}
