(function () {

 var w = 730;
 var h = 600;

      var margin = {
          top: 100,
          bottom: 20,
          left: 40,
          right: 40
        }

        var width = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;


        var svg = d3.select("#age")
        .append("svg")
        .attr("id", "chart")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var xScale = d3.scaleBand()
          .range([width, 0])

        var yScale = d3.scaleLinear()
          .range([height, 0])

        var xAxis = d3.axisBottom()
          .scale(xScale)



  d3.csv("Opioid_age.csv", function(error, data){
    data.forEach(function(d){
      d["Age group (years)"] =  d["Age group (years)"];
      d["2014–2015"] = +d["2014–2015"];
      d["2013–2014"] = +d["2013–2014"];
      d["2012–2013"] = +d["2012–2013"];
      d["2011–2012"] = +d["2011–2012"];
      d["2010–2011"] = +d["2010–2011"];
      d["2009–2010"] = +d["2009–2010"];
      d["2008–2009"] = +d["2008–2009"];
      d["2007–2008"] = +d["2007–2008"];
    });

    yScale.domain([0, d3.max(data, function(d){ return d["2014–2015"] })])
    xScale.domain(data.map(function(d){ return d["Age group (years)"] }))


    svg.selectAll(".rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", function(d){ 
        return xScale(d["Age group (years)"])
      })
      .attr("y", function(d){
        return yScale(d["2007–2008"])
      })
      .attr("width", xScale.bandwidth() -10)
      .attr("height", function(d){
        return height - yScale(d["2007–2008"])
      })
      .style("fill", "purple")
      .transition()
        .delay(500)
        .duration(500)
        .on("start",function repeat(){
          d3.active(this)
            .transition()
            .delay(1000)
            .duration(500)
            .attr("y", function(d){
              return yScale(d["2008–2009"])
            })
            .attr("height", function(d){
              return height - yScale(d["2008–2009"])
            })
            .transition()
            .delay(1000)
            .duration(500)
            .attr("y", function(d){
              return yScale(d["2009–2010"])
            })
            .attr("height", function(d){
              return height - yScale(d["2009–2010"])
            })
            .transition()
            .delay(1000)
            .duration(500)
            .attr("y", function(d){
              return yScale(d["2010–2011"])
            })
            .attr("height", function(d){
              return height - yScale(d["2010–2011"])
            })
            .transition()
            .delay(1000)
            .duration(500)
            .attr("y", function(d){
              return yScale(d["2011–2012"])
            })
            .attr("height", function(d){
              return height - yScale(d["2011–2012"])
            })
            .transition()
            .delay(1000)
            .duration(500)
            .attr("y", function(d){
              return yScale(d["2012–2013"])
            })
            .attr("height", function(d){
              return height - yScale(d["2012–2013"])
            })
            .transition()
            .delay(1000)
            .duration(500)
            .attr("y", function(d){
              return yScale(d["2013–2014"])
            })
            .attr("height", function(d){
              return height - yScale(d["2013–2014"])
            })
            .transition()
            .delay(1000)
            .duration(500)
            .attr("y", function(d){
              return yScale(d["2014–2015"])
            })
            .attr("height", function(d){
              return height - yScale(d["2014–2015"])
            })
            .transition()
            .delay(1000)
            .duration(500)
            .attr("y", function(d){
              return yScale(d["2007–2008"])
            })
            .attr("height", function(d){
              return height - yScale(d["2007–2008"])
            })
            .on("end", repeat)
        });


        // text labels
        svg.selectAll(".label")
          .data(data)
          .enter()
          .append("text")
          .attr("x", function(d){
            return xScale(d["Age group (years)"]) + 45
          })
          .attr("y", function(d){
            return yScale(d["2007–2008"]- 0.5)
          })
          .text(function(d){
            return d["2007–2008"]
          })
          .style("font-weight", "normal")
          .style("font-size", "15px")
          .style("font-family", "Bree Serif")
          .style("fill", "white")
          .attr("text-anchor", "right")
          .transition()
            .delay(500)
            .duration(500)
          .on("start",function repeat(){
          d3.active(this)
            .transition()
            .delay(1000)
            .duration(500)
            .attr("y", function(d){
              return yScale(d["2008–2009"] - 0.5)
            })
            .text(function(d){
              return d["2008–2009"]
            })
            .transition()
            .delay(1000)
            .duration(500)
            .attr("y", function(d){
              return yScale(d["2009–2010"] - 0.5)
            })
            .text(function(d){
              return d["2009–2010"]
            })
            .transition()
            .delay(1000)
            .duration(500)
            .attr("y", function(d){
              return yScale(d["2010–2011"] - 0.5)
            })
            .text(function(d){
              return d["2010–2011"]
            })
            .transition()
            .delay(1000)
            .duration(500)
            .attr("y", function(d){
              return yScale(d["2011–2012"] - 0.5)
            })
            .text(function(d){
              return d["2011–2012"]
            })
            .transition()
            .delay(1000)
            .duration(500)
            .attr("y", function(d){
              return yScale(d["2012–2013"] - 0.5)
            })
            .text(function(d){
              return d["2012–2013"]
            })
            .transition()
            .delay(1000)
            .duration(500)
            .attr("y", function(d){
              return yScale(d["2013–2014"] - 0.5)
            })
            .text(function(d){
              return d["2013–2014"]
            })
            .transition()
            .delay(1000)
            .duration(500)
            .attr("y", function(d){
              return yScale(d["2014–2015"] - 0.5)
            })
            .text(function(d){
              return d["2014–2015"]
            })
            .transition()
            .delay(1000)
            .duration(500)
            .attr("y", function(d){
              return yScale(d["2007–2008"] - 0.5)
            })
            .text(function(d){
              return d["2007–2008"]
            })
            .on("end", repeat)
        });

      svg.append("text")
        .attr("x", -30)
        .attr("y", -70)
        .text("Opioid Cases by Age in Canada")
        .style("font-size", 30)
        .style("font-family", "Bree Serif")
        .style("font-weight", "bold")

        svg.append("text")
        .attr("x", -30)
        .attr("y", -40)
        .text("per 100,000 documented cases")
        .style("font-size", 18)
        .style("font-family", "Bree Serif")
        .style("font-weight", "normal")


        // Year

        svg.append("text")
          .attr("x", 300)
          .attr("y", 30)
          .text("2007-2008")
          .style("font-size", 18)
          .style("font-family", "Bree Serif")
          .attr("text-decoration", "underline")
          .transition()
            .delay(500)
            .duration(500)
            .on("start",function repeat(){
              d3.active(this)
              .transition()
              .delay(1000)
              .duration(500)
              .text("2008-2009")
              .transition()
              .delay(1000)
              .duration(500)
              .text("2009-2010")
              .transition()
              .delay(1000)
              .duration(500)
              .text("2010-2011")
              .transition()
              .delay(1000)
              .duration(500)
              .text("2011-2012")
              .transition()
              .delay(1000)
              .duration(500)
              .text("2012-2013")
              .transition()
              .delay(1000)
              .duration(500)
              .text("2013-2014")
              .transition()
              .delay(1000)
              .duration(500)
              .text("2014-2015")
              .transition()
              .delay(1000)
              .duration(500)
              .text("2007-2008")
              .on("end", repeat)
            })
          

            svg.append("g")
                .attr("class", "xaxis")
                .attr("transform", "translate(" + -5 + "," + height + ")")
                .call(xAxis)
                .selectAll("text")
                  .style("font-size", 14)
                  .style("font-family", "Bree Serif")
        
     
                




                });

  


   
})()