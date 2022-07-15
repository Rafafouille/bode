

// Classe abstraite représentant une fonction à afficher dans Bode
class Fonction_Retard_De_Phase extends Fonction
{

	// CONSTRUCTEUR ***********************
	constructor(_Ki=1, _Ti=1, _a=10, inverse=false)
	{
		// Héritage
		super("Retard de phase","#00AAAA", inverse)
		
		this.type("retard de phase")
		this.Ki(_Ki)
		this.Ti(_Ti)
		this.a(_a)
		this._icone = "./sources/images/iconeRetardPhase.png";	// URL Icone à afficher dans le menu HTML
		
 	}
 	
 	
 	
 	
	// MEMBRES ***********************
	
		_Ki = 1	// Gain statique
		_Ti = 1	// Constante de temps (en s)
		_a = 10// Paramètre de fenêtre
	
	// GETTER - SETTER *******************
	
 		// Gain statique
 		Ki(k, redessine=true)
 		{
			if(typeof(k)!='undefined')
			{
				this._Ki=k;
				if(redessine)
				{
					this.redessine_tout();
					FONCTION_GLOBALE.redessine_tout();
					updateTousLesGraphes();
					// Update de l'arbre des fonctions
					$("#"+String(this.n())+"-input-param-Ki-number").val(k);
					$("#"+String(this.n())+"-input-param-Ki-number").attr("step",(k/2).toPrecision(4));
					$("#"+String(this.n())+"-input-param-Ki-range").val(Math.log10(k));
				}
			}
			return this._Ki;
 		}
 		// Constante de temps
 		Ti(t, redessine=true)
 		{
			if(typeof(t)!='undefined')
			{
				if(t<0)
					t=0
				this._Ti=t;
				if(redessine)
				{
					this.redessine_tout();
					FONCTION_GLOBALE.redessine_tout();
					updateTousLesGraphes();
					// Update de l'arbre des fonctions
					$("#"+String(this.n())+"-input-param-Ti-number").val(t);
					$("#"+String(this.n())+"-input-param-Ti-number").attr("step",(t/2).toPrecision(4));
					$("#"+String(this.n())+"-input-param-Ti-range").val(Math.log10(t));
				}
			}
			return this._Ti;
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
			if(w < 1/(this.Ti()*this.a()))
				return 20*Math.log10(this.Ki()) *this.coefInv()
			else if(w < 1/this.Ti())
				return 20*(Math.log10(this.Ki()/(this.Ti()*this.a()*w))) *this.coefInv()
			else
				return 20*Math.log10(this.Ki()/this.a()) *this.coefInv()
		}
		
		// (virtuelle)
		// Fonction qui calcule le gain en dB
		// w = réel positif
		GdB(w)
		{
			return 20*Math.log10(this.Ki()*Math.sqrt(1+Math.pow(this.Ti()*w,2))/Math.sqrt(1+Math.pow(this.a()*this.Ti()*w,2))) *this.coefInv()
		}
	
	
		// (virtuelle)
		// Fonction qui calcule la phase asymptotique
		// w = réel positif
		phi_asymptotique(w)
		{
			if(w < 1/(this.Ti()*this.a()))
				return 0
			else if(w < 1/this.Ti())
				return -90 *this.coefInv()
			else
				return 0
		}
		
		// (virtuelle)
		// Fonction qui calcule la phase
		// w = réel positif
		phi(w)
		{
			return (Math.atan(this.Ti()*w)-Math.atan(this.a()*this.Ti()*w))*180/Math.PI *this.coefInv()
		}
	
		// creux de phase
		phiM()
		{
			return Math.asin((1-this.a())/(1+this.a())) *this.coefInv()
		}
		
		// Position du creux de phase
		wM()
		{
			return 1/(Math.sqrt(this.a())*this.Ti()) *this.coefInv()
		}
		
		
		// **************************************************************************************
		// Liste des paramètres au format JSON
		getParametresJSON()
		{
			return {Ki:this.Ki(),Ti:this.Ti(),a:this.a()};
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
	'						<label for="'+String(this.n())+'-input-param-Ki-number">K<sub>i</sub> = </label>'+
	'						<input type="number" name="'+String(this.n())+'-input-param-Ki-number" id="'+String(this.n())+'-input-param-Ki-number" min="0" step="0.5" style="width:50px;" value="'+this.Ki()+'" onchange="getFonctionByNum('+String(this.n())+').Ki(this.value)"/>'+
	'						<input type="range" name="'+String(this.n())+'-input-param-Ki-range" id="'+String(this.n())+'-input-param-Ki-range"  style="width:120px;" min="-5" max="5" step="0.1" value="'+Math.log10(this.Ki())+'" oninput="getFonctionByNum('+String(this.n())+').Ki(Math.pow(10,this.value))"/>'+
'						</div>'+
'						<div class="item">'+
	'						<label for="'+String(this.n())+'-input-param-Ti-number">&#964;<sub>i</sub> = </label>'+
	'						<input type="number" name="'+String(this.n())+'-input-param-Ti-number" id="'+String(this.n())+'-input-param-Ti-number" min="0" step="0.5" style="width:50px;" value="'+this.Ti()+'" onchange="getFonctionByNum('+String(this.n())+').Ti(this.value)"/>'+
	'						<input type="range" name="'+String(this.n())+'-input-param-Ti-range" id="'+String(this.n())+'-input-param-Ti-range"  style="width:120px;" min="-5" max="5" step="0.1" value="'+Math.log10(this.Ti())+'" oninput="getFonctionByNum('+String(this.n())+').Ti(Math.pow(10,this.value))"/>'+
'						</div>'+
'						<div class="item">'+
	'						<label for="'+String(this.n())+'-input-param-a-number">a = </label>'+
	'						<input type="number" name="'+String(this.n())+'-input-param-a-number" id="'+String(this.n())+'-input-param-a-number" min="1" step="0.5" style="width:50px;" value="'+this.a()+'" onchange="getFonctionByNum('+String(this.n())+').a(this.value)"/>'+
	'						<input type="range" name="'+String(this.n())+'-input-param-a-range" id="'+String(this.n())+'-input-param-a-range"  style="width:120px;" min="0" max="5" step="0.1" value="'+Math.log10(this.a())+'" oninput="getFonctionByNum('+String(this.n())+').a(Math.pow(10,this.value))"/>'+
'						</div>';
					return res;
		}
}

