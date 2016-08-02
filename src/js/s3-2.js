$(document).ready(function(){
	s3_2.init();
});


var s3_2 = {
	init: function(){
		$(".largeHex polygon").attr("points", s3_2.hex_corner(222, 253, 175, 1) + " " + s3_2.hex_corner(222, 253, 175, 2) + " " + s3_2.hex_corner(222, 253, 175, 3) + " " + s3_2.hex_corner(222, 253, 175, 4) + " " + s3_2.hex_corner(222, 253, 175, 5) + " " + s3_2.hex_corner(222, 253, 175, 6));
		$(".middleHex polygon").attr("points", s3_2.hex_corner(222, 253, 128, 1) + " " + s3_2.hex_corner(222, 253, 128, 2) + " " + s3_2.hex_corner(222, 253, 128, 3) + " " + s3_2.hex_corner(222, 253, 128, 4) + " " + s3_2.hex_corner(222, 253, 128, 5) + " " + s3_2.hex_corner(222, 253, 128, 6));
		
	},
	hex_corner: function(centerX, centerY, s, i){
	    var angle_deg = 60 * i + 30;
	    var angle_rad = Math.PI / 180 * angle_deg;
	    return (centerX + s * Math.cos(angle_rad))+","+(centerY + s * Math.sin(angle_rad));
	}
}

