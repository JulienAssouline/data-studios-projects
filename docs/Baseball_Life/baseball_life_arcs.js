(function () {

 var w = 700;
 var h = 400;

      var margin = {
          top: 0,
          bottom: 40,
          left: 40,
          right: 40
        }

        var width = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;

      var xScale = d3.scaleLinear() 
        .range([0, width])

      var yScale = d3.scaleLinear()
        .range([height, 0])

       var yScale_bars = d3.scaleLinear()
        .range([height, 0])

      var xAxis = d3.axisBottom()
        .scale(xScale)

      var yAxis = d3.axisLeft()
        .scale(yScale)


        var svg = d3.select("#baseball_arcs")
        .append("svg")
        .attr("id", "chart")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv("Baseball_careers_1999.csv", function(error, data){
    data.forEach(function(d){
      d.index = d.index
      d.experience = +d.experience
    });

    console.log(data)

    xScale.domain([0, 14])
    yScale.domain([0, 1])
    yScale_bars.domain([0, 500])
    
     var path = svg.selectAll(".arcs")
      .data(data)
      .enter()
      .append("path")
      .style("stroke", "#832129")
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
      .call(transition)
      .on("mouseover",  function(d){
         d3.selectAll("path").style("opacity", 0.5)
          d3.select(this).style("opacity", 1).style("stroke-width", 3)
         d3.selectAll(".rect").style("opacity", 0.5) 
         d3.select("." + "n" + d.index.replace(/ /g, "")).style("opacity", 1)

        })
        .on("mouseout",  function(d){
          d3.selectAll("path").style("opacity", 1)
          d3.select(this).style("opacity", 1).style("stroke-width", 2)
          d3.selectAll(".rect").style("opacity", 1)
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
              .attr("y", 0)
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

     

      svg.append("g")
    .classed("xaxis", true)
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
        .style("fill", "#832129")

    svg.append("g")
      .classed("yaxis", true)
      .attr("transform", "translate(0," + -15 + ")")
      .call(yAxis)
        .selectAll("text")
        .style("fill", "none")

    // function arcs(d, bend){
    //   bend = bend || 1;

    // }



  });


   })()