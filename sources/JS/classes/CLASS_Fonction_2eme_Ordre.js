

// Classe abstraite représentant une fonction à afficher dans Bode
class Fonction_2eme_Ordre extends Fonction
{

	// CONSTRUCTEUR ***********************
	constructor(_K=1, _xi=1, _w0=1)
	{
		// Héritage
		super("2<sup>ème</sup> Ordre","#FF0000")
		
		this.type("2ème ordre");
		this.K(_K)
		this.xi(_xi)
		this.w0(_w0)
		this._icone = "./sources/images/icone2emeOrdre.png";	// URL Icone à afficher dans le menu HTML
		this.afficheAnalytique(false)
		this.afficheAsymptotique(false)
 	}
 	
 	
 	
 	
	// MEMBRES ***********************
	
		_K = 1	// Gain statique
		_xi = 1	// Coefficient d'amortissement
		_w0 = 1	// Pulsation propre (en rad/s)
	
	// GETTER - SETTER *******************
	
	
  		// Gain statique
 		K(k,redessine=true)
 		{
			if(typeof(k)!='undefined')
			{
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
 		
 		// Coefficient d'amortissement
 		xi(x,redessine=true)
 		{
			if(typeof(x)!='undefined')
			{
				if(x<0)
					x=0
				this._xi=x;
				if(redessine)
				{
					this.redessine_tout();
					FONCTION_GLOBALE.redessine_tout();
					updateTousLesGraphes();
					// Update de l'arbre des fonctions
					$("#"+String(this.n())+"-input-param-xi-number").val(x);
					$("#"+String(this.n())+"-input-param-xi-range").val(x);
				}
			}
			return this._xi;
 		}
 		
 		// Pulsation propre
 		w0(w,redessine=true)
 		{
			if(typeof(w)!='undefined')
			{
				if(w<0)
					w=0
				this._w0=w;
				if(redessine)
				{
					this.redessine_tout();
					FONCTION_GLOBALE.redessine_tout();
					updateTousLesGraphes();	
					// Update de l'arbre des fonctions
					$("#"+String(this.n())+"-input-param-w0-number").val(w);
					$("#"+String(this.n())+"-input-param-w0-number").attr("step",(w/2).toPrecision(4));
					$("#"+String(this.n())+"-input-param-w0-range").val(Math.log10(w));
				}
			}
			return this._w0;
 		}
	
	// MEMBRES *******************
	
	
		// (virtuelle)
		// Fonction qui calcule le gain en dB asymptotique
		// w = réel positif
		GdB_asymptotique(w)
		{
			if(this.xi()<1)
			{
				if(w < this.w0())
					return 20*Math.log10(this.K()) *this.coefInv()
				else
					return 20*(Math.log10(this.K()/(w*w/this.w0()/this.w0()))) *this.coefInv()
			}
			else
			{
				var w1 = this.w0()*(this.xi()-Math.sqrt(this.xi()*this.xi()-1))
				var w2 = this.w0()*(this.xi()+Math.sqrt(this.xi()*this.xi()-1))

				if(w<w1)
					return 20*Math.log10(this.K()) *this.coefInv()
				else if(w < w2)
					return 20*Math.log10(this.K()/(w/w1)) *this.coefInv()
				else
					return 20*Math.log10(this.K()/(w*w/w1/w2)) *this.coefInv()
			
			}
		}
		
		// (virtuelle)
		// Fonction qui calcule le gain en dB
		// w = réel positif
		GdB(w)
		{
			return 20*Math.log10(this.K()/Math.sqrt(   Math.pow(2*this.xi()/this.w0()*w,2) + Math.pow(1 - 1/(this.w0()*this.w0())*w*w ,2) )) *this.coefInv()
		}
	
	
		// (virtuelle)
		// Fonction qui calcule la phase asymptotique
		// w = réel positif
		phi_asymptotique(w)
		{
			if(this.xi() >= 1)
			{
				var w1 = this.w0()*(this.xi()-Math.sqrt(this.xi()*this.xi()-1))
				var w2 = this.w0()*(this.xi()+Math.sqrt(this.xi()*this.xi()-1))
				if(w<w1)
					return 0
				else if(w<w2)
					return -90 *this.coefInv()
				else
					return -180 *this.coefInv()
			}
			else
			{
				if(w<this.w0())
					return 0
				else
					return -180 *this.coefInv()
			}
		}
		
		// (virtuelle)
		// Fonction qui calcule la phase
		// w = réel positif
		phi(w)
		{
			var res = -Math.atan((2*this.xi()*w/this.w0())/(1-w*w/this.w0()/this.w0()))*180/Math.PI
			if(res > 0)
				res -= 180
			return res *this.coefInv()
		}
	
	
	
		
		
		// **************************************************************************************
		// Liste des paramètres au format JSON
		getParametresJSON()
		{
			return {K:this.K(),xi:this.xi(),w0:this.w0()};
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
	'						<label for="'+String(this.n())+'-input-param-xi-number">&#958; = </label>'+
	'						<input type="number" name="'+String(this.n())+'-input-param-xi-number" id="'+String(this.n())+'-input-param-xi-number" min="0" step="0.1" style="width:50px;" value="'+this.xi()+'" onchange="getFonctionByNum('+String(this.n())+').xi(this.value)"/>'+
	'						<input type="range" name="'+String(this.n())+'-input-param-xi-range" id="'+String(this.n())+'-input-param-xi-range"  style="width:120px;" min="0" max="3" step="0.05" value="'+this.xi()+'" oninput="getFonctionByNum('+String(this.n())+').xi(this.value)"/>'+
'						</div>'+
'						<div class="item">'+
	'						<label for="'+String(this.n())+'-input-param-w0-number">&#969; = </label>'+
	'						<input type="number" name="'+String(this.n())+'-input-param-w0-number" id="'+String(this.n())+'-input-param-w0-number" min="0" step="0.5" style="width:50px;" value="'+this.w0()+'" onchange="getFonctionByNum('+String(this.n())+').w0(this.value)"/>'+
	'						<input type="range" name="'+String(this.n())+'-input-param-w0-range" id="'+String(this.n())+'-input-param-w0-range"  style="width:120px;" min="-5" max="5" step="0.1" value="'+Math.log10(this.w0())+'" oninput="getFonctionByNum('+String(this.n())+').w0(Math.pow(10,this.value))"/>'+
'						</div>';
					return res;
		}
	
}

