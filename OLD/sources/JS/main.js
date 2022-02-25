

listeFonctions=[];//Liste des fonctions qui se multiplient
	
versionSauvegarde="1.0";	//Version de la sauvegarde
modif=false;	//S'il y a eu des modifs avant de quitter...


//DEFINITION DES GRAPHIQUES
///////////////////////////////////:

grapheBodeGdb=new GraphiqueGdb("graphique-bode-gdb");
grapheBodeGdb.echelleY(0.04);
grapheBodeGdb.updateStage();
grapheBodeGdb.draw();

grapheBodePhase=new GraphiquePhase("graphique-bode-phase");
grapheBodePhase.echelleY(0.015);
grapheBodePhase.bornesY({mini:-210,maxi:30});
grapheBodePhase.updateStage();
grapheBodePhase.draw();


//Rajout de la 1ere fonction (fonction globale)
fctGlobale=new FonctionGlobale();
listeFonctions.push(fctGlobale);	
updateAffichageListe();
fctGlobale.updateCourbes();

window.onload = function()
	{
		//remplissage des champs de formulaires
		$("#champ_bode_gain_w_min").val(grapheBodeGdb.bornesX().mini);
		$("#champ_bode_gain_w_max").val(grapheBodeGdb.bornesX().maxi);
		$("#champ_bode_gain_Gdb_min").val(grapheBodeGdb.bornesY().mini);
		$("#champ_bode_gain_Gdb_max").val(grapheBodeGdb.bornesY().maxi);
		$("#champ_bode_gain_echelle_X").val(grapheBodeGdb.echelle().x);
		$("#champ_bode_gain_echelle_Y").val(grapheBodeGdb.echelle().y);

		$("#champ_bode_phase_w_min").val(grapheBodePhase.bornesX().mini);
		$("#champ_bode_phase_w_max").val(grapheBodePhase.bornesX().maxi);
		$("#champ_bode_phase_phi_min").val(grapheBodePhase.bornesY().mini);
		$("#champ_bode_phase_phi_max").val(grapheBodePhase.bornesY().maxi);
		$("#champ_bode_phase_echelle_X").val(grapheBodePhase.echelle().x);
		$("#champ_bode_phase_echelle_Y").val(grapheBodePhase.echelle().y);
	}
