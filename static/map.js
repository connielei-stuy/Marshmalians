/*var data = {"objects":[
    {"circle":{"coordinates":[40.78,-73.97]}},
    {"circle":{"coordinates":[40.69,-73.96]}},
    {"circle":{"coordinates":[40.70,-73.99]}},
    {"circle":{"coordinates":[40.77,-73.90]}},
    {"circle":{"coordinates":[40.79,-73.98]}}
    ]}*/

/*var data = JSON.parse(document.getElementById('map').getAttribute("name"));*/

var data = JSON.parse(d);


var map = L.map('map').setView([40.707895, -73.931150], 11);
mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
        attribution: '&copy; ' + mapLink + ' Contributors'
    }).addTo(map);

/* Initialize the SVG layer */
map._initPathRoot()    

/* We simply pick up the SVG from the map object */
var svg = d3.select("#map").select("svg"),
    g = svg.append("g");

var dots = function(collection) {

    collection.forEach(function(d) {
	d.LatLng = new L.LatLng(d.latitude,
				d.longitude)
    })
    
    var feature = g.selectAll("circle")
	.data(collection)
	.enter().append("circle");

    feature.style("stroke", "black")  
	.style("opacity", .6) 
	.style("fill", "green")
	.attr("r", 10)
	.on("mouseover", function(){ d3.select(this).style("fill","yellow"); })
	.on("mouseout", function(){ d3.select(this).style("fill","green"); });  

    map.on("viewreset", update);
    update();

    function update() {
	feature.attr("transform", 
		     function(d) { 
			 return "translate("+ 
			     map.latLngToLayerPoint(d.LatLng).x +","+ 
			     map.latLngToLayerPoint(d.LatLng).y +")";
		     }
		    )
    }
}

dots(data);
