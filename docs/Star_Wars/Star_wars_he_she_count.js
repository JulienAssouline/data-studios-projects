(function () {

      //Width and height

      // var node_radius = 5,
      // padding = 1,
      // cluster_padding = 10,
      // num_nodes = 200;

      var w = 800;
      var h = 700;

      var margin = {
          top: 20,
          bottom: 0,
          left: 0,
          right: 0
        }

        var width = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;


        var svg = d3.select("body")
        .append("svg")
        .attr("id", "chart")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(0" + margin.left + "," + margin.top + ")");

        var xScale = d3.scaleLinear()
          .range([0, width])

        var yScale = d3.scaleBand()
           .rangeRound([height, 0])


        var stack = d3.stack()
          .keys(["he", "she"])
         



        var colors = d3.scaleOrdinal()
              .range(["#41c5de", "#e03f8d"])

          d3.csv("Star_Wars_she_he_sum_whole.csv", function(error, data){
            data.forEach(function(d){
              d.Movie = d.Movie;
              d.she = +d.she;
              d.he = +d.he;
              d.total = +d.total
            })
          
          var series = stack(data)


           // var Movies = d3.nest()
           //    .key(function(d){ return d.Movie; })
           //    .entries(data)

          console.log(series)

           xScale.domain([0, d3.max(data, function(d) { return d.total; })]);
           yScale.domain(data.map(function(d) { return d.Movie; }));

            // var svgs = d3.select("body")
            //     .selectAll("svg")
            //     .data(Movies)
            //     .enter()
            //     .append("svg")
            //     .attr("width", w)
            //     .attr("height", h)
            //     .append("g")
            //     .attr("transform",  "translate(" + margin.left + "," + margin.top + ")")

           var groups = svg.selectAll("g")
            .data(series)
            .enter()
            .append("g")
            .style("fill", function(d, i){ return colors(i)})

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
               return yScale(d.data.Movie) +30
              })
            .attr("height", yScale.bandwidth() - 50 )
            .attr("width", function(d) {
              return (xScale(d[1]) - xScale(d[0]) );
            });


// .attr("y", function(d, i){
//               return yScale(d.data.Movie) 
//             })




          })


      
      })()