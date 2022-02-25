		<div id="graphiques">
			<div id="graphique-bode-gdb">CHARGEMENT...</div>
			<div id="graphique-bode-phase">CHARGEMENT...</div>
		</div>


		<!-- Paramètres graphiques -->
		<div id="blocParametresGraphiques">
			<form	id="parametres_graphiques">
				<table>
					<tr>
						<td>
							<input type="checkbox"	id="bouton_affiche_Bode_Gdb" name="bouton_affiche_Bode_Gdb"	checked="checked" onchange="grapheBodeGdb.visible($(this)[0].checked);"/><!--afficheCacheBodeGdb()-->
							<label for="bouton_affiche_Bode_Gdb">Diagramme de Bode - Gain en db</label>
						</td>
						<td>
							<label for="champ_bode_gain_w_min">&omega;<sub>min</sub>=10</label><sup><input type="text" id="champ_bode_gain_w_min" name="champ_bode_gain_w_min" size="1" onchange="updateBodeGainBorneW()" /></sup>
						</td>
						<td>
							<label for="champ_bode_gain_w_max">&omega;<sub>max</sub>=10</label><sup><input type="text" id="champ_bode_gain_w_max" name="champ_bode_gain_w_max" size="1" onchange="updateBodeGainBorneW()"/></sup>
						</td>
						<td>
							<label for="champ_bode_gain_Gdb_min">Gdb<sub>min</sub>=</label><input type="text" id="champ_bode_gain_Gdb_min" name="champ_bode_gain_Gdb_min" size="1" onchange="updateBodeGainBorneGdb()"/>
						</td>
						<td>
							<label for="champ_bode_gain_Gdb_max">Gbd<sub>max</sub>=</label><input type="text" id="champ_bode_gain_Gdb_max" name="champ_bode_gain_Gdb_max" size="1" onchange="updateBodeGainBorneGdb()"/>
						</td>
						<td>
							<label for="champ_bode_gain_echelle_X">%X=</label><input type="text" id="champ_bode_gain_echelle_X" name="kichamp_bode_gain_echelle_X" size="1" onchange="updateBodeGainEchelleX()"/>
						</td>
						<td>
							<label for="champ_bode_gain_echelle_Y">%Y=</label><input type="text" id="champ_bode_gain_echelle_Y" name="champ_bode_gain_echelle_Y" size="1" onchange="updateBodeGainEchelleY()"/>
						</td>
					</tr>
					<tr>
						<td>
							<input type="checkbox"	id="bouton_affiche_Bode_Phase" name="bouton_affiche_Bode_Phase"	checked="checked" onchange="grapheBodePhase.visible($(this)[0].checked)"/>
							<label for="bouton_affiche_Bode_Phase">Diagramme de Bode - Phase</label>
						</td>
						<td>
							<label for="champ_bode_phase_w_min">&omega;<sub>min</sub>=10</label><sup><input type="text" id="champ_bode_phase_w_min" name="champ_bode_phase_w_min" size="1" onchange="updateBodePhaseBorneW()" /></sup>
						</td>
						<td>
							<label for="champ_bode_phase_w_max">&omega;<sub>max</sub>=10</label><sup><input type="text" id="champ_bode_phase_w_max" name="champ_bode_phase_w_max" size="1" onchange="updateBodePhaseBorneW()" /></sup>
						</td>
						<td>
							<label for="champ_bode_phase_phi_min">&phi;<sub>min</sub>=</label><input type="text" id="champ_bode_phase_phi_min" name="champ_bode_phase_phi_min" size="1" onchange="updateBodePhaseBornePhi()"/>
						</td>
						<td>
							<label for="champ_bode_phase_phi_max">&phi;<sub>max</sub>=</label><input type="text" id="champ_bode_phase_phi_max" name="champ_bode_phase_phi_max" size="1" onchange="updateBodePhaseBornePhi()"/>
						</td>
						<td>
							<label for="champ_bode_phase_echelle_X">%X=</label><input type="text" id="champ_bode_phase_echelle_X" name="champ_bode_phase_echelle_X" size="1"  onchange="updateBodePhaseEchelleX()"/>
						</td>
						<td>
							<label for="champ_bode_phase_echelle_Y">%Y=</label><input type="text" id="champ_bode_phase_echelle_Y" name="champ_bode_phase_echelle_Y" size="1"  onchange="updateBodePhaseEchelleY()"/>
						</td>
					</tr>
					<tr>
						<td>
							<br/><input type="radio" id="boutonSIPhysique-SI" name="boutonSIPhysique" value="SI" checked="checked" onchange="updateAffichageListe();"/><label for="boutonSIPhysique-SI">Je suis SI'ste. Je raisonne en <strong>coefficient d'amortissement<strong>.</label>
						</td>
					</tr>
					<tr>
						<td>
							<input type="radio" id="boutonSIPhysique-Phy" name="boutonSIPhysique" value="physique" onchange="updateAffichageListe();"/><label for="boutonSIPhysique-Phy">Je suis physicien. Je raisonne en <strong>facteur de qualité<strong>.</label>
						</td>
					</tr>
				</table>
			</form>
		</div> 
