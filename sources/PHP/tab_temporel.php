			<form>
				<!--
				<input id="bouton_perturbation" type="number" name="bouton_perturbation" onchange="FONCTION_GLOBALE.redessine_tout()" value="0">
				<label for="bouton_perturbation"> Valeur perturbation</label>
				<br/>-->
				<label for="bouton_TEMPOREL_type_entree">Type d'entrée :</label>
				<select name="bouton_TEMPOREL_type_entree" id="bouton_TEMPOREL_type_entree" onchange="update_type_entree()">
					  <option value="echelon">Echelon</option>
					  <option value="rampe">Rampe</option>
					  <option value="sinus">Sinus</option>
					  <option value="dirac">Dirac</option>
				</select>
				
				<div id="TEMPOREL_options_entrees">
					<div id="TEMPOREL_options_ECHELON" class="option_entree" style="display:block;">
						<label for="bouton_TEMPOREL_reglage_ECHELON_gain_numerique">Gain : </label>
						<input id="bouton_TEMPOREL_reglage_ECHELON_gain_numerique" type="number" name="bouton_TEMPOREL_reglage_ECHELON_gain_numerique" onchange="$('#bouton_TEMPOREL_reglage_ECHELON_gain_range').val(this.value);FONCTION_GLOBALE.redessine_tout()" value="1">
						<input type="range" id="bouton_TEMPOREL_reglage_ECHELON_gain_range" name="bouton_TEMPOREL_reglage_ECHELON_gain_range" value="1" max="10" min="0" step="0.01" oninput="$('#bouton_TEMPOREL_reglage_ECHELON_gain_numerique').val(this.value);FONCTION_GLOBALE.redessine_tout()"/>
					</div>
					<div id="TEMPOREL_options_RAMPE" class="option_entree">
						<label for="bouton_TEMPOREL_reglage_RAMPE_pente_numerique">Coefficient directeuur : </label>
						<input id="bouton_TEMPOREL_reglage_RAMPE_pente_numerique" type="number" name="bouton_TEMPOREL_reglage_RAMPE_pente_numerique" onchange="$('#bouton_TEMPOREL_reglage_RAMPE_pente_range').val(this.value);FONCTION_GLOBALE.redessine_tout()" value="1">
						<input type="range" id="bouton_TEMPOREL_reglage_RAMPE_pente_range" name="bouton_TEMPOREL_reglage_RAMPE_pente_range" value="1" max="10" min="0" step="0.01" oninput="$('#bouton_TEMPOREL_reglage_RAMPE_pente_numerique').val(this.value);FONCTION_GLOBALE.redessine_tout()"/>
					</div>
					<div id="TEMPOREL_options_SINUS" class="option_entree">
						<label for="bouton_TEMPOREL_reglage_SINUS_amplitude_numerique">Amplitude : </label>
						<input id="bouton_TEMPOREL_reglage_SINUS_amplitude_numerique" type="number" name="bouton_TEMPOREL_reglage_SINUS_amplitude_numerique" onchange="$('#bouton_TEMPOREL_reglage_SINUS_amplitude_range').val(this.value);FONCTION_GLOBALE.redessine_tout()" value="1">
						<input type="range" id="bouton_TEMPOREL_reglage_SINUS_amplitude_range" name="bouton_TEMPOREL_reglage_SINUS_amplitude_range" value="1" max="10" min="0" step="0.01" oninput="$('#bouton_TEMPOREL_reglage_SINUS_amplitude_numerique').val(this.value);FONCTION_GLOBALE.redessine_tout()"/>
						<br/>
						<label for="bouton_TEMPOREL_reglage_SINUS_pulsation_numerique">Pulsation (rad/s) : </label>
						<input id="bouton_TEMPOREL_reglage_SINUS_pulsation_numerique" type="number" name="bouton_TEMPOREL_reglage_SINUS_pulsation_numerique" onchange="$('#bouton_TEMPOREL_reglage_SINUS_pulsation_range').val(this.value);FONCTION_GLOBALE.redessine_tout()" value="1">
						<input type="range" id="bouton_TEMPOREL_reglage_SINUS_pulsation_range" name="bouton_TEMPOREL_reglage_SINUS_pulsation_range" value="1" max="50" min="0.01" step="0.01" oninput="$('#bouton_TEMPOREL_reglage_SINUS_pulsation_numerique').val(this.value);FONCTION_GLOBALE.redessine_tout()"/>
					</div>
					<div id="TEMPOREL_options_DIRAC" class="option_entree">
						<label for="bouton_TEMPOREL_reglage_DIRAC_intensite_numerique">Intensité : </label>
						<input id="bouton_TEMPOREL_reglage_DIRAC_intensite_numerique" type="number" name="bouton_TEMPOREL_reglage_DIRAC_intensite_numerique" onchange="$('#bouton_TEMPOREL_reglage_DIRAC_intensite_range').val(this.value);FONCTION_GLOBALE.redessine_tout()" value="1">
						<input type="range" id="bouton_TEMPOREL_reglage_DIRAC_intensite_range" name="bouton_TEMPOREL_reglage_DIRAC_intensite_range" value="1" max="10" min="0.0" step="0.01" oninput="$('#bouton_TEMPOREL_reglage_DIRAC_intensite_numerique').val(this.value);FONCTION_GLOBALE.redessine_tout()"/>
					</div>
				</div>
				
				<input id="bouton_retour_unitaire" type="checkbox" name="bouton_retour_unitaire" onchange="FONCTION_GLOBALE.redessine_tout()">
				<label for="bouton_retour_unitaire"> Boucler (retour unitaire)</label>
			</form>
			<br/>
			<canvas id="canvas_reponse_temporelle" width="800" height="400"></canvas>
