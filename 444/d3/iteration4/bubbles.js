function getUserImageURL(twitterUsername)
{
    var url = "https://twitter.com/" + twitterUsername + "/profile_image?size=bigger";
    //console.log(url);
    return url;
}

function reloadTimeline(d) {
    var handle = d;
    console.log(handle);
    return url;
}

/*
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
*/



function bubbleTweetsBubbleBubbleBubbleTweets(data)
{
	d3.select("svg").remove();
	
	var margin = 20,
    diameter = document.body.clientWidth > document.body.clientHeight ? document.body.clientHeight : document.body.clientWidth;

var color = d3.scale.linear()
    .domain([-1, 5])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl);

var pack = d3.layout.pack()
    .padding(2)
    .size([diameter - margin, diameter - margin])
    // TODO come up with an equation to normalize the favorite counts into a reasonable range
    .value(function(d) { return 500 + (d.favorite_count/10); })
    .sort(null);

var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
  .append("g")
    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
	
	var tooltip = d3.select("body").append("div")   
        .attr("class", "tooltip")               
        .style("opacity", 0);
	
	
	var root = { screen_name:"root_bubble", children: data};
 
  var focus = root,
      nodes = pack.nodes(root).sort(null),
      view;
 
  var defs = svg.selectAll("defs")
        .data(nodes)
        .enter().append('defs')
        .append('pattern')
            .attr('id', function(d) { return (d.screen_name+"-image");}) // just create a unique id (id comes from the json)
            .attr('width', 1)
            .attr('height', 1)
            .attr('patternContentUnits', 'objectBoundingBox')
            .append("svg:image")
                .attr("xlink:xlink:href", function(d) { return d.profile_image_url;}) // "icon" is my image url. It comes from json too. The double xlink:xlink is a necessary hack (first "xlink:" is lost...).
                .attr("x", 0)
                .attr("y", 0)
                .attr("height", 1)
                .attr("width", 1)
				.attr("preserveAspectRatio", "xMinYMin slice");
 
    
  var circle = svg.selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("class", function(d) { return d.parent ? d.text ? "node" : "node node--leaf" : "node node--root"; })
      .style("fill", function(d) {
      		if(d.screen_name != "root_bubble")
      	 		return ("url(#"+d.screen_name+"-image)");
      	 	else
      	 		return "white";
      	 })
      
  
      .on("click", function(d) { 
          if (focus != d)
          {
          	zoom(d);
          	 showTweeterInfo(d);
          	 d3.event.stopPropagation(); 
          }
          else
          {
          	
          }
      })
           
     .on("mouseout", function(d) {       
            tooltip.transition().duration(500).style("opacity", 0);   
     });
     
   	// TODO re-add on hover showing on screen name in middle of bubble
   	// dont show if the user is zoomed into 1 bubble view

 
  var text = svg.selectAll("text")
      .data(nodes)
      .enter().append("text")
      .attr("class", "label")
      .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
      .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
      .text(function(d) { 
      		if(d.depth == 0 )
      			return d.name;
      	});

  var node = svg.selectAll("defs,circle,text");

  d3.select("body")
      //.style("background", color(-1))
      .style("background", color(-5))
      .on("click", function() { zoom(root); hideTweeterInfo()});

  zoomTo([root.x, root.y, root.r * 2 + margin]);

  function zoom(d) {
    var focus0 = focus; focus = d;

    var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", function(d) {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
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
  
  d3.select(self.frameElement).style("height", diameter + "px");
  
  
}




/** Start of NIC CODE **/

var tweeters = [];

/*
 * Setup function, called at the end of the HTML page
 */
function setup()
{
	// load init twitter data into array of tweeters
	tweeters = betterFormatTweets(TWEETS_3);
	
	// put all tweets in the bubbles
	bubbleTweetsBubbleBubbleBubbleTweets(tweeters);
	
	
}

// TODO correctly filter temp tweet array based on user selections	
function filterTweeters()
{
	//document.getElementbyId("check1");


	// TODO correctly filter temp tweet array based on user selections	
	var tempArray = [];
    var tempArray2 = [];
    var tempArray3 = [];
    var tempArray4 = [];

	for (var i = 0; i < 200; i++)
	{
	    tempArray.push(tweeters[i]);
	}
    
    for (var i = 0; i < tempArray.length; i++){
            if(tweeters[i].text.indexOf('RiseUpOctober')>0){
                tempArray2.push(tweeters[i]);
            }
        }
    for (var i = 0; i < tempArray.length; i++){
                if(tweeters[i].text.indexOf('BlackLivesMatter')>0){
                    tempArray3.push(tweeters[i]);
                }
            }
    
    
    
    var check1 = document.getElementById("check1");
    var check2 = document.getElementById("check2");
    
    
    
    //RiseUpOctober
    if(check1.checked){
        bubbleTweetsBubbleBubbleBubbleTweets(tempArray);
        if(check2.checked){
            bubbleTweetsBubbleBubbleBubbleTweets(tempArray);
        }
        else{
            bubbleTweetsBubbleBubbleBubbleTweets(tempArray2);
        }
    }
    else{
        bubbleTweetsBubbleBubbleBubbleTweets(tempArray3);
    }
    
    
    //BlackLivesMatter
    if(check2.checked){
        bubbleTweetsBubbleBubbleBubbleTweets(tempArray);
        if(check1.checked){
            bubbleTweetsBubbleBubbleBubbleTweets(tempArray);
        }
        else{
            bubbleTweetsBubbleBubbleBubbleTweets(tempArray3);
        }
    }
    else{
        bubbleTweetsBubbleBubbleBubbleTweets(tempArray2);
    }
    
}

function filterVerified(){
    var tempArray = [];
    var tempArray4 = [];

	for (var i = 0; i < 200; i++)
	{
	    tempArray.push(tweeters[i]);
	}
    for (var i = 0; i < tweeters.length; i++){
                if(tweeters[i].verified == "true"){
                    tempArray4.push(tweeters[i]);
                }
            }
    var ver = document.getElementById("verified");
    if(ver.checked){
        bubbleTweetsBubbleBubbleBubbleTweets(tempArray4);
    }
    else{
        bubbleTweetsBubbleBubbleBubbleTweets(tempArray);
    }
}

function filterMin(){
    var tempArray = [];
    var tempArray4 = [];
    var tempArray5 = [];
    var tempArray6 = [];
    for (var i = 0; i < 200; i++)
	{
	    tempArray.push(tweeters[i]);
	}
    for (var i = 0; i < tweeters.length; i++){
                if(tweeters[i].favorite_count < 100){
                    tempArray4.push(tweeters[i]);
                }
            }
    
    
    var minslide = document.getElementById("slider1");
    
    if(minslide.min){
        bubbleTweetsBubbleBubbleBubbleTweets(tempArray4);
    }
    else{
        bubbleTweetsBubbleBubbleBubbleTweets(tempArray);
    }
      
    
    
}

function filterMax(){
    
    var tempArray = [];
    var tempArray6 = [];
    for (var i = 0; i < 200; i++)
	{
	    tempArray.push(tweeters[i]);
	}
    
    
     for (var i = 0; i < tweeters.length; i++){
                if(tweeters[i].favorite_count > 700){
                    tempArray6.push(tweeters[i]);
                }
            }
    
    var maxslide = document.getElementById("slider2");
    
    if(maxslide.min){
        bubbleTweetsBubbleBubbleBubbleTweets(tempArray6);
    }
    else{
        bubbleTweetsBubbleBubbleBubbleTweets(tem)
    }
}



/*
 * Reads the data from the JSON file and converts it to a javascript object array
 */

function betterFormatTweets(data)
{
    var tweetsArray = [];
    for (var i = 0; i < data.length; i = i+6)
    {
    	var tweet = {
            screen_name: data[i].replace('screen_name: ',''),
            verified: data[i+1].replace('verified: ',''),
            location: data[i+2].replace('location: ',''),
            description: data[i+3].replace('description: ',''),
            favorite_count: data[i+4].replace('favorite_count: ',''),
            text: data[i+5].replace('text: ',''),
            //verified: data[i+5].replace('verified: ',''),
            profile_image_url: getUserImageURL(data[i].replace('screen_name: ','').replace('profile_image_url: ',''))
     	};
            
        // dont add duplicate tweeters
        var isDup = false;
     	for (var j = 0; j < tweetsArray.length; j++)
    	{
    		if(tweet.screen_name == tweetsArray[j].screen_name)
    		{
    			isDup = true;
    			break;
    		}
    	}            
                        
      	//console.log(tweet);
   		if(!isDup)
   			tweetsArray.push(tweet);
    }
    
    return tweetsArray;
};

function showTweeterInfo(d)
{
	hideTweeterInfo();
	console.log("showing tweeter info: " + d.screen_name);
	
    
    //document.getElementById('imageHolder1').innerHTML="<a href='#'><img src='photos/picture.jpg' border=0/></a>";
    
    var tweeterImage = document.getElementById("tweeter-image");
		tweeterImage.innerHTML = "<img src='" + d.profile_image_url + "' border=0/>";
	var tweeterName = document.getElementById("tweeter-name");
		tweeterName.innerHTML = d.screen_name;
    var tweeterVerifiedStatus = document.getElementById("tweeter-verified");
        if (d.verified == "true") {
		  tweeterVerifiedStatus.innerHTML = "<img src='/d3/iteration4/verified.png' border=0 height=30/>";
        }
        else tweeterVerifiedStatus.innerHTML = "";
    var tweeterDescription = document.getElementById("tweeter-description");
		tweeterDescription.innerHTML = d.description;
    var tweeterFavoriteCount = document.getElementById("tweeter-favorites");
		tweeterFavoriteCount.innerHTML = d.favorite_count;
    var tweeterLocation = document.getElementById("tweeter-location");
		tweeterLocation.innerHTML = d.location;
    var tweeterText = document.getElementById("tweeter-text");
		tweeterText.innerHTML = d.text;
    var tweeterURL = document.getElementById("tweeter-url");
		tweeterURL.href = "http://www.twitter.com/" + d.screen_name;
	
	
	var tweeterInfoBox = document.getElementById("tweeter-info-box");
		tweeterInfoBox.style.opacity = '0.82';		
	
}

function hideTweeterInfo()
{
	console.log("hiding tweeter info");
	
	var tweeterInfoBox = document.getElementById("tweeter-info-box");
		tweeterInfoBox.style.opacity = '0';	
}
