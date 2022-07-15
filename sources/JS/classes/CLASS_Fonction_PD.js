

// Classe abstraite représentant une fonction à afficher dans Bode
class Fonction_PD extends Fonction
{

	// CONSTRUCTEUR ***********************
	constructor(_Kd=1, _Td=1, inverse=false)
	{
		// Héritage
		super("Correcteur PD","#AA5500", inverse)
		
		this.type("PD")
		this.Td(_Td)
		this.Kd(_Kd)
		this._icone = "./sources/images/iconePD.png";	// URL Icone à afficher dans le menu HTML
		
 	}
 	
 	
 	
 	
	// MEMBRES ***********************
	
		_Td = 1	// Constante de temps (en s)
		_Kd = 1	// Gain statique
	
	// GETTER - SETTER *******************
	
 		// Gain statique
 		Kd(k, redessine=true)
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
					$("#"+String(this.n())+"-input-param-Kd-number").val(k);
					$("#"+String(this.n())+"-input-param-Kd-number").attr("step",(k/2).toPrecision(4));
					$("#"+String(this.n())+"-input-param-Kd-range").val(Math.log10(k));
				}
			}
			return this._Ki;
 		}
 		// Constante de temps
 		Td(t, redessine=true)
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
					$("#"+String(this.n())+"-input-param-Td-number").val(t);
					$("#"+String(this.n())+"-input-param-Td-number").attr("step",(t/2).toPrecision(4));
					$("#"+String(this.n())+"-input-param-Td-range").val(Math.log10(t));
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
			if(w < 1/this.Td())
				return 20*Math.log10(this.Kd()) *this.coefInv()
			else
				return 20*(Math.log10(this.Kd()*(this.Td()*w))) *this.coefInv()
		}
		
		// (virtuelle)
		// Fonction qui calcule le gain en dB
		// w = réel positif
		GdB(w)
		{
			return 20*Math.log10(this.Kd()*Math.sqrt(1+this.Td()*this.Td()*w*w)) *this.coefInv()
		}
	
	
		// (virtuelle)
		// Fonction qui calcule la phase asymptotique
		// w = réel positif
		phi_asymptotique(w)
		{
			if(w < 1/this.Td())
				return 0
			else
				return 90 *this.coefInv()
		}
		
		// (virtuelle)
		// Fonction qui calcule la phase
		// w = réel positif
		phi(w)
		{
			return Math.atan(this.Td()*w)*180/Math.PI *this.coefInv()
		}
	
		
		
		// **************************************************************************************
		// Liste des paramètres au format JSON
		getParametresJSON()
		{
			return {Kd:this.Kd(), Td:this.Td()};
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
	'						<label for="'+String(this.n())+'-input-param-Ti-number">&#964;<sub>d</sub> = </label>'+
	'						<input type="number" name="'+String(this.n())+'-input-param-Td-number" id="'+String(this.n())+'-input-param-Td-number" min="0" step="0.5" style="width:50px;" value="'+this.Td()+'" onchange="getFonctionByNum('+String(this.n())+').Td(this.value)"/>'+
	'						<input type="range" name="'+String(this.n())+'-input-param-Td-range" id="'+String(this.n())+'-input-param-Td-range"  style="width:120px;" min="-5" max="5" step="0.1" value="'+Math.log10(this.Td())+'" oninput="getFonctionByNum('+String(this.n())+').Td(Math.pow(10,this.value))"/>'+
'						</div>';
					return res;
		}
		
	
}

