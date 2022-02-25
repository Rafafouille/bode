//Fonction qui servira de constructeur pour la classe Noeud
var PD = function(paramKp,paramTd)
{

	//==========================
	//Constructeur issu de l'heritage
	//==========================
		Fonction.call(this);

	//==========================
	//Variables Membres
	//==========================

		//Redefinition
		this._type="PD";//Nom de la fonction
		this._nom="Correcteur P.D.";//Nom de la fonction
		this._icone="./sources/icones/iconePD.png";
		this._couleur="#008080";

		//parametres
		this._Kp_=parseFloat(paramKp);
		this._Td_=parseFloat(paramTd);



	//==========================
	//Fonctions Membres
	//==========================

		//Renvoie l'image de la fonction
		this.getGdb=function(w)
			{
				var val=0;	//0 par defaut
				val=20*log10(this.Kp())+10*log10(1+this.Td()*this.Td()*w*w);
				if(this.inverse())
					return -val;
				else
					return val;
			}

		this.getGdbAsympt=function(w)
			{
				var val=0;
				var fi=0;
				var fd=0;
				if(w>1/this.Td())
					fd=20*log10(this.Td())+20*log10(w);
				val=20*log10(this.Kp())+fd;
				if(this.inverse())
					return -val;
				else
					return val;
			}
		//Renvoie l'image de la fonction
		this.getPhase=function(w)
			{
				var val=0;	//0 par defaut
				val=Math.atan(this.Td()*w)*180/Math.PI;
				if(this.inverse())
					return -val;
				else
					return val;
			}

		this.getPhaseAsympt=function(w)
			{
				var val=0;
				if(w>1/this.Td())
					val=90;
				if(this.inverse())
					return -val;
				else
					return val;
			}


		//Getter/Setter du paramètre K
		this.Kp=function(param_Kp)
			{
				if(typeof(param_Kp) === 'undefined')//Si pas de paramter --> getter
					return this._Kp_;
				this._Kp_=parseFloat(param_Kp);//Sinon --> Setter
				return this._Kp_;
			}
		//Getter/Setter du paramètre z
		this.Td=function(param_Td)
			{
				if(typeof(param_Td) === 'undefined')//Si pas de paramter --> getter
					return this._Td_;
				this._Td_=parseFloat(param_Td);//Sinon --> Setter
				return this._Td_;
			}

		//Fonction qui affiche le type de fonction
		this.type=function()
			{
				return "PD";
			}
		//Fonction qui affiche le type de fonction
		this.afficheType=function()
			{
				return "Correcteur PD";
			}
		//Fonction qui affihce l'équation
		this.afficheEquation=function()
			{
				if(this.inverse())
					return '<span class="equation"><img src="http://latex.codecogs.com/gif.latex?\\tiny&space;H(p)=\\frac1{K_p(1&plus;T_dp)}" title="\\tiny H(p)=\\frac1{K_p(1+T_dp)}" /></span>';
				else
					return '<span class="equation"><img src="http://latex.codecogs.com/gif.latex?\\tiny&space;H(p)=K_p(1&plus;T_dp)" title="\\tiny H(p)=K_p(1+T_dp)"/></span>';
			}


	//==========================
	//MENU ARBORESCENCE
	//==========================

		this.ajouteLigneArbre2_parametres=function(i)
			{
				return	this.ajouteLigneArbre2_Parametre_Kp(i)+
					this.ajouteLigneArbre2_Parametre_Td(i)+
					this.ajouteLigneArbre2_boutonInverse(i);
			}

		this.ajouteLigneArbre2_Parametre_Kp=function(i)
			{
				res=''+
'						<div class="item">'+
'							<label for="'+i+'-input-param-Kp-number">K<sub>p</sub> = </label>'+
'							<input type="number" name="'+i+'-input-param-Kp-number" id="'+i+'-input-param-Kp-number" min="0" step="0.5" style="width:50px;" value="'+this.Kp()+'" oninput="updateParametreKp('+i+',this.value)"/>'+
'							<input type="range" name="'+i+'-input-param-Kp-range" id="'+i+'-input-param-Kp-range"  style="width:120px;" min="-5" max="5" step="0.1" value="'+log10(this.Kp())+'" oninput="updateParametreKp('+i+',Math.pow(10,this.value))"/>'+
'						</div>';
				return res;
			}

		this.ajouteLigneArbre2_Parametre_Td=function(i)
			{
				res=''+
'						<div class="item">'+
'							<label for="'+i+'-param-Td-number">T<sub>d</sub> = </label>'+
'							<input type="number" name="'+i+'-input-param-Td-number" id="'+i+'-input-param-Td-number" value="'+this.Td()+'" style="width:50px;" min="0" oninput="updateParametreTd('+i+',this.value)"/>'+
'							<input type="range" name="'+i+'-input-param-Td-range" id="'+i+'-input-param-Td-range"  style="width:120px;" min="-5" max="5" step="0.1" value="'+log10(this.Td())+'" oninput="updateParametreTd('+i+',Math.pow(10,this.value))"/>'+
'						</div>';
				return res;
			}


		//OLD
		/*this.ajouteLigneArbre_titre=function(i)
			{
				$("#arborescence").treetable('loadBranch',null,
					'<tr data-tt-id="'+i+'">'+
					'	<td>'+
					'		<img class="icone" src="./sources/icones/iconePD.png"/>'+
					'		<strong>Correcteur PD</strong> '+
					this.ajouteArbo_CarreCouleur(i)+
					'	</td>'+
					'</tr>');
			}

		this.ajouteLigneArbre_parametres=function(i)
			{
				node=$("#arborescence").treetable("node",i+"-param");
				$("#arborescence").treetable('loadBranch',node,
					this.ajouteArbo_Parametre_Kp(i)+
					this.ajouteArbo_Parametre_Td(i)+
					this.ajouteArbo_BoutonInverse(i));
			}*/


			this.ajouteArbo_Parametre_Kp=function(i)
				{
					res='		<tr data-tt-id="'+i+'-param-Kp" data-tt-parent-id="'+i+'-param">'+
					'			<td>'+
					'				<label for="'+i+'-input-param-Kp-number">K<sub>p</sub> = </label>'+
					'				<input type="number" name="'+i+'-input-param-Kp-number" id="'+i+'-input-param-Kp-number" min="0" step="0.5" style="width:50px;" value="'+this.Kp()+'" oninput="updateParametreKp('+i+',this.value)"/>'+
					'				<input type="range" name="'+i+'-input-param-Kp-range" id="'+i+'-input-param-Kp-range"  style="width:80px;" min="-5" max="5" step="0.2" value="'+log10(this.Kp())+'" oninput="updateParametreKp('+i+',Math.pow(10,this.value))"/>'+
					'			</td>'+
					'		</tr>';
					return res;
				}
				
			this.ajouteArbo_Parametre_Td=function(i)
				{
					res='		<tr data-tt-id="'+i+'-param-Td" data-tt-parent-id="'+i+'-param">'+
					'			<td>'+
					'				<label for="'+i+'-param-Td-number">T<sub>d</sub> = </label>'+
					'				<input type="number" name="'+i+'-input-param-Td-number" id="'+i+'-input-param-Td-number" value="'+this.Td()+'" style="width:50px;" min="0" oninput="updateParametreTd('+i+',this.value)"/>'+
					'				<input type="range" name="'+i+'-input-param-Td-range" id="'+i+'-input-param-Td-range"  style="width:80px;" min="-5" max="5" step="0.1" value="'+log10(this.Td())+'" oninput="updateParametreTd('+i+',Math.pow(10,this.value))"/>'+
					'			</td>'+
					'		</tr>';
					return res;
				}
				
	//==========================
	//Export
	//==========================

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodeGdbAnalytiqueLaTex=function()
			{
				signe="";
				if(this.inverse())
					signe="-";
				return signe+"\\PDAmp{"+int2strfloat(this.Kp())+"}{"+int2strfloat(this.Td())+"}";
			}

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodeGdbAsymptotiqueLaTex=function()
			{
				signe="";
				if(this.inverse())
					signe="-";
				return signe+"\\PDAmpAsymp{"+int2strfloat(this.Kp())+"}{"+int2strfloat(this.Td())+"}";
			}

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodePhaseAnalytiqueLaTex=function()
			{
				signe="";
				if(this.inverse())
					signe="-";
				return signe+"\\PDArg{"+int2strfloat(this.Kp())+"}{"+int2strfloat(this.Td())+"}";
			}

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodePhaseAsymptotiqueLaTex=function()
			{
				signe="";
				if(this.inverse())
					signe="-";
				return signe+"\\PDArgAsymp{"+int2strfloat(this.Kp())+"}{"+int2strfloat(this.Td())+"}";
			}

		//Exporte les paramètres pour le fichier XML
		this.exportParametresXML=function()
			{
				var rendu=	"			<Kp>"+this.Kp()+"</Kp>\n"+
						"			<Td>"+this.Td()+"</Td>\n";
				return rendu;
			}

}

//Fonction.prototype = Object.create(Kinetic.Group.prototype);//On recopie le prototype de Kinteic.Group
PD.prototype.constructor = PD;//On recopie le constructeur de Noeud dans son prototype


