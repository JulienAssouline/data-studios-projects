(function () {

 var w = 1050;
 var h = 360;


      var margin = {
          top: 40,
          bottom: 50,
          left: 70,
          right: 40
        }

        var width = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;

        var xtickFormat = ["0", "20", "40", "60", "80", "100", "120", "140", "160", "180", "200", "220", "240", "260", "280 players"]

      var xScale = d3.scaleLinear() 
        .range([0, width])

      var yScale = d3.scaleLinear()
        .range([height, 0])

      var xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(16)

      var yAxis = d3.axisLeft()
        .scale(yScale)
        .tickFormat(function(d,i){ return xtickFormat[i] })


        var svg = d3.select("#G")
        .append("svg")
        .attr("id", "chart")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("Baseball_careers_1_yr_grouped.csv", function(error, data){
    data.forEach(function(d){
      d.G = +d.G
      d.index = +d.index
    });

    xScale.domain([0, 152])
    yScale.domain([0, 294])

     
   
      
    svg.selectAll(".rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function(d){
        return xScale(d.index)
      })
      .attr("y", function(d){ 
                return yScale(d.G)
              })
      .attr("height", function(d){
              return height - yScale(d.G)
           })
      .attr("width", 5)
      .style("fill", "#012e6c")
    
      svg.append("g")
        .classed("y_axis", true)
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
      .text("Games played")
      .style("font-family", "Bree serif")
      .style("font-size", "13px")

    svg.append("text")
      .attr("x", 30)
      .attr("y", 10)
      .text("Most players don't get to play a single game")
      .style("font-family", "Bree serif")
      .style("font-size", "13px")

   svg.append("line")
            .attr("x1", 5)
            .attr("y1", 0.5)
            .attr("x2", 20)
            .attr("y2", 0.5)
            .attr("stroke-width", 1)
            .style("stroke", "black")
            .attr("transform", "translate(5,5)")

    svg.append("line")
            .attr("x1", 0.5)
            .attr("y1", 5)
            .attr("x2", 0.5)
            .attr("y2", 15)
            .attr("stroke-width", 1)
            .style("stroke", "black")
            .attr("transform", "translate(942,248)")

    svg.append("text")
      .attr("x", 823)
      .attr("y", 239)
      .text("Sparky Anderson, 152 games")
      .style("font-family", "Bree serif")
      .style("font-size", "13px")

    svg.append("text")
      .attr("x", 0)
      .attr("y", -20)
      .text("Distribution of games played by players who had a one year career, 1950-2013")
      .style("font-family", "Bree serif")
      .style("font-size", "18px")
      .style("font-weight", "bold")



  });


    })()