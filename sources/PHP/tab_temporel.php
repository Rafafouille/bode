			<form>
				<input id="bouton_retour_unitaire" type="checkbox" name="bouton_retour_unitaire" onchange="FONCTION_GLOBALE.redessine_tout()">
				<label for="bouton_retour_unitaire"> Boucler (retour unitaire)</label>
				<br/>
				<input id="bouton_perturbation" type="number" name="bouton_perturbation" onchange="FONCTION_GLOBALE.redessine_tout()" value="0">
				<label for="bouton_perturbation"> Valeur perturbation</label>
			</form>
			<br/>
			<canvas id="canvas_reponse_temporelle" width="800" height="400"></canvas>
