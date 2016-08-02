$(document).ready(function(){
	s2_1.init();
});

var s2_1 = {
	init: function(){
		$("body").hammer({domEvents:true}).on("tap", ".btn-male", function(){
			TweenMax.to($(".data-female"), 0.5, {opacity: 0, ease: Power4.easeOut});
			TweenMax.to($(".data-male"), 0.5, {opacity: 1, ease: Power4.easeIn}, 0);
			$(".btn").removeClass("on");
			$(this).addClass("on");
		});

		$("body").hammer({domEvents:true}).on("tap", ".btn-female", function(){
			TweenMax.to($(".data-male"), 0.5, {opacity: 0, ease: Power4.easeOut});
			TweenMax.to($(".data-female"), 0.5, {opacity: 1, ease: Power4.easeIn}, 0);
			$(".btn").removeClass("on");
			$(this).addClass("on");
		});

	}
}