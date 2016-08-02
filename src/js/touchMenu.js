$(document).ready(function(){
	touchMenu.init();
});

var touchMenu = {
	area: $("body"), // Selector for touch events
	buttonDiameter: 68, //Used for calculating button position - should match css width/height
	allPointsActive: false, //True when the menu is locked to the screen
	numTouches: 3, //Number of touches in the menu
	touchStatus: [], //Status of each finger touch, one element toggles to true whenever a finger touches the screen, and false whenever one is removed
	version: "fluid",
	init: function(){
		//Init the home page button on the logo
		$("body .home-btn").hammer().on("tap", function(e){
			e.stopPropagation();
			e.preventDefault();
			window.location = 'veeva:gotoSlide(' + $(this).attr("data-slide") + '.zip)';
		})

		//Event handler for the finger menu items when they are enabled
		$("body").hammer({domEvents:true}).on("tap", ".finger", function(e){
			e.stopPropagation();
			e.preventDefault();
			touchMenu.goToSlide(this);
		})

		//Add all the touch states to the array depending on how many touches are allowed in numTouches
		for (var i = 0; i < touchMenu.numTouches; i++){
			touchMenu.touchStatus.push(false);
		}

		//Hammer swipeup event to clear the menu when it is locked.
		var hammer = new Hammer(touchMenu.area[0]);
		hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
		hammer.on("swipeup", function(ev) {
			if (touchMenu.allPointsActive === true){
				$(".finger").each(function(i, val){
					delDiv($(this).attr("id"));
				})
				emptyAll();
				touchMenu.allPointsActive = false;
				localStorage.removeItem("demoTouchMenu");
			}
		});

		//Add a new div when a finger touches the screen if the menu isn't locked
		touchMenu.area.bind("touchstart", function(e) {
			if (touchMenu.allPointsActive === false){
			    forEachChangedFinger(e, function(e2, id) {
			        createDiv(id);
			        moveBox(id, e2);
			    });
			    var allPointsActive = true;
			    for (var i = 0; i < touchMenu.touchStatus.length; i++){
			    	if (touchMenu.touchStatus[i] === false){
			    		allPointsActive = false;
			    	}
			    } 

			    if (allPointsActive === true){
			    	sortMenu(e.originalEvent.touches);
			    	if (touchMenu.version === "static")
			    		touchMenu.allPointsActive = true;
			    }
			}
		})
		//Re-calculate div positions whenever a finger moves
		.bind("touchmove", function(e) {
			if (touchMenu.allPointsActive === false){
			    e.preventDefault(); // prevent page scroll

			    forEachChangedFinger(e, function(e2, id) {
			        moveBox(id, e2);
			    });
			}
		})
		//Clear the div under any finger that stops touching the page if the menu isn't locked yet
		.bind("touchend", function(e) {
			if (touchMenu.allPointsActive === false){
			    forEachChangedFinger(e, function(e2, id) {
			    	if (touchMenu.version === "static" || (touchMenu.version === "fluid" && e.originalEvent.touches.length === 0))
			       		delDiv(id);
			    });
			}
		})
		//Clear everything if there are no touch events left (fallback in case something didn't clear properly)
		.bind("touchcancel", function(e) {
			if (touchMenu.allPointsActive === false){
			    emptyAll();
			}
		});
	},
	goToSlide: function(btn){
		var slideID = $("body").attr("data-slideid");

		if ($(btn).hasClass("menuItem0")){
			if (slideID >= 2 && slideID < 3){
				window.location = 'veeva:nextSlide()';
			}
			else{
				for (var i = 0; i < pathNames.length; i++)
				{
					if (parseInt(pathNames[i].id) === 2){
						window.location = "veeva:gotoSlide(" + pathNames[i].file + ")";
					}
				}
			}
		}
		else if ($(btn).hasClass("menuItem1")){
			if (slideID >= 4 && slideID < 5){
				window.location = 'veeva:nextSlide()';
			}
			else{
				for (var i = 0; i < pathNames.length; i++)
				{
					if (parseInt(pathNames[i].id) === 4){
						window.location = "veeva:gotoSlide(" + pathNames[i].file + ")";
					}
				}
			}
		}
		else if ($(btn).hasClass("menuItem2")){
			if (slideID >= 6 && slideID < 7){
				window.location = 'veeva:nextSlide()';
			}
			else{
				for (var i = 0; i < pathNames.length; i++)
				{
					if (parseInt(pathNames[i].id) === 6){
						window.location = "veeva:gotoSlide(" + pathNames[i].file + ")";
					}
				}
			}
		}
	},
	getExistingMenuLocation: function(){
		var menuStore = JSON.parse(localStorage.getItem("demoTouchMenu"));
		if (menuStore !== null){
			for (var i = 0; i < menuStore.length; i++){
				createDiv(i);
				$("#"+i).addClass(menuStore[i].class);
				$("#"+i).css({"left": menuStore[i].posX, "top": menuStore[i].posY});
			}
			touchMenu.allPointsActive = true;
		}
	}
}

function emptyAll(){
	touchMenu.area.find(".finger").remove();
    for (var i = 0; i < touchMenu.touchStatus.length; i++){
    	touchMenu.touchStatus[i] = false;
    }
}

// extract each finger data from list, call callback
function forEachChangedFinger(e, cb) {
    e = e.originalEvent;

    // e.changedTouches is a list of finger events that were changed
    for (var i = 0; i < e.changedTouches.length; i++) {
        var finger = e.changedTouches[i];
        var id = finger.identifier;
        cb(finger, id);
    }
}

function createDiv(id) {
    var count = touchMenu.area.find(".finger").length;
    for (var i = 0; i < touchMenu.touchStatus.length; i++){
    	if (touchMenu.touchStatus[i] === false){
    		var div = $("<div class='finger'></div>");
		    touchMenu.area.append(div);
		    div.attr("id", id);
		    touchMenu.touchStatus[i] = id;

		    break;
    	}
    } 
}

//Sort the menu so the first item is on the top most touch event
//Assign the sorted divs the appropriate menu class
function sortMenu(points){
	
	var arr = [];
	var menuStore = [];
	for (var i = 0; i < points.length; i++){
		arr.push(points[i]);
	}
	arr.sort(function(a, b){
		return a.pageY - b.pageY;
	});
	for (var i = 0; i < arr.length; i++){
		$("#"+arr[i].identifier).addClass("menuItem" + i);
		menuStore.push({
			posX: $("#"+arr[i].identifier).css("left"),
			posY: $("#"+arr[i].identifier).css("top"),
			class: "menuItem" + i,
		});
	}
	localStorage.setItem("demoTouchMenu", JSON.stringify(menuStore));
}

function delDiv(id) {
	if (touchMenu.version === "static"){
	    $("#"+id).remove();
	    for (var i = 0; i < touchMenu.touchStatus.length; i++){
	    	if (touchMenu.touchStatus[i] === id){
			    touchMenu.touchStatus[i] = false;
			    break;
	    	}
	    }
	}
	else if (touchMenu.version === "fluid"){
		if ($(".finger").length > 0){
			touchMenu.allPointsActive = true;
			setTimeout(function(){
				$(".finger").addClass("hide");
			    // $("#"+id).remove();
			    setTimeout(function(){
				    $(".finger").remove();
				    for (var i = 0; i < touchMenu.touchStatus.length; i++){
				    	touchMenu.touchStatus[i] = false;
				    }
				    touchMenu.allPointsActive = false;
				},500);
			},500);
		}
	}
}

// move box on screen
function moveBox(id, e) {
    var div = $("#"+id);
    var off = $("body").offset();
    // Center box under finger
    var x = e.pageX - off.left - touchMenu.buttonDiameter/2;
    var y = e.pageY - off.top - touchMenu.buttonDiameter/2;
    div.css({"left":x, "top":y});
}