(function () {

      //Width and height
      var w = 1030;
      var h = 700;

      var margin = {
          top: 80,
          bottom: 40,
          left: 200,
          right: 200
        }

        var width = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;


    var svg = d3.select("#World_Domestic")
        .append("svg")
        .attr("id", "chart")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var xtickValues = [10, 20, 30, 40, 50, 60, 70, 80, 90];

        var xScale = d3.scaleLinear()
          .range([0, width])

        var yScale = d3.scaleBand()
          .rangeRound([height, 0])

        var yAxis = d3.axisLeft()
          .scale(yScale)

          var xAxis = d3.axisTop()
            .scale(xScale)
            .tickValues(xtickValues)
            .tickSize(-height, -height)
            .tickFormat(function(d){ return d + "%"})


          // var xGridlines = d3.axisBottom()
          //   .scale(xScale)
          //   .tickSize(-height, -height)
          //   .tickFormat("")
          //   .tickSizeOuter(0)

         var stack = d3.stack()
          .keys(["Domestic_percent_Gross", "Worldwide_percent"])



        var colors = d3.scaleOrdinal()
          .range(["#55c4c5", "#f9c776"])

          d3.csv("video_games_budget_World_1.csv", function(error, data){
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
              d.Total = +d.Total;
              d.Domestic_percent_Gross = +d.Domestic_percent_Gross;
              d.Worldwide_percent = +d.Worldwide_percent;
            })



            var series = stack(data)

            console.log(series)

            xScale.domain([0, 100])
            yScale.domain(data.map(function(d){ return d.Name }))

          
          

            var groups = svg.selectAll("g")
              .data(series)
              .enter()
              .append("g")
              .style("fill", function(d, i){ return colors(i) })

        
            groups.selectAll(".rect")
              .data(function(d){
                return d;
              })
              .enter()
              .append("rect")
              .attr("x", function(d){
                return xScale(d[0])
              })
              .attr("y", function(d, i){
                return yScale(d.data.Name)
              })
              .attr("height", yScale.bandwidth() - 3)
              .attr("width", function(d){
                return (xScale(d[1]) - xScale(d[0]) );
              })
              .style("opacity", 1)


               svg.append("g")
                .attr("class", "xaxis")
                .attr("transform", "translate(0," + -0 +")")
                .call(xAxis)
                  .selectAll("text")
                  .attr("fill", function(d){
                    return (+d == 50) ? "black" : "grey"; // if both tick values are 60 & 75 give back black, else grey.
                  })
                  .attr("font-weight", function(d){
                    return (+d == 50) ? "bold" : "normal";
                  })
                  .style("font-family", "georgia")


                svg.append("g")
                .attr("class", "yaxis_bar")
                .attr("transform", "translate(0," + -2 +")")
                .call(yAxis)
                  .selectAll("text")
                    .attr("fill", "grey")
                    .style("font-family", "georgia")


            // groups.selectAll(".labels")
            //   .data(function(d){
            //     return d;
            //   })
            //   .enter()
            //   .append("text")
            //   .attr("x", function(d){
            //     return xScale(d[0])
            //   })
            //   .attr("y", function(d){
            //     return d.data.Name
            //   })
            //   .text(function(d){
            //     return d[0]
            //   })

              // groups.selectAll(".labels")
              //     .data(function(d){
              //       return d;
              //     })
              //     .enter()
              //     .append("text")
              //     .text(function(d) { return d3.format(".1f")(d.data.Domestic_percent_Gross) + "%"; })
              //     .attr("x", 8)
              //     .attr("y", function(d) { return yScale(d.data.Name) + 14 })
              //     .style("fill", 'black');

            
                
                 // svg.append("line")
                 //  .attr("x1", 1)
                 //  .attr("y1", 1)
                 //  .attr("x2", 1)
                 //  .attr("y2", 567)
                 //  .attr("stroke-width", 1)
                 //  .attr("transform", "translate(295.5, 4)")
                 //  .attr("stroke", "black")
                 //  .style("stroke-dasharray", ("5,3"))
                 //  .style("opacity", 0.5);


             svg.append("rect")
          .attr("class", "bar1")
          .attr("x", 243)
          .attr("y", -50)
          .attr("width", 20)
          .attr("height", 20)
          .attr("fill", "#55c4c5")


            svg.append("text")
              .attr("x", 266)
              .attr("y", -35)
              .text("Domestic Gross")
              .style("font-family", "georgia")



               svg.append("rect")
          .attr("class", "bar1")
          .attr("x", 365)
          .attr("y", -50)
          .attr("width", 20)
          .attr("height", 20)
          .attr("fill", "#f9c776")

            svg.append("text")
              .attr("x", 388)
              .attr("y", -35)
              .text("International Gross")
              .style("font-family", "georgia")





          })


      
     })()