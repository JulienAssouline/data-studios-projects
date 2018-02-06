(function () {

      //Width and height
      var w = 1030;
      var h = 700;

      var margin = {
          top: 50,
          bottom: 20,
          left: 230,
          right: 70
        }

        var width = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;


    var svg = d3.select("#video_games")
        .append("svg")
        .attr("id", "chart")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var xtickValues = [10, 20, 30, 40, 50, 60, 70, 75, 80, 90];

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
          .keys(["Rotten Tomatoes (%)", "rott_diff"])



        var colors = d3.scaleOrdinal()
          .range(["#92b13d", "lightgrey"])

          d3.csv("North_Korea_imports_2015.csv", function(error, data){
            data.forEach(function(d){
              d.Total = +d.Total;
              d.Percent_imp = +d.Percent_imp;
              d.import_val = +d.import_val
            })



            var series = stack(data)

            console.log(series)

            xScale.domain([0, 100])
            yScale.domain(data.map(function(d){ return d.Title }))

          
               

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
                return yScale(d.data.Title)
              })
              .attr("height", yScale.bandwidth() - 3)
              .attr("width", function(d){
                return (xScale(d[1]) - xScale(d[0]) );
              })

                svg.append("g")
                .attr("class", "xaxis")
                .attr("transform", "translate(0," + -0 +")")
                .call(xAxis)
                  .selectAll("text")
                  .attr("fill", function(d){
                    return (+d == 75) || (+d == 60) ? "black" : "grey"; // if both tick values are 60 & 75 give back black, else grey.
                  })
                  .attr("font-weight", function(d){
                    return (+d == 75) || (+d == 60) ? "bold" : "normal";
                  })

                svg.append("g")
                .attr("class", "yaxis")
                .attr("transform", "translate(0," + -2 +")")
                .call(yAxis)
                
                 svg.append("line")
                  .attr("x1", 1)
                  .attr("y1", 1)
                  .attr("x2", 1)
                  .attr("y2", 613)
                  .attr("stroke-width", 1)
                  .attr("transform", "translate(437.5, 8)")
                  .attr("stroke", "black")
                  .style("stroke-dasharray", ("3,3"));

                   svg.append("line")
                  .attr("x1", 5)
                  .attr("y1", 1)
                  .attr("x2", 5)
                  .attr("y2", 613)
                  .attr("stroke-width", 1)
                  .attr("transform", "translate(542.5, 8)")
                  .attr("stroke", "black")
                  .style("stroke-dasharray", ("3,3"));

    // adding first arrow head to show rotten movies

  svg.append("svg:defs").append("svg:marker")
    .attr("id", "triangle")
    .attr("refX", 2)
    .attr("refY", 6)
    .attr("markerWidth", 20)
    .attr("markerHeight", 20)
    .attr("orient", 180)
    .append("path")
    .attr("d", "M 0 0 12 6 0 12 3 6")
    .style("fill", "black");

    svg.append("line")
  .attr("x1", 100)
  .attr("y1", 1)
  .attr("x2", 140)
  .attr("y2", 1)          
  .attr("stroke-width", 0.5)
  .attr("stroke", "black")
  .attr("marker-start", "url(#triangle)")
  .attr("transform", "translate(282, -25)");

  svg.append("text")
  .attr("x", 393)
  .attr("y", -35)
  .text("Rotten")

  // adding second arrow head to show fresh movies

svg.append("svg:defs").append("svg:marker")
    .attr("id", "triangle_1")
    .attr("refX", 2)
    .attr("refY", 6)
    .attr("markerWidth", 20)
    .attr("markerHeight", 20)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 12 6 0 12 3 6")
    .style("fill", "black");

    svg.append("line")
  .attr("x1", 100)
  .attr("y1", 1)
  .attr("x2", 140)
  .attr("y2", 1)          
  .attr("stroke-width", 0.5)
  .attr("stroke", "black")
  .attr("marker-end", "url(#triangle_1)")
  .attr("transform", "translate(350, -25)");

  svg.append("text")
  .attr("x", 448)
  .attr("y", -35)
  .text("Fresh")

  // adding third arrow head to show certified fresh movies

svg.append("svg:defs").append("svg:marker")
    .attr("id", "triangle_2")
    .attr("refX", 2)
    .attr("refY", 6)
    .attr("markerWidth", 20)
    .attr("markerHeight", 20)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 12 6 0 12 3 6")
    .style("fill", "black");

    svg.append("line")
  .attr("x1", 100)
  .attr("y1", 1)
  .attr("x2", 140)
  .attr("y2", 1)          
  .attr("stroke-width", 0.5)
  .attr("stroke", "black")
  .attr("marker-end", "url(#triangle_2)")
  .attr("transform", "translate(460, -25)");

  svg.append("text")
  .attr("x", 558)
  .attr("y", -35)
  .text("Certified Fresh")

          })


      
     })()