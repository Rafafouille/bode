

//Lignes KineticJS
Kinetic.Line.prototype.exportSVG=function()
{
	var couleur=this.stroke();
	var epaisseur=this.strokeWidth();
	if(this.points().length==4)
		{
			var x1=this.points()[0]+this.getLayer().x();
			var y1=this.points()[1]+this.getLayer().y();
			var x2=this.points()[2]+this.getLayer().x();
			var y2=this.points()[3]+this.getLayer().y();
			var res='<line style="stroke:'+couleur+';stroke-width:'+epaisseur+';stroke-linecap:round;stroke-linejoin:round;" x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'"/>';
			return res;
		}
	else
		{
			var fill="none";
			var res='<polyline style="stroke:'+couleur+';stroke-width:'+epaisseur+';fill:'+fill+";";
			if(this.dash().length>1)//Si on a des pointillés...
				res+='stroke-dasharray:'+this.dash()+";";
			res+='stroke-linecap:round;stroke-linejoin:round;" points="';
			for(var i=0;i<this.points().length;i++)
				{
					if(i%2==0)//Si on est sur les X
						res+=this.points()[i]+this.getLayer().x();
					else//Si on est sur les y
						res+=this.points()[i]+this.getLayer().y();
					if(i!=this.points().length-1)
						res+=",";
				}
			res+='" />\n';
			return res;
		}

}


//Rectangles KineticJS
Kinetic.Rect.prototype.exportSVG=function()
{
	var x=this.x()+this.getLayer().x();
	var y=this.y()+this.getLayer().y();
	var couleurTraits=this.stroke();
	var remplissage=this.fill();
	var epaisseurTraits=this.strokeWidth();
	var largeur=this.width();
	var hauteur=this.height();
	return '<rect x="'+x+'" y="'+y+'" style="fill:'+remplissage+';stroke:'+couleurTraits+';stroke-width:'+epaisseurTraits+';" width="'+largeur+'" height="'+hauteur+'"/>';
}

//Rectangles KineticJS
Kinetic.Text.prototype.exportSVG=function()
{
	var x=this.x()+this.getLayer().x();
	var y=this.y()+this.getLayer().y()+this.height();
	var remplissage=this.fill();
	var taille=this.fontSize();
	var police=this.fontFamily();
	var texte=this.text();
	return '<text style="fill:'+remplissage+';font-size:'+taille+';font-family:\''+police+'\';" x="'+x+'" y="'+y+'">'+texte+'</text>\n';;
}
