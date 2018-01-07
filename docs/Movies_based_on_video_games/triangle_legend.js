(function () {

      //Width and height
      var w = 260;
      var h = 300;

      var margin = {
          top: 70,
          bottom: 40,
          left: 40,
          right: 90
        }

        var width = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;

        var ytickValues_2 = [0, 500000000];
        var ytickFormat = ["0", "500 million $"];
        var ytickFormat_1 = ["", "", "Rotten Tomatoes Score"];

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
          .tickSize(0)
          .tickSizeOuter(0)

      var chart1 = d3.select("#legend")
                .append("svg")
                .attr("id", "chart")
                .attr("width", w)
                .attr("height", h)
                .append("g")
                .attr("transform", "translate(0" + margin.left + "," + margin.top + ")");

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

          
            xScale.domain([1, 2])
            yScale.domain([0, 100])
            yScale_2.domain([0, 500000000])

            chart1.append("g")
              .attr("class", "yaxis")
              .attr("transform", "translate(130,0)")
              .call(yAxis_2)
              // .selectAll("text")
              //   .style("fill", "none")

               chart1.append("g")
              .attr("class", "yaxis")
              .attr("transform", "translate(0,0)")
              .call(yAxis)

               chart1.append("g")
              .attr("class", "yaxis")
              .attr("transform", "translate(0,0)")
              .call(yAxis_3)

              chart1.selectAll(".path")
                .data(data.filter(function(d){ return d.Name == "The Angry Birds Movie, 2016"}))
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
                .style("fill", "#55c4c5")


              chart1.selectAll("circles")
                .data(data.filter(function(d){ return d.Name == "The Angry Birds Movie, 2016"}))
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
                .style("fill", "#55c4c5")

              chart1.append("text")
                .attr("x", 35)
                .attr("y", -20)
                .text("Movie Title")
                 .attr("text-decoration", "underline")
                  .style("font-size", "13px")
                  .style("font-family", "Arial")
                  .style("fill", "black")

              chart1.append("text")
                .attr("x", 140)
                .attr("y", 60)
                .text("Worldwide Gross")
                  .style("font-size", "10px")
                  .style("font-family", "Arial")
                  .style("fill", "black")

              chart1.append("text")
                .attr("x", 140)
                .attr("y", 165)
                .text("Budget")
                  .style("font-size", "10px")
                  .style("font-family", "Arial")
                  .style("fill", "black")

              chart1.append("text")
                .attr("x", 140)
                .attr("y", 115)
                .text("Profit")
                  .style("font-size", "13px")
                  .style("font-family", "Arial")
                  .style("fill", "#55c4c5")
             
          })

    var chart2 = d3.select("#legend")
                .append("svg")
                .attr("id", "chart")
                .attr("width", w)
                .attr("height", h)
                .append("g")
                .attr("transform", "translate(0" + margin.left + "," + margin.top + ")");

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

          
            xScale.domain([1, 2])
            yScale.domain([0, 100])
            yScale_2.domain([0, 500000000])

            chart2.append("g")
              .attr("class", "yaxis")
              .attr("transform", "translate(130,0)")
              .call(yAxis_2)
              // .selectAll("text")
              //   .style("fill", "none")

               chart2.append("g")
              .attr("class", "yaxis")
              .attr("transform", "translate(0,0)")
              .call(yAxis)

               chart2.append("g")
              .attr("class", "yaxis")
              .attr("transform", "translate(0,0)")
              .call(yAxis_3)

              chart2.selectAll(".path")
                .data(data.filter(function(d){ return d.Name == "The Angry Birds Movie, 2016"}))
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
                .style("fill", "#f28d71")


              chart2.selectAll("circles")
                .data(data.filter(function(d){ return d.Name == "The Angry Birds Movie, 2016"}))
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
                .style("fill", "#f28d71")

              chart2.append("text")
                .attr("x", 35)
                .attr("y", -20)
                .text("Movie Title")
                 .attr("text-decoration", "underline")
                  .style("font-size", "13px")
                  .style("font-family", "Arial")
                  .style("fill", "black")

              chart2.append("text")
                .attr("x", 140)
                .attr("y", 60)
                .text("Budget")
                  .style("font-size", "10px")
                  .style("font-family", "Arial")
                  .style("fill", "black")

              chart2.append("text")
                .attr("x", 140)
                .attr("y", 165)
                .text("Worldwide Gross")
                  .style("font-size", "10px")
                  .style("font-family", "Arial")
                  .style("fill", "black")

              chart2.append("text")
                .attr("x", 140)
                .attr("y", 115)
                .text("Loss")
                  .style("font-size", "13px")
                  .style("font-family", "Arial")
                  .style("fill", "#f28d71")
             
          })

      
  })()