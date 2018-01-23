(function () {

 var w = 350;
 var h = 360;


      var margin = {
          top: 40,
          bottom: 50,
          left: 70,
          right: 40
        }

        var width = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;

        // xtickValues = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]
        var xtickFormat = ["0", "200", "400", "600", "800", "1,000", "1,200", "1,400", "1,600 players"]

      var xScale = d3.scaleLinear() 
        .range([0, width])

      var yScale = d3.scaleLinear()
        .range([height, 0])

      var xAxis = d3.axisBottom()
        .scale(xScale)

      var yAxis = d3.axisLeft()
        .scale(yScale)
        .tickFormat(function(d,i){ return xtickFormat[i] })


        var svg = d3.select("#bars_1")
        .append("svg")
        .attr("id", "chart")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("Baseball_careers_distribution.csv", function(error, data){
    data.forEach(function(d){
      d.experience = +d.experience
      d.index = d.index
    });

    xScale.domain([0, 27])
    yScale.domain([0, 1751])

   
      
    svg.selectAll(".rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", function(d){
        return "rect " + "n" + d.index.replace(/ /g, "") // needs to be a different letter than the last one to work
      })
      .attr("id", function(d){
        return "bar-" + d.index.replace(/ /g, "") // needs to be a different letter than the last one to work
      })
      .attr("x", function(d){
        return xScale(d.index)
      })
      .attr("y", function(d){ 
                return yScale(d.experience)
              })
      .attr("height", function(d){
              return height - yScale(d.experience)
           })
      .attr("width", 5)
      .style("fill", "#012e6c")
    
      svg.append("g")
        .classed("yaxis", true)
        .attr("transform", "translate(0,0)")
        .call(yAxis)

  svg.append("g")
    .classed("xaxis", true)
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
        .style("fill", "black")

  svg.append("text")
      .attr("x", width/2 - 30)
      .attr("y", 310)
      .text("Years played")
      .style("font-family", "Bree serif")
      .style("font-size", "13px")



  });


    })()