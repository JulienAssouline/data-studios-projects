(function () {

  
var w = 900
var h = 600

var margin = {
  right: 0,
  left: 0,
  top: 0,
  bottom: 0
}

var width = w - margin.right - margin.left;
var height = h - margin.top - margin.bottom;

var svg = d3.select("#US_mass_shootings_map")
  .append("svg")
  .attr("id", "chart")
  .attr("width", w)
  .attr("height", h)
  .append("g")
  .attr("transform", "translate(0" + margin.left + "," + margin.top + ")");

  var circleScale = d3.scaleSqrt()
    .domain([0, 59])
    .range([1,25])

  var projection = d3.geoAlbersUsa()
    .translate([width / 2, height / 2])
    .scale(1000)


  var path = d3.geoPath()
    .projection(projection)



    var div = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)

   d3.json("us.json", function(json){
          d3.csv("US_mass_shootings_2017.csv", function(error, data){
            data.forEach(function(d){
              d.Latitude = +d.Latitude
              d.Longitude = +d.Longitude
              d.Killed = +d.Killed
              d.Injured = +d.Injured
              d.City = d.City
              d.State = d.State
              d.Address = d.Address
            })

            var states = topojson.feature(json, json.objects.states).features

            svg.selectAll(".state")
              .data(states)
              .enter()
              .append("path")
              .attr("class", "state")
              .attr("d", path)

            // svg.selectAll("circle")
            //   .data(data)
            //   .enter()
            //   .append("circle")
            //   .attr("class", "injured")
            //   .attr("r", function(d){
            //     return circleScale(d.Injured)
            //   })
            //   .attr("cx", function(d){
            //     var coords = projection([d.Longitude, d.Latitude])
            //     return coords[0];
            //   })
            //   .attr("cy", function(d){
            //     var coords = projection([d.Longitude, d.Latitude])
            //     return coords[1]
            //   })
            //   .style("fill", "orange")

            svg.selectAll(".point")
              .data(data)
              .enter()
              .append("circle")
              .attr("class", "killed")
              .attr("r", function(d){
                return circleScale(d.Killed)
              })
              .attr("cx", function(d){
                var coords = projection([d.Longitude, d.Latitude])
                return coords[0];
              })
              .attr("cy", function(d){
                var coords = projection([d.Longitude, d.Latitude])
                return coords[1]
              })
              .style("fill", "darkred")
              .style("opacity", 0.5)
              .style("stroke-width", 1)
              .on("mouseover", function(d){
                div.transition()
                .duration(200)
                .style("opacity", 1)
                var element = d3.select(this);
                element.style("stroke", "black")
                element.style("stroke-width", 2)
                div.html(d.City + "<br><br>" + d.Killed + " dead, " + d.Injured + " injured")
                div.style("visibility", "visible")
                .style("left", (d3.event.pageX - 50) + "px")    
                .style("top", (d3.event.pageY - 75) + "px")
              })
              .on("mousemove", function(d){
                div.style("left", (d3.event.pageX - 50) + "px")    
            .style("top", (d3.event.pageY - 75) + "px")
              })
              .on("mouseout", function(d){
                // div.transition()
                // .duration(2000)
                // .style("opacity", 0)
                var element = d3.select(this)
                element.style("stroke", "darkred")
                element.style("stroke-width", 1)
                div.style("visibility", "hidden")
              })

            




  })
  })


 })()