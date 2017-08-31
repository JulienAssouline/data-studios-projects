(function () {
   var w = 800;
      var h = 500;

      var margin = {
          top: 10,
          bottom: 40,
          left: 0,
          right: 30
        };

        var width = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;


      var rectScale = d3.scaleLinear()
        .range([5, 70])

      
      // define map projection
      var projection = d3.geoMercator()
        .translate([w/2, h/2])
        .scale(130)
      //   .scale([500]);

      //Define default path generator
      var path = d3.geoPath()
        .projection(projection);

      var svg = d3.select("#critics")
        .append("svg")
        .attr("id", "chart")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(0" + margin.left + "," + margin.top + ")");

      var div = d3.select("#critics")
        .append("div")
        .attr("class", "tooltip2")
        .style("opacity", 0)


        d3.json("world.topojson", function(json){
          d3.csv("Critics_by_Country_4.csv", function(error, data){



        var countries = topojson.feature(json, json.objects.countries).features
        console.log(countries)

        rectScale.domain(d3.extent(data, function(d){ return +d["movie"]}))


        svg.selectAll(".country")
        .data(countries)
        .enter()
        .append("path")
        .attr("class", "country2")
        .attr("d", path)

        svg.selectAll(".rect")
          .data(data)
          .enter()
          .append("rect")
          .classed("bar", true)
          .attr("width", function(d){
            return rectScale(+d["movie"]);
          })
          .attr("height", function(d){
            return rectScale(+d["movie"]);
          })
          .attr("x", function(d){
          var coords = projection([+d["Longitude"], +d["Latitude"]])
          if(d.index == "United States"){
            return coords[0] - 45;
            } 
          if(d.index == "United Kingdom"){
            return coords[0] - 15;
          } else {
            return coords[0];
            }
          })
          .attr("y", function(d){
            var coords = projection([+d["Longitude"], +d["Latitude"]])
            if(d.index == "United States"){
            return (coords[1] - 47);
            } 
            if(d.index == "United Kingdom"){
            return coords[1] - 5;
            } else {
            return coords[1];
            }
            })
          .style("fill-opacity", 0)
          .style("stroke-width", 1.5)
          .style("stroke", function(d){
            if (d.index == "United States"){
              return "#e59400";
            } else {
              return "grey";
            }
          })
          .on("mouseover", function(d){
              div.transition()
              .duration(200)
              .style("opacity", 1)
              var element = d3.select(this);
              element.style("stroke-width", "0.5")
            div.html(function(){
              if(d.index == "United States"){
                return d.movie + " critics from " + "U.S.";
              }
              if(d.index == "United Kingdom"){
                return d.movie + " critics from " + "U.K.";
              } 
              if(d.movie == 1){
                return d.movie + " critic from " + d.index;
              } else{
                return d.movie + " critics from " + d.index;
              }
              })
            .style("left", (d3.event.pageX - 20) + "px")    
            .style("top", (d3.event.pageY - 35) + "px")
          })
          .on("mousemove", function(d){
            div.style("left", (d3.event.pageX - 20) + "px")    
            .style("top", (d3.event.pageY - 35) + "px")
          })
          .on("mouseout", function(d){
            div.transition()
            .duration(500)
            .style("opacity", "0")
            var element = d3.select(this);
                element.style("stroke-width", "1.5");
          })



            svg.selectAll(".rect-label")
              .data(data)
              .enter()
              .append("text")
              .attr("class", "rect-label")
              .attr("x", function(d){
                var coords = projection([+d["Longitude"], +d["Latitude"]])
                if (d.index == "United States"){
                  return coords[0] - 36;
                } 
                if (d.index == "United Kingdom"){
                  return coords[0] - 22.5;
                } else{
                return coords[0];
              }
              })
              .attr("y", function(d){
                var coords = projection([+d["Longitude"], +d["Latitude"]])
                if (d.index == "United States"){
                  return coords[1] - 10;
                } if (d.index == "United Kingdom"){
                  return coords[1] + 3;
                } else {
                return coords[1];
              }
              }) 
              .text(function(d){
                if (d.index == "United States"){
                  return "U.S.";
                }
                if (d.index == "United Kingdom"){
                  return "U.K.";
                } 
              })
              .attr("dx", 9)
              .attr("dy", 5)
              .style("fill", function(d){
              if (d.index == "United States"){
              return "#e59400";
                }
            if (d.index == "United Kingdom"){
              return "grey";
              } else {
              return "grey";
              }
              })
              .attr("font-size", function(d){
                if (d.index == "United States"){
                  return "18px";
                } else {
                return "9px";
              }
              })
              .on("mouseover", function(d){
              var coords = projection([+d["Longitude"], +d["Latitude"]])
              div.transition()
              .duration(200)
              .style("opacity", 1)
            div.html(function(){
              if(d.index == "United States"){
                return d.movie + " critics from " + "U.S.";
              }
              if(d.index == "United Kingdom"){
                return d.movie + " critics from " + "U.K.";
              } if(d.movie == 1){
                return d.movie + " critic from " + d.index;
              } else{
                return d.movie + " critics from " + d.index;
              }
              })
            .style("left", (d3.event.pageX - 20) + "px")    
            .style("top", (d3.event.pageY - 35) + "px")
          })
            .on("mousemove", function(d){
            div.style("left", (d3.event.pageX - 20) + "px")    
            .style("top", (d3.event.pageY - 35) + "px")
          })
          .on("mouseout", function(d){
            div.transition()
            .duration(500)
            .style("opacity", "0")
          })

        svg.append("rect")
          .attr("width", rectScale(50))
          .attr("height", rectScale(50))
          .attr("x", (width/2) + 170)
          .attr("y", 280)
          .style("stroke", "lightgrey")
          .style("fill-opacity", 0)
          .style("stroke-width", 1.5)
          .style("stroke-dasharray", ("2,2"))

          svg.append("rect")
          .attr("width", rectScale(20))
          .attr("height", rectScale(20))
          .attr("x", (width/2) + 182)
          .attr("y", 304)
          .style("stroke", "lightgrey")
          .style("fill-opacity", 0)
          .style("stroke-width", 1.5)
          .style("stroke-dasharray", ("2,2"))


          svg.append("line")
                  .attr("x1", 5)
                  .attr("y1", 20)
                  .attr("x2", 40)
                  .attr("y2", 20)
                  .attr("stroke-width", 1)
                  .attr("transform", "translate(570, 283)")
                  .attr("stroke", "lightgrey")
                  .style("shape-rendering", "crispEdges")
                  // .style("stroke-dasharray", ("3,3"));

            svg.append("text")
                    .attr("x", 613)
                    .attr("y", 308)
                    .text("20")
                    .style("fill", "grey")
                    .style("font-size", "12px")

              svg.append("line")
                  .attr("x1", 5)
                  .attr("y1", 20)
                  .attr("x2", 40)
                  .attr("y2", 20)
                  .attr("stroke-width", 1)
                  .attr("transform", "translate(570, 259.5)")
                  .attr("stroke", "lightgrey")
                  .style("shape-rendering", "crispEdges")

               svg.append("text")
                    .attr("x", 613)
                    .attr("y", 284)
                    .text("50")
                    .style("fill", "grey")
                    .style("font-size", "12px")
          

         })

        })


})()
