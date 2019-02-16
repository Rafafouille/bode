//Fonction qui servira de constructeur pour la classe Noeud
var FonctionGlobale = function()
{

	//==========================
	//Constructeur issu de l'heritage
	//==========================
		Fonction.call(this);

	//==========================
	//Variables Membres
	//==========================

		//Redefinition
		this._type="Global";//Nom de la fonction
		this._nom="Fonction Globale";//Nom de la fonction
		this._couleur="#000000";
		this._epaisseurAnalytique=4;//Epaisseur du trait
		this._epaisseurAsymptotique=3;//Epaisseur du trait
		this._icone="./sources/icones/iconeGlobal.png";
		this._afficheMargeDeGain=true;
		this._afficheMargeDePhase=true;
		this._epaisseurFlechesMarges=3;
		this._tailleBoutFlecheMarges=15;//Taille des extrémité de flèche

	//==========================
	//Getters/Setters
	//==========================

		//Renvoie s'il faut afficher la marge de gain (ou pas)
		this.afficheMargeDeGain=function(a)
			{
				if(typeof(a) != 'undefined')
					this._afficheMargeDeGain=a;
				return this._afficheMargeDeGain;
			}
			
		//Renvoie s'il faut afficher la marge de phase (ou pas)
		this.afficheMargeDePhase=function(a)
			{
				if(typeof(a) != 'undefined')
					this._afficheMargeDePhase=a;
				return this._afficheMargeDePhase;
			}
	
		//Renvoie l'épaisseur de ligne des flèches de marge
		this.epaisseurFlechesMarges=function(e)
			{
				if(typeof(e) != 'undefined')
					this._epaisseurFlechesMarges=e;
				return this._epaisseurFlechesMarges;
			}
	
		//Renvoie la longueur de la tete de la flèche des marges
		this.tailleBoutFlecheMarges=function(t)
			{
				if(typeof(t) != 'undefined')
					this._tailleBoutFlecheMarges=t;
				return this._tailleBoutFlecheMarges;
			}
	
	//==========================
	//Fonctions Membres
	//==========================

		//Renvoie l'image de la fonction
		this.getGdb=function(w)
			{
				var val=0;
				if(listeFonctions.length<=1)
					return 0;
				for(i=1;i<listeFonctions.length;i++)
					{
						eq=listeFonctions[i];
						if(eq.analytiqueGlobal())
							val+=eq.getGdb(w);
					}
				if(this.inverse())
					return -val;
				else
					return val;
			}

		this.getGdbAsympt=function(w)
			{
				var val=0;
				if(listeFonctions.length<=1)
					return 0;
				for(i=1;i<listeFonctions.length;i++)
					{
						eq=listeFonctions[i];
						if(eq.asymptotiqueGlobal())
							val+=eq.getGdbAsympt(w);
					}
				if(this.inverse())
					return -val;
				else
					return val;
			}
		//Renvoie l'image de la fonction
		this.getPhase=function(w)
			{
				var val=0;
				if(listeFonctions.length<=1)
					return 0;
				for(i=1;i<listeFonctions.length;i++)
					{
						eq=listeFonctions[i];
						if(eq.analytiqueGlobal())
							val+=eq.getPhase(w);
					}
				if(this.inverse())
					return -val;
				else
					return val;
			}

		this.getPhaseAsympt=function(w)
			{
				var val=0;
				if(listeFonctions.length<=1)
					return 0;
				for(i=1;i<listeFonctions.length;i++)
					{
						eq=listeFonctions[i];
						if(eq.asymptotiqueGlobal())
							val+=eq.getPhaseAsympt(w);
					}
				if(this.inverse())
					return -val;
				else
					return val;
			}

		//Fonction qui affiche le type de fonction
		this.type=function()
			{
				return "globale";
			}
		//Fonction qui affiche le type de fonction
		this.afficheType=function()
			{
				return "Fonction Globale";
			}
		//Fonction qui affiche l'équation
		this.afficheEquation=function()
			{
				if(this.inverse())
					return '<span class="equation">'+fraction('1','&Pi;<sub>i=0</sub><sup>i='+(listeFonctions.length-1))+'</sup></span>';
				else
					return '<span class="equation">&Pi;<sub>i=0</sub><sup>i='+(listeFonctions.length-1)+'</sup></span>';
			}

		//Affiche la ligne HTML de la fonction (i=numero de la fonction)
		this.afficheLigne=function(i)
			{
				var li='<div class="ligneFonction" style="background:'+this.couleur()+';background:linear-gradient(#FFFFFF,'+this.couleur()+')">';
				li+='		<form>';
				li+='			<table>';
				li+='				<tr>';



				li+='					<td class="listeTypeFonction">('+this.afficheType()+')';
				li+='						<br/><strong>H<sub>'+i+'</sub>(p) = '+this.afficheEquation()+'</strong>';
				li+='						<br/><input	id="inverse'+i+'"	name="inverse"	onclick="c=listeFonctions['+i+'];c.inverse(this.checked);c.updateCourbes();updateAffichageListe();"	type="checkbox"	';
			if(this.inverse())
				li+='checked="true"';
				li+='/><label for="inverse'+i+'">Inverse</label>';
				li+='					</td>'




				li+='					<td>';
				li+='						<label for="couleur'+i+'">Couleur=</label><input id="couleur'+i+'" name="couleur'+i+'" type="text" size="6" value="'+this.couleur()+'" onchange="c=listeFonctions['+i+'];c.couleur(this.value);updateAffichageListe();grapheBodeGdb.draw();grapheBodePhase.draw();"/>';
				li+='						'+this.getFromulaireParametres(i);
				li+='					</td>';




				li+='					<td>';
				li+='						<input	id="afficheAnal'+i+'"	name="afficheAnal"	onclick="c=listeFonctions['+i+'];c.afficheAnalytique(this.checked);c.updateCourbes();"	type="checkbox"	';
			if(this.afficheAnalytique())
				li+='checked="true"';
				li+='/>';
				li+='						<label for="afficheAnal'+i+'">Analytique (seul)</label>';
				li+='							<select name="typeTraitAnalytique">';
				li+='								<option';
			if(this.typeTraitAnalytique()=="normal")
				li+=' selected="true"';
				li+='>_______</option>';
				li+='								<option';
			if(this.typeTraitAnalytique()=="pointillets")
				li+=' selected="true"';
				li+='>_ _ _ _</option>';
				li+='								<option';
			if(this.typeTraitAnalytique()=="points")
				li+=' selected="true"';
				li+='>. . . . . .</option>';
				li+='							</select>';
				li+='						<br/><input	id="afficheAsympt'+i+'"	name="afficheAsympt"	onclick="c=listeFonctions['+i+'];c.afficheAsymptotique(this.checked);c.updateCourbes();"	type="checkbox"	';
			if(this.afficheAsymptotique())
				li+='checked="true"';
				li+='/>';
				li+='						<label for="afficheAsympt'+i+'">Asymptotique (seul)</label>';
				li+='							<select name="typeTraitAnalytique">';
				li+='								<option';
			if(this.typeTraitAsymptotique()=="normal")
				li+=' selected="true"';
				li+='>_______</option>';
				li+='								<option';
			if(this.typeTraitAsymptotique()=="pointillets")
				li+=' selected="true"';
				li+='>_ _ _ _</option>';
				li+='								<option';
			if(this.typeTraitAsymptotique()=="points")
				li+=' selected="true"';
				li+='>. . . . . .</option>';
				li+='							</select>';
				li+='					</td>';


				li+='					<td>\n';
				li+='						<label for="wmin'+i+'">&omega;<sub>min</sub>=10</label><sup><input type="text" id="wmin'+i+'" name="wmin'+i+'" value="'+this.bornesW().mini+'" size="1" onchange="updateBornesWFonction('+i+')"/></sup>'
				li+='						<br/><label for="wmax'+i+'">&omega;<sub>max</sub>=10</label><sup><input type="text" id="wmax'+i+'" name="wmax'+i+'" value="'+this.bornesW().maxi+'" size="1" onchange="updateBornesWFonction('+i+')"/></sup>'
				li+='						<br/><label for="nbPoints'+i+'">nb Points=</label><input name="nbPoints'+i+'" id="nbPoints'+i+'" type="text" value="'+this.nbPoints()+'" size="3" onchange="updateNbPointsFonction('+i+')"/>'
				li+='					</td>\n';


				li+='				</tr>';
				li+='			</table>';
				li+='		</form>';
				li+='	</div>';

				return li;
			}
			
		
		//Renvoie la liste des pulsation à 0 dB.	
		this.getW0dB=function()
		{
			var pas=(this.bornesW().maxi-this.bornesW().mini)/(this.nbPoints()-1);
			var pulsations=[];
			for(w=this.bornesW().mini;w<this.bornesW().maxi;w+=pas)//Pour chaque point (on boucle sur les log(omega))
			{
				wSuivant=w+pas;
				if(this.getGdb(Math.pow(10,w))==0 && this.getGdb(Math.pow(10,wSuivant))!=0)	//Si on tombe pile sur un zero (coup de bol !)
				{
					pulsations.push(Math.pow(10,w))
				}
				else if(this.getGdb(Math.pow(10,w))*this.getGdb(Math.pow(10,wSuivant))<0) //Sinon, si le zero est sur l'intervale qui suit
				{
					//Dichotomie :
					while(Math.abs(w-wSuivant)>0.0001)
					{https://www.qwant.com/?l=fr
						c=0.5*(w+wSuivant)
						if(this.getGdb(Math.pow(10,w))*this.getGdb(Math.pow(10,c))<0)
							wSuivant=c
						else
							w=c
					}
					c=0.5*(w+wSuivant)
					pulsations.push(Math.pow(10,c))
				}
			}
			return pulsations
		}
		
			
		//Renvoie la liste des pulsation à 0 dB.	
		this.getWm180deg=function()
		{
			var pas=(this.bornesW().maxi-this.bornesW().mini)/(this.nbPoints()-1);
			var pulsations=[];
			for(w=this.bornesW().mini;w<this.bornesW().maxi;w+=pas)//Pour chaque point (on boucle sur les log(omega))
			{
				wSuivant=w+pas;
				if(this.getPhase(Math.pow(10,w))==-180)	//Si on tombe pile sur un -180 (coup de bol !)
				{
					pulsations.push(Math.pow(10,w))
				}
				else if((this.getPhase(Math.pow(10,w))+180)*(this.getPhase(Math.pow(10,wSuivant))+180)<0) //Sinon, si le -180 est sur l'intervale qui suit
				{
					//Dichotomie :
					while(Math.abs(w-wSuivant)>0.0001)
					{
						c=0.5*(w+wSuivant)
						if((this.getPhase(Math.pow(10,w))+180)*(this.getPhase(Math.pow(10,c))+180)<0)
							wSuivant=c
						else
							w=c
					}
					c=0.5*(w+wSuivant)
					pulsations.push(Math.pow(10,c))
				}
			}
			return pulsations
		}
			
			
			
		//Met à jour les flèches qui indiquent la marge de gain
		this.updateMargeDeGain=function()
		{
			//Effacer les précédentes fleches
			this.margesDeGain.destroyChildren();
			
			if(this.afficheMargeDeGain())
			{
				//Refaire les nouvelles flèches
				pulsations=this.getWm180deg();
				for(i=0;i<pulsations.length;i++)
				{
					var w=pulsations[i];
					var Gbd=this.getGdb(w);
					var signe=(Gbd<0)*2-1;
					var taille=this.tailleBoutFlecheMarges();
					//On cree la tige
					var point1=grapheBodeGdb.coordonnees(Math.log10(w),Gbd);
					var point2=grapheBodeGdb.coordonnees(Math.log10(w),0);
					var tige=new Kinetic.Line({points:[point1.x,point1.y,point2.x,point2.y+signe*taille],
								x:grapheBodeGdb.repere.position().x,
								y:grapheBodeGdb.repere.position().y,
								stroke:this.couleurMargeDeGain(-Gbd),
								lineCap: 'round',
								lineJoin: 'round',
								strokeWidth:this.epaisseurFlechesMarges()
							});
					this.margesDeGain.add(tige);
					//On crée le bout de la flèche
					var x0=grapheBodeGdb.coordonnees(Math.log10(w),0).x;
					var bout=new Kinetic.Path({data: "M"+x0+",0 L"+(x0-taille*0.4)+","+(signe*taille*1.2)+" L "+x0+","+(signe*taille)+","+(x0+taille*0.4)+","+(signe*taille*1.2)+"Z",
								x:grapheBodeGdb.repere.position().x,
								y:grapheBodeGdb.repere.position().y,
								fill:this.couleurMargeDeGain(-Gbd),
								lineCap: 'round',
								lineJoin: 'round'
							});
					this.margesDeGain.add(bout);
					//On crée le texte
					var text = new Kinetic.Text({
							  	x:grapheBodeGdb.repere.position().x+x0+5,
								y:grapheBodeGdb.repere.position().y+(point1.y+point2.y)/2,
							 	text: 'Mg',
							  	fontSize: 25,
							  	fontFamily: 'Calibri',
							  	fill:this.couleurMargeDeGain(-Gbd)
						  });
					this.margesDeGain.add(text);
				}
			}
			
		}
		
		//Fonction qui calcule la couleur de la marge de gain
		this.couleurMargeDeGain=function(Mg)
		{
			limiteDanger=20;
			if(Mg<0)
				return "#FF0000";
			if(Mg>limiteDanger)
				return "#00C000";
			if(Mg<limiteDanger/2)
			{	var tauxVert=Math.round(Mg/(limiteDanger/2)*192);
				var code="00"+tauxVert.toString(16);
				code=code.substr(code.length-2);
				return "#FF"+code+"00";
			}
			else
			{	var tauxRouge=Math.round((limiteDanger-Mg)/(limiteDanger/2)*255);
				var code="00"+tauxRouge.toString(16);
				code=code.substr(code.length-2);
				return "#"+code+"C000";
			}
		}
		
		
		//Met à jour les flèches qui indiquent la marge de phase
		this.updateMargeDePhase=function()
		{
			//Effacer les précédentes fleches
			this.margesDePhase.destroyChildren();
			
			if(this.afficheMargeDePhase())
			{
				//Refaire les nouvelles flèches
				pulsations=this.getW0dB();
				for(i=0;i<pulsations.length;i++)
				{
					var w=pulsations[i];
					var phi=this.getPhase(w);
					var signe=(phi>-180)*2-1;
					var taille=this.tailleBoutFlecheMarges();
					var Mphi=180+phi;
					//On cree la fleche			
					point1=grapheBodePhase.coordonnees(Math.log10(w),phi);
					point2=grapheBodePhase.coordonnees(Math.log10(w),-180);
					var fleche=new Kinetic.Line({points:[point1.x,point1.y+signe*taille,point2.x,point2.y],
								x:grapheBodePhase.repere.position().x,
								y:grapheBodePhase.repere.position().y,
								stroke:this.couleurMargeDePhase(Mphi),
								lineCap: 'round',
								lineJoin: 'round',
								strokeWidth:4
							});
					//On l'ajoute au groupe
					this.margesDePhase.add(fleche);
					//On crée le bout de la flèche
					var x0=grapheBodePhase.coordonnees(Math.log10(w),phi).x;
					var y0=grapheBodePhase.coordonnees(Math.log10(w),phi).y;
					var bout=new Kinetic.Path({data: "M"+x0+","+y0+" L"+(x0-taille*0.4)+","+(y0+signe*taille*1.2)+" L "+x0+","+(y0+signe*taille)+","+(x0+taille*0.4)+","+(y0+signe*taille*1.2)+"Z",
								x:grapheBodePhase.repere.position().x,
								y:grapheBodePhase.repere.position().y,
								fill:this.couleurMargeDePhase(Mphi),
								lineCap: 'round',
								lineJoin: 'round'
							});
					this.margesDePhase.add(bout);
					//On crée le texte
					var text = new Kinetic.Text({
							  	x:grapheBodePhase.repere.position().x+x0-40,
								y:grapheBodePhase.repere.position().y+(point1.y+point2.y)/2,
							 	text: 'Mφ',
							  	fontSize: 25,
							  	fontFamily: 'Calibri',
							  	fill:this.couleurMargeDePhase(Mphi),
							  	align:"right"
						  });
					text.align("right");
					this.margesDePhase.add(text);
				}
			}	
		}
		
		//Fonction qui calcule la couleur de la marge de gain
		this.couleurMargeDePhase=function(Mphi)
		{
			limiteDanger=45;
			if(Mphi<0)
				return "#FF0000";
			if(Mphi>limiteDanger)
				return "#00C000";
			if(Mphi<limiteDanger/2)
			{	var tauxVert=Math.round(Mphi/(limiteDanger/2)*192);
				var code="00"+tauxVert.toString(16);
				code=code.substr(code.length-2);
				return "#FF"+code+"00";
			}
			else
			{	var tauxRouge=Math.round((limiteDanger-Mphi)/(limiteDanger/2)*255);
				var code="00"+tauxRouge.toString(16);
				code=code.substr(code.length-2);
				return "#"+code+"C000";
			}
		}
			
	//==========================
	//MENU ARBORESCENCE
	//==========================

		//Bouton Supprimer ------ Redéfini pour ne PAS afficher le bouton
		this.ajouteLigneArbre2_supprimer=function(i)
			{
				return '';
			}

		this.ajouteLigneArbre2_parametres=function(i)
			{
				return	this.ajouteLigneArbre2_boutonInverse(i);
			}
			
		//Ajoute le bouton marge de gain
		this.ajouteLigneArbre2_boutonMarges=function(i)
		{
			return ''+
'						<div class="item">'+
'							<input id="'+i+'-check-margeGain" name="'+i+'-check-margeGain" type="checkbox" checked onclick="updateAfficheMargeDeGain(this.checked)" />'+
'							<label for="'+i+'-check-margeGain">'+
'								<img class="icone" src="./sources/icones/iconeMargeGain.png"/>'+
'								Marge de gain'+
'							</label>'+
'						</div>'+
'						<div class="item">'+
'							<input id="'+i+'-check-margePhase" name="'+i+'-check-margePhase" type="checkbox" checked onclick="updateAfficheMargeDePhase(this.checked)" />'+
'							<label for="'+i+'-check-margePhase">'+
'								<img class="icone" src="./sources/icones/iconeMargePhase.png"/>'+
'								Marge de Phase'+
'							</label>'+
'						</div>';
		}
			
			
		//ajoute options d'affichage -- Redéfini pour ne PAS affichertoutes bouton
		this.ajouteLigneArbre2_affichage=function(i)
			{
				return 	this.ajouteLigneArbre2_boutonsAffichage(i)+
					this.ajouteLigneArbre2_boutonMarges(i)+
					this.ajouteLigneArbre2_boutonCouleur(i)+
					this.ajouteLigneArbre2_boutonBornes(i)+
					this.ajouteLigneArbre2_boutonNbPoints(i);
			}


	//==========================
	//Graphique
	//==========================
		this.margesDeGain=new Kinetic.Group();	//Liste des flèches qui indique la (les) marges de gain
		this.margesDePhase=new Kinetic.Group();	//Liste des flèches qui indique la (les) marges de phase

		grapheBodeGdb.calqueCourbes.add(this.margesDeGain);
		grapheBodePhase.calqueCourbes.add(this.margesDePhase);
		

		//Met a jour toutes la courbe de gain (Écrase la fonction dont elle hérite)
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
				this.updateMargeDeGain();
			}
			
		//Met a jour la courbe de phase (Écrase la fonction dont elle hérite)
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
				this.updateMargeDePhase();
			}
			
				
	//==========================
	//Export
	//==========================

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodeGdbAnalytiqueLaTex=function()
			{
				var signe="+";
				if(this.inverse())
					signe="-";
				var val="0";
				for(i=1;i<listeFonctions.length;i++)
					{
						var eq=listeFonctions[i];
						if(eq.analytiqueGlobal())
							val+=signe+"("+eq.fonctionBodeGdbAnalytiqueLaTex()+")";
					}
				return val;
			}

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodeGdbAsymptotiqueLaTex=function()
			{
				var signe="+";
				if(this.inverse())
					signe="-";
				var val="0";
				for(i=1;i<listeFonctions.length;i++)
					{
						var eq=listeFonctions[i];
						if(eq.asymptotiqueGlobal())
							val+=signe+"("+eq.fonctionBodeGdbAsymptotiqueLaTex()+")";
					}
				return val;
			}

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodePhaseAnalytiqueLaTex=function()
			{
				var signe="+";
				if(this.inverse())
					signe="-";
				var val="0";
				for(i=1;i<listeFonctions.length;i++)
					{
						var eq=listeFonctions[i];
						if(eq.analytiqueGlobal())
							val+=signe+"("+eq.fonctionBodePhaseAnalytiqueLaTex()+")";
					}
				return val;
			}

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodePhaseAsymptotiqueLaTex=function()
			{
				var signe="+";
				if(this.inverse())
					signe="-";
				var val="0";
				for(i=1;i<listeFonctions.length;i++)
					{
						var eq=listeFonctions[i];
						if(eq.asymptotiqueGlobal())
							val+=signe+"("+eq.fonctionBodePhaseAsymptotiqueLaTex()+")";
					}
				return val;
			}

}

FonctionGlobale.prototype = Object.create(Fonction.prototype);//On recopie le prototype de Kinteic.Group
FonctionGlobale.prototype.constructor = FonctionGlobale;//On recopie le constructeur de Noeud dans son prototype
