(function () {

      //Width and height
       var w = 950;
      var h = 590;


      var margin = {
          top: 10,
          bottom: 0,
          left: 0,
          right: 30
        };

        var width = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;


      var circleScale = d3.scaleSqrt()
        .domain([0, 33266])
        .range([0.5, 5])



      
      // define map projection
      var projection = d3.geoAzimuthalEquidistant()
        .translate([w/2 - 80, h/2 + 150])
        .scale(260)
      //   .scale([500]);

      //Define default path generator
      var path = d3.geoPath()
        .projection(projection)


      var svg = d3.select("#Syria_count")
        .append("svg")
        .attr("id", "chart")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(0" + margin.left + "," + margin.top + ")");

        d3.json("world.topojson", function(json){
          d3.csv("Syria_2016_True.csv", function(error, data){
            data.forEach(function(d){
              d.Count = +d.Count
            })

            var countries = topojson.feature(json, json.objects.countries).features

            svg.selectAll(".country")
            .data(countries)
            .enter()
            .append("path")
            .attr("class", "country")
            .attr("d", path)


            svg.selectAll("circles")
              .data(data.filter(function(d){
                return d.Count > 500
              }))
              .enter()
              .append("circle")
              .attr("class", "Resident")
              .attr("r", function(d){
                return circleScale(d.Count) + 0.3
              })
              .attr("cx", function(d){
                var coords = projection([d.Lon_Residence, d.Lat_Residence])
                return coords[0];
              })
              .attr("cy", function(d){
                var coords = projection([d.Lon_Residence, d.Lat_Residence])
                return coords[1]
              })
              .style("fill", "none")
              .style("stroke", "#eb0000")
              .style("opacity", 1)



              svg.selectAll(".label")
                .data(data.filter(function(d){
                  return d.Count > 1000
                }))
                .enter()
                .append("text")
                .attr("class", "label")
                .attr("x", function(d){
                  var coords = projection([d.Lon_Residence, d.Lat_Residence])
                  if(d.Country_Residence == "Germany"){
                    return coords[0] + 17
                  } if(d.Country_Residence == "Jordan"){
                    return coords[0] + 20
                  } if(d.Country_Residence == "Iraq"){
                    return coords[0] + 16
                  } if(d.Country_Residence == "Egypt"){
                    return coords[0] - 13
                  } if(d.Country_Residence == "Lebanon"){
                    return coords[0] - 12
                  } if(d.Country_Residence == "Turkey"){
                    return coords[0] - 19
                  } else{
                    return coords[0] + 5      
                  }
                })
                .attr("y", function(d){
                  var coords = projection([d.Lon_Residence, d.Lat_Residence])
                  if(d.Country_Residence == "Egypt"){
                    return coords[1] + 20
                  } if(d.Country_Residence == "Turkey"){
                    return coords[1] - 20
                  }if(d.Country_Residence == "Jordan"){
                    return coords[1] + 20
                  } if(d.Country_Residence == "Lebanon"){
                    return coords[1] - 9
                  } else { 
                  return coords[1]
                  }
                  })
                .text(function(d){
                  if(d.Country_Residence == "Turkey"){
                  return d.Country_Residence;
                }if(d.Country_Residence == "Lebanon"){
                  return "Leb."
                }if(d.Country_Residence == "Jordan"){
                  return d.Country_Residence
                } if(d.Country_Residence == "Germany"){
                  return d.Country_Residence
                } if(d.Country_Residence == "Iraq"){
                  return d.Country_Residence
                }
                if(d.Country_Residence == "Egypt"){
                  return d.Country_Residence
                } if(d.Country_Residence == "Canada"){
                  return d.Country_Residence
                } if(d.Country_Residence == "United States"){
                  return d.Country_Residence
                } if(d.Country_Residence == "Russia"){
                  return d.Country_Residence
                } if(d.Country_Residence == "Sudan"){
                  return d.Country_Residence
                }if(d.Country_Residence == "Yemen"){
                  return d.Country_Residence
                } })
                .style("fill", "#cd0d0e")
                .style("font-size", "12px")
                .style("opacity", 0.7)

        })
        })

     })()
  