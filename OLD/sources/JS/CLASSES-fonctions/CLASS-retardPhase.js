//Fonction qui servira de constructeur pour la classe Noeud
var RetardPhase = function(paramKp,paramTi,paramA)
{

	//==========================
	//Constructeur issu de l'heritage
	//==========================
		Fonction.call(this);

	//==========================
	//Variables Membres
	//==========================

		//Redefinition
		this._type="Retard de Phase";//Nom de la fonction
		this._nom="Retard de Phase";//Nom de la fonction
		this._icone="./sources/icones/iconeRetardPhase.png";
		this._couleur="#968D00";

		//parametres
		this._Kp_=parseFloat(paramKp);
		this._Ti_=parseFloat(paramTi);
		this._a_=parseFloat(paramA);



	//==========================
	//Fonctions Membres
	//==========================

		//Renvoie l'image de la fonction
		this.getGdb=function(w)
			{
				var val=0;	//0 par defaut
				val=20*log10(this.Kp())-10*log10((1+this.Ti()*this.Ti()*this.a()*this.a()*w*w)/(1+this.Ti()*this.Ti()*w*w));
				if(this.inverse())
					return -val;
				else
					return val;
			}

		this.getGdbAsympt=function(w)
			{
				var val=20*log10(this.Kp());
				if(this.a()<1)
					{
						if(w>1/this.Ti() && w<1/(this.Ti()*this.a()))
							val+=20*log10(w)-20*log10(1/this.Ti());
						if(w>1/(this.Ti()*this.a()))
							val+=20*log10(1/(this.Ti()*this.a()))-20*log10(1/this.Ti());
					}
				else
					{
						if(w>1/(this.Ti()*this.a()) && w<1/this.Ti())
							val+=-20*log10(w)+20*log10(1/(this.Ti()*this.a()));
						if(w>1/this.Ti())
							val+=-20*log10(1/this.Ti())+20*log10(1/(this.Ti()*this.a()));
					}
				
				if(this.inverse())
					return -val;
				else
					return val;
			}
		//Renvoie l'image de la fonction
		this.getPhase=function(w)
			{
				var val=0;	//0 par defaut
				val=(-Math.atan(this.Ti()*this.a()*w)+Math.atan(this.Ti()*w))*180/Math.PI;
				if(this.inverse())
					return -val;
				else
					return val;
			}

		this.getPhaseAsympt=function(w)
			{
				var val=0;
				if(w<1/this.Ti() && w>1/(this.Ti()*this.a()))
					val=-90;
				if(w>1/this.Ti() && w<1/(this.Ti()*this.a()))
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
		//Getter/Setter du paramètre w0
		this.Ti=function(param_Ti)
			{
				if(typeof(param_Ti) === 'undefined')//Si pas de paramter --> getter
					return this._Ti_;
				this._Ti_=parseFloat(param_Ti);//Sinon --> Setter
				return this._Ti_;
			}
		//Getter/Setter du paramètre z
		this.a=function(param_a)
			{
				if(typeof(param_a) === 'undefined')//Si pas de paramter --> getter
					return this._a_;
				this._a_=parseFloat(param_a);//Sinon --> Setter
				return this._a_;
			}

		//Fonction qui affiche le type de fonction
		this.type=function()
			{
				return "retardDePhase";
			}
		//Fonction qui affiche le type de fonction
		this.afficheType=function()
			{
				return "Cor.à avance de phase";
			}
		//Fonction qui affihce l'équation
		this.afficheEquation=function()
			{
				if(this.inverse())
					return '<span class="equation"><img src="http://latex.codecogs.com/gif.latex?\\tiny&space;H(p)=\\frac{1&plus;aT_ip}{K_p(1&plus;T_ip)}" title="\\tiny H(p)=\\frac{1+aT_ip}{K_p(1+T_i)}" /></span>';
				else
					return '<span class="equation"><img src="http://latex.codecogs.com/gif.latex?\\tiny&space;H(p)=K_p\\frac{1&plus;T_ip}{1&plus;aT_ip}" title="\\tiny H(p)=K_p\\frac{1+T_i}{1+aT_ip}" /></span>';
			}



	//==========================
	//MENU ARBORESCENCE
	//==========================



		this.ajouteLigneArbre2_parametres=function(i)
			{
				return	this.ajouteLigneArbre2_Parametre_Kp(i)+
					this.ajouteLigneArbre2_Parametre_Ti(i)+
					this.ajouteLigneArbre2_Parametre_a(i)+
					this.ajouteLigneArbre2_boutonInverse(i);
			}

		this.ajouteLigneArbre2_Parametre_Kp=function(i)
			{
				res=''+
'						<div class="item">'+
'							<label for="'+i+'-input-param-Kp-number">K<sub>p</sub> = </label>'+
'							<input type="number" name="'+i+'-input-param-Kp-number" id="'+i+'-input-param-Kp-number" min="0" step="0.5" style="width:50px;" value="'+this.Kp()+'" oninput="updateParametreKp('+i+',this.value)"/>'+
'							<input type="range" name="'+i+'-input-param-Kp-range" id="'+i+'-input-param-Kp-range"  style="width:80px;" min="-5" max="5" step="0.2" value="'+log10(this.Kp())+'" oninput="updateParametreKp('+i+',Math.pow(10,this.value))"/>'+
'						</div>';
				return res;
			}

		this.ajouteLigneArbre2_Parametre_Ti=function(i)
			{
				res=''+
'						<div class="item">'+
'							<label for="'+i+'-param-Ti-number">T<sub>i</sub> = </label>'+
'							<input type="number" name="'+i+'-input-param-Ti-number" id="'+i+'-input-param-Ti-number" value="'+this.Ti()+'" style="width:50px;" min="0" oninput="updateParametreTi('+i+',this.value)"/>'+
'							<input type="range" name="'+i+'-input-param-Ti-range" id="'+i+'-input-param-Ti-range"  style="width:80px;" min="-5" max="5" step="0.1" value="'+log10(this.Ti())+'" oninput="updateParametreTi('+i+',Math.pow(10,this.value))"/>'+
'						</div>';
				return res;
			}

		this.ajouteLigneArbre2_Parametre_a=function(i)
			{
				res=''+
'						<div class="item">'+
'							<label for="'+i+'-param-a-number">a = </label>'+
'							<input type="number" name="'+i+'-input-param-a-number" id="'+i+'-input-param-a-number" value="'+this.a()+'" style="width:50px;" min="0" oninput="updateParametreA('+i+',this.value)"/>'+
'							<input type="range" name="'+i+'-input-param-a-range" id="'+i+'-input-param-a-range"  style="width:80px;" min="-5" max="5" step="0.1" value="'+log10(this.a())+'" oninput="updateParametreA('+i+',Math.pow(10,this.value))"/>'+
'						</div>';
				return res;
			}


		//OLD
		/*this.ajouteLigneArbre_titre=function(i)
			{
				$("#arborescence").treetable('loadBranch',null,
					'<tr data-tt-id="'+i+'">'+
					'	<td>'+
					'		<img class="icone" src="./sources/icones/iconeRetardPhase.png"/>'+
					'		<strong>Cor.à retard de phase</strong> '+
					this.ajouteArbo_CarreCouleur(i)+
					'	</td>'+
					'</tr>');
			}

		this.ajouteLigneArbre_parametres=function(i)
			{
				node=$("#arborescence").treetable("node",i+"-param");
				$("#arborescence").treetable('loadBranch',node,
					this.ajouteArbo_Parametre_Kp(i)+
					this.ajouteArbo_Parametre_Ti(i)+
					this.ajouteArbo_Parametre_a(i)+
					this.ajouteArbo_BoutonInverse(i));
			}


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
				
			this.ajouteArbo_Parametre_Ti=function(i)
				{
					res='		<tr data-tt-id="'+i+'-param-Ti" data-tt-parent-id="'+i+'-param">'+
					'			<td>'+
					'				<label for="'+i+'-param-Ti-number">T<sub>i</sub> = </label>'+
					'				<input type="number" name="'+i+'-input-param-Ti-number" id="'+i+'-input-param-Ti-number" value="'+this.Ti()+'" style="width:50px;" min="0" oninput="updateParametreTi('+i+',this.value)"/>'+
					'				<input type="range" name="'+i+'-input-param-Ti-range" id="'+i+'-input-param-Ti-range"  style="width:80px;" min="-5" max="5" step="0.1" value="'+log10(this.Ti())+'" oninput="updateParametreTi('+i+',Math.pow(10,this.value))"/>'+
					'			</td>'+
					'		</tr>';
					return res;
				}
				
			this.ajouteArbo_Parametre_a=function(i)
				{
					res='		<tr data-tt-id="'+i+'-param-a" data-tt-parent-id="'+i+'-param">'+
					'			<td>'+
					'				<label for="'+i+'-param-a-number">a = </label>'+
					'				<input type="number" name="'+i+'-input-param-a-number" id="'+i+'-input-param-a-number" value="'+this.a()+'" style="width:50px;" min="0" oninput="updateParametreA('+i+',this.value)"/>'+
					'				<input type="range" name="'+i+'-input-param-a-range" id="'+i+'-input-param-a-range"  style="width:80px;" min="-5" max="5" step="0.1" value="'+log10(this.a())+'" oninput="updateParametreA('+i+',Math.pow(10,this.value))"/>'+
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
				return signe+"\\RPAmp{"+int2strfloat(this.Kp())+"}{"+int2strfloat(this.Ti())+"}{"+int2strfloat(this.a())+"}";
			}

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodeGdbAsymptotiqueLaTex=function()
			{
				signe="";
				if(this.inverse())
					signe="-";
				return signe+"\\RPAmpAsymp{"+int2strfloat(this.Kp())+"}{"+int2strfloat(this.Ti())+"}{"+int2strfloat(this.a())+"}";
			}

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodePhaseAnalytiqueLaTex=function()
			{
				signe="";
				if(this.inverse())
					signe="-";
				return signe+"\\RPArg{"+int2strfloat(this.Kp())+"}{"+int2strfloat(this.Ti())+"}{"+int2strfloat(this.a())+"}";
			}

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodePhaseAsymptotiqueLaTex=function()
			{
				signe="";
				if(this.inverse())
					signe="-";
				return signe+"\\RPArgAsymp{"+int2strfloat(this.Kp())+"}{"+int2strfloat(this.Ti())+"}{"+int2strfloat(this.a())+"}";
			}


		//Exporte les paramètres pour le fichier XML
		this.exportParametresXML=function()
			{
				var rendu=	"			<Kp>"+this.Kp()+"</Kp>\n"+
						"			<Ti>"+this.Ti()+"</Ti>\n"+
						"			<a>"+this.a()+"</a>\n";
				return rendu;
			}

}

//Fonction.prototype = Object.create(Kinetic.Group.prototype);//On recopie le prototype de Kinteic.Group
RetardPhase.prototype.constructor = RetardPhase;//On recopie le constructeur de Noeud dans son prototype


