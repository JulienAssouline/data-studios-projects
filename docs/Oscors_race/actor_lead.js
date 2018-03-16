
(function(){


var w = 1000
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

var svg = d3.select("#actor_lead")
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
    .key(function(d){ return d.Male_race })
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
      .attr("x", 150)
      .attr("y", 180)
      .html("Only seven of the 91 winners")
      .style("font-size", 15)
      .style("font-family", "Helvetica")

    svg.append("text")
      .attr("x", 150)
      .attr("y", 197)
      .html("for Best Actor in a leading role")
      .style("font-size", 15)
      .style("font-family", "Helvetica")

    svg.append("text")
      .attr("x", 150)
      .attr("y", 214)
      .html("have not been white. This trend")
      .style("font-size", 15)
      .style("font-family", "Helvetica")

    svg.append("text")
      .attr("x", 150)
      .attr("y", 231)
      .html("continued this year with another")
      .style("font-size", 15)
      .style("font-family", "Helvetica")

    svg.append("text")
      .attr("x", 150)
      .attr("y", 248)
      .html("win from Gary Oldman.")
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
            div.html("<span style = 'font-weight: bold'>" + d["Actor leading role"] + "</span>" + "<br>" + "<span style = 'font-style: italic'>" + d.Movie_male + " " + "(" + d.Year + ")" + "</span>")
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
