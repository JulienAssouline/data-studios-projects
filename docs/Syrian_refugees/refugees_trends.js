(function () {

var w = 300
var h = 350

var margin = {
  right: 40,
  left: 70,
  top: 90,
  bottom: 40
}

var width = w - margin.right - margin.left;
var height = h - margin.top - margin.bottom;

// var svg = d3.select("#refugee_trend")
//   .append("svg")
//   .attr("id", "chart")
//   .attr("width", w)
//   .attr("height", h)
//   .append("g")
//   .attr("transform", "translate(0" + margin.left + "," + margin.top + ")");

var xtickValues = [1960, 2016]
var ytickValues = [0, 1000000, 2000000, 3000000, 4000000, 5000000, 6000000]

var ytickFormat = ["0", "1", "2", "3", "4", "5", "6 million"]

  var xScale = d3.scaleLinear()
    .range([0, width])

  var yScale = d3.scaleLinear()
    .range([height, 0])

  var line = d3.line()
    .x(function(d){
      return xScale(d.Year)
    })
    .y(function(d){
      return yScale(d.Value)
    })

  var area = d3.area()
    .x(function(d){
      return xScale(d.Year)
    })
    .y0(height)
    .y1(function(d){ 
      return yScale(d.Value )
    })

    var xAxis = d3.axisBottom()
      .scale(xScale)
      .tickValues(xtickValues)
      .tickSizeOuter(0)

    var yAxis = d3.axisLeft()
      .scale(yScale)
      .tickValues(ytickValues)
      .tickFormat(function(d,i){ return ytickFormat[i] })
      .tickSize(-width,0,0)
      .tickSizeOuter(0)



  d3.csv("refugees_count_year_top15.csv", function(error, data){
    data.forEach(function(d){
      d.Year = +d.Year;
      d.Value = +d.Value;
      d.Origin = d.Origin
    });

  xScale.domain(d3.extent(data, function(d){ return d.Year; }))
  yScale.domain([0, d3.max(data, function(d){ return d.Value; })])  

  var Countries = d3.nest()
    .key(function(d){ return d.Origin; })
    .entries(data)

    console.log(Countries)



    var svgs = d3.select("#refugee_trend")
      .selectAll("svg")
      .data(Countries)
      .enter()
      .append("svg")
      .attr("id", "chart_trend")
      .attr("width", w)
      .attr("height", h)
      .append("g")
      .attr("transform",  "translate(" + margin.left + "," + margin.top + ")")

      svgs.append("g")
              .attr("class", "xaxis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis)
              .selectAll("text")
                  .style("fill", "grey")
                  .style("font-size", "12px")
                  .style("opacity", 0.7)


              svgs.append("g")
              .attr("class", "yaxis")
              .attr("transform", "translate(0,0)")
              .call(yAxis)
              .selectAll("text")
                  .style("fill", "grey")
                  .style("font-size", "12px")
                  .style("opacity", 0.7)

                  // .attr("transform", "translate("+ -5 + ",0)")

      // svgs.append("path")
      //   .attr("class", "line")
      //   .attr("d", function(d){
      //     return line(d.values)
      //   })
      //   .style("fill", "none")
      //   .style("stroke", "#cd0d0e")  
      //   .style("opacity", 0.5)

      svgs.append("path")
        .attr("class", "area")
        .attr("d", function(d){
          return area(d.values)
        })
        .style("fill", "#cd0d0e")
        .style("opacity", 0.8)  


      svgs.append("text")
              .attr("x", width - 100)
              .attr("y", height - 240)
              .style("text-anchor", "middle")
              .style("font-size", "15px")
              .text(function(d) { return d.key; });      


  });


 })()





