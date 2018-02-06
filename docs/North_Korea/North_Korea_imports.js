(function () {

     var w = 900;
    var h = 500;
var lowColor = '#f9f9f9'
var highColor = '#bc2a66'

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

        var color = d3.scaleThreshold()
            .domain([0, 1688, 206684, 747204.800, 3652593.657, 1000000000, 2338271127])
            .range(["#ede9f3", "#cbbedd", "#a993c7", "#8767b0", "#653c9a", "#54278f", "#431f72"]);

            var countryMap = d3.map();

        d3.queue()
          .defer(d3.json, "readme-world-110m.json")
          .defer(d3.csv, "North_Korea_imports_2015.csv", function(d){
            d.import_val = +d.import_val

            countryMap.set(d.name, d)

            return d
          })
          .await(ready)

        function ready(error, json, data){

        
          var countries = topojson.feature(json, json.objects.countries).features

          console.log(countries)

          svg.append("text")
            .attr("x", 0)
            .attr("y", 10)
            .text("Countries exporting to North Korea, 2015")
            .style("font-size", 20)
            .style("font-weight", "bold")

        svg.selectAll("path")
          .data(countries)
          .enter()
          .append("path")
          .attr("class", "country")
          .attr("d", path)
          .style("stroke", "white")
          .style("fill", function(d){
            var countryData = countryMap.get(d.id)
            if(countryData){
              return color(countryData)// here i just want one color
              // return color(countryData.import_val) this is how I would add the choropleth
            } else {
              return "#ccc"
            }
          })



 }



})()