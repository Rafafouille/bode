

// Classe abstraite représentant une fonction à afficher dans Bode
class Fonction_Avance_De_Phase extends Fonction
{

	// CONSTRUCTEUR ***********************
	constructor(_Kd=1, _Td=1, _a=10, inverse=false)
	{
		// Héritage
		super("Avance de phase","#00AAAA", inverse)
		
		this.type("avance de phase")
		this.Kd(_Kd)
		this.Td(_Td)
		this.a(_a)
		this._icone = "./sources/images/iconeAvancePhase.png";	// URL Icone à afficher dans le menu HTML
		
 	}
 	
 	
 	
 	
	// MEMBRES ***********************
	
		_Kd = 1	// Gain statique
		_Td = 1	// Constante de temps (en s)
		_a = 10// Paramètre de fenêtre
	
	// GETTER - SETTER *******************
	
 		// Gain statique
 		Kd(k, redessine=true)
 		{
			if(typeof(k)!='undefined')
			{
				this._Kd=k;
				if(redessine)
				{
					this.redessine_tout();
					FONCTION_GLOBALE.redessine_tout();
					updateTousLesGraphes();
					// Update de l'arbre des fonctions
					$("#"+String(this.n())+"-input-param-Kd-number").val(k);
					$("#"+String(this.n())+"-input-param-Kd-number").attr("step",(k/2).toPrecision(4));
					$("#"+String(this.n())+"-input-param-Kd-range").val(Math.log10(k));
				}
			}
			return this._Kd;
 		}
 		// Constante de temps
 		Td(t, redessine=true)
 		{
			if(typeof(t)!='undefined')
			{
				if(t<0)
					t=0
				this._Td=t;
				if(redessine)
				{
					this.redessine_tout();
					FONCTION_GLOBALE.redessine_tout();
					updateTousLesGraphes();
					// Update de l'arbre des fonctions
					$("#"+String(this.n())+"-input-param-Td-number").val(t);
					$("#"+String(this.n())+"-input-param-Td-number").attr("step",(t/2).toPrecision(4));
					$("#"+String(this.n())+"-input-param-Td-range").val(Math.log10(t));
				}
			}
			return this._Td;
 		}
 		// Constante a
 		a(a, redessine=true)
 		{
			if(typeof(a)!='undefined')
			{
				if(a<1)
					a=1
				this._a=a;
				if(redessine)
				{
					this.redessine_tout();
					FONCTION_GLOBALE.redessine_tout();
					updateTousLesGraphes();
					// Update de l'arbre des fonctions
					$("#"+String(this.n())+"-input-param-a-number").val(a);
					$("#"+String(this.n())+"-input-param-a-number").attr("step",(a*0.8).toPrecision(4));
					$("#"+String(this.n())+"-input-param-a-range").val(Math.log10(a));
				}
			}
			return this._a;
 		}
 		
 		
 		
	// MEMBRES *******************
	
	
		// (virtuelle)
		// Fonction qui calcule le gain en dB asymptotique
		// w = réel positif
		GdB_asymptotique(w)
		{
			if(w < 1/(this.Td()*this.a()))
				return 20*Math.log10(this.Kd()) *this.coefInv()
			else if(w < 1/this.Td())
				return 20*(Math.log10(this.Kd()*this.a()*this.Td()*w)) *this.coefInv()
			else
				return 20*Math.log10(this.Kd()*this.a()) *this.coefInv()
		}
		
		// (virtuelle)
		// Fonction qui calcule le gain en dB
		// w = réel positif
		GdB(w)
		{
			return 20*Math.log10(this.Kd()*Math.sqrt(1+Math.pow(this.a()*this.Td()*w,2))/Math.sqrt(1+Math.pow(this.Td()*w,2))) *this.coefInv()
		}
	
	
		// (virtuelle)
		// Fonction qui calcule la phase asymptotique
		// w = réel positif
		phi_asymptotique(w)
		{
			if(w < 1/(this.Td()*this.a()))
				return 0
			else if(w < 1/this.Td())
				return 90 *this.coefInv()
			else
				return 0
		}
		
		// (virtuelle)
		// Fonction qui calcule la phase
		// w = réel positif
		phi(w)
		{
			return (Math.atan(this.a()*this.Td()*w)-Math.atan(this.Td()*w))*180/Math.PI *this.coefInv()
		}
	
	
		// bosse de phase
		phiM()
		{
			return Math.asin((this.a()-1)/(1+this.a())) *this.coefInv()
		}
		
		// Position de la bosse de phase
		wM()
		{
			return 1/(Math.sqrt(this.a())*this.Td()) *this.coefInv()
		}
			
			
			
			
		
		// **************************************************************************************
		// Liste des paramètres au format JSON
		getParametresJSON()
		{
			return {Kd:this.Kd(),Td:this.Td(),a:this.a()};
		}
		
		
		
	// ====================================================================================
	// ====================================================================================
	// ARBRE DES FONCTIONS
	// ====================================================================================
	// ====================================================================================
	
		
		//fonction qui ajoute la liste des paramètres dans l'arborescence
		// ECRASE LA CLASSE MERE
		ajouteLigneArbre2_parametres()
		{
			var res = 	this.ajouteLigneArbre2_boutonInverse();
			res+=''+
'						<div class="item">'+
	'						<label for="'+String(this.n())+'-input-param-Kd-number">K<sub>d</sub> = </label>'+
	'						<input type="number" name="'+String(this.n())+'-input-param-Kd-number" id="'+String(this.n())+'-input-param-Kd-number" min="0" step="0.5" style="width:50px;" value="'+this.Kd()+'" onchange="getFonctionByNum('+String(this.n())+').Kd(this.value)"/>'+
	'						<input type="range" name="'+String(this.n())+'-input-param-Kd-range" id="'+String(this.n())+'-input-param-Kd-range"  style="width:120px;" min="-5" max="5" step="0.1" value="'+Math.log10(this.Kd())+'" oninput="getFonctionByNum('+String(this.n())+').Kd(Math.pow(10,this.value))"/>'+
'						</div>'+
'						<div class="item">'+
	'						<label for="'+String(this.n())+'-input-param-Td-number">&#964;<sub>d</sub> = </label>'+
	'						<input type="number" name="'+String(this.n())+'-input-param-Td-number" id="'+String(this.n())+'-input-param-Td-number" min="0" step="0.5" style="width:50px;" value="'+this.Td()+'" onchange="getFonctionByNum('+String(this.n())+').Td(this.value)"/>'+
	'						<input type="range" name="'+String(this.n())+'-input-param-Td-range" id="'+String(this.n())+'-input-param-Td-range"  style="width:120px;" min="-5" max="5" step="0.1" value="'+Math.log10(this.Td())+'" oninput="getFonctionByNum('+String(this.n())+').Td(Math.pow(10,this.value))"/>'+
'						</div>'+
'						<div class="item">'+
	'						<label for="'+String(this.n())+'-input-param-a-number">a = </label>'+
	'						<input type="number" name="'+String(this.n())+'-input-param-a-number" id="'+String(this.n())+'-input-param-a-number" min="1" step="0.5" style="width:50px;" value="'+this.a()+'" onchange="getFonctionByNum('+String(this.n())+').a(this.value)"/>'+
	'						<input type="range" name="'+String(this.n())+'-input-param-a-range" id="'+String(this.n())+'-input-param-a-range"  style="width:120px;" min="0" max="5" step="0.1" value="'+Math.log10(this.a())+'" oninput="getFonctionByNum('+String(this.n())+').a(Math.pow(10,this.value))"/>'+
'						</div>';
					return res;
		}
	
}

