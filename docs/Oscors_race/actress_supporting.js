
(function(){


var w = 1200
var h = 500
var numCols = 5;

var margin = {
  right: 40,
  left: 100,
  top: 70,
  bottom: 40
}

var width = w - margin.right - margin.left;
var height = h - margin.top - margin.bottom;

var svg = d3.select("#actress_supporting")
  .append("svg")
  .attr("id", "chart")
  .attr("width", w)
  .attr("height", h)
  .append("g")
  .attr("transform", "translate(0" + margin.left + "," + margin.top + ")");

var div = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)


d3.csv("supporting actors actress - Sheet1 (1).csv", function(error, data){

  var race = d3.nest()
    .key(function(d){ return d.Female_race })
    .entries(data)

    console.log(race)

    svg.append("text")
      .attr("x", 0)
      .attr("y", -30)
      .text("White")
      .style("font-weight", "bold")
      .style("font-size", 20)
      .style("font-family", "Helvetica")

    svg.append("text")
      .attr("x", 210)
      .attr("y", -30)
      .text("Black")
      .style("font-weight", "bold")
      .style("font-size", 20)
      .style("font-family", "Helvetica")

    svg.append("text")
      .attr("x", 410)
      .attr("y", -30)
      .html("Hispanic or ")
      .style("font-weight", "bold")
      .style("font-size", 20)
      .style("font-family", "Helvetica")

     svg.append("text")
      .attr("x", 410)
      .attr("y", -10)
      .html("Latino")
      .style("font-weight", "bold")
      .style("font-size", 20)
      .style("font-family", "Helvetica")

      svg.append("text")
      .attr("x", 610)
      .attr("y", -30)
      .html("Mixed")
      .style("font-weight", "bold")
      .style("font-size", 20)
      .style("font-family", "Helvetica")

      svg.append("text")
      .attr("x", 810)
      .attr("y", -30)
      .html("Asian")
      .style("font-weight", "bold")
      .style("font-size", 20)
      .style("font-family", "Helvetica")

    svg.append("text")
      .attr("x", 210)
      .attr("y", 80)
      .html("Hattie McDaniel is the first")
      .style("font-size", 15)
      .style("font-family", "Helvetica")

     svg.append("text")
      .attr("x", 210)
      .attr("y", 97)
      .html("African American to win an Oscar.")
      .style("font-size", 15)
      .style("font-family", "Helvetica")

  svg.append("text")
      .attr("x", 210)
      .attr("y", 114)
      .html('She won the award for her performance as')
      .style("font-size", 15)
      .style("font-family", "Helvetica")

svg.append("text")
      .attr("x", 210)
      .attr("y", 131)
      .html('"Mammy" in Gone with the Wind in 1939.')
      .style("font-size", 15)
      .style("font-family", "Helvetica")


       svg.append("text")
      .attr("x", 750)
      .attr("y", 60)
      .html("Miyoshi Umeki is the first and")
      .style("font-size", 15)
      .style("font-family", "Helvetica")

     svg.append("text")
      .attr("x", 750)
      .attr("y", 77)
      .html("remains the only Asian women")
      .style("font-size", 15)
      .style("font-family", "Helvetica")

  svg.append("text")
      .attr("x", 750)
      .attr("y", 94)
      .html('to win an Oscar for acting. She')
      .style("font-size", 15)
      .style("font-family", "Helvetica")

svg.append("text")
      .attr("x", 750)
      .attr("y", 111)
      .html('won her award in 1957.')
      .style("font-size", 15)
      .style("font-family", "Helvetica")

svg.append("line")
            .attr("x1", 0.5)
            .attr("y1", 1)
            .attr("x2", 0.5)
            .attr("y2", 20)
            .attr("stroke-width", 0.5)
            .attr("transform", "translate(822,25)")
            .attr("stroke", "black")

 

  svg.append("svg:path")
    .attr("d", function(d){
      return "M" + "50" + " " + "70" + " A 43 50 0 0 1 " + "50" + " " + "10"
    })
    .style("fill", "none")
    .style("stroke", "black")
    .attr("transform", "translate(150, 5)")
    .attr("marker-end", "url(#triangle)") // add the marker
 //add the marker

  svg.append("svg:defs")
      .append("svg:marker") 
     .attr("id", "triangle")
     .attr('viewBox', '0 -5 10 10')
     .attr('refX', 6)
     .attr('markerWidth', 7)
     .attr('markerHeight', 7)
     .style("fill", "black")
     .attr("orient", "auto")
     .append("svg:path")
      .attr('d', 'M0,-5L10,0L0,5')

    var plots = svg.selectAll("g")
      .data(race)
      .enter()
      .append("g")
      .attr("transform", function(d, i){ 
        if(d.key == "Hispanic or Latino"){
          return "translate(410," + ((i * 0)) + ")" 
        }
        if(d.key == "Mixed"){
          return "translate(610," + ((i * 0)) + ")" 
        }
        if(d.key == "Black"){
          return "translate(210," + ((i * 0)) + ")" 
        }
        if(d.key == "Asian"){
          return "translate(810," + ((i * 0)) + ")" 
        }
         else {
          "translate(10," + ((i * 150)) + ")"
        }
        
      })



    plots.selectAll(".rect")
      .data(function(d){ return d.values})
      .enter()
      .append("rect")
      .attr("width", 22)
      .attr("height", 22)
      .attr("x", function(d, i){
        var colIndex = i % numCols
        return colIndex * 24
      })
      .attr("y", function(d, i){
        var rowIndex = Math.floor(i/numCols)
        return rowIndex * 24
      })
      .attr("r", 6)
      .style("fill", "#e2c642")
      .style("stroke", function(d){
        if(d.Years == 2017){
          return "black"
        } else {
          return "none"
        }
      })
      .on("mouseover", function(d){
              div.transition()
              .duration(100)
              .style("opacity", 1)
              var element = d3.select(this)
              element.style("fill", "Black")
            div.html("<span style = 'font-weight: bold'>" + d["Actress in supporting role"] + "</span>" + "<br>" + "<span style = 'font-style: italic'>" + d.Movies_female + " " + "(" + d.Years + ")" + "</span>")
                  .style("font-family", "Helvetica")
            div.style("visibility", "visible")
            .style("left", (d3.event.pageX - 20) + "px")    
            .style("top", (d3.event.pageY - 35) + "px")
          })
            .on("mousemove", function(d){
            div.style("left", (d3.event.pageX - 20) + "px")    
            .style("top", (d3.event.pageY - 65) + "px")
          })
          .on("mouseout", function(d){
            div.transition()
            .duration(500)
            div.style("visibility", "hidden")
            var element = d3.select(this)
            element.style("fill", "#e2c642")
          })



})



})()
