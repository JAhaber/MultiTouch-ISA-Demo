$(document).ready(function(){
	global.init();
});


var global = {
	init: function(){
		global.checkSession();
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
		// 		}
		// 	}

			
		// });
		touchMenu.getExistingMenuLocation();
	}
}
