

// Classe abstraite représentant une fonction à afficher dans Bode
class Fonction_Gain extends Fonction
{

	// CONSTRUCTEUR ***********************
	constructor(_K=1)
	{
		// Héritage
		super("Gain pur", "#5555FF")
		
		this.type("gain");
		this.K(_K)
		this._icone = "./sources/images/iconeGain.png";	// URL Icone à afficher dans le menu HTML
		this.afficheAnalytique(false)
		this.afficheAsymptotique(false)
 	}
 	
 	
 	
 	
	// MEMBRES ***********************
	
		_K = 1	// Gain statique
	
	// GETTER - SETTER *******************
	
 		// Gain statique
 		K(k,redessine=true)
 		{
			if(typeof(k)!='undefined')
			{
				this._K=k;
				if(redessine)
				{
					this.redessine_tout();
					FONCTION_GLOBALE.redessine_tout();
					updateTousLesGraphes();
					// Update de l'arbre des fonctions
					$("#"+String(this.n())+"-input-param-K-number").val(k);
					$("#"+String(this.n())+"-input-param-K-number").attr("step",(k/2).toPrecision(4));
					$("#"+String(this.n())+"-input-param-K-range").val(Math.log10(k));
				}
			}
			return this._K;
 		}
	// MEMBRES *******************
	
	
		// (virtuelle)
		// Fonction qui calcule le gain en dB asymptotique
		// w = réel positif
		GdB_asymptotique(w)
		{
			return 20*Math.log10(this.K()) *this.coefInv()
		}
		
		// (virtuelle)
		// Fonction qui calcule le gain en dB
		// w = réel positif
		GdB(w)
		{
			return 20*Math.log10(this.K()) *this.coefInv()
		}
	
	
		// (virtuelle)
		// Fonction qui calcule la phase asymptotique
		// w = réel positif
		phi_asymptotique(w)
		{
			return 0
		}
		
		// (virtuelle)
		// Fonction qui calcule la phase
		// w = réel positif
		phi(w)
		{
			return 0
		}
	
	
	
		
		
		// **************************************************************************************
		// Liste des paramètres au format JSON
		getParametresJSON()
		{
			return {K:this.K()};
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
	'						<label for="'+String(this.n())+'-input-param-K-number">K = </label>'+
	'						<input type="number" name="'+String(this.n())+'-input-param-K-number" id="'+String(this.n())+'-input-param-K-number" min="0" step="0.5" style="width:50px;" value="'+this.K()+'" onchange="getFonctionByNum('+String(this.n())+').K(this.value)"/>'+
	'						<input type="range" name="'+String(this.n())+'-input-param-K-range" id="'+String(this.n())+'-input-param-K-range"  style="width:120px;" min="-5" max="5" step="0.1" value="'+Math.log10(this.K())+'" oninput="getFonctionByNum('+String(this.n())+').K(Math.pow(10,this.value))"/>'+
'						</div>';
					return res;
		}
		
		
	
}

