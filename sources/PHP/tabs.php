

	
	<div id="tabs">
		<ul>
			<li><a href="#tab-bode">Bode</a></li>
			<li><a href="#tab-black">Black</a></li>
			<li><a href="#tab-nyquist">Nyquist</a></li>
			<li><a href="#tab-reponse-temporelle">Réponse temporelle</a></li>
		</ul>
		
		<div id="tab-bode">
			<canvas id="canvas_bode_gain" width="800" height="400"></canvas>
			<br/>
			<canvas id="canvas_bode_phase" width="800" height="400"></canvas>
			<br/>
		</div>
		<div id="tab-black">
			À venir...
			<!-- <canvas id="canvas_black" width="500" height="300"></canvas> -->
		</div>
		<div id="tab-nyquist">
			À venir...
			<!--<canvas id="canvas_nyquist" width="500" height="300"></canvas>-->
		</div>
		<div id="tab-reponse-temporelle">
			<?php include("./sources/PHP/tab_temporel.php") ?>
		</div>
	</div>
	
	<script>
		$("#tabs").tabs();
		$("#tabs").on("tabsactivate", function( event, ui )
			{redessine_toutes_fonctions();
			updateTousLesGraphes();} );
	</script>
