(function () {

  var w = 240;
      var h = 150;

      var margin = {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        };

        var width = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;

var svg = d3.select("#Legend")
        .append("svg")
        .attr("id", "chart")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(0" + margin.left + "," + margin.top + ")");

         svg.append("circle")
                .attr("r", 30)
                .attr("cx", 50)
                .attr("cy", 80)
                .style("stroke", "#6c6c6c")
                .style("fill-opacity", 0)
                .style("stroke-width", 1.5)
                .style("stroke-dasharray", ("3,3"))
                .style("opacity", 0.5)

                svg.append("circle")
                .attr("r", 20)
                .attr("cx", 50)
                .attr("cy", 90)
                .style("stroke", "#6c6c6c")
                .style("fill-opacity", 0)
                .style("stroke-width", 1.5)
                .style("stroke-dasharray", ("3,3"))
                .style("opacity", 0.5)


                svg.append("circle")
                .attr("r", 10)
                .attr("cx", 50)
                .attr("cy", 100)
                .style("stroke", "#6c6c6c")
                .style("fill-opacity", 0)
                .style("stroke-width", 1.5)
                .style("stroke-dasharray", ("3,3"))
                .style("opacity", 0.5)

                svg.append("line")
                  .attr("x1", 5)
                  .attr("y1", 20)
                  .attr("x2", 50)
                  .attr("y2", 20)
                  .attr("stroke-width", 1)
                  .attr("transform", "translate(50, 30)")
                  .attr("stroke", "#6c6c6c")
                  .style("stroke-dasharray", ("3,3"))
                  .style("opacity", 0.5)


                  svg.append("line")
                  .attr("x1", 5)
                  .attr("y1", 20)
                  .attr("x2", 50)
                  .attr("y2", 20)
                  .attr("stroke-width", 1)
                  .attr("transform", "translate(50, 50)")
                  .attr("stroke", "#6c6c6c")
                  .style("stroke-dasharray", ("3,3"))
                  .style("opacity", 0.5)


                  svg.append("line")
                  .attr("x1", 5)
                  .attr("y1", 20)
                  .attr("x2", 50)
                  .attr("y2", 20)
                  .attr("stroke-width", 1)
                  .attr("transform", "translate(50, 70)")
                  .attr("stroke", "#6c6c6c")
                  .style("stroke-dasharray", ("3,3"))
                  .style("opacity", 0.5)

                  svg.append("text")
                .attr("x", 110)
                .attr("y", 55)
                .attr("font-size",11)
                .style("fill", "#6c6c6c")
                .text("6,000 Million")
                .style("font-weight", "normal")


              svg.append("text")
                .attr("x", 110)
                .attr("y", 75)
                .attr("font-size",11)
                .style("fill", "#6c6c6c")
                .text("3,000 Million")
                .style("font-weight", "normal")


              svg.append("text")
                .attr("x", 110)
                .attr("y", 95)
                .attr("font-size",11)
                .style("fill", "#6c6c6c")
                .text("1,000 Million")
                .style("font-weight", "normal")

                svg.append("text")
                .attr("x", 20)
                .attr("y", 30)
                .attr("font-size",15)
                .style("fill", "#6c6c6c")
                .text("Millions of dollars in transfers")
                .style("font-weight", "normal")


  })()