$(document).ready(function(){
	s2_2.init();
});

var s2_2 = {
	optVals:[0,0,0],
	init: function(){
		$("body").hammer({domEvents:true}).on("tap", ".btn-reset", function(e){
			$(".data").html("0");
			s2_2.optVals = [0,0,0];
		});

		$("body").hammer({domEvents:true}).on("tap", ".btn-calc", function(e){
			TweenMax.to($(".content"), 1, {opacity: 0, display: "none", ease: Power4.easeOut});
			TweenMax.to($(".graph"), 1, {opacity: 1, ease: Power4.easeIn, onComplete: s2_2.drawGraph});
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
	drawGraph: function(){

	}
}
