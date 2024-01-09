

// Classe abstraite représentant une fonction à afficher dans Bode
class Fonction_Globale extends Fonction
{

	// CONSTRUCTEUR ***********************
	constructor()
	{
		// Héritage
		super("Globale","#000000")
		
		this.type("globale") ;
		this._icone = "./sources/images/iconeGlobal.png";	// URL Icone à afficher dans le menu HTML
		this.epaisseurAnalytique(3,false);
		this.epaisseurAsymptotique(2,false);
		
		this.flecheMargeDeGain = new Fleche(0,0,0,0) ;
		SCENE_BODE_GAIN.calque_principal.addChild(this.flecheMargeDeGain) ;
		this.flecheMargeDePhase = new Fleche(0,180,0,0) ;
		SCENE_BODE_PHASE.calque_principal.addChild(this.flecheMargeDePhase) ;
 	}
 	
 	
 	
 	
	// MEMBRES ***********************
	
		_afficheMargeDeGain = true;	// Booleen qui indique s'il faut afficher la MG ou pas
		_afficheMargeDePhase = true;	// Booleen qui indique s'il faut afficher la Mphi ou pas
		flecheMargeDeGain = null;	// Objet graphique de la marge de gain
		flecheMargeDePhase = null ;	// Objet graphique de la marge de phase
	
	// GETTER - SETTER *******************
	

 		//Affiche la marge de phase
 		afficheMargeDeGain(m,redessine=true)
 		{
			if(typeof(m)!='undefined')
			{
				this._afficheMargeDeGain=m;
				if(redessine)
				{
					FONCTION_GLOBALE.redessine_tout();
					updateTousLesGraphes();
				}
			}
			return this._afficheMargeDeGain;
 		}
	

 		//Affiche la marge de phase
 		afficheMargeDePhase(m,redessine=true)
 		{
			if(typeof(m)!='undefined')
			{
				this._afficheMargeDePhase=m;
				if(redessine)
				{
					FONCTION_GLOBALE.redessine_tout();
					updateTousLesGraphes();
				}
			}
			return this._afficheMargeDePhase;
 		}
 		
	// MEMBRES *******************
	
	
		// (virtuelle)
		// Fonction qui calcule le gain en dB asymptotique
		// w = réel positif
		GdB_asymptotique(w)
		{
			var val = 0
			for(var i=0 ; i<LISTE_FONCTIONS.length ; i++)
			{
				if(LISTE_FONCTIONS[i].combineGlobal())
					val += LISTE_FONCTIONS[i].GdB_asymptotique(w)
			}
			return val *this.coefInv()
		}
		
		// (virtuelle)
		// Fonction qui calcule le gain en dB
		// w = réel positif
		GdB(w)
		{
			var val = 0
			for(var i=0 ; i<LISTE_FONCTIONS.length ; i++)
			{
				if(LISTE_FONCTIONS[i].combineGlobal())
					val += LISTE_FONCTIONS[i].GdB(w)
			}
			return val *this.coefInv()
		}
	
	
		// (virtuelle)
		// Fonction qui calcule la phase asymptotique
		// w = réel positif
		phi_asymptotique(w)
		{
			var val = 0
			for(var i=0 ; i<LISTE_FONCTIONS.length ; i++)
			{
				if(LISTE_FONCTIONS[i].combineGlobal())
					val += LISTE_FONCTIONS[i].phi_asymptotique(w)
			}
			return val *this.coefInv()
		}
		
		// (virtuelle)
		// Fonction qui calcule la phase
		// w = réel positif
		phi(w)
		{
			var val = 0
			for(var i=0 ; i<LISTE_FONCTIONS.length ; i++)
			{
				if(LISTE_FONCTIONS[i].combineGlobal())
					val += LISTE_FONCTIONS[i].phi(w)
			}
			return val *this.coefInv()
		}
		
		
		
		// *********************************************************************************
		// Fonction qui (re)dessine tous les graphes
		// ECRASE L'ANCIENNE FONCTION
		redessine_tout()
		{
			if(getActiveOnglet()=="bode")
			{
					this.dessine_GdB_asymptotique()
					this.dessine_GdB_reel()
					this.dessine_Phase_asymptotique()
					this.dessine_Phase_reel()
					
					// Update de marge de gain
					if(typeof(this.flecheMargeDeGain)!="undefined")	// Par defaut, on le cache, s'il existe (quite à le réafficher après)
						this.flecheMargeDeGain.visible = false;
					if(this.afficheMargeDeGain() && this.wPhi180())
					{
						var gdb =  this.GdB(this.wPhi180())
						this.flecheMargeDeGain.label(" "+String(-gdb.toFixed(1))+" dB",false);
						var xPhi180 = get_PixelFromw_BODE(this.wPhi180())
						this.flecheMargeDeGain.x1(xPhi180)
						this.flecheMargeDeGain.y1(-gdb*ECHELLE_DB)
						this.flecheMargeDeGain.x2(xPhi180)
						this.flecheMargeDeGain.visible = true;
						if(gdb<-30)
							gdb=-30
						this.flecheMargeDeGain.couleur(couleurEchelle(-gdb,10,50));
					}
					// Update de marge de Phase
					if(typeof(this.flecheMargeDePhase)!="undefined")	// Par defaut, on le cache, s'il existe (quite à le réafficher après)
						this.flecheMargeDePhase.visible = false;
					if(this.afficheMargeDePhase() && this.w0dB())
					{
						var phi =  this.phi(this.w0dB())
						this.flecheMargeDePhase.label(" "+String((180+phi).toFixed(1))+"°",false);
						var x0dB = get_PixelFromw_BODE(this.w0dB())
						this.flecheMargeDePhase.y1(180*ECHELLE_PHASE)
						this.flecheMargeDePhase.x1(x0dB)
						this.flecheMargeDePhase.y2(-phi*ECHELLE_PHASE)
						this.flecheMargeDePhase.x2(x0dB)
						this.flecheMargeDePhase.visible = true;
						if(phi>-150)
							phi=-150
						this.flecheMargeDePhase.couleur(couleurEchelle(phi+180,10,50));
					}
			}
			else if(getActiveOnglet()=="temporel")
			{
					if(this.courbe_Temporelle == null)	// Si on ne l'a jamais dessiné
					{
						this.courbe_Temporelle = new createjs.Shape();
						this.courbe_Temporelle.fonction = this;		// On remet une reférence vers l'objet fonction
						SCENE_REPONSE_TEMPORELLE.calque_fonctions.addChild(this.courbe_Temporelle);
					}
					
					var g = this.courbe_Temporelle.graphics;	// Graphique
					g.clear();					// On efface la courbe
					g.setStrokeStyle( this.epaisseurAsymptotique() );
					g.beginStroke( this.couleur() );
					var tmin = get_tMin_TEMPOREL();
					var tmax = get_tMax_TEMPOREL();
					var h = (tmax-tmin)/NB_POINTS_TEMPOREL
					var t=tmin;
					var CONSIGNE = 5;
					
					// On efface les historiques
					this.resetHistoriques();
					for(var i=0 ; i<LISTE_FONCTIONS.length ; i++)
					{
						LISTE_FONCTIONS[i].resetHistoriques();
					}
					
					
					// D'abord, si le zéro et trop à gauche, on calcule les points précédent (depuis zero) pour avoir l'historique
					// sur tout l'intervalle [0,tmin[ (hors écran)
					var v0 = 0;
					if(tmin>0)
					{
						var hh = tmin/100;
						for(var tt=0;tt<tmin;tt+=hh)
							v0=this.nextPoint(consigne(tt),tt,hh)
					}
					
					
					// Dessin
					g.moveTo(tmin*ECHELLE_TEMPS, -v0*ECHELLE_VALEUR)
					//Tracé de la VRAI courbe (visible à l'écran)
					while(t<=tmax)
					{
						var v = this.nextPoint(consigne(t),t,h); // Nouveau point
						g.lineTo(t*ECHELLE_TEMPS,-v*ECHELLE_VALEUR)
						t+=h
					}
					SCENE_REPONSE_TEMPORELLE.update();
			}
		}
		
		
		// *************************************************************************************************
		// Fonction (abstraite) qui donne la valeur du point suivant (selon la méthode d'Euler)
		// à partir des 2 ou 3 points précédents
		nextPoint(e,t,h)
		{
			this.save_TEMPOREL_entree(e);
			// Comparateur en boucle fermée
			if($("#bouton_retour_unitaire").is(":checked") )
			{
				e = e - this.historique_TEMPOREL_sortie[0];
			}
			// pour chauqe fonction
			for(var i=0 ; i<LISTE_FONCTIONS.length ; i++)
			{
				if(LISTE_FONCTIONS[i].combineGlobal())
					e = LISTE_FONCTIONS[i].nextPoint(e,t,h)
			}
			// Perturbation
			/*if(t>=0)
				e = e+Number($("#bouton_perturbation").val())
				*/
			// on stocke le dernier (push_historique)
			// Lissage
			e = (0.8*e + 0.2*this.historique_TEMPOREL_sortie[0])
			return this.save_TEMPOREL_sortie(e);
		}
	
		
	// ====================================================================================
	// ====================================================================================
	// ARBRE DES FONCTIONS
	// ====================================================================================
	// ====================================================================================
		
		//Bouton Supprimer ------
		//Ecrase la fonction mère
		ajouteLigneArbre2_supprimer()
		{
			return '';
		}

		//fonction qui ajoute la liste des options d'affichage dans l'arborescence
		ajouteLigneArbre2_affichage()
		{
			return 	this.ajouteLigneArbre_marges()+
				this.ajouteLigneArbre2_boutonsAffichage()+
				this.ajouteLigneArbre2_boutonCouleur();
		}

		//Boutons Combine
		//Ecrase la fonction mère
		//ajouteLigneArbre2_boutonsCombine()
		//{
		//	return "";
		//}
		// affiche les marges de phase / gain
		ajouteLigneArbre_marges()
		{
			var res = ''+
'						<div class="item">'+
'							<input id="'+String(this.n())+'-input-marge_gain" name="'+String(this.n())+'-input-marge_gain" type="checkbox" ';
					if(this.afficheMargeDeGain())
						res+='checked="true"';
			 res += ' onchange="FONCTION_GLOBALE.afficheMargeDeGain(this.checked)"/>'+
'							<label for="'+String(this.n())+'-input-marge_gain">'+
'								M<sub>G<sub>dB</sub></sub>'+
'							</label>'+
'						</div>'+
'						<div class="item">'+
'							<input id="'+String(this.n())+'-input-marge_phase" name="'+String(this.n())+'-input-marge_phase" type="checkbox" ';
					if(this.afficheMargeDePhase())
						res+='checked="true"';
			 res += ' onchange="FONCTION_GLOBALE.afficheMargeDePhase(this.checked)"/>'+
'							<label for="'+String(this.n())+'-input-marge_phase">'+
'								M<sub>&#966;</sub>'+
'							</label>'+
'						</div>';

			return res
		}
}

