$(document).ready(function(){
	s3_2.init();
});


var s3_2 = {
	polys: null,
	init: function(){
		$(".Hex #hexLarge").attr("points", s3_2.hex_corner(222, 253, 175, 1) + " " + s3_2.hex_corner(222, 253, 175, 2) + " " + s3_2.hex_corner(222, 253, 175, 3) + " " + s3_2.hex_corner(222, 253, 175, 4) + " " + s3_2.hex_corner(222, 253, 175, 5) + " " + s3_2.hex_corner(222, 253, 175, 6));
		$(".Hex #hexMiddle").attr("points", s3_2.hex_corner(222, 253, 128, 1) + " " + s3_2.hex_corner(222, 253, 128, 2) + " " + s3_2.hex_corner(222, 253, 128, 3) + " " + s3_2.hex_corner(222, 253, 128, 4) + " " + s3_2.hex_corner(222, 253, 128, 5) + " " + s3_2.hex_corner(222, 253, 128, 6));
	},
	animate: function(){
		s3_2.polys = {
			polyMiddleX: $(".Hex #hexMiddle")[0].points.getItem(5).x,
			polyMiddleY: $(".Hex #hexMiddle")[0].points.getItem(5).y,
			polyLargeX: $(".Hex #hexLarge")[0].points.getItem(4).x, 
			polyLargeY: $(".Hex #hexLarge")[0].points.getItem(4).y
		};
		TweenMax.to(s3_2.polys, 2.5, {polyLargeX: 440, polyLargeY: 127, polyMiddleX: 440, polyMiddleY: 378, delay: 1.5, onUpdate:s3_2.animateGraph, ease: Power4.easeOut});
		//TweenMax.to(s3_2.polySmall, 2.5, {countX: 440, countY: 378, delay: 1.5, onUpdate:s3_2.animateGraph, onUpdateParams: ["polySmall", ".Hex #hexMiddle", 5], ease: Power4.easeOut});
	},
	animateGraph: function(){

		$(".Hex #hexMiddle")[0].points.getItem(5).x = s3_2.polys.polyMiddleX;
		$(".Hex #hexMiddle")[0].points.getItem(5).y = s3_2.polys.polyMiddleY;		
		$(".Hex #hexLarge")[0].points.getItem(4).x = s3_2.polys.polyLargeX;
		$(".Hex #hexLarge")[0].points.getItem(4).y = s3_2.polys.polyLargeY;	
	},
	hex_corner: function(centerX, centerY, s, i){
	    var angle_deg = 60 * i + 30;
	    var angle_rad = Math.PI / 180 * angle_deg;
	    return (centerX + s * Math.cos(angle_rad))+","+(centerY + s * Math.sin(angle_rad));
	}
}

