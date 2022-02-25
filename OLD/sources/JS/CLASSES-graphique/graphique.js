////////////////////////////////
// Mise en place graphique
////////////////////////////////

window.onload = function() {
	maScene = new Kinetic.Stage({
					container: "graphique",
					width: 400,
					height: 300
				});


	//Paramètres graphique
		maScene.bornesW=[-3,4];
		maScene.bornesGdb=[-20,40];
		maScene.bornesPhase=[-190,10];

		maScene.uniteX=100;
		maScene.uniteY=-5;

	//Calques
		maScene.calqueAxes = new Kinetic.Layer();
		maScene.calqueCourbes = new Kinetic.Layer();

		maScene.add(maScene.calqueAxes);
		maScene.add(maScene.calqueCourbes);

	//Mise en place des objets
		//maScene.repere=new Repere(maScene.bornesW[0],maScene.bornesW[1],maScene.bornesGdb[0],maScene.bornesGdb[1]);
		//maScene.calqueAxes.add(maScene.repere);

		maScene.gainGlobal=new FonctionGlobale();
		listeFonctions.push(maScene.gainGlobal);		
		updateAffichageListe();


	//Dessin
		maScene.draw();
};

