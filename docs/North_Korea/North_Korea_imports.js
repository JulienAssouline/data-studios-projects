(function () {

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
      var projection = d3.geoRobinson()
        .scale(150)
        .translate([w/2.2, h/1.9])

      //Define default path generator
      var path = d3.geoPath()
        .projection(projection);

      var svg = d3.select("#countries")
        .append("svg")
        .attr("id", "chart")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(0" + margin.left + "," + margin.top + ")");

        var purple = ["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]

        var color_imp = d3.scaleThreshold()
            .domain([0, 1688, 206684, 747204.800, 3652593.657, 1000000000, 2338271127])
            .range(["#ede9f3", "#cbbedd", "#a993c7", "#8767b0", "#653c9a", "#54278f", "#431f72"]);


        var color_exp = d3.scaleThreshold()
            .domain([0, 1688, 206684, 747204.800, 3652593.657, 1000000000, 2338271127])
            .range(["#ede9f3", "#cbbedd", "#a993c7", "#8767b0", "#653c9a", "#54278f", "darkgreen"]);

            var countryMap_imp = d3.map();
            var countryMap_exp = d3.map();

        d3.queue()
          .defer(d3.json, "readme-world-110m.json")
          .defer(d3.csv, "North_Korea_imports_2015.csv", function(d){
            d.import_val = +d.import_val

            countryMap_imp.set(d.name, d)

            return d
          })
          .defer(d3.csv, "df_NK_merged_geo_2015.csv", function(d){
            d.export_val = +d.export_val

            countryMap_exp.set(d.name, d)

            return d
          })
          .await(ready)

        function ready(error, json, data){

        
          var countries = topojson.feature(json, json.objects.countries).features

          console.log(countries)

          var text = svg.append("svg:text")
           
            text.append("svg:tspan")
            .attr("y", 10)
            .style("fill", "black")
            .text("North Korea ")
            .style("font-size", 20)
            .style("font-weight", "bold");

             text.append("svg:tspan")
            .attr("y", 10)
            .attr("fill", "#431f72")
            .text("Imports")
            .style("text-decoration", "underline")  
            .style("font-size", 20)
            .style("font-weight", "bold")
            .transition()
            .delay(100)
            .duration(500)
            .on("start", function repeat(){
              d3.active(this)
              .transition()
              .delay(3000)
              .duration(2000)
              .attr("fill", "darkgreen")
              .text("Exports")
              .transition()
              .delay(3000)
              .duration(2000)
              .attr("fill", "#431f72")
              .text("Imports")
              .on("end", repeat)
            });

            text.append("svg:tspan")
            .attr("y", 10)
            .style("fill", "black")
            .text(", 2015")
            .style("font-size", 20)
            .style("font-weight", "bold");

        svg.selectAll("path")
          .data(countries)
          .enter()
          .append("path")
          .attr("class", "country")
          .attr("d", path)
          .style("stroke", "white")
          .style("fill", function(d){
            var countryData_imp = countryMap_imp.get(d.id)
            if(countryData_imp){
              return color_imp(countryData_imp)// here i just want one color
              // return color(countryData.import_val) this is how I would add the choropleth
            } else {
              return "#ccc"
            }
          })
          .transition()
            .delay(100)
            .duration(500)
            .on("start", function repeat(){
              d3.active(this)
                .transition()
                .delay(3000)
                .duration(2000)
                .style("fill", function(d){
                   var countryData_exp = countryMap_exp.get(d.id)
                  if(countryData_exp){
                    return color_exp(countryData_exp)// here i just want one color
              // return color(countryData.import_val) this is how I would add the choropleth
                    } else {
                    return "#ccc"
                    }
                    })
                .transition()
                .delay(3000)
                .duration(2000)
                .style("fill", function(d){
                   var countryData_imp = countryMap_imp.get(d.id)
                  if(countryData_imp){
                    return color_imp(countryData_imp)// here i just want one color
              // return color(countryData.import_val) this is how I would add the choropleth
                    } else {
                    return "#ccc"
                    }
                    })
                .on("end", repeat)

                }) // repeat


    



 }



})()