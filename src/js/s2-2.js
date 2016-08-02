$(document).ready(function(){
	s2_2.init();
});

var s2_2 = {
	optVals:[0,0,0],
	graphCounter: {
		1: {count: 0},
		2: {count: 0},
		3: {count: 0}},
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
		var maxHeight = 400;
		s2_2.drawGraph("1", 350, "#4a63ae", 0);
		s2_2.drawGraph("2", 475, "#8deb6b", 200);
		s2_2.drawGraph("3", 225, "#324683", 120);
	},
	drawGraph: function(group, offset, clr, maxHeight){
		var verticalBottom = 400;
		s2_2.graphCounter[group].count = verticalBottom;
		TweenMax.to(s2_2.graphCounter[group], 3, {count: maxHeight, onUpdate:s2_2.animateGraph, onUpdateParams: [group, offset, verticalBottom, clr, maxHeight], ease: Power4.easeOut});
	},
	animateGraph: function(group, offset, verticalBottom, clr, maxHeight){
		var c = document.getElementById("group" + group);
		var ctx = c.getContext("2d");
		var maxWidth = 300;
		var bottomCurve = 90;
		var offsetX = offset - maxWidth/2;
		ctx.clearRect(0, 0, c.width, c.height);
		ctx.fillStyle = clr;
		ctx.beginPath();
		ctx.moveTo(0 + offsetX, verticalBottom);
		ctx.bezierCurveTo(bottomCurve + offsetX, verticalBottom, maxWidth/4 + offsetX, s2_2.graphCounter[group].count, maxWidth/2 + offsetX,s2_2.graphCounter[group].count);
		ctx.bezierCurveTo(maxWidth*3/4 + offsetX, s2_2.graphCounter[group].count, maxWidth - bottomCurve + offsetX, verticalBottom, maxWidth + offsetX, verticalBottom);

		ctx.fill();

	}
}
