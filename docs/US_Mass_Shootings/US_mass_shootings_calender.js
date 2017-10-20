(function () {

    var width = 960,
        height = 750,
        cellSize = 25; // cell size

    var no_months_in_a_row = Math.floor(width / (cellSize * 7 + 50));
    var shift_up = cellSize * 1;

    var day = d3.timeFormat("%w"), // day of the week
        day_of_month = d3.timeFormat("%e") // day of the month
        day_of_year = d3.timeFormat("%j")
        week = d3.timeFormat("%U"), // week number of the year
        month = d3.timeFormat("%m"), // month number
        year = d3.timeFormat("%Y"),
        percent = d3.format(".1%"),
        format = d3.timeFormat("%Y-%m-%d");

    var color = d3.scaleQuantize()
        .domain([0, 10])
        .range(d3.range(11).map(function(d) { return "q" + d + "-11"; }));

    var svg = d3.select("#chart1").selectAll("svg")
        .data(d3.range(2017, 2018)) //years included in the viz
      .enter().append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "RdYlGn")
      .append("g")

    var rect = svg.selectAll(".day")
        .data(function(d) { 
          return d3.timeDays(new Date(d, 0, 1), new Date(d, 10, 1));
        })
      .enter().append("rect")
        .attr("class", "day")
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("x", function(d) {
          var month_padding = 1.2 * cellSize*7 * ((month(d)-1) % (no_months_in_a_row));
          return day(d) * cellSize + month_padding; 
        })
        .attr("y", function(d) { 
          var week_diff = week(d) - week(new Date(year(d), month(d)-1, 1) );
          var row_level = Math.ceil(month(d) / (no_months_in_a_row));
          return (week_diff*cellSize) + row_level*cellSize*8 - cellSize/2 - shift_up;
        })
        .datum(format);

    var month_titles = svg.selectAll(".month-title")  // Jan, Feb, Mar and the whatnot
          .data(function(d) { 
            return d3.timeMonths(new Date(d, 0, 1), new Date(d, 10, 1)); })
        .enter().append("text")
          .text(monthTitle)
          .attr("x", function(d, i) {
            var month_padding = 1.2 * cellSize*7* ((month(d)-1) % (no_months_in_a_row));
            return month_padding;
          })
          .attr("y", function(d, i) {
            var week_diff = week(d) - week(new Date(year(d), month(d)-1, 1) );
            var row_level = Math.ceil(month(d) / (no_months_in_a_row));
            return (week_diff*cellSize) + row_level*cellSize*8 - cellSize - shift_up;
          })
          .attr("class", "month-title")
          .attr("d", monthTitle);

    var year_titles = svg.selectAll(".year-title")  // Jan, Feb, Mar and the whatnot
          .data(function(d) { 
            return d3.timeYears(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
        .enter().append("text")
          .text(yearTitle)
          .attr("x", function(d, i) { return width/2 - 100; })
          .attr("y", function(d, i) { return cellSize*4.5 - shift_up; })
          .attr("class", "year-title")
          .attr("d", yearTitle);

    d3.csv("US_mass_shootings_2017_by_date.csv", function(error, csv) {
      var data = d3.nest()
        .key(function(d) { return d.Date; })
        .rollup(function(d) { return (d[0].Killed); })
        .map(csv);

        console.log(data)
      
      rect.filter(function(d) {
    return (data.has(d)); 
  })
      .attr("class", function(d) {
        return "day " + color(data.get(d)); 
      })
    // .select("title")
    //   .text(function(d) { return d + ": " + percent(data.get(d)); });


    });

    var text = svg.append("text") 
      .attr("x", 230)
      .attr("y", 710)
      .text("Oct. 1, 2017")
      .style("font-weight", "bold")
      .style("font-size", 14)

        var text = svg.append("text") 
      .attr("x", 230)
      .attr("y", 730)
      .text("The Las Vegas mass shooting, 59 dead, 241 injured.")
      .style("font-weight", "normal")
      .style("font-size", 14)

       svg.append("line")
            .attr("x1", 2)
            .attr("y1", 5)
            .attr("x2", 2)
            .attr("y2", 130)
            .attr("stroke-width", 1.5)
            .attr("transform", "translate(220,575)")
            .attr("class", "line")

    svg.append("text") 
      .attr("x", 520)
      .attr("y", 525)
      .text("July 10 - July 14")
      .style("font-weight", "normal")
      .style("font-size", 14)
      .style("font-weight", "bold")


    svg.append("text") 
      .attr("x", 520)
      .attr("y", 545)
      .text("Five days is the longest stretch")
      .style("font-weight", "normal")
      .style("font-size", 14)

     svg.append("text") 
      .attr("x", 520)
      .attr("y", 565)
      .text("without a mass shooting in 2017.")
      .style("font-weight", "normal")
      .style("font-size", 14)



      svg.append("line")
            .attr("x1", 2)
            .attr("y1", 5)
            .attr("x2", 2)
            .attr("y2", 95)
            .attr("stroke-width", 1.5)
            .attr("transform", "translate(505,425)")
            .attr("class", "line1")

        svg.append("rect")
          .attr("class", "bar1")
          .attr("x", 210)
          .attr("y", 10)
          .attr("width", 20)
          .attr("height", 20)
          .attr("fill", "darkred")
          .attr("stroke", "#ccc")

        svg.append("text") 
      .attr("x", 237)
      .attr("y", 25)
      .text("Day with mass shooting")
      .style("font-weight", "normal")
      .style("font-size", 14)



           svg.append("rect")
          .attr("class", "bar1")
          .attr("x", 420)
          .attr("y", 10)
          .attr("width", 20)
          .attr("height", 20)
          .attr("fill", "#eeedeb")
          .attr("stroke", "#ccc")

          svg.append("text") 
      .attr("x", 447)
      .attr("y", 25)
      .text("Day without mass shooting")
      .style("font-weight", "normal")
      .style("font-size", 14)




    // function dayTitle (t0) {
    //   return t0.toString().split(" ")[2];
    // }
    function monthTitle (t0) {
      return t0.toLocaleString("en-us", { month: "long" });
    }
    function yearTitle (t0) {
      return t0.toString().split(" ")[3];
    }
 })()