//The Jinja Template System will turn this into a js array of objects
var data_2015_trees = {{ trees }};

var map = L.map('map').setView([40.707895, -73.931150], 10).setMaxBounds([[40.95708558389897,-73.43673706054688],[40.457397087754444,-74.42550659179688]]);
mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	minZoom: 9,
	maxZoom: 19,
        attribution: '&copy; ' + mapLink + ' Contributors'
    }).addTo(map);

/* Initialize the SVG layer */
map._initPathRoot();    

/* We simply pick up the SVG from the map object */
var svg = d3.select("#map").select("svg"),
    g = svg.append("g");

var info = document.getElementById("info");

//---------- TREES FUNCTIONS -------------//
var selecting = function(obj){
    obj.style("fill", "blue");
}

var disselect = function(obj, health, htmldisplay){
    if(health == "Good") obj.style("fill","green");
    else if(health == "Poor") obj.style("fill", "yellow");
    else obj.style("fill", "orange");
    //console.log(htmldisplay);

    if(htmldisplay != null) info.removeChild(htmldisplay);
}

var display = function(data){
    var d = document.createElement("div");
    d.className = "display";
    //console.log(data);
    d.innerHTML = (`${data["address"]} ${data["boroname"]} ${data["zip_city"]} ${data["zipcode"]}`);
    //console.log(d.innerHTML);
    info.appendChild(d);
    return d;
}

var selected = function(obj, data){
    selecting(obj);
    let htmldisplay = display(data);
    obj.on({"mouseout": function(){},
	    "click": function(){ disselect(obj, data["health"], htmldisplay);
				 obj.on({"click": function(){ unselected(obj, data); },
					 "mouseout": function(){ disselect(obj, data["health"], null); },
					 "mouseover": function(){selecting(obj);
								 let hd = display(data);
								 obj.on({"mouseout": function(){ let obj = d3.select(this);
												 let data = obj.datum();
												 disselect(obj, data["health"], hd); },
									 "click": function(){ disselect(obj, data["health"], hd);
											      selected(obj, data); } });}
					});
			       },
	    "mouseover": function(){} });
}

var unselected = function(obj, data){
    selected(obj, data);
}

var treeOps = function(feature){
    feature.style("fill", function(d){
	if(d.health == "Good") return "green";
	else if(d.health == "Poor") return "yellow";
	else return "orange";
    })
	.on({"mouseout": function() { let obj = d3.select(this);
				      let data = obj.datum();
				      disselect(obj, data["health"], null); },
	     "mouseover": function() { let obj = d3.select(this);
				       let data = obj.datum();
				       selecting(obj);
				       let htmldisplay = display(data);
				       //console.log(htmldisplay);
				       obj.on({"mouseout": function(){ let obj = d3.select(this);
								       let data = obj.datum();
								       disselect(obj, data["health"], htmldisplay); },
					       "click": function(){ disselect(obj, data["health"], htmldisplay);
								    selected(obj, data); } }); }, 
	     "click":  function() { let obj = d3.select(this);
				    let data = obj.datum();
				    selected(obj, data); } 
	    });

}
//---------- TREES FUNCTIONS -------------//

var addFeature = function(g, collection, type){
    var feature = g.selectAll("circle" + "." + type)
	.data(collection)
	.enter().append("circle");

    feature.style("stroke", "black")  
	.style("opacity", .6)
	.attr("r", 10)
	.attr("class", type);

    if(type == "trees"){ treeOps(feature); }

    else if(type == "fire"){ }
    else if (type == "crime"){ }
    else if (type == "shelters"){ }
    
    return feature;
}

var dots = function(collection, type) {

    collection.forEach(function(d) {
	d.LatLng = new L.LatLng(d.latitude,
				d.longitude)
    })
    
    var feature = addFeature(g, collection, type);

    map.on("viewreset", update);
    update();

    function update() {
	feature.attr("transform", function(d) { return "translate("+ map.latLngToLayerPoint(d.LatLng).x +","+ map.latLngToLayerPoint(d.LatLng).y +")"; })
    }
}

dots(data_2015_trees, "trees");
//dots(crime, "crime");
//dots(shelters, "shelters");
//dots(fire, "fire");
