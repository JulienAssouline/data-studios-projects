(function () {
  
var w = 1000
var h = 600

var margin = {
  right: 20,
  left: 40,
  top: 0,
  bottom: 100
}

var width = w - margin.right - margin.left;
var height = h - margin.top - margin.bottom;

var svg = d3.select("#mass_shootings")
  .append("svg")
  .attr("id", "chart")
  .attr("width", w)
  .attr("height", h)
  .append("g")
  .attr("transform", "translate(0" + margin.left + "," + margin.top + ")");

  var parseTime = d3.timeParse("%Y-%m-%d")
  var xtickValues = [0, 10, 20, 30, 40, 50, 60];


  var xtickFormat = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October"]

  xScale = d3.scaleTime()
    .range([0, width])

  yScale = d3.scaleLinear()
    .range([height, 0])

  var xAxis = d3.axisBottom()
    .scale(xScale)
    .tickFormat(function(d,i){ return xtickFormat[i] })
    .tickSizeOuter(0)

  var yAxis = d3.axisLeft()
    .scale(yScale)
    .tickValues(xtickValues)
    .tickSize(-width,0,0)
    .tickSizeOuter(0)

  // var controls = d3.select("body")
  //   .append("div")
  //   .attr("id", "controls");

  // var button = controls.append("button")
  //     .html("View Chart")
  //     .attr("state", 0);


          d3.csv("US_mass_shootings_2017_by_date.csv", function(error, data){
            data.forEach(function(d){
              d.Killed = +d.Killed
              d.Injured = +d.Injured
              d.Date = parseTime(d.Date)
            })

          xScale.domain(d3.extent(data, function(d){ return d.Date }))  
          yScale.domain([0, d3.max(data, function(d){ return d.Killed; })])

          svg.append("g")
            .classed("axisx", true)
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
                  .style("font-weight", "normal")
                  .style("font-size", 12)

          svg.append("g")
              .classed("axisy", true)
              .attr("transform", "translate(0,0)")
              .call(yAxis)
              .selectAll("text")
                  .attr("transform", "translate("+ -10 + ",0)")
                  .style("font-weight", "normal")
                  .style("font-size", 12)



// Bar Chart

          var myChart = svg.selectAll(".rect")
            .data(data)
            .enter()
            .append("rect")
            .classed("bar", true)
            .attr("x", function(d){
              return xScale(d.Date)
            })
            .attr("y", height)
            .attr("width", 5)
            .attr("height", 0)
            .style("fill", "darkred")

            myChart.transition()
           .attr("height", function(d){
              return height - yScale(d.Killed)
            })
           .attr("y", function(d){
              return yScale(d.Killed)
            })
           .duration(500)
           .delay(function(d, i){
            return i * 30;
           })
           .style("opacity", 1)

      // Text label

          var myText = svg.selectAll(".label")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "label")
            .attr("x", function(d){
              return xScale(d.Date) - 155
            }) 
            .attr("y", function(d){
              return yScale(d.Killed) + 30
            })
            .text(function(d){
              if(d.Killed == 62){
                return "Las Vegas, 62 killed"
              }
            })
            .style("opacity", 0)
            .style("font-size", 16)
            .style("font-weight", "normal")

            myText.transition()
            .attr("x", function(d){
              return xScale(d.Date) - 155
            }) 
            .attr("y", function(d){
              return yScale(d.Killed) + 30
            })
            .duration(500)
           .delay(function(d, i){
            return i * 32;
           })
           .style("opacity", 1)

          svg.append("text")
            .attr("x", -5)
            .attr("y", 20)
            .text("killed")
            .style("font-weight", "normal")
            .style("font-size", 13)



  })


  })()