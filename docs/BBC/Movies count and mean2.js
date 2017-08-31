(function () {
var w = 815
var h = 600

var margin = {
  right: 190,
  left: 70,
  top: 70,
  bottom: 20
}

var width = w - margin.right - margin.left;
var height = h - margin.top - margin.bottom;

var svg = d3.select("#count_and_mean")
  .append("svg")
  .attr("id", "chart3")
  .attr("width", w)
  .attr("height", h)
  .append("g")
  .attr("transform", "translate(0" + margin.left + "," + margin.top + ")");

  var ytickValues = [10, 9, 8, 6, 5, 4, 3, 2, 1];


  var xScale = d3.scaleBand()

  var yScale = d3.scaleLinear()
    .range([height, 0]);

  var xAxis = d3.axisBottom()
    .scale(xScale)
    .tickSizeOuter(0)

  var yAxis = d3.axisLeft()
    .scale(yScale)
    // .tickFormat(ytickValues)
    .tickSizeOuter(0);

  // var xGridlines = d3.axisBottom()
  //   .scale(xScale)
  //   .tickSize(-height, -height)
  //   .tickFormat("")
  //   .tickSizeOuter(0);

  var yGridlines = d3.axisLeft()
  .scale(yScale)
  .tickSize(-width, 0, 0)
  .tickFormat("")
  .tickSizeOuter(0);

   var div = d3.select("body")
        .append("div")
        .attr("class", "tooltip3")
        // .style("opacity", 0)

  d3.csv("movies count and mean rank.csv", function(error, data){
    data.forEach(function(d){
      d.Movies = d.Movies;
      d.count = +d.count;
      d.mean = +d.mean;

    });

    xScale.domain(data.map(function(d){ return d.Movies; }))
    .range(data.map(function(d,i){return i * width;}));


    yScale.domain([d3.max(data, function(d){ return d.mean; }), 1])

    svg.append("g")
        .classed("axis3 x", true)
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
          .selectAll("text")
            .style("fill", "#F5F2EB");

      svg.append("g")
        .classed("axis3 y", true)
        .attr("transform", "translate(0,0)")
        .call(yAxis)


      // svg.append("g")
      //   .call(xGridlines)
      //   .classed("gridlines x", true)
      //   .attr("transform", "translate(0," + height + ")");
        
      svg.append("g")
        .call(yGridlines)
        .classed("gridlines y", true)
        .attr("transform", "translate(0,0)");


    svg.selectAll(".point")
      .data(data)
      .enter()
      .append("circle")
      .classed("point", true)
      .attr("r", function(d){
        return d.count + 1;
      })
      .attr("cx", function(d){
        return xScale(d.Movies);
      })
      .attr("cy", function(d){
        return yScale(d.mean);
      })
      .style("fill", function(d){
        if(d.mean == 1){
          return "#DAA520";
        } else {
          return "#CCCCCC";
        }
      })
      .style("opacity", function(d){
        if(d.mean == 1){
          return 1
        } else {
          return 0.4
        }
      })
      .style("stroke", function(d){
        if(d.Movies == "Bright Star"){
          return "black";
        }
        if(d.Movies == "Mulholland Drive"){
          return "black";
        }
      })
      .on("mouseover", function(d){
              div.transition()
              .duration(200)
              .style("opacity", 1)
              var element = d3.select(this);
              element.style("stroke", "black")
            div.html(function(){
              if(d.Movies == "Borat: Cultural Learnings of America for Make Benefit Glorious Nation of Kazakhstan"){
                return "Borat";
              } else {
                return d.Movies;
              }})
            .style("left", (d3.event.pageX - 20) + "px")    
            .style("top", (d3.event.pageY - 35) + "px")
          })
          .on("mousemove", function(d){
            div.style("left", (d3.event.pageX - 20) + "px")    
            .style("top", (d3.event.pageY - 35) + "px")
          })
          .on("mouseout", function(d){
            div.transition()
            .duration(500)
            .style("opacity", "0")
            var element = d3.select(this);
                element.style("stroke", function(){
                    if(d.Movies == "Mulholland Drive"){
                    return "black"
                }
                if(d.Movies == "Bright Star"){
                    return "black"}
                });


              });


         svg.append("line")
          .attr("x1", 15)
          .attr("y1", 35)
          .attr("x2", 15)
          .attr("y2", 9)
          .attr("stroke-width", 2)
          .attr("transform", "translate(550,-23)")
          .attr("stroke", "black");

        svg.append("line")
          .attr("x1", 5)
          .attr("y1", 20)
          .attr("x2", 20)
          .attr("y2", 20)
          .attr("stroke-width", 2)
          .attr("transform", "translate(560,-21)")
          .attr("stroke", "black");

          svg.append("line")
          .attr("x1", 15)
          .attr("y1", 30)
          .attr("x2", 15)
          .attr("y2", 9)
          .attr("stroke-width", 2)
          .attr("transform", "translate(565,-11)")
          .attr("stroke", "black");

          svg.append("text")
          .attr("x", 575)
          .attr("y", 30)
          .text("Movies loved by one critic,")
          .style("fill", "black")
          .style("font-size", "12px")

          svg.append("text")
            .attr("x", 575)
            .attr("y", 45)
            .text("but no one else.")
            .style("fill", "black")
            .style("font-size", "12px")

          svg.append("text")
            .attr("x", 0)
            .attr("y", -40)
            .text("Which movies got the most votes? Which ones had the highest rating?")
            .style("font-size", "21px")
            .style("font-weight", "bold")

          // svg.append("text")
          //   .attr("x", 0)
          //   .attr("y", -40)
          //   .html("The average movie rating and the count of movies voted for <br> by critics on the BBC's best movies of the century")
          //   .style("font-size", "15px")

            svg.append("text")
              .attr("x", -35 - (height/2))
              .attr("y", -35)
              .attr("transform", "translate(0,0) rotate(-90)")
              .text("Average Movie Rating")
              .style("font-size", "15px");


              svg.append("circle")
                .classed("point", true)
                .attr("r", 20)
                .attr("cx", 620)
                .attr("cy", 420)
                .style("stroke", "grey")
                .style("fill-opacity", 0)
                .style("stroke-width", 1.5)
                .style("stroke-dasharray", ("3,3"))

                svg.append("circle")
                .classed("point", true)
                .attr("r", 40)
                .attr("cx", 620)
                .attr("cy", 400)
                .style("stroke", "grey")
                .style("fill-opacity", 0)
                .style("stroke-width", 1.5)
                .style("stroke-dasharray", ("3,3"))

                svg.append("line")
                  .attr("x1", 5)
                  .attr("y1", 20)
                  .attr("x2", 70)
                  .attr("y2", 20)
                  .attr("stroke-width", 2)
                  .attr("transform", "translate(610, 380)")
                  .attr("stroke", "grey")
                  .style("stroke-dasharray", ("3,3"));

                svg.append("line")
                  .attr("x1", 5)
                  .attr("y1", 20)
                  .attr("x2", 70)
                  .attr("y2", 20)
                  .attr("stroke-width", 2)
                  .attr("transform", "translate(610, 340)")
                  .attr("stroke", "grey")
                  .style("stroke-dasharray", ("3,3"));


                   svg.append("text")
                    .attr("x", 570)
                    .attr("y", 300)
                    .text("The size of the circle represents")
                    .style("fill", "black")
                    .style("font-size", "12px")

                  svg.append("text")
                    .attr("x", 570)
                    .attr("y", 315)
                    .text("the amount of times the movie")
                    .style("fill", "black")
                    .style("font-size", "12px")

                  svg.append("text")
                    .attr("x", 570)
                    .attr("y", 329)
                    .text("was voted for by critics.")
                    .style("fill", "black")
                    .style("font-size", "12px")

                  svg.append("text")
                    .attr("x", 570)
                    .attr("y", 343)
                    .text("(the count)")
                    .style("fill", "black")
                    .style("font-size", "12px")

                  svg.append("text")
                    .attr("x", 685)
                    .attr("y", 365)
                    .text("40")
                    .style("fill", "black")
                    .style("font-size", "13px")

                  svg.append("text")
                    .attr("x", 685)
                    .attr("y", 405)
                    .text("20")
                    .style("fill", "black")
                    .style("font-size", "13px")

                  svg.append("text")
                    .attr("x", 76)
                    .attr("y", 32)
                    .text("One critic voted for this movie")
                    .style("fill", "black")
                    .style("font-size", "13px")

                 svg.append("line")
                    .attr("x1", 15)
                    .attr("y1", 23)
                    .attr("x2", 15)
                    .attr("y2", 9)
                    .attr("stroke-width", 0.5)
                    .attr("transform", "translate(67,-5)")
                    .attr("stroke", "black");

                  svg.append("line")
                    .attr("x1", 15)
                    .attr("y1", 23)
                    .attr("x2", 15)
                    .attr("y2", 9)
                    .attr("stroke-width", 0.5)
                    .attr("transform", "translate(275,38)")
                    .attr("stroke", "black");

                    svg.append("text")
                    .attr("x", 285)
                    .attr("y", 43)
                    .text("47 critics voted for this movie")
                    .style("fill", "black")
                    .style("font-size", "13px")

                 
      

  });

  })()


