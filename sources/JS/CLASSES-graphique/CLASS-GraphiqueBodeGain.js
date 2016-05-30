

//Fonction qui servira de constructeur pour la classe Noeud
var GraphiqueBodeGain = function(conteneur) {

	//On applique le constructeur de Kintetic.Group (héritage...)
	Graphique.call(this,{
				
				});

	//*********************************
	// Paramètres du graphique
	//*********************************
		this._bornesX={mini:-4,maxi:4};
		this._bornesY={mini:-50,maxi:50};
		this._unite={x:50,y:-50};
		this._echelle={x:1,y:1};
		this.coordonnees=function(_x,_y)
			{	return {x:_x*this._unite.x*this._echelle.x,y:_y*this._unite.y*this._echelle.y};
			}



	//*********************************
	//Export
	//*********************************
		this.exportLaTex=function()
			{
				var rendu="";
			
				rendu+="	% Gain en Db -----------------\n";
				rendu+="	\\begin{scope}\n";
				rendu+="		\\semilog{"+this.bornesX[0]+"}{"+this.bornesX[1]+"}{"+this.bornesY[0]+"}{"+this.bornesY[1]+"}\n";
				rendu+="		\\UnitedB\n"
				for(i in listeFonctions)
					{
						eq=listeFonctions[i];
						if(eq.afficheAnalytique())
							rendu+=eq.exporteAnalytiqueLaTex();
						if(eq.afficheAsymptotique())
							rendu+=eq.exporteAsymptotiqueLaTex();
					}
				rendu+="	\\end{scope}\n";
				rendu+="	% ----------------------------\n"
				return rendu;
			}

	//*********************************
	//Getters/Setters
	//*********************************

		this.bornesX=function(_b)
			{
				if(typeof(_b) != 'undefined')
					{	this._bornesX=_b;//Affectation de la couleur
						this.repere.updateAxes();
					}
				return this._bornesX;
			}

		this.bornesY=function(_b)
			{
				if(typeof(_b) != 'undefined')
					{	this._bornesY=_b;//Affectation de la couleur
						this.repere.updateAxes();
					}
				return this._bornesY;
			}

		this.echelle=function(_e)
			{
				if(typeof(_e) != 'undefined')
					{	this._echelle=_e;//Affectation de la couleur
						this.repere.updateAxes();
					}
				return this._echelle;
			}

		this.echelleX=function(_eX)
			{
				if(typeof(_eX) != 'undefined')
					{	this._echelle.x=_eX;//Affectation de la couleur
						this.repere.updateAxes();
					}
				return this._echelle.x;
			}

		this.echelleY=function(_eY)
			{
				if(typeof(_eY) != 'undefined')
					{	this._echelle.y=_eY;//Affectation de la couleur
						this.repere.updateAxes();
					}
				return this._echelle.y;
			}

	//****************************************************
	// Contenu du graphique (à mettre en dernier)
	//****************************************************
		this.calqueRepere=new Kinetic.Layer();//Calque avec le repere et diverse anotations
		this.calqueCourbes=new Kinetic.Layer();//Calque avec les courbes
		this.add(this.calqueRepere);
		this.add(this.calqueCourbes);

		//Objets deja presents dans le graphe
		this.repere=new Repere(this);
		this.calqueRepere.add(this.repere);

		this.draw();

}
 
Graphique.prototype = Object.create(Kinetic.Stage.prototype);//On recopie le prototype de Kinteic.Group
Graphique.prototype.constructor = Graphique;//On recopie le constructeur de Noeud dans son prototype



