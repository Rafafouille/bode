		<!-- Nouveau 1er ordre-->
			<div id="dialogNouveau1erOrdre" title="Ajouter une fonction du 1er Ordre">
				<form>
					<p><img src="http://latex.codecogs.com/gif.latex?\tiny&space;H(p)=\frac{K}{1&plus;\tau&space;p}" title="\tiny H(p)=\frac{K}{1+\tau p}" /></p>
					<p>
							<label for="nouveau1erOrdreK">K = </label>
							<input type="text" id="nouveau1erOrdreK" name="nouveau1erOrdreK" value="1"/>
						<br/>
							<label for="nouveau1erOrdreTau">&tau; = </label>
							<input type="text" id="nouveau1erOrdreTau" name="nouveau1erOrdreTau" value="1"/>
						<br/>
							<input type="checkbox" name="nouveau1erOrdreInverse" id="nouveau1erOrdreInverse"/>	
							<label for="nouveau1erOrdreInverse">Inversé</label>
					</p>
				</form>
			</div>
			<script>
				//On transforme le <div> précédent en boite de dialogue
				$("#dialogNouveau1erOrdre").dialog({
									modal:true,
									buttons: {
										"Annuler": function() {$(this).dialog( "close" );},
										"Ajouter": function() {	$(this).dialog("close");
																actionAjouter1erOrdre($("#nouveau1erOrdreK").val(),$("#nouveau1erOrdreTau").val(), $("#nouveau1erOrdreInverse").is(':checked'));
																//ga('send', 'event', 'fonctions', 'insérer', "1er Ordre");//Statistiqus Google
																_paq.push(['trackEvent', 'fonction_utilisee',  '1er ordre']);
																}
										}
								});
				$("#dialogNouveau1erOrdre").dialog('close');
			</script>


		<!-- Nouveau 2eme ordre-->
			<div id="dialogNouveau2emeOrdre" title="Ajouter une fonction du 2<sup>ème</sup> Ordre">
				<form>
					<p><img src="http://latex.codecogs.com/gif.latex?\tiny&space;H(p)=\frac{K}{\frac{1}{\omega_0}p^2&plus;\frac{2z}{\omega_0}p&plus;1}" title="\tiny H(p)=\frac{K}{\frac{1}{\omega_0}p^2+\frac{2z}{\omega_0}p+1}" /></p>
					<p>
							<label for="nouveau2emeOrdreK">K = </label>
							<input type="text" id="nouveau2emeOrdreK" name="nouveau2emeOrdreK" value="1"/>
						<br/>
							<label for="nouveau2emeOrdreW0">&omega;<sub>0</sub> = </label>
							<input type="text" id="nouveau2emeOrdreW0" name="nouveau2emeOrdreW0" value="1"/>
						<br/>
							<label id="labelNouveau2emeOrdreZ" for="nouveau2emeOrdreZ">z = </label>
							<input type="text" id="nouveau2emeOrdreZ" name="nouveau2emeOrdreZ" value="1"/>
							<label id="labelNouveau2emeOrdreQ" style="display:none;" for="nouveau2emeOrdreQ">Q = </label>
							<input style="display:none;" type="text" id="nouveau2emeOrdreQ" name="nouveau2emeOrdreQ" value="0.5"/>
						<br/>
							<input type="checkbox" name="nouveau2emeOrdreInverse" id="nouveau2emeOrdreInverse"/>	
							<label for="nouveau2emeOrdreInverse">Inversé</label>
					</p>
				</form>
			</div>
			<script>
				//On transforme le <div> précédent en boite de dialogue
				$("#dialogNouveau2emeOrdre").dialog({
									modal:true,
									buttons: {
										"Annuler": function() {$(this).dialog( "close" );},
										"Ajouter": function() {$(this).dialog("close");
													var K=$("#nouveau2emeOrdreK").val();//On recupere K
													var w0=$("#nouveau2emeOrdreK").val();//On recupere w0
													if($("input[name=boutonSIPhysique]:checked").val()=="SI")//Si avec Z
														var z=$("#nouveau2emeOrdreZ").val();
													else//Sinon (avec Q)
														var z=1/(2*$("#nouveau2emeOrdreQ").val());
													var inv=$("#nouveau2emeOrdreInverse").is(':checked');
													actionAjouter2emeOrdre(K,w0,z,inv);
													//ga('send', 'event', 'fonctions', 'insérer', "2ème Ordre"); //Statistiques Google
																_paq.push(['trackEvent', 'fonction_utilisee',  '2eme ordre']);
											}
										}
								});
				$("#dialogNouveau2emeOrdre").dialog('close');
			</script>


		<!-- Nouveau Gain-->
			<div id="dialogNouveauGain" title="Ajouter un gain pur">
				<form>
					<p><img src="http://latex.codecogs.com/gif.latex?\tiny&space;H(p)=K" title="\tiny H(p)=K" /></p>
					<p>
							<label for="nouveauGainK">K = </label>
							<input type="text" id="nouveauGainK" name="nouveauGainK" value="1"/>
						<br/>
							<input type="checkbox" name="nouveauGainInverse" id="nouveauGainInverse"/>	
							<label for="nouveauGainInverse">Inversé</label>
					</p>
				</form>
			</div>
			<script>
				//On transforme le <div> précédent en boite de dialogue
				$("#dialogNouveauGain").dialog({
									modal:true,
									buttons: {
										"Annuler": function() {$(this).dialog( "close" );},
										"Ajouter": function() {	$(this).dialog("close");
																actionAjouterGain($("#nouveauGainK").val(),$("#nouveauGainInverse").is(':checked'));
																//ga('send', 'event', 'fonctions', 'insérer', "Gain"); //Statistiques Google
																_paq.push(['trackEvent', 'fonction_utilisee',  'Gain']);
																}
										}
								});
				$("#dialogNouveauGain").dialog('close');
			</script>


		<!-- Nouvelle Derivee-->
			<div id="dialogNouvelleDerivee" title="Ajouter d'une dérivée">
				<form>
					<p><img src="http://latex.codecogs.com/gif.latex?\tiny&space;H(p)=Kp" title="\tiny H(p)=Kp" /></p>
					<p>
							<label for="nouvelleDeriveeK">K = </label>
							<input type="text" id="nouvelleDeriveeK" name="nouvelleDeriveeK" value="1"/>
						<br/>
							<input type="checkbox" name="nouveauDeriveeInverse" id="nouveauDeriveeInverse"/>	
							<label for="nouveauDeriveeInverse">Inversé</label>
					</p>
				</form>
			</div>
			<script>
				//On transforme le <div> précédent en boite de dialogue
				$("#dialogNouvelleDerivee").dialog({
									modal:true,
									buttons: {
										"Annuler": function() {$(this).dialog( "close" );},
										"Ajouter": function() {	$(this).dialog("close");
																actionAjouterDerivee($("#nouvelleDeriveeK").val(),$("#nouveauDeriveeInverse").is(':checked'));
																//ga('send', 'event', 'fonctions', 'insérer', "Dérivée"); //Statistiques Google
																_paq.push(['trackEvent', 'fonction_utilisee',  'Derivee']);
																}
										}
								});
				$("#dialogNouvelleDerivee").dialog('close');
			</script>


		<!-- Nouvelle Intégrale-->
			<div id="dialogNouvelleIntegrale" title="Ajouter d'un intégrateur">
				<form>
					<p><img src="http://latex.codecogs.com/gif.latex?\tiny&space;H(p)=\frac&space;Kp" title="\tiny H(p)=\frac Kp" /></p>
					<p>
							<label for="nouvelleIntegraleK">K = </label>
							<input type="text" id="nouvelleIntegraleK" name="nouvelleIntegraleK" value="1"/>
						<br/>
							<input type="checkbox" name="nouveauIntegraleInverse" id="nouveauIntegraleInverse"/>	
							<label for="nouveauIntegraleInverse">Inversé</label>
					</p>
				</form>
			</div>
			<script>
				//On transforme le <div> précédent en boite de dialogue
				$("#dialogNouvelleIntegrale").dialog({
									modal:true,
									buttons: {
										"Annuler": function() {$(this).dialog( "close" );},
										"Ajouter": function() {	$(this).dialog("close");
																actionAjouterIntegrale($("#nouvelleIntegraleK").val(),$("#nouveauIntegraleInverse").is(':checked'));
																//ga('send', 'event', 'fonctions', 'insérer', "Intégrale"); //Statistiques Google
																_paq.push(['trackEvent', 'fonction_utilisee',  'Integrale']);
																}
										}
								});
				$("#dialogNouvelleIntegrale").dialog('close');
			</script>


		<!-- Nouveau PID-Série-->
			<div id="dialogNouveauPIDSerie" title="Ajouter d'un correcteur PID-Série">
				<form>
					<p><img src="http://latex.codecogs.com/gif.latex?\tiny&space;H(p)=\tiny&space;K_p\frac{1&plus;T_i&space;p}{T_i&space;p}(1&plus;T_d&space;p)" title="\tiny H(p)=\tiny K_p\frac{1+T_i p}{T_i p}(1+T_d p)" /></p>
					<p>
							<label for="nouveauPIDSerieKp">K<sub>p</sub> = </label>
							<input type="text" id="nouveauPIDSerieKp" name="nouveauPIDSerieKp" value="1"/>
						<br/>
							<label for="nouveauPIDSerieTi">T<sub>i</sub> = </label>
							<input type="text" id="nouveauPIDSerieTi" name="nouveauPIDSerieTi" value="1"/>
						<br/>
							<label for="nouveauPIDSerieTd">T<sub>d</sub> = </label>
							<input type="text" id="nouveauPIDSerieTd" name="nouveauPIDSerieTd" value="1"/>
						<br/>
							<input type="checkbox" name="nouveauPIDSerieInverse" id="nouveauPIDSerieInverse"/>	
							<label for="nouveauPIDSerieInverse">Inversé</label>
					</p>
				</form>
			</div>
			<script>
				//On transforme le <div> précédent en boite de dialogue
				$("#dialogNouveauPIDSerie").dialog({
									modal:true,
									buttons: {
										"Annuler": function() {$(this).dialog( "close" );},
										"Ajouter": function() {	$(this).dialog("close");
																actionAjouterPIDSerie($("#nouveauPIDSerieKp").val(),$("#nouveauPIDSerieTi").val(),$("#nouveauPIDSerieTd").val(),$("#nouveauPIDSerieInverse").is(':checked'));
																//ga('send', 'event', 'fonctions', 'insérer', "PID"); //Statistiques Google
																_paq.push(['trackEvent', 'fonction_utilisee',  'PID']);
																}
										}
								});
				$("#dialogNouveauPIDSerie").dialog('close');
			</script>


		<!-- Nouveau PI-->
			<div id="dialogNouveauPI" title="Ajouter d'un correcteur PI">
				<form>
					<p><img src="http://latex.codecogs.com/gif.latex?\tiny&space;H(p)=K_p\frac{1&plus;T_ip}{T_ip}" title="\tiny H(p)=K_p\frac{1+T_ip}{T_ip}" /></p>
					<p>
							<label for="nouveauPIKp">K<sub>p</sub> = </label>
							<input type="text" id="nouveauPIKp" name="nouveauPIKp" value="1"/>
						<br/>
							<label for="nouveauPITi">T<sub>i</sub> = </label>
							<input type="text" id="nouveauPITi" name="nouveauPITi" value="1"/>
						<br/>
							<input type="checkbox" name="nouveauPIInverse" id="nouveauPIInverse"/>	
							<label for="nouveauPIInverse">Inversé</label>
					</p>
				</form>
			</div>
			<script>
				//On transforme le <div> précédent en boite de dialogue
				$("#dialogNouveauPI").dialog({
									modal:true,
									buttons: {
										"Annuler": function() {$(this).dialog( "close" );},
										"Ajouter": function() {	$(this).dialog("close");
																actionAjouterPI($("#nouveauPIKp").val(),$("#nouveauPITi").val(),$("#nouveauPIInverse").is(':checked'));
																//ga('send', 'event', 'fonctions', 'insérer', "PI"); //Statistiques Google
																_paq.push(['trackEvent', 'fonction_utilisee',  'PI']);
																}
										}
								});
				$("#dialogNouveauPI").dialog('close');
			</script>


		<!-- Nouveau PD-->
			<div id="dialogNouveauPD" title="Ajouter d'un correcteur PD">
				<form>
					<p><img src="http://latex.codecogs.com/gif.latex?\tiny&space;H(p)=K_p(1&plus;T_dp)" title="\tiny H(p)=K_p(1+T_dp)" /></p>
					<p>
							<label for="nouveauPDKp">K<sub>p</sub> = </label>
							<input type="text" id="nouveauPDKp" name="nouveauPDKp" value="1"/>
						<br/>
							<label for="nouveauPDTd">T<sub>d</sub> = </label>
							<input type="text" id="nouveauPDTd" name="nouveauPDTd" value="1"/>
						<br/>
							<input type="checkbox" name="nouveauPDInverse" id="nouveauPDInverse"/>	
							<label for="nouveauPDInverse">Inversé</label>
					</p>
				</form>
			</div>
			<script>
				//On transforme le <div> précédent en boite de dialogue
				$("#dialogNouveauPD").dialog({
									modal:true,
									buttons: {
										"Annuler": function() {$(this).dialog( "close" );},
										"Ajouter": function() {	$(this).dialog("close");
																actionAjouterPD($("#nouveauPDKp").val(),$("#nouveauPDTd").val(),$("#nouveauPDInverse").is(':checked'));
																//ga('send', 'event', 'fonctions', 'insérer', "PD"); //Statistiques Google
																_paq.push(['trackEvent', 'fonction_utilisee',  'PD']);
																}
										}
								});
				$("#dialogNouveauPD").dialog('close');
			</script>


		<!-- Nouveau Avance Phase-->
			<div id="dialogNouveauAvancePhase" title="Ajouter d'un correcteur à avance de phase">
				<form>
					<p><img src="http://latex.codecogs.com/gif.latex?\tiny&space;H(p)=K_p\frac{1&plus;aT_ip}{1&plus;T_ip}" title="\tiny H(p)=K_p\frac{1+aT_ip}{1+T_i}" /></p>
					<p>
							<label for="nouveauAvancePhaseKp">K<sub>p</sub> = </label>
							<input type="text" id="nouveauAvancePhaseKp" name="nouveauAvancePhaseKp" value="1"/>
						<br/>
							<label for="nouveauAvancePhaseTi">T<sub>i</sub> = </label>
							<input type="text" id="nouveauAvancePhaseTi" name="nouveauAvancePhaseTi" value="1"/>
						<br/>
							<label for="nouveauAvancePhaseA">a = </label>
							<input type="text" id="nouveauAvancePhaseA" name="nouveauAvancePhaseA" value="10"/>
						<br/>
							<input type="checkbox" name="nouveauAvancePhaseInverse" id="nouveauAvancePhaseInverse"/>	
							<label for="nouveauAvancePhaseInverse">Inversé</label>
					</p>
				</form>
			</div>
			<script>
				//On transforme le <div> précédent en boite de dialogue
				$("#dialogNouveauAvancePhase").dialog({
									modal:true,
									buttons: {
										"Annuler": function() {$(this).dialog( "close" );},
										"Ajouter": function() {	$(this).dialog("close");
																actionAjouterAvancePhase($("#nouveauAvancePhaseKp").val(),$("#nouveauAvancePhaseTi").val(),$("#nouveauAvancePhaseA").val(),$("#nouveauAvancePhaseInverse").is(':checked'));
																//ga('send', 'event', 'fonctions', 'insérer', "Avance de phase"); //Statistiques Google
																_paq.push(['trackEvent', 'fonction_utilisee',  'Avance de phase']);
																}
										}
								});
				$("#dialogNouveauAvancePhase").dialog('close');
			</script>



		<!-- Nouveau Retard Phase-->
			<div id="dialogNouveauRetardPhase" title="Ajouter d'un correcteur à retard de phase">
				<form>
					<p><img src="http://latex.codecogs.com/gif.latex?\tiny&space;H(p)=K_p\frac{1&plus;T_ip}{1&plus;aT_ip}" title="\tiny H(p)=K_p\frac{1+T_i}{1+aT_ip}" /></p>
					<p>
							<label for="nouveauRetardPhaseKp">K<sub>p</sub> = </label>
							<input type="text" id="nouveauRetardPhaseKp" name="nouveauRetardPhaseKp" value="1"/>
						<br/>
							<label for="nouveauRetardPhaseTi">T<sub>i</sub> = </label>
							<input type="text" id="nouveauRetardPhaseTi" name="nouveauRetardPhaseTi" value="1"/>
						<br/>
							<label for="nouveauRetardPhaseA">a = </label>
							<input type="text" id="nouveauRetardPhaseA" name="nouveauRetardPhaseA" value="10"/>
						<br/>
							<input type="checkbox" name="nouveauRetardPhaseInverse" id="nouveauRetardPhaseInverse"/>	
							<label for="nouveauRetardPhaseInverse">Inversé</label>
					</p>
				</form>
			</div>
			<script>
				//On transforme le <div> précédent en boite de dialogue
				$("#dialogNouveauRetardPhase").dialog({
									modal:true,
									buttons: {
										"Annuler": function() {$(this).dialog( "close" );},
										"Ajouter": function() {	$(this).dialog("close");
																actionAjouterRetardPhase($("#nouveauRetardPhaseKp").val(),$("#nouveauRetardPhaseTi").val(),$("#nouveauRetardPhaseA").val(),$("#nouveauRetardPhaseInverse").is(':checked'));
																//ga('send', 'event', 'fonctions', 'insérer', "Retard de phase"); //Statistiques Google
																_paq.push(['trackEvent', 'fonction_utilisee',  'Retard de phase']);
																}
										}
								});
				$("#dialogNouveauRetardPhase").dialog('close');
			</script>


		<!-- Supprimer fonction-->
			<div id="dialogSupprime" title="Supprimer la fonction">
				<form>
					Voulez-vous supprimer la fonction H<sub><span class="detailSupprime"></span></sub>(p) ?
				</form>
			</div>
			<script>
				//On transforme le <div> précédent en boite de dialogue
				$("#dialogSupprime").dialog({
									modal:true,
									buttons: {
										"Annuler": function() {$(this).dialog( "close" );},
										"Supprimer": function() {$(this).dialog( "close" );supprimeFonction(parseInt($("#dialogSupprime span").text()));}
										}
								});
				$("#dialogSupprime").dialog('close');
			</script>


		<!-- Export Latex-->
			<div id="dialogExport" title="Exporter le rendu">
				<form id="formeDialogExport" method="POST" action="http://bode.allais.eu/download.php">
					<label for="formatExport">Format :</label>
					<select name="formatExport" id="formatExport" onchange="updateExport();">
						<option value="LaTex">LaTex</option>
						<option value="SVG">SVG</option>
						<option value="XML">XML</option>
						<option>Bitmap</option>
					</select>
					<br/>
					<textarea name="contenuExport" id="contenuExport" cols="80" rows="15"></textarea>
				</form>
			</div>
			<script>
				//On transforme le <div> précédent en boite de dialogue
				$("#dialogExport").dialog({
									modal:true,
									buttons: {
										"Télécharger": function() {	$("#formeDialogExport").submit();
																	//ga('send', 'event', 'exports', 'telecharger', $("#formatExport option:selected").val()); //Statistiques Google
																	_paq.push(['trackEvent', 'export', 'export', $("#formatExport option:selected").val()]);
																	},
										"Fermer": function() {$(this).dialog("close");}
										},
									autoOpen: false,
									width:700
								});
			</script>




		<!-- A propos-->
			<div id="dialogAPropos" title="À propos...">
				<h2>Éditeur de diagramme de Bode pour LaTex</h2>
				<img src="favicon.ico" style="display:block;float:left;margin:5px;"/>
				Cette application à été réalisée par <strong><a href="http://enseignement.allais.eu">Raphaël ALLAIS</a></strong>.
				<br/><br/>
				Enseignant en sciences industrielles pour l'ingénieur, 
				elle a été rédigée en vue de simplifier la création de diagrammes de Bode pour mes cours en LaTex.
				Elle a pour but d'exploiter le package "<a href="http://sciences-indus-cpge.papanicola.info/Bode-Black-et-Nyquist-avec-Tikz">bode.sty</a>"
				(déjà très pratique !) réalisé par <a href="http://sciences-indus-cpge.papanicola.info/">Robert Papanicola</a>.
				<br/><br/>
				Pour toute question, n'hésitez pas à me contacter à cette adresse :
				<div style="text-align:center;">allais[point]raphael[arobat]free[point]fr</div>
				<a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Licence Creative Commons" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/InteractiveResource" property="dct:title" rel="dct:type">Editeur de diagramme de Bode pour LaTex</span> de <a xmlns:cc="http://creativecommons.org/ns#" href="http://bode.allais.eu" property="cc:attributionName" rel="cc:attributionURL">Raphaël ALLAIS</a> est mis à disposition selon les termes de la <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">licence Creative Commons Attribution - Pas d’Utilisation Commerciale 4.0 International</a>.<br />Fondé(e) sur une œuvre à <a xmlns:dct="http://purl.org/dc/terms/" href="http://bode.allais.eu" rel="dct:source">http://bode.allais.eu</a>.
			</div>
			<script>
				//On transforme le <div> précédent en boite de dialogue
				$("#dialogAPropos").dialog({
									modal:true,
									buttons: {
										"Fermer": function() {$(this).dialog("close");}
										},
									autoOpen: false,
									width:600
								});
			</script>

		<!-- A faire...-->
			<div id="dialogAFaire" title="À faire...">
				<?php include("./sources/PHP/versions.php")?>
			</div>
			<script>
				//On transforme le <div> précédent en boite de dialogue
				$("#dialogAFaire").dialog({
									modal:true,
									buttons: {
										"Fermer": function() {$(this).dialog("close");}
										},
									autoOpen: false,
									width:600
								});
			</script>

		<!-- Sauvegarde BDD-->
			<div id="dialogSauvegardeBDD" title="Sauvegarder sur la base de données">
				La sauvegarde des fonctions sur la base de données nécessite votre adresse mail pour vous connecter et récupérer le mot de passe.
				Cette adresse n'est pas publique et ne sera pas dévoilée.
				
				<form id="formeDialogueSauveBDD" method="POST">
					<label for="sauvBDDemail">Votre email :</label>
					<input type="email" placeholder="votre email ici" id="sauvBDDemail" name="sauvBDDemail" size="50"/>
					<br/><br/>
	
					<div style="font-weight:bold;text-align:center;font-size:small;color:red;">
						Attention : En l'absence de toute activité (chargement,sauvegarde,...),
						cette sauvegarde sera automatiquement supprimée
						au bout d'un an.
					</div>
					<label for="sauvBDDDescription">Description de la sauvegarde : </label>
					<div style="text-align:center;">
					<textarea id="sauvBDDDescription" name="sauvBDDDescription" placeholder="Écrire ici un descriptif de votre sauvegarde (Exemple : solution-exercice sur Maxpid)" cols="30" rows="4"></textarea>					
					</div>
					<label for="sauvBDDCapchien">
						Pour prouver que vous n'êtes pas un méchant robot, merci de répondre à la question posée dans l'image ci-contre :
						<div style="text-align:center;"><img src="http://bode.allais.eu/sources/capchien.php" style="height:200px;"/></div>
					</label>
					<br/>
					<input type="text" name="sauvBDDCapchien" id="sauvBDDCapchien" placeholder="Votre réponse..." size="50"/>
					<input type="hidden" id="contenuSauvegardeXML" name="contenuSauvegardeXML" value="truc" />
				</form>
				<div id="messageSauvegarde" style="display:none;text-align:center;"><img alt="Enregistrement..." src="./sources/icones/ajax-loader.gif"/></div>
			</div>
			<script>
				//On transforme le <div> précédent en boite de dialogue
				$("#dialogSauvegardeBDD").dialog({
									modal:true,
									buttons: {
										"Enregistrer": function() {$("#formeDialogueSauveBDD").submit();},
										"Fermer": function() {$(this).dialog("close");}
										},
									autoOpen: false,
									width:600
								});
			</script>
	
	

		<!-- Charge BDD -->
			<div id="dialogChargementBDD" title="Charger une courbe de la base de données">
				Pour charger votre courbe, il nous faut : votre e-mail et votre mot de passe.
				Le mot de passe vous a été envoyé par mail lors de l'enregistrement...
				
				<form id="formeDialogueChargeBDD"  method="POST">
					<label for="chargeBDDemail">Votre email :</label>
					<input type="email" placeholder="votre email ici" id="chargeBDDemail" name="chargeBDDemail" size="50"/>
					<br/><br/>
					
					<label for="chargeBDDMdp">Mot de passe :</label>
					<input type="text" name="chargeBDDMdp" id="chargeBDDMdp" placeholder="Mot de passe" size="50"/>
				</form>
				<div id="messageChargement" style="display:none;text-align:center;"><img alt="Chargement..." src="./sources/icones/ajax-loader.gif"/></div>
			</div>
			<script>
				//On transforme le <div> précédent en boite de dialogue
				$("#dialogChargementBDD").dialog({
									modal:true,
									buttons:
										{
											"Charger": function() {$("#formeDialogueChargeBDD").submit();},
											"Liste de mes courbes" : function(){envoieListeFonction()},
											"Fermer": function() {$(this).dialog("close");}
										},
									autoOpen: false,
									width:600
								});
			</script>
	 
