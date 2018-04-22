var species = {{ species | tojson }};
var numSpecies = 0, numTrees = 0;
for(var k in species) {
	numTrees += species[k]
	numSpecies++;
}
var container = document.getElementById("speciesTable");
for(var k in species) {
	var tr = document.createElement("tr");
	tr.innerHTML = "<td>" + k + "</td><td>" + species[k] + "</td></tr>";
	container.appendChild(tr);
}
/* Converts three numbers (r, g, b) into a CSS hex color code */
var rgbToHex = function(r, g, b) {
    var str = "#";
    r = Math.min(255, parseInt(r));
    g = Math.min(255, parseInt(g));
    b = Math.min(255, parseInt(b));
    var digit = function(n) {
	return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'][n];
    };
    str += digit(parseInt(r / 16));
    str += digit(r % 16);
    str += digit(parseInt(g / 16));
    str += digit(g % 16);
    str += digit(parseInt(b / 16));
    str += digit(b % 16);
    return str;
}

/* This function returns a hex color code that is mostly green for the pie chart */
var getGreenColor = function(index) {
    var g = 100 + 155 * (index / numSpecies);
    var other = 100 + 50 * (index / (numSpecies + 10));
    return rgbToHex(other, g, other);
};

/* This converts the json object into the format that d3 needs it in */
var loadSpeciesData = function() {
    var content = [];
    var values = [];
    for(var k in species) {
		label = k;
		if(k == "") label = "Unknown";
		content.push({
		    label: label,
		    value: species[k],
		    color: "#00FF00"
		});
		values.push(species[k]);
    }
    values.sort();
    for(var i = 0; i < content.length; i++) {
    	content[i].color = getGreenColor(values.indexOf(content[i].value));
    }
    return content;
};

/* This creates the pie chart */
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

/* Make the tree diameter bar chart */
var diameters = {{ diameters | tojson }};
var diameterList = [];
for(var k in diameters) {
    diameterList.push({key: k, value: diameters[k]});
}
diameterList.sort(function(a, b) {
    return parseFloat(a.key) - parseFloat(b.key);
});
var diametersSortedByFrequency = diameterList.slice().sort(function(a, b) {
    return parseFloat(a.value) - parseFloat(b.value);
});

d3.select("#barChart").selectAll(".bar")
    .data(diameterList).enter().append("div")
    .classed("bar", true)
    .text(function (d) {
        return d.key;
    })
    .transition().duration(2000)
    .style("width", function(d) {
        return (10 * parseInt(d.value)) + "px";
    });

d3.select("#barChart").append("div")
    .style("border", "1px solid black")
    .selectAll("span")
    .data(["Frequency:", 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]).enter()
    .append("span")
    .style("display", "inline-block")
    .style("width", "100px")
    .text(function(d) {
        return d;
    });

