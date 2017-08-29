
(function () {

var w = 500
var h = 500

var margin = {
  right: 70,
  left: 150,
  top: 40,
  bottom: 40
}

var width = w - margin.right - margin.left;
var height = h - margin.top - margin.bottom;

var svg = d3.select("#refugees_top15")
  .append("svg")
  .attr("id", "chart1")
  .attr("width", w)
  .attr("height", h)
  .append("g")
  .attr("transform", "translate(0" + margin.left + "," + margin.top + ")");

  var myFormat = d3.format(",") // this will add commas to you variables

  var xScale = d3.scaleLinear()
    .range([0, width]);

  var yScale = d3.scaleBand()
    .range([height, 0]);

  var yAxis = d3.axisLeft()
    .scale(yScale)



  d3.csv("refugees_2016_count_top15.csv", function(error, data){
    data.forEach(function(d){
      d.Count = +d.Count;
      d.Country_Residence = d.Country_Residence
      d.Origin = d.Origin
    })

    xScale.domain([0, d3.max(data, function(d){ return d.Count })]);
    yScale.domain(data.map(function(d){ return d.Origin }));

    svg.append("g")
      .attr("class", "yaxis1")
      .attr("transform", "translate(0," + -7+ ")")
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
      .attr("height", 15)
      .style("fill", "#cd0d0e")

      svg.selectAll(".label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", function(d){
          return xScale(d.Count) + 10
        })
        .attr("y", function(d){
          return yScale(d.Origin) + 10
        })
        .text(function(d){ 
          return myFormat(d.Count)})

        svg.append("text")
          .attr("x", 0)
          .attr("y", -20)
          .text("Top 15 countries of origin, 2016")
          .style("font-size", "17px")
          .style("font-weight", "bold")
      

  })

      })()

