

// Classe abstraite représentant une fonction à afficher dans Bode
class Fleche extends createjs.Container
{

	// CONSTRUCTEUR ***********************
	// Nom de la fonction (pour débugger, surtout)
	// Couleur (en notation hexa !!!)
	constructor(_x1=0, _y1=0, _x2=0, _y2=0)
	{
		super()
		this._x1 = _x1
		this._y1 = _y1
		this._x2 = _x2
		this._y2 = _y2
		
		this.redessine();
 	}
 	
 	
 	
 	// **********************************
 	// MEMBRES
 	// **********************************
 	
 	_x1 = 0
 	_y1 = 0
 	_x2 = 0
 	_y2 = 0
 	
 	_label=""
 	
 	_couleur = "#000000" ;
 	_epaisseur = 2;
 	_longueurPointe = 20 ;
 	_largeurPointe = 15 ;
 	_retourCulPointe = 5 ;
 	
 	tige = null ; // Ref. vers l'objet graphique tige
 	tige = null ; // Ref. vers l'objet graphique tige
 	
 	// **********************************
 	// GETTER/SETTER
 	// **********************************
 	
 	// x1
	x1(x,redessine=true)
	{
		if(typeof(x)!='undefined')
		{
			this._x1=x;
			if(redessine)
				this.redessine();
		}
		return this._x1;
	}
 	// y1
	y1(y,redessine=true)
	{
		if(typeof(y)!='undefined')
		{
			this._y1=y;
			if(redessine)
				this.redessine();
		}
		return this._y1;
	}
 	// x2
	x2(x,redessine=true)
	{
		if(typeof(x)!='undefined')
		{
			this._x2=x;
			if(redessine)
				this.redessine();
		}
		return this._x2;
	}
 	// y2
	y2(y,redessine=true)
	{
		if(typeof(y)!='undefined')
		{
			this._y2=y;
			if(redessine)
				this.redessine();
		}
		return this._y2;
	}
 	// couleur
	couleur(c,redessine=true)
	{
		if(typeof(c)!='undefined')
		{
			this._couleur=c;
			if(redessine)
				this.redessine();
		}
		return this._couleur;
	}
 	// epaisseur
	epaisseur(e,redessine=true)
	{
		if(typeof(e)!='undefined')
		{
			this._epaisseur=e;
			if(redessine)
				this.redessine();
		}
		return this._epaisseur;
	}
 	// longueurPointe
	longueurPointe(l,redessine=true)
	{
		if(typeof(l)!='undefined')
		{
			this._longueurPointe=l;
			if(redessine)
				this.redessine();
		}
		return this._longueurPointe;
	}
 	// largeurPointe
	largeurPointe(l,redessine=true)
	{
		if(typeof(l)!='undefined')
		{
			this._largeurPointe=l;
			if(redessine)
				this.redessine();
		}
		return this._largeurPointe;
	}
 	// largeurPointe
	retourCulPointe(r,redessine=true)
	{
		if(typeof(r)!='undefined')
		{
			this._retourCulPointe=r;
			if(redessine)
				this.redessine();
		}
		return this._retourCulPointe;
	}
 	// Label
	label(t,redessine=true)
	{
		if(typeof(t)!='undefined')
		{
			this._label=t;
			if(redessine)
				this.redessine();
		}
		return this._label;
	}
 	
 	
 	// **********************************
 	// METHODES
 	// **********************************
 	
 	norme()
 	{
 		return Math.sqrt(Math.pow(this._x1-this._x2,2)+Math.pow(this._y1-this._y2,2))
 	}
 	
 	
 	redessine()
 	{
 		this.removeAllChildren();
 		
 		this.tige = new createjs.Shape();
 		this.addChild(this.tige);
		this.tige.graphics.setStrokeStyle(this._epaisseur).beginStroke(this._couleur).moveTo(this._x1,this._y1).lineTo(this._x2,this._y2);
		
		var norm = this.norme()
		if(norm)
		{
			var dx = (this._x2-this._x1)/this.norme() ;
			var dy = (this._y2-this._y1)/this.norme() ;
		}
		else
		{
			var dx = 1
			var dy = 0
		}
		var xx = this._x2 ;
		var yy = this._y2 ;
		this.tete =  new createjs.Shape();
 		this.addChild(this.tete);
		this.tete.graphics.beginFill(this._couleur).moveTo(xx,yy);
		xx += -this._longueurPointe*dx-this._largeurPointe/2*dy
		yy += -this._longueurPointe*dy+this._largeurPointe/2*dx
		this.tete.graphics.lineTo(xx,yy);
		xx = this._x2-(this._longueurPointe-this._retourCulPointe)*dx ;
		yy = this._y2-(this._longueurPointe-this._retourCulPointe)*dy ;
		this.tete.graphics.lineTo(xx,yy);
		xx = this._x2-this._longueurPointe*dx+this._largeurPointe/2*dy
		yy = this._y2-this._longueurPointe*dy-this._largeurPointe/2*dx
		this.tete.graphics.lineTo(xx,yy);
		this.tete.graphics.lineTo(this._x2,this._y2);
		
		
 		this.labelGraphique = new createjs.Text(this._label, "20px Arial", this.couleur());
 		this.labelGraphique.x = this._x1+norm/2*dx
 		this.labelGraphique.y = this._y1+norm/2*dy
 		this.addChild(this.labelGraphique);
 		
 		
 	}
 	
}

