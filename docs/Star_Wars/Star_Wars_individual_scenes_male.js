(function () {


  var w = 600;
 var h = 450;

      var margin = {
          top: 100,
          bottom: 30,
          left: 120,
          right: 20
        }

        var width = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;

      var svg = d3.select("#stacked_male")
        .append("svg")
        .attr("id", "chart")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(0" + margin.left + "," + margin.top + ")");

      var xtickValues = [0, 100];


       var xScale = d3.scaleLinear()
        .range([0, width])

      var yScale = d3.scaleBand()
        .rangeRound([height, 0])

      var stack = d3.stack()
        .keys(["individual_scenes", "Total"])

        colors = d3.scaleOrdinal()
          .range(["#41c5de", "lightgrey"])

           var yAxis = d3.axisLeft()
          .scale(yScale)

          var xAxis = d3.axisTop()
            .scale(xScale)
            .tickFormat(function(d){ return d + "%"})


  d3.csv("star wars individual scenes Male.csv", function(error, data){
            data.forEach(function(d){
              d.individual_scenes = +d.individual_scenes;
              d.Total = +d.Total
            })
      
     // var movie_filter = data.filter(function(element){
     //            return (element.Movie == "Empire Strikes Back Male" || element.Movie == "Empire Strikes Back Female")
     //          });

    var series = stack(data)

    console.log(series)

    xScale.domain([0, 100])
    yScale.domain(data.map(function(d){ return d.Movie; }))

    var groups = svg.selectAll("g")
      .data(series)
      .enter()
      .append("g")
      .attr("fill", function(d, i){
          return colors(i)
        })

      groups.selectAll(".rect")
        .data(function(d){
          return d;
        })
        .enter()
        .append("rect")
        .attr("x", function(d){
          return xScale(d[0])
        })
        .attr("y", function(d){
          return yScale(d.data.Movie)
        })
        .attr("height", yScale.bandwidth() - 10)
        .attr("width", function(d){
          return (xScale(d[1]) - xScale(d[0]));
        })
   

            svg.append("g")
                .attr("class", "yaxis_ind")
                .attr("transform", "translate(0," + -7 +")")
                .call(yAxis)
                  .selectAll("text")
                  .style("font-weight", "normal")


                svg.append("g")
                .attr("class", "xaxis_ind")
                .attr("transform", "translate(0," + -0 +")")
                .call(xAxis)
                  .selectAll("text")
                  .style("font-weight", "normal")
              

              svg.append("text")
                              .attr("x", -60)
                              .attr("y", -60)
                              .text("Male Characters")
                              .style("font-size", 17)
                              .style("font-weight", "normal")
                              .style("text-decoration", "underline")



              // svg.append("svg:defs").append("svg:marker")
              //     .attr("id", "triangle")
              //     .attr("refX", -40)
              //     .attr("refY", 6)
              //     .attr("markerWidth", 20)
              //     .attr("markerHeight", 20)
              //     .attr("orient", 90)
              //     .append("path")
              //     .attr("d", "M 0 0 12 6 0 12 3 6")
              //     .style("fill", "black");

              //       svg.append("line")
              //     .attr("x1", 1)
              //     .attr("y1", 100)
              //     .attr("x2", 1)
              //     .attr("y2", 120)          
              //     .attr("stroke-width", 0.5)
              //     .attr("stroke", "black")
              //     .attr("marker-start", "url(#triangle)")
              //     .attr("transform", "translate(-50, -130)");

              //     svg.append("text")
              //       .attr("x", -60)
              //       .attr("y", -40)
              //       .text('No female character had a scene without a man in "A New Hope"')
              //       .style("font-size", 13)
              //       .style("font-weight", "normal")


        // groups.selectAll(".labels")
        //   .data(function(d))

  });


     })()