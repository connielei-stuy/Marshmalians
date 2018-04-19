var species = {{ species | tojson }};
//var container = document.getElementById("piechart");

//for(var k in species) container.innerHTML += (k + ": " + species[k] + "<br>");

var pie = new d3pie("pieChart", {
	"header": {
		"title": {
			"text": "Tree Species",
			"fontSize": 34,
			"font": "courier"
		},
		"subtitle": {
			"text": "{{ borough }}",
			"color": "#777777",
			"font": "courier"
		},
		"location": "pie-center",
		"titleSubtitlePadding": 10
	},
	"footer": {
		"color": "#999999",
		"fontSize": 10,
		"font": "open sans",
		"location": "bottom-left"
	},
	"size": {
		"canvasWidth": 590,
		"pieInnerRadius": "85%",
		"pieOuterRadius": "70%"
	},
	"data": {
		"sortOrder": "value-desc",
		"content": [
			{
				"label": "Spiders",
				"value": 2,
				"color": "#022c00"
			},
			{
				"label": "Mother-in-laws",
				"value": 10,
				"color": "#043500"
			},
			{
				"label": "Sharks",
				"value": 8,
				"color": "#043d01"
			},
			{
				"label": "Alien invasion",
				"value": 8,
				"color": "#044200"
			},
			{
				"label": "Learning Objective-C",
				"value": 5,
				"color": "#054b00"
			},
			{
				"label": "Public speaking",
				"value": 3,
				"color": "#075502"
			},
			{
				"label": "Donald Trump",
				"value": 4,
				"color": "#085d00"
			},
			{
				"label": "The Zombie Apocalypse",
				"value": 4,
				"color": "#076100"
			},
			{
				"label": "The City of Winnipeg *",
				"value": 3,
				"color": "#066900"
			},
			{
				"label": "IE 6",
				"value": 2,
				"color": "#097001"
			},
			{
				"label": "Planes with/out snakes",
				"value": 5,
				"color": "#0a7603"
			},
			{
				"label": "Off-by-one errors",
				"value": 3,
				"color": "#0c7c03"
			},
			{
				"label": "Chickadees",
				"value": 4,
				"color": "#0e8006"
			},
			{
				"label": "Owning a cat",
				"value": 1,
				"color": "#0f8607"
			},
			{
				"label": "Canada",
				"value": 4,
				"color": "#128b08"
			}
		]
	},
	"labels": {
		"outer": {
			"format": "label-percentage1",
			"pieDistance": 20
		},
		"inner": {
			"format": "none"
		},
		"mainLabel": {
			"fontSize": 11
		},
		"percentage": {
			"color": "#999999",
			"fontSize": 11,
			"decimalPlaces": 0
		},
		"value": {
			"color": "#cccc43",
			"fontSize": 11
		},
		"lines": {
			"enabled": true,
			"color": "#777777"
		},
		"truncation": {
			"enabled": true
		}
	},
	"tooltips": {
		"enabled": true,
		"type": "placeholder",
		"string": "{label}: {value} ({percentage}%)"
	},
	"effects": {
		"pullOutSegmentOnClick": {
			"effect": "linear",
			"speed": 400,
			"size": 8
		}
	},
	"misc": {
		"colors": {
			"segmentStroke": "#000000"
		}
	}
});
