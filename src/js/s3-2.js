$(document).ready(function(){
	s3_2.init();
});


var s3_2 = {
	polyLarge: [],
	polySmall: [],
	polyCounter: {
		smX: null,
		smY: null,
		lgX: null,
		lgY: null
	},
	init: function(){
		//Create the array of polygon points
		for (var i = 0; i <= 5; i++ ){
			s3_2.polyLarge.push(s3_2.hex_corner(222, 253, 175, i));
			s3_2.polySmall.push(s3_2.hex_corner(222, 253, 128, i));
		}

		//Draw the large polygon to the canvas
		var c1 = document.getElementById("hexCanvasLarge").getContext('2d');
		c1.fillStyle = '#b01f5f';
		c1.shadowColor = '#8b194b';
	      c1.shadowBlur = 10;
	      c1.shadowOffsetX = 0;
	      c1.shadowOffsetY = 0;
		c1.beginPath();
		c1.moveTo(s3_2.polyLarge[0].x, s3_2.polyLarge[0].y);
		for (var i = 1; i <= 5; i++ ){
			c1.lineTo(s3_2.polyLarge[i].x, s3_2.polyLarge[i].y);
		}
		c1.closePath();
		c1.fill();

		//Draw the small polygon to the canvas
		var c2 = document.getElementById("hexCanvasSmall").getContext('2d');
		c2.fillStyle = '#9b7a69';
		c2.shadowColor = '#8b194b';
	      c2.shadowBlur = 50;
	      c2.shadowOffsetX = 0;
	      c2.shadowOffsetY = 0;
		c2.beginPath();
		c2.moveTo(s3_2.polySmall[0].x, s3_2.polySmall[0].y);
		for (var i = 1; i <= 5; i++ ){
			c2.lineTo(s3_2.polySmall[i].x, s3_2.polySmall[i].y);
		}
		c2.closePath();
		c2.fill();
	},
	animate: function(){
		s3_2.polyCounter = {
			smX: s3_2.polySmall[0].x,
			smY: s3_2.polySmall[0].y,
			lgX: s3_2.polyLarge[5].x, 
			lgY: s3_2.polyLarge[5].y
		};
		TweenMax.to(s3_2.polyCounter, 2.5, {lgX: 440, lgY: 127, smX: 440, smY: 378, delay: 1, onUpdate:s3_2.animateGraph, ease: Power4.easeOut});
	},
	animateGraph: function(){
		var c = document.getElementById("hexCanvasLarge");
		var c1 = c.getContext('2d');
		c1.clearRect(0, 0, c.width, c.height);
		c1.beginPath();
		c1.moveTo(s3_2.polyLarge[0].x, s3_2.polyLarge[0].y);
		for (var i = 1; i <= 5; i++ ){
			if (i === 5){
				c1.lineTo(s3_2.polyCounter.lgX, s3_2.polyCounter.lgY);
			}
			else
				c1.lineTo(s3_2.polyLarge[i].x, s3_2.polyLarge[i].y);
		}
		c1.closePath();
		c1.fill();

		var c2 = document.getElementById("hexCanvasSmall").getContext('2d');
		c2.clearRect(0, 0, c.width, c.height);
		c2.beginPath();
		c2.moveTo(s3_2.polyCounter.smX, s3_2.polyCounter.smY);
		for (var i = 1; i <= 5; i++ ){
				c2.lineTo(s3_2.polySmall[i].x, s3_2.polySmall[i].y);
		}
		c2.closePath();
		c2.fill();
	},
	hex_corner: function(centerX, centerY, s, i){
	    var angle_deg = 60 * i + 30;
	    var angle_rad = Math.PI / 180 * angle_deg;
	    return {x: centerX + s * Math.cos(angle_rad), y:centerY + s * Math.sin(angle_rad)};
	}
}

