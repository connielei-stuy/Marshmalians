var data = {"objects":[
    {"circle":{"coordinates":[40.78,-73.97]}},
    {"circle":{"coordinates":[40.69,-73.96]}},
    {"circle":{"coordinates":[40.70,-73.99]}},
    {"circle":{"coordinates":[40.77,-73.90]}},
    {"circle":{"coordinates":[40.79,-73.98]}}
]}


var map = L.map('map').setView([40.7831, -73.9712], 8);
mapLink = 
    '<a href="http://openstreetmap.org">OpenStreetMap</a>';
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

/*
var dots = function(collection) {

    collection.objects.forEach(function(d) {
	d.LatLng = new L.LatLng(d.circle.coordinates[0],
				d.circle.coordinates[1])
    })
    
    var feature = g.selectAll("circle")
	.data(collection.objects)
	.enter().append("circle")
	.style("stroke", "black")  
	.style("opacity", .6) 
	.style("fill", "red")
	.attr("r", 20);  
    
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

dots(data);*/
