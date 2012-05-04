$(document).ready(function(){
	// Hide the settings when the page laods
	$("#settings-detail").hide();
	
	// Set up settings button
	$("#settings").click(function(){
		$("#settings-detail").toggle(100);
	});
	
	// Update colors when changing month
	$("#month").change(setColorsOnDashboard);
	
	// Reset to defaults on click of reset defaults button
	$("#setDefaults").click(function(){
		$.each(defaults, function(key,value){
			localStorage[key] = value;
			$("#"+key).val(localStorage[key]);
		});
	});
	
	// Defualt settings
	var defaults = {
		"kgPerDayAvg": 510,
		"kgPerDayLow": 430,
		"transactionsPerDay": 100, 
		"humidityMax": 14, 
		"humidityMin": 11, 
		"kgPerMonth": 11000,
		"transactionsPerMonth": 3000
	};
	
	// Save changes to settings here
	$("input").change( function() {
		key = $(this).attr("id");
		value = $(this).val();
		localStorage[key] = value;
		setColorsOnDashboard();
	});
		
	// Load data from localStorage
	$.each(defaults, function(key,value){
		// set defaults on first run
		if(!localStorage[key]){
			localStorage[key] = value;
		}
		// fill in the value to the inputs
		$("#"+key).val(localStorage[key]);
		setColorsOnDashboard();
	});
	
	function setColorsOnDashboard(){
		// kgPerDay
		kgPerDay = $("#kgPerDayRecorded").html();
		if (Number(kgPerDay) > Number(localStorage["kgPerDayAvg"])){
			$("#kgPerDayContainer").removeClass("red");
			$("#kgPerDayContainer").removeClass("yellow");
			$("#kgPerDayContainer").addClass("green");
		}
		else if(Number(kgPerDay) > Number(localStorage["kgPerDayLow"])){
			$("#kgPerDayContainer").removeClass("red");
			$("#kgPerDayContainer").removeClass("green");
			$("#kgPerDayContainer").addClass("yellow");
		}
		else {
			$("#kgPerDayContainer").removeClass("yellow");
			$("#kgPerDayContainer").removeClass("green");
			$("#kgPerDayContainer").addClass("red");
		}
		
		transactionsPerDay =  $("#transactionsPerDayRecorded").html();
		if (Number(transactionsPerDay) > Number(localStorage["transactionsPerDay"])){
			$("#transactionsPerDayContainer").removeClass("red");
			$("#transactionsPerDayContainer").addClass("green");
		}
		else{
			$("#transactionsPerDayContainer").removeClass("green");
			$("#transactionsPerDayContainer").addClass("red");
		}
		
		humidity = $("#humidityRecorded").html();
		if (Number(humidity) > Number(localStorage["humidityMax"]) || Number(humidity) < Number(localStorage["humidityMin"])){
			$("#humidityContainer").removeClass("green");
			$("#humidityContainer").addClass("red");
		}
		else{
			$("#humidityContainer").removeClass("red");
			$("#humidityContainer").addClass("green");
		}
		
		kgPerMonthRecorded = $("#kgPerMonthRecorded").html();
		if (Number(kgPerMonthRecorded) > Number(localStorage["kgPerMonth"])){
			$("#kgPerMonthContainer").removeClass("red");
			$("#kgPerMonthContainer").addClass("green");
		}
		else{
			$("#kgPerMonthContainer").removeClass("green");
			$("#kgPerMonthContainer").addClass("red");
		}
		
		
		transactionsPerMonth = $("#transactionsPerMonthRecorded");
		if (Number(transactionsPerDay) > Number(localStorage["transactionsPerMonth"])){
			$("#transactionsPerMonthContainer").removeClass("red");
			$("#transactionsPerMonthContainer").addClass("green");
		}
		else{
			$("#transactionsPerMonthContainer").removeClass("green");
			$("#transactionsPerMonthContainer").addClass("red");
		}
		
		humidityPerMonth = $("#humidityPerMonthRecoreded");
		if (Number(humidityPerMonth) > Number(localStorage["humidityMax"]) || Number(humidityPerMonth) < Number(localStorage["humidityMin"])){
			$("#humidityPerMonthContainer").removeClass("green");
			$("#humidityPerMonthContainer").addClass("red");
		}
		else{
			$("#humidityPerMonthContainer").removeClass("red");
			$("#humidityPerMonthContainer").addClass("green");
		}

	}
	setColorsOnDashboard();
})