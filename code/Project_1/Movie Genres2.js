  (function () {
    var w = 820;
      var h = 510;

      var margin = {
          top: 60,
          bottom:10,
          left: 170,
          right: 200
        }

        var width = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;


        var svg = d3.select("#Genres")
        .append("svg")
        .attr("id", "chart1")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(0" + margin.left + "," + margin.top + ")");

        var yScale = d3.scaleBand()
          .rangeRound([0, width])

          var yAxis = d3.axisLeft()
            .scale(yScale)

       
          d3.csv("Genres.csv", function(error, data){
            data.forEach(function(d){
              d.index = d.index;
              d.count = +d.count;
            })

            yScale.domain(data.map(function(entry){ return entry.index; }))

            svg.selectAll(".rect")
              .data(data)
              .enter()
              .append("rect")
              .classed("bar", true)
              .attr("x", 0)
              .attr("y", function(d, i){
                return yScale(d.index);
              })
              .attr("width", function(d,i){
                return d.count + 4;
              })
              .attr("height", 13)
              .style("fill", function(d){
                if(d.index == "Drama"){
                  return "#DAA520"
                } if(d.index == "Action"){
                  return "#CCC"
                } if(d.index == "Foreign / Action"){
                  return "#CCC"
                } if(d.index == "Action / Adventure"){
                  return "#CCC"
                } if(d.index == "Action / Crime"){
                  return "#CCC"
                } else { 
                  return "#CCC"
                }
              })

              svg.selectAll(".rect-labels")
                .data(data)
                .enter()
                .append("text")
                .classed("bar-label", true)
                .attr("x", function(d){
                  return d.count;
                })
                .attr("y", function(d, i){
                  return yScale(d.index);
                })
                .text(function(d){
                  return d.count;
                })
                .attr("dx", 10)
                .attr("dy", 11)
                .style("font-size", "12px")
                .style("fill", "grey")

                svg.append("g")
                  .attr("class", "y axis1")
                  .attr("transform", "translate (0,0)")
                  .call(yAxis)
                    .selectAll("text")
                    .style("fill", "black")
                    .style("font-size", "12px")
                    .style("font-weight", function(d){
                      if(d.index == "Action"){
                            return "bold"
                          } if(d.index == "Thriller"){
                            return "bold"
                          } if(d.index == "Action / Adventure"){
                            return "bold"
                          } if(d.index == "Action / Crime"){
                            return "bold"
                          } else { 
                            return "normal"
                          }
                    })

                  svg.append("text")
                    .attr("x", 0)
                    .attr("y", -30)
                    .text("Make dramas, not action movies!")
                    .style("font-size", "20px")
                    .style("font-weight", "bold")

                  svg.append("text")
                    .attr("x", 0)
                    .attr("y", -12)
                    .text("The genre of the movies voted for by critics, on the BBC's list of top movies for the 21st century.")
                    .style("font-size", "15px")

                   svg.append("line")
                    .attr("x1", 5)
                    .attr("y1", 20)
                    .attr("x2", 45)
                    .attr("y2", 20)
                    .attr("stroke-width", 1)
                    .attr("transform", "translate(120, -12)")
                    .attr("stroke", "grey");

                  svg.append("text")
                    .attr("x", 173)
                    .attr("y", 12)
                    .text("I guess Box Office Mojo was too lazy to find out")
                    .style("font-size", "13px")
                    .style("fill", "grey")


                  svg.append("text")
                    .attr("x", 173)
                    .attr("y", 27)
                    .text("the actual genre of non english speaking movies")
                    .style("font-size", "13px")
                    .style("fill", "grey")

                

            })
  })()