(function () {

      //Width and height
      var w = 600;
      var h = 600;

      var margin = {
          top: 100,
          bottom: 0,
          left: 0,
          right: 0
        };

        var width = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;


      var lineScale = d3.scaleSqrt()
        .domain([5,33266])
        .range([0.5, 3])

      
      // define map projection
      var projection = d3.geoAzimuthalEquidistant()
        .translate([w/2, h/2 + 60])
        .scale(240)
      //   .scale([500]);

      //Define default path generator
      var path = d3.geoPath()
        .projection(projection)


      var svg = d3.select("#Canadian_refugees")
        .append("svg")
        .attr("id", "chart")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(0" + margin.left + "," + margin.top + ")");

        d3.json("world.topojson", function(json){
          d3.csv("Canada_refugees_2016.csv", function(error, data){
            // data.forEach(function(d){
            //   d.Lon_Residence = +d.Lon_Residence
            //   d.Lat_Residence = +d.Lat_Residence
            // })

            var countries = topojson.feature(json, json.objects.countries).features

            svg.selectAll(".country")
            .data(countries)
            .enter()
            .append("path")
            .attr("class", "country")
            .attr("d", path)


            svg.selectAll(".arcs")
              .data(data)
              .enter()
              .append("path")
              .attr("class", function(d) {
                return "arc " + d.Origin.replace(/[^A-Za-z0-9]/g, "")// this adds a class to every arc. DONT FORGET THE SPACE
              })
              .style("stroke", "#cd0d0e")
              .attr("d", function(d){
                return lngLatToArc(d, 0.7);
              })
              .style("fill", "none")
              .style("opacity", function(d){
                if(d.Origin == "Syria"){
                  return 0.7
                } else {
                  return 0.4
                }
              })
              .style("stroke-width", function(d){
                return lineScale(d.Count) 
              })


            svg.selectAll("circles")
              .data(data)
              .enter()
              .append("circle")
              .attr("class", "Resident")
              .attr("r", 2)
              .attr("cx", function(d){
                var coords = projection([d.Lon_Residence, d.Lat_Residence])
                return coords[0];
              })
              .attr("cy", function(d){
                var coords = projection([d.Lon_Residence, d.Lat_Residence])
                return coords[1]
              })
              .style("fill", "none")
              .style("opacity", 0)

               svg.selectAll("points")
              .data(data)
              .enter()
              .append("circle")
              .attr("class", "Origin")
              .attr("r", 2)
              .attr("cx", function(d){
                var coords = projection([d.Lon_Origin, d.Lat_Origin])
                return coords[0];
              })
              .attr("cy", function(d){
                var coords = projection([d.Lon_Origin, d.Lat_Origin])
                return coords[1]
              })
              .style("fill", "none")
              .style("opacity", 1)

              svg.selectAll(".label")
                .data(data.filter(function(d){
                  return d.Count == 33266
                }))
                .enter()
                .append("text")
                .attr("class", "label")
                .attr("x", function(d){
                  var coords = projection([d.Lon_Origin, d.Lat_Origin])
                    return coords[0] 
                })
                .attr("y", function(d){
                  var coords = projection([d.Lon_Origin, d.Lat_Origin])
                    return coords[1] + 13
                })
                .text("Syria")


                svg.append("text")
                .attr("x", 250)
                .attr("y", 0)
                .text("Canada")
                .style("font-weight", "bold")





        // This function takes an object, the key names where it will find an array of lng/lat pairs, e.g. `[-74, 40]`
        // And a bend parameter for how much bend you want in your arcs, the higher the number, the less bend.

              function lngLatToArc(d, bend){
                // If no bend is supplied, then do the plain square root
                bend = bend || 1;
                // `[d.Lon_Origin, d.Lat_Origin]` and `[d.Lon_Residence, d.Lat_Residence]` are arrays of `[lng, lat]`
                // Note, people often put these in lat then lng, but mathematically we want x then y which is `lng,lat`


                var sourceLngLat = [d.Lon_Origin, d.Lat_Origin],
                    targetLngLat = [d.Lon_Residence, d.Lat_Residence];

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
   