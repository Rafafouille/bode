//Fonction qui servira de constructeur pour la classe Noeud
var PremierOrdre = function(paramK,paramTau)
{

	//==========================
	//Constructeur issu de l'heritage
	//==========================
		Fonction.call(this);

	//==========================
	//Variables Membres
	//==========================

		//Redefinition
		this._type="1er Ordre";//Nom de la fonction
		this._nom="1<sup>er</sup> Ordre";//Nom de la fonction
		this._icone="./sources/icones/icone1erOrdre.png";
		this._couleur="#00FF00";
		this._afficheAnalytique=false;//Affiche-t-on la courbe analytique seule ?
		this._afficheAsymptotique=false;//Affiche-t-on la courbe asymptotique seule ,

		//parametres
		this._K_=parseFloat(paramK);
		this._tau_=parseFloat(paramTau);



	//==========================
	//Fonctions Membres
	//==========================

		//type
		this.getType=function()
			{
				return "1er ordre";
			}

		//Renvoie l'image de la fonction
		this.getGdb=function(w)
			{
				var val=20*log10(this.K())-10*log10(1+Math.pow(w*this.tau(),2));
				if(this.inverse())
					return -val;
				else
					return val;
			}

		this.getGdbAsympt=function(w)
			{
				var val=0;
				if(w<1/this.tau())
					val= 20*log10(this.K());
				else
					val= 20*log10(this.K())-20*log10(this.tau())-20*log10(w);

				if(this.inverse())
					return -val;
				else
					return val;
			}
		//Renvoie l'image de la fonction
		this.getPhase=function(w)
			{
				var val= -Math.atan(this.tau()*w)/Math.PI*180;
				if(this.inverse())
					return -val;
				else
					return val;
			}

		this.getPhaseAsympt=function(w)
			{
				var val=0;
				if(w>1/this.tau())
					val=-90;
				else
					val=0;
				if(this.inverse())
					return -val;
				else
					return val;
			}

		//Getter/Setter du paramètre K
		this.K=function(param_K)
			{
				if(typeof(param_K) === 'undefined')//Si pas de paramter --> getter
					return this._K_;
				this._K_=parseFloat(param_K);//Sinon --> Setter
				return this._K_;
			}
		//Getter/Setter du paramètre tau
		this.tau=function(paramTau)
			{
				if(typeof(paramTau) === 'undefined')//Si pas de paramter --> getter
					return this._tau_;
				this._tau_=parseFloat(paramTau);//Sinon --> Setter
				return this._tau_;
			}
		//Fonction qui affiche le type de fonction
		this.type=function()
			{
				return "1erOrdre"
			}
		//Fonction qui affiche le type de fonction
		this.afficheType=function()
			{
				return "1<sup>er</sup> Ordre";
			}
		//Fonction qui affihce l'équation
		this.afficheEquation=function()
			{
				if(this.inverse())
					return '<span class="equation">'+fraction('1+'+this.tau()+'p',this.K())+'</span>';
				else
					return '<span class="equation">'+fraction(this.K(),'1+'+this.tau()+'p')+'</span>';
			}
		//Fonction qui affihce l'équation
		this.afficheParametres=function()
			{
				return 'K = '+this.K()+" ; &tau; = "+this.tau();
			}

		//Affiche la partir de formulaire correspondant aux paramètre de chaque fonction
		this.getFromulaireParametres=function(i)
			{
				var r='						<br/><label for="formParamK'+i+'">K=</label>';
				r+='							<input type="text" id="formParamK'+i+'" name="formParamK'+i+'" value="'+this.K()+'" size="1" onchange="updateParametreK('+i+')"/>'
				r+='						<br/><label for="formParamTau'+i+'">&tau;=</label>';
				r+='							<input type="text" id="formParamTau'+i+'" name="formParamTau'+i+'" value="'+this.tau()+'" size="1" onchange="updateParametreTau('+i+')"/>'
				return r;//Aucun par défaut
			}


	//==========================
	//MENU ARBORESCENCE
	//==========================

		//this.ajouteLigne=function(i) --> Hérite de Class-Fonction


		this.ajouteLigneArbre2_parametres=function(i)
			{
				return	this.ajouteLigneArbre2_Parametre_K(i)+
					this.ajouteLigneArbre2_Parametre_tau(i)+
					this.ajouteLigneArbre2_boutonInverse(i);
			}

		this.ajouteLigneArbre2_Parametre_tau=function(i)
			{
				res=''+
'						<div class="item">'+
	'						<label for="'+i+'-param-tau-number">&tau; = </label>'+
	'						<input type="number" name="'+i+'-input-param-tau-number" id="'+i+'-input-param-tau-number" value="'+this.tau()+'" style="width:50px;" min="0" oninput="updateParametreTau('+i+',this.value)"/>'+
			'				<input type="range" name="'+i+'-input-param-tau-range" id="'+i+'-input-param-tau-range"  style="width:120px;" min="-5" max="5" step="0.1" value="'+log10(this.tau())+'" oninput="updateParametreTau('+i+',Math.pow(10,this.value))"/>'+
'						</div>';
				return res;
			}

		//OLD
		/*this.ajouteLigneArbre_titre=function(i)
			{
				$("#arborescence").treetable('loadBranch',null,
					'<tr data-tt-id="'+i+'">'+
					'	<td>'+
					'		<img class="icone" src="./sources/icones/icone1erOrdre.png"/>'+
					'		<strong>1<sup>er</sup> ordre</strong> '+
					this.ajouteArbo_CarreCouleur(i)+
					'	</td>'+
					'</tr>');
			}*/


		/*this.ajouteLigneArbre_parametres=function(i)
			{
				node=$("#arborescence").treetable("node",i+"-param");
				$("#arborescence").treetable('loadBranch',node,
					this.ajouteArbo_Parametre_K(i)+
					this.ajouteArbo_Parametre_tau(i)+
					this.ajouteArbo_BoutonInverse(i));
			}*/

				//this.ajouteArbo_Parametre_K=function(i)  ---> herite de CLASS-Fonction
				//this.ajouteArbo_BoutonInverse=function(i)  ---> herite de CLASS-Fonction
			/*	  this.ajouteArbo_Parametre_tau=function(i)
					{
					res='		<tr data-tt-id="'+i+'-param-tau" data-tt-parent-id="'+i+'-param">'+
					'			<td>'+
					'				<label for="'+i+'-param-tau-number">&tau; = </label>'+
					'				<input type="number" name="'+i+'-input-param-tau-number" id="'+i+'-input-param-tau-number" value="'+this.tau()+'" style="width:50px;" min="0" oninput="updateParametreTau('+i+',this.value)"/>'+
					'				<input type="range" name="'+i+'-input-param-tau-range" id="'+i+'-input-param-tau-range"  style="width:80px;" min="-5" max="5" step="0.1" value="'+log10(this.tau())+'" oninput="updateParametreTau('+i+',Math.pow(10,this.value))"/>'+
					'			</td>'+
					'		</tr>';
					return res;
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
				return signe+"\\POAmp{"+int2strfloat(this.K())+"}{"+int2strfloat(this.tau())+"}";
			}

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodeGdbAsymptotiqueLaTex=function()
			{
				signe="";
				if(this.inverse())
					signe="-";
				return signe+"\\POAmpAsymp{"+int2strfloat(this.K())+"}{"+int2strfloat(this.tau())+"}";
			}

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodePhaseAnalytiqueLaTex=function()
			{
				signe="";
				if(this.inverse())
					signe="-";
				return signe+"\\POArg{"+int2strfloat(this.K())+"}{"+int2strfloat(this.tau())+"}";
			}

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodePhaseAsymptotiqueLaTex=function()
			{
				signe="";
				if(this.inverse())
					signe="-";
				return signe+"\\POArgAsymp{"+int2strfloat(this.K())+"}{"+int2strfloat(this.tau())+"}";
			}

		//Exporte les paramètres pour le fichier XML
		this.exportParametresXML=function()
			{
				var rendu=	"			<K>"+this.K()+"</K>\n"+
						"			<tau>"+this.tau()+"</tau>\n";
				return rendu;
			}

}

PremierOrdre.prototype = Object.create(Fonction.prototype);//On recopie le prototype de Kinteic.Group
PremierOrdre.prototype.constructor = PremierOrdre;//On recopie le constructeur de Noeud dans son prototype


