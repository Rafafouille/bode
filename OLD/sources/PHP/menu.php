
		<ul id="menu">
			<li>
				<a>Diagramme de Bode</a>
				<ul>
					<li><a href=""><img class="icone" src="./sources/icones/iconePoubelle.png"/> Nouveau diagramme</a></li>
					<!--<li><a id="boutonChargementBDD"><img class="icone" src="./sources/icones/iconeOuvreBDD.png"/> Charger depuis la BDD</a></li>
					<li><a id="boutonSauvegardeBDD"><img class="icone" src="./sources/icones/iconeSauvBDD.png"/> Sauvegarder dans la BDD</a></li>-->
				</ul>
			</li>
			<li id="menuInserer"><a>Insérer</a>
				<ul>
					<li><a id="boutonNouveau1erOrdre"><img class="icone" src="./sources/icones/icone1erOrdre.png"/> 1<sup>er</sup> Ordre</a></li>
					<li><a id="boutonNouveau2emeOrdre"><img class="icone" src="./sources/icones/icone2emeOrdre.png"/> 2<sup>ème</sup> Ordre</a></li>
					<li><a id="boutonNouveauGain"><img class="icone" src="./sources/icones/iconeGain.png"/> Gain</a></li>
					<li><a id="boutonNouvelleDerivee"><img class="icone" src="./sources/icones/iconeDerivee.png"/> Dérivée</a></li>
					<li><a id="boutonNouvelleIntegrale"><img class="icone" src="./sources/icones/iconeIntegrale.png"/> Intégrale</a></li>
					<li><a id="boutonNouveauPIDSerie"><img class="icone" src="./sources/icones/iconePIDSerie.png"/> Correcteur PID-Série</a></li>
					<li><a id="boutonNouveauPI"><img class="icone" src="./sources/icones/iconePI.png"/> Correcteur PI</a></li>
					<li><a id="boutonNouveauPD"><img class="icone" src="./sources/icones/iconePD.png"/> Correcteur PD</a></li>
					<li><a id="boutonNouveauAvancePhase"><img class="icone" src="./sources/icones/iconeAvancePhase.png"/> Correcteur Avance de phase</a></li>
					<li><a id="boutonNouveauRetardPhase"><img class="icone" src="./sources/icones/iconeRetardPhase.png"/> Correcteur Retard de phase</a></li>
				</ul>
			</li>
			<li><a>Exporter</a>
				<ul>
					<li><a id="boutonCompileLaTex"><img class="icone" src="./sources/icones/iconeTex.png"/> LaTex</a></li>
					<li><a id="boutonCompileSVG"><img class="icone" src="./sources/icones/iconeSVG.png"/> Image SVG</a></li>
					<li><a id="boutonCompileXML"><img class="icone" src="./sources/icones/iconeXML.png"/> Sauvegarde XML</a></li>
				</ul>
			</li>
			<li><a>Annexes</a>
				<ul>
					<li><a id="boutonPapanicola" href="http://sciences-indus-cpge.papanicola.info/Bode-Black-et-Nyquist-avec-Tikz" target="_blank"><img src="http://sciences-indus-cpge.papanicola.info/favicon.ico" style="width:18px;"/> Package LaTex "bode.sty"</a></li>
					<li><a id="boutonAllais.eu" href="http://enseignement.allais.eu" target="_blank"><img src="http://enseignement.allais.eu/favicon.ico" style="width:18px;"/> Mon site d'enseignement</a></li>
					<li><a id="boutonAPropos"><img src="./sources/icones/iconeInfo.png" style="margin-bottom:-7px;"/> À propos...</a></li>
					<li><a id="boutonAFaire">À faire</a></li>
				</ul>
			</li>
		</ul>

		<script>
			// initialise le menu
			$("#menu").menu( { position: { using: positionnerSousMenu } });
			 
			function positionnerSousMenu(position, elements) {
			 var options = {
			 of: elements.target.element
			 };
			 
			 if (elements.element.element.parent().parent().attr("id") === "menu") {
			 // le menu à positionner est de niveau 2 :
			 // on va superposer le point central du haut du menu sur le point central bas du menu parent
			 options.my = "left top";
			 options.at = "left bottom";
			 }
			 else
			 {
			 // le menu à positionner est de niveau > 2
			 // le positionnement reste celui par défaut : on va superposer le coin haut gauche du menu sur le coin haut droit du menu parent
			 options.my = "left top";
			 options.at = "right top";
			 }
			 
			 elements.element.element.position(options);
			};
		</script> 
