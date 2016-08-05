$(document).ready(function(){
	s2_1.init();
});

var s2_1 = {
	init: function(){
		$("body").find(".preloader.female").attr("src", 'res/img/data-female.png');
		$("body").find(".preloader.btn-f").attr("src", 'res/img/btn-female-on.png');
		$("body").find(".preloader.btn-m").attr("src", 'res/img/btn-male-off.png');

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
