//The Jinja Template System will turn this into a js array of objects
var data_2015_trees = {{ trees }};
var shelters = {{ homeless }};
var rats = {{ rats }};
var radius = 4.5;

var map = L.map('map').setView([40.707895, -73.931150], 10).setMaxBounds([[40.95708558389897,-73.43673706054688],[40.457397087754444,-74.42550659179688]]);
mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	minZoom: 10,
	maxZoom: 14,
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
    else if(health = "Fair") obj.style("fill", "orange");
    //else if ()

    if(htmldisplay != null) info.removeChild(htmldisplay);
}

var display = function(data){
    var d = document.createElement("div");
    d.className = "display";
    d.innerHTML = (`<b>${data["address"]} ${data["boroname"]} ${data["zip_city"]} ${data["zipcode"]} </b> <br>Species: ${data["spc_common"]} <br>Problems: ${data["problems"]} <br> Status: ${data["status"]} <br> Health: ${data["health"]}`);
    info.appendChild(d);
    return d;
}

var clicked = function(obj, data, i){
    obj.on({"mouseout": function(){},
	    "mouseover": function(){},
	    "click": function(){ disselect(obj, data["health"], i);
				 mouseSetup(obj, data, "trees"); }
	   });
}

var hovering = function(obj, data, i){
    obj.on({"mouseout": function(){ disselect(obj, data["health"], i); },
	    "click": function(){ clicked(obj, data, i); }
	   });
}

var mouseSetup = function(obj, data, type){
    if(type == "trees"){
	obj.on("mouseover", function(){ selecting(obj);
					let i = display(data);
					hovering(obj, data, i);
				      } //end mouseover function
	      )//end on
    }//end trees

} //end mouseSetup

var treeOps = function(feature){
    feature.style("fill", function(d){
	if(d.health == "Good") return "green";
	else if(d.health == "Poor") return "yellow";
	else if(d.health = "Fair") return "orange";
  //else if ()
    })
	.on("mouseover", function() { let obj = d3.select(this);
				      let data = obj.datum();
				      mouseSetup( obj, data, "trees" ); } );

}

var shelterOps = function(feature){
  feature.style("fill", "blue")

}

var ratOps = function(feature){
  feature.style("fill", "red")
}

//---------- TREES FUNCTIONS -------------//

var addFeature = function(g, collection, type){
    // console.log("PRINTING");
    // console.log(g.getNorthWest());
    // console.log(g.getSouthEast());
    // console.log("DONE");
    var feature = g.selectAll("circle" + "." + type)
	.data(collection)
	.enter().append("circle");

    feature.style("opacity", .65)
	.attr("r", 5)
	.attr("class", type);

    if(type == "trees"){ treeOps(feature); }

    else if(type == "fire"){

    }
    else if (type == "crime"){ }
    else if (type == "shelters"){ shelterOps(feature);}
    else if (type == 'rats'){ ratOps(feature); }
    return feature;
}

var dots = function(collection, type) {

    collection.forEach(function(d) {
	d.LatLng = new L.LatLng(d.latitude,
				d.longitude)
    })

    var feature = addFeature(g, collection, type);

    map.on("viewreset", update);
    update(type);

    function update(type) {
      var bounds = map.getBounds();
      if ( (41.20552261955812 - bounds['_northEast'].lat  >= .1) && ( -73.18817138671874 - bounds['_northEast'].lng >= .1) ) {
          if (collection == shelters){
          radius = 8 - (2*((-74.30191040039062 - bounds['_southWest'].lng)/.1 ));
          console.log("shelter: " + radius);
          }
          else if (collection == rats){
          radius = 2 - (1.25*((-74.30191040039062 - bounds['_southWest'].lng)/.1 ));
          console.log("rats: "  + radius);
          }
          else{
          radius = 4.2 - (2*((-74.30191040039062 - bounds['_southWest'].lng)/.1 ));
          console.log("trees: " +radius);
          }
        }

      console.log("RADIUS RN : " + radius);
    feature.attr("r", radius);
	feature.attr("transform", function(d) { return "translate("+ map.latLngToLayerPoint(d.LatLng).x +","+ map.latLngToLayerPoint(d.LatLng).y +")"; })
  //console.log("PRINTING");

    }
}


var plot = function() {
    if(this.checked){
    	if(this.id == "trees"){
                dots(data_2015_trees, "trees");
    	}
    	if(this.id == "shelters"){
                dots(shelters, "shelters");
    	}
    	if(this.id == "rats"){
    	    dots(rats, "rats");
    	}
    }
    else{
        g.selectAll("circle" + "." + this.id).remove();
    }
}

//first page shown will have trees plotted
dots(data_2015_trees, "trees");

var filters = document.getElementsByClassName("form-check-input");
for(var i=0; i < filters.length; i++){
    filters[i].addEventListener("click", plot);
}

//dots(crime, "crime");
//dots(shelters, "shelters");
//dots(fire, "fire");
