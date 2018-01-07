(function () {

      //Width and height
      var w = 230;
      var h = 300;

      var margin = {
          top: 40,
          bottom: 40,
          left: 40,
          right: 80
        }

        var width = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;

        var ytickValues_2 = [0, 500000000];
        var ytickFormat = ["0", "500 million $"];
        var ytickFormat_1 = ["", "Rotten Tomatoes Score"];

        var ytickValues = [0, 60, 100];

        var xScale = d3.scaleLinear()
                  .range([0, width])

        var yScale = d3.scaleLinear()
          .range([height, 0])

        var yScale_2 = d3.scaleLinear()
          .range([height, 0])

        var yAxis = d3.axisLeft()
          .scale(yScale)
          .tickValues(ytickValues)
          .tickSize(1)
          .tickSizeOuter(0)

          var yAxis_3 = d3.axisRight()
          .scale(yScale)
          .tickValues(ytickValues)
          .tickFormat(function(d,i){ return ytickFormat_1[i] })         
          .tickSize(0)
          .tickSizeOuter(0)

         var yAxis_2 = d3.axisRight()
          .scale(yScale_2)
          .tickValues(ytickValues_2)
          .tickFormat(function(d,i){ return ytickFormat[i] })         
          .tickSize(1)
          .tickSizeOuter(0)



          d3.csv("video_games_budget_World.csv", function(error, data){
            data.forEach(function(d){
              d.Worldwide_Gross = +d.Worldwide_Gross;
              d.Name = d.Name;
              d.Production_Budget = +d.Production_Budget;
              d["Rotten Tomatoes (%)"] = +d["Rotten Tomatoes (%)"];
              d["Metacritic (%)"] = +d["Metacritic (%)"];
              d.Genre = d.Genre;
              d.profit_loss = +d.profit_loss;
              d.Year = +d.Year;
              d.x_1 = +d.x_1;
              d.x_2 = +d.x_2;

            })

            var movies = d3.nest()
              .key(function(d){
                return d.Name
              })
              .entries(data);
          
            xScale.domain([1, 2])
            yScale.domain([0, 100])
            yScale_2.domain([0, 500000000])

            var svgs = d3.select("#video_games_movies_world")
              .selectAll("svg")
              .data(movies)
              .enter()
              .append("svg")
              .attr("id", "chart")
              .attr("width", w)
              .attr("height", h)
              .append("g")
              .attr("transform",  "translate(" + margin.left + "," + margin.top + ")")

            svgs.append("g")
              .attr("class", "yaxis")
              .attr("transform", "translate(110,0)")
              .call(yAxis_2)
              .selectAll("text")
                .style("fill", "grey")
              

               svgs.append("g")
              .attr("class", "yaxis")
              .attr("transform", "translate(0,0)")
              .call(yAxis)
              .selectAll("text")
                .style("fill", "grey")

              //  svgs.append("g")
              // .attr("class", "yaxis")
              // .attr("transform", "translate(0,0)")
              // .call(yAxis_3)

              svgs.selectAll(".path")
                .data(function(d){ return d.values; })
                .enter()
                .append("path")
                .attr("class", "triangle")
                .attr("d", function(d){
                  var start = xScale(d.x_1),
                      Tomatoes = yScale(d["Rotten Tomatoes (%)"]),
                      end = xScale(d.x_2),
                      Gross = yScale_2(d.Worldwide_Gross),
                      Budget = yScale_2(d.Production_Budget);
                  return "M" + start + " " + Tomatoes + "L" + end + " " + Gross + "L" + end +   " " + Budget + " " + "z"
                })
                .style("fill", function(d){
                    if(d.profit_loss > 0){
                      return "#55c4c5"
                    } 
                    if(d.profit_loss < 0){
                      return "#f28d71"
                    } 
                  })


              svgs.selectAll("circles")
                .data(function(d){ return d.values; })
                .enter()
                .append("circle")
                .attr("class", "first")
                .attr("r", 2.5)
                .attr("cx", function(d){
                  return xScale(d.x_1)
                })
                .attr("cy", function(d){
                  return yScale(d["Rotten Tomatoes (%)"])
                })
                .style("fill", function(d){
                    if(d.profit_loss > 0){
                      return "#55c4c5"
                    } 
                    if(d.profit_loss < 0){
                      return "#f28d71"
                    } 
                  })


      svgs.append("text")
        .each(function(d){
          if((d.key == "Lara Croft Tomb Raider:: The Cradle of Life, 2003") || (d.key == "Prince of Persia:: The Sands of Time, 2010") || (d.key == "Final Fantasy:: The Spirits Within, 2001") || (d.key == "Resident Evil:: The Final Chapter, 2017")){
            var arr = d.key.split(": ") 
            var year = d.values.Year
          } else {
            var arr = d.key.split(".")
            var year = d.values.Year
          }
          for (i = 0; i < arr.length; i++){
            d3.select(this) 
            .append("tspan")
            .append("tspan") // applying a tspan which is how you can create line breaks with svgs
            .text(arr[i])
            .attr("dy", 13)
            .attr("x", -5)
            .attr("class", "tspan" + i);
          }
        })
        .attr("y", -40)
        .style("font-size", "12px")
        .attr("text-decoration", "underline")
        .style("fill", "black")


             


          })


      
  })()