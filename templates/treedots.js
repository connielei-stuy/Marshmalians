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

//var dis = document.getElementById("display");

var selecting = function(obj){
    obj.style("fill", "blue");
}

var disselect = function(obj, health, htmldisplay){
    if(health == "Good") obj.style("fill","green");
    else if(health == "Poor") obj.style("fill", "yellow");
    else obj.style("fill", "orange");
    //dis.removeChild(htmldisplay);
}

var display = function(data){
    var d = document.createElement("div");
    d.className = "display";
    console.log(data);
    d.innerHTML = (`${data["address"]} ${data["boroname"]} ${data["zip_city"]} ${data["zipcode"]}`);
    console.log(d.innerHTML);
    //dis.appendElement(d);
    //return d;
}

var addFeature = function(g, collection){
    var feature = g.selectAll("circle")
	.data(collection)
	.enter().append("circle");

    feature.style("stroke", "black")  
	.style("opacity", .6) 
	.style("fill", function(d){
	    if(d.health == "Good") return "green";
	    else if(d.health == "Poor") return "yellow";
	    else return "orange";
	})
	.attr("r", 10)
	.on({
            "mouseout": function() { let obj = d3.select(this);
				     let data = obj.datum();
				     disselect(obj, data["health"], null);
				   },
            "mouseover": function() { let obj = d3.select(this);
				      let data = obj.datum();

				      selecting(obj);
				      //let htmldisplay = display(data);
				      /*
					obj.on("mouseout", function(){
					let obj = d3.select(this);
					let data = obj.datum();
					//disselect(obj, data["health"], htmldisplay);
					}
					);
				      */
				    }, 
            "click":  function() { let obj = d3.select(this);
				   let data = obj.datum();

				   selected(obj, data);
				 } 
        });
    
    return feature;
}

var selected = function(obj, data){
    selecting(obj);
    let htmldisplay = display(data);
    obj.on({"mouseout": function(){},
	    "click": function(){ disselect(obj, data["health"], htmldisplay);
				 obj.on("click", function(){
				     unselected(obj, data);
				 });
			       }
	   });
}

var unselected = function(obj, data){
    selected(obj, data);
}

var dots = function(collection) {

    collection.forEach(function(d) {
	d.LatLng = new L.LatLng(d.latitude,
				d.longitude)
    })
    
    var feature = addFeature(g, collection);

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

dots(data_2015_trees);
