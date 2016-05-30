//Fonction qui servira de constructeur pour la classe Noeud
var Gain = function(paramK)
{

	//==========================
	//Constructeur issu de l'heritage
	//==========================
		Fonction.call(this);

	//==========================
	//Variables Membres
	//==========================

		//Redefinition
		this._type="Gain";//Nom de la fonction
		this._nom="Gain";//Nom de la fonction
		this._icone="./sources/icones/iconeGain.png";
		this._couleur="#808080";

		//parametres
		this._K_=parseFloat(paramK);


	//==========================
	//Fonctions Membres
	//==========================

		//Renvoie l'image de la fonction
		this.getGdb=function(w)
			{
				var val=20*log10(this.K());
				if(this.inverse())
					return -val;
				else
					return val;
			}

		this.getGdbAsympt=function(w)
			{
				var val=20*log10(this.K());
				if(this.inverse())
					return -val;
				else
					return val;
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

		//Getter/Setter du paramètre K
		this.K=function(param_K)
			{
				if(typeof(param_K) === 'undefined')//Si pas de paramter --> getter
					return this._K_;
				this._K_=parseFloat(param_K);//Sinon --> Setter
				return this._K_;
			}
		
		//Fonction qui affiche le type de fonction
		this.type=function()
			{
				return "gain"
			}
		//Fonction qui affiche le type de fonction
		this.afficheType=function()
			{
				return "Gain pur";
			}
		//Fonction qui affihce l'équation
		this.afficheEquation=function()
			{
				if(this.inverse())
					return '<span class="equation">'+fraction(1,this.K())+'</span>';
				else
					return '<span class="equation">'+this.K()+'</span>';
			}


		//Affiche la partir de formulaire correspondant aux paramètre de chaque fonction
		this.getFromulaireParametres=function(i)
			{
				var r='						<br/><label for="formParamK'+i+'">K=</label>';
				r+='							<input type="text" id="formParamK'+i+'" name="formParamK'+i+'" value="'+this.K()+'" size="1"/ onchange="updateParametreK('+i+')">'
				return r;//Aucun par défaut
			}



	//==========================
	//MENU ARBORESCENCE
	//==========================




		/*this.ajouteLigneArbre_titre=function(i)
			{
				$("#arborescence").treetable('loadBranch',null,
					'<tr data-tt-id="'+i+'">'+
					'	<td>'+
					'		<img class="icone" src="./sources/icones/iconeGain.png"/>'+
					'		<strong>Gain pur</strong> '+
					this.ajouteArbo_CarreCouleur(i)+
					'	</td>'+
					'</tr>');
			}*/


		//this.ajouteLigneArbre_parametres=function(i)	--> Hérite de CLASS-Fonction
		/*	{
				node=$("#arborescence").treetable("node",i+"-param");
				$("#arborescence").treetable('loadBranch',node,
					this.ajouteArbo_Parametre_K(i));
			}*/

	//==========================
	//Export
	//==========================

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodeGdbAnalytiqueLaTex=function()
			{
				signe="";
				if(this.inverse())
					signe="-";
				return signe+"\\KAmp{"+int2strfloat(this.K())+"}";
			}

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodeGdbAsymptotiqueLaTex=function()
			{
				signe="";
				if(this.inverse())
					signe="-";
				return signe+"\\KAmp{"+int2strfloat(this.K())+"}";
			}

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodePhaseAnalytiqueLaTex=function()
			{
				return "0";
			}

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodePhaseAsymptotiqueLaTex=function()
			{
				return "0";
			}


		//Exporte les paramètres pour le fichier XML
		this.exportParametresXML=function()
			{
				var rendu=	"			<K>"+this.K()+"</K>\n";
				return rendu;
			}

}

//Fonction.prototype = Object.create(Kinetic.Group.prototype);//On recopie le prototype de Kinteic.Group
Gain.prototype.constructor = Gain;//On recopie le constructeur de Noeud dans son prototype


