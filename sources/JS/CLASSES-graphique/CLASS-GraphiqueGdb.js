

//Fonction qui servira de constructeur pour la classe Noeud
var GraphiqueGdb = function(conteneur) {

	//On applique le constructeur de Kintetic.Group (héritage...)
	Graphique.call(this,conteneur);

	this._idDivVisible="graphique-bode-gdb";//Lien (id) vers la boite qui contient le graphique (qu'on doit eventuellement cacher)

	this.pasAxesSecondaires({x:1,y:10});
	this.logarithmique({x:true,y:false});
	this.repere.legende({x:"ω(rad/s)",y:"Gdb"});
	

	this.exportLaTex=function()
		{	var rendu="";

			for(i in listeFonctions)
				{
					var eq=listeFonctions[i];
					if(couleursLaTexConnues[eq.couleur()]==undefined)//Si la couleur n'existe pas
						{
							rendu+="	\\definecolor{couleurBode"+eq.couleur().slice(1,7)+"}{HTML}{"+eq.couleur().slice(1,7)+"}	%Nouvelle couleur HTML "+eq.couleur()+"\n";
						}
				}

			if(!$("#bouton_affiche_Bode_Gdb")[0].checked)	return rendu;	//Si graphique invisible


		
			rendu+="	% Bode - Gain en Db -----------------\n";
			rendu+="	\\begin{scope}[xscale="+this.echelle().x+",yscale="+this.echelle().y+"]\n";
			rendu+="		\\semilog{"+this.bornesX().mini+"}{"+this.bornesX().maxi+"}{"+this.bornesY().mini+"}{"+this.bornesY().maxi+"}%\n";
			rendu+="		\\UnitedB\n"

			for(i in listeFonctions)
				{
					var eq=listeFonctions[i];
					if(eq.afficheAnalytique())
						rendu+=eq.exporteBodeGdbAnalytiqueLaTex();
					if(eq.afficheAsymptotique())
						rendu+=eq.exporteBodeGdbAsymptotiqueLaTex();
				}
			rendu+="	\\end{scope}\n";
			rendu+="	% ----------------------------\n"
			return rendu;
		}
		
		//Pour convertir les éléments graphiques de KinticJS en SVG
		this.exportSVG=function()
			{	
				var rendu=	"	//Diagramme de Gain en DB"+
						"	<g>\n"+
						"		"+this.rectangleBackground.exportSVG()+"\n"+ //<rect x=\"0\" y=\"0\" width=\""+this.rectangleBackground.width()+"\" height=\""+this.rectangleBackground.height()+"\" style=\"fill:"+this.backgroundColor()+";stroke:"+this.lineColor()+";stroke-width:3;\"/>\n"+	//Rectangle
								this.repere.exportSVG()+	//Export du repere
						"		//Masque\n"+
						"		<defs>\n"+
						"			<mask id='maskGdB' x='0' y='0' width='"+grapheBodeGdb.width()+"' height='"+grapheBodeGdb.height()+"' >\n"+
						"				<rect x='0' y='0' style='fill:#FFFFFF;stroke:#FFFFFF;stroke-width:3;' width='"+grapheBodeGdb.width()+"' height='"+grapheBodeGdb.height()+"'/>\n"+
						"			</mask>\n"+
						"		</defs>\n"+
						"		//Fonctions gains en DB\n"+
						"		<g style='; mask: url(#maskGdB)'>\n";				//Liste fonctions....

				for(i in listeFonctions)	//Export de chaque courbe
					{
						fct=listeFonctions[i];
						rendu+=	"			"+fct.exportGdbSVG()+"\n";
						rendu+=	"			"+fct.exportGdbAsymptSVG()+"\n";
					}
				rendu+=	"		</g>\n"+
					"	</g>\n";
			
				return rendu;
			}


		//Export pour le XML
		this.exportXML=function()
			{
				var rendu=	"	<diagram type=\"Bode-Gdb\">\n"+
						"		<affiche>"+$("#bouton_affiche_Bode_Gdb")[0].checked+"</affiche>\n"+
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
 
GraphiqueGdb.prototype = Object.create(Graphique.prototype);//On recopie le prototype de Kinteic.Group
GraphiqueGdb.prototype.constructor = GraphiqueGdb;//On recopie le constructeur de Noeud dans son prototype



