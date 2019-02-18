//Fonction qui servira de constructeur pour la classe Noeud
var DeuxiemeOrdre = function(paramK,paramW0,paramZ)
{

	//==========================
	//Constructeur issu de l'heritage
	//==========================
		Fonction.call(this);

	//==========================
	//Variables Membres
	//==========================

		//Redefinition
		this._type="2ème Ordre";//Nom de la fonction
		this._nom="2<sup>ème</sup> Ordre";//Nom de la fonction
		this._couleur="#FF0000";
		this._icone="./sources/icones/icone2emeOrdre.png";
		this._afficheAnalytique=false;//Affiche-t-on la courbe analytique seule ?
		this._afficheAsymptotique=false;//Affiche-t-on la courbe asymptotique seule ,

		//parametres
		this._K_=parseFloat(paramK);
		this._w0_=parseFloat(paramW0);
		this._z_=parseFloat(paramZ);



	//==========================
	//Fonctions Membres
	//==========================

		//Renvoie l'image de la fonction
		this.getGdb=function(w)
			{
				var val=20*log10(this.K())-20/2*log10(Math.pow(2*this.z()/this.w0()*w,2)+Math.pow(1-1/(Math.pow(this.w0(),2))*w*w,2));	//0 par defaut
				if(this.inverse())
					return -val;
				else
					return val;
			}

		this.getGdbAsympt=function(w)
			{
				var val=0;
				if(this.z()<=1)
					{
						if(w<=this.w0())
							val= 20*log10(this.K());
						else
							val= 20*log10(this.K())+40*log10(this.w0())-40*log10(w);
					}
				else
					{
						var a=1;
						var b=2*this.z()*this.w0();
						var c=this.w0()*this.w0();
						var delta=b*b-4*a*c;
						var w1=-(-b+Math.sqrt(delta))/(2*a);
						var w2=-(-b-Math.sqrt(delta))/(2*a);
						if(w<w1)
								val= 20*log10(this.K());
						else if(w<w2)
								val= 20*log10(this.K())+20*log10(w1)-20*log10(w);
						else
								val= 20*log10(this.K())+20*log10(w1)+20*log10(w2)-40*log10(w);
					}
				if(this.inverse())
					return -val;
				else
					return val;
			}
		//Renvoie l'image de la fonction
		this.getPhase=function(w)
			{
				var val=-Math.atan2(2*this.z()/this.w0()*w,1-1/(this.w0()*this.w0())*w*w)/Math.PI*180;	//0 par defaut
				if(this.inverse())
					return -val;
				else
					return val;
			}

		this.getPhaseAsympt=function(w)
			{
				var val=0;
				if(this.z()<=1)
					{
						if(w<this.w0())
							val=0;
						else
							val=-180;
					}
				else
					{
						var a=1;
						var b=2*this.z()/this.w0()*Math.pow(this.w0(),2);
						var c=Math.pow(this.w0(),2);
						var delta=b*b-4*a*c;
						var w1=-(-b+Math.sqrt(delta))/(2*a);
						var w2=-(-b-Math.sqrt(delta))/(2*a);
						if(w<w1)
								val= 0;
						else if(w<w2)
								val= -90;
						else
								val= -180;
					}
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
		//Getter/Setter du paramètre w0
		this.w0=function(paramW0)
			{
				if(typeof(paramW0) === 'undefined')//Si pas de paramter --> getter
					return this._w0_;
				this._w0_=parseFloat(paramW0);//Sinon --> Setter
				return this._w0_;
			}
		//Getter/Setter du paramètre z
		this.z=function(paramZ)
			{
				if(typeof(paramZ) === 'undefined')//Si pas de paramter --> getter
					return this._z_;
				this._z_=parseFloat(paramZ);//Sinon --> Setter
				return this._z_;
			}
		//Getter/Setter du paramètre z
		this.Q=function(paramQ)
			{
				if(typeof(paramQ) === 'undefined')//Si pas de paramter --> getter
					return 1/(2*this._z_);
				this._z_=1/(2*parseFloat(paramQ));//Sinon --> Setter
				return 1/(2*paramQ);
			}

		//Fonction qui affiche le type de fonction
		this.type=function()
			{
				return "2emeOrdre"
			}
		//Fonction qui affiche le type de fonction
		this.afficheType=function()
			{
				return "2<sup>ème</sup> Ordre";
			}
		//Fonction qui affihce l'équation
		this.afficheEquation=function()
			{
				if(this.inverse())
					return '<span class="equation">'+fraction(fraction('1',this.w0()+'<sup>2</sup>')+'p<sup>2</sup>+'+fraction('2x'+this.z(),this.w0())+'p+1',this.K())+'</span>';
				else
					return '<span class="equation">'+fraction(this.K(),fraction('1',this.w0()+'<sup>2</sup>')+'p<sup>2</sup>+'+fraction('2x'+this.z(),this.w0())+'p+1')+'</span>';
			}
		//Affiche la partir de formulaire correspondant aux paramètre de chaque fonction
		this.getFromulaireParametres=function(i)
			{
				var r='					<br/><label for="formParamK'+i+'">K=</label>';
				r+='							<input type="text" id="formParamK'+i+'" name="formParamK'+i+'" value="'+this.K()+'" size="1" onchange="updateParametreK('+i+')"/>'
				r+='						<br/><label for="formParamW0'+i+'">&omega;<sub>0</sub>=</label>';
				r+='							<input type="text" id="formParamW0'+i+'" name="formParamW0'+i+'" value="'+this.w0()+'" size="1" onchange="updateParametreW0('+i+')"/>'
				r+='						<br/><label for="formParamZ'+i+'">Z=</label>';
				r+='							<input type="text" id="formParamZ'+i+'" name="formParamZ'+i+'" value="'+this.z()+'" size="1" onchange="updateParametreZ('+i+')"/>'
				return r;//Aucun par défaut
			}


	//==========================
	//MENU ARBORESCENCE
	//==========================

		this.ajouteLigneArbre2_parametres=function(i)
			{
				return	this.ajouteLigneArbre2_Parametre_K(i)+
					this.ajouteLigneArbre2_Parametre_w0(i)+
					this.ajouteLigneArbre2_Parametre_z(i)+
					this.ajouteLigneArbre2_boutonInverse(i);
			}

		this.ajouteLigneArbre2_Parametre_w0=function(i)
			{
				res=''+
'						<div class="item">'+
'							<label for="'+i+'-input-param-w0-number">&omega;<sub>0</sub> = </label>'+
'							<input type="number" name="'+i+'input-param-w0-number" id="'+i+'-input-param-w0-number" style="width:50px;" value="'+this.w0()+'" min="0" step="0.1" oninput="updateParametreW0('+i+',this.value)"/>'+
'							<input type="range" name="'+i+'-input-param-w0-range" id="'+i+'-input-param-w0-range"  style="width:120px;" min="-5" max="5" step="0.1" value="'+log10(this.w0())+'" oninput="updateParametreW0('+i+',Math.pow(10,this.value))"/>'+
'						</div>';
				return res;
			}

		this.ajouteLigneArbre2_Parametre_z=function(i)
			{
				res=''+
'						<div class="item">';
					if($("input[name=boutonSIPhysique]:checked").val()=="SI")//Si SI'ste
						res+=''+
'							<label for="'+i+'-input-param-z-number">z = </label>'+
'							<input type="number" name="'+i+'-input-param-z-number" id="'+i+'-input-param-z-number" value="'+this.z()+'" min="0" step="0.05" style="width:50px;" oninput="updateParametreZ('+i+',this.value)"/>'+
'							<input type="range" name="'+i+'-input-param-z-range" id="'+i+'-input-param-z-range"  style="width:120px;" min="0" max="1.5" step="0.1" value="'+this.z()+'" oninput="updateParametreZ('+i+',this.value)"/>';
					else //Si physicien
						res+=''+
'							<label for="'+i+'-input-param-Q-number">Q = </label>'+
'							<input type="number" name="'+i+'-input-param-Q-number" id="'+i+'-input-param-Q-number" value="'+this.Q()+'" min="0" step="0.05" style="width:50px;" oninput="updateParametreQ('+i+',this.value)"/>'+
'							<input type="range" name="'+i+'-input-param-Q-range" id="'+i+'-input-param-Q-range"  style="width:80px;" min="0" max="1" step="0.05" value="'+(log10(20*this.Q())/log10(20*10))+'" oninput="updateParametreQ('+i+',0.05*Math.pow(10,log10(200)*this.value));"/>';
				res+=''+
'						</div>';
				return res;
			}

		//OLD
		/*this.ajouteLigneArbre_titre=function(i)
			{
				$("#arborescence").treetable('loadBranch',null,
					'<tr data-tt-id="'+i+'">'+
					'	<td>'+
					'		<img class="icone" src="./sources/icones/icone2emeOrdre.png"/>'+
					'		<strong>2<sup>ème</sup> ordre</strong> '+
					this.ajouteArbo_CarreCouleur(i)+
					'	</td>'+
					'</tr>');
			}*/

		/*this.ajouteLigneArbre_parametres=function(i)
			{
				node=$("#arborescence").treetable("node",i+"-param");
				$("#arborescence").treetable('loadBranch',node,
					this.ajouteArbo_Parametre_K(i)+
					this.ajouteArbo_Parametre_w0(i)+
					this.ajouteArbo_Parametre_z(i)+
					this.ajouteArbo_BoutonInverse(i));
			}*/


			/*	  this.ajouteArbo_Parametre_w0=function(i)
					{
					res='		<tr data-tt-id="'+i+'-param-w0" data-tt-parent-id="'+i+'-param">'+
					'			<td>'+
					'				<label for="'+i+'-input-param-w0-number">&omega;<sub>0</sub> = </label>'+
					'				<input type="number" name="'+i+'input-param-w0-number" id="'+i+'-input-param-w0-number" style="width:50px;" value="'+this.w0()+'" min="0" step="0.1" oninput="updateParametreW0('+i+',this.value)"/>'+
					'				<input type="range" name="'+i+'-input-param-w0-range" id="'+i+'-input-param-w0-range"  style="width:80px;" min="-5" max="5" step="0.2" value="'+log10(this.w0())+'" oninput="updateParametreW0('+i+',Math.pow(10,this.value))"/>'+
					'			</td>'+
					'		</tr>';
					return res;
					}*/


			/*	  this.ajouteArbo_Parametre_z=function(i)
					{
					if($("input[name=boutonSIPhysique]:checked").val()=="SI")//Si SI'ste
						{
							res='		<tr data-tt-id="'+i+'-param-z" data-tt-parent-id="'+i+'-param">'+
							'			<td>'+
							'				<label for="'+i+'-input-param-z-number">z = </label>'+
							'				<input type="number" name="'+i+'-input-param-z-number" id="'+i+'-input-param-z-number" value="'+this.z()+'" min="0" step="0.05" style="width:50px;" oninput="updateParametreZ('+i+',this.value)"/>'+
							'				<input type="range" name="'+i+'-input-param-z-range" id="'+i+'-input-param-z-range"  style="width:80px;" min="0" max="1.5" step="0.05" value="'+this.z()+'" oninput="updateParametreZ('+i+',this.value)"/>'+
							'			</td>'+
							'		</tr>';
						}
					else//Si physicien
						{
							res='		<tr data-tt-id="'+i+'-param-Q" data-tt-parent-id="'+i+'-param">'+
							'			<td>'+
							'				<label for="'+i+'-input-param-Q-number">Q = </label>'+
							'				<input type="number" name="'+i+'-input-param-Q-number" id="'+i+'-input-param-Q-number" value="'+this.Q()+'" min="0" step="0.05" style="width:50px;" oninput="updateParametreQ('+i+',this.value)"/>'+
							'				<input type="range" name="'+i+'-input-param-Q-range" id="'+i+'-input-param-Q-range"  style="width:80px;" min="0" max="1" step="0.05" value="'+(log10(20*this.Q())/log10(20*10))+'" oninput="updateParametreQ('+i+',0.05*Math.pow(10,log10(200)*this.value));"/>'+
							'			</td>'+
							'		</tr>';
						}

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
				return signe+"\\SOAmp{"+int2strfloat(this.K())+"}{"+int2strfloat(this.z())+"}{"+int2strfloat(this.w0())+"}";
			}

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodeGdbAsymptotiqueLaTex=function()
			{
				signe="";
				if(this.inverse())
					signe="-";
				return signe+"\\SOAmpAsymp{"+int2strfloat(this.K())+"}{"+int2strfloat(this.z())+"}{"+int2strfloat(this.w0())+"}";
			}

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodePhaseAnalytiqueLaTex=function()
			{
				signe="";
				if(this.inverse())
					signe="-";
				return signe+"\\SOArg{"+int2strfloat(this.K())+"}{"+int2strfloat(this.z())+"}{"+int2strfloat(this.w0())+"}";
			}

		//Fonction qui renvoie juste la fonction 
		this.fonctionBodePhaseAsymptotiqueLaTex=function()
			{
				signe="";
				if(this.inverse())
					signe="-";
				return signe+"\\SOArgAsymp{"+int2strfloat(this.K())+"}{"+int2strfloat(this.z())+"}{"+int2strfloat(this.w0())+"}";
			}

		//Exporte les paramètres pour le fichier XML
		this.exportParametresXML=function()
			{
				var rendu=	"			<K>"+this.K()+"</K>\n"+
						"			<w0>"+this.w0()+"</w0>\n"+
						"			<z>"+this.z()+"</z>\n";
				return rendu;
			}


}

//Fonction.prototype = Object.create(Kinetic.Group.prototype);//On recopie le prototype de Kinteic.Group
DeuxiemeOrdre.prototype.constructor = DeuxiemeOrdre;//On recopie le constructeur de Noeud dans son prototype


