$(document).ready(function(){
	s1_1.init();
});

var s1_1 = {
	tl: null,
	timer: 2,
	init: function(){
		s1_1.tl = new TimelineMax({delay:0.5});
		s1_1.tl.to($(".greenLine"), s1_1.timer, {width: "747px", ease: Power2.easeOut}, 0)
			.to($(".greenShade"), s1_1.timer, {height: "245px", ease: Power2.easeOut}, s1_1.timer)
			.to($(".greenLabel"), 1, {opacity: 1, ease: Power2.easeOut}, s1_1.timer * 2)
			.to($(".blueLine"), s1_1.timer, {width: "747px", ease: Power2.easeOut}, s1_1.timer/2)
			.to($(".blueShade"), s1_1.timer, {height: "283px", ease: Power2.easeOut}, s1_1.timer * 1.5)
			.to($(".blueLabel"), 1, {opacity: 1, ease: Power2.easeOut}, s1_1.timer * 2.5);
		s1_1.tl.pause();

	},
	chartAnimation: function(){
		s1_1.tl.play();
	}
}
