(function () {

 var w = 640;
 var h = 700;

      var margin = {
          top: 55,
          bottom: 0,
          left: 60,
          right: 100
        }

        var width = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;


        var svg = d3.select("#provinces_prescription")
        .append("svg")
        .attr("id", "chart")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



         var format = d3.format("+20")

        var xScale = d3.scaleLinear()
          .range([0, width])

        var yScale = d3.scaleBand()
          .range([height, 0])

      var yAxis = d3.axisLeft()
        .scale(yScale)
        .tickSize(-width,0,0)



  d3.csv("Opioid_prescriptions_provinces.csv", function(error, data){
    data.forEach(function(d){
      d.Province = d.Province;
      d["2012"] = +d["2012"];
      d["2016"] = +d["2016"];
      d.x_1 = +d.x_1;
      d.x_2 = +d.x_2; 
      d.difference = +d.difference
    });

   
         xScale.domain([3000, 9000])
        yScale.domain(data.map(function(d){ return d.Province }))

        svg.append("g")
            .classed("yaxis", true)
            .attr("transform", "translate(0," + -30 + ")")
            .call(yAxis)
            .selectAll("text")
                  .attr("transform", "translate("+ -10 + ",0)")

        // make arrows!!

svg.append("svg:defs")
        .selectAll("marker")
        .data(data)
        .enter()
      .append("svg:marker") 
      .attr("id", function(d){ return "arrow_" + d.Province})
      .attr("class", "triangle")
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 6)
      .attr('markerWidth', 4)
      .attr('markerHeight', 4)
      .style("stroke", function(d){
          if(d.difference > 0){
            return "brown"
          } else { 
            return "green" }
        })
      .style("fill", function(d){
          if(d.difference > 0){
            return "brown"
          } else { 
            return "green" }
        })                  // colour the line // colour the line
      .attr('orient', 'auto')
      .append('svg:path')
        .attr('d', 'M0,-5L10,0L0,5')

      svg.selectAll(".lines")
        .data(data)
        .enter()
        .append("svg:line")
        .attr("x1", function(d){
          return xScale(d["2012"])
        })
        .attr("x2", function(d){
          return xScale(d["2016"])
        })
        .attr("y1", function(d){
          return yScale(d.Province)
        })
        .attr("y2", function(d){
          return yScale(d.Province)
        })
        .attr("marker-end", function(d){ return "url(#arrow_" + d.Province +')'}) //add the marker
        .style("stroke", function(d){
          if(d.difference > 0){
            return "brown"
          } else { 
            return "green" }
        })
        .style("stroke-width", 2.5)

        

      svg.selectAll(".labels")
        .data(data)
        .enter()
        .append("text")
        .attr("x", function(d){
          if(d.difference > 0){
            return xScale(d["2016"]) + 10
          } else{
            return xScale(d["2016"]) - 35
          }
        })
        .attr("y", function(d){
          return yScale(d.Province)
        })
        .text(function(d){
          return d["2016"]
        })
        .style("fill", "black")
        .style("font-family", "Bree Serif")
        .style("font-size", "12px")

        svg.selectAll(".labels")
        .data(data)
        .enter()
        .append("text")
        .attr("x", function(d){
          if(d.difference > 0){
            return xScale(d["2012"])  - 35
          } else{
            return xScale(d["2012"]) + 10
          }

        })
        .attr("y", function(d){
          return yScale(d.Province)
        })
        .text(function(d){
          return d["2012"]
        })
        .style("fill", "black")
        .style("font-family", "Bree Serif")
        .style("font-size", "12px")


         

          svg.append("text")
            .attr("x", 305)
            .attr("y", -30)
            .text("2012")
            .style("font-size", 14)
            .style("font-family", "Bree Serif")
            .style("font-weight", "normal")

            svg.append("text")
            .attr("x", 400)
            .attr("y", -30)
            .text("2016")
            .style("font-size", 14)
            .style("font-family", "Bree Serif")
            .style("font-weight", "normal")

            svg.append("line")
              .attr("x1", 0.5)
              .attr("x2", 0.5)
              .attr("y1", 1)
              .attr("y2", 15)
              .attr("transform", "translate(320,-25)")
              .attr("stroke", "black")

              svg.append("line")
              .attr("x1", 0.5)
              .attr("x2", 0.5)
              .attr("y1", 1)
              .attr("y2", 15)
              .attr("transform", "translate(415,-25)")
              .attr("stroke", "black")



          // svg.append("text")
          //   .attr("x", -30)
          //   .attr("y", -100)
          //   .text("P.E.I and the Territories are the only regions where opioid hospitalization rates decreased")
          //   .style("font-size", 20)
          //   .style("font-family", "Bree Serif")
          //   .style("font-weight", "normal")

          
  

                });

  

})()