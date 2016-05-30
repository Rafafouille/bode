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

		//ajoute options d'affichage -- Redéfini pour ne PAS affichertoutes bouton
		this.ajouteLigneArbre2_affichage=function(i)
			{
				return 	this.ajouteLigneArbre2_boutonsAffichage(i)+
					this.ajouteLigneArbre2_boutonCouleur(i)+
					this.ajouteLigneArbre2_boutonBornes(i)+
					this.ajouteLigneArbre2_boutonNbPoints(i);
			}

		//OLD
		/*this.ajouteLigneArbre_titre=function(i)
			{
				//ROOT=$("#arborescence").treetable('node','ROOT');
				$("#arborescence").treetable('loadBranch',null,
					'<tr data-tt-branch="true" data-tt-id="'+i+'" >'+
					'	<td>'+
					'		<img class="icone" src="./sources/icones/iconeGlobal.png"/>'+
					'		<strong>Fonction globale</strong>'+
					this.ajouteArbo_CarreCouleur(i)+
					'	</td>'+
					'</tr>');

				//node=$("#arborescence").treetable("node",i);
				//node.render();
			}*/


		/*this.ajouteLigneArbre_parametres=function(i)
			{
				node=$("#arborescence").treetable("node",i+"-param");
				$("#arborescence").treetable('loadBranch',node,
					this.ajouteArbo_BoutonInverse(i));
			}*/



		//this.ajouteLigneArbre_affichage=function(i)	--> Hérite de CLASS-Fonction
		/*	{
				node=$("#arborescence").treetable("node",i+"-affichage");
				$("#arborescence").treetable('loadBranch',node,
						'		<tr data-tt-id="'+i+'-afficheReel" data-tt-parent-id="'+i+'-affichage">'+
						'			<td>'+
						'				<input id="'+i+'-afficheReel" name="" type="checkbox"/>'+
						'				<img class="icone" src="./sources/icones/iconeReel.png"/>'+
						'				Afficher Réel'+
						'			</td>'+
						'		</tr>'+
						'		<tr data-tt-id="'+i+'-afficheAsympt" data-tt-parent-id="'+i+'-affichage">'+
						'			<td>'+
						'				<input id="'+i+'-afficheAsympt" name="" type="checkbox"/>'+
						'				<img class="icone" src="./sources/icones/iconeAsympt.png"/>'+
						'				Afficher asymptotique'+
						'			</td>'+
						'		</tr>');
			}*/
	//Contenu des branches "Affichage"
	/*this.ajouteLigneArbre_affichage=function(i)
		{
	
			node=$("#arborescence").treetable("node",i+"-affichage");
			$("#arborescence").treetable('loadBranch',node,
					this.ajouteArbo_bouton_afficheAnalytique(i)+
					this.ajouteArbo_bouton_afficheAsympt(i)+
					this.ajouteArbo_couleur(i)+
					this.ajouteArbo_omegaLimit(i)+
					this.ajouteArbo_nbPoints(i));
		}*/



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
