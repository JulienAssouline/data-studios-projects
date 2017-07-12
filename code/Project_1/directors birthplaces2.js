  (function () {
      //Width and height
      var w = 900;
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

      var svg = d3.select("#directors")
        .append("svg")
        .attr("id", "chart")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(0" + margin.left + "," + margin.top + ")");

        var div = d3.select("#directors")
        .append("div")
        .attr("class", "tooltip1")
        .style("opacity", 0)

        d3.json("world.topojson", function(json){
          d3.csv("Directors Birthplaces Complete.csv", function(error, data){


        var countries = topojson.feature(json, json.objects.countries).features
        console.log(countries)

        rectScale.domain(d3.extent(data, function(d){ return +d["directors"]}))


        svg.selectAll(".country")
          .data(countries)
          .enter()
          .append("path")
          .attr("class", "country1")
          .attr("d", path)
         
         svg.selectAll(".rect")
          .data(data)
          .enter()
          .append("rect")
          .classed("bar", true)
          .attr("width", function(d){
            return rectScale(+d["directors"]);
          })
          .attr("height", function(d){
            return rectScale(+d["directors"]);
          })
          .attr("x", function(d){
            var coords = projection([+d["Longitude"], +d["Latitude"]])
            if(d.Name == "United States of America"){
            return coords[0] - 47;
          } 
          if(d.Name == "United Kingdom"){
            return coords[0] - 18;
          } 
          if(d.Name == "France"){
            return coords[0] - 10;
          } else {
            return coords[0];
          }
          })
          .attr("y", function(d){
            var coords = projection([+d["Longitude"], +d["Latitude"]])
          if(d.Name == "United States of America"){
            return coords[1] - 43;
          } 
          if(d.Name == "United Kingdom"){
            return coords[1] - 12;
          } 
          if(d.Name == "France"){
            return coords[1] - 6;
          } else {
            return coords[1];
          }          
        })
          .style("fill-opacity", 0)
          .style("stroke-width", 1.5)
          .style("stroke", function(d){
            if(d.Name == "United States of America"){
            return "#e59400";
          } 
          if(d.Name == "United Kingdom"){
            return "#e59400";
          } 
          if(d.Name == "France"){
            return "#e59400";
          } else { 
            return "Grey"
          }
          })
          .on("mouseover", function(d){
              div.transition()
              .duration(200)
              .style("opacity", 1)
               var element = d3.select(this);
                element.style("stroke-width", "0.5")
            div.html(function(){
              if(d.Name == "United States of America"){
                return d.directors + " directors from " + "U.S.";
              }
              if(d.Name == "United Kingdom"){
                return d.directors + " directors from " + "U.K.";
              } 
              if(d.Name == "State of Palestine"){
                return d.directors + " director from " + "Palestine";
              } 
              if(d.directors == 1){
                return d.directors + " director from " + d.Name;
              } else{
                return d.directors + " directors from " + d.Name;
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
              });


          svg.selectAll(".rect-label")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "rect-label")
            .attr("x", function(d){
             var coords = projection([+d["Longitude"], +d["Latitude"]])
             if(d.Name == "United States of America"){
              return coords[0] - 35;
             } if(d.Name == "United Kingdom"){
              return coords[0] - 20;
             } if(d.Name == "France"){
              return coords[0] - 53;
             } if(d.Name == "Portugal"){
              return coords[0] - 45;
             } if(d.Name == "Haiti"){
              return coords[0] - 28;
             } if(d.Name == "Italy"){
              return coords[0] - 8;
             } if(d.Name == "China"){
              return coords[0] - 37;
             } if(d.Name == "South Korea"){
              return coords[0] - 29;
             } if(d.Name == "Uganda"){
              return coords[0] - 38;
             } if(d.Name == "Ghana"){
              return coords[0] - 37;
             } if(d.Name == "Belgium"){
              return coords[0] - 43;
             } if(d.Name == "Israel"){
              return coords[0] - 33;
             } if(d.Name == "Greece"){
              return coords[0] - 3;
             } if(d.Name == "Austria"){
              return coords[0] - 23;
             } if(d.Name == "Germany"){
              return coords[0] + 3;
             } if(d.Name == "Tunisia"){
              return coords[0] - 40;
             } if(d.Name == "Lebanon"){
              return coords[0] - 43;
             } if(d.Name == "New Zealand"){
              return coords[0] - 65;
             } if(d.Name == "India"){
              return coords[0] + 3;
             } else {
              return coords[0];
             }
            })
            .attr("y", function(d){
            var coords = projection([+d["Longitude"], +d["Latitude"]])
            if(d.Name == "United States of America"){
               return coords[1] - 6;
            } if(d.Name == "United Kingdom"){
              return coords[1] + 4;
             } if(d.Name == "Italy"){
              return coords[1] + 12;
             } if(d.Name == "Nigeria"){
              return coords[1] - 5;
             } if(d.Name == "Cameroon"){
              return coords[1] + 2;
             } if(d.Name == "Germany"){
              return coords[1] + 3;
             } if(d.Name == "Poland"){
              return coords[1] - 3;
             } if(d.Name == "Denmark"){
              return coords[1] - 5;
             } if(d.Name == "Greece"){
              return coords[1] + 3;
             } if(d.Name == "Israel"){
              return coords[1] + 3;
             } if(d.Name == "Austria"){
              return coords[1] + 7;
             } if(d.Name == "Hungary"){
              return coords[1] - 3;
             } if(d.Name == "New Zealand"){
              return coords[1] + 3;
             } else {
              return coords[1];
            }
            })
             .text(function(d){
                if (d.Name == "United States of America"){
                  return "U.S.";
                }
                if (d.Name == "United Kingdom"){
                  return "U.K.";
                } if(d.Name == "France"){
              return "France";
             } 
              })
            .attr("dx", 7)
            .attr("dy", 5)
            .attr("font-size", function(d){
                if (d.Name == "United States of America"){
                  return "18px";
                }if (d.Name == "United Kingdom"){
                  return "11px";
                } if(d.directors == 1){
                  return "8px"
                } if (d.Name == "France"){
                  return "11px"
                } if(d.Name == "Austria"){
              return "8px";
             } if(d.Name == "Romania"){
              return "8px";
             } if(d.Name == "Lebanon"){
              return "8px";
             } if(d.Name == "Syria"){
              return "8px";
             } else {
                return "9px";
              }
              })
            .style("fill", "#e59400")
            .on("mouseover", function(d){
              div.transition()
              .duration(200)
              .style("opacity", 1)
            div.html(function(){
              if(d.Name == "United States of America"){
                return d.directors + " directors from " + "U.S.";
              }
              if(d.Name == "United Kingdom"){
                return d.directors + " directors from " + "U.K.";
              } 
              if(d.directors == 1){
                return d.directors + " director from " + d.Name;
              } else{
                return d.directors + " directors from " + d.Name;
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
          .attr("width", rectScale(70))
          .attr("height", rectScale(70))
          .attr("x", (width/2) + 170)
          .attr("y", 280)
          .style("stroke", "lightgrey")
          .style("fill-opacity", 0)
          .style("stroke-width", 1.5)
          .style("stroke-dasharray", ("2,2"))

          svg.append("rect")
          .attr("width", rectScale(30))
          .attr("height", rectScale(30))
          .attr("x", (width/2) + 182)
          .attr("y", 302)
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
                  .attr("transform", "translate(618, 281)")
                  .attr("stroke", "lightgrey")
                  .style("shape-rendering", "crispEdges")
                  // .style("stroke-dasharray", ("3,3"));

            svg.append("text")
                    .attr("x", 665)
                    .attr("y", 305)
                    .text("30")
                    .style("fill", "grey")
                    .style("font-size", "12px")

              svg.append("line")
                  .attr("x1", 5)
                  .attr("y1", 20)
                  .attr("x2", 40)
                  .attr("y2", 20)
                  .attr("stroke-width", 1)
                  .attr("transform", "translate(618, 260)")
                  .attr("stroke", "lightgrey")
                  .style("shape-rendering", "crispEdges")

               svg.append("text")
                    .attr("x", 665)
                    .attr("y", 285)
                    .text("70")
                    .style("fill", "grey")
                    .style("font-size", "12px")

         })

        })
  })()