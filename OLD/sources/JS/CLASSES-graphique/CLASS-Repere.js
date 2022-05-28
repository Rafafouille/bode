

//Fonction qui servira de constructeur pour la classe Noeud
var Repere = function(_grapheParent) {


	////////////////////////////////
	// Paramètres
	////////////////////////////////
	a=_grapheParent;
	this.grapheParent=_grapheParent;
	this._legende={x:"x",y:"y"};


	//On applique le constructeur de Kintetic.Group (héritage...)
	Kinetic.Group.call(this,{});




	/////////////////////////////////
	// Getter/Setter
	/////////////////////////////////

		this.legende=function(_l)
			{
				if(typeof(_l) != 'undefined')
					{	this._legende=_l;//Affectation de la couleur
						//this.annotations.legendeX.text(this._legende.x);
						//this.annotations.legendeY.text(this._legende.y);
					}
				return this._legende;
			}

	/////////////////////////////////
	// Methode
	/////////////////////////////////

		//Supprime le quadrillage
		this.supprimeAxesSecondaires=function()
			{
				this.axesSecondaires.destroyChildren();
			}


		//Crée des axes secondaires
		this.createAxesSecondaires=function()
			{
				//Axes secondaires verticaux
				for(i=this.grapheParent.bornesX().mini;i<this.grapheParent.bornesX().maxi;i+=this.grapheParent.pasAxesSecondaires().x)
				{
					var ligne = new Kinetic.Line({
									points:[this.grapheParent.coordonnees(i,this.grapheParent.bornesY().mini).x,
										this.grapheParent.coordonnees(i,this.grapheParent.bornesY().mini).y,
										this.grapheParent.coordonnees(i,this.grapheParent.bornesY().maxi).x,
										this.grapheParent.coordonnees(i,this.grapheParent.bornesY().maxi).y
										],
									stroke: this.grapheParent._lineColor,
					 				strokeWidth: 2
								});
					this.axesSecondaires.add(ligne);
				}

				//Axes secondaires Horizontal
				this.lignesQuadrillageHorz=[];
				for(i=this.grapheParent.bornesY().mini;i<this.grapheParent.bornesY().maxi;i+=this.grapheParent.pasAxesSecondaires().y)
				{
					var ligne = new Kinetic.Line({
									points:[this.grapheParent.coordonnees(this.grapheParent.bornesX().mini,i).x,
										this.grapheParent.coordonnees(this.grapheParent.bornesX().mini,i).y,
										this.grapheParent.coordonnees(this.grapheParent.bornesX().maxi,i).x,
										this.grapheParent.coordonnees(this.grapheParent.bornesX().maxi,i).y
										],
									stroke: this.grapheParent._lineColor,
					 				strokeWidth: 2
								});

					this.axesSecondaires.add(ligne);
				}
			}


		this.supprimeAxesLog=function()
			{
				this.axesLog.destroyChildren();
			}

		this.createAxesLog=function()
			{
				//Sur X
				if(this.grapheParent.logarithmique().x)
					{
						for(i=this.grapheParent.bornesX().mini;i<this.grapheParent.bornesX().maxi;i++)
						{
							var offset=this.grapheParent.coordonnees(i,0).x
							for(a=2;a<=9;a++)
								{
									var n=log10(a);
									var xx=this.grapheParent.coordonnees(i+n,0).x;
									var ligne=new Kinetic.Line({
													points:[	xx,
															this.grapheParent.coordonnees(0,this.grapheParent.bornesY().mini).y,
															xx,
															this.grapheParent.coordonnees(0,this.grapheParent.bornesY().maxi).y],
													stroke: this.grapheParent._lineColor,
									 				strokeWidth: 1
												});
									this.axesLog.add(ligne);
							
								}
						}
					}
				
				//Sur Y
				if(this.grapheParent.logarithmique().y)
					{
						//(pas implémenté)
					}
			}


		//supprime les annotations
		this.supprimeAnnotations=function()
			{
				this.annotations.destroyChildren();
			}

		//Crée à jour les annotations
		this.createAnnotations=function()
			{


				//Legendes
				//X
				this.annotations.legendeX=new Kinetic.Text({
										x:0,
										y:-20,
										text:this.legende().x,
										fontSize:15,
										fontFamily: 'Times New Roman',
										fill: this.grapheParent._lineColor
									});
				this.annotations.legendeX.x(this.grapheParent.coordonnees(this.grapheParent.bornesX().maxi,0).x-this.annotations.legendeX.width()-3);//On recale en fonction de la largeur
				var rectLegX=new Kinetic.Rect({
										x:this.annotations.legendeX.x()-1,
										y:this.annotations.legendeX.y()-1,
										width:this.annotations.legendeX.width()+2,
										height:this.annotations.legendeX.height()+2,
										fill:this.grapheParent.backgroundColor()
								});
				this.annotations.add(rectLegX);
				this.annotations.add(this.annotations.legendeX);
				//Y
				this.annotations.legendeY=new Kinetic.Text({
										x:0,
										y:this.grapheParent.coordonnees(0,this.grapheParent.bornesY().maxi).y+3,
										text:this.legende().y,
										fontSize:15,
										fontFamily: 'Times New Roman',
										fill: this.grapheParent._lineColor
									});
				this.annotations.legendeY.x(this.grapheParent.coordonnees(0,0).x-this.annotations.legendeY.width()-3);//On recale en fonction de la largeur
				var rectLegY=new Kinetic.Rect({
										x:this.annotations.legendeY.x()-1,
										y:this.annotations.legendeY.y()-1,
										width:this.annotations.legendeY.width()+2,
										height:this.annotations.legendeY.height()+2,
										fill:this.grapheParent.backgroundColor()
								});
				this.annotations.add(rectLegY);
				this.annotations.add(this.annotations.legendeY);

				//Sur X
				for(i=this.grapheParent.bornesX().mini;i<=this.grapheParent.bornesX().maxi;i+=this.grapheParent.pasAxesSecondaires().x)
					{
						var texte=new Kinetic.Text({
										x:this.grapheParent.coordonnees(i,0).x+1,
										y:2,
										text:String(i),
										fontSize:15,
										fontFamily:'Times New Roman',
										fill:this.grapheParent.lineColor()
										});
						var fondTexte=new Kinetic.Rect({
										x:this.grapheParent.coordonnees(i,0).x,
										y:1,
										width:texte.width()+2,
										height:texte.height()+2,
										fill:this.grapheParent.backgroundColor()
									});
						this.annotations.add(fondTexte);
						this.annotations.add(texte);
						if(this.grapheParent.logarithmique().x)
							{
								texte.text('10');
								var expo=new Kinetic.Text({
												x:this.grapheParent.coordonnees(i,0).x+19,
												y:1,
												text:String(i),
												fontSize:9,
												fontFamily:'Times New Roman',
												fill:this.grapheParent._lineColor
												});
								var fondTexte2=new Kinetic.Rect({
										x:this.grapheParent.coordonnees(i,0).x+18,
										y:1,
										width:expo.width()+2,
										height:expo.height()+2,
										fill:this.grapheParent.backgroundColor()
									});
								this.annotations.add(fondTexte2);
								this.annotations.add(expo);
							}
					}
				//Sur Y
				for(i=this.grapheParent.bornesY().mini;i<=this.grapheParent.bornesY().maxi;i+=this.grapheParent.pasAxesSecondaires().y)
					{
						var texte=new Kinetic.Text({
										x:2,
										y:this.grapheParent.coordonnees(0,i).y,
										text:String(i),
										fontSize:15,
										fontFamily:'Times New Roman',
										fill:this.grapheParent._lineColor
										});
						texte.y(texte.y()-texte.height()/2);
						if(this.grapheParent.logarithmique().y)
							texte.text('10^'+String(i));
						var fondTexte=new Kinetic.Rect({
										x:texte.x()-1,
										y:texte.y()-1,
										width:texte.width()+2,
										height:texte.height()+2,
										fill:this.grapheParent.backgroundColor()
									});
						
						this.annotations.add(fondTexte);
						this.annotations.add(texte);
					}
			}


		//Met à jour les axes
		this.updateAxes=function()
			{

				//Axes principaux
					this.axesPrincipaux.axeX.points([	this.grapheParent.coordonnees(this.grapheParent.bornesX().mini,0).x,
										0,
										this.grapheParent.coordonnees(this.grapheParent.bornesX().maxi,0).x,
										0]);
					this.axesPrincipaux.axeY.points([	0,
										this.grapheParent.coordonnees(0,this.grapheParent.bornesY().mini).y,
										0,
										this.grapheParent.coordonnees(0,this.grapheParent.bornesY().maxi).y]);

				//Axes secondaires
				this.supprimeAxesSecondaires();
				this.createAxesSecondaires();

				//Axes log
				this.supprimeAxesLog();
				this.createAxesLog();

				//Annotations
				this.supprimeAnnotations();
				this.createAnnotations();

				
			}


		this.exportSVG=function()
			{
				res=	"		//Repere et quadrillage\n"+
					"		<g>\n";

				

					
				//Axes secondaires
				res+=	"			//Axes secondaires\n"+
					"			<g>\n";
					for(i=0;i<this.axesSecondaires.getChildren().length;i++)
						{
							var ligne=this.axesSecondaires.getChildren()[i];
							res+='				'+ligne.exportSVG()+'\n';
							
						}
				res+=	"			</g>\n";

				//Axes Log
				res+=	"			//Axes logarithmiques\n"+
					"			<g>\n";
					for(i=0;i<this.axesLog.getChildren().length;i++)
						{
							var ligne=this.axesLog.getChildren()[i];
							res+='				'+ligne.exportSVG()+'\n';
							
						}
				res+=	"			</g>\n";

				//Axes principaux
				res+=	"			//Axes principaux + valeurs\n"+
					"			<g>\n"+
					'				'+this.axesPrincipaux.axeX.exportSVG()+'\n'+		//<line style="stroke:'+this.grapheParent.lineColor()+';stroke-width:3px;" x1="'+(this.axesPrincipaux.axeX.points()[0]+this.getLayer().x())+'" y1="'+(this.axesPrincipaux.axeX.points()[1]+this.getLayer().y())+'" x2="'+(this.axesPrincipaux.axeX.points()[2]+this.getLayer().x())+'" y2="'+(this.axesPrincipaux.axeX.points()[3]+this.getLayer().y())+'"/>\n'+
					'				'+this.axesPrincipaux.axeY.exportSVG()+'\n'; //<line style="stroke:'+this.grapheParent.lineColor()+';stroke-width:3px;" x1="'+(this.axesPrincipaux.axeY.points()[0]+this.getLayer().x())+'" y1="'+(this.axesPrincipaux.axeY.points()[1]+this.getLayer().y())+'" x2="'+(this.axesPrincipaux.axeY.points()[2]+this.getLayer().x())+'" y2="'+(this.axesPrincipaux.axeY.points()[3]+this.getLayer().y())+'"/>\n';
					for(i=0;i<this.annotations.getChildren().length;i++)
						{
							var el=this.annotations.getChildren()[i];
							res+='				'+el.exportSVG()+'\n';
						}
				res+=	"			</g>\n";

				res+="		</g>\n";
				return res;
			}

	////////////////////////////////
	// GRAPHISMES
	////////////////////////////////

		//Axes Log ------------------------
			this.axesLog=new Kinetic.Group();
			this.add(this.axesLog);
			//this.createAxesLog();

		//Anotations ----------------------
			this.annotations=new Kinetic.Group();
			this.add(this.annotations);
			//this.createAnnotations();

		//Axes principaux -----------
			this.axesPrincipaux=new Kinetic.Group({});
			this.add(this.axesPrincipaux);

			this.axesPrincipaux.axeX=new Kinetic.Line({
							points: [	this.grapheParent.coordonnees(this.grapheParent.bornesX().mini,0).x,
									0,
									this.grapheParent.coordonnees(this.grapheParent.bornesX().maxi,0).x,
									0],
							stroke: this.grapheParent._lineColor,
						 	strokeWidth: 3
						});
			this.axesPrincipaux.axeY=new Kinetic.Line({
							points: [	0,
									this.grapheParent.coordonnees(0,this.grapheParent.bornesY().mini).y,
									0,
									this.grapheParent.coordonnees(0,this.grapheParent.bornesY().maxi).y],
							stroke: this.grapheParent._lineColor,
						 	strokeWidth: 3
						});
			this.axesPrincipaux.add(this.axesPrincipaux.axeX);
			this.axesPrincipaux.add(this.axesPrincipaux.axeY);


		//Axes secondaires ----------------
			this.axesSecondaires=new Kinetic.Group({});
			this.add(this.axesSecondaires);
			//this.createAxesSecondaires();







}
 
Repere.prototype = Object.create(Kinetic.Group.prototype);//On recopie le prototype de Kinteic.Group
Repere.prototype.constructor = Repere;//On recopie le constructeur de Noeud dans son prototype



