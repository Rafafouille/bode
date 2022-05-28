	<!-- Menu du haut ----->


		<div id="menu">
			<div class="sous-menu">
				<div class="titre-menu">
					Gérer
				</div>
				<div class="liste-items-menu">
					<!--<div class="item-menu" onclick="$('#boite_connection').dialog('open')">
						<img src="./sources/images/iconeCle.png" alt=""/>
						Se connecter
					</div>-->
					<div class="item-menu" onclick="location.reload();">
						<img src="./sources/images/iconePoubelle.png" alt=""/>
						Nouveau
					</div>
					<!--<div class="item-menu">
						<img src="./sources/images/iconeDossier.png" alt=""/>
						 Ouvrir
					</div>-->
					<div class="item-menu" onclick="$('#dialogImporter').dialog('open')">
						<img src="./sources/images/iconeImport.png" alt=""/>
						Importer
					</div>
					<div class="item-menu" onclick="ouvreBoiteExporter()">
						<img src="./sources/images/iconeExport.png" alt=""/>
						Exporter
					</div>
					<!--<div class="item-menu">
						<img src="./sources/images/iconeBDD.png" alt=""/>
						Enregistrer
					</div>-->
					<div class="item-menu" onclick="$('#boite_a_propos').dialog('open')">
						<img src="./sources/images/iconeAPropos.png" alt=""/>
						 À propos
					</div>
				</div>
			</div>
			<div class="sous-menu">
				<div class="titre-menu">
					Insérer une fonction
				</div>
				<div class="liste-items-menu">
					<div class="item-menu" onclick="$('#boite_ajout_Gain').dialog('open')">
						<img src="./sources/images/iconeGain.png" alt=""/>
						Gain
					</div>
					<div class="item-menu" onclick="$('#boite_ajout_1er_Ordre').dialog('open')">
						<img src="./sources/images/icone1erOrdre.png" alt=""/>
						1<sup>er</sup> Ordre
					</div>
					<div class="item-menu" onclick="$('#boite_ajout_2eme_Ordre').dialog('open')">
						<img src="./sources/images/icone2emeOrdre.png" alt=""/>
						2<sup>ème</sup> Ordre
					</div>
					<div class="item-menu" onclick="$('#boite_ajout_Integrateur').dialog('open')">
						<img src="./sources/images/iconeIntegrale.png" alt=""/>
						Intégrateur
					</div>
					<div class="item-menu" onclick="$('#boite_ajout_Derivateur').dialog('open')">
						<img src="./sources/images/iconeDerivee.png" alt=""/>
						Dérivateur
					</div>
					<div class="item-menu" onclick="$('#boite_ajout_PI').dialog('open')">
						<img src="./sources/images/iconePI.png" alt=""/>
						Correcteur PI
					</div>
					<div class="item-menu" onclick="$('#boite_ajout_PD').dialog('open')">
						<img src="./sources/images/iconePD.png" alt=""/>
						Correcteur PD
					</div>
					<div class="item-menu" onclick="$('#boite_ajout_Avance_De_Phase').dialog('open')">
						<img src="./sources/images/iconeAvancePhase.png" alt=""/>
						Correcteur Avance de Phase
					</div>
					<div class="item-menu" onclick="$('#boite_ajout_Retard_De_Phase').dialog('open')">
						<img src="./sources/images/iconeRetardPhase.png" alt=""/>
						Correcteur Retard de Phase
					</div>
				</div>
			</div>
		</div>


<!--
		<ul id="menu2">
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
					<li><a onclick="$('#boite_ajout_Gain').dialog('open')"><img src="./sources/images/iconeGain.png" alt=""/> Gain</a></li>
					<li><a onclick="$('#boite_ajout_1er_Ordre').dialog('open')"><img src="./sources/images/icone1erOrdre.png" alt=""/> 1<sup>er</sup> Ordre</a></li>
					<li><a onclick="$('#boite_ajout_2eme_Ordre').dialog('open')"><img src="./sources/images/icone2emeOrdre.png" alt=""/> 2<sup>ème</sup> Ordre</a></li>
					<li><a onclick="$('#boite_ajout_Integrateur').dialog('open')"><img src="./sources/images/iconeIntegrale.png" alt=""/> Intégrateur</a></li>
					<li><a onclick="$('#boite_ajout_Derivateur').dialog('open')"><img src="./sources/images/iconeDerivee.png" alt=""/> Dérivateur</a></li>
					<li><a onclick="$('#boite_ajout_PI').dialog('open')"><img src="./sources/images/iconePI.png" alt=""/> Correcteur PI</a></li>
					<li><a onclick="$('#boite_ajout_PD').dialog('open')"><img src="./sources/images/iconePD.png" alt=""/> Correcteur PD</a></li>
					<li><a onclick="$('#boite_ajout_Avance_De_Phase').dialog('open')"><img src="./sources/images/iconeAvancePhase.png" alt=""/> Correcteur Avance de Phase</a></li>
					<li><a onclick="$('#boite_ajout_Retard_De_Phase').dialog('open')"><img src="./sources/images/iconeRetardPhase.png" alt=""/> Correcteur Retard de Phase</a></li>
				</ul>
			</li>
			<li class="ui-state-disabled">
				<a>Exporter</a>
			</li>
		</ul>
	-->
	<script>
	/*
		// initialise le menu
		$("#menu2").menu( { position: { using: positionnerSousMenu } });
		 
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
		};*/
	</script> 
