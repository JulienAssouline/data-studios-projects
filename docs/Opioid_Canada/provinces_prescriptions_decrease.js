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


        var svg = d3.select("#provinces_prescription_d")
        .append("svg")
        .attr("id", "chart")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        var ytickValues = [3000, 4000, 5000, 6000, 7000, 8000]

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



  d3.csv("Opioid_prescriptions_provinces.csv", function(error, data){
    data.forEach(function(d){
      d.Province = d.Province;
      d["2012"] = +d["2012"];
      d["2016"] = +d["2016"];
      d.x_1 = +d.x_1;
      d.x_2 = +d.x_2; 
      d.difference = +d.difference
    });

   
        xScale.domain([1, 2])
        yScale.domain([3000, 8300])

        svg.append("g")
            .classed("yaxis", true)
            .attr("transform", "translate(0," + -15 + ")")
            .call(yAxis)
            .selectAll("text")
                  .attr("transform", "translate("+ -10 + ",0)")

      svg.selectAll(".lines")
        .data(data.filter(function(d){
          return d.difference < 0
        }))
        .enter()
        .append("line")
        .attr("class", "lines")
        .attr("x1", function(d){
          return xScale(d.x_1)
        })
        .attr("x2", function(d){
          return xScale(d.x_2)
        })
        .attr("y1", function(d){
          return yScale(d["2012"])
        })
        .attr("y2", function(d){
          return yScale(d["2016"])
        })
        .style("stroke", function(d){
          if(d.difference > 0){
            return "darkred"
          } else { 
            return "green" }
        })

      
      // 2007-2008
      svg.selectAll(".point")
        .data(data.filter(function(d){
          return d.difference < 0
        }))
        .enter()
        .append("circle")
        .attr("r", 2)
        .attr("cx", function(d){
            return xScale(d.x_1)
        })
        .attr("cy", function(d){
          return yScale(d["2012"])
        })
        .style("fill", function(d){
          if(d.difference > 0){
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
        .data(data.filter(function(d){
          return d.difference < 0
        }))
        .enter()
        .append("circle")
        .attr("r", 2)
        .attr("cx", function(d){
            return xScale(d.x_2)
        })
        .attr("cy", function(d){
          return yScale(d["2016"])
        })
        .style("fill", function(d){
          if(d.difference > 0){
            return "darkred"
          } else { 
            return "green" }
        })

          svg.selectAll(".labels")
          .data(data.filter(function(d){
          return d.difference < 0
        }))
          .enter()
          .append("text")
          .attr("x", function(d){
            return xScale(d.x_2) + 10
          })
          .attr("y", function(d){
            return yScale(d["2016"])
          })
          .text(function(d){
            return d.Province + " " + format(d.difference)
          })
          .style("fill", function(d){
          if(d.difference > 0){
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
            .attr("x", 90)
            .attr("y", -100)
            .text("Decrease")
            .style("font-size", 23)
            .style("font-family", "Bree Serif")
            .style("fill", "darkgreen")



         

          svg.append("text")
            .attr("x", -20)
            .attr("y", -40)
            .text("2012")
            .style("font-size", 16)
            .style("font-family", "Bree Serif")
            .style("font-weight", "normal")


          svg.append("text")
            .attr("x", 240)
            .attr("y", -40)
            .text("2016")
            .style("font-size", 16)
            .style("font-family", "Bree Serif")
            .style("font-weight", "normal")


          
  

                });

  

})()