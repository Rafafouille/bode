
///////////////////////////////////:
// BOUTONS DU MENU
///////////////////////////////////


//Chargement BDD
$("#boutonChargementBDD").click(
				function()
					{
						$("#dialogChargementBDD").dialog('open');//On affiche la boite
					}
			);

//Sauvegarde BDD
$("#boutonSauvegardeBDD").click(
				function()
					{
						$("#contenuSauvegardeXML").val(getExportXML());
						$("#dialogSauvegardeBDD").dialog('open');//On affiche la boite
					}
			);

//Nouveau 1er ordre
$("#boutonNouveau1erOrdre").click(
				function()
					{
						$("#dialogNouveau1erOrdre").dialog('open');//On affiche la boite
					}
			);
//Nouveau 2eme ordre
$("#boutonNouveau2emeOrdre").click(
				function()
					{
						if($("input[name=boutonSIPhysique]:checked").val()=="SI")
							{
								$("#labelNouveau2emeOrdreZ,#nouveau2emeOrdreZ").css("display","inline");
								$("#labelNouveau2emeOrdreQ,#nouveau2emeOrdreQ").css("display","none");
							}
						else
							{
								$("#labelNouveau2emeOrdreQ,#nouveau2emeOrdreQ").css("display","inline");
								$("#labelNouveau2emeOrdreZ,#nouveau2emeOrdreZ").css("display","none");
								
							}
						$("#dialogNouveau2emeOrdre").dialog('open');//On affiche la boite
					}
			);
//Nouveau Gain
$("#boutonNouveauGain").click(
				function()
					{
						$("#dialogNouveauGain").dialog('open');//On affiche la boite
					}
			);
//Nouveau Dérivée
$("#boutonNouvelleDerivee").click(
				function()
					{
						$("#dialogNouvelleDerivee").dialog('open');//On affiche la boite
					}
			);
//Nouveau Intégral
$("#boutonNouvelleIntegrale").click(
				function()
					{
						$("#dialogNouvelleIntegrale").dialog('open');//On affiche la boite
					}
			);
//Nouveau PID-Serie
$("#boutonNouveauPIDSerie").click(
				function()
					{
						$("#dialogNouveauPIDSerie").dialog('open');//On affiche la boite
					}
			);
//Nouveau PI
$("#boutonNouveauPI").click(
				function()
					{
						$("#dialogNouveauPI").dialog('open');//On affiche la boite
					}
			);
//Nouveau PD
$("#boutonNouveauPD").click(
				function()
					{
						$("#dialogNouveauPD").dialog('open');//On affiche la boite
					}
			);
//Nouveau Avance Phase
$("#boutonNouveauAvancePhase").click(
				function()
					{
						$("#dialogNouveauAvancePhase").dialog('open');//On affiche la boite
					}
			);
//Nouveau Retard Phase
$("#boutonNouveauRetardPhase").click(
				function()
					{
						$("#dialogNouveauRetardPhase").dialog('open');//On affiche la boite
					}
			);
//Exporter LaTex
$("#boutonCompileLaTex").click(
				function()
					{
						$("#dialogExport").dialog('open');//On affiche la boite
						$('#formatExport option[value="LaTex"]').attr("selected","selected");//On pré-selectionne l'option du format
						updateExport();
					}
			);
//Exporter SVG
$("#boutonCompileSVG").click(
				function()
					{
						$("#dialogExport").dialog('open');//On affiche la boite
						$('#formatExport option[value="SVG"]').attr("selected","selected");//On pré-selectionne l'option du format
						updateExport();
					}
			);
//Exporter XML
$("#boutonCompileXML").click(
				function()
					{
						$("#dialogExport").dialog('open');//On affiche la boite
						$('#formatExport option[value="XML"]').attr("selected","selected");//On pré-selectionne l'option du format
						updateExport();
					}
			);

//A propos
$("#boutonAPropos").click(
				function()
					{
						$("#dialogAPropos").dialog('open');//On affiche la boite
					}
			);

//A faire
$("#boutonAFaire").click(
				function()
					{
						$("#dialogAFaire").dialog('open');//On affiche la boite
					}
			);

///////////////////////////////////:
// CREATION DE BLOCS
///////////////////////////////////

//Nouveau 1er ordre
function actionAjouter1erOrdre(K,tau,inv)
	{
		var new1erOrdre=new PremierOrdre(K,tau);
		new1erOrdre.inverse(inv);
		listeFonctions.push(new1erOrdre);	//Ajoute à la liste des fonctions
		updateAffichageListe();
		new1erOrdre.updateCourbes();//On trace la courbe
	}
//Nouveau 2eme ordre
function actionAjouter2emeOrdre(K,w0,z,inv)
	{
		var new2emeOrdre=new DeuxiemeOrdre(K,w0,z);
		new2emeOrdre.inverse(inv);
		listeFonctions.push(new2emeOrdre);	//Ajoute à la liste des fonctions
		updateAffichageListe();
		new2emeOrdre.updateCourbes();//On trace la courbe
	}
//Nouveau Gain
function actionAjouterGain(K,inv)
	{
		var newGain=new Gain(K);
		newGain.inverse(inv);
		listeFonctions.push(newGain);	//Ajoute à la liste des fonctions
		updateAffichageListe();
		newGain.updateCourbes();//On trace la courbe
	}
//Nouvelle Derivee
function actionAjouterDerivee(K,inv)
	{
		var newDerivee=new Derivee(K);
		newDerivee.inverse(inv);
		listeFonctions.push(newDerivee);	//Ajoute à la liste des fonctions
		updateAffichageListe();
		newDerivee.updateCourbes();//On trace la courbe
	}
//Nouvelle Integrale
function actionAjouterIntegrale(K,inv)
	{
		var newIntegrale=new Integrale(K);
		newIntegrale.inverse(inv);
		listeFonctions.push(newIntegrale);	//Ajoute à la liste des fonctions
		updateAffichageListe();
		newIntegrale.updateCourbes();//On trace la courbe
	}
//Nouveau PID-Série
function actionAjouterPIDSerie(Kp,Ti,Td,inv)
	{
		var newPIDSerie=new PIDSerie(Kp,Ti,Td);
		newPIDSerie.inverse(inv);
		listeFonctions.push(newPIDSerie);	//Ajoute à la liste des fonctions
		updateAffichageListe();
		newPIDSerie.updateCourbes();//On trace la courbe
	}
//Nouveau PI
function actionAjouterPI(Kp,Ti,inv)
	{
		var newPI=new PI(Kp,Ti);
		newPI.inverse(inv);
		listeFonctions.push(newPI);	//Ajoute à la liste des fonctions
		updateAffichageListe();
		newPI.updateCourbes();//On trace la courbe
	}
//Nouveau PD
function actionAjouterPD(Kp,Td,inv)
	{
		var newPD=new PD(Kp,Td);
		newPD.inverse(inv);
		listeFonctions.push(newPD);	//Ajoute à la liste des fonctions
		updateAffichageListe();
		newPD.updateCourbes();//On trace la courbe
	}
//Nouveau Avance Phase
function actionAjouterAvancePhase(Kp,Ti,a,inv)
	{
		var newAvancePhase=new AvancePhase(Kp,Ti,a);
		newAvancePhase.inverse(inv);
		listeFonctions.push(newAvancePhase);	//Ajoute à la liste des fonctions
		updateAffichageListe();
		newAvancePhase.updateCourbes();//On trace la courbe
	}
//Nouveau Retard Phase
function actionAjouterRetardPhase(Kp,Ti,a,inv)
	{
		var newRetardPhase=new RetardPhase(Kp,Ti,a);
		newRetardPhase.inverse(inv);
		listeFonctions.push(newRetardPhase);	//Ajoute à la liste des fonctions
		updateAffichageListe();
		newRetardPhase.updateCourbes();//On trace la courbe
	}
//Supprime fonction
function supprimeFonction(i)
	{
		effaceArborescence();
		eq=listeFonctions[i];
		eq.destroy();
		listeFonctions.splice(i,1);
		updateAffichageListe();
		listeFonctions[0].updateCourbes();
	}





//Update Bornes graphiques ////////////////

//Bode - gain
function updateBodeGainBorneW()
	{
		var Wmin=parseInt($("#champ_bode_gain_w_min").val());//On recupere la valeur de Wmin
			$("#champ_bode_gain_w_min").val(Wmin);//Remplace par l'entier (dans le cas de nombre a virgule)
		var Wmax=parseInt($("#champ_bode_gain_w_max").val());//On recupere la valeur de Wmax
			$("#champ_bode_gain_w_max").val(Wmax);//Remplace par l'entier (dans le cas de nombre a virgule)
		grapheBodeGdb.bornesX({mini:Wmin,maxi:Wmax});//Mise a jour des axes
		grapheBodeGdb.draw();
	}

function updateBodeGainBorneGdb()
	{
		var GdbMin=parseInt($("#champ_bode_gain_Gdb_min").val());//On recupere la valeur de Gbd min
			$("#champ_bode_gain_Gdb_min").val(GdbMin);//Remplace par l'entier (dans le cas de nombre a virgule)
		var GdbMax=parseInt($("#champ_bode_gain_Gdb_max").val());//On recupere la valeur de Gbd max
			$("#champ_bode_gain_Gdb_max").val(GdbMax);//Remplace par l'entier (dans le cas de nombre a virgule)
		grapheBodeGdb.bornesY({mini:GdbMin,maxi:GdbMax});//Mise a jour des axes
		grapheBodeGdb.draw();
	}
function updateBodeGainEchelleX()
	{
		var echelleX=parseFloat($("#champ_bode_gain_echelle_X").val());//On recupere la valeur de l'echelle en X
		grapheBodeGdb.echelleX(echelleX);//Mise a jour des axes
		updateAllCourbes();
		grapheBodeGdb.draw();
	}
function updateBodeGainEchelleY()
	{
		var echelleY=parseFloat($("#champ_bode_gain_echelle_Y").val());//On recupere la valeur de Wmin
		grapheBodeGdb.echelleY(echelleY);//Mise a jour des axes
		updateAllCourbes();
		grapheBodeGdb.draw();
	}
//Bode - phase
function updateBodePhaseBorneW()
	{
		var Wmin=parseInt($("#champ_bode_phase_w_min").val());//On recupere la valeur de Wmin
			$("#champ_bode_phase_w_min").val(Wmin);//Remplace par l'entier (dans le cas de nombre a virgule)
		var Wmax=parseInt($("#champ_bode_phase_w_max").val());//On recupere la valeur de Wmax
			$("#champ_bode_phase_w_max").val(Wmax);//Remplace par l'entier (dans le cas de nombre a virgule)
		grapheBodePhase.bornesX({mini:Wmin,maxi:Wmax});//Mise a jour des axes
		grapheBodePhase.draw();
	}
function updateBodePhaseBornePhi()
	{
		var PhiMin=parseInt($("#champ_bode_phase_phi_min").val());//On recupere la valeur de Wmin
			$("#champ_bode_phase_phi_min").val(PhiMin);//Remplace par l'entier (dans le cas de nombre a virgule)
		var PhiMax=parseInt($("#champ_bode_phase_phi_max").val());//On recupere la valeur de Wmax
			$("#champ_bode_phase_phi_max").val(PhiMax);//Remplace par l'entier (dans le cas de nombre a virgule)
		grapheBodePhase.bornesY({mini:PhiMin,maxi:PhiMax});//Mise a jour des axes
		grapheBodePhase.draw();
	}
function updateBodePhaseEchelleX()
	{
		var echelleX=parseFloat($("#champ_bode_phase_echelle_X").val());//On recupere la valeur de l'echelle en X
		grapheBodePhase.echelleX(echelleX);//Mise a jour des axes
		updateAllCourbes();
		grapheBodePhase.draw();
	}
function updateBodePhaseEchelleY()
	{
		var echelleY=parseFloat($("#champ_bode_phase_echelle_Y").val());//On recupere la valeur de Wmin
		grapheBodePhase.echelleY(echelleY);//Mise a jour des axes
		updateAllCourbes();
		grapheBodePhase.draw();
	}

//Met a jour K quand on le modifie à la main
function updateParametreK(i,val)//i
	{
		val=Math.abs(parseFloat(val));//Conversion flottant et valeur absolue
		eq=listeFonctions[i];
		//eq.K($("#formParamK"+i).val());//A supprimer
		//eq.K($("#"+i+"-param-K").val());
		if(val!=eq.K())	//On ne change l'affichage que si la valeur change (sinon on ne plus taper de virgules...)
			{
				$('#'+i+'-input-param-K-number').val(val);
				$('#'+i+'-input-param-K-range').val(log10(val));
			}
		eq.K(val);
		eq.updateCourbes();
		//grapheBodeGdb.draw();
		//grapheBodePhase.draw();
	}

//Met a jour Tau quand on le modifie à la main
function updateParametreTau(i,val)
	{
		val=Math.abs(parseFloat(val));//Conversion flottant et valeur absolue
		eq=listeFonctions[i];
		//eq.tau($("#formParamTau"+i).val());
		//eq.tau($("#"+i+"-param-tau").val());
		if(val!=eq.tau())	//On ne change l'affichage que si la valeur change (sinon on ne plus taper de virgules...)
			{
				$('#'+i+'-input-param-tau-number').val(val);
				$('#'+i+'-input-param-tau-range').val(log10(val));
			}
		eq.tau(val);
		eq.updateCourbes();
		//grapheBodeGdb.draw();
		//grapheBodePhase.draw();
	}

//Met a jour w0 quand on le modifie à la main
function updateParametreW0(i,val)
	{
		val=Math.abs(parseFloat(val));//Conversion flottant et valeur absolue
		eq=listeFonctions[i];
		//eq.w0($("#formParamW0"+i).val());
		//eq.w0($("#"+i+"-param-w0").val());
		if(val!=eq.w0())	//On ne change l'affichage que si la valeur change (sinon on ne plus taper de virgules...)
			{
				$('#'+i+'-input-param-w0-number').val(val);
				$('#'+i+'-input-param-w0-range').val(log10(val));
			}
		eq.w0(val);
		eq.updateCourbes();
		//grapheBodeGdb.draw();
		//grapheBodePhase.draw();
	}

//Met a jour z quand on le modifie à la main
function updateParametreZ(i,val)
	{
		val=Math.abs(parseFloat(val));//Conversion flottant et valeur absolue
		eq=listeFonctions[i];
		//eq.z($("#formParamZ"+i).val());
		//eq.z($("#"+i+"-param-z").val());
		if(val!=eq.z())	//On ne change l'affichage que si la valeur change (sinon on ne plus taper de virgules...)
			{
				$('#'+i+'-input-param-z-number').val(val);
				$('#'+i+'-input-param-z-range').val(val);
			}
		eq.z(val);
		eq.updateCourbes();
		//grapheBodeGdb.draw();
		//grapheBodePhase.draw();
	}

//Met a jour Q (=1/2z) quand on le modifie à la main
function updateParametreQ(i,val)
	{
		val=Math.abs(parseFloat(val));//Conversion flottant et valeur absolue
		eq=listeFonctions[i];
		//eq.z($("#formParamZ"+i).val());
		//eq.z($("#"+i+"-param-z").val());
		if(val!=eq.Q())	//On ne change l'affichage que si la valeur change (sinon on ne plus taper de virgules...)
			{
				$('#'+i+'-input-param-Q-number').val(val);
				$('#'+i+'-input-param-Q-range').val(log10(20*val)/log10(20*10));
			}
		eq.Q(val);
		eq.updateCourbes();
		//grapheBodeGdb.draw();
		//grapheBodePhase.draw();
	}

//Met a jour Kp quand on le modifie à la main
function updateParametreKp(i,val)
	{
		val=Math.abs(parseFloat(val));//Conversion flottant et valeur absolue
		eq=listeFonctions[i];
		if(val!=eq.Kp())	//On ne change l'affichage que si la valeur change (sinon on ne plus taper de virgules...)
			{
				$('#'+i+'-input-param-Kp-number').val(val);
				$('#'+i+'-input-param-Kp-range').val(log10(val));
			}
		eq.Kp(val);
		eq.updateCourbes();
		//grapheBodeGdb.draw();
		//grapheBodePhase.draw();
	}
	
	
//Met a jour Ti quand on le modifie à la main
function updateParametreTi(i,val)
	{
		val=Math.abs(parseFloat(val));//Conversion flottant et valeur absolue
		eq=listeFonctions[i];
		if(val!=eq.Ti())	//On ne change l'affichage que si la valeur change (sinon on ne plus taper de virgules...)
			{
				$('#'+i+'-input-param-Ti-number').val(val);
				$('#'+i+'-input-param-Ti-range').val(log10(val));
			}
		eq.Ti(val);
		eq.updateCourbes();
		//grapheBodeGdb.draw();
		//grapheBodePhase.draw();
	}
	
	
//Met a jour Td quand on le modifie à la main
function updateParametreTd(i,val)
	{
		val=Math.abs(parseFloat(val));//Conversion flottant et valeur absolue
		eq=listeFonctions[i];
		if(val!=eq.Td())	//On ne change l'affichage que si la valeur change (sinon on ne plus taper de virgules...)
			{
				$('#'+i+'-input-param-Td-number').val(val);
				$('#'+i+'-input-param-Td-range').val(log10(val));
			}
		eq.Td(val);
		eq.updateCourbes();
		//grapheBodeGdb.draw();
		//grapheBodePhase.draw();
	}
	
	
//Met a jour Td quand on le modifie à la main
function updateParametreA(i,val)
	{
		val=Math.abs(parseFloat(val));//Conversion flottant et valeur absolue
		eq=listeFonctions[i];
		if(val!=eq.a())	//On ne change l'affichage que si la valeur change (sinon on ne plus taper de virgules...)
			{
				$('#'+i+'-input-param-a-number').val(val);
				$('#'+i+'-input-param-a-range').val(log10(val));
			}
		eq.a(val);
		eq.updateCourbes();
		//grapheBodeGdb.draw();
		//grapheBodePhase.draw();
	}
	
//Affiche ou cache le grpahe Bode Gdb (OBSOLETE Replace par une methode dans les graphiques...)
/*function afficheCacheBodeGdb()
	{
		if($("#bouton_affiche_Bode_Gdb")[0].checked)
			$("#graphique-bode-gdb").css("display","block");
		else
			$("#graphique-bode-gdb").css("display","none");
	}*/

//Affiche ou cache le grpahe Bode Gdb (OBSOLETE Replace par une methode dans les graphiques...)
/*function afficheCacheBodePhase()
	{
		if($("#bouton_affiche_Bode_Phase")[0].checked)
			$("#graphique-bode-phase").css("display","block");
		else
			$("#graphique-bode-phase").css("display","none");
	}*/


//A supprimer ! ----------
function updateBornesWFonction(i)
	{
		var eq=listeFonctions[i];
		var wmin=parseFloat($("#wmin"+i).val());
		var wmax=parseFloat($("#wmax"+i).val());
		eq.bornesW({mini:wmin,maxi:wmax});
		eq.updateCourbes();
		//grapheBodeGdb.draw();
		//grapheBodePhase.draw();
	}

function updateBorneInfWFonction(i,val)
	{
		eq=listeFonctions[i];
		eq.bornesW({mini:parseFloat(val),maxi:eq.bornesW().maxi});
		eq.updateCourbes();
		//grapheBodeGdb.draw();
		//grapheBodePhase.draw();
	}

function updateBorneSupWFonction(i,val)
	{
		eq=listeFonctions[i];
		eq.bornesW({mini:eq.bornesW().mini,maxi:parseFloat(val)});
		eq.updateCourbes();
		//grapheBodeGdb.draw();
		//grapheBodePhase.draw();
	}

function updateNbPointsFonction(i)
	{
		var nbP=parseInt($("#nbPoints"+i).val());
		var eq=listeFonctions[i];
		$("#nbPoints"+i).val(nbP);//Juste histoire d'arrondir à l'entier et actualiser l'affichage
		eq.nbPoints(nbP);
		eq.updateCourbes();
		//grapheBodeGdb.draw();
		//grapheBodePhase.draw();
	}


function updateAfficheAnalytique(i,checked)
	{
		var eq=listeFonctions[i];	//Recupere la fonction
		eq.afficheAnalytique(checked);	//Met à jour le parametre
		eq.updateCourbes();	//Demande de refaire les courbes
		if(checked)	//Si on affiche...
			{
				$('#'+i+'-typeTraitAnalytique').css('display','inline');	//On affiche le choix des trait
				$('#'+i+'-epaisseurAnalytique').css('display','inline');	//On affiche le choix de l'épaisseur
			}
		else
			{
				$('#'+i+'-typeTraitAnalytique').css('display','none');	//On affiche pas le choix des traits
				$('#'+i+'-epaisseurAnalytique').css('display','none');	//On affiche pas le choix de l'épaisseur
			}
	}

function updateAfficheAsymptotique(i,checked)
	{

		var eq=listeFonctions[i];	//Recupere la fonction
		eq.afficheAsymptotique(checked);	//Met à jour le parametre
		eq.updateCourbes();	//Demande de refaire les courbes
		if(checked)	//Si on affiche...
			{
				$('#'+i+'-typeTraitAsympt').css('display','inline');	//On affiche le choix des trait
				$('#'+i+'-epaisseurAsymptotique').css('display','inline');	//On affiche le choix de l'épaisseur
			}
		else
			{
				$('#'+i+'-typeTraitAsympt').css('display','none');	//On affiche pas le choix des traits
				$('#'+i+'-epaisseurAsymptotique').css('display','none');	//On affiche le choix de l'épaisseur
			}
	}


function updateEpaisseurAnalytique(i,val)
	{

		var eq=listeFonctions[i];	//Recupere la fonction
		eq.epaisseurAnalytique(val);	//Met à jour le parametre
		eq.updateCourbes();	//Demande de refaire les courbes
	}

function updateEpaisseurAsymptotique(i,val)
	{

		var eq=listeFonctions[i];	//Recupere la fonction
		eq.epaisseurAsymptotique(val);	//Met à jour le parametre
		eq.updateCourbes();	//Demande de refaire les courbes
	}


function updateTypeTraitAnalytique(i,val)
	{
		var eq=listeFonctions[i];	//Recupere la fonction
		eq.typeTraitAnalytique(val);	//Met à jour le parametre
		eq.updateCourbes();	//Demande de refaire les courbes
	}

function updateTypeTraitAsymptotique(i,val)
	{
		var eq=listeFonctions[i];	//Recupere la fonction
		eq.typeTraitAsymptotique(val);	//Met à jour le parametre
		eq.updateCourbes();	//Demande de refaire les courbes
	}

function updateCouleur(i,val)
	{
		var eq=listeFonctions[i];	//Recupere la fonction
		eq.couleur(val);	//Met à jour le parametre
		eq.updateCourbes();	//Demande de refaire les courbes
		$("#"+i+"-carreCouleur").css("color",val);//Carre couleur
		$("#fonction-"+i+" .titre-fonction").css("background-color",eclaircitCouleurHex(val,150));//Fond titre Fonction
		$("#fonction-"+i+"").css("background-color",eclaircitCouleurHex(val,220));//Fond option fonction
	}

function updatenbPoints(i,val)
	{
		var eq=listeFonctions[i];	//Recupere la fonction
		eq.nbPoints(val);	//Met à jour le parametre
		$('#'+i+'-input-nbPoints-number').val(val);
		$('#'+i+'-input-nbPoints-range').val(val);
		eq.updateCourbes();	//Demande de refaire les courbes
	}

function updateAfficheMargeDeGain(checked)
	{
		var eq=listeFonctions[0];	//Recupere la fonction
		eq.afficheMargeDeGain(checked);	//Met à jour le parametre
		eq.updateCourbes();	//Demande de refaire les courbes
	}

function updateAfficheMargeDePhase(checked)
	{
		var eq=listeFonctions[0];	//Recupere la fonction
		eq.afficheMargeDePhase(checked);	//Met à jour le parametre
		eq.updateCourbes();	//Demande de refaire les courbes
	}

//Fonction qui envoie la sauvegarde avec AJAX ---------------------
$('#formeDialogueSauveBDD').on('submit', function(e) {
        e.preventDefault(); // J'empêche le comportement par défaut du navigateur, c-à-d de soumettre le formulaire
 
        var $this = $(this); // L'objet jQuery du formulaire
 
		$("#messageSauvegarde").html('<img alt="Enregistrement..." src="./sources/icones/ajax-loader.gif"/>');
		$("#messageSauvegarde").css("display","block");
 
        // Je récupère les valeurs
        var sauvBDDemail = $('#sauvBDDemail').val();
        var sauvBDDCapchien = $('#sauvBDDCapchien').val();
 
        // Je vérifie une première fois pour ne pas lancer la requête HTTP
        // si je sais que mon PHP renverra une erreur
      /* if(sauvBDDemail === '' || sauvBDDCapchien === '') {
            alert('Les champs doivent êtres remplis');
        } else {*/
            // Envoi de la requête HTTP en mode asynchrone
            $.ajax({
                url: "http://bode.allais.eu/sources/sauvegarde.php", // Le nom du fichier indiqué dans le formulaire
                type: "POST", // La méthode indiquée dans le formulaire (get ou post)
                data: $this.serialize(), // Je sérialise les données (j'envoie toutes les valeurs présentes dans le formulaire)
                success: function(html) { // Je récupère la réponse du fichier PHP
                    //alert(html); // J'affiche cette réponse
					if(html!="OK")
						{
							$("#messageSauvegarde").html('<div style="text-align:center;border-radius:5px;background-color:#FFAAAA;padding:15px">Erreur :<br/>'+html+'</div>');
						}
					else
						{
							$("#messageSauvegarde").html('<div style="text-align:center;border-radius:5px;background-color:#AAFFAA;padding:15px">Enregistrement réussi !<br/> Vous allez recevoir un mail !</div>');
							setTimeout('$("#dialogSauvegardeBDD").dialog("close");', 1500);
						}
                }
            });
        //}
    });
	
	
//Fonction qui demande le chargement avec AJAX -------------------------
$('#formeDialogueChargeBDD').on('submit', function(e) {
        e.preventDefault(); // J'empêche le comportement par défaut du navigateur, c-à-d de soumettre le formulaire
		
		var $this = $(this); // L'objet jQuery du formulaire
		
		$("#messageChargement").html('<img alt="Enregistrement..." src="./sources/icones/ajax-loader.gif"/>');
		$("#messageChargement").css("display","block");
		
		$.ajax({
                url: "http://bode.allais.eu/sources/chargement.php", // Le nom du fichier indiqué dans le formulaire
                type: "POST", // La méthode indiquée dans le formulaire (get ou post)
                data: $this.serialize(), // Je sérialise les données (j'envoie toutes les valeurs présentes dans le formulaire)
                success: function(html) { // Je récupère la réponse du fichier PHP
						//alert(html); // J'affiche cette réponse
						if(html.substring(0,8)=="Erreur :")//Si ca commence par "Erreur :"
							{
								$("#messageChargement").html('<div style="text-align:center;border-radius:5px;background-color:#FFAAAA;padding:15px">Erreur :<br/>'+html+'</div>');
							}
						else
							{
								loadXML(html);
								$("#messageChargement").html('<div style="text-align:center;border-radius:5px;background-color:#AAFFAA;padding:15px">Enregistrement chargé !</div>');
								setTimeout(function(){	$("#dialogChargementBDD").dialog("close");
														$("#messageChargement").css("display","none");
														},2000);
							}
					}
            });
    });


//Envoie de la liste des fonctions =======================
function envoieListeFonction()
	{
		var mail=$("#chargeBDDemail").val();
		//alert(mail);

		$("#messageChargement").html('<img alt="Enregistrement..." src="./sources/icones/ajax-loader.gif"/>');
		$("#messageChargement").css("display","block");
		
		$.ajax({
                url: "http://bode.allais.eu/sources/listeMail.php", // Le nom du fichier indiqué dans le formulaire
                type: "POST", // La méthode indiquée dans le formulaire (get ou post)
                data: 'mail='+mail, // Je sérialise les données (j'envoie toutes les valeurs présentes dans le formulaire)
				dataType:"html",
                success: function(html) { // Je récupère la réponse du fichier PHP
						//alert(html); // J'affiche cette réponse
						if(html.substring(0,8)=="Erreur :")//Si ca commence par "Erreur :"
							{
								$("#messageChargement").html('<div style="text-align:center;border-radius:5px;background-color:#FFAAAA;padding:15px">Erreur :<br/>'+html+'</div>');
							}
						else
							{
								$("#messageChargement").html('<div style="text-align:center;border-radius:5px;background-color:#AAFFAA;padding:15px">Un mail vous a été envoyé</div>');
								//alert("ok!!"+html);
								//$("#dialogChargementBDD").dialog("close");
								setTimeout(function(){	$("#messageChargement").css("display","none");
														//$("#dialogChargementBDD").dialog("close");
													},5000);
														
							}
					}
            });
	}
