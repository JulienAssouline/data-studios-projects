(function () {

      //Width and height

      // var node_radius = 5,
      // padding = 1,
      // cluster_padding = 10,
      // num_nodes = 200;

      var w = 520;
      var h = 120;

      var margin = {
          top: 50,
          bottom: 0,
          left: 160,
          right: 0
        }

        var width = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;


        // var svg = d3.select("body")
        // .append("svg")
        // .attr("id", "chart")
        // .attr("width", w)
        // .attr("height", h)
        // .append("g")
        // .attr("transform", "translate(0" + margin.left + "," + margin.top + ")");

        var xScale = d3.scaleLinear()
          .domain([0, 180])
          .range([0, width])

        var yScale = d3.scaleBand()
           .range([height, 0])

        var yAxis = d3.axisLeft()
          .scale(yScale)

          d3.csv("Star_Wars_she_he_counts.csv", function(error, data){
            data.forEach(function(d){
              d.Movie = d.Movie;
              d.gender = d.gender;
              d.count = +d.count;
            })

           var Movies = d3.nest()
              .key(function(d){ return d.Movie; })
              .entries(data)

           yScale.domain(data.map(function(d) { return d.gender }));

            var svgs = d3.select("#she_he")
                .selectAll("svg")
                .data(Movies)
                .enter()
                .append("svg")
                .attr("id", "chart_count")
                .attr("width", w)
                .attr("height", h)
                .append("g")
                .attr("transform",  "translate(" + margin.left + "," + margin.top + ")")

                  svgs.append("g")
                    .attr("class", "yaxis")
                    .attr("transform", "translate(0,-5)")
                    .call(yAxis)
                    .selectAll("text")
                        .style("fill", "black")
                        .style("font-size", "14px")
                        .style("font-family", "Bree Serif")
                        .style("font-weight", "normal")



           svgs.selectAll(".rect")
            .data(function(d){ return d.values })
            .enter()
            .append("rect")
            .attr("x", 0)
            .attr("y", function(d, i){
               return yScale(d.gender) 
              })
            .attr("height",  20)
            .attr("width", function(d) {
              return xScale(d.count);
            })
            .style("fill", function(d){
              if(d.gender == "He"){
                return "#41c5de";
              } else{
                return "#e03f8d"
              }
            })

          svgs.selectAll(".label")
            .data(function(d){ return d.values })
            .enter()
            .append("text")
            .attr("class", "label")
            .attr("x", function(d){
              return xScale(d.count) + 5
            })
            .attr("y", function(d){ 
              return yScale(d.gender) + 15
            })
            .text(function(d){
              return d.count
            })
            .style("font-weight", "normal")
            .style("font-size", "14px")


            svgs.append("text")
              .attr("x", width - 270)
              .attr("y", height - 90)
              .style("text-anchor", "middle")
              .style("font-size", "17px")
              .text(function(d){ return d.key })
              .style("font-family", "Bree Serif")
              .style("font-weight", "normal")





// .attr("y", function(d, i){
//               return yScale(d.data.Movie) 
//             })




          })


      
    })()