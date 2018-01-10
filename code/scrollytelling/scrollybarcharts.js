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

         var svg = d3.select("#Age")
        .append("svg")
        .attr("id", "chart")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



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


          svg.append("g")
              .attr("class", "xaxis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis)
              .selectAll("text")
                  .style("font-family", "Arial")
                  .style("fill", "black")
                  .style("font-size", "10px")
                  .style("opacity", 1)

    svg.selectAll(".rect")
      .data(data)
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


    d3.select("#first").on("stepin", function(){



      svg.selectAll(".rect")
      .data(data.filter(function(d){ return d.Year == "2007–2008"}))
      .transition()
      .attr("y", function(d){
        return yScale(d.Opioid_Rate)
      })
      .attr("height", function(d){
        return height - yScale(d.Opioid_Rate)
      })
      .style("fill", "#4B0082")
      .style("opacity", 0.8)

       })


    d3.select("#second").on("stepin", function(){


      svg.selectAll(".rect")
      .data(data.filter(function(d){ return d.Year == "2014–2015"}))
      .transition()
      .attr("y", function(d){
        return yScale(d.Opioid_Rate)
      })
      .attr("height", function(d){
        return height - yScale(d.Opioid_Rate)
      })
      .style("fill", "red")
      .style("opacity", 0.8)

      })

    d3.select("#third").on("stepin", function(){


       svg.selectAll(".rect")
      .data(data.filter(function(d){ return d.Year == "2008–2009"}))
      .transition()
      .attr("y", function(d){
        return yScale(d.Opioid_Rate)
      })
      .attr("height", function(d){
        return height - yScale(d.Opioid_Rate)
      })
      .style("fill", "blue")
      .style("opacity", 0.8)

       })


                });

  


   
})()