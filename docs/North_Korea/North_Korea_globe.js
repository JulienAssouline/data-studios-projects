(function () {

     var w = 500;
    var h = 430;


      var margin = {
          top: 10,
          bottom: 40,
          left: 0,
          right: 30
        };

        var width = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;

      
      // define map projection
      var projection = d3.geoOrthographic()
        .scale(200)
        .clipAngle(90)
        .translate([width / 2, height / 2])

      //Define default path generator
      var path = d3.geoPath()
        .projection(projection);

      var svg = d3.select("#North_Korea")
        .append("svg")
        .attr("id", "chart")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(0" + margin.left + "," + margin.top + ")");

        var purple = ["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]

        var color = d3.scaleThreshold()
            .domain([0, 1688, 206684, 747204.800, 3652593.657, 2338271127])
            .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]);

            var countryMap = d3.map();

        d3.queue()
          .defer(d3.json, "world.topojson")
          .defer(d3.csv, "North_Korea_imports_2015.csv", function(d){
            d.import_val = +d.import_val

            countryMap.set(d.name, d)

            return d
          })
          .await(ready)

        function ready(error, json, data){

          var countries = topojson.feature(json, json.objects.countries).features
      i = -1,
      n = countries.length;


             svg.append("path")
    .datum({type: "Sphere"})
    .attr("class", "water")
    .attr("d", path)
    .style("stroke-width", 1);

        var country = svg.selectAll("path")
          .data(countries)
          .enter()
          .append("path")
          .attr("class", "country")
          .attr("d", path)
          .style("stroke", "grey")


          var China, Russia, Mexico, India, Thailand, Philippines, Afghanistan, Armenia, Azerbaijan, Bahrain, Bangladesh, Bhutan, 
          Brunei, Cambodia, Cyprus, Georgia, Indonesia, Iran, Iraq, Israel, Japan, Jordan, Kazakhstan, Kuwait, Kyrgyzstan,
          Laos, Lebanon, Malaysia, Maldives, Mongolia, Myanmar, Nepal, Oman, Pakistan, Palestine, Qatar, Saudi_Arabia, Singapore,
          South_Korea, Sri_Lanka, Syria, Taiwan, Tajikistan, Timor_Leste, Turkey, Turkmenistan, United_Arab_Emirates, Uzbekistan,
          Vietnam, Yemen;
          countries.forEach(function(d, i) {
          if (d.properties.name === "China") China = i;
          if (d.properties.name === "Russian Federation") Russia = i;
           if (d.properties.name === "Mexico") Mexico = i;
            if(d.properties.name === "India") India = i;
            if(d.properties.name === "Thailand") Thailand = i;
            if(d.properties.name === "Philippines") Philippines = i;
            if(d.properties.name === "Afghanistan") Afghanistan = i;
            if(d.properties.name === "Azerbaijan") Azerbaijan = i;
            if(d.properties.name === "Armenia") Armenia = i;
            if(d.properties.name === "Bahrain") Bahrain = i;
            if(d.properties.name === "Bangladesh") Bangladesh = i;
            if(d.properties.name === "Bhutan") Bhutan = i;
            if(d.properties.name === "Brunei") Brunei = i;
            if(d.properties.name === "Cambodia") Cambodia = i;
            if(d.properties.name === "Cyprus") Cyprus = i;
            if(d.properties.name === "Georgia") Georgia = i;
            if(d.properties.name === "Indonesia") Indonesia = i;
            if(d.properties.name === "Iran, Islamic Republic of") Iran = i;
            if(d.properties.name === "Iraq") Iraq = i;
            if(d.properties.name === "Israel") Israel = i;
            if(d.properties.name === "Japan") Japan = i;
            if(d.properties.name === "Jordan") Jordan = i;
            if(d.properties.name === "Kazakhstan") Kazakhstan = i;
            if(d.properties.name === "Kuwait") Kuwait = i;
            if(d.properties.name === "Kyrgyzstan") Kyrgyzstan = i;
            if(d.properties.name === "Lao People's Democratic Republic") Laos = i;
            if(d.properties.name === "Lebanon") Lebanon = i;
            if(d.properties.name === "Malaysia") Malaysia = i;
            if(d.properties.name === "Maldives") Maldives = i;
            if(d.properties.name === "Mongolia") Mongolia = i;
            if(d.properties.name === "Myanmar") Myanmar = i;
            if(d.properties.name === "Nepal") Nepal = i;
            if(d.properties.name === "Oman") Oman = i;
            if(d.properties.name === "Pakistan") Pakistan = i;
            if(d.properties.name === "Palestine") Palestine = i;
            if(d.properties.name === "Qatar") Qatar = i;
            if(d.properties.name === "Saudi Arabia") Saudi_Arabia = i;
            if(d.properties.name === "Korea, Republic of") South_Korea = i;
            if(d.properties.name === "Sri Lanka") Sri_Lanka = i;
            if(d.properties.name === "Syrian Arab Republic") Syria = i;
            if(d.properties.name === "Taiwan") Taiwan = i;
            if(d.properties.name === "Tajikistan") Tajikistan = i;
            if(d.properties.name === "Timor-Leste") Timor_Leste = i;
            if(d.properties.name === "Turkey") Turkey = i;
            if(d.properties.name === "Turkmenistan") Turkmenistan = i;
            if(d.properties.name === "United Arab Emirates") United_Arab_Emirates  = i;
            if(d.properties.name === "Uzbekistan") Uzbekistan = i;
            if(d.properties.name === "Viet Nam") Vietnam = i;
            if(d.properties.name === "Yemen") Yemen = i;


          });

          console.log(Afghanistan)

          d3.select("#first").on("stepin", function(){

            i = China

            country.transition()
              .style("fill", function(d, j){ return j === i ? "#431f72" : "#b8b8b8"})

            d3.transition()
              .delay(250)
              .duration(1250)
              .tween("rotate", function(){
                var point = d3.geoCentroid(countries[i]),
                    rotate = d3.interpolate(projection.rotate(), [-point[0], -point[1]]);
                return function(t){
                  projection.rotate(rotate(t))
                  country.attr("d", path)
                }
              })

             })

      d3.select("#second").on("stepin", function(){

            i = India

            country.transition()
              .style("fill", function(d, j){ return j === i ? "#431f72" : "#b8b8b8"})

            d3.transition()
              .delay(250)
              .duration(1250)
              .tween("rotate", function(){
                var point = d3.geoCentroid(countries[i]),
                    rotate = d3.interpolate(projection.rotate(), [-point[0], -point[1]]);
                return function(t){
                  projection.rotate(rotate(t))
                  country.attr("d", path)
                }
              })

             })

      d3.select("#third").on("stepin", function(){

            i = Russia

            country.transition()
              .style("fill", function(d, j){ return j === i ? "#431f72" : "#b8b8b8"})

            d3.transition()
              .delay(250)
              .duration(1250)
              .tween("rotate", function(){
                var point = d3.geoCentroid(countries[i]),
                    rotate = d3.interpolate(projection.rotate(), [-point[0], -point[1]]);
                return function(t){
                  projection.rotate(rotate(t))
                  country.attr("d", path)
                }
              })

             })

      d3.select("#fourth").on("stepin", function(){

            i = Mexico

            country.transition()
              .style("fill", function(d, j){ return j === i ? "#431f72" : "#b8b8b8"})

            d3.transition()
              .delay(250)
              .duration(1250)
              .tween("rotate", function(){
                var point = d3.geoCentroid(countries[i]),
                    rotate = d3.interpolate(projection.rotate(), [-point[0], -point[1]]);
                return function(t){
                  projection.rotate(rotate(t))
                  country.attr("d", path)
                }
              })

             })

      d3.select("#fifth").on("stepin", function(){

            i = India

            country.transition()
              .style("fill", function(d, j){ 
                if(j === Thailand){
                  return "#431f72"
                } if(j === Russia){
                  return "#431f72"
                }
                if(j === Philippines){
                  return "#431f72"
                }
                if(j === China){
                  return "#431f72"
                }
                 if(j === India){
                  return "#431f72"
                }
               if(j === Brunei){
                  return "#431f72"
                } if(j === Cambodia){
                  return "#431f72"
                } if(j === Cyprus){
                  return "#431f72"
                } if(j === Israel){
                  return "#431f72"
                } if(j === Kazakhstan){
                  return "#431f72"
                } if(j === Kuwait){
                  return "#431f72"
                } if(j === Malaysia){
                  return "#431f72"
                } if(j === Mongolia){
                  return "#431f72"
                } if(j === Pakistan){
                  return "#431f72"
                } if(j === Qatar){
                  return "#431f72"
                } if(j === Saudi_Arabia){
                  return "#431f72"
                } if(j === Singapore){
                  return "#431f72"
                } if(j === Sri_Lanka){
                  return "#431f72"
                } if(j === Turkey){
                  return "#431f72"
                }
                 else {
                  "#b8b8b8"
                }
              })
              // .style("fill", function(d, j){ return j === (i&&p) ? "#431f72" : "#b8b8b8"})


            d3.transition()
              .delay(250)
              .duration(1250)
              .tween("rotate", function(){
                var point = d3.geoCentroid(countries[i]),
                    rotate = d3.interpolate(projection.rotate(), [-point[0], -point[1]]);
                return function(t){
                  projection.rotate(rotate(t))
                  country.attr("d", path)
                }
              })

             })








 }




   })()