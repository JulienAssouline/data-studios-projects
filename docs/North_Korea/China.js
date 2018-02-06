(function () {

      //Width and height
      var w = 350;
      var h = 120;

      var margin = {
          top: 80,
          bottom: 0,
          left: 120,
          right: 30
        }

        var width = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;


    var svg = d3.select("#China")
        .append("svg")
        .attr("id", "chart")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

       var data = [85, 15];

       var colors = d3.scaleOrdinal()
          .range(["#431f72", "#b8b8b8"])

      var xScale = d3.scaleLinear()
        .domain([0, 100])
        .range([0, width])

     var stack = d3.stack()
          .keys(["Percent_imp", "perc_diff"])



       d3.csv("China.csv", function(error, data){
            data.forEach(function(d){
              d.Percent_imp = +d.Percent_imp
              d.perc_diff = +d.perc_diff
            })

         var series = stack(data)

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
              .attr("y", 0)
              .attr("height",30)
              .attr("width", function(d){
                return (xScale(d[1]) - xScale(d[0]) );
              })

              svg.append("rect")
          .attr("class", "bar1")
          .attr("x", 0)
          .attr("y", -25)
          .attr("width", 15)
          .attr("height", 15)
          .attr("fill", "#431f72")

           svg.append("rect")
          .attr("class", "bar1")
          .attr("x", 60)
          .attr("y", -25)
          .attr("width", 15)
          .attr("height", 15)
          .attr("fill", "#b8b8b8")

          svg.append("text")
                .attr("x", 80)
                .attr("y", -13)
                .text("Other Countries")
                .style("fill", "black")
                .style("font-size", 13)

          svg.append("text")
                .attr("x", 20)
                .attr("y", -13)
                .text("China")
                .style("fill", "black")
                .style("font-size", 13)

              svg.append("text")
                .attr("x", -30)
                .attr("y", 20)
                .text("85%")
                .style("fill", "black")
                .style("font-size", 13)

            svg.append("text")
                .attr("x", 200)
                .attr("y", 20)
                .text("15%")
                .style("fill", "black")
                .style("font-size", 13)

             svg.append("text")
                .attr("x", 0)
                .attr("y", -40)
                .text("North Korea Imports, 2015")
                .style("fill", "black")
                .style("font-size", 18)
})
      
     })()