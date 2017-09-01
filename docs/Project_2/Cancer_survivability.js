(function () {


var w = 123
var h = 270

var margin = {
  right: 10,
  left: 30,
  top: 50,
  bottom: 10
}

var width = w - margin.right - margin.left;
var height = h - margin.top - margin.bottom;

// var svg = d3.select("body")
//   .append("svg")
//   .attr("id", "chart")
//   .attr("width", w)
//   .attr("height", h)
//   .append("g")
//   .attr("transform", "translate(0" + margin.left + "," + margin.top + ")");

  var ytickValues = [0, 25, 50, 75, 100];

  var xScale = d3.scaleLinear()
    .range([0, width])

  var yScale = d3.scaleLinear()
  .range([height, 0])

  var xAxis = d3.axisBottom()
    .scale(xScale)
    .tickSizeOuter(0)

  var yAxis = d3.axisLeft()
    .scale(yScale)
    .tickValues(ytickValues)
    .tickSize(-width, 0, 0)
    .tickSizeOuter(0)


  d3.csv("cancer_survival_rates.csv", function(error, data){
    data.forEach(function(d){
      d.X_1 = +d.X_1;
      d.X_2 = +d.X_2;
      d.Survival_rate_1950_1954 = +d.Survival_rate_1950_1954;
      d.Survival_rate_2007_2013 = +d.Survival_rate_2007_2013;
      d.Primary_Site = d.Primary_Site;
    });

    xScale.domain([0, 2]);
    yScale.domain([0, 100]);



    

    var svgs = d3.select("#cancer_survival_rates")
      .selectAll("svg")
      .data(data)
      .enter()
      .append("svg")
      .attr("id", "chart")
      .attr("width", w)
      .attr("height", h)
      .append("g")
      .attr("transform",  "translate(" + margin.left + "," + margin.top + ")")

    svgs.append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(0" + height + ")")
      .call(xAxis)

    svgs.append("g")
      .attr("class", "yaxis")
      .attr("transform", "translate(0,0)")
      .call(yAxis)
      .selectAll("text")
        .style("fill", "none")


  // lines

svgs.append("line")
  .attr("class", "lines")
  .attr("x1", function(d){
    return xScale(d.X_1)
  })
  .attr("x2", function(d){
    return xScale(d.X_2)
  })
  .attr("y1", function(d){
    return yScale(d.Survival_rate_1950_1954)
  })
  .attr("y2", function(d){
    return yScale(d.Survival_rate_2007_2013)
  })
  .style("stroke", "steelblue")
  .style("stroke-width", 1.5)

// 1950-1954

      svgs.append("circle")
        .attr("class", "first")
        .attr("r", 2.5)
        .attr("cx", function(d){
          return xScale(d.X_1);
        })
        .attr("cy", function(d){
          return yScale(d.Survival_rate_1950_1954)
        })
        .style("fill", "steelblue")

//  2007-2013
        svgs.append("circle")
        .attr("class", "first")
        .attr("r", 2.5)
        .attr("cx", function(d){
          return xScale(d.X_2);
        })
        .attr("cy", function(d){
          return yScale(d.Survival_rate_2007_2013)
        })
        .style("fill", "steelblue")


// adding text

      //https://stackoverflow.com/questions/19447321/how-to-linebreak-an-svg-text-in-javascript

      svgs.append("text")
        .each(function(d){
          var arr = d.Primary_Site.split(/[\s]/)
          for (i = 0; i < arr.length; i++){
            d3.select(this) 
            .append("tspan") // applying a tspan which is how you can create line breaks with svgs
            .text(arr[i])
            .attr("dy", 10)
            .attr("x", -5)
            .attr("class", "tspan" + i);
          }
        })
        .attr("y", height -  250)
        .style("font-size", "12px")

        svgs.append("text")
          .attr("x", -20)
          .attr("y", 35)
          .text(function(d){
            if(d.Primary_Site == "Hodgkin (lymphoma)"){
              return "Biggest increase"
            }
          })
          .style("font-size", "12px")


        svgs.append("text")
          .attr("x", -20)
          .attr("y", 50)
          .text(function(d){
            if(d.Primary_Site == "Hodgkin (lymphoma)"){
              return "in survival"
            }
          })
          .style("font-size", "12px")



          svgs.append("text")
          .attr("x", -5)
          .attr("y", 155)
          .text(function(d){
            if(d.Primary_Site == "Pancreas"){
              return "Smallest increase"
            }
          })
          .style("font-size", "12px")


        svgs.append("text")
          .attr("x", -5)
          .attr("y", 170)
          .text(function(d){
            if(d.Primary_Site == "Pancreas"){
              return "in survival"
            }
          })
          .style("font-size", "12px")


        svgs.append("text")
          .attr("x", -30)
          .attr("y", 5)
          .text(function(d){
            if(d.Primary_Site == "Hodgkin (lymphoma)"){
              return "100%"
            }
          })
          .style("font-size", "11px")

        svgs.append("text")
          .attr("x", -20)
          .attr("y", 215)
          .text(function(d){
            if(d.Primary_Site == "Hodgkin (lymphoma)"){
              return "0%"
            }
          })
          .style("font-size", "11px")

        svgs.append("text")
          .attr("x", 40)
          .attr("y", 10)
          .text(function(d){
            if(d.Primary_Site == "Hodgkin (lymphoma)"){
              return "2007-2013"
            }
          })
          .style("font-size", "11px")
          .style("font-weight", "bold")

        svgs.append("text")
          .attr("x", 0)
          .attr("y", 165)
          .text(function(d){
            if(d.Primary_Site == "Hodgkin (lymphoma)"){
              return "1950-1954"
            }
          })
          .style("font-size", "11px")
          .style("font-weight", "bold")

        svgs.append("text")
          .attr("x", 70)
          .attr("y", -10)
          .text(function(d){
            if(d.Primary_Site == "Prostate"){
              return "99%"
            }
          })
          .style("font-size", "11px")

        svgs.append("text")
          .attr("x", 20)
          .attr("y", 135)
          .text(function(d){
            if(d.Primary_Site == "Prostate"){
              return "43% survival"
            }
          })
          .style("font-size", "11px")


      svgs.append("line")
        .attr("x1", 5)
        .attr("y1", 5)
        .attr("x2", 15)
        .attr("y2", 18)
        .attr("stroke-width", 1)
        .attr("transform", "translate(40,175)")
        .attr("stroke", function(d){
            if(d.Primary_Site == "Pancreas"){
              return "black"
            }
          })
        .style("opacity", 0.7);

        svgs.append("line")
        .attr("x1", 5)
        .attr("y1", 1)
        .attr("x2", 23)
        .attr("y2", 28)
        .attr("stroke-width", 1)
        .attr("transform", "translate(28,60)")
        .attr("stroke", function(d){
            if(d.Primary_Site == "Hodgkin (lymphoma)"){
              return "black"
            }
          })
        .style("opacity", 0.7);

  });


 })()




