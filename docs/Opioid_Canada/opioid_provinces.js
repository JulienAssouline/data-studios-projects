(function () {

 var w = 377;
 var h = 1000;

      var margin = {
          top: 160,
          bottom: 0,
          left: 40,
          right: 80
        }

        var width = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;


        var svg = d3.select("#provinces")
        .append("svg")
        .attr("id", "chart")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        var ytickValues = [6, 8, 10, 12, 14, 16, 18, 20]

         var format = d3.format("+20")

        var xScale = d3.scaleLinear()
          .range([0, width])

        var yScale = d3.scaleLinear()
          .range([height, 0])

          provinces_fill = ["red"];

      var yAxis = d3.axisLeft()
        .scale(yScale)
        .tickValues(ytickValues)
        .tickSize(-width,0,0)



  d3.csv("opioid_province.csv", function(error, data){
    data.forEach(function(d){
      d.provinces = d.provinces;
      d["2007–2008"] = +d["2007–2008"];
      d["2014–2015"] = +d["2014–2015"];
      d.x_1 = +d.x_1;
      d.x_2 = +d.x_2 ; 
      d.difference_2007_2015 = +d.difference_2007_2015; 
       console.log(isNumeric(d.difference_2007_2015))
    });

   
        xScale.domain([1, 2])
        yScale.domain([6, 20])

        svg.append("g")
            .classed("yaxis", true)
            .attr("transform", "translate(0," + -15 + ")")
            .call(yAxis)
            .selectAll("text")
                  .attr("transform", "translate("+ -10 + ",0)")

      svg.selectAll(".lines")
        .data(data)
        .enter()
        .append("line")
        .attr("class", function(d){
          return "lines " + d.difference_2007_2015
        })
        .attr("x1", function(d){
          return xScale(d.x_1)
        })
        .attr("x2", function(d){
          return xScale(d.x_2)
        })
        .attr("y1", function(d){
          return yScale(d["2007–2008"])
        })
        .attr("y2", function(d){
          return yScale(d["2014–2015"])
        })
        .style("stroke", function(d){
          if(d.difference_2007_2015 > 0){
            return "darkred"
          } else { 
            return "green" }
        })

      
      // 2007-2008
      svg.selectAll(".point")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 2)
        .attr("cx", function(d){
            return xScale(d.x_1)
        })
        .attr("cy", function(d){
          return yScale(d["2007–2008"])
        })
        .style("fill", function(d){
          if(d.difference_2007_2015 > 0){
            return "darkred"
          } else { 
            return "green" }
        })

         // svg.selectAll(".labels")
         //  .data(data)
         //  .enter()
         //  .append("text")
         //  .attr("x", function(d){
         //    return xScale(d.x_1) - 40
         //  })
         //  .attr("y", function(d){
         //    return yScale(d["2007–2008"])
         //  })
         //  .text(function(d){
         //    return d.provinces
         //  })


        // 2014–2015  
      svg.selectAll(".point")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", 2)
        .attr("cx", function(d){
            return xScale(d.x_2)
        })
        .attr("cy", function(d){
          return yScale(d["2014–2015"])
        })
        .style("fill", function(d){
          if(d.difference_2007_2015 > 0){
            return "darkred"
          } else { 
            return "green" }
        })

          svg.selectAll(".labels")
          .data(data)
          .enter()
          .append("text")
          .attr("x", function(d){
            return xScale(d.x_2) + 10
          })
          .attr("y", function(d){
            return yScale(d["2014–2015"])
          })
          .text(function(d){
            return d.provinces + " " + format(d.difference_2007_2015)
          })
          .style("fill", function(d){
          if(d.difference_2007_2015 > 0){
            return "darkred"
          } else { 
            return "green" }
        })
          .style("font-family", "Bree Serif")
          .style("font-size", 12)
          .style("font-weight", "normal")
          // .on("mouseover", function(d){
          //   d3.selectAll(".lines").style("opacity", 0.4)
          //   d3.select("" + d.difference_2007_2015).style("opacity", 1)
          // })
          // .on("mouseout", function(d){
          //   d3.selectAll(".lines").style("opacity", 1)
          // })

          svg.append("text")
            .attr("x", -40)
            .attr("y", -140)
            .text("PEI and the Territories are the only regions")
            .style("font-size", 20)
            .style("font-family", "Bree Serif")
            .style("font-weight", "bold")

          svg.append("text")
            .attr("x", -40)
            .attr("y", -115)
            .text("where opioid hospitalization rates decreased")
            .style("font-size", 20)
            .style("font-family", "Bree Serif")
            .style("font-weight", "bold")

            svg.append("text")
        .attr("x", -40)
        .attr("y", -90)
        .text("per 100,000 documented cases")
        .style("font-size", 16)
        .style("font-family", "Bree Serif")
        .style("font-weight", "normal")


         

          svg.append("text")
            .attr("x", -20)
            .attr("y", -40)
            .text("2007-2008")
            .style("font-size", 16)
            .style("font-family", "Bree Serif")
            .style("font-weight", "normal")


          svg.append("text")
            .attr("x", 210)
            .attr("y", -40)
            .text("2014–2015")
            .style("font-size", 16)
            .style("font-family", "Bree Serif")
            .style("font-weight", "normal")


          
  

                });

  

})()