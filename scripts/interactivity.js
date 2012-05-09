$(document).ready(function(){
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Day');
	data.addColumn('number', 'QQ');
	var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
	var	options = {
		  	// title: 'Total Coffee Collection per Day',
            // backgroundColor: 'blue';
		  	hAxis: {title: month.name,  titleTextStyle: {color: 'grey'}},
			width: 320,
	      	height: 280,
	      	colors: ['#599B9B'],
	      	animation:{
	        	duration: 1000,
	        	easing: 'out',
	      	}
		};
		
	var data_chart2 = new google.visualization.DataTable();
	data_chart2.addColumn('string', 'Producer');
    data_chart2.addColumn('number', 'Transactions');
	var chart2 = new google.visualization.ColumnChart(document.getElementById('chart2_div'));
	var options_chart2 = {
      	title: 'Intake by Employee',
      	hAxis: {title: 'Producer', titleTextStyle: {color: 'grey'}},
		width: 320,
      	height: 280,
      	colors: ['#599B9B'],
      	animation:{
        	duration: 1000,
        	easing: 'out',
      	}
    };

	$("#month").change(function(){
		filterByDate(this.value);
	});
	
	function createProducerData(){
		producerData = {
			"December 2011": [
				["Augustin R", 40],
				["Paulina G", 35],
				["Jesus D", 38],
				["Angel R", 52]
			],
			"November 2011": [
				["Augustin R", 43],
				["Paulina G", 34],
				["Jesus D", 42],
				["Angel R", 55]
			],
			"October 2011": [
				["Augustin R", 46],
				["Paulina G", 35],
				["Jesus D", 38],
				["Angel R", 60]
			],
			"September 2011": [
				["Augustin R", 10],
				["Paulina G", 2],
				["Jesus D", 30],
				["Angel R", 15]
			]
		}
		return producerData;
	}
	var producerData = createProducerData();
	
	function createData(){
		coffeeData = {
			"September 2011": {
				"abrv": "Sep",
				"name": "September 2011", 
				"days": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3.94, 0, 0, 0.76, 0, 2.52],
				"average": 454,
				"total": '7.22',
				"locations": {"Wibuse": 4530, "Matagalpa": 8174},
				"humidity": 11,
				"busyTime": '14h00',
				"numTransactions": 7,
				"avgPrice": 2219.29
			},
			"October 2011": {
				"abrv": "Oct",
				"name": "October 2011", 
				"days": [1.74, 0, 1.29, 20, 5.92, 2.12, 11.3, 0, 0, 31.29, 7.47, 3.6, 47.54, 0, 70.66, 1.82, 0, 11.58, 0, 13.94, 40.12, 33.8, 26.72, 13.66, 21.72, 12.28, 77.39, 23.90, 36.08, 0, 5.5],
				"average" : 461,
				"total": '521.46',
				"locations": {"Wibuse": 4934, "Matagalpa": 9373},
				"humidity": 11,
				"busyTime": '10h00',
				"numTransactions": 152,
				"avgPrice": 2230.39
			},
			"November 2011": {
				"abrv": "Nov",
				"name": "November 2011", 
				"days": [18.94, 0, 21.24, 80.64, 14.9, 29.61, 0, 44.84, 41.94, 69.89, 45.96, 68.23, 9.96, 37.84, 0, 0, 2.06, 63.39, 22.7, 16.54, 35.11, 6.8, 51.48, 58.29, 116.32, 29.38, 0, 26.73, 29.94, 0.6],
				"average" : 443,
				"total": '943.37',
				"locations": {"Wibuse": 3523, "Matagalpa": 9496},
				"humidity": 10,
				"busyTime": '11h00',
				"numTransactions": 214,
				"avgPrice": 2275.56
			},
			"December 2011": {
				"abrv": "Dec",
				"name": "December 2011", 
				"days": [8.79, 7.29, 41.44, 13.53, 31.55, 64.64, 5.47, 11.84, 84.98, 12.14, 48.33, 56.83, 14.9, 17.07, 19.43, 45.4, 45.03, 24.51, 38.17, 35.01, 37.08, 184.79, 20.51, 9.62, 0, 26.47, 0, 0, 4.34, 0, 0],
				"average" : 447,
				"total": '909.22',
				"locations": {"Wibuse": 3952, "Matagalpa": 9922},
				"humidity": 12,
				"busyTime": '09h30',
				"numTransactions": 246,
				"avgPrice": 2217.97
			}
		}
		return coffeeData;
	}
	var coffeeData = createData();

	function filterByDate(month){
		monthData = coffeeData[month];
		// Change month name
		$(".monthName").html(monthData.name);		
		// Change total
		$("#total").html("<span id='kgPerMonthRecorded'>" + monthData.total + '</span> qq');
		$("#matagalpaTotal").html(monthData.locations.Matagalpa + ' kg');
		$("#wibuseTotal").html(monthData.locations.Wibuse + ' kg');
		// Set second row of dash
		$("#humidityPerMonthRecorded").html(monthData.humidity);
		$("#busyTime").html(monthData.busyTime);
		$("#transactionsPerMonthRecorded").html(monthData.numTransactions);
		$("#avgPrice").html(monthData.avgPrice);
		
		// create day,kg pairs for chart 1
		dayList = [];
		$.each(monthData.days, function(d,v){
			dayList.push([String(d+1),v]);
		})
		data.removeRows(0,data.getNumberOfRows());
		data.addRows(dayList);
		
		// Replace data in chart 2
		data_chart2.removeRows(0, data_chart2.getNumberOfRows());
		data_chart2.addRows(producerData[month]);

		drawCharts();
	}
	
	// Call it on load to set up for Feb
	filterByDate("December 2011");
	function drawCharts() {
		chart.draw(data, options);
		chart2.draw(data_chart2, options_chart2);
	  }
	
	
})