//Fonction qui servira de constructeur pour la classe Noeud
var PIDSerie = function(paramKp,paramTi,paramTd)
{

	//==========================
	//Constructeur issu de l'heritage
	//==========================
		Fonction.call(this);

	//==========================
	//Variables Membres
	//==========================

		//Redefinition
		this._type="PID-serie";//Nom de la fonction
		this._nom="Correcteur P.I.D.-Série";//Nom de la fonction
		this._icone="./sources/icones/iconePIDSerie.png";
		this._couleur="#ED028C";

		//parametres
		this._Kp_=parseFloat(paramKp);
		this._Ti_=parseFloat(paramTi);
		this._Td_=parseFloat(paramTd);



	//==========================
	//Fonctions Membres
	//==========================

		//Renvoie l'image de la fonction
		this.getGdb=function(w)
			{
				var val=0;	//0 par defaut
				val=20*log10(this.Kp()/(this.Ti()*w))+10*log10((1+this.Ti()*this.Ti()*w*w)*(1+this.Td()*this.Td()*w*w));
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
				if(w>1/this.Ti())
					fi=20*log10(this.Ti())+20*log10(w);
				if(w>1/this.Td())
					fd=20*log10(this.Td())+20*log10(w);
				val=20*log10(this.Kp()/this.Ti())+fi+fd-20*log10(w);
				if(this.inverse())
					return -val;
				else
					return val;
			}
		//Renvoie l'image de la fonction
		this.getPhase=function(w)
			{
				var val=0;	//0 par defaut
				val=(Math.atan(this.Ti()*w)+Math.atan(this.Td()*w)-Math.PI/2)*180/Math.PI;
				if(this.inverse())
					return -val;
				else
					return val;
			}

		this.getPhaseAsympt=function(w)
			{
				var val=0;
				if(w<1/this.Ti() && w<1/this.Td())
					val=-90;
				else if(w>1/this.Ti() && w>1/this.Td())
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
				return "PID";
			}
		//Fonction qui affiche le type de fonction
		this.afficheType=function()
			{
				return "Correcteur PID";
			}
		//Fonction qui affihce l'équation
		this.afficheEquation=function()
			{
				if(this.inverse())
					return '<span class="equation"><img src="http://latex.codecogs.com/gif.latex?\\tiny&space;\\frac{T_ip}{K_p(1&plus;T_ip)(1&plus;Tdp)}" title="\tiny \frac{T_ip}{K_p(1+T_ip)(1+Tdp)}" /></span>';
				else
					return '<span class="equation"><img src="http://latex.codecogs.com/gif.latex?\\tiny&space;K_p\\frac{1&plus;T_i&space;p}{T_i&space;p}(1&plus;T_d&space;p)" title="\\tiny K_p\frac{1+T_i p}{T_i p}(1+T_d p)" /></span>';
			}
		//Affiche la partir de formulaire correspondant aux paramètre de chaque fonction
/*		this.getFromulaireParametres=function(i)
			{
				var r='					<br/><label for="formParamK'+i+'">K=</label>';
				r+='							<input type="text" id="formParamK'+i+'" name="formParamK'+i+'" value="'+this.K()+'" size="1" onchange="updateParametreK('+i+')"/>'
				r+='						<br/><label for="formParamW0'+i+'">&omega;<sub>0</sub>=</label>';
				r+='							<input type="text" id="formParamW0'+i+'" name="formParamW0'+i+'" value="'+this.w0()+'" size="1" onchange="updateParametreW0('+i+')"/>'
				r+='						<br/><label for="formParamZ'+i+'">Z=</label>';
				r+='							<input type="text" id="formParamZ'+i+'" name="formParamZ'+i+'" value="'+this.z()+'" size="1" onchange="updateParametreZ('+i+')"/>'
				return r;//Aucun par défaut
			}*/


	//==========================
	//MENU ARBORESCENCE
	//==========================


		this.ajouteLigneArbre2_parametres=function(i)
			{
				return	this.ajouteLigneArbre2_Parametre_Kp(i)+
					this.ajouteLigneArbre2_Parametre_Ti(i)+
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

		this.ajouteLigneArbre2_Parametre_Ti=function(i)
			{
				res=''+
'						<div class="item">'+
'							<label for="'+i+'-param-Ti-number">T<sub>i</sub> = </label>'+
'							<input type="number" name="'+i+'-input-param-Ti-number" id="'+i+'-input-param-Ti-number" value="'+this.Ti()+'" style="width:50px;" min="0" oninput="updateParametreTi('+i+',this.value)"/>'+
'							<input type="range" name="'+i+'-input-param-Ti-range" id="'+i+'-input-param-Ti-range"  style="width:120px;" min="-5" max="5" step="0.1" value="'+log10(this.Ti())+'" oninput="updateParametreTi('+i+',Math.pow(10,this.value))"/>'+
'						</div>';
				return res;
			}

		this.ajouteLigneArbre2_Parametre_Td=function(i)
			{
				res=''+
'						<div class="item">'+
'							<label for="'+i+'-param-Td-number">T<sub>d</sub> = </label>'+
'							<input type="number" name="'+i+'-input-param-Td-number" id="'+i+'-input-param-Td-number" value="'+this.Ti()+'" style="width:50px;" min="0" oninput="updateParametreTd('+i+',this.value)"/>'+
'							<input type="range" name="'+i+'-input-param-Td-range" id="'+i+'-input-param-Td-range"  style="width:120px;" min="-5" max="5" step="0.1" value="'+log10(this.Td())+'" oninput="updateParametreTd('+i+',Math.pow(10,this.value))"/>'+
'						</div>';
				return res;
			}



		//Old
		/*this.ajouteLigneArbre_titre=function(i)
			{
				$("#arborescence").treetable('loadBranch',null,
					'<tr data-tt-id="'+i+'">'+
					'	<td>'+
					'		<img class="icone" src="./sources/icones/iconePIDSerie.png"/>'+
					'		<strong>Correcteur PID-Série</strong> '+
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
					this.ajouteArbo_Parametre_Td(i)+
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
				
			this.ajouteArbo_Parametre_Td=function(i)
				{
					res='		<tr data-tt-id="'+i+'-param-Td" data-tt-parent-id="'+i+'-param">'+
					'			<td>'+
					'				<label for="'+i+'-param-Td-number">T<sub>d</sub> = </label>'+
					'				<input type="number" name="'+i+'-input-param-Td-number" id="'+i+'-input-param-Td-number" value="'+this.Ti()+'" style="width:50px;" min="0" oninput="updateParametreTd('+i+',this.value)"/>'+
					'				<input type="range" name="'+i+'-input-param-Td-range" id="'+i+'-input-param-Td-range"  style="width:80px;" min="-5" max="5" step="0.1" value="'+log10(this.Td())+'" oninput="updateParametreTd('+i+',Math.pow(10,this.value))"/>'+
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
				return signe+"\\PIDAmp{"+int2strfloat(this.Kp())+"}{"+int2strfloat(this.Ti())+"}{"+int2strfloat(this.Td())+"}";
			}

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodeGdbAsymptotiqueLaTex=function()
			{
				signe="";
				if(this.inverse())
					signe="-";
				return signe+"\\PIDAmpAsymp{"+int2strfloat(this.Kp())+"}{"+int2strfloat(this.Ti())+"}{"+int2strfloat(this.Td())+"}";
			}

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodePhaseAnalytiqueLaTex=function()
			{
				signe="";
				if(this.inverse())
					signe="-";
				return signe+"\\PIDArg{"+int2strfloat(this.Kp())+"}{"+int2strfloat(this.Ti())+"}{"+int2strfloat(this.Td())+"}";
			}

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodePhaseAsymptotiqueLaTex=function()
			{
				signe="";
				if(this.inverse())
					signe="-";
				return signe+"\\PIDArgAsymp{"+int2strfloat(this.Kp())+"}{"+int2strfloat(this.Ti())+"}{"+int2strfloat(this.Td())+"}";
			}


		//Exporte les paramètres pour le fichier XML
		this.exportParametresXML=function()
			{
				var rendu=	"			<Kp>"+this.Kp()+"</Kp>\n"+
						"			<Ti>"+this.Ti()+"</Ti>\n"+
						"			<Td>"+this.Td()+"</Td>\n";
				return rendu;
			}

}

//Fonction.prototype = Object.create(Kinetic.Group.prototype);//On recopie le prototype de Kinteic.Group
PIDSerie.prototype.constructor = PIDSerie;//On recopie le constructeur de Noeud dans son prototype


