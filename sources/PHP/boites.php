

<!-- BOITE DE DIALOGUE supprimer fonction ================================== -->

<div id="boite_supprimer" title="Suppression d'une fonction" data-id="-1">
  <p>Voules-vous réellement supprimer la fonction "<span id="boite_supprimer_nom_fonction"></span>" ?</p>
</div>

<script>
	$("#boite_supprimer").dialog({
		  buttons: [
		  		{
					text: "SUPPRIMER",
					click: function() {
							getFonctionByNum(parseInt($("#boite_supprimer").data("id"))).supprime()
							$( this ).dialog( "close" );
							}
				},
				{
					text: "Annuler",
					click: function() {
							$( this ).dialog( "close" );
							}
				}
			  ],
		autoOpen: false,
		modal:true
	})
	.prev(".ui-dialog-titlebar").css("background","red");
</script>










<!-- BOITE DE DIALOGUE ajoute Gain ================================== -->

<div id="boite_ajout_Gain" title="Ajout d'une fonction Gain">
  <div class="boite_contenu">
	<div class="boite_table_equation" >
		<img src="http://latex.codecogs.com/gif.latex?H(p)=K" alt="H(p)=K"/>
	</div>
  	<table class="boite_table">
  		<tr>
  			<td class="boite_table_label"><label for="ajout_Gain_input_K">K = </label></td>
  			<td class="boite_table_input"><input type="number" name="ajout_Gain_input_K" id="ajout_Gain_input_K" value="1" min="0" step="0.1" size="6"/></td>
  		</tr>
  		<tr>
  			<td class="boite_table_label"><label for="ajout_Gain_input_Inverse">Inverse ? </label>
  			</td><td class="boite_table_input"><input type="checkbox" name="ajout_Gain_input_Inverse" id="ajout_Gain_input_Inverse"/></td>
  		</tr>
  	</table>
  	<div class="boite_commentaire">
  		<label for="ajout_Gain_input_commentaire">Commentaire</label>
  		<input type="text" name="ajout_Gain_input_commentaire" id="ajout_Gain_input_commentaire" placeholder="Ex : Moteur, Réducteur, ..."/>
  	</div>
  </div>
</div>

<script>
	$("#boite_ajout_Gain").dialog({
		  buttons: [
		  		{
					text: "AJOUTER",
					click: function() {
							ajoute_fonction(new Fonction_Gain( parseFloat($("#ajout_Gain_input_K").val()) , $("#ajout_Gain_input_Inverse")[0].checked , $("#ajout_Gain_input_commentaire").val() ))
							_paq.push(['trackEvent', 'fonction_utilisee',  'Gain']);
							$( this ).dialog( "close" );
							}
				},
				{
					text: "Annuler",
					click: function() {
							$( this ).dialog( "close" );
							}
				}
			  ],
		width: 500,
		autoOpen: false,
		modal:true
	});
</script>














<!-- BOITE DE DIALOGUE ajoute 1er ordre ================================== -->

<div id="boite_ajout_1er_Ordre" title="Ajout d'une fonction du 1er ordre">
  <div class="boite_contenu">
	<div class="boite_table_equation" >
		<img src="http://latex.codecogs.com/gif.latex?H(p)=\frac{K}{1+\tau p}" alt="H(p)=K/(1+τp)"/>
	</div>
  	<table class="boite_table">
  		<tr>
  			<td class="boite_table_label"><label for="ajout_1er_Ordre_input_K">K = </label></td>
  			<td class="boite_table_input"><input type="number" name="ajout_1er_Ordre_input_K" id="ajout_1er_Ordre_input_K" value="1" min="0" step="0.1" size="6"/></td>
  		</tr>
  		<tr>
  			<td class="boite_table_label"><label for="ajout_1er_Ordre_input_tau">&#964; (en s) = </label></td>
  			<td class="boite_table_input"><input type="number" name="ajout_1er_Ordre_input_tau" id="ajout_1er_Ordre_input_tau" value="1" min="0" step="0.1"  size="6"/></td>
  		</tr>
  		<tr>
  			<td class="boite_table_label"><label for="ajout_1er_Ordre_input_Inverse">Inverse ? </label>
  			</td><td class="boite_table_input"><input type="checkbox" name="ajout_1er_Ordre_input_Inverse" id="ajout_1er_Ordre_input_Inverse"/></td>
  		</tr>
  	</table>
  	<div class="boite_commentaire">
  		<label for="ajout_1er_Ordre_input_commentaire">Commentaire</label>
  		<input type="text" name="ajout_1er_Ordre_input_commentaire" id="ajout_1er_Ordre_input_commentaire" placeholder="Ex : Moteur, Réducteur, ..."/>
  	</div>
  </div>
</div>

<script>
	$("#boite_ajout_1er_Ordre").dialog({
		  buttons: [
		  		{
					text: "AJOUTER",
					click: function() {
							ajoute_fonction(new Fonction_1er_Ordre(parseFloat($("#ajout_1er_Ordre_input_K").val()) , parseFloat($("#ajout_1er_Ordre_input_tau").val()) , $("#ajout_1er_Ordre_input_Inverse")[0].checked  , $("#ajout_1er_Ordre_input_commentaire").val()  ))
							_paq.push(['trackEvent', 'fonction_utilisee',  '1er ordre']);
							$( this ).dialog( "close" );
							}
				},
				{
					text: "Annuler",
					click: function() {
							$( this ).dialog( "close" );
							}
				}
			  ],
		width: 500,
		autoOpen: false,
		modal:true
	});
</script>











<!-- BOITE DE DIALOGUE ajoute 2eme ordre ================================== -->

<div id="boite_ajout_2eme_Ordre" title="Ajout d'une fonction du 2ème ordre">
  <div class="boite_contenu">
	<div class="boite_table_equation" >
		<img src="http://latex.codecogs.com/gif.latex?H(p)=\frac{K}{\frac 1{\omega_0^2}p^2+\frac{2\xi}{\omega_0}p+1}" alt="H(p)=K/((1/w0^2)p^2+2z/w0p+1)"/>
	</div>
  	<table class="boite_table">
  		<tr>
  			<td class="boite_table_label"><label for="ajout_2eme_Ordre_input_K">K = </label></td>
  			<td class="boite_table_input"><input type="number" name="ajout_2eme_Ordre_input_K" id="ajout_2eme_Ordre_input_K" value="1" min="0" step="0.1" size="6"/></td>
  		</tr>
  		<tr>
  			<td class="boite_table_label"><label for="ajout_2eme_Ordre_input_xi">&#958; = </label></td>
  			<td class="boite_table_input"><input type="number" name="ajout_2eme_Ordre_input_xi" id="ajout_2eme_Ordre_input_xi" value="1" min="0" step="0.1"  size="6"/></td>
  		</tr>
  		<tr>
  			<td class="boite_table_label"><label for="ajout_2eme_Ordre_input_w0">&#969;<sub>0</sub> (en rad/s) = </label></td>
  			<td class="boite_table_input"><input type="number" name="ajout_2eme_Ordre_input_w0" id="ajout_2eme_Ordre_input_w0" value="1" min="0" step="0.1"  size="6"/></td>
  		</tr>
  		<tr>
  			<td class="boite_table_label"><label for="ajout_2eme_Ordre_input_Inverse">Inverse ? </label>
  			</td><td class="boite_table_input"><input type="checkbox" name="ajout_2eme_Ordre_input_Inverse" id="ajout_2eme_Ordre_input_Inverse"/></td>
  		</tr>
  	</table>
  	<div class="boite_commentaire">
  		<label for="ajout_2eme_Ordre_input_commentaire">Commentaire</label>
  		<input type="text" name="ajout_2eme_Ordre_input_commentaire" id="ajout_2eme_Ordre_input_commentaire" placeholder="Ex : Moteur, Réducteur, ..."/>
  	</div>
  </div>
</div>

<script>
	$("#boite_ajout_2eme_Ordre").dialog({
		  buttons: [
		  		{
					text: "AJOUTER",
					click: function() {
							ajoute_fonction(new Fonction_2eme_Ordre(parseFloat($("#ajout_2eme_Ordre_input_K").val()) , parseFloat($("#ajout_2eme_Ordre_input_xi").val()) , parseFloat($("#ajout_2eme_Ordre_input_w0").val()) , $("#ajout_2eme_Ordre_input_Inverse")[0].checked   , $("#ajout_2eme_Ordre_input_commentaire").val()  ))
							_paq.push(['trackEvent', 'fonction_utilisee',  '2eme ordre']);
							$( this ).dialog( "close" );
							}
				},
				{
					text: "Annuler",
					click: function() {
							$( this ).dialog( "close" );
							}
				}
			  ],
		width: 400,
		autoOpen: false,
		modal:true
	});
</script>











<!-- BOITE DE DIALOGUE ajoute Integrateur ================================== -->

<div id="boite_ajout_Integrateur" title="Ajout d'un intégrateur">
  <div class="boite_contenu">
	<div class="boite_table_equation" >
		<img src="http://latex.codecogs.com/gif.latex?H(p)=\frac{K_i}{p}" alt="H(p)=Ki/p"/>
	</div>
  	<table class="boite_table">
  		<tr>
  			<td class="boite_table_label"><label for="ajout_Integrateur_input_Ki">K<sub>i</sub> = </label></td>
  			<td class="boite_table_input"><input type="number" name="ajout_Integrateur_input_Ki" id="ajout_Integrateur_input_Ki" value="1" min="0" step="0.1" size="6"/></td>
  		</tr>
  		<tr>
  			<td class="boite_table_label"><label for="ajout_Integrateur_input_Inverse">Inverse ? </label>
  			</td><td class="boite_table_input"><input type="checkbox" name="ajout_Integrateur_input_Inverse" id="ajout_Integrateur_input_Inverse"/></td>
  		</tr>
  	</table>
  	<div class="boite_commentaire">
  		<label for="ajout_Integrateur_input_commentaire">Commentaire</label>
  		<input type="text" name="ajout_Integrateur_input_commentaire" id="ajout_Integrateur_input_commentaire" placeholder="Ex : Convert. Vitesse/Position"/>
  	</div>
  </div>
</div>

<script>
	$("#boite_ajout_Integrateur").dialog({
		  buttons: [
		  		{
					text: "AJOUTER",
					click: function() {
							ajoute_fonction(new Fonction_Integrateur(parseFloat($("#ajout_Integrateur_input_Ki").val()) , $("#ajout_Integrateur_input_Inverse")[0].checked    , $("#ajout_Integrateur_input_commentaire").val()  ))
							_paq.push(['trackEvent', 'fonction_utilisee',  'Integrale']);
							$( this ).dialog( "close" );
							}
				},
				{
					text: "Annuler",
					click: function() {
							$( this ).dialog( "close" );
							}
				}
			  ],
		width: 400,
		autoOpen: false,
		modal:true
	});
</script>











<!-- BOITE DE DIALOGUE ajoute Dérivateur ================================== -->

<div id="boite_ajout_Derivateur" title="Ajout d'un dérivateur">
  <div class="boite_contenu">
	<div class="boite_table_equation" >
		<img src="http://latex.codecogs.com/gif.latex?H(p)=K_dp" alt="H(p)=Kd p"/>
	</div>
  	<table class="boite_table">
  		<tr>
  			<td class="boite_table_label"><label for="ajout_Derivateur_input_Kd">K<sub>d</sub> = </label></td>
  			<td class="boite_table_input"><input type="number" name="ajout_Derivateur_input_Kd" id="ajout_Derivateur_input_Kd" value="1" min="0" step="0.1" size="6"/></td>
  		</tr>
  		<tr>
  			<td class="boite_table_label"><label for="ajout_Derivateur_input_Inverse">Inverse ? </label>
  			</td><td class="boite_table_input"><input type="checkbox" name="ajout_Derivateur_input_Inverse" id="ajout_Derivateur_input_Inverse"/></td>
  		</tr>
  	</table>
  	<div class="boite_commentaire">
  		<label for="ajout_Derivateur_input_commentaire">Commentaire</label>
  		<input type="text" name="ajout_Derivateur_input_commentaire" id="ajout_Derivateur_input_commentaire" placeholder="Ex : Convert. Position/Vitesse"/>
  	</div>
  </div>
</div>

<script>
	$("#boite_ajout_Derivateur").dialog({
		  buttons: [
		  		{
					text: "AJOUTER",
					click: function() {
							ajoute_fonction(new Fonction_Derivateur(parseFloat($("#ajout_Derivateur_input_Kd").val()) ,  $("#ajout_Derivateur_input_Inverse")[0].checked  , $("#ajout_Derivateur_input_commentaire").val()  ))
							_paq.push(['trackEvent', 'fonction_utilisee',  'Derivee']);
							$( this ).dialog( "close" );
							}
				},
				{
					text: "Annuler",
					click: function() {
							$( this ).dialog( "close" );
							}
				}
			  ],
		width: 400,
		autoOpen: false,
		modal:true
	});
</script>











<!-- BOITE DE DIALOGUE ajoute PI ================================== -->

<div id="boite_ajout_PI" title="Ajout d'un correcteur PI">
  <div class="boite_contenu">
	<div class="boite_table_equation" >
		<img src="http://latex.codecogs.com/gif.latex?H(p)=K_i\frac{1+\tau_ip}{\tau_ip}" alt="H(p)=Ki(1+Ti p)/(Ti p)"/>
	</div>
  	<table class="boite_table">
  		<tr>
  			<td class="boite_table_label"><label for="ajout_PI_input_Ki">K<sub>i</sub> = </label></td>
  			<td class="boite_table_input"><input type="number" name="ajout_PI_input_Ki" id="ajout_PI_input_Ki" value="1" min="0" step="0.1" size="6"/></td>
  		</tr>
  		<tr>
  			<td class="boite_table_label"><label for="ajout_PI_input_Ti">&#964;<sub>i</sub> (en s) = </label></td>
  			<td class="boite_table_input"><input type="number" name="ajout_PI_input_Ti" id="ajout_PI_input_Ti" value="1" min="0" step="0.1"  size="6"/></td>
  		</tr>
  		<tr>
  			<td class="boite_table_label"><label for="ajout_PI_input_Inverse">Inverse ? </label>
  			</td><td class="boite_table_input"><input type="checkbox" name="ajout_PI_input_Inverse" id="ajout_PI_input_Inverse"/></td>
  		</tr>
  	</table>
  	<div class="boite_commentaire">
  		<label for="ajout_PI_input_commentaire">Commentaire</label>
  		<input type="text" name="ajout_PI_input_commentaire" id="ajout_PI_input_commentaire" placeholder="Ex : Correcteur courant"/>
  	</div>
  </div>
</div>

<script>
	$("#boite_ajout_PI").dialog({
		  buttons: [
		  		{
					text: "AJOUTER",
					click: function() {
							ajoute_fonction(new Fonction_PI(parseFloat($("#ajout_PI_input_Ki").val())   ,   parseFloat($("#ajout_PI_input_Ti").val())  ,  $("#ajout_PI_input_Inverse")[0].checked    , $("#ajout_PI_input_commentaire").val()  ))
							_paq.push(['trackEvent', 'fonction_utilisee',  'PI']);
							$( this ).dialog( "close" );
							}
				},
				{
					text: "Annuler",
					click: function() {
							$( this ).dialog( "close" );
							}
				}
			  ],
		width: 400,
		autoOpen: false,
		modal:true
	});
</script>











<!-- BOITE DE DIALOGUE ajoute PD ================================== -->

<div id="boite_ajout_PD" title="Ajout d'un correcteur PD">
  <div class="boite_contenu">
	<div class="boite_table_equation" >
		<img src="http://latex.codecogs.com/gif.latex?H(p)=K_d(1+\tau_dp)" alt="H(p)=Kd(1+Td p)"/>
	</div>
  	<table class="boite_table">
  		<tr>
  			<td class="boite_table_label"><label for="ajout_PD_input_Kd">K<sub>d</sub> = </label></td>
  			<td class="boite_table_input"><input type="number" name="ajout_PD_input_Kd" id="ajout_PD_input_Kd" value="1" min="0" step="0.1" size="6"/></td>
  		</tr>
  		<tr>
  			<td class="boite_table_label"><label for="ajout_PD_input_Td">&#964;<sub>d</sub> (en s) = </label></td>
  			<td class="boite_table_input"><input type="number" name="ajout_PD_input_Td" id="ajout_PD_input_Td" value="1" min="0" step="0.1"  size="6"/></td>
  		</tr>
  		<tr>
  			<td class="boite_table_label"><label for="ajout_PD_input_Inverse">Inverse ? </label>
  			</td><td class="boite_table_input"><input type="checkbox" name="ajout_PD_input_Inverse" id="ajout_PD_input_Inverse"/></td>
  		</tr>
  	</table>
  	<div class="boite_commentaire">
  		<label for="ajout_PD_input_commentaire">Commentaire</label>
  		<input type="text" name="ajout_PD_input_commentaire" id="ajout_PD_input_commentaire" placeholder="Ex : Correcteur courant"/>
  	</div>
  </div>
</div>

<script>
	$("#boite_ajout_PD").dialog({
		  buttons: [
		  		{
					text: "AJOUTER",
					click: function() {
							ajoute_fonction(new Fonction_PD(parseFloat($("#ajout_PD_input_Kd").val())   ,   parseFloat($("#ajout_PD_input_Td").val())  ,  $("#ajout_PD_input_Inverse")[0].checked    , $("#ajout_PD_input_commentaire").val()   ))
							$( this ).dialog( "close" );
							}
				},
				{
					text: "Annuler",
					click: function() {
							$( this ).dialog( "close" );
							}
				}
			  ],
		width: 400,
		autoOpen: false,
		modal:true
	});
</script>











<!-- BOITE DE DIALOGUE ajoute Avance de phase ================================== -->

<div id="boite_ajout_Avance_De_Phase" title="Ajout d'un correcteur à avance de phase">
  <div class="boite_contenu">
	<div class="boite_table_equation" >
		<img src="http://latex.codecogs.com/gif.latex?H(p)=K_d\frac{1+a\tau_dp}{1+\tau_dp}" alt="H(p)=Kd(1+a Td p)/(1+Td p)"/>
	</div>
  	<table class="boite_table">
  		<tr>
  			<td class="boite_table_label"><label for="ajout_Avance_De_Phase_input_Kd">K<sub>d</sub> = </label></td>
  			<td class="boite_table_input"><input type="number" name="ajout_Avance_De_Phase_input_Kd" id="ajout_Avance_De_Phase_input_Kd" value="1" min="0" step="0.1" size="6"/></td>
  		</tr>
  		<tr>
  			<td class="boite_table_label"><label for="ajout_Avance_De_Phase_input_Td">&#964;<sub>d</sub> (en s) = </label></td>
  			<td class="boite_table_input"><input type="number" name="ajout_Avance_De_Phase_input_Td" id="ajout_Avance_De_Phase_input_Td" value="1" min="0" step="0.1"  size="6"/></td>
  		</tr>
  		<tr>
  			<td class="boite_table_label"><label for="ajout_Avance_De_Phase_input_a">a = </label></td>
  			<td class="boite_table_input"><input type="number" name="ajout_Avance_De_Phase_input_a" id="ajout_Avance_De_Phase_input_a" value="10" min="1" step="0.1"  size="6"/></td>
  		</tr>
  		<tr>
  			<td class="boite_table_label"><label for="ajout_Avance_De_Phase_input_Inverse">Inverse ? </label>
  			</td><td class="boite_table_input"><input type="checkbox" name="ajout_Avance_De_Phase_input_Inverse" id="ajout_Avance_De_Phase_input_Inverse"/></td>
  		</tr>
  	</table>
  	<div class="boite_commentaire">
  		<label for="ajout_Avance_De_Phase_input_commentaire">Commentaire</label>
  		<input type="text" name="ajout_Avance_De_Phase_input_commentaire" id="ajout_Avance_De_Phase_input_commentaire" placeholder="Ex : Correcteur courant"/>
  	</div>
  </div>
</div>

<script>
	$("#boite_ajout_Avance_De_Phase").dialog({
		  buttons: [
		  		{
					text: "AJOUTER",
					click: function() {
							ajoute_fonction(new Fonction_Avance_De_Phase( parseFloat($("#ajout_Avance_De_Phase_input_Kd").val())   ,   parseFloat($("#ajout_Avance_De_Phase_input_Td").val())  ,   parseFloat($("#ajout_Avance_De_Phase_input_a").val())  ,  $("#ajout_Avance_De_Phase_input_Inverse")[0].checked    , $("#ajout_Avance_De_Phase_input_commentaire").val()   ))
							_paq.push(['trackEvent', 'fonction_utilisee',  'Avance de phase']);
							$( this ).dialog( "close" );
							}
				},
				{
					text: "Annuler",
					click: function() {
							$( this ).dialog( "close" );
							}
				}
			  ],
		width: 400,
		autoOpen: false,
		modal:true
	});
</script>











<!-- BOITE DE DIALOGUE ajoute Retard de phase ================================== -->

<div id="boite_ajout_Retard_De_Phase" title="Ajout d'un correcteur à retard de phase">
  <div class="boite_contenu">
	<div class="boite_table_equation" >
		<img src="http://latex.codecogs.com/gif.latex?H(p)=K_d\frac{1+\tau_dp}{1+a\tau_dp}" alt="H(p)=Kd(1+Td p)/(1+a Td p)"/>
	</div>
  	<table class="boite_table">
  		<tr>
  			<td class="boite_table_label"><label for="ajout_Retard_De_Phase_input_Ki">K<sub>i</sub> = </label></td>
  			<td class="boite_table_input"><input type="number" name="ajout_Retard_De_Phase_input_Ki" id="ajout_Retard_De_Phase_input_Ki" value="1" min="0" step="0.1" size="6"/></td>
  		</tr>
  		<tr>
  			<td class="boite_table_label"><label for="ajout_Retard_De_Phase_input_Ti">&#964;<sub>i</sub> (en s) = </label></td>
  			<td class="boite_table_input"><input type="number" name="ajout_Retard_De_Phase_input_Ti" id="ajout_Retard_De_Phase_input_Ti" value="1" min="0" step="0.1"  size="6"/></td>
  		</tr>
  		<tr>
  			<td class="boite_table_label"><label for="ajout_Retard_De_Phase_input_a">a = </label></td>
  			<td class="boite_table_input"><input type="number" name="ajout_Retard_De_Phase_input_a" id="ajout_Retard_De_Phase_input_a" value="10" min="1" step="0.1"  size="6"/></td>
  		</tr>
  		<tr>
  			<td class="boite_table_label"><label for="ajout_Retard_De_Phase_input_Inverse">Inverse ? </label>
  			</td><td class="boite_table_input"><input type="checkbox" name="ajout_Retard_De_Phase_input_Inverse" id="ajout_Retard_De_Phase_input_Inverse"/></td>
  		</tr>
  	</table>
  	<div class="boite_commentaire">
  		<label for="ajout_Retard_De_Phase_input_commentaire">Commentaire</label>
  		<input type="text" name="ajout_Retard_De_Phase_input_commentaire" id="ajout_Retard_De_Phase_input_commentaire" placeholder="Ex : Correcteur courant"/>
  	</div>
  </div>
</div>

<script>
	$("#boite_ajout_Retard_De_Phase").dialog({
		  buttons: [
		  		{
					text: "AJOUTER",
					click: function() {
							ajoute_fonction(new Fonction_Retard_De_Phase( parseFloat($("#ajout_Retard_De_Phase_input_Ki").val())   ,   parseFloat($("#ajout_Retard_De_Phase_input_Ti").val())  ,   parseFloat($("#ajout_Retard_De_Phase_input_a").val())  ,  $("#ajout_Retard_De_Phase_input_Inverse")[0].checked    , $("#ajout_Retard_De_Phase_input_commentaire").val()   ))
							_paq.push(['trackEvent', 'fonction_utilisee',  'Retard de phase']);
							$( this ).dialog( "close" );
							}
				},
				{
					text: "Annuler",
					click: function() {
							$( this ).dialog( "close" );
							}
				}
			  ],
		width: 400,
		autoOpen: false,
		modal:true
	});
</script>








<!-- BOITE DE CONNECTION ================================== -->

<div id="boite_connection" title="Connection">
	<p>Si vous avez un compte :</p>
	<table>
		<tr>
			<td>Identifiant :</td>
			<td><input type="text" name="boite_connection_login" id="boite_connection_login" placeholder="Votre identifiant" /></td>
		</tr>
		<tr>
			<td>Mot de passe :</td>
			<td><input type="password" name="boite_connection_pwd" id="boite_connection_pwd" placeholder="Votre mot de passe" /></td>
		</tr>
	</table>
</div>

<script>
	$("#boite_connection").dialog({
		  buttons: [
				{
					text: "CONNECTION",
					click: function() {
							$( this ).dialog( "close" );
							}
				},
				{
					text: "Fermer",
					click: function() {
							$( this ).dialog( "close" );
							}
				}
			  ],
		width: 400,
		autoOpen: false,
		modal:true
	})
	.prev(".ui-dialog-titlebar").css("background","#FFFFAA");
</script>








<!-- BOITE DE DIALOGUE à propos ================================== -->

<div id="boite_a_propos" title="À Propos...">
	<p><strong>Version :</strong> <?php echo $VERSION; ?></p>
	<p>Application réalisée par <a href="http://raphael.allais.eu">Raphaël ALLAIS</a>.</p>
	<p style="text-align:center">
		<a href="http://contact.allais.eu?site=bode" target="_blank"><img src="./sources/images/icone_mail.png" alt="[ @ ]"/></a>
	</p>
	<p>
		enseignant en CPGE PT au <a href="http://lyc21-eiffel.ac-dijon.fr/">lycée Gustave Eiffel de Dijon</a>
	</p>
	
	<p>Remerciements à:</p>
	<ul>
		<li>Robert PAPANICOLAS</li>
		<li>David NOËL</li>
		<li>Benjamin HAVETTE</li>
	</ul>
	
	<p style="text-align:center;">
		<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/" title="Cette œuvre est mise à disposition selon les termes de la Licence Creative Commons Attribution - Pas d’Utilisation Commerciale - Partage dans les Mêmes Conditions 4.0 International" target="_blank"><img alt="Licence Creative Commons" style="border-width:0" src="./sources/images/CC.png" /></a>
	</p>
</div>

<script>
	$("#boite_a_propos").dialog({
		  buttons: [
				{
					text: "Fermer",
					click: function() {
							$( this ).dialog( "close" );
							}
				}
			  ],
		width: 400,
		autoOpen: false,
		modal:true
	})
	.prev(".ui-dialog-titlebar").css("background","#CCDDFF");
</script>













<!-- BOITE pour télécharger ================================== -->

<div id="dialogExporter" title="Exporter le diagramme">
	<form id="formulaire_exporter" method="POST" action="telecharger.php"  target="_blank">
		<label for="selectTypeExport">Format d'export :</label>
		<select name="selectTypeExport" id="selectTypeExport" onchange="updateBoiteExporter()">
			<option value="json">JSON</option>
			<option value="svg">SVG</option>
			<option value="latex">LaTex</option>
		</select>
		<p id="description_export" style="font-style:italic;"></p>
		
		<label for="nomExport">Nom du diagramme : </label>
		<input type="text" name="nomExport" id="nomExport" onchange="updateNomExport()" placeholder="exemple : BO-Maxpid"/>
		<input type="hidden" name="action" value="telechargerGraphe" />
		<input type="hidden" name="outputExport" id="outputExport" />
	</form>
</div>

<script>
	$("#dialogExporter").dialog({
		  buttons: [
				{
					text: "Fermer",
					click: function() {
							$( this ).dialog( "close" );
							}
				},
				{
					text: "Télécharger",
					click: function() {
							$("#formulaire_exporter").submit();
							$( this ).dialog( "close" );
							_paq.push(['trackEvent', 'export', 'export', $("#selectTypeExport option:selected").val()]);
							}
				}
			  ],
		width: 600,
		autoOpen: false,
		modal:true
	})
</script>





<!-- BOITE pour Importer un json ================================== -->

<div id="dialogImporter" title="Importer un diagramme">
	<input id='dialogImporter_input_nom_fichier' type='text' name='selectedfile'>
        <input id='dialogImporter_input_fichier' type='file' name='inputfile' onChange='$("#dialogImporter_input_nom_fichier").val($(this).val())'>
        <br><br>
        <pre id="output"></pre>
</div>

<script>
	$("#dialogImporter").dialog({
		  buttons: [
				{
					text: "Fermer",
					click: function() {
							$( this ).dialog( "close" );
							}
				},
				{
					text: "Ouvrir",
					click: function() {
							ouvre_fichier_local_JSON()
							$( this ).dialog( "close" );
							}
				}
			  ],
		width: 600,
		autoOpen: false,
		modal:true
	})
</script>








<!-- BOITE accueil ================================== -->

<div id="dialogAccueil" title="Mise à jour du site !">

	<h2>18/01/23</h2>
		<ul>
			<li>Possibilité d'ajuster précisément les bornes de ω du diagramme de Bode, dans le menu "Options"</li>
		</ul>
	<h2>15/01/23</h2>
		<ul>
			<li>Ajout d'un menu "Options" afin de régler (notamment) les dimensions (en pixels) des diagrammes, et changer le format
			<br/><div style="text-align:center"><img  style="vertical-align:middle;" src="sources/images/exemple_options.png" alt=""/></div></li>
			<li>Ajout d'un cookie pour que cette fenêtre ne s'ouvre QUE s'il y a des nouveautés.</li>
			<li>Quelques bugs d'export en SVG corrigés (graduations verticales à l'envers, contours des lettres plus fins)</li>
		</ul>
	<h2>08/10/22</h2>
		<ul>
			<li><strong>Nouvelle mise à jour</strong> dans laquelle j'ai commencé à compléter l'onglet "Réponse Temporelle".
			Il y a encore quelques bugs (pas mal d'instabilités dûes aux approximations de la simulation elle-même) mais cela permet tout de même d'illustrer qualitativement l'influence des différents paramètres. Il est possible de boucler (seulement par un retour unitaire pour le moment). Pour le moment, il n'y a pas d'export de ce graphique.<br>
			<div style="text-align:center"><img style="border:solid;" src="./sources/images/exemple_temporel.png"/></div></li>
			<li>Quelques <strong>exemples de systèmes connus</strong> peuvent maintenant apparaitre dans le menu "ouvrir" (n'hésitez pas à m'envoyer les votre et/ou des corrections de ceux déjà présents)</li>
			<li>Vous disposez également d'un <strong><a href="http://contact.allais.eu?site=bode" target="_blank">formulaire de contact</a></strong> pour toute question/remarque dans le menu "Gérer".</li>
		</ul>
			
	<h2>28/05/22</h2>
		Le site a été mis à jour pour une meilleure ergonomie (même si toutes les fonctionnalités n'ont pas été recrées par choix, ou par manque de temps).
		
		<p>Vous pouvez maintenant vous déplacer plus rapidement dans le plan de Bode, en utilisant la molette de la souris.</p>
		<table style="margin:auto;font-weight:bold;">
			<tr>
				<td style="text-align:center;width:150px;">
					<img style="vertical-align:middle;" src="sources/images/click_molette.png" height="50px"/>
					<br/>Déplacement<br/>X+Y
				</td>
				<td style="text-align:center;width:150px;">
					<img style="vertical-align:middle;" src="sources/images/shift.svg" height="50px"/> + <img style="vertical-align:middle;" src="sources/images/click_molette.png" height="50px"/>
					<br/>Déplacement<br/>X
				</td>
				<td style="text-align:center;width:150px;">
					<img style="vertical-align:middle;" src="sources/images/ctrl.svg" height="50px"/> + <img style="vertical-align:middle;" src="sources/images/click_molette.png" height="50px"/>
					<br/>Déplacement<br/>Y
				</td>
			</tr>
		</table>
		
		<p>Il est aussi plus facile de zoomer avec la molette.</p>
		<table style="margin:auto;font-weight:bold;">
			<tr>
				<td style="text-align:center;width:150px;">
					<img style="vertical-align:middle;" src="sources/images/roule_molette.png" height="50px"/>
					<br/>Zoom<br/>X+Y
				</td>
				<td style="text-align:center;width:150px;">
					<img style="vertical-align:middle;" src="sources/images/shift.svg" height="50px"/> + <img style="vertical-align:middle;" src="sources/images/roule_molette.png" height="50px"/>
					<br/>Zoom<br/>X
				</td>
				<td style="text-align:center;width:150px;">
					<img style="vertical-align:middle;" src="sources/images/ctrl.svg" height="50px"/> + <img style="vertical-align:middle;" src="sources/images/roule_molette.png" height="50px"/>
					<br/>Zoom<br/>Y
				</td>
			</tr>
		</table>
		
		L'ancienne version est toujours <a href="OLD">disponible à ce lien</a>.
</div>

<script>
	$("#dialogAccueil").dialog({
		  buttons: [
				{
					text: "Fermer",
					click: function() {
							$( this ).dialog( "close" );
							}
				}
			  ],
		width: 650,
		height: 600,
		autoOpen: AUTO_OPEN_BOITE_ACCUEIL, // true
		modal:true
	})
	$("#dialogAccueil").scrollTop("0")
</script>















<!-- OUVRIR UN SYSTEME ENREGISTRÉ --------------------------- -->
<div id="dialog_ouvrir_systeme" title="Ouvrir un système existant">
	<div id="dialog_ouvrir_systeme_contenu">
	</div>
</div>


<script>
	$("#dialog_ouvrir_systeme").dialog({
		autoOpen: false,
		modal:true,
		width:900,
		height:500,
		buttons: [
			    {
			      text: "Annuler",
			      click: function() {$(this).dialog("close");}
			    }
			  ]
	});
</script>






<div id="dialog_ouvrir_systeme_absent" title="Erreur d'ouverture">
	Le système à ouvrir n'existe pas dans la base de données.
</div>


<script>
	$("#dialog_ouvrir_systeme_absent").dialog({
		autoOpen: false,
		modal:true,
		buttons: [
			    {
			      text: "Fermer",
			      click: function() {$(this).dialog("close");}
			    }
			  ]
	})
	.prev(".ui-dialog-titlebar").css("background","red");
</script>






<!-- BOITE DE DIALOGUE OPTIONS ================================== -->

<div id="boite_options" title="Options des diagrammes" data-id="-1">
  <div>
  	<form>
  		<h2>Diagramme de Bode</h2>
  		<table>
  			<tr>
  				<td><label for="option_bode_largeur">Largeurs des digramme de Bode (px) :</label></td>
  				<td><input type="number" id="option_bode_largeur" name="option_bode_largeur" value="801" placeholder="Largeur en pixel" onchange="updateLargeurBode($(this).val())" min="1"/></td>
  			</tr>
  			<tr>
  				<td><label for="option_bode_hauteur_gain">Hauteur du diagramme de gain (px) :</label></td>
  				<td><input type="number" id="option_bode_hauteur_gain" name="option_bode_hauteur_gain" value="801" placeholder="Hauteur en pixel" onchange="updateLargeurBodeGain($(this).val())" min="1"/></td>
  			</tr>
  			<tr>
  				<td><label for="option_bode_hauteur_phase">Hauteur du diagramme de phase (px) :</label></td>
  				<td><input type="number" id="option_bode_hauteur_phase" name="option_bode_hauteur_phase" value="801" placeholder="Hauteur en pixel" onchange="updateLargeurBodePhase($(this).val())" min="1"/></td>
  			</tr>
  			<tr>
  				<td><label for="option_bode_pas">"Pas" de tracé de bode (px) :</label></td>
  				<td><input type="number" id="option_bode_pas" name="option_bode_pas" value="801" placeholder="pas en pixel" onchange="updatePasBode($(this).val())" min="0.01"/></td>
  			</tr>
  			<tr>
  				<td><label for="option_bode_wmin">ω<sub>min</sub> = </label></td>
  				<td>10<sup><input type="number" id="option_bode_wmin" name="option_bode_wmin" value="801" placeholder="Puissant mini de ω" onchange="updateWmin($(this).val())"/></sup></td>
  			</tr>
  			<tr>
  				<td><label for="option_bode_wmax">ω<sub>max</sub> = </label></td>
  				<td>10<sup><input type="number" id="option_bode_wmax" name="option_bode_wmax" value="801" placeholder="Puissant maxi de ω" onchange="updateWmax($(this).val())"/></sup></td>
  			</tr>
  		</table>
  		<h2>Réponse temporelle</h2>
  		<table>
  			<tr>
  				<td><label for="option_temporel_largeur">Largeur de la réponse temporelle (px) :</label></td>
  				<td><input type="number" id="option_temporel_largeur" name="option_temporel_largeur" value="801" placeholder="Largeur en pixel" onchange="updateLargeurTemporel($(this).val())" min="1"/></td>
  			</tr>
  			<tr>
  				<td><label for="option_temporel_hauteur">Hauteur de la réponse temporelle (px) :</label></td>
  				<td><input type="number" id="option_temporel_hauteur" name="option_temporel_hauteur" value="801" placeholder="Hauteur en pixel" onchange="updateHauteurTemporel($(this).val())" min="1"/></td>
  			</tr>
  		</table>
  	</form>
  </div>
</div>

<script>
	$("#boite_options").dialog({
		  buttons: [
		  		{
					text: "Fermer",
					click: function() {
							$( this ).dialog( "close" );
							}
				},
				{
					text: "Réinitialiser",
					click: function() {
							
							}
				}
			  ],
		autoOpen: false,
		width: 650,
		modal:false
	})
</script>

