

// Classe abstraite représentant une fonction à afficher dans Bode
class Fonction_1er_Ordre extends Fonction
{

	// CONSTRUCTEUR ***********************
	constructor(_K=1, _tau=1, inverse=false)
	{
		// Héritage
		super("1er Ordre","#0000FF", inverse)
		
		this.type("1er ordre") ;
		this.tau(_tau) ;
		this.K(_K) ;
		this._icone = "./sources/images/icone1erOrdre.png";	// URL Icone à afficher dans le menu HTML
		this.afficheAnalytique(false)
		this.afficheAsymptotique(false)
 	}
 	
 	
 	
 	
	// MEMBRES ***********************
	
		_tau = 1	// Constante de temps (en s)
		_K = 1	// Gain statique
	
	// GETTER - SETTER *******************
	
 		// Gain statique
 		K(k,redessine=true)
 		{
			if(typeof(k)!='undefined')
			{
 				k = parseFloat(k);
				if(k<0)
					k=0
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
 		// Constante de temps
 		tau(t,redessine=true)
 		{
			if(typeof(t)!='undefined')
			{
 				t = parseFloat(t);
				if(t<0)
					t=0
				this._tau=t;
				if(redessine)
				{
					this.redessine_tout();
					FONCTION_GLOBALE.redessine_tout();
					updateTousLesGraphes();
					// Update de l'arbre des fonctions
					$("#"+String(this.n())+"-input-param-tau-number").val(t);
					$("#"+String(this.n())+"-input-param-tau-number").attr("step",(t/2).toPrecision(4));
					$("#"+String(this.n())+"-input-param-tau-range").val(Math.log10(t));
				}
			}
			return this._tau;
 		}
 		
 		
 		
	// MEMBRES *******************
	
	
		// (virtuelle)
		// Fonction qui calcule le gain en dB asymptotique
		// w = réel positif
		GdB_asymptotique(w)
		{
			var coefMult = 1-2*this.inverse()
			if(w < 1/this.tau())
				return coefMult*20*Math.log10(this.K())
			else
				return coefMult*20*(Math.log10(this.K()/(this.tau()*w)))
		}
		
		// (virtuelle)
		// Fonction qui calcule le gain en dB
		// w = réel positif
		GdB(w)
		{
			return 20*Math.log10(this.K()/Math.sqrt(1+this.tau()*this.tau()*w*w)) *this.coefInv()
		}
	
	
		// (virtuelle)
		// Fonction qui calcule la phase asymptotique
		// w = réel positif
		phi_asymptotique(w)
		{
			if(w < 1/this.tau())
				return 0
			else
				return -90 *this.coefInv()
		}
		
		// (virtuelle)
		// Fonction qui calcule la phase
		// w = réel positif
		phi(w)
		{
			return -Math.atan(this.tau()*w)*180/Math.PI *this.coefInv()
		}
	
	
	
	
		
		
		// **************************************************************************************
		// Liste des paramètres au format JSON
		getParametresJSON()
		{
			return {K:this.K(),tau:this.tau()};
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
'						</div>'+
'						<div class="item">'+
	'						<label for="'+String(this.n())+'-input-param-tau-number">&#964; = </label>'+
	'						<input type="number" name="'+String(this.n())+'-input-param-tau-number" id="'+String(this.n())+'-input-param-tau-number" min="0" step="0.5" style="width:50px;" value="'+this.tau()+'" onchange="getFonctionByNum('+String(this.n())+').tau(this.value)"/>'+
	'						<input type="range" name="'+String(this.n())+'-input-param-tau-range" id="'+String(this.n())+'-input-param-tau-range"  style="width:120px;" min="-5" max="5" step="0.1" value="'+Math.log10(this.tau())+'" oninput="getFonctionByNum('+String(this.n())+').tau(Math.pow(10,this.value))"/>'+
'						</div>';
					return res;
		}
	
}

