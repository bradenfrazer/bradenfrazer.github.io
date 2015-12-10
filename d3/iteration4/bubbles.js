var margin = 20,
    diameter = 960;

var color = d3.scale.linear()
    .domain([-1, 5])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl);

var pack = d3.layout.pack()
    .padding(2)
    .size([diameter - margin, diameter - margin])
    .value(function(d) { return d.favorite_count; })
    .sort(null);

var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
  .append("g")
    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

function getUserImageURL(twitterUsername)
{
    var url = "https://twitter.com/" + twitterUsername + "/profile_image?size=original";
    console.log(url);
    return url;
}

function reloadTimeline(d) {
    var handle = d;
    console.log(handle);
    return url;
}

d3.json("test2.json", function(error, root) {
  if (error) throw error;

  var focus = root,
      nodes = pack.nodes(root).sort(null),
      view;
    
  var tooltip = d3.select("body").append("div")   
        .attr("class", "tooltip")               
        .style("opacity", 0);

 
 // Enter any new nodes
  var defs = svg.selectAll("defs")
        .data(nodes)
        .enter().append('defs')
        .append('pattern')
            .attr('id', function(d) { return (d.name+"-image");}) // just create a unique id (id comes from the json)
            .attr('width', 1)
            .attr('height', 1)
            .attr('patternContentUnits', 'objectBoundingBox')
            .append("svg:image")
                .attr("xlink:xlink:href", function(d) { return "https://pbs.twimg.com/profile_images/655032843081547776/VyZJbvWW.jpg";})//getUserImageURL(d.name);}) // "icon" is my image url. It comes from json too. The double xlink:xlink is a necessary hack (first "xlink:" is lost...).
                .attr("x", 0)
                .attr("y", 0)
                .attr("height", 1)
                .attr("width", 1)
				.attr("preserveAspectRatio", "xMinYMin slice");
 
    
  var circle = svg.selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
      .style("fill", function(d) {
      		if(d.name != "Area")
      	 		return ("url(#"+d.name+"-image)");
      	 	else
      	 		return "white";
      	 })
      
      
      //.style("fill", function(d) { return ("url(#"+d.name+"-icon)");})
      .on("click", function(d) { 
          if (focus !== d) zoom(d), d3.event.stopPropagation(); 
          getUserImageURL(d.name);
      })
        /* might try tooltips later */
      /*
     .on("mouseover", function(d) {
            tooltip.transition().duration(200).style("opacity", .75);      
            tooltip.html("@" + d.name)  
            .style("left", (d.x-200) + "px")     
            .style("top", (d.y-50) + "px");    
            //.style("left", (d3.event.pageX - 200) + "px")     
            //.style("top", (d3.event.pageY - 50) + "px");   
        
     }) 
        */            
     .on("mouseout", function(d) {       
            tooltip.transition().duration(500).style("opacity", 0);   
     });
    /*.on("mouseover", function(d) {
            this.text.attr('transform', 'translate(' + d.x + ',' + (d.y - 5 - (d.children ? 3.5 : Math.sqrt(d.size) / 2)) + ')')
            .text(d.name + ": ")
            .style('display', null);
         })                  
     .on("mouseout", function(d) {       
            this.text.style('display', 'none'); 
     });*/
  
  /*
   var defs = svg.selectAll("defs")
        .data(nodes)
        .enter().append('defs')
        .append('pattern')
            .attr('id', function(d) { return (d.name+"-icon");}) // just create a unique id (id comes from the json)
            .attr('width', 1)
            .attr('height', 1)
            .attr('patternContentUnits', 'objectBoundingBox')
            .append("svg:image")
            	.attr("xlink:xlink:href", function(d) { return getUserImageURL(d.name);})
                .attr("x", 0)
                .attr("y", 0)
                .attr("height", 1)
                .attr("width", 1)
				.attr("preserveAspectRatio", "xMinYMin slice");   
  */
 
  var text = svg.selectAll("text")
      .data(nodes)
      .enter().append("text")
      .attr("class", "label")
      .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
      .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
      .text(function(d) { 
      		if(d.depth == 1 )
      			return d.name;
      	});
    
/*var foreignObject = svg.selectAll("foreignObject")
    .data(nodes)
    .enter().append("foreignObject")
    .attr("width", 480)
    .attr("height", 500)
    .append("xhtml:body")
    .style("font", "14px 'Helvetica Neue'")
    .html("<h1>An HTML Foreign Object in SVG</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu enim quam. Quisque nisi risus, sagittis quis tempor nec, aliquam eget neque. Nulla bibendum semper lorem non ullamcorper. Nulla non ligula lorem. Praesent porttitor, tellus nec suscipit aliquam, enim elit posuere lorem, at laoreet enim ligula sed tortor. Ut sodales, urna a aliquam semper, nibh diam gravida sapien, sit amet fermentum purus lacus eget massa. Donec ac arcu vel magna consequat pretium et vel ligula. Donec sit amet erat elit. Vivamus eu metus eget est hendrerit rutrum. Curabitur vitae orci et leo interdum egestas ut sit amet dui. In varius enim ut sem posuere in tristique metus ultrices.<p>Integer mollis massa at orci porta vestibulum. Pellentesque dignissim turpis ut tortor ultricies condimentum et quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod lorem vulputate dui pharetra luctus. Sed vulputate, nunc quis porttitor scelerisque, dui est varius ipsum, eu blandit mauris nibh pellentesque tortor. Vivamus ultricies ante eget ipsum pulvinar ac tempor turpis mollis. Morbi tortor orci, euismod vel sagittis ac, lobortis nec est. Quisque euismod venenatis felis at dapibus. Vestibulum dignissim nulla ut nisi tristique porttitor. Proin et nunc id arcu cursus dapibus non quis libero. Nunc ligula mi, bibendum non mattis nec, luctus id neque. Suspendisse ut eros lacus. Praesent eget lacus eget risus congue vestibulum. Morbi tincidunt pulvinar lacus sed faucibus. Phasellus sed vestibulum sapien.");*/

  var node = svg.selectAll("defs,circle,text,foreignObject");

  d3.select("body")
      //.style("background", color(-1))
      .style("background", color(-5))
      .on("click", function() { zoom(root); });

  zoomTo([root.x, root.y, root.r * 2.5 + margin]);

  function zoom(d) {
    var focus0 = focus; focus = d;

    var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", function(d) {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2.5 + margin]);
          return function(t) { zoomTo(i(t)); };
        });

    transition.selectAll("text")
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
        .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
        .each("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .each("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }

  function zoomTo(v) {
    var k = diameter / v[2]; view = v;
    node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
    circle.attr("r", function(d) { return d.r * k; });
  }

});

d3.select(self.frameElement).style("height", diameter + "px");

/** Start of NIC CODE **/

var tweeters = [];

/*
 * Setup function, called at the end of the HTML page
 */
function setup()
{
	// load init twitter data into array of tweeters
	tweeters = getArrayOfTweetersFromData(TWITTER_USER_DATA);
}


/*
 * Reads the data from the JSON file and converts it to a javascript object array
 */
function getArrayOfTweetersFromData(data)
{
	var userArray = [];
	
	for(var i = 0; i < data.children.length; i++)
	{
		userArray.push(data.children[i]);
	}
	
	return userArray;
}


function betterFormatTweets()
{
    var tweetsArray = [];
    for (var i = 0; i < TWEETS_3.length; i=i+5) {
        var tweet = {
            screen_name: TWEETS_3[i],
            location: TWEETS_3[i+1],
            description: TWEETS_3[i+2],
            favorite_count: TWEETS_3[1+3],
            text: TWEETS_3[i+4],
            profile_image_url: getUserImageURL(TWEETS_3[i]);
            }
    tweetsArray.push(tweet);
    }
    
    return tweetsArray;
};