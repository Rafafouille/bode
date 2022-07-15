

// Classe abstraite représentant une fonction à afficher dans Bode
class Fonction_Derivateur extends Fonction
{

	// CONSTRUCTEUR ***********************
	constructor(_Kd=1, inverse=false)
	{
		// Héritage
		super("Dérivateur pur", "#7777FF", inverse)
		
		this.type("dérivateur")
		this.Kd(_Kd)
		this._icone = "./sources/images/iconeDerivee.png";	// URL Icone à afficher dans le menu HTML
		this.afficheAnalytique(false)
		this.afficheAsymptotique(false)
 	}
 	
 	
 	
 	
	// MEMBRES ***********************
	
		_Kd = 1	// Gain statique
	
	// GETTER - SETTER *******************
	
 		// Gain statique
 		Kd(k,redessine=true)
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
	// MEMBRES *******************
	
	
		// (virtuelle)
		// Fonction qui calcule le gain en dB asymptotique
		// w = réel positif
		GdB_asymptotique(w)
		{
			return 20*Math.log10(this.Kd()*w) *this.coefInv()
		}
		
		// (virtuelle)
		// Fonction qui calcule le gain en dB
		// w = réel positif
		GdB(w)
		{
			return 20*Math.log10(this.Kd()*w) *this.coefInv()
		}
	
	
		// (virtuelle)
		// Fonction qui calcule la phase asymptotique
		// w = réel positif
		phi_asymptotique(w)
		{
			return 90 *this.coefInv()
		}
		
		// (virtuelle)
		// Fonction qui calcule la phase
		// w = réel positif
		phi(w)
		{
			return 90 *this.coefInv()
		}
	
		
		
		// **************************************************************************************
		// Liste des paramètres au format JSON
		getParametresJSON()
		{
			return {Kd:this.Kd()};
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
'						</div>';
					return res;
		}
		
	
	
		
	
}

