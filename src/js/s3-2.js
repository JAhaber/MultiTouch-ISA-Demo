$(document).ready(function(){
	s3_2.init();
});


var s3_2 = {
	polyLarge: null,
	polySmall: null,
	init: function(){
		$(".largeHex polygon").attr("points", s3_2.hex_corner(222, 253, 175, 1) + " " + s3_2.hex_corner(222, 253, 175, 2) + " " + s3_2.hex_corner(222, 253, 175, 3) + " " + s3_2.hex_corner(222, 253, 175, 4) + " " + s3_2.hex_corner(222, 253, 175, 5) + " " + s3_2.hex_corner(222, 253, 175, 6));
		$(".middleHex polygon").attr("points", s3_2.hex_corner(222, 253, 128, 1) + " " + s3_2.hex_corner(222, 253, 128, 2) + " " + s3_2.hex_corner(222, 253, 128, 3) + " " + s3_2.hex_corner(222, 253, 128, 4) + " " + s3_2.hex_corner(222, 253, 128, 5) + " " + s3_2.hex_corner(222, 253, 128, 6));
		
		$("body").hammer({domEvents:true}).on("tap", function(){
			s3_2.animate();
		});

		// var div;

		// for (var i = 0; i < $(".largeHex polygon")[0].points.length; i++)
		// {
		// 	div = $("<div class='point' data-pX='" + $(".largeHex polygon")[0].points[i].x + "' data-pY='" + $(".largeHex polygon")[0].points[i].y + "'></div>");
		// 	div.css({"left": $(".largeHex polygon")[0].points[i].x - 25, "top": $(".largeHex polygon")[0].points[i].y - 25});
		//     $(".largeHexMap").append(div);

		//     div = $("<div class='point' data-pX='" + $(".middleHex polygon")[0].points[i].x + "' data-pY='" + $(".middleHex polygon")[0].points[i].y + "'></div>");
		//     div.css({"left": $(".middleHex polygon")[0].points[i].x - 25, "top": $(".middleHex polygon")[0].points[i].y - 25});
		//     $(".middleHexMap").append(div);
		// }

		// $(".point").on("touchmove", function(e){
		// 	e = e.originalEvent.touches[0];
		//     var div = $(this);
		//     var off = $(div).parent().offset();
		//     // Center box under finger
		//     var newPos = s3_2.checkBounds(e.pageX - off.left, e.pageY - off.top);
		//     var x = newPos[0] - 25;
		//     var y = newPos[1] - 25;
		//     div.css({"left":x, "top":y});

		//     var poly;

		//     if (div.parent().hasClass("largeHexMap"))
		//     	poly = $(".largeHex polygon")[0];
		//     else
		//     	poly = $(".middleHex polygon")[0];

		//     for (var i = 0; i < poly.points.length; i++)
		// 	{
		// 		if (poly.points[i].x == div.attr("data-pX") && poly.points[i].y == div.attr("data-pY")){
		// 			poly.points[i].x = newPos[0];
		// 			poly.points[i].y = newPos[1];
		// 			div.attr("data-pX", newPos[0]);
		// 			div.attr("data-pY", newPos[1]);
		// 		}
		// 	}

		// });
	},
	animate: function(){
		s3_2.polyLarge = {countX: $(".largeHex polygon")[0].points[4].x, countY: $(".largeHex polygon")[0].points[4].y};
		s3_2.polySmall = {countX: $(".middleHex polygon")[0].points[5].x, countY: $(".middleHex polygon")[0].points[5].y};
		TweenMax.to(s3_2.polyLarge, 2.5, {countX: 440, delay: 1.5, onUpdate:s3_2.animateGraphX, onUpdateParams: ["polyLarge", ".largeHex", 4], ease: Power4.easeOut});
		TweenMax.to(s3_2.polyLarge, 2.5, {countY: 127, delay: 1.5, onUpdate:s3_2.animateGraphY, onUpdateParams: ["polyLarge", ".largeHex", 4], ease: Power4.easeOut});
		TweenMax.to(s3_2.polySmall, 2.5, {countX: 440, delay: 1.5, onUpdate:s3_2.animateGraphX, onUpdateParams: ["polySmall", ".middleHex", 5], ease: Power4.easeOut});
		TweenMax.to(s3_2.polySmall, 2.5, {countY: 378, delay: 1.5, onUpdate:s3_2.animateGraphY, onUpdateParams: ["polySmall", ".middleHex", 5], ease: Power4.easeOut});
	},
	animateGraphX: function(id, poly, point){
		$(poly + " polygon")[0].points[point].x = s3_2[id].countX;
	},
	animateGraphY: function(id, poly, point){
		$(poly + " polygon")[0].points[point].y = s3_2[id].countY;
	},
	hex_corner: function(centerX, centerY, s, i){
	    var angle_deg = 60 * i + 30;
	    var angle_rad = Math.PI / 180 * angle_deg;
	    return (centerX + s * Math.cos(angle_rad))+","+(centerY + s * Math.sin(angle_rad));
	}//,
	// checkBounds: function(x, y){
	// 	if (x < $("svg").width()/2){
	// 		if (y <= 128){
	// 			console.log(Math.hypot(128, $("svg").width()/2));
	// 			console.log("top-left");
	// 		}
	// 		else if (y > 128 && y < $("svg").height() - 128)
	// 		{
	// 			if (x < 0)
	// 				return [0, y];
	// 		}
	// 		else if (y >= $("svg").height() - 128)
	// 		{
	// 			console.log("bottom-left");
	// 		}
	// 	 }
	// 	else{
	// 		if (y <= 128){
	// 			console.log("top-right");
	// 		}
	// 		else if (y > 128 && y < $("svg").height() - 128)
	// 		{
	// 			if (x > $("svg").width())
	// 				return [$("svg").width(), y];
	// 		}
	// 		else if (y >= $("svg").height() - 128)
	// 		{
	// 			console.log("bottom-right");
	// 		}
	// 	}
	// 	return [x, y];
	// }
}

