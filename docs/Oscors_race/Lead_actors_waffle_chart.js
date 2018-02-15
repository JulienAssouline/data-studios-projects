(function(){

  
var h = 454;
var w = 124;


    function getValKey(){
      return "grp" + "83" + "4" + "2" + "1";
    }

  var VAL_KEY = getValKey();
  var grp_vals = {};

  var bg_color = "#e0e0e0";


var margin = {
  right: 0,
  left: 6,
  top: 0,
  bottom: 0
}

var width = w - margin.right - margin.left;
var height = h - margin.top - margin.bottom;

           d3.csv("Oscor winning actors race.csv", function(error, data){
            data.forEach(function(d){
              d.White = +d.White;
              d.Black = +d.Black;
              d["Hispanic or Latino"] = +d["Hispanic or Latino"];
              d.Mixed = +d.Mixed;
              d.Total = +d.Total;
              d.Asian = +d.Asian;
                 })

            var valfields = d3.keys(field_details)

            data.forEach(function(o){
        grp_vals["grp" + o.White + o.Black + o.Mixed + o["Hispanic or Latino"]] = o;
    })

            console.log(grp_vals)
            console.log(field_details)


      var cells = [];
        d3.select("#grid").text().split("\n").forEach(function(line, i){
          var re = /\w+/g, m;
          while(m = re.exec(line)) cells.push({
            x: m.index / 3,
            y: i 
          })
        })

        // make square pie charts
        valfields.forEach(function(v, i){
          var grid_width = d3.max(cells, function(d){ return d.x }) + 1;
          var grid_height = d3.max(cells, function(d){ return d.y }) + 1;
          var cell_size = width / grid_width ; 
          var holder_width = width + margin.left + margin.right -20;

          var div = d3.select("#Male_Lead")
            .append("div")
            .attr("id", "charts")
            .attr("class", "chartholder")
            .style("width", holder_width + "px");

            div.append("h3").html(field_details[v].desc);

            var svg = div.append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

            var cell = svg.append("g")
              .attr("transform", "translate(" + width/2 + "," + height/2 + ")")
             .selectAll(".cell")
              .data(cells)
              .enter()
              .append("g")
              .attr("class", "cell")
              .attr("transform", function(d){
                return "translate(" + (d.x-grid_width/2.3) * cell_size + "," + (d.y - grid_height / 2) * cell_size + ")";
              })

              cell.append("rect")
                .attr("x", -cell_size / 2)
                .attr("y", -cell_size / 2)
                .attr("width", cell_size - 2)
                .attr("height", cell_size - 2)
                .style("fill", function(d, i){
                if(i > (grp_vals[VAL_KEY][v]) - 1){
                    return "none"
                  } else {
                    return field_details[v].color;
                  }
                })
 






        })



              
         

  



  })


})()