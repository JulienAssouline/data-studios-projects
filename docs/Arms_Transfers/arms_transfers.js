(function () {
      //Width and height
      var w = 450;
      var h = 650;

      var margin = {
          top: 20,
          bottom: 0,
          left: 0,
          right: 30
        };

        var width = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;


      var lineScale = d3.scaleSqrt()
        .domain([0, 332])
        .range([0.5, 3])

      var circleScale = d3.scaleSqrt()
        .domain([0, 4445])
        .range([0.5, 10])


      
      // define map projection
      var projection = d3.geoAzimuthalEquidistant()
        .translate([w/2, h/2 - 50])
        .scale(100)
      //   .scale([500]);

      //Define default path generator
      var path = d3.geoPath()
        .projection(projection)


      // var svg = d3.select("body")
      //   .append("svg")
      //   .attr("id", "chart")
      //   .attr("width", w)
      //   .attr("height", h)
      //   .append("g")
      //   .attr("transform", "translate(0" + margin.left + "," + margin.top + ")");

        d3.json("world.topojson", function(json){
          d3.csv("arms_transfer_2012_2016_top - arms_transfer_2012_2016_top.csv", function(error, data){
            // data.forEach(function(d){
            //   d.Lon_Residence = +d.Lon_Residence
            //   d.Lat_Residence = +d.Lat_Residence
            // })
            var countries = topojson.feature(json, json.objects.countries).features

            var Exporters = d3.nest()
              .key(function(d){ return d.Exporter; })
              .entries(data)

              console.log(Exporters)

              // Add a local variable 
              var local = d3.local();

              var svg = d3.select("#arms_transfer")
                .selectAll("svg")
                .data(Exporters)
                .enter()
                .append("svg")
                .attr("id", "maps")
                .attr("width", w)
                .attr("height", h)
                .append("g")
                .attr("transform",  "translate(" + margin.left + "," + margin.top + ")")
                .each(function(d){ local.set(this, d.key); })


            svg.selectAll(".country")
            .data(countries)
            .enter()
            .append("path")
            .attr("class", "country")
            .attr("fill", function(d){
              if(d.properties.name == local.get(this)){
                return "#cd0d0e"
              } else {
                return "#d0cec2"
              }
            })
            .attr("d", path)
            .attr("opacity", function(d){
              if(d.properties.name == local.get(this)){
                return 0.4
              } else {
                return 1
              }
            })
     


            svg.selectAll("circles")
              .data(function(d){ return d.values })
              .enter()
              .append("circle")
              .attr("class", "importer")
              .attr("r", function(d){
                return circleScale(d.Millions)
              })
              .attr("cx", function(d){
                var coords = projection([d.Longitude_imp, d.Latitude_imp])
                return coords[0];
              })
              .attr("cy", function(d){
                var coords = projection([d.Longitude_imp, d.Latitude_imp])
                return coords[1];
              })
              .style("fill", function(d){
                if(d.Millions > 20){
                  return "#cd0d0e"
                } else {
                  return "none"
                }
              })

            svg.selectAll(".arcs")
              .data(function(d){ return d.values})
              .enter()
              .append("path")
              .style("stroke", function(d){
                if(d.Millions > 20){
                  return "#cd0d0e"
                }
              })
              .attr("d", function(d){
                return lngLatToArc(d, 1)
              })
              .style("fill", "none")
              .style("opacity", 0.5)
              .style("stroke-width", "0.5px")

              svg.append("text")
                .attr("x", 100)
                .attr("y", 100)
                .text(function(d){
                  return d.Exporter
                })

                svg.selectAll(".label")
                  .data(function(d){ return d.values })
                  .enter()
                  .append("text")
                  .attr("class", "label")
                  .attr("x", function(d){
                    var coords = projection([d.Longitude_imp, d.Latitude_imp])
                    if(d.Exporter == "France" && d.Importer == "Morocco"){
                        return  coords[0] - 38 
                      } if(d.Exporter == "United Kingdom" && d.Importer == "Saudi Arabia"){
                        return  coords[0] - 40
                      } if(d.Exporter == "United Kingdom" && d.Importer == "Indonesia"){
                        return  coords[0] - 35
                      } if(d.Exporter == "China" && d.Importer == "Pakistan"){
                        return  coords[0] - 32
                      } if(d.Exporter == "Ukraine" && d.Importer == "India"){
                        return  coords[0] - 24
                      } else{
                        return coords[0] -19; 
                      }
                   })
                  .attr("y", function(d){
                      var coords = projection([d.Longitude_imp, d.Latitude_imp])
                      if(d.Exporter == "United States" && d.Importer == "Saudi Arabia"){
                        return  coords[1] + 20
                      } if(d.Exporter == "Russian Federation" && d.Importer == "India"){
                        return  coords[1] - 20
                      } if(d.Exporter == "China" &&  d.Importer == "Bangladesh"){
                        return  coords[1] + 15
                      } if(d.Exporter == "Germany"){
                        return  coords[1] - 7
                      } if(d.Exporter == "France" && d.Importer == "Saudi Arabia"){
                        return  coords[1] +14
                      } if(d.Exporter == "France" && d.Importer == "Morocco"){
                        return  coords[1] - 7 
                      } if(d.Exporter == "United Kingdom" && d.Importer == "Oman"){
                        return  coords[1] + 14
                      } if(d.Exporter == "Spain" && d.Importer == "Saudi Arabia"){
                        return  coords[1] + 14
                      } if(d.Exporter == "Italy"){
                        return  coords[1] - 5
                      } else {
                        return coords[1] - 10;
                      }
                     })
                  .text(function(d){
                    if(d.Rank < 6){
                      return (d.Rank + "." + " " + d.Importer)
                    }
                  })
                  // .style("font-weight", "bold")

            svg.append("text")
              .attr("x", 230)
              .attr("y", 20)
              .style("text-anchor", "middle")
              .style("font-size", "17px")
              .text(function(d){
                if(d.key == "Russian Federation"){
                  return "Russia"
                } else {
                  return d.key
                }
                })
              .style("font-weight", "normal")




          function lngLatToArc(d, bend){
                // If no bend is supplied, then do the plain square root
                bend = bend || 1;
                // `[d.Lon_Origin, d.Lat_Origin]` and `[d.Lon_Residence, d.Lat_Residence]` are arrays of `[lng, lat]`
                // Note, people often put these in lat then lng, but mathematically we want x then y which is `lng,lat`


                var sourceLngLat = [d.Longitude_exp, d.Latitude_exp],
                    targetLngLat = [d.Longitude_imp, d.Latitude_imp];



                if(targetLngLat && sourceLngLat){

                  var sourceXY = projection(sourceLngLat),
                      targetXY = projection(targetLngLat);

                  // Uncomment this for testing, useful to see if you have any null lng/lat values
                // if (!targetXY) console.log(d, targetLngLat, targetXY)
                var sourceX = sourceXY[0],
                    sourceY = sourceXY[1];

                  var targetX = targetXY[0],
                      targetY = targetXY[1];

                  var dx = targetX - sourceX,
                      dy = targetY - sourceY
                    dr = Math.sqrt(dx * dx + dy * dy) * bend;

                    // To avoid a whirlpool effect, make the bend direction consistent regardless of whether the source is east or west of the target
                var west_of_source = (targetX - sourceX) < 0;
                if (west_of_source) return "M" + targetX + "," + targetY + "A" + dr + "," + dr + " 0 0,1 " + sourceX + "," + sourceY;
                return "M" + sourceX + "," + sourceY + "A" + dr + "," + dr + " 0 0,1 " + targetX + "," + targetY;

                } else{
                  return "M0,0,l0,0z";
                }
              }

          })
        })

      
     })()