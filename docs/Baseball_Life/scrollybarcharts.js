(function () {

 var w = 550;
 var h = 360;

      var margin = {
          top: 70,
          bottom: 20,
          left: 20,
          right: 20
        }

        var width = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;

         var svg = d3.select("#baseball_arcs")
        .append("svg")
        .attr("id", "chart")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        xtickValues = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]

         var xScale = d3.scaleLinear() 
        .range([0, width])

      var yScale = d3.scaleLinear()
        .range([height, 0])

       var yScale_bars = d3.scaleLinear()
        .range([height, 0])

      var xAxis = d3.axisBottom()
        .scale(xScale)
        .tickValues(xtickValues)

      var yAxis = d3.axisLeft()
        .scale(yScale)



  d3.csv("Baseball_careers_distribution.csv", function(error, data){
    data.forEach(function(d){
      d.index = d.index
      d.experience = +d.experience
    });

    xScale.domain([0, 27])
    yScale.domain([0, 1])
    yScale_bars.domain([0, 1751])


          svg.append("g")
              .attr("class", "xaxis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis)
              .selectAll("text")
                  .style("font-family", "Arial")
                  .style("fill", "black")
                  .style("font-size", "10px")
                  .style("opacity", 1)

    svg.selectAll(".arcs")
      .data(data)
      .enter()
      .append("path")
      .style("stroke", "#012e6c")
      .style("stroke-width", 2)
      .attr("class", function(d){
        return "arcs " + "l" + d.index.replace(/ /g, "") // a number cannot start a class, which is why I added "l"
        // also make sure it is not a number when loading ur data. keep it as a string!!!
      })
      .attr("d", function(d){
        var To_scale = xScale(d.index),
            From_scale = xScale(0),
            y = yScale(0),
            dx = To_scale - From_scale,
            dy = y,
            dr = Math.sqrt(dx * dx + dy * dy);
        return "M" + From_scale + " " + y + " A 43 50 0 0 1 " + To_scale + " " + y;
      })
      .style("fill", "none")
      .style("opacity", 0)


    d3.select("#first").on("stepin", function(){

      svg.selectAll(".arcs")
      .data(data)
      .style("stroke", "#012e6c")
      .style("stroke-width", 2)
      .attr("class", function(d){
        return "arcs " + "l" + d.index.replace(/ /g, "") // a number cannot start a class, which is why I added "l"
        // also make sure it is not a number when loading ur data. keep it as a string!!!
      })
      .attr("d", function(d){
        var To_scale = xScale(d.index),
            From_scale = xScale(0),
            y = yScale(0),
            dx = To_scale - From_scale,
            dy = y,
            dr = Math.sqrt(dx * dx + dy * dy);
        return "M" + From_scale + " " + y + " A 43 50 0 0 1 " + To_scale + " " + y;
      })
      .style("fill", "none")
      .call(transition)

    })

    d3.select("#second").on("stepin", function(){

      svg.selectAll(".arcs")
      .data(data)
      .transition()
      .style("stroke", "#012e6c")
      .style("stroke-width", 2)
      .attr("class", function(d){
        return "arcs " + "l" + d.index.replace(/ /g, "") // a number cannot start a class, which is why I added "l"
        // also make sure it is not a number when loading ur data. keep it as a string!!!
      })
      .attr("d", function(d){
        var To_scale = xScale(d.index),
            From_scale = xScale(0),
            y = yScale(0),
            dx = To_scale - From_scale,
            dy = y,
            dr = Math.sqrt(dx * dx + dy * dy);
        return "M" + From_scale + " " + y + " A 43 50 0 0 1 " + To_scale + " " + y;
      })
      .style("fill", "none")
      .style("opacity", function(d){
        if( (d.index == 27) || (d.index == 26)){
          return 1
        } else {
          return 0.1
        }
      })


      })

    d3.select("#third").on("stepin", function(){

       svg.selectAll(".arcs")
      .data(data)
      .transition()
      .style("stroke", "#012e6c")
      .style("stroke-width", 2)
      .attr("class", function(d){
        return "arcs " + "l" + d.index.replace(/ /g, "") // a number cannot start a class, which is why I added "l"
        // also make sure it is not a number when loading ur data. keep it as a string!!!
      })
      .attr("d", function(d){
        var To_scale = xScale(d.index),
            From_scale = xScale(0),
            y = yScale(0),
            dx = To_scale - From_scale,
            dy = y,
            dr = Math.sqrt(dx * dx + dy * dy);
        return "M" + From_scale + " " + y + " A 43 50 0 0 1 " + To_scale + " " + y;
      })
      .style("fill", "none")
      .style("opacity", function(d){
        if(d.index == 1){
          return 1
        } else {
          return 0.1
        }
      })


       })

    d3.select("#fourth").on("stepin", function(){

       svg.selectAll(".arcs")
      .data(data)
      .transition()
      .style("stroke", "#012e6c")
      .style("stroke-width", 2)
      .attr("class", function(d){
        return "arcs " + "l" + d.index.replace(/ /g, "") // a number cannot start a class, which is why I added "l"
        // also make sure it is not a number when loading ur data. keep it as a string!!!
      })
      .attr("d", function(d){
        var To_scale = xScale(d.index),
            From_scale = xScale(0),
            y = yScale(0),
            dx = To_scale - From_scale,
            dy = y,
            dr = Math.sqrt(dx * dx + dy * dy);
        return "M" + From_scale + " " + y + " A 43 50 0 0 1 " + To_scale + " " + y;
      })
      .style("fill", "none")
      .style("opacity", function(d){
        if(d.index == 4){
          return 1
        } else {
          return 0.1
        }
      })



       })

    d3.select("#fifth").on("stepin", function(){

      svg.selectAll(".arcs")
      .data(data)
      .transition()
      .style("stroke", "#012e6c")
      .style("stroke-width", 2)
      .attr("class", function(d){
        return "arcs " + "l" + d.index.replace(/ /g, "") // a number cannot start a class, which is why I added "l"
        // also make sure it is not a number when loading ur data. keep it as a string!!!
      })
      .attr("d", function(d){
        var To_scale = xScale(d.index),
            From_scale = xScale(0),
            y = yScale(0),
            dx = To_scale - From_scale,
            dy = y,
            dr = Math.sqrt(dx * dx + dy * dy);
        return "M" + From_scale + " " + y + " A 43 50 0 0 1 " + To_scale + " " + y;
      })
      .style("fill", "none")
      .style("opacity", function(d){
        if(d.index == 20){
          return 1
        } else {
          return 0.1
        }
      })


       })



 function transition(path){
        path.each(function(PathItem, index_1){
         d3.select(this).transition()
          .delay(index_1 * 500 + 19)
          .duration(index_1 * 20 + 1000)
          .on("start", function(){
            d3.select(this).style("opacity", 1)
          })
          .on("end", function(d){
            d3.select("#bar-" + d.index.replace(/ /g, ""))
              .transition()
              .attr("y", function(d){ 
                return yScale_bars(d.experience)
              })
              .attr("height", function(d){
              return height - yScale_bars(d.experience)
           })

          })
          .attrTween("stroke-dasharray", tweenDash)
        })

      }
      
      function tweenDash(){
        var l = this.getTotalLength(),
            i = d3.interpolateString("0," + l, l + "," + l)
            return function(t){ return i(t); };
      }

                });

  


   
})()