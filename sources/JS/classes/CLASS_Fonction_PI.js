

// Classe abstraite représentant une fonction à afficher dans Bode
class Fonction_PI extends Fonction
{

	// CONSTRUCTEUR ***********************
	constructor(_Ki=1, _Ti=1)
	{
		// Héritage
		super("Correcteur PI","#AA5500")
		
		this.type("PI")
		this.Ti(_Ti)
		this.Ki(_Ki)
		this._icone = "./sources/images/iconePI.png";	// URL Icone à afficher dans le menu HTML
		
 	}
 	
 	
 	
 	
	// MEMBRES ***********************
	
		_Ti = 1	// Constante de temps (en s)
		_Ki = 1	// Gain statique
	
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
 		Ti(t, redessine = true)
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
 		
 		
 		
	// MEMBRES *******************
	
	
		// (virtuelle)
		// Fonction qui calcule le gain en dB asymptotique
		// w = réel positif
		GdB_asymptotique(w)
		{
			if(w > 1/this.Ti())
				return 20*Math.log10(this.Ki()) *this.coefInv()
			else
				return 20*(Math.log10(this.Ki()/(this.Ti()*w))) *this.coefInv()
		}
		
		// (virtuelle)
		// Fonction qui calcule le gain en dB
		// w = réel positif
		GdB(w)
		{
			return 20*Math.log10(this.Ki()*Math.sqrt(1+this.Ti()*this.Ti()*w*w)/this.Ti()/w) *this.coefInv()
		}
	
	
		// (virtuelle)
		// Fonction qui calcule la phase asymptotique
		// w = réel positif
		phi_asymptotique(w)
		{
			if(w > 1/this.Ti())
				return 0
			else
				return -90 *this.coefInv()
		}
		
		// (virtuelle)
		// Fonction qui calcule la phase
		// w = réel positif
		phi(w)
		{
			return (Math.atan(this.Ti()*w)*180/Math.PI-90) *this.coefInv()
		}
	

		// **************************************************************************************
		// Liste des paramètres au format JSON
		getParametresJSON()
		{
			return {Ki:this.Ki(), Ti:this.Ti()};
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
'						</div>';
					return res;
		}	
	
}

