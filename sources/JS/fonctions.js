
//Fonction qui efface et recréer la liste des fonctions
//===================================================================
updateAffichageListe=function()
	{
		effaceArborescence();
		
		for(fct in listeFonctions)
			{
				var eq=listeFonctions[fct];//Objet equation
				eq.ajouteLigneArbre(fct);
			}

		//Gestion des événements

		//Toggle du titre des fonctions
		$(".fonction .titre-fonction").click(function(){
							if($(this).parent().children(".options-fonctions").is(":visible"))
								$(this).children(".fleche-arbo").css("transform",'rotate(0deg)');
							else
								$(this).children(".fleche-arbo").css("transform",'rotate(90deg)');
							$(this).parent().children(".options-fonctions").slideToggle("slow");//On ouvre/ferme les enfants
					});

		//Toggle des sous-parties
		$(".fonction .options-fonctions .parametres-titre,.fonction .options-fonctions .Affichage-titre").click(function(){
							if($(this).parent().children(".items").is(":visible"))
								$(this).children(".fleche-arbo").css("transform",'rotate(0deg)');
							else
								$(this).children(".fleche-arbo").css("transform",'rotate(90deg)');
							$(this).parent().children(".items").slideToggle("fast");
					});

		//Old
		/*$("#arborescence").treetable('collapseAll');*/
	}



effaceArborescence=function()
	{
		$("#arborescence2").empty();	//Vide l'arborescence

		//Old
		/*for(fct in listeFonctions)//Pour chaque fonction de la liste
			{
				if($("#arborescence").treetable("node",fct)!=undefined)
					{
						$("#arborescence").treetable("removeNode",fct);
					}
			}*/
	}



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

//Fonction qui met en forme une division
fraction=function(n,d)
	{	
		return '<sub><div class="division">'+n+'<br/><hr/>'+d+'</div></sub>';
	}



//===================================================================


//Simple raccourci vers la fonction Math.log10
log10=function(x)
	{
		return Math.log(x)/Math.log(10);
	}




//Cree le contenu XML
getExportXML=function()
{
	var rendu=	"<?xml version = \"1.0\" encoding=\"UTF-8\" standalone=\"yes\" ?>\n"+
					"<!-- Généré par http://bode.allais.eu -->\n"+
					"<bodeOnline version=\""+versionSauvegarde+"\">\n"+
					"	<options>\n"+
					"		<physicien>"+$("#boutonSIPhysique-Phy").prop("checked")+"</physicien>\n"+
					"	</options>\n"+
					grapheBodeGdb.exportXML()+
					grapheBodePhase.exportXML();
				for(i in listeFonctions)
					{
						fct=listeFonctions[i];
						rendu+=fct.exportXML();
					}
				rendu+=	"</bodeOnline>";
	return rendu;

}

//Crée le contenu LaTex
getExportLaTex=function()
{
	var rendu="\\begin{tikzpicture}\n";

	//Gain en Db
	rendu+=grapheBodeGdb.exportLaTex();
	//Phase
	rendu+=grapheBodePhase.exportLaTex();

	rendu+="\\end{tikzpicture}";

	return rendu;
}


//Crée le contenu SVG
getExportSVG=function()
{
	var rendu="<?xml version=\"1.0\" standalone=\"no\"?>\n"+
	"<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n"+
	"<svg width=\""+Math.max(grapheBodeGdb.width(),grapheBodePhase.width())+"\" height=\""+($("#bouton_affiche_Bode_Gdb")[0].checked*grapheBodeGdb.height()+$("#bouton_affiche_Bode_Phase")[0].checked*grapheBodePhase.height()+20*$("#bouton_affiche_Bode_Phase")[0].checked*$("#bouton_affiche_Bode_Gdb")[0].checked)+"\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n\n"+
	"<title>Diagramme de Bode</title>\n"+
	"//Généré par http://bode.allais.eu\n\n";

	if($("#bouton_affiche_Bode_Gdb")[0].checked)//Si le graphe de gain est affiché...
		rendu+=grapheBodeGdb.exportSVG();
	if($("#bouton_affiche_Bode_Phase")[0].checked)//Si le graphe de gain est affiché...
		rendu+=grapheBodePhase.exportSVG("translate(0,"+(grapheBodeGdb.height()+20)+")");
	
	rendu+="</svg>";

	return rendu;
}


//Fonction qui rempli le formulaire avec le code exporté
updateExport=function()
	{
		var rendu="Pas encore implémenté";	//Par défaut
		if($("#dialogExport select").val()=="LaTex")	//Si LaTex ========
			{
				rendu=getExportLaTex();
			}
		if($("#dialogExport select").val()=="SVG")	//Si LaTex ========
			{
				rendu=getExportSVG();
			}
		if($("#dialogExport select").val()=="XML")	//Si LaTex ========
			{
				rendu=getExportXML();
			}	
		
		$("#dialogExport textarea").text(rendu);
		ga('send', 'event', 'exports', 'afficher', $("#formatExport option:selected").val()); //Statistiques Google
	}



//Met à jour toutes les courbes
updateAllCourbes=function()
	{
		for(i in listeFonctions)
			{
				eq=listeFonctions[i];
				eq.updateCourbes(false);
			}
	}









//Fonction qui permet d'inclure des pages web (un peu comme include en php)
// voir --> http://www.boutell.com/newfaq/creating/include.html
function clientSideInclude(id, url) {
  var req = false;
  // For Safari, Firefox, and other non-MS browsers
  if (window.XMLHttpRequest) {
    try {
      req = new XMLHttpRequest();
    } catch (e) {
      req = false;
    }
  } else if (window.ActiveXObject) {
    // For Internet Explorer on Windows
    try {
      req = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        req = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {
        req = false;
      }
    }
  }
 var element = document.getElementById(id);
 if (!element) {
  alert("Bad id " + id +
   "passed to clientSideInclude." +
   "You need a div or span element " +
   "with this id in your page.");
  return;
 }
  if (req) {
    // Synchronous request, wait till we have it all
    req.open('GET', url, false);
    req.send(null);
    element.innerHTML = req.responseText;
  } else {
    element.innerHTML =
   "Sorry, your browser does not support " +
      "XMLHTTPRequest objects. This page requires " +
      "Internet Explorer 5 or better for Windows, " +
      "or Firefox for any system, or Safari. Other " +
      "compatible browsers may also exist.";
  }
}


//Fonction appelée pour envoyer le fichier à télécharger depuis le serveur (--> AJAX)
function sendForDownload(contenu,type)
	{
		alert(contenu);
	}


//Tableau associatif contenant la liste des couleurs standard de LaTex
couleursLaTexConnues={
"#000000":"black",
"#0000FF":"blue",
"#BF8040":"brown",
"#00AEEF":"cyan",
"#404040":"darkgray",
"#808080":"gray",
"#00FF00":"green",
"#BFBFBF":"lightgray",
"#BFFF00":"lime",
"#ED028C":"magenta",
"#968D00":"olive",
"#FF8000":"orange",
"#FFBFBF":"pink",
"#BF0040":"purple",
"#FF0000":"red",
"#008080":"teal",
"#800080":"violet",
"#FFFFFF":"white",
"#FFF101":"yellow"
}



//Fonction qui renvoie une chaine de caractère représentant un nombre avec au moins un chiffre après la virgule
//(int--> float)
function int2strfloat(n)
	{
		if(n==parseInt(n))
			return n.toFixed(1);
		return n;
	}

	
	
	
// Fonction	qui permet de créer l'objet HTML Request
function getXMLHttpRequest() {
	var xhr = null;
	
	if (window.XMLHttpRequest || window.ActiveXObject) {
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
		} else {
			xhr = new XMLHttpRequest(); 
		}
	} else {
		alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
		return null;
	}
	
	return xhr;
}








//Fonction qui met à jour le menu des garphiques
function updateMenuGraphe()
	{
		//Gain en Db
			//Visibilité
			if(grapheBodeGdb.visible())
				$("#bouton_affiche_Bode_Gdb").attr("checked","checked");
			else
				$("#bouton_affiche_Bode_Gdb").removeAttr("checked");
			//Wmin
			$("#champ_bode_gain_w_min").val(grapheBodeGdb.bornesX().mini);
			//Wmax
			$("#champ_bode_gain_w_max").val(grapheBodeGdb.bornesX().maxi);
			//Gdb min
			$("#champ_bode_gain_Gdb_min").val(grapheBodeGdb.bornesY().mini);
			//Gdb max
			$("#champ_bode_gain_Gdb_max").val(grapheBodeGdb.bornesY().maxi);
			//Echelle x
			$("#champ_bode_gain_echelle_X").val(grapheBodeGdb.echelle().x);
			//Echelle y
			$("#champ_bode_gain_echelle_Y").val(grapheBodeGdb.echelle().y);
		//Phase
			//Visibilité
			if(grapheBodePhase.visible())
				$("#bouton_affiche_Bode_Phase").attr("checked","checked");
			else
				$("#bouton_affiche_Bode_Phase").removeAttr("checked");
			//Wmin
			$("#champ_bode_phase_w_min").val(grapheBodePhase.bornesX().mini);
			//Wmax
			$("#champ_bode_phase_w_max").val(grapheBodePhase.bornesX().maxi);
			//Gdb min
			$("#champ_bode_phase_Gdb_min").val(grapheBodePhase.bornesY().mini);
			//Gdb max
			$("#champ_bode_phase_Gdb_max").val(grapheBodePhase.bornesY().maxi);
			//Echelle x
			$("#champ_bode_phase_echelle_X").val(grapheBodePhase.echelle().x);
			//Echelle y
			$("#champ_bode_phase_echelle_Y").val(grapheBodePhase.echelle().y);


	}





//Charge un enregistrement à partir d'un fichier XML
loadXML=function(xml)
	{
		//Suppression des anciennes courbes
		for(i in listeFonctions)
			listeFonctions[i].destroy();

		cVersion=$(xml).children(0).parent().attr("version");

		//Physique
		if(Number($(xml).find("physicien").text()))
			$("#boutonSIPhysique-SI").attr('checked','checked');
		else
			$("#boutonSIPhysique-Phy").attr('checked','checked');

		//Graphique Gdb
		/*if(Number($(xml).find("diagram[type=\"bode-Gdb\"]").find("affiche").text()))
			{
				$("#bouton_affiche_Bode_Gdb").attr("checked","checked");
				//$("#graphique-bode-gdb").css("display","block");
			}
		else
			{
				$("#bouton_affiche_Bode_Gdb").removeAttr("checked");
				//$("#graphique-bode-gdb").css("display","none");
			}*/
		toto=
		grapheBodeGdb.loadXML($(xml).find("diagram[type=\"bode-Gdb\"]"));
		
		
		//Graphique Phase
		if(Number($(xml).find("diagram[type=\"bode-Phase\"]").find("affiche").text()))
			{
				$("#bouton_affiche_Bode_Phase").attr("checked","checked");
				$("#graphique-bode-phase").css("display","block");
			}
		else
			{
				$("#bouton_affiche_Bode_Phase").removeAttr("checked");
				$("#graphique-bode-phase").css("display","none");
			}
		grapheBodePhase.loadXML($(xml).find("diagram[type=\"bode-Phase\"]"));

		updateMenuGraphe();//Met à jour le menu d'option des graphiques
		
		//Les fonctions
		//On supprime tout d'abord
		while(listeFonctions.length>0)
			{
				eq=listeFonctions[0];
				eq.destroy();
				listeFonctions.splice(0,1);
			}
			
		$(xml).find("fonction").each(function(){
		
					var type=$(this).attr("type");
					switch(type)
						{
							case "globale":
								var fct=new FonctionGlobale();
								break;
							case "1erOrdre":
								var fct=new PremierOrdre(1,1); //Valeurs arbitraires
								break;
							case "2emeOrdre":
								var fct=new DeuxiemeOrdre(1,1,1);//Valeurs arbitraires
								break;
							case "gain":
								var fct=new Gain(1);//Valeurs arbitraires
								break;
							case "derivee":
								var fct=new Derivee(1);//Valeurs arbitraires
								break;
							case "integrale":
								var fct=new Integrale(1);//Valeurs arbitraires
								break;
							case "PID":
								var fct=new PIDSerie(1,1,1);//Valeurs arbitraires
								break;
							case "PI":
								var fct=new PI(1,1);//Valeurs arbitraires
								break;
							case "PD":
								var fct=new PD(1,1);//Valeurs arbitraires
								break;
							case "avanceDePhase":
								var fct=new AvancePhase(1,1,1);//Valeurs arbitraires
								break;
							case "retardDePhase":
								var fct=new RetardPhase(1,1,1);//Valeurs arbitraires
								break;
							default :
								var fct=false;
								break;
						}
						
					if(fct)
						{
							fct.loadXML(this);
							listeFonctions.push(fct);
							fct.updateCourbes(false);
						}
				});
		

		updateAffichageListe();
		grapheBodeGdb.draw();//update le graphique Gdb
		grapheBodePhase.draw();
	}

//Pour afficher un message
function debug(d)
	{
		console.log(d);
	}



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

//Fonction qui converti une couleur rgb en hexa
function rgbToHex(r, g, b)
	{
		return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	}
