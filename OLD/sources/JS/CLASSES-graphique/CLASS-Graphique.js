

//Fonction qui servira de constructeur pour la classe Noeud
var Graphique = function(conteneur) {

	//On applique le constructeur de Kintetic.Group (héritage...)
	Kinetic.Stage.call(this,{
					container:conteneur,
					width: 400,
					height: 300
				});

	//*********************************
	// Paramètres du graphique
	//*********************************
		this._bornesX={mini:-4,maxi:4};
		this._bornesY={mini:-50,maxi:50};
		this._unite={x:70,y:-70};
		this._echelle={x:1,y:1};
		this.coordonnees=function(_x,_y)
			{	return {x:_x*this._unite.x*this._echelle.x,y:_y*this._unite.y*this._echelle.y};
			}
		this._backgroundColor="#FFFFFF";//"#f4f4cc";
		this._lineColor="#bf7f3f";
		this._pasAxesSecondaires={x:1,y:1};//Tous les combien on met la grille
		this._logarithmique={x:false,y:false};
		this._visible=true;	//Variable qui dit si le garphique est visible ou non
		this._idDivVisible=0;//Lien (id) vers la boite qui contient le graphique (qu'on doit eventuellement cacher)
		
		this._margeClicable=10;
		this._lastPressPosition={x:0,y:0};
		this._sourisPressed=false;
		this._actionSouris="rien";

	//*********************************
	//Export
	//*********************************
		this.exportLaTex=function()
			{
				return "";//rien par defaut
			}

	//*********************************
	//Getters/Setters
	//*********************************

		this.visible=function(_v)
			{
				if(typeof(_v) != 'undefined')
					{	this._visible=_v;//Affectation de la couleur
						if(this._idDivVisible)//Si le graphe est attaché à un Div
							{
								if(_v)
									$("#"+this._idDivVisible).css("display","block");
								else
									$("#"+this._idDivVisible).css("display","none");
							}
					}
				return this._visible;
			}

		this.bornesX=function(_b)
			{
				if(typeof(_b) != 'undefined')
					{	this._bornesX=_b;//Affectation de la couleur
						this.updateStage();
					}
				return this._bornesX;
			}

		this.bornesY=function(_b)
			{
				if(typeof(_b) != 'undefined')
					{	this._bornesY=_b;//Affectation de la couleur
						this.updateStage();
					}
				return this._bornesY;
			}


		this.unite=function(_u)
			{
				if(typeof(_u) != 'undefined')
					{	this._unite=_u;//Affectation de la couleur
						this.updateStage();
					}
				return this._unite;
			}

		this.echelle=function(_e)
			{
				if(typeof(_e) != 'undefined')
					{	this._echelle=_e;//Affectation de la couleur
						this.updateStage();
					}
				return this._echelle;
			}

		this.echelleX=function(_eX)
			{
				if(typeof(_eX) != 'undefined')
					{	this._echelle.x=_eX;//Affectation de la couleur
						this.updateStage();
					}
				return this._echelle.x;
			}

		this.echelleY=function(_eY)
			{
				if(typeof(_eY) != 'undefined')
					{	this._echelle.y=_eY;//Affectation de la couleur
						this.updateStage();
					}
				return this._echelle.y;
			}

		this.pasAxesSecondaires=function(_pxy)
			{
				if(typeof(_pxy) != 'undefined')
					{	this._pasAxesSecondaires=_pxy;//Affectation de la couleur
						this.repere.updateAxes();
					}
				return this._pasAxesSecondaires;
			}

		this.logarithmique=function(_lo)
			{
				if(typeof(_lo) != 'undefined')
					{	this._logarithmique=_lo;//Affectation de la couleur
						this.repere.updateAxes();
					}
				return this._logarithmique;
			}

		this.backgroundColor=function(_c)
			{
				if(typeof(_c) != 'undefined')
					{	this._backgroundColor=_c;//Affectation de la couleur
						this.updateStage();
					}
				return this._backgroundColor;
			}

		this.lineColor=function(_c)
			{
				if(typeof(_c) != 'undefined')
					{	this._lineColor=_c;//Affectation de la couleur
						this.updateStage();
					}
				return this._lineColor;
			}
			
		this.lastPressPosition=function(_c)
			{
				if(typeof(_c) != 'undefined')
					{	this._lastPressPosition=_c;//Affectation de la position de la souris au dernier clic
					}
				return this._lastPressPosition;
			}
			
		this.lastPressPositionX=function(_x)
			{
				if(typeof(_x) != 'undefined')
					{	this._lastPressPosition.x=_x;//Affectation de la position de la souris au dernier clic
					}
				return this._lastPressPosition.x;
			}
			
		this.lastPressPositionY=function(_y)
			{
				if(typeof(_y) != 'undefined')
					{	this._lastPressPosition.y=_y;//Affectation de la position de la souris au dernier clic
					}
				return this._lastPressPosition.y;
			}
			
		this.sourisPressed=function(_s)
			{
				if(typeof(_s) != 'undefined')
					{	this._sourisPressed=_s;//Affectation de la position de la souris au dernier clic
					}
				return this._sourisPressed;
			}
			
		this.actionSouris=function(_a)
			{
				if(typeof(_a) != 'undefined')
					{	this._actionSouris=_a;//Affectation de la position de la souris au dernier clic
					}
				return this._actionSouris;
			}
			
		this.margeClicable=function(_m)
			{
				if(typeof(_m) != 'undefined')
					{	this._margeClicable=_m;//Affectation de la position de la souris au dernier clic
					}
				return this._margeClicable;
			}

	//****************************************************
	// Fonctions membres...
	//****************************************************

		this.updateStage=function()
			{
				var PtMin=this.coordonnees(this.bornesX().mini,this.bornesY().maxi);
				var PtMax=this.coordonnees(this.bornesX().maxi,this.bornesY().mini);
				var largeur=Math.abs(PtMax.x-PtMin.x);
				var hauteur=Math.abs(PtMin.y-PtMax.y);
				this.size({width:largeur,height:hauteur});
//				this.width(largeur);
//				this.height(hauteur);
				this.rectangleBackground.width(largeur);
				this.rectangleBackground.height(hauteur);
//				this.rectangleFrontground.width(largeur);
//				this.rectangleFrontground.height(hauteur);


				//On recale le centre du repere (i.e des calques) par rapport au Stage
				this.calqueRepere.x(-this.coordonnees(this.bornesX().mini,0).x);
				this.calqueRepere.y(-this.coordonnees(0,this.bornesY().maxi).y);
				this.calqueCourbes.x(-this.coordonnees(this.bornesX().mini,0).x);
				this.calqueCourbes.y(-this.coordonnees(0,this.bornesY().maxi).y);

				//MAJ repere
				this.repere.updateAxes();
			}


		//Charge les paramètres à partir d'un XML ********************
		this.loadXML=function(xml)
			{
				//Affiche
				this.visible(Number(xml.find("affiche").text()));
				//Bornes
				this.bornesX({mini:Number(xml.find("bornesX").find("min").text()),
					maxi:Number(xml.find("bornesX").find("max").text())});
				this.bornesY({mini:Number(xml.find("bornesY").find("min").text()),
					maxi:Number(xml.find("bornesY").find("max").text())});

				//unite
				this.unite({x:Number(xml.find("unite").find("x").text()),
					y:Number(xml.find("unite").find("y").text())});

				//echelle
				this.echelle({x:Number(xml.find("echelle").find("x").text()),
					y:Number(xml.find("echelle").find("y").text())});

				//Graphismes
				this.backgroundColor(xml.find("backgroundColor").text());

				this.lineColor(xml.find("lineColor").text());

				this.pasAxesSecondaires({x:Number(xml.find("pasAxesSecondaires").find("x").text()),
							y:Number(xml.find("pasAxesSecondaires").find("y").text())});

				this.updateStage();
			}



	//****************************************************
	// Evenements
	//****************************************************

		//Fonction appelée des qu'on bouge la souris sur le graphique
		this.mouvementSouris=function(e)
			{
				//Gestion du style de curseur
				var souris=this.getPointerPosition();
				if(souris.x<this.margeClicable())
					document.body.style.cursor = 'ew-resize';
				else if(souris.x>this.width()-this.margeClicable())
					document.body.style.cursor = 'ew-resize';
				else if(souris.y<this.margeClicable())
					document.body.style.cursor = 'ns-resize';
				else if(souris.y>this.height()-this.margeClicable())
					document.body.style.cursor = 'ns-resize';
				else
		                	document.body.style.cursor = 'crosshair';
				//Action à réaliser en cas de clic
				if(this.sourisPressed())
				{
					if(this.actionSouris()=="resizeLeft")
					{
						var dx=this.getPointerPosition().x-this.lastPressPositionX();
						console.log(dx);
					}
				}
	            	}
	            	
	            	
	        this.clique=function(e)
	        	{
				this.lastPressPosition(this.getPointerPosition());
				this.sourisPressed(true);
				if(this.lastPressPositionX()<this.margeClicable())
					this.actionSouris("resizeLeft");
				else if(this.lastPressPositionX()>this.width()-this.margeClicable())
					this.actionSouris("resizeRight");
				else if(this.lastPressPositionY()<this.margeClicable())
					this.actionSouris("resizeTop");
				else if(this.lastPressPositionY()>this.height()-this.margeClicable())
					this.actionSouris("resizeBottom");
				else
					this.actionSouris("rien");
	        	}
	        	
	        this.relache=function(e)
	        	{
				this.sourisPressed(false);
				this.actionSouris("rien");
	        	}

		this.on('mousemove', this.mouvementSouris);
		this.on("mousedown",this.clique);
		this.on("mouseup",this.relache);
            	this.on('mouseout',function()
            		{
            			document.body.style.cursor = 'auto';
            		});


	//****************************************************
	// Contenu du graphique (à mettre en dernier)
	//****************************************************
		this.calqueBackground=new Kinetic.Layer();//Calque d'arriere plan
		this.calqueFrontground=new Kinetic.Layer();//Calque d'avant plan (pour les clics)
		this.calqueRepere=new Kinetic.Layer({x:this.width()/2,y:this.height()/2});//Calque avec le repere et diverse anotations
		this.calqueCourbes=new Kinetic.Layer({x:this.width()/2,y:this.height()/2});//Calque avec les courbes
		this.add(this.calqueBackground);
		this.add(this.calqueRepere);
		this.add(this.calqueCourbes);
		this.add(this.calqueFrontground);

		//Objets deja presents dans le graphe
		console.log(this.width())
		this.rectangleBackground=new Kinetic.Rect({
								x:0,
								y:0,
								width: this.width(),
								height: this.height(),
								fill: "yellow",//this._backgroundColor,
								stroke: this._lineColor,
								strokeWidth: 3
							});
		this.calqueBackground.add(this.rectangleBackground);

		console.log(this.width())

		//avant plan (un peu comme un écran tactil)
/*		this.rectangleFrontground=new Kinetic.Rect({
								x:0,
								y:0,
								width: this.width(),
								height:this.height(),
								fill: "red",//this._backgroundColor,
								stroke: this._lineColor,
								strokeWidth: 3
							});*/
//		this.calqueFrontground.add(this.rectangleFrontground);


		this.repere=new Repere(this);
		this.calqueRepere.add(this.repere);
}
 
Graphique.prototype = Object.create(Kinetic.Stage.prototype);//On recopie le prototype de Kinteic.Group
Graphique.prototype.constructor = Graphique;//On recopie le constructeur de Noeud dans son prototype



