
(function(){


var w = 1000
var h = 550
var numCols = 5;

var margin = {
  right: 40,
  left: 100,
  top: 100,
  bottom: 40
}

var width = w - margin.right - margin.left;
var height = h - margin.top - margin.bottom;

var svg = d3.select("#actress_lead")
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


d3.csv("lead_actors_actress_race - Sheet1 (1).csv", function(error, data){

  var race = d3.nest()
    .key(function(d){ return d.Female_race })
    .entries(data)

    console.log(race)

    svg.append("rect")
      .attr("x", 0)
      .attr("y", -90)
      .attr("width", 22)
      .attr("height", 22)
      .style("fill", "#e2c642")

       svg.append("text")
      .attr("x", 30)
      .attr("y", -75)
      .text("Past Winners")
       .style("font-family", "Helvetica")
       .style("font-size", 12)

       svg.append("text")
      .attr("x", 150)
      .attr("y", -75)
      .text("2017 Winners")
       .style("font-family", "Helvetica")
      .style("font-size", 12)


      svg.append("rect")
      .attr("x", 120)
      .attr("y", -90)
      .attr("width", 22)
      .attr("height", 22)
      .style("fill", "#e2c642")
      .style("stroke", "black")

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
      .attr("x", 610)
      .attr("y", 60)
      .html("Halle Berry is the only actress ")
      .style("font-size", 15)
      .style("font-family", "Helvetica")

    svg.append("text")
      .attr("x", 610)
      .attr("y", 77)
      .html("of color to win an Oscar for Best Actress ")
      .style("font-size", 15)
      .style("font-family", "Helvetica")

     svg.append("text")
      .attr("x", 610)
      .attr("y", 92)
      .html("in a leading role.")
      .style("font-size", 15)
      .style("font-family", "Helvetica")



    svg.append("line")
            .attr("x1", 0.5)
            .attr("y1", 1)
            .attr("x2", 0.5)
            .attr("y2", 20)
            .attr("stroke-width", 0.5)
            .attr("transform", "translate(620,25)")
            .attr("stroke", "black")


     svg.append("text")
      .attr("x", 150)
      .attr("y", 210)
      .html("90 white women have won")
      .style("font-size", 15)
      .style("font-family", "Helvetica")

     svg.append("text")
      .attr("x", 150)
      .attr("y", 227)
      .html("an Oscar for Best Actress.")
      .style("font-size", 15)
      .style("font-family", "Helvetica")


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
        if(d.Year == 2017){
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
            div.html("<span style = 'font-weight: bold'>" + d["Actress in leading role"] + "</span>" + "<br>" + "<span style = 'font-style: italic'>" + d.Movie_female + " " + "(" + d.Year + ")" + "</span>")
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
