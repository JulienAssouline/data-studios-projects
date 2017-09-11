
(function () {

var w = 300
var h = 700

var margin = {
  right: 40,
  left: 150,
  top: 40,
  bottom: 40
}

var width = w - margin.right - margin.left;
var height = h - margin.top - margin.bottom;

var svg = d3.select("#count_refugee")
  .append("svg")
  .attr("id", "chart1")
  .attr("width", w)
  .attr("height", h)
  .append("g")
  .attr("transform", "translate(0" + margin.left + "," + margin.top + ")");

  var xScale = d3.scaleLinear()
    .range([0, width]);

  var yScale = d3.scaleBand()
    .range([height, 0]);

  var yAxis = d3.axisLeft()
    .scale(yScale)


  d3.csv("Canada_refugees_2016.csv", function(error, data){
    data.forEach(function(d){
      d.Count = +d.Count;
      d.Country_Residence = d.Country_Residence
      d.Origin = d.Origin
    })

    xScale.domain([0, d3.max(data, function(d){ return d.Count })]);
    yScale.domain(data.map(function(d){ return d.Origin }));

    svg.append("g")
      .attr("class", "yaxis")
      .attr("transform", "translate(0," + 0+ ")")
      .call(yAxis)
      .selectAll("text")
                  .style("fill", "black")
                  .style("font-size", "12px")
                  .style("font-weight", "Myriad Pro")


    svg.selectAll(".rect")
      .data(data)
      .enter()
      .append("rect")
      .classed("bar", true)
      .attr("x", 0)
      .attr("y", function(d){
        return yScale(d.Origin)
      })
      .attr("width", function(d){
        return xScale(d.Count) + 1
      })
      .attr("height", 10)
      .style("fill", "#cd0d0e")
      .on("mouseover", function(d){
        d3.selectAll(".arc").style("opacity", 0.1) /// selecting the arcs from map
        d3.select("."+ d.Origin.replace(/[^A-Za-z0-9]/g, "")).style("opacity", 1) // . means selecting things based on class. (.) + Origin is selecting the country based on the  class 
      })
      .on("mouseout", function(d){
        d3.selectAll(".arc").style("opacity", function(e){
                if(e.Origin == "Syria"){
                  return 0.7
                } else {
                  return 0.4
                }
              })
        // d3.select(this).style("fill", "#cd0d0e")
      })

  })

      })()

