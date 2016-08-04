$(document).ready(function(){
	global.init();
});


var global = {
	init: function(){
		global.checkSession();
		$("body").hammer({domEvents:true}).on("tap", ".menuVersionToggle", function(){
			if (touchMenu.version === "fluid"){
				touchMenu.version = "static";
				localStorage.setItem("demoTouchMenuVersion", "static");
				$(".menuVersionToggle").addClass("static");
			}
			else{
				touchMenu.version = "fluid";
				localStorage.setItem("demoTouchMenuVersion", "fluid");
				$(".menuVersionToggle").removeClass("static");
			}
			emptyAll();
			touchMenu.allPointsActive = false;
			localStorage.removeItem("demoTouchMenu");
		});

		$("body").hammer({domEvents:true}).on("tap", function(){
			if($("body").attr("data-slideid") !== "1" && $(".headline").css("opacity") == 1){
				TweenMax.to($(".headline"), 1, {opacity: 0, display: "none", ease: Power4.easeOut});
				TweenMax.to($(".content"), 1, {opacity: 1, ease: Power4.easeIn, onComplete: global.runAnimations});
			}
		});
	},
	runAnimations: function(){
		switch ($("body").attr("data-slideid")){
			case "2":
				s1_1.chartAnimation();
				break;
			case "7":
				s3_2.animate();
				break;
		}
	},
	checkSession: function(){
		//Grab the saved Call ID from the last slide viewed
		var callID = localStorage.getItem("demoCallID");

		//Grab the Call ID for the current presentation from Veeva
		// com.veeva.clm.getDataForCurrentObject("Call", "Id", function(data){
		// 	if (data.success){
		// 		//If the Call ID does not match the saved ID, reset values
		// 		if (!(data.Call.Id == callID)){
		// 			localStorage.setItem("demoCallID", data.Call.Id);
		// 			localStorage.removeItem("demoTouchMenu");
		//			localStorage.removeItem("demoTouchMenuVersion");
		// 		}
		// 	}
			// else{
				if (localStorage.getItem("demoTouchMenuVersion") === "static"){
						touchMenu.version = "static";
						touchMenu.getExistingMenuLocation();
						$(".menuVersionToggle").addClass("static");
					}
			// }

			
		// });

	}
}
