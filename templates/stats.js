var species = {{ species | tojson }};
var container = document.getElementById("piechart");

var loadBorough = function(name) {
    
}

for(var k in species) container.innerHTML += (k + ": " + species[k] + "<br>");
