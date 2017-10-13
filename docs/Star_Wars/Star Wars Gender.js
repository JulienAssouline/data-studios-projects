(function () {

      //Width and height

      // var node_radius = 5,
      // padding = 1,
      // cluster_padding = 10,
      // num_nodes = 200;

      var w = 1050;
      var h = 1400;

      var margin = {
          top: 20,
          bottom: 0,
          left: 0,
          right: 0
        }

        var width = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;


        var svg = d3.select("#bubbles")
        .append("svg")
        .attr("id", "chart")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(0,0)");

        var radiusScale = d3.scaleSqrt()
          .domain([1, 3224])
          .range([5, 30])


        var simulation = d3.forceSimulation()
          .force("x", d3.forceX(function(d){
            if(d.Movie == "A New Hope"){
              if(d.Gender == "Male"){
                return 200
              }
              if(d.Gender == "Female"){
                return 350
              } else {
                return 450
              }
            }
            if(d.Movie == "The Empire Strikes Back"){
               if(d.Gender == "Male"){
                return 650
              }
              if(d.Gender == "Female"){
                return 800
              } else {
                return 900
              }
            }
            if(d.Movie == "Return of the Jedi"){
              if(d.Gender == "Male"){
                return 200
              }
              if(d.Gender == "Female"){
                return 350
              } else {
                return 450
              }
            }
            if(d.Movie == "The Phantom Menace"){
              if(d.Gender == "Male"){
                return 650
              }
              if(d.Gender == "Female"){
                return 800
              } else {
                return 900
              }
            }
            if(d.Movie == "Attack of the Clones"){
              if(d.Gender == "Male"){
                return 200
              }
              if(d.Gender == "Female"){
                return 350
              } else {
                return 450
              }
            }
            if(d.Movie == "Revenge of the Sith"){
              if(d.Gender == "Male"){
                return 650
              }
              if(d.Gender == "Female"){
                return 800
              } else {
                return 900
              }
            }
            if(d.Movie == "The Force Awakens"){
              if(d.Gender == "Male"){
                return 200
              }
              if(d.Gender == "Female"){
                return 350
              } else {
                return 450
              }
            }
            if(d.Movie == "Rogue One"){
              if(d.Gender == "Male"){
                return 650
              }
              if(d.Gender == "Female"){
                return 800
              } else {
                return 900
              }
            }
          }).strength(0.07))
          .force("y", d3.forceY(function(d){
            if(d.Movie == "A New Hope"){
              return 350
            }
            if(d.Movie == "The Empire Strikes Back"){
              return 350
            }
            if(d.Movie == "Return of the Jedi"){
              return 650
            }
            if(d.Movie == "The Phantom Menace"){
              return 650
            }
            if(d.Movie == "Attack of the Clones"){
              return 950
            }
            if(d.Movie == "Revenge of the Sith"){
              return 950
            }
            if(d.Movie == "The Force Awakens"){
              return 1250
            }
            if(d.Movie == "Rogue One"){
              return 1250
            }
          }).strength(0.08))
          .force("collide", d3.forceCollide(function(d){
            return radiusScale(d.Word_count);
          }))

          var div = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)


          d3.csv("Star_Wars_Gender.csv", function(error, data){
            data.forEach(function(d){
              d.Word_count = +d.Word_count;
              d.Movie = d.Movie;
              d.Characters = d.Characters;
              d.Gender = d.Gender;
            })

            console.log(data)

            var circles = svg.selectAll(".words")
              .data(data)
              .enter()
              .append("circle")
              .attr("r", function(d){
                return radiusScale(d.Word_count)
              })
              .style("fill", function(d){
                if(d.Gender == "Male"){
                  return "#41c5de"
                } 
                if(d.Gender == "Female"){
                  return "#e03f8d"
                } else {
                  return "lightgrey"
                }
              })
              .on("mouseover", function(d){
                div.transition()
                .duration(200)
                .style("opacity", 1)
                var element = d3.select(this);
                element.style("stroke", "darkgrey")
                element.style("stroke-width", 1)
                div.html(d.Characters + ": " + d.Word_count+" words")
                div.style("visibility", "visible")
                .style("left", (d3.event.pageX - 20) + "px")    
                .style("top", (d3.event.pageY - 45) + "px")
              })
              .on("mousemove", function(d){
            div.style("left", (d3.event.pageX - 20) + "px")    
            .style("top", (d3.event.pageY - 45) + "px")
          })
              .on("mouseout", function(d){
                // div.transition()
                // .duration(500)
                // .style("opacity", 0)
                var element = d3.select(this)
                element.style("stroke", "none")
                div.style("visibility", "hidden")

              })
              // .style("stroke", function(d){
              //   if(d.Characters == "Fixer" && d.Movie == "A New Hope"){
              //     return "#6c6c6c"
              //   }
              // })



              // annotating circle
              

              svg.append("text")
                              .attr("x", 70)
                              .attr("y", 245)
                              .attr("font-family", "Bree Serif")
                              .attr("font-size",17)
                              .style("fill", "#6c6c6c")
                              .text("Every circle is a character")
                              .style("font-weight", "normal")

                svg.append("line")
                  .attr("x1", 1)
                  .attr("y1", 5)
                  .attr("x2", 1)
                  .attr("y2", 25)
                  .attr("stroke-width", 0.5)
                  .attr("transform", "translate(154, 250)")
                  .attr("stroke", "#6c6c6c")



              // LEGEN SIZE

              svg.append("circle")
                .attr("r", 30)
                .attr("cx", 650)
                .attr("cy", 170)
                .style("stroke", "#6c6c6c")
                .style("fill-opacity", 0)
                .style("stroke-width", 1.5)
                .style("stroke-dasharray", ("3,3"))
                .style("opacity", 0.5)

                svg.append("circle")
                .attr("r", 20)
                .attr("cx", 650)
                .attr("cy", 180)
                .style("stroke", "#6c6c6c")
                .style("fill-opacity", 0)
                .style("stroke-width", 1.5)
                .style("stroke-dasharray", ("3,3"))
                .style("opacity", 0.5)


                svg.append("circle")
                .attr("r", 10)
                .attr("cx", 650)
                .attr("cy", 190)
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
                  .attr("transform", "translate(650, 120)")
                  .attr("stroke", "#6c6c6c")
                  .style("stroke-dasharray", ("3,3"))
                  .style("opacity", 0.5)


                  svg.append("line")
                  .attr("x1", 5)
                  .attr("y1", 20)
                  .attr("x2", 50)
                  .attr("y2", 20)
                  .attr("stroke-width", 1)
                  .attr("transform", "translate(650, 140)")
                  .attr("stroke", "#6c6c6c")
                  .style("stroke-dasharray", ("3,3"))
                  .style("opacity", 0.5)


                  svg.append("line")
                  .attr("x1", 5)
                  .attr("y1", 20)
                  .attr("x2", 50)
                  .attr("y2", 20)
                  .attr("stroke-width", 1)
                  .attr("transform", "translate(650, 160)")
                  .attr("stroke", "#6c6c6c")
                  .style("stroke-dasharray", ("3,3"))
                  .style("opacity", 0.5)


              svg.append("text")
                .attr("x", 710)
                .attr("y", 145)
                .attr("font-family", "Bree Serif")
                .attr("font-size",13)
                .style("fill", "#6c6c6c")
                .text("1,500 words")
                .style("font-weight", "normal")


              svg.append("text")
                .attr("x", 710)
                .attr("y", 165)
                .attr("font-family", "Bree Serif")
                .attr("font-size",13)
                .style("fill", "#6c6c6c")
                .text("1,000 words")
                .style("font-weight", "normal")


              svg.append("text")
                .attr("x", 710)
                .attr("y", 185)
                .attr("font-family", "Bree Serif")
                .attr("font-size",13)
                .style("fill", "#6c6c6c")
                .text("500 words")
                .style("font-weight", "normal")


                svg.append("text")
                .attr("x", 630)
                .attr("y", 95)
                .attr("font-family", "Bree Serif")
                .attr("font-size",17)
                .style("fill", "#6c6c6c")
                .text("Circle size represents the amount of words spoken.")
                .style("font-weight", "normal")


                svg.append("text")
                .attr("x", 630)
                .attr("y", 115)
                .attr("font-family", "Bree Serif")
                .attr("font-size",17)
                .style("fill", "#6c6c6c")
                .text("The bigger the circle the more words were said.")
                .style("font-weight", "normal")




              // LEGEND COLOR
              // Men 
              svg.append("circle")
                .attr("r", 10)
                .attr("cx", 200)
                .attr("cy", 150)
                .style("fill", "#41c5de")

              svg.append("text")
                .attr("x", 220)
                .attr("y", 155)
                .attr("font-family", "Bree Serif")
                .attr("font-size",17)
                .style("fill", "#41c5de")
                .text("Men")
                .style("font-weight", "normal")


              // Women

              svg.append("circle")
                .attr("r", 10)
                .attr("cx", 300)
                .attr("cy", 150)
                .style("fill", "#e03f8d")

                svg.append("text")
                .attr("x", 320)
                .attr("y", 155)
                .attr("font-family", "Bree Serif")
                .attr("font-size",17)
                .style("fill", "#e03f8d")
                .text("Women")
                .style("font-weight", "normal")


              // Robots

              svg.append("circle")
                .attr("r", 10)
                .attr("cx", 400)
                .attr("cy", 150)
                .style("fill", "lightgrey")


                svg.append("text")
                .attr("x", 420)
                .attr("y", 155)
                .attr("font-family", "Bree Serif")
                .attr("font-size",17)
                .style("fill", "lightgrey")
                .text("Robots")
                .style("font-weight", "normal")


                svg.append("text")
                .attr("x", 190)
                .attr("y", 105)
                .attr("font-family", "Bree Serif")
                .attr("font-size",17)
                .style("fill", "#6c6c6c")
                .text("Color shows the gender")
                .style("font-weight", "normal")




                // title of movies
              svg.append("text")
                .attr("x", 300)
                .attr("y", 240)
                .attr("font-family", "Bree Serif")
                .attr("font-size",17)
                .text("A New Hope (1977)")
                .style("text-align", "center")
                .attr("class", "title_wars")




              svg.append("text")
                .attr("x", 720)
                .attr("y", 240)
                .attr("font-family", "Bree Serif")
                .attr("font-size", 17)
                .text("The Empire Strikes Back (1980)")
                .style("text-align", "center")
                .attr("class", "title_wars")



              svg.append("text")
                .attr("x", 300)
                .attr("y", 540)
                .attr("font-family", "Bree Serif")
                .attr("font-size", 17)
                .text("Return of the Jedi (1983)")
                .style("text-align", "center")
                .attr("class", "title_wars")



              svg.append("text")
                .attr("x", 720)
                .attr("y", 540)
                .attr("font-family", "Bree Serif")
                .attr("font-size", 17)
                .text("The Phantom Menace (1999)")
                .style("text-align", "center")
                .attr("class", "title_wars")



                svg.append("text")
                .attr("x", 300)
                .attr("y", 800)
                .attr("font-family", "Bree Serif")
                .attr("font-size", 17)
                .text("Attack of the Clones (2002)")
                .style("text-align", "center")
                .attr("class", "title_wars")



               svg.append("text")
                .attr("x", 720)
                .attr("y", 800)
                .attr("font-family", "Bree Serif")
                .attr("font-size", 17)
                .text("Revenge of the Sith (2005)")
                .style("text-align", "center")
                .attr("class", "title_wars")



                svg.append("text")
                .attr("x", 300)
                .attr("y", 1100)
                .attr("font-family", "Bree Serif")
                .attr("font-size", 17)
                .text("The Force Awakens (2015)")
                .style("text-align", "center")
                .attr("class", "title_wars")



                svg.append("text")
                .attr("x", 720)
                .attr("y", 1100)
                .attr("font-family", "Bree Serif")
                .attr("font-size", 17)
                .text("Rogue One (2016)")
                .style("text-align", "center")
                .attr("class", "title_wars")


              svg.append("text")
                .attr("x",150)
                .attr("y", 30)
                .attr("font-family", "Bree Serif")
                .attr("font-size", 30)
                .text("Dialogue of Male, Female, and Robot Characters in Star Wars")
                .attr("font-weight", "bold")
              

              simulation.nodes(data)
                .on("tick", ticked)

              function ticked(){
                circles
                  .attr("cx", function(d){
                    return d.x
                  })
                  .attr("cy", function(d){
                    return d.y
                  })
              }



          })


  })()