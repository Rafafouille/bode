//Fonction qui servira de constructeur pour la classe Noeud
var Integrale = function(paramK)
{

	//==========================
	//Constructeur issu de l'heritage
	//==========================
		Fonction.call(this);

	//==========================
	//Variables Membres
	//==========================

		//Redefinition
		this._type="Intégrale";//Nom de la fonction
		this._nom="Intégrale";//Nom de la fonction
		this._icone="./sources/icones/iconeIntegrale.png";
		this._couleur="#FFF101";

		//parametres
		this._K_=parseFloat(paramK);


	//==========================
	//Fonctions Membres
	//==========================

		//Renvoie l'image de la fonction
		this.getGdb=function(w)
			{
				var val=20*log10(this.K())-20*log10(w);
				if(this.inverse())
					return -val;
				else
					return val;
			}

		this.getGdbAsympt=function(w)
			{
				var val=20*log10(this.K())-20*log10(w);
				if(this.inverse())
					return -val;
				else
					return val;
			}
		//Renvoie l'image de la fonction
		this.getPhase=function(w)
			{
				return -90;	//0 par defaut
			}

		this.getPhaseAsympt=function(w)
			{
				return -90;
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
				return "integrale";
			}
		//Fonction qui affiche le type de fonction
		this.afficheType=function()
			{
				return "Intégrale";
			}
		//Fonction qui affihce l'équation
		this.afficheEquation=function()
			{
				if(this.inverse())
					return '<span class="equation">'+fraction('p',this.K())+'</span>';
				else
					return '<span class="equation">'+fraction(this.K(),'p')+'</span>';
			}

		//Affiche la partir de formulaire correspondant aux paramètre de chaque fonction
		this.getFromulaireParametres=function(i)
			{
				var r='						<br/><label for="formParamK'+i+'">K=</label>';
				r+='							<input type="text" id="formParamK'+i+'" name="formParamK'+i+'" value="'+this.K()+'" size="1" onchange="updateParametreK('+i+')"/>'
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
					'		<img class="icone" src="./sources/icones/iconeIntegrale.png"/>'+
					'		<strong>Intégrale</strong> '+
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
				return signe+"\\IntAmp{"+int2strfloat(this.K())+"}";
			}

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodeGdbAsymptotiqueLaTex=function()
			{
				signe="";
				if(this.inverse())
					signe="-";
				return signe+"\\IntAmp{"+int2strfloat(this.K())+"}";
			}

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodePhaseAnalytiqueLaTex=function()
			{
				signe="";
				if(this.inverse())
					signe="-";
				return signe+"\\IntArg{"+int2strfloat(this.K())+"}";
			}

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodePhaseAsymptotiqueLaTex=function()
			{
				signe="";
				if(this.inverse())
					signe="-";
				return signe+"\\IntArg{"+int2strfloat(this.K())+"}";
			}

		//Exporte les paramètres pour le fichier XML
		this.exportParametresXML=function()
			{
				var rendu=	"			<K>"+this.K()+"</K>\n";
				return rendu;
			}

}

Integrale.prototype = Object.create(Fonction.prototype);//On recopie le prototype de Fonction
Integrale.prototype.constructor = Integrale;//On recopie le constructeur de Integrale dans son prototype


