var svg = document.getElementById("svg");
var NS = "http://www.w3.org/2000/svg";
var height = $(window).height();
var width = $(window).width();

var rid = 0;

var circle_animate_button = document.getElementById("circle_animate");
var dvd_animate_button = document.getElementById("dvd_animate");
var stop_animate_button = document.getElementById("stop_animate");

var clear = function(e){
    while (svg.lastChild) {
	svg.removeChild(svg.lastChild);
    }
};

var stop_animate = function(e) {
    window.cancelAnimationFrame(rid);
};

var random_number = function(n){
    return Math.floor(Math.random() * n);
};

var random_color = function(){
    var color =  'rgb(' + random_number(256) + ', ' + random_number(256) + ', ' + random_number(256) + ')';
    return color;
}

var circle_animate = function(e) {
    window.cancelAnimationFrame(rid);
    var radius = 0;
    var grow = true;
    var circle = document.createElementNS(NS, "circle");
    circle.setAttribute("cx", width / 2);
    circle.setAttribute("cy", height / 2);
    circle.setAttribute("r", radius);
    circle.setAttribute("fill","white");
    
    var draw_circle = function() {
	clear();
	if (radius % 5 == 0) {
	    var color = random_color();
	    circle.setAttribute("fill",color);
	}
	svg.appendChild(circle);
	circle.setAttribute("r", radius);
	if (radius >= 0 && radius <= 0.15 * width) {
            if (grow){
		radius += 1;
	    } else {
		radius -= 1;
	    }
	}
	if (radius >= 0.15 * width) {
	    radius -= 1;
	    grow = false;
	}
	if (radius == 0) {
	    grow = true;
	}
        rid = window.requestAnimationFrame(draw_circle);
    };
    draw_circle();
};

var dvd_animate = function(e){
    window.cancelAnimationFrame(rid);
    var rect_height = 100;
    var rect_width = 200;
    var rect_xcor = Math.floor(Math.random() * (width - rect_width));
    var rect_ycor = Math.floor(Math.random() * (height - rect_height));
    var dx = 2.5;
    var dy = 2.5;
    var color = random_color();
    var rect = document.createElementNS(NS, "rect");
    rect.setAttribute("width", rect_width);
    rect.setAttribute("height", rect_height);
    rect.setAttribute("style", "fill:" + color + ";");
    
    var shift = function() {
	clear();
	svg.appendChild(rect);
	rect.setAttribute("x", rect_xcor);
	rect.setAttribute("y", rect_ycor);
	if (rect_xcor < 0 || rect_xcor > (width - rect_width)) {
	    dx = -1 * dx;
	    rect.setAttribute("style","fill:"+random_color());
	}
	if (rect_ycor < 0 || rect_ycor > (height - rect_height)) {
	    dy = -1 * dy;
	    rect.setAttribute("style","fill:"+random_color());
	}
	rect_xcor += dx;
	rect_ycor += dy;
	rid = window.requestAnimationFrame(shift);
    };
    shift();
};

circle_animate_button.addEventListener("click", circle_animate);
dvd_animate_button.addEventListener("click", dvd_animate);
stop_animate_button.addEventListener("click", stop_animate);
