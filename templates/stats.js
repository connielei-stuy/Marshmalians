var species = {{ species | tojson }};
//var container = document.getElementById("piechart");

for(var k in species) document.body.innerHTML += (k + ": " + species[k] + "<br>");

var rgbToHex = function(r, g, b) {
    var str = "#";
    r = Math.min(255, parseInt(r));
    g = Math.min(255, parseInt(g));
    b = Math.min(255, parseInt(b));
    var digit = function(n) {
	return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'][n];
    };
    str += digit(r % 16);
    str += digit(parseInt(r / 16));
    str += digit(g % 16);
    str += digit(parseInt(g / 16));
    str += digit(b % 16);
    str += digit(parseInt(b / 16));
    return str;
}

var getGreenColor = function(index) {
    var g = Math.random() * 200 + 10 * index;
    return rgbToHex((5 * (g % 20)), g, (5 * (g / 20)));
};

var loadSpeciesData = function() {
    var content = [];
    for(var k in species) {
	label = k;
	if(k == "") label = "Unknown";
	content.push({
	    label: label,
	    value: species[k],
	    color: getGreenColor(content.length)
	});
	console.log(content[content.length - 1].color);
    }
    return content;
};

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
		"canvasWidth": 800,
		"pieInnerRadius": "85%",
		"pieOuterRadius": "70%"
	},
	"data": {
	        "sortOrder": "value-desc",
	        "smallSegmentGrouping": {"enabled": true},
	        "content": (function() {return loadSpeciesData();})()
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
