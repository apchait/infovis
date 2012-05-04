$(document).ready(function(){
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Day');
	data.addColumn('number', 'Kg');
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
			"February 2012": [
				["Augustin R", 45],
				["Paulina G", 32],
				["Jesus D", 38],
				["Angel R", 50]
			],
			"January 2012": [
				["Augustin R", 35],
				["Paulina G", 38],
				["Jesus D", 37],
				["Angel R", 46]
			],
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
			]
		}
		return producerData;
	}
	var producerData = createProducerData();
		
	function createData(){
		coffeeData = {
			"February 2012": {
				"abrv": "Feb",
				"name": "February 2012", 
				"days": [576,556,220,395,463,420,555,677,253,452,465,379,608,509,467,459,512,526,451,489,301,273,461,373,397,535,376,556],
				"average": 454,
				"total": '12704',
				"locations": {"Wibuse": 4530, "Matagalpa": 8174},
				"humidity": 11,
				"busyTime": '14h00-15h00',
				"numTransactions": 50
			},
			"January 2012": {
				"abrv": "Jan",
				"name": "January 2012", 
				"days": [258,584,499,287,402,562,471,317,405,359,544,236,626,498,425,272,510,557,392,361,644,662,442,469,677,260,575,550,571,315,577],
				"average" : 461,
				"total": '14307',
				"locations": {"Wibuse": 4934, "Matagalpa": 9373},
				"humidity": 11,
				"busyTime": '10h00-11h00',
				"numTransactions": 51
			},
			"December 2011": {
				"abrv": "Dec",
				"name": "December 2011", 
				"days": [208,566,633,509,642,692,203,264,285,432,568,593,520,521,217,253,582,634,600,246,407,464,544,549,220,487,303,390,443,317,582],
				"average" : 447,
				"total": '13874',
				"locations": {"Wibuse": 3952, "Matagalpa": 9922},
				"humidity": 12,
				"busyTime": '09h30-10h30',
				"numTransactions": 41
			},
			"November 2011": {
				"abrv": "Nov",
				"name": "November 2011", 
				"days": [239,472,621,303,250,658,339,556,374,545,646,208,542,610,516,298,283,380,331,218,597,222,287,612,297,270,641,372,640,692],
				"average" : 443,
				"total": '13019',
				"locations": {"Wibuse": 3523, "Matagalpa": 9496},
				"humidity": 10,
				"busyTime": '11h00-12h00',
				"numTransactions": 38
			},
			"October 2011": {
				"abrv": "Oct",
				"name": "October 2011", 
				"days": [400,630,533,355,691,398,361,422,536,443,395,485,297,333,326,458,361,492,344,520,610,688,559,579,444,573,471,654,688,612,647],
				"average" : 493,
				"total": '15305',
				"locations": {"Wibuse": 4643, "Matagalpa": 10662},
				"humidity": 11,
				"busyTime": '15h00-16h00',
				"numTransactions": 57
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
		$("#total").html("<span id='kgPerMonthRecorded'>" + monthData.total + '</span> kg');
		$("#matagalpaTotal").html(monthData.locations.Matagalpa + ' kg');
		$("#wibuseTotal").html(monthData.locations.Wibuse + ' kg');
		// Set second row of dash
		$("#humidity").html(monthData.humidity + "%");
		$("#busyTime").html(monthData.busyTime);
		$("#numTransactions").html(monthData.numTransactions);
		
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
	filterByDate("February 2012");
	function drawCharts() {
		chart.draw(data, options);
		chart2.draw(data_chart2, options_chart2);
	  }
	
	
})