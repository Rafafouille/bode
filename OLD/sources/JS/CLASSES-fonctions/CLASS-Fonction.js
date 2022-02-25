//Fonction qui servira de constructeur pour la classe Noeud
var Fonction = function() {

	//==========================
	//Variables Membres
	//==========================

		this._type="Inconnu";//Nom de la fonction
		this._nom="Fonction inconnue";//Nom de la fonction
		this._inverse=false;//Fonction inverse ou non
		//this._samples=50;//Nombre de points de dessin
		this._typeTraitAnalytique="normal";//Type de trait "normal" "pointillets" "points"
		this._typeTraitAsymptotique="pointillets";//Type de trait 
		this._couleur="#FF0000";//Couleur du trait
		this._epaisseur="normal";//Epaisseur du trait		// A SUPPRIMER !!!!
		this._epaisseurAnalytique=2;//Epaisseur du trait
		this._epaisseurAsymptotique=1;//Epaisseur du trait
		this._afficheAnalytique=true;//Affiche-t-on la courbe analytique seule ?
		this._afficheAsymptotique=true;//Affiche-t-on la courbe asymptotique seule ,
		this._analytiqueGlobal=true;//Cette fonction analytique participe-t-elle au global ?
		this._asymptotiqueGlobal=true;//Cette fonction asymptotique participe-t-elle au global ?
		this._bornesW={mini:-4,maxi:4};//Bornes de omega, pour tracer la courbe
		this._nbPoints=100;
		this._icone="./sources/icones/iconeInconnu.png";
	

	//===============================
	// Coalition DESTRUCTION !!!!
	//================================

		this.destroy=function()
			{
				this.courbeGdb.remove();
				this.courbeGdbAsympt.remove();
				this.courbePhase.remove();
				this.courbePhaseAsympt.remove();
			}

	//==========================
	//Getters/Setters
	//==========================

		//Renvoie le nom de la fonction
		this.nom=function(n)
			{
				if(typeof(n) != 'undefined')
					this._nom=n;
				return this._nom;
			}

		//Renvoie le type de la fonction
		this.type=function(t)
			{
				if(typeof(t) != 'undefined')
					this._type=t;
				return this._type;
			}

		//Renvoie le type de la fonction
		this.icone=function(i)
			{
				if(typeof(i) != 'undefined')
					this._icone=i;
				return this._icone;
			}
		//Renvoie l'image de la fonction
		this.getGdb=function(w)
			{
				return 0;	//0 par defaut
			}

		this.getGdbAsympt=function(w)
			{
				return 0;
			}
		//Renvoie l'image de la fonction
		this.getPhase=function(w)
			{
				return 0;	//0 par defaut
			}

		this.getPhaseAsympt=function(w)
			{
				return 0;
			}

		//getter/setter affiche analytique
		this.afficheAnalytique=function(_affAna)
			{
				if(typeof(_affAna) != 'undefined')
					this._afficheAnalytique=_affAna;
				return this._afficheAnalytique;
			}
		//getter/setter affiche asymptotique
		this.afficheAsymptotique=function(_affAsymt)
			{
				if(typeof(_affAsymt) != 'undefined')
					this._afficheAsymptotique=_affAsymt;
				return this._afficheAsymptotique;
			}
		//getter/setter analytique global
		this.analytiqueGlobal=function(_anaGlob)
			{
				if(typeof(_anaGlob) != 'undefined')
					this._analytiqueGlobal=_anaGlob;
				return this._analytiqueGlobal;
			}
		//getter/setter asymptotique global
		this.asymptotiqueGlobal=function(_asymptGlob)
			{
				if(typeof(_asymptGlob) != 'undefined')
					this._asymptotiqueGlobal=_asymptGlob;
				return this._asymptotiqueGlobal;
			}

		//getter/setter de la couleur
		this.couleur=function(_coul)
			{
				if(typeof(_coul) != 'undefined')
					{
						this._couleur=_coul.toUpperCase();//Affectation de la couleur (en majuscule, please !)
						this.courbeGdb.stroke(_coul);//changement des couleur de courbes
						this.courbeGdbAsympt.stroke(_coul);//changement des couleur de courbes
					}
				return this._couleur;
			}

		//Getter/setter type de traits (analytiques)
		this.typeTraitAnalytique=function(_type)
			{
				if(typeof(_type) != 'undefined')
					this._typeTraitAnalytique=_type;//Affectation de la couleur
				return this._typeTraitAnalytique;
			}

		//Getter/setter type de traits (asymptotique)
		this.typeTraitAsymptotique=function(_type)
			{
				if(typeof(_type) != 'undefined')
					this._typeTraitAsymptotique=_type;//Affectation de la couleur
				return this._typeTraitAsymptotique;
			}



		//Getter/setter type de l'inversion ou non
		this.inverse=function(_inv)
			{
				if(typeof(_inv) != 'undefined')
					this._inverse=_inv;//Affectation de la couleur
				return this._inverse;
			}




		//Getter/setter de la borne inf de omega
		this.bornesW=function(_b)
			{
				if(typeof(_b) != 'undefined')
					this._bornesW=_b;//Affectation de la couleur
				return this._bornesW;
			}


		//Getter/setter de la borne inf de omega
		this.nbPoints=function(_nb)
			{
				if(typeof(_nb) != 'undefined')
					{
						if(_nb<2)
							_nb=2;
						this._nbPoints=_nb;//Affectation de la couleur
					}
				return this._nbPoints;
			}

		//Getter/Setter du paramètre K
		this.K=function()
			{
				
			}


		//Getter/Setter de l'epaisseur analytique
		this.epaisseurAnalytique=function(_e)
			{
				if(typeof(_e) != 'undefined')
					this._epaisseurAnalytique=_e;//Affectation de la couleur
				return this._epaisseurAnalytique;
			}

		//Getter/Setter de l'epaisseur asymptotique
		this.epaisseurAsymptotique=function(_e)
			{
				if(typeof(_e) != 'undefined')
					this._epaisseurAsymptotique=_e;//Affectation de la couleur
				return this._epaisseurAsymptotique;
			}

	//==========================
	//Autres fonctions membres
	//==========================
		

		//fonction qui converti les type de trait ("normal", "pointillets" ou "points") en tableau
		this.getDashFromTypeTrait=function(type,epaisseur)
			{
				switch(type)
					{
						case "pointillets":
							return [5*epaisseur,5*epaisseur];
							break;
						case "points":
							return [0.001*epaisseur,4*epaisseur];
							break;
						default:
							return [1];
					}
			}

		//Fonction qui affiche le type de fonction
		this.type=function()
			{
				return "";
			}

		//Fonction qui affiche le type de fonction
		this.afficheType=function()
			{
				return "Vide";
			}
		//Fonction qui affihce l'équation
		this.afficheEquation=function()
			{
				return '<div class="equation">0 (par defaut)</div>';
			}
		//Fonction qui affihce l'équation
		this.afficheParametres=function()
			{
				return '- <em>vide</em> -';
			}



	//==========================
	//Arborescence
	//==========================

	/*Ajoute la fonction à l'arbre des fonctions========*/
	this.ajouteLigneArbre=function(i)
		{
			$("#arborescence2").append(
'			<div class="fonction" id="fonction-'+i+'" style="background-color:'+eclaircitCouleurHex(this.couleur(),220)+'">'+
'				<div class="titre-fonction" style="background-color:'+eclaircitCouleurHex(this.couleur(),150)+'">'+//getCouleurTitreFonction(
'					<span class="fleche-arbo">&#9656;</span> '+
'					<img class="icone" src="'+this.icone()+'"/> '+
'					'+this.nom()+
'					<span id="'+i+'-carreCouleur" style="color:'+this.couleur()+';font-size:x-large;">&#9632;</span>'+
'				</div>'+
'				<div class="options-fonctions">'+
'					<div class="options-parametres">'+
'						<div class="parametres-titre">'+
'							<span class="fleche-arbo">&#9656;</span>'+
'							<img class="icone" src="./sources/icones/iconeParam.png" alt=""/>'+
'							Paramètres'+
'						</div>'+
'						<div class="items">'+
'							'+this.ajouteLigneArbre2_parametres(i)+
'						</div>'+
'					</div>'+
'					<div class="options-affichage">'+
'						<div class="Affichage-titre">'+
'							<span class="fleche-arbo">&#9656;</span>'+
'							<img class="icone" src="./sources/icones/iconeAffichage.png" alt=""/>'+
'							Affichage'+
'						</div>'+
'						<div class="items">'+
'							'+this.ajouteLigneArbre2_affichage(i)+
'						</div>'+
'					</div>'+
					this.ajouteLigneArbre2_supprimer(i)+
'				</div>'+
'			</div>');





		}
		//FIN D'AJOUT DANS L'ARBORESENCE


	//Bouton Supprimer ------
	this.ajouteLigneArbre2_supprimer=function(i)
		{
			return ''+
'					<div class="options-supprimer" onclick="$(\'#dialogSupprime span\').text('+i+');$(\'#dialogSupprime\').dialog(\'open\');">'+
'						<img class="icone" src="./sources/icones/iconeDelete.png" alt="(X)"/>'+
'						Supprimer'+
'					</div>';
		}

	//fonction qui ajoute la liste des paramètres dans l'arborescence
	this.ajouteLigneArbre2_parametres=function(i)
		{
			return 	this.ajouteLigneArbre2_Parametre_K(i)+
				this.ajouteLigneArbre2_boutonInverse(i);
		}

			//Parametre "inverse"
			this.ajouteLigneArbre2_boutonInverse=function(i)
				{
					res=''+
'						<div class="item">'+
	'						<input type="checkbox" name="'+i+'-inverse" id="'+i+'-inverse" onclick="var fonc=listeFonctions['+i+'];fonc.inverse(this.checked);fonc.updateCourbes();"';//updateAffichageListe();
					if(this.inverse())
						res+='checked="true"';
					res+='/>'+
	'						<label for="'+i+'-inverse">Inverse</label>'+
'						</div>';
					return res;
				}

			//Parametre "K"
			this.ajouteLigneArbre2_Parametre_K=function(i)
				{
					res=''+
'						<div class="item">'+
	'						<label for="'+i+'-input-param-K-number">K = </label>'+
	'						<input type="number" name="'+i+'-input-param-K-number" id="'+i+'-input-param-K-number" min="0" step="0.5" style="width:50px;" value="'+this.K()+'" oninput="updateParametreK('+i+',this.value)"/>'+
	'						<input type="range" name="'+i+'-input-param-K-range" id="'+i+'-input-param-K-range"  style="width:120px;" min="-5" max="5" step="0.1" value="'+log10(this.K())+'" oninput="updateParametreK('+i+',Math.pow(10,this.value))"/>'+
'						</div>';
					return res;
				}

	//fonction qui ajoute la liste des options d'affichage dans l'arborescence
	this.ajouteLigneArbre2_affichage=function(i)
		{
			return 	this.ajouteLigneArbre2_boutonsAffichage(i)+
				this.ajouteLigneArbre2_boutonsCombine(i)+
				this.ajouteLigneArbre2_boutonCouleur(i)+
				this.ajouteLigneArbre2_boutonBornes(i)+
				this.ajouteLigneArbre2_boutonNbPoints(i);
		}

			//Boutons Affichage
			this.ajouteLigneArbre2_boutonsAffichage=function(i)
				{
					res=''+
'						<div class="item">'+
	'						<input id="'+i+'-afficheAnalytique" name="'+i+'-afficheAnalytique" type="checkbox" onclick="updateAfficheAnalytique('+i+',this.checked)" ';
							if(this.afficheAnalytique())
								res+='checked="true" ';
							res+='/>'+
'							<label for="'+i+'-afficheAnalytique">'+
'								<img class="icone" src="./sources/icones/iconeReel.png"/>'+
'								Analytique'+
'							</label>'+
'							<select class="typeTrait" id="'+i+'-typeTraitAnalytique" name="'+i+'-typeTraitAnalytique" size="1" onchange="updateTypeTraitAnalytique('+i+',this.value);">'+
'								<option value="normal"';
								if(this.typeTraitAnalytique()=="normal")
									res+=' selected="selected"';
								res+='>___</option>'+
'								<option value="pointillets"';
								if(this.typeTraitAnalytique()=="pointillets")
									res+=' selected="selected"';
								res+='>---</option>'+
'								<option value="points"';
								if(this.typeTraitAnalytique()=="points")
									res+=' selected="selected"'
								res+='>...</option>'+
'							</select>'+
'							<input id="'+i+'-epaisseurAnalytique" name="'+i+'-epaisseurAnalytique" type="number" min="0" size="5" style="width:30px;" value="'+this.epaisseurAnalytique()+'" onchange="updateEpaisseurAnalytique('+i+',this.value)"/>'+
'						</div>'+
'						<div class="item">'+
'							<input id="'+i+'-afficheAsympt" name="'+i+'-afficheAsympt" type="checkbox" onclick="updateAfficheAsymptotique('+i+',this.checked)" ';
							if(this.afficheAsymptotique())
								res+='checked="true" ';
							res+='/>'+
'							<label for="'+i+'-afficheAsympt">'+
'								<img class="icone" src="./sources/icones/iconeAsympt.png"/>'+
'								Asymptotique'+
'							</label>'+
'							<select class="typeTrait" id="'+i+'-typeTraitAsympt" name="'+i+'-typeTraitAsympt" size="1" onchange="updateTypeTraitAsymptotique('+i+',this.value);">'+
'								<option value="normal"';
								if(this.typeTraitAsymptotique()=="normal")
									res+=' selected="selected"';
								res+='>___</option>'+
'								<option value="pointillets"';
								if(this.typeTraitAsymptotique()=="pointillets")
									res+=' selected="selected"';
								res+='>---</option>'+
'								<option value="points"';
								if(this.typeTraitAsymptotique()=="points")
									res+=' selected="selected"'
								res+='>...</option>'+
'							</select>'+
'							<input id="'+i+'-epaisseurAsymptotique" name="'+i+'-epaisseurAnalytique" type="number" min="0" size="5" style="width:30px;" value="'+this.epaisseurAsymptotique()+'" onchange="updateEpaisseurAsymptotique('+i+',this.value)"/>'+
'						</div>';
					return res;
				}
		//Boutons Combine
		this.ajouteLigneArbre2_boutonsCombine=function(i)
			{
					res=''+
'						<div class="item">'+
'							<input id="'+i+'-check-combineAnalytique" name="'+i+'-check-combineAnalytique" type="checkbox" onclick="c=listeFonctions['+i+'];c.analytiqueGlobal(this.checked);c.updateCourbes();" ';
							if(this.analytiqueGlobal())
								res+='checked="true" ';
							res+='/>'+
'							<label for="'+i+'-check-combineAnalytique">'+
'								<img class="icone" src="./sources/icones/iconeCombineReel.png"/>'+
'								Combine Analytique'+
'							</label>'+
'						</div>'+
'						<div class="item">'+
'							<input id="'+i+'-check-combineAsympt" name="'+i+'-check-combineAsympt" type="checkbox" onclick="c=listeFonctions['+i+'];c.asymptotiqueGlobal(this.checked);c.updateCourbes();" ';
							if(this.asymptotiqueGlobal())
								res+='checked="true" ';
							res+='/>'+
'							<label for="'+i+'-check-combineAsympt">'+
'								<img class="icone" src="./sources/icones/iconeCombineAsympt.png"/>'+
'								Combine Asymptotique'+
'							</label>'+
'						</div>';
					return res;
				}


		//Boutons Couleurs
		this.ajouteLigneArbre2_boutonCouleur=function(i)
			{
				return ''+
'						<div class="item">'+
'							<label for="'+i+'-input-couleur">'+
'								Couleur : '+
'							</label>'+
'							<input id="'+i+'-input-couleur" name="'+i+'-input-couleur" type="color" value="'+this.couleur()+'" onchange="updateCouleur('+i+',this.value)"/>'+
'						</div>';
			}

		//Bouton des bornes de omega
		this.ajouteLigneArbre2_boutonBornes=function(i)
			{
				return ''+
'						<div class="item">'+
'							Bornes : '+
'							<label for="'+i+'-input-wMin">10</label><sup><input id="'+i+'-input-wMin" name="'+i+'-input-wMin" size="3" style="width:30px;" type="number" value="'+this.bornesW().mini+'" onchange="updateBorneInfWFonction('+i+',this.value)"/></sup>'+
'							&le; &omega; &le; '+
'							<label for="'+i+'-input-wMax">10</label><sup><input id="'+i+'-input-wMax" name="'+i+'-input-wMax" size="3" style="width:30px;" type="number" value="'+this.bornesW().maxi+'" onchange="updateBorneSupWFonction('+i+',this.value)"/></sup>'+
'						</div>';
			}

		//Bouton des bornes de omega
		this.ajouteLigneArbre2_boutonNbPoints=function(i)
			{
				return ''+
'						<div class="item">'+
'							<label for="'+i+'-input-nbPoints-number">Nb de points :</label> '+
'							<input id="'+i+'-input-nbPoints-number" name="'+i+'-input-nbPoints-number" size="20" style="width:40px;" min="2"  type="number" value="'+this.nbPoints()+'" oninput="updatenbPoints('+i+',this.value)"/>'+
'							<input id="'+i+'-input-nbPoints-range" name="'+i+'-input-nbPoints-range" size="5" style="width:80px;" min="2" max="300" type="range" value="'+this.nbPoints()+'" oninput="updatenbPoints('+i+',this.value)"/>'+
'						</div>';
			}



	//==========================
	//Graphique
	//==========================

		this.tabCourbeGdb=[0,0];	//Points du gain en db
		this.tabCourbeGdbAsympt=[0,0];	//Points du gain en db asymptotique
		this.tabCourbePhase=[0,0];	//Points de la phase
		this.tabCourbePhaseAsympt=[0,0];	//Points de la Phase asymptotique

		this.courbeGdb=new Kinetic.Line({	points:this.tabCourbeGdb,
							x:grapheBodeGdb.repere.position().x,
							y:grapheBodeGdb.repere.position().y,
							stroke:this.couleur(),
							lineCap: 'round',
							lineJoin: 'round',
							strokeWidth:this.epaisseurAnalytique()
						});
		this.courbeGdbAsympt=new Kinetic.Line({
							points:this.tabCourbeGdbAsympt,
							x:grapheBodeGdb.repere.position().x,
							y:grapheBodeGdb.repere.position().y,
							stroke:this.couleur(),
							lineCap: 'round',
							lineJoin: 'round',
							strokeWidth:this.epaisseurAsymptotique(),
							dash: [5, 5]
						});
		this.courbePhase=new Kinetic.Line({
							points:this.tabCourbePhase,
							x:grapheBodeGdb.repere.position().x,
							y:grapheBodeGdb.repere.position().y,
							stroke:this.couleur(),
							lineCap: 'round',
							lineJoin: 'round',
							strokeWidth:2
						});
		this.courbePhaseAsympt=new Kinetic.Line({
							points:this.tabCourbePhaseAsympt,
							x:grapheBodeGdb.repere.position().x,
							y:grapheBodeGdb.repere.position().y,
							stroke:this.couleur(),
							lineCap: 'round',
							lineJoin: 'round',
							strokeWidth:1,
							dash: [5, 5]
						});
						

		grapheBodeGdb.calqueCourbes.add(this.courbeGdb);
		grapheBodeGdb.calqueCourbes.add(this.courbeGdbAsympt);
		grapheBodePhase.calqueCourbes.add(this.courbePhase);
		grapheBodePhase.calqueCourbes.add(this.courbePhaseAsympt);



		//Met a jour toutes les courbes
		this.updateCourbes=function(redessine)
			{

				redessine = typeof redessine !== 'undefined' ? redessine : true;

				this.updateCourbeGdb();
				this.updateCourbeGdbAsympt();
				this.updateCourbePhase();
				this.updateCourbePhaseAsympt();

				if(redessine)
					{	grapheBodeGdb.draw();//update le graphique Gdb
						grapheBodePhase.draw();//update le graphique de phase
					}
			}



		//Met a jour la courbe du gain en db analytique
		this.updateCourbeGdb=function()
			{
				//shape
				this.tabCourbeGdb=[];
				var pas=(this.bornesW().maxi-this.bornesW().mini)/(this.nbPoints()-1);
				for(w=this.bornesW().mini;w<=this.bornesW().maxi;w+=pas)//Pour chaque point
					{
						var point=grapheBodeGdb.coordonnees(w,this.getGdb(Math.pow(10,w)));
						this.tabCourbeGdb=this.tabCourbeGdb.concat([point.x,point.y]);//On ajoute le point
					}
				this.courbeGdb.points(this.tabCourbeGdb);//On met à jour le dessin
				this.courbeGdb.visible(this.afficheAnalytique());//Rend invisible ou non
				this.courbeGdb.stroke(this.couleur());//Met a jour la couleur de la ligne
				this.courbeGdb.strokeWidth(this.epaisseurAnalytique());//Modifie l'épaisseur des traits
				this.courbeGdb.dash(this.getDashFromTypeTrait(this.typeTraitAnalytique(),this.epaisseurAnalytique()));//modifie le type de traits (pointillets, etc...)
				if(this.afficheType()!="Fonction Globale")//Si c'est pas la fonction globale...
					listeFonctions[0].updateCourbeGdb();//Met a jour la courbe globale
			}


		//Met a jour la courbe du gain en db asymptotique
		this.updateCourbeGdbAsympt=function()
			{
				this.tabCourbeGdbAsympt=[];
				var pas=(this.bornesW().maxi-this.bornesW().mini)/(this.nbPoints()-1);
				for(w=this.bornesW().mini;w<=this.bornesW().maxi;w+=pas)//Pour chaque point
					{
						var point=grapheBodeGdb.coordonnees(w,this.getGdbAsympt(Math.pow(10,w)));
						this.tabCourbeGdbAsympt=this.tabCourbeGdbAsympt.concat([point.x,point.y]);//On ajoute le point
					}
				this.courbeGdbAsympt.points(this.tabCourbeGdbAsympt);//On met à jour le dessin
				this.courbeGdbAsympt.visible(this.afficheAsymptotique());//Rend invisible ou non
				this.courbeGdbAsympt.stroke(this.couleur());//Met a jour la couleur de la ligne
				this.courbeGdbAsympt.strokeWidth(this.epaisseurAsymptotique());//Modifie l'épaisseur des traits
				this.courbeGdbAsympt.dash(this.getDashFromTypeTrait(this.typeTraitAsymptotique(),this.epaisseurAsymptotique()));//modifie le type de traits (pointillets, etc...)
				if(this.afficheType()!="Fonction Globale")//Si c'est pas la fonction globale...
					listeFonctions[0].updateCourbeGdbAsympt();//Met a jour la courbe globale
			}

		//Met a jour la courbe de phase
		this.updateCourbePhase=function()
			{
				this.tabCourbePhase=[];
				var pas=(this.bornesW().maxi-this.bornesW().mini)/(this.nbPoints()-1);
				for(w=this.bornesW().mini;w<=this.bornesW().maxi;w+=pas)//Pour chaque point
					{
						var point=grapheBodePhase.coordonnees(w,this.getPhase(Math.pow(10,w)));
						this.tabCourbePhase=this.tabCourbePhase.concat([point.x,point.y]);//on ajoute le point
					}
				this.courbePhase.points(this.tabCourbePhase);//On met à jour le dessin
				this.courbePhase.visible(this.afficheAnalytique());//Rend invisible ou non
				this.courbePhase.stroke(this.couleur());//Met a jour la couleur de la ligne
				this.courbePhase.strokeWidth(this.epaisseurAnalytique());//Modifie l'épaisseur des traits
				this.courbePhase.dash(this.getDashFromTypeTrait(this.typeTraitAnalytique(),this.epaisseurAnalytique()));//modifie le type de traits (pointillets, etc...)
				if(this.afficheType()!="Fonction Globale")//Si c'est pas la fonction globale...
					listeFonctions[0].updateCourbePhase();//Met a jour la courbe globale
			}

		//Met a jour la courbe du phase asymptotique
		this.updateCourbePhaseAsympt=function()
			{
				this.tabCourbePhaseAsympt=[];
				var pas=(this.bornesW().maxi-this.bornesW().mini)/(this.nbPoints()-1);
				for(w=this.bornesW().mini;w<=this.bornesW().maxi;w+=pas)//Pour chaque point
					{
						var point=grapheBodePhase.coordonnees(w,this.getPhaseAsympt(Math.pow(10,w)));
						this.tabCourbePhaseAsympt=this.tabCourbePhaseAsympt.concat([point.x,point.y]);//on ajoute le point
					}
				this.courbePhaseAsympt.points(this.tabCourbePhaseAsympt);//On met à jour le dessin
				this.courbePhaseAsympt.visible(this.afficheAsymptotique());//Rend invisible ou non
				this.courbePhaseAsympt.stroke(this.couleur());//Met a jour la couleur de la ligne
				this.courbePhaseAsympt.strokeWidth(this.epaisseurAsymptotique());//Modifie l'épaisseur des traits
				this.courbePhaseAsympt.dash(this.getDashFromTypeTrait(this.typeTraitAsymptotique(),this.epaisseurAsymptotique()));//modifie le type de traits (pointillets, etc...)
				if(this.afficheType()!="Fonction Globale")//Si c'est pas la fonction globale...
					listeFonctions[0].updateCourbePhaseAsympt();//Met a jour la courbe globale
			}




	//==========================
	//Export LaTex
	//==========================

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodeGdbAnalytiqueLaTex=function()
			{
				return "0";	//0 par defaut
			}

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodeGdbAsymptotiqueLaTex=function()
			{
				return "0";	//0 par defaut
			}
		//Fonction qui renvoie juste la fonction 
		this.fonctionBodePhaseAnalytiqueLaTex=function()
			{
				return "0";	//0 par defaut
			}

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodePhaseAsymptotiqueLaTex=function()
			{
				return "0";	//0 par defaut
			}


		this.exporteCouleurLaTex=function()
			{
				var coul=this.couleur();
				if(couleursLaTexConnues[this.couleur()]==undefined)//Si ce n'est pas une couleur connue
					return "couleurBode"+this.couleur().slice(1,7)+",";	//On renvoie la couleur précédemment créée
				return couleursLaTexConnues[this.couleur()]+",";	//Sinon on renvoie la couleur avec son nom
			}

		//Fonction qui renvoie le mot clé indiquant le type de trait dans les options LaTex pour la courbe analytique
		this.exporteTypeTraitAnalytiqueLaTex=function()
			{
				if(this.typeTraitAnalytique()=="normal")
					return "";
				if(this.typeTraitAnalytique()=="pointillets")
					return "dashed,"
				return "";
			}

		//Fonction qui renvoie le mot clé indiquant le type de trait dans les options LaTex pour la courbe asymptotique
		this.exporteTypeTraitAsymptotiqueLaTex=function()
			{
				if(this.typeTraitAsymptotique()=="normal")
					return "";
				if(this.typeTraitAsymptotique()=="pointillets")
					return "dashed,"
				if(this.typeTraitAsymptotique()=="points")
					return "dotted,"
				return "";
			}

		this.exporteNbPointsLaTex=function()
			{
				return "samples="+this.nbPoints()+",";
			}

		this.exporteEpaisseurAnalytiqueLaTex=function()
			{
				return "line width="+this.epaisseurAnalytique()/2;
			}

		this.exporteEpaisseurAsymptotiqueLaTex=function()
			{
				return "line width="+this.epaisseurAsymptotique()/2;
			}



		//Fonction qui renvoie le code LaTex correspondant à la fonction
		this.exporteBodeGdbAnalytiqueLaTex=function()
			{
				return "		\\BodeAmp["+this.exporteCouleurLaTex()+this.exporteTypeTraitAnalytiqueLaTex()+this.exporteNbPointsLaTex()+this.exporteEpaisseurAnalytiqueLaTex()+"]{"+this.bornesW().mini+":"+this.bornesW().maxi+"}{"+this.fonctionBodeGdbAnalytiqueLaTex()+"}\n";
			}

		//Fonction qui renvoie le code LaTex correspondant à la fonction
		this.exporteBodeGdbAsymptotiqueLaTex=function()
			{
				return "		\\BodeAmp["+this.exporteCouleurLaTex()+this.exporteTypeTraitAsymptotiqueLaTex()+this.exporteNbPointsLaTex()+this.exporteEpaisseurAsymptotiqueLaTex()+"]{"+this.bornesW().mini+":"+this.bornesW().maxi+"}{"+this.fonctionBodeGdbAsymptotiqueLaTex()+"}\n";
			}

		//Fonction qui renvoie le code LaTex correspondant à la fonction
		this.exporteBodePhaseAnalytiqueLaTex=function()
			{
				return "		\\BodeArg["+this.exporteCouleurLaTex()+this.exporteTypeTraitAnalytiqueLaTex()+this.exporteNbPointsLaTex()+this.exporteEpaisseurAnalytiqueLaTex()+"]{"+this.bornesW().mini+":"+this.bornesW().maxi+"}{"+this.fonctionBodePhaseAnalytiqueLaTex()+"}\n";
			}

		//Fonction qui renvoie le code LaTex correspondant à la fonction
		this.exporteBodePhaseAsymptotiqueLaTex=function()
			{
				return "		\\BodeArg["+this.exporteCouleurLaTex()+this.exporteTypeTraitAsymptotiqueLaTex()+this.exporteNbPointsLaTex()+this.exporteEpaisseurAsymptotiqueLaTex()+"]{"+this.bornesW().mini+":"+this.bornesW().maxi+"}{"+this.fonctionBodePhaseAsymptotiqueLaTex()+"}\n";
			}


	//==========================
	//Export SVG
	//==========================

		//Export du gain
		this.exportGdbSVG=function()
			{
				if(this.afficheAnalytique())
					return this.courbeGdb.exportSVG();
				return "";
			}

		//Export du gain
		this.exportGdbAsymptSVG=function()
			{
				if(this.afficheAsymptotique())
					return this.courbeGdbAsympt.exportSVG();
				return ""
			}

		//Export du gain
		this.exportPhaseSVG=function()
			{
				if(this.afficheAnalytique())
					return this.courbePhase.exportSVG();
				return "";
			}

		//Export du gain
		this.exportPhaseAsymptSVG=function()
			{
				if(this.afficheAsymptotique())
					return this.courbePhaseAsympt.exportSVG();
				return "";
			}



	//==========================
	//Export XML
	//==========================

		//Export XML
		this.exportXML=function()
			{
				var rendu="	<fonction type=\""+this.type()+"\">\n"+
					"		<parametres>\n"+
					this.exportParametresXML()+
					"			<inverse>"+this.inverse()+"</inverse>\n"+			
					"		</parametres>\n"+
					"		<affichage>\n"+
					"			<afficheAnalytique>\n"+
					"				<affiche>"+this.afficheAnalytique()+"</affiche>\n"+
					"				<typeTrait>"+this.typeTraitAnalytique()+"</typeTrait>\n"+
					"				<epaisseur>"+this.epaisseurAnalytique()+"</epaisseur>\n"+
					"			</afficheAnalytique>\n"+
					"			<afficheAsymptotique>\n"+
					"				<affiche>"+this.afficheAsymptotique()+"</affiche>\n"+
					"				<typeTrait>"+this.typeTraitAsymptotique()+"</typeTrait>\n"+
					"				<epaisseur>"+this.epaisseurAsymptotique()+"</epaisseur>\n"+
					"			</afficheAsymptotique>\n"+
					"			<combineAnalytique>"+this.analytiqueGlobal()+"</combineAnalytique>\n"+
					"			<combineAsymptotique>"+this.asymptotiqueGlobal()+"</combineAsymptotique>\n"+
					"			<couleur>"+this.couleur()+"</couleur>\n"+
					"			<bornes>\n"+
					"				<mini>"+this.bornesW().mini+"</mini>\n"+
					"				<maxi>"+this.bornesW().maxi+"</maxi>\n"+
					"			</bornes>\n"+
					"			<nbPoints>"+this.nbPoints()+"</nbPoints>\n"+
					"		</affichage>\n"+
					"	</fonction>\n"
				return rendu;
			}

		this.exportParametresXML=function()
			{
				return"";
			}


		//Fonction qui charge la fonction à partir du XML
		this.loadXML=function(xml)
			{

				this.inverse		(Number($(xml).find("inverse").text()));

				this.afficheAnalytique	(Number($(xml).find("afficheAnalytique").find("affiche").text()));
				this.typeTraitAnalytique($(xml).find("afficheAnalytique").find("typeTrait").text());
				this.epaisseurAnalytique(Number($(xml).find("afficheAnalytique").find("epaisseurTrait").text()));

				this.afficheAsymptotique	(Number($(xml).find("afficheAsymptotique").find("affiche").text()));
				this.typeTraitAsymptotique	($(xml).find("afficheAsymptotique").find("typeTrait").text());
				this.epaisseurAsymptotique	(Number($(xml).find("afficheAsymptotique").find("epaisseurTrait").text()));

				this.analytiqueGlobal	(Number($(xml).find("combineAnalytique").text()));
				this.asymptotiqueGlobal	(Number($(xml).find("combineAsymptotique").text()));

				this.couleur	($(xml).find("couleur").text());

				this.bornesW	({	mini:Number($(xml).find("bornes").find("mini").text()),
							maxi:Number($(xml).find("bornes").find("maxi").text())});

				this.nbPoints	(Number($(xml).find("nbPoints").text()));

				//parametres
				this.loadParametresXML(xml)
			}

		//Fonction (virtuelle) qui charge les paramètres XML (voir chaque fonction)
		this.loadParametresXML=function(xml)
			{
			}
}

//Fonction.prototype = Object.create(Kinetic.Group.prototype);//On recopie le prototype de Kinteic.Group
Fonction.prototype.constructor = Fonction;//On recopie le constructeur de Noeud dans son prototype


