

// Classe abstraite représentant une fonction à afficher dans Bode
class Fonction_Integrateur extends Fonction
{

	// CONSTRUCTEUR ***********************
	constructor(_Ki=1, inverse=false, commentaire_="")
	{
		// Héritage
		super("Intégrateur pur", "#AAAA00", inverse, commentaire_)
		
		this.type("intégrateur")
		this.Ki(_Ki)
		this._icone = "./sources/images/iconeIntegrale.png";	// URL Icone à afficher dans le menu HTML
		this.afficheAnalytique(false)
		this.afficheAsymptotique(false)
 	}
 	
 	
 	
 	
	// MEMBRES ***********************
	
		_Ki = 1	// Gain statique
	
	// GETTER - SETTER *******************
	
 		// Gain statique
 		Ki(k,redessine=true)
 		{
			if(typeof(k)!='undefined')
			{
				this._Ki = parseFloat(k);
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
	// MEMBRES *******************
	
	
		// (virtuelle)
		// Fonction qui calcule le gain en dB asymptotique
		// w = réel positif
		GdB_asymptotique(w)
		{
			return 20*Math.log10(this.Ki()/w) *this.coefInv()
		}
		
		// (virtuelle)
		// Fonction qui calcule le gain en dB
		// w = réel positif
		GdB(w)
		{
			return 20*Math.log10(this.Ki()/w) *this.coefInv()
		}
	
	
		// (virtuelle)
		// Fonction qui calcule la phase asymptotique
		// w = réel positif
		phi_asymptotique(w)
		{
			return -90 *this.coefInv()
		}
		
		// (virtuelle)
		// Fonction qui calcule la phase
		// w = réel positif
		phi(w)
		{
			return -90 *this.coefInv()
		}


		
		
		// **************************************************************************************
		// Liste des paramètres au format JSON
		getParametresJSON()
		{
			return {Ki:this.Ki()};
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
'						</div>';
					return res;
		}
		
	
}

