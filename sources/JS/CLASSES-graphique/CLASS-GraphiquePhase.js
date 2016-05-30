

//Fonction qui servira de constructeur pour la classe Noeud
var GraphiquePhase = function(conteneur) {

	//On applique le constructeur de Kintetic.Group (héritage...)
	Graphique.call(this,conteneur);


	this._idDivVisible="graphique-bode-phase";//Lien (id) vers la boite qui contient le graphique (qu'on doit eventuellement cacher)

	this.pasAxesSecondaires({x:1,y:30});
	this.logarithmique({x:true,y:false});
	this.repere.legende({x:"ω(rad/s)",y:"φ(°)"});

	this.exportLaTex=function()
		{
			if(!$("#bouton_affiche_Bode_Phase")[0].checked)	return "";	//Si grpahique invisible
			var rendu="";
	
			rendu+="\n	% Bode - Phase -----------------\n";
			rendu+="	\\begin{scope}[yshift=-3cm,xscale="+this.echelle().x+",yscale="+this.echelle().y+"]\n";
			rendu+="		\\semilog{"+this.bornesX().mini+"}{"+this.bornesX().maxi+"}{"+this.bornesY().mini+"}{"+this.bornesY().maxi+"}\n";
			rendu+="		\\UniteDegre\n"
			rendu+="		\\OrdBode{"+this.pasAxesSecondaires().y+"}\n"
			for(i in listeFonctions)
				{
					eq=listeFonctions[i];
					if(eq.afficheAnalytique())
						rendu+=eq.exporteBodePhaseAnalytiqueLaTex();
					if(eq.afficheAsymptotique())
						rendu+=eq.exporteBodePhaseAsymptotiqueLaTex();
				}
			rendu+="	\\end{scope}\n";
			rendu+="	% ----------------------------\n"
			return rendu;
		}

		//Pour convertir les éléments graphiques de KinticJS en SVG
		this.exportSVG=function()
			{	
				var rendu=	"	//Diagramme de Phase"+
						"	<g";
				if($("#bouton_affiche_Bode_Gdb")[0].checked)//S'il y a le graphe Gdb avant, on décalle tout
					rendu+=" transform=\"translate(0,"+(grapheBodeGdb.height()+20)+")\"";
				rendu+=">\n"+
						"		"+this.rectangleBackground.exportSVG()+"\n"+ //<rect x=\"0\" y=\"0\" width=\""+this.rectangleBackground.width()+"\" height=\""+this.rectangleBackground.height()+"\" style=\"fill:"+this.backgroundColor()+";stroke:"+this.lineColor()+";stroke-width:3;\"/>\n"+	//Rectangle
								this.repere.exportSVG()+	//Export du repere
						"		//Masque\n"+
						"		<defs>\n"+
						"			<mask id='maskPhase' x='0' y='0' width='"+this.width()+"' height='"+this.height()+"' >\n"+
						"				<rect x='0' y='0' style='fill:#FFFFFF;stroke:#FFFFFF;stroke-width:3;' width='"+this.width()+"' height='"+this.height()+"'/>\n"+
						"			</mask>\n"+
						"		</defs>\n"+
						"		//Fonctions gains en DB\n"+
						"		<g style='; mask: url(#maskPhase)'>\n";				//Liste fonctions....

				for(i in listeFonctions)	//Export de chaque courbe
					{
						fct=listeFonctions[i];
						rendu+=	"			"+fct.exportPhaseSVG()+"\n";
						rendu+=	"			"+fct.exportPhaseAsymptSVG()+"\n";
					}
				rendu+=	"		</g>\n"+
					"	</g>\n";
			
				return rendu;
			}


		//Export pour le XML
		this.exportXML=function()
			{
				var rendu=	"	<diagram type=\"Bode-Phase\">\n"+
						"		<affiche>"+$("#bouton_affiche_Bode_Phase")[0].checked+"</affiche>\n"+
						"		<bornesX>\n"+
						"			<min>"+this.bornesX().mini+"</min>\n"+
						"			<max>"+this.bornesX().maxi+"</max>\n"+
						"		</bornesX>\n"+
						"		<bornesY>\n"+
						"			<min>"+this.bornesY().mini+"</min>\n"+
						"			<max>"+this.bornesY().maxi+"</max>\n"+
						"		</bornesY>\n"+
						"		<unite>\n"+
						"			<x>"+this.unite().x+"</x>\n"+
						"			<y>"+this.unite().y+"</y>\n"+
						"		</unite>\n"+
						"		<echelle>\n"+
						"			<x>"+this.echelle().x+"</x>\n"+
						"			<y>"+this.echelle().y+"</y>\n"+
						"		</echelle>\n"+
						"		<backgroundColor>"+this.backgroundColor()+"</backgroundColor>\n"+
						"		<lineColor>"+this.lineColor()+"</lineColor>\n"+
						"		<pasAxesSecondaires>\n"+
						"			<x>"+this.pasAxesSecondaires().x+"</x>\n"+
						"			<y>"+this.pasAxesSecondaires().y+"</y>\n"+
						"		</pasAxesSecondaires>\n"+
						"	</diagram>\n";
				return rendu;
			}
}
 
GraphiquePhase.prototype = Object.create(Graphique.prototype);//On recopie le prototype de Kinteic.Group
GraphiquePhase.prototype.constructor = GraphiquePhase;//On recopie le constructeur de Noeud dans son prototype



