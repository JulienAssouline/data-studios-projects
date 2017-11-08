(function () {

      //Width and height

      // var node_radius = 5,
      // padding = 1,
      // cluster_padding = 10,
      // num_nodes = 200;

      var w = 500;
      var h = 500;

      var margin = {
          top: 40,
          bottom: 40,
          left: 40,
          right: 40
        }

        var width = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;


        var svg = d3.select("#trends")
        .append("svg")
        .attr("id", "chart")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(0" + margin.left + "," + margin.top + ")");

        var xScale = d3.scaleLinear()
          .range([0, width])

        var yScale = d3.scaleLinear()
          .range([height, 0])

        var line = d3.line()
          .x(function(d){
            return xScale(d.Years);
          })
          .y(function(d){
            return yScale(d.Percentage)
          });

          var xAxis = d3.axisBottom()
            .scale(xScale)

          var yAxis = d3.axisLeft()
            .scale(yScale)
            .tickFormat(function(d){ return d + "%"})


          d3.csv("Star_Wars_Trends.csv", function(error, data){
            data.forEach(function(d){
              d.Years = +d.Years;
              d.Gender = d.Gender;
              d.Movie = d.Movie;
              d.Word_count = +d.Percentage
            })

            var Genders = d3.nest()
              .key(function(d){ return d.Gender })
              .entries(data);

            xScale.domain(d3.extent(data, function(d){ return d.Years }))
            yScale.domain([0, 100])

            var genders = svg.selectAll(".genders")
              .data(Genders)
              .enter()
              .append("g")
              .attr("class", "gender")

            
              genders.append("path")
              .attr("class", "line")
              .attr("d", function(d){
                return line(d.values);
              })
              .style("fill", "none")
              .style("stroke", function(d){
                if(d.key == "Male"){
                  return "#41c5de"
                } 
                if(d.key == "Female"){
                  return "#e03f8d"
                } else {
                  return "lightgrey"
                }
              })
              .style("stroke-width", 2)

          svg.append("text")
            .attr("x", 430)
            .attr("y", 125)
            .text("Male")
            .style("fill", "#41c5de")
            .style("font-family", "Bree serif")
            .style("font-size", 13)

            svg.append("text")
            .attr("x", 410)
            .attr("y", 300)
            .text("Female")
            .style("fill", "#e03f8d")
            .style("font-family", "Bree serif")
            .style("font-size", 13)


           svg.append("text")
            .attr("x",420)
            .attr("y", 400)
            .text("Robots")
            .style("fill", "lightgrey")
            .style("font-family", "Bree serif")
            .style("font-size", 13)



              svg.append("g")
                .attr("class", "xaxis_2")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)

              svg.append("g")
                .attr("class", "yaxis_2")
                .call(yAxis)


          





          })


      
      })()