	<!-- Menu du haut ----->

		<ul id="menu">
			<li>
				<a>Main</a>
				<ul>
					<li class="ui-state-disabled"><a><img src="./sources/images/iconeCle.png" alt=""/> Se connecter</a></li>
					<li><a onclick="location.reload();"><img src="./sources/images/iconePoubelle.png" alt=""/> Nouveau</a></li>
					<li class="ui-state-disabled"><a><img src="./sources/images/iconeDossier.png" alt=""/> Ouvrir</a></li>
					<li class="ui-state-disabled"><a><img src="./sources/images/iconeBDD.png" alt=""/> Enregistrer</a></li>
					<li><a><img src="./sources/images/iconeAPropos.png" alt=""/> À propos</a></li>
				</ul>
			</li>
			<li>
				<a>Insérer une fonction</a>
				<ul>
					<li><a><img src="./sources/images/iconeGain.png" alt=""/> Gain</a></li>
					<li><a><img src="./sources/images/icone1erOrdre.png" alt=""/> 1<sup>er</sup></a></li>
					<li><a><img src="./sources/images/icone2emeOrdre.png" alt=""/> 2<sup>ème</sup></a></li>
					<li><a><img src="./sources/images/iconeIntegrale.png" alt=""/> Intégrateur</a></li>
					<li><a><img src="./sources/images/iconeDerivee.png" alt=""/> Dérivateur</a></li>
					<li><a><img src="./sources/images/iconePI.png" alt=""/> Correcteur PI</a></li>
					<li><a><img src="./sources/images/iconeAvancePhase.png" alt=""/> Correcteur Avance de Phase</a></li>
					<li><a><img src="./sources/images/iconeRetardPhase.png" alt=""/> Correcteur Retard de Phase</a></li>
				</ul>
			</li>
			<li class="ui-state-disabled">
				<a>Exporter</a>
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
