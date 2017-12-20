(function () {

 var w = 260;
 var h = 250;

      var margin = {
          top: 70,
          bottom: 20,
          left: 0,
          right: 20
        }

        var width = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;



        var xScale = d3.scaleBand()
          .range([width, 0])

        var yScale = d3.scaleLinear()
          .range([height, 0])

        var xAxis = d3.axisBottom()
          .scale(xScale)



  d3.csv("Opioid_age_long.csv", function(error, data){
    data.forEach(function(d){
      d["Age group (years)"] = d["Age group (years)"];
      d.Year = d.Year;
      d.Opioid_Rate = +d.Opioid_Rate
    });

    yScale.domain([0, d3.max(data, function(d){ return d.Opioid_Rate })])
    xScale.domain(data.map(function(d){ return d["Age group (years)"] }))

    var Years = d3.nest()
      .key(function(d){ return d.Year })
      .entries(data);

    var svgs = d3.select("#Age")
      .selectAll("svg")
      .data(Years)
      .enter()
      .append("svg")
      .attr("id", "chart")
      .attr("width", w)
      .attr("height", h)
      .append("g")
      .attr("transform",  "translate(" + margin.left + "," + margin.top + ")")


          svgs.append("g")
              .attr("class", "xaxis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis)
              .selectAll("text")
                  .style("fill", "black")
                  .style("font-size", "10px")
                  .style("opacity", 1)

    svgs.selectAll(".rect")
      .data(function(d){ return d.values; })
      .enter()
      .append("rect")
      .attr("x", function(d){ 
        return xScale(d["Age group (years)"])
      })
      .attr("y", function(d){
        return yScale(d.Opioid_Rate)
      })
      .attr("width", xScale.bandwidth() -10)
      .attr("height", function(d){
        return height - yScale(d.Opioid_Rate)
      })
      .style("fill", "#4B0082")
      .style("opacity", 0.8)


     svgs.selectAll(".label")
          .data(function(d){ return d.values })
          .enter()
          .append("text")
          .attr("x", function(d){
            return xScale(d["Age group (years)"]) + 7
          })
          .attr("y", function(d){
        return yScale(d.Opioid_Rate) + 9
      })
          .text(function(d){
            return d.Opioid_Rate
          })
          .style("font-weight", "normal")
          .style("font-size", "10px")
          .style("font-family", "Bree Serif")
          .style("fill", "white")
          .attr("text-anchor", "right")


      svgs.append("text")
        .attr("x", width/2)
        .attr("y", -20)
        .text(function(d){ return d.key})
         .attr("text-decoration", "underline")
          .style("font-size", "15px")
          .style("font-family", "Bree Serif")
          .style("fill", "black")




                });

  


   
})()