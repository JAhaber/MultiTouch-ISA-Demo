$(document).ready(function(){
	s2_2.init();
});

var s2_2 = {
	optVals:[0,0,0],
	graph1Counter: {count: 0},
	init: function(){
		$("body").hammer({domEvents:true}).on("tap", ".btn-reset", function(e){
			$(".data").html("0");
			s2_2.optVals = [0,0,0];
		});

		$("body").hammer({domEvents:true}).on("tap", ".btn-calc", function(e){
			TweenMax.to($(".content"), 1, {opacity: 0, display: "none", ease: Power4.easeOut});
			TweenMax.to($(".chart"), 1, {opacity: 1, ease: Power4.easeIn, onComplete: s2_2.createGraph});
		});

		$("body").hammer({domEvents:true}).on("tap", ".btn-opt", function(e){
			var i = $(this).attr("data-opt");
			s2_2.updateData(i);
		});

	},
	updateData: function(i){
		s2_2.optVals[i-1] += 1;
		$(".data-opt" + i).html(s2_2.optVals[i-1]);
	},
	createGraph: function(){
		s2_2.drawGraph("group1", 350);
	},
	drawGraph: function(group, offset){
		var verticalBottom = 400;

		TweenMax.to(s2_2.graph1Counter, 3, {count: verticalBottom, onUpdate:s2_2.animateGraph, onUpdateParams: [group, offset, verticalBottom], ease: Power4.easeOut});
	},
	animateGraph: function(group, offset, verticalBottom){
		var c = document.getElementById(group);
		var ctx = c.getContext("2d");
		var maxWidth = 300;
		var bottomCurve = 90;
		var maxHeight = 400;
		var offsetX = offset - maxWidth/2;
		console.log(s2_2.graph1Counter.count);
		ctx.clearRect(0, 0, c.width, c.height);
		ctx.fillStyle = "#4a63ae";
		 ctx.beginPath();
		  ctx.moveTo(0 + offsetX, verticalBottom);
		  ctx.bezierCurveTo(bottomCurve + offsetX, verticalBottom, maxWidth/4 + offsetX, maxHeight - s2_2.graph1Counter.count, maxWidth/2 + offsetX, maxHeight - s2_2.graph1Counter.count);
		  ctx.bezierCurveTo(maxWidth*3/4 + offsetX, maxHeight - s2_2.graph1Counter.count, maxWidth - bottomCurve + offsetX, verticalBottom, maxWidth + offsetX, verticalBottom);

		ctx.fill();

	}
}
