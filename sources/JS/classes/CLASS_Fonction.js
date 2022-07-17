

// Classe abstraite représentant une fonction à afficher dans Bode
class Fonction
{

	// CONSTRUCTEUR ***********************
	// Nom de la fonction (pour débugger, surtout)
	// Couleur (en notation hexa !!!)
	constructor(nom_="fonction",couleur_="#000000", inverse=false, commentaire_="")
	{
		this.nom(nom_);
		this.commentaire(commentaire_);
		this.couleur(couleur_);
		this.inverse(inverse,false);
 	}
 	
 	
 
 		
 	

	// ====================================================================================
	// ====================================================================================
	// CONSTANTES
	// ====================================================================================
	// ====================================================================================
	
		// Constantes
		_n = N++ ;			// N° de la fonction
		_nom = "Fonction mère" ;	// Nom de la fonction
		_commentaire = ""		// Commentaire
		_type = "FT" ; 			// Type (un peu similaire à nom)
		_couleur = "black" ; 		// Couleur
		_icone = "./sources/images/iconeInconnu.png";	// URL Icone à afficher dans le menu HTML
		
		// Paramètres
		_inverse = false;	// Est-ce l'inverse de la fonction (1/H(p) ?)
		_afficheAnalytique = true;
		_afficheAsymptotique = true ;
		_typeTraitAnalytique = "normal" ; // Type de trait ("normale" ou "pointillés" ou "pointillés fins")
		_typeTraitAsymptotique = "pointillés" ; // Type de trait ("normale" ou "pointillés" ou "pointillés fins")
		_epaisseurAnalytique = 1 ; 	// en px
		_epaisseurAsymptotique = 1 ; 	// en px
		_combineGlobal = true ;		// Doit-on prendre en compte cette fonction dans la fonction globale ?
		
		courbe_GdB_asymptotique = null;		// Référence vers l'objet createjs qui représente le cette courbe
		courbe_GdB_analytique = null ;		// Référence vers l'objet createjs qui représente le cette courbe
		courbe_phi_asymptotique = null ;	// Référence vers l'objet createjs qui représente le cette courbe
		courbe_phi_analytique = null ;	// Référence vers l'objet createjs qui représente le cette courbe
		
		_w0dB = null;			// Pulsation de coupure
		_wPhi180 = null;		// Pulsation de phase à -180°
	
	
 		
	// ====================================================================================
	// ====================================================================================
	// GETTERS - SETTERS
	// ====================================================================================
	// ====================================================================================
	
 	
 		// Nom de la fonction
 		nom(n)
 		{
			if(typeof(n)!='undefined')
				this._nom=n;
			return this._nom;
 		}
 	
 		// Commentaire
 		commentaire(c)
 		{
			if(typeof(c)!='undefined')
				this._commentaire=c;
			return this._commentaire;
 		}
 		
 		// Type de la fonction
 		type(t)
 		{
			if(typeof(t)!='undefined')
				this._type=t;
			return this._type;
 		}
 		
 		// couleur de la fonction
 		couleur(c,redessine=true)
 		{
			if(typeof(c)!='undefined')
			{
				this._couleur = c;
				if(redessine)
				{
					this.redessine_tout();
					updateTousLesGraphes();
					$("#fonction-"+String(this.n())).css("background-color",eclaircitCouleurHex(this.couleur(),220))
					$("#fonction-"+String(this.n())+" .titre-fonction").css("background-color",eclaircitCouleurHex(this.couleur(),150))
				}
			}
			return this._couleur;
 		}
 		
 		// N° de fonction
 		n()
 		{
 			return this._n	
 		}
 		
 		// Icone HTML
 		icone(i)
 		{
			if(typeof(i)!='undefined')
				this._icone=i;
			return this._icone;
 		}
 		
 		// Inverse la courbe (1/H(p))
 		inverse(f,redessine=true)
 		{
			if(typeof(f)!='undefined')
			{
				this._inverse=f;
				if(redessine)
				{
					this.redessine_tout();
					FONCTION_GLOBALE.redessine_tout();
					updateTousLesGraphes();
				}
			}
			return this._inverse;
 		}
 		
 		
 		
 		// affiche Analytique
 		afficheAnalytique(a,redessine=true)
 		{
			if(typeof(a)!='undefined')
			{
				this._afficheAnalytique=a;
				if(redessine)
				{
					this.redessine_tout();
					updateTousLesGraphes();
				}
			}
			return this._afficheAnalytique;
 		}
 		
 		// affiche Analytique
 		afficheAsymptotique(a,redessine=true)
 		{
			if(typeof(a)!='undefined')
			{
				this._afficheAsymptotique=a;
				if(redessine)
				{
					this.redessine_tout();
					updateTousLesGraphes();
				}
			}
			return this._afficheAsymptotique;
 		}
 		
 		// affiche Analytique
 		typeTraitAnalytique(t,redessine=true)
 		{
			if(typeof(t)!='undefined')
			{
				this._typeTraitAnalytique=t;
				if(redessine)
				{
					this.redessine_tout();
					updateTousLesGraphes();
				}
			}
			return this._typeTraitAnalytique;
 		}
 		
 		// affiche Analytique
 		typeTraitAsymptotique(t,redessine=true)
 		{
			if(typeof(t)!='undefined')
			{
				this._typeTraitAsymptotique=t;
				if(redessine)
				{
					this.redessine_tout();
					updateTousLesGraphes();
				}
			}
			return this._typeTraitAsymptotique;
 		}
 		
 		// Epaisseur Analytique
 		epaisseurAnalytique(e,redessine=true)
 		{
			if(typeof(e)!='undefined')
			{
				if(e<0)
					e=0;
				this._epaisseurAnalytique=e;
				if(redessine)
				{
					this.redessine_tout();
					updateTousLesGraphes();
				}
			}
			return this._epaisseurAnalytique;
 		}
 		
 		// Epaisseur Asymptotique
 		epaisseurAsymptotique(e,redessine=true)
 		{
			if(typeof(e)!='undefined')
			{
				if(e<0)
					e=0;
				this._epaisseurAsymptotique=e;
				if(redessine)
				{
					this.redessine_tout();
					updateTousLesGraphes();
				}
			}
			return this._epaisseurAsymptotique;
 		}
 		
 		// Combine avec la fonction globale
 		combineGlobal(c,redessine=true)
 		{
			if(typeof(c)!='undefined')
			{
				this._combineGlobal=c;
				if(redessine)
				{
					FONCTION_GLOBALE.redessine_tout();
					updateTousLesGraphes();
				}
			}
			return this._combineGlobal;
 		}
 		
 		w0dB()
 		{
 			return this._w0dB;
 		}
 		
 		wPhi180()
 		{
 			return this._wPhi180;
 		}
 		
	// ====================================================================================
	// ====================================================================================
	// FONCTIONS
	// ====================================================================================
	// ====================================================================================
	
		// (abstraite)
		// Fonction qui calcule le gain en dB asymptotique
		// w = réel positif
		GdB_asymptotique(w)
		{
			return 0
		}
		
		// (abstraite)
		// Fonction qui calcule le gain en dB
		// w = réel positif
		GdB(w)
		{
			return 0
		}
	
	
		// (abstraite)
		// Fonction qui calcule la phase asymptotique
		// w = réel positif
		phi_asymptotique(w)
		{
			return 0
		}
		
		// (abstraite)
		// Fonction qui calcule la phase
		// w = réel positif
		phi(w)
		{
			return 0
		}
	
	
		// Fonction qui renvoie 1 ou -1 selon si on inverse la courbe ou non
		coefInv()
		{
			return 1-2*this._inverse
		}
	
 		
 		// Fonction qui s'auto-supprime et se retire de la liste des fonctions
 		supprime()
 		{
 			var i = LISTE_FONCTIONS.indexOf(this);//getFonctionIndiceByNum(this.n())
 			LISTE_FONCTIONS.splice(i,1)
 			updateAffichageListe()
 			// Suppression des graphiques
 			SCENE_BODE_GAIN.calque_fonctions.removeChild(this.courbe_GdB_asymptotique);
 			SCENE_BODE_GAIN.calque_fonctions.removeChild(this.courbe_GdB_analytique);
 			SCENE_BODE_PHASE.calque_fonctions.removeChild(this.courbe_phi_asymptotique);
 			SCENE_BODE_PHASE.calque_fonctions.removeChild(this.courbe_phi_analytique);
 			FONCTION_GLOBALE.redessine_tout();
 			updateTousLesGraphes();
 		}
	
	// ====================================================================================
	// ====================================================================================
	// GRAPHISMES
	// ====================================================================================
	// ====================================================================================
	
	
		
		// *********************************************************************************
		// Fonction qui dessine le gain en dB asymptotique dans les bornes du graphique
		// S'il n'a pas encore été dessiné, il le crée
		dessine_GdB_asymptotique()
		{
			//var info = this.info_GdB_asymptotique	// Infos sur le graphique à tracer
			if(this.courbe_GdB_asymptotique == null)	// Si on ne l'a jamais dessiné
			{
				this.courbe_GdB_asymptotique = new createjs.Shape();
				this.courbe_GdB_asymptotique.fonction = this;		// On remet une reférence vers l'objet fonction
				SCENE_BODE_GAIN.calque_fonctions.addChild(this.courbe_GdB_asymptotique);
			}
		
		
			var g = this.courbe_GdB_asymptotique.graphics;	// Graphique
			g.clear();				// On efface la courbe
			if(this.afficheAsymptotique())	// Si elle doit être affichée
			{
				// Style
				g.setStrokeStyle( this.epaisseurAsymptotique() );
				g.beginStroke( this.couleur() );
				if(this.typeTraitAsymptotique()=="pointillés")
					g.setStrokeDash([20,10],0)
				else if(this.typeTraitAsymptotique()=="pointillés fins")
					g.setStrokeDash([8,4],0)
				var xMin = get_xMin_BODE() // Position du bord de gauche (en px)
				var xMax = get_xMax_BODE() // Position du bord de droit (en px)
				var w = get_wFromPixel_BODE(xMin)
				g.moveTo(xMin, -this.GdB_asymptotique(w)*ECHELLE_DB)
				var x = xMin
				while(x<=xMax)
				{
					x+= 2
					w = get_wFromPixel_BODE(x)
					g.lineTo(x,-this.GdB_asymptotique(w)*ECHELLE_DB)
				}
			}
		}
		
		
		
		// *********************************************************************************
		// Fonction qui dessine le gain en dB reel dans les bornes du graphique
		// S'il n'a pas encore été dessiné, il le crée
		dessine_GdB_reel()
		{
			//var info = this.info_GdB_reel	// Infos sur le graphique à tracer
			if(this.courbe_GdB_analytique == null)	// Si on ne l'a jamais dessiné
			{
				this.courbe_GdB_analytique = new createjs.Shape();
				this.courbe_GdB_analytique.fonction = this;		// On remet une reférence vers l'objet fonction
				SCENE_BODE_GAIN.calque_fonctions.addChild(this.courbe_GdB_analytique);
			}

			// Infos sur le graphique à tracer
			var g = this.courbe_GdB_analytique.graphics;	// Graphique
			g.clear();				// On efface la courbe
			this._w0dB = null ;	// On efface le w0dB (il se remettra à jour quand on activera l'affichage)
			if(this.afficheAnalytique())	// Si elle doit être affichée
			{
				// Style
				g.setStrokeStyle( this.epaisseurAnalytique() );
				g.beginStroke( this.couleur() );
				if(this.typeTraitAnalytique()=="pointillés")
					g.setStrokeDash([20,10],0)
				else if(this.typeTraitAnalytique()=="pointillés fins")
					g.setStrokeDash([8,4],0)
				var xMin = get_xMin_BODE() // Position du bord de gauche (en px)
				var xMax = get_xMax_BODE() // Position du bord de droit (en px)
				var w = get_wFromPixel_BODE(xMin)
				g.moveTo(xMin, -this.GdB(w)*ECHELLE_DB)
				var x = xMin
				
				// On initialise pour la pulsation de coupure
				var GdB_prec = this.GdB(w);
				var w_prec = w
				
				while(x<=xMax)
				{
					x+= 2
					w = get_wFromPixel_BODE(x)
					var GdB = this.GdB(w)
					
					// On note si c'est une pulsation de coupeure
					if(GdB<=0 && GdB_prec>0 && !this._w0dB)
						this._w0dB = w_prec + (w-w_prec)*GdB_prec/(GdB_prec-GdB)
					w_prec = w;
					GdB_prec = GdB;
						
					g.lineTo(x,-GdB*ECHELLE_DB)
				}
			}
		}
		
		
		// *********************************************************************************
		// Fonction qui dessine la phase asymptotique dans les bornes du graphique
		// S'il n'a pas encore été dessiné, il le crée
		dessine_Phase_asymptotique()
		{
			//var info = this.info_phi_asymptotique	// Infos sur le graphique à tracer
			if(this.courbe_phi_asymptotique == null)	// Si on ne l'a jamais dessiné
			{
				this.courbe_phi_asymptotique = new createjs.Shape();
				this.courbe_phi_asymptotique.fonction = this;		// On remet une reférence vers l'objet fonction
				SCENE_BODE_PHASE.calque_fonctions.addChild(this.courbe_phi_asymptotique);
			}

			// Infos sur le graphique à tracer
			var g = this.courbe_phi_asymptotique.graphics;	// Graphique
			g.clear();				// On efface la courbe
			if(this.afficheAsymptotique())	// Si elle doit être affichée
			{
				// Style
				g.setStrokeStyle( this.epaisseurAsymptotique() );
				g.beginStroke( this.couleur() );
				if(this.typeTraitAsymptotique()=="pointillés")
					g.setStrokeDash([20,10],0)
				else if(this.typeTraitAsymptotique()=="pointillés fins")
					g.setStrokeDash([8,4],0)
				var xMin = get_xMin_BODE() // Position du bord de gauche (en px)
				var xMax = get_xMax_BODE() // Position du bord de droit (en px)
				var w = get_wFromPixel_BODE(xMin)
				g.moveTo(xMin, -this.phi_asymptotique(w)*ECHELLE_PHASE)
				var x = xMin
				while(x<=xMax)
				{
					x+= 2
					w = get_wFromPixel_BODE(x)
					g.lineTo(x,-this.phi_asymptotique(w)*ECHELLE_PHASE)
				}
			}
		}
		
		// *********************************************************************************
		// Fonction qui dessine la phase reelle dans les bornes du graphique
		// S'il n'a pas encore été dessiné, il le crée
		dessine_Phase_reel()
		{
			//var info = this.info_phi_reel	// Infos sur le graphique à tracer
			if(this.courbe_phi_analytique == null)	// Si on ne l'a jamais dessiné
			{
				this.courbe_phi_analytique = new createjs.Shape();
				this.courbe_phi_analytique.fonction = this;		// On remet une reférence vers l'objet fonction
				SCENE_BODE_PHASE.calque_fonctions.addChild(this.courbe_phi_analytique);
			}

			// Infos sur le graphique à tracer
			var g = this.courbe_phi_analytique.graphics;	// Graphique
			g.clear();				// On efface la courbe
			this._wPhi180 = null;		// On réinitialise phi(w) =-180°
			if(this.afficheAnalytique())	// Si elle doit être affichée
			{
				// Style
				g.setStrokeStyle( this.epaisseurAnalytique() );
				g.beginStroke( this.couleur() );
				if(this.typeTraitAnalytique()=="pointillés")
					g.setStrokeDash([20,10],0)
				else if(this.typeTraitAnalytique()=="pointillés fins")
					g.setStrokeDash([8,4],0)
				var xMin = get_xMin_BODE() // Position du bord de gauche (en px)
				var xMax = get_xMax_BODE() // Position du bord de droit (en px)
				var w = get_wFromPixel_BODE(xMin)
				g.moveTo(xMin, -this.phi(w)*ECHELLE_PHASE)
				var x = xMin
				
				// On initialise pour la pulsation à -180°
				var phi_prec = this.phi(w);
				var w_prec = w
				
				while(x<=xMax)
				{
					x+= 2
					w = get_wFromPixel_BODE(x)
					var phi = this.phi(w)
					
					// On note si c'est une pulsation de coupeure
					if(phi<=-180 && phi_prec>-180 && !this._wPhi180)
						this._wPhi180 = w_prec + (w-w_prec)*(phi_prec+180)/(phi_prec-phi)
					phi_prec = phi
					w_prec = w
					
					g.lineTo(x,-this.phi(w)*ECHELLE_PHASE)
				}
			}
		
		}
		
		
		
		// *********************************************************************************
		// Fonction qui (re)dessine tous les graphes
		redessine_tout()
		{
			this.dessine_GdB_asymptotique()
			this.dessine_GdB_reel()
			this.dessine_Phase_asymptotique()
			this.dessine_Phase_reel()
		}
		
		
		
		
		// **************************************************************************************
		// Résume le contenu de cette objet au format JSON
		// Si trace=true : il ajoute la liste des points des courbes
		getJSON(trace)
		{
			var infos={
				nom : this.nom(),
				commentaire : this.commentaire(),
				type : this.type(),
				n : this.n(),
				couleur : this.couleur(),
				inverse : this.inverse(),
				parametres : this.getParametresJSON(),
				afficheAnalytique : this.afficheAnalytique(),
				afficheAsymptotique : this.afficheAsymptotique(),
				typeTraitAsymptotique : this.typeTraitAsymptotique(),
				typeTraitAnalytique : this.typeTraitAnalytique(),
				epaisseurAsymptotique : this.epaisseurAsymptotique(),
				epaisseurAnalytique : this.epaisseurAnalytique(),
				combineGlobal : this.combineGlobal(),
				courbes : null
				}
				
			if(trace)
			{
				infos.courbes={}
				if(this.afficheAnalytique())
				{
					infos.courbes.GdBAnalytique = this.courbe_GdB_analytique.graphics.instructions
					infos.courbes.phaseAnalytique = this.courbe_phi_analytique.graphics.instructions
				}
				if(this.afficheAsymptotique())
				{
					infos.courbes.GdBAsymptotique = this.courbe_GdB_asymptotique.graphics.instructions
					infos.courbes.phaseAsymptotique = this.courbe_phi_asymptotique.graphics.instructions
				}
			}
			return infos
		}
		
		
		
		
		
		// **************************************************************************************
		// Liste des paramètres au format JSON
		getParametresJSON()
		{
			return {};
		}
		
		
		
		// **************************************************************************************
		// Charge les options (autres que les paramètres propres à chaque fonction)
		// Depuis une variable issue de JSON
		// f : représentant de la fonction, issue de JSON
		setUpOptionsFromJson(f)
		{
			this.nom(f.nom);
			if(f.commentaire != undefined)
				this.commentaire(f.commentaire);
			this.couleur(f.couleur)
			this.inverse(f.inverse)
			this.afficheAnalytique(f.afficheAnalytique)
			this.afficheAsymptotique(f.afficheAsymptotique)
			this.typeTraitAsymptotique(f.typeTraitAsymptotique)
			this.typeTraitAnalytique(f.typeTraitAnalytique)
			this.epaisseurAsymptotique(f.epaisseurAsymptotique)
			this.epaisseurAnalytique(f.epaisseurAnalytique)
			this.combineGlobal(f.combineGlobal)
		}
		
		
		
		
	// ====================================================================================
	// ====================================================================================
	// ARBRE DES FONCTIONS
	// ====================================================================================
	// ====================================================================================
	
		// *********************************************************************************
		// Fonction crée le code HTML pour mettre dans la liste des fonctions
		ajouteLigneArbre()
		{
			var html = ''+
'			<div id="fonction-'+String(this.n())+'" class="fonction" style="background-color:'+eclaircitCouleurHex(this.couleur(),220)+'">'+
'				<div class="titre-fonction" style="background-color:'+eclaircitCouleurHex(this.couleur(),150)+'">'+
'					<span class="fleche-arbo">&#9656;</span>'+
'					<img class="icone" src="'+this.icone()+'"/>'+
'					'+this.nom()+
'					<span id="'+String(this.n())+'-carreCouleur" style="color:'+this.couleur()+';font-size:x-large;">&#9632;</span>';
			if(this._commentaire!="")
			{
				html += ''+
'					<div class="commentaire">'+this.commentaire()+'</div>';
			}
			html += ''+
'				</div>'+
'				<div class="options-fonctions">'+
'					<div class="options-parametres">'+
'						<div class="parametres-titre">'+
'							<span class="fleche-arbo">&#9656;</span>'+
'							<img class="icone" src="./sources/images/iconeParam.png" alt=""/>'+
'							Paramètres'+
'						</div>'+
'						<div class="items">'+
'							'+this.ajouteLigneArbre2_parametres()+
'						</div>'+
'					</div>'+
'					<div class="options-affichage">'+
'						<div class="Affichage-titre">'+
'							<span class="fleche-arbo">&#9656;</span>'+
'							<img class="icone" src="./sources/images/iconeAffichage.png" alt=""/>'+
'							Affichage'+
'						</div>'+
'						<div class="items">'+
'							'+this.ajouteLigneArbre2_affichage()+
'						</div>'+
					this.ajouteLigneArbre2_supprimer()+
'				</div>'+
'			</div>';

			$("#arborescence2").append(html);
		}
		
		
		//Bouton Supprimer ------
		// Ce bouton est mis pour toutes les fonctions SAUF la fonction globale
		ajouteLigneArbre2_supprimer()
		{
			return ''+
'					<div class="options-supprimer" onclick="$(\'#boite_supprimer\').data(\'id\','+String(this.n())+');$(\'#boite_supprimer_nom_fonction\').html(\''+this.nom()+'\');$(\'#boite_supprimer\').dialog(\'open\');">'+
'						<img class="icone" src="./sources/images/iconeDelete.png" alt="(X)"/>'+
'						Supprimer'+
'					</div>';
		}
		
		
		//fonction qui ajoute la liste des paramètres dans l'arborescence
		// CETTE FONCTION EST VOUEE A ETRE ECRASEE PAR LES CLASSES FILLES
		ajouteLigneArbre2_parametres()
		{
			return 	this.ajouteLigneArbre2_boutonInverse();
			//this.ajouteLigneArbre2_Parametre_K()+
		}

			//Parametre "inverse"
			ajouteLigneArbre2_boutonInverse()
				{
					var res=''+
'						<div class="item">'+
	'						<input type="checkbox" name="'+String(this.n())+'-inverse" id="'+String(this.n())+'-inverse" onchange="getFonctionByNum('+String(this.n())+').inverse(this.checked)"';//updateAffichageListe();
					if(this.inverse())
						res+='checked="true"';
					res+='/>'+
	'						<label for="'+String(this.n())+'-inverse">Inverse</label>'+
'						</div>';
					return res;
				}

			//Parametre "K" (Note : on le met dans la classe mère car il est présent presque partout)
			ajouteLigneArbre2_Parametre_K()
				{
					res=''+
'						<div class="item">'+
	'						<label for="'+String(this.n())+'-input-param-K-number">K = </label>'+
	'						<input type="number" name="'+String(this.n())+'-input-param-K-number" id="'+String(this.n())+'-input-param-K-number" min="0" step="0.5" style="width:50px;" value="'+this.K()+'" oninput="updateParametreK('+i+',this.value)"/>'+
	'						<input type="range" name="'+String(this.n())+'-input-param-K-range" id="'+String(this.n())+'-input-param-K-range"  style="width:120px;" min="-5" max="5" step="0.1" value="'+log10(this.K())+'" oninput="updateParametreK('+i+',Math.pow(10,this.value))"/>'+
'						</div>';
					return res;
				}
		
		
		
		//fonction qui ajoute la liste des options d'affichage dans l'arborescence
		ajouteLigneArbre2_affichage()
		{
			return 	this.ajouteLigneArbre2_boutonsAffichage()+
				this.ajouteLigneArbre2_boutonsCombine()+
				this.ajouteLigneArbre2_boutonCouleur();
		}

			//Boutons Affichage
			ajouteLigneArbre2_boutonsAffichage()
				{
					var res=''+
'						<div class="item">'+
	'						<input id="'+String(this.n())+'-afficheAnalytique" name="'+String(this.n())+'-afficheAnalytique" type="checkbox" onchange="getFonctionByNum('+String(this.n())+').afficheAnalytique(this.checked)" ';
							if(this.afficheAnalytique())
								res+='checked="true" ';
							res+='/>'+
'							<label for="'+String(this.n())+'-afficheAnalytique">'+
'								<img class="icone" src="./sources/images/iconeReel.png"/>'+
'								Analytique'+
'							</label>'+
'							<select class="typeTrait" id="'+String(this.n())+'-typeTraitAnalytique" name="'+String(this.n())+'-typeTraitAnalytique" size="1" onchange="getFonctionByNum('+String(this.n())+').typeTraitAnalytique(this.value)">'+
'								<option value="normal"';
								if(this.typeTraitAnalytique()=="normal")
									res+=' selected="selected"';
								res+='>___</option>'+
'								<option value="pointillés fins"';
								if(this.typeTraitAnalytique()=="pointillés fins")
									res+=' selected="selected"';
								res+='>- - -</option>'+
'								<option value="pointillés"';
								if(this.typeTraitAnalytique()=="pointillés")
									res+=' selected="selected"';
								res+='>_ _ _</option>'+
'							</select>'+
'							<input id="'+String(this.n())+'-epaisseurAnalytique" name="'+String(this.n())+'-epaisseurAnalytique" type="number" min="0" size="5" style="width:30px;" value="'+this.epaisseurAnalytique()+'" onchange="getFonctionByNum('+String(this.n())+').epaisseurAnalytique(this.value)"/>'+
'						</div>'+
'						<div class="item">'+
'							<input id="'+String(this.n())+'-afficheAsympt" name="'+String(this.n())+'-afficheAsympt" type="checkbox" onchange="getFonctionByNum('+String(this.n())+').afficheAsymptotique(this.checked)" ';
							if(this.afficheAsymptotique())
								res+='checked="true" ';
							res+='/>'+
'							<label for="'+String(this.n())+'-afficheAsympt">'+
'								<img class="icone" src="./sources/images/iconeAsympt.png"/>'+
'								Asymptotique'+
'							</label>'+
'							<select class="typeTrait" id="'+String(this.n())+'-typeTraitAsympt" name="'+String(this.n())+'-typeTraitAsympt" size="1" onchange="getFonctionByNum('+String(this.n())+').typeTraitAsymptotique(this.value)">'+
'								<option value="normal"';
								if(this.typeTraitAsymptotique()=="normal")
									res+=' selected="selected"';
								res+='>___</option>'+
'								<option value="pointillés fins"';
								if(this.typeTraitAnalytique()=="pointillés fins")
									res+=' selected="selected"';
								res+='>- - -</option>'+
'								<option value="pointillés"';
								if(this.typeTraitAsymptotique()=="pointillés")
									res+=' selected="selected"';
								res+='>_ _ _</option>'+
'							</select>'+
'							<input id="'+String(this.n())+'-epaisseurAsymptotique" name="'+String(this.n())+'-epaisseurAnalytique" type="number" min="0" size="5" style="width:30px;" value="'+this.epaisseurAsymptotique()+'" onchange="getFonctionByNum('+String(this.n())+').epaisseurAsymptotique(this.value)"/>'+
'						</div>';
					return res;
				}
		//Boutons Combine
		ajouteLigneArbre2_boutonsCombine()
			{
					var res=''+
'						<div class="item">'+
'							<input id="'+String(this.n())+'-check-combine" name="'+String(this.n())+'-check-combine" type="checkbox" onclick="getFonctionByNum('+String(this.n())+').combineGlobal(this.checked)" ';
							if(this.combineGlobal())
								res+='checked="true" ';
							res+='/>'+
'							<label for="'+String(this.n())+'-check-combine">'+
'								<img class="icone" src="./sources/images/iconeCombineReel.png"/>'+
'								Combine avec le global'+
'							</label>'+
'						</div>';
					return res;
				}


		//Boutons Couleurs
		ajouteLigneArbre2_boutonCouleur()
			{
				return ''+
'						<div class="item">'+
'							<label for="'+String(this.n())+'-input-couleur">'+
'								Couleur : '+
'							</label>'+
'							<input id="'+String(this.n())+'-input-couleur" name="'+String(this.n())+'-input-couleur" type="color" value="'+this.couleur()+'" onchange="getFonctionByNum('+String(this.n())+').couleur(this.value)"/>'+
'						</div>';
			}
		
	
}

