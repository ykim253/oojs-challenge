/*
    shapes.js
    This is where your code goes

    Write the code to create rectangle and circle classes that extend the
    Shape class defined in shape.js. Then create a couple of other subclasses that
    render different sorts of shapes using the HTML <canvas> functions.
    http://www.w3schools.com/tags/ref_canvas.asp

    You can use either the classical or the prototypal style to create your subclasses

    After you've written the code for the sublcasses, call either registerPrototypalShape()
    or registerClassicalShape() to register your new shapes with the application. See the
    app.js file for info on these functions.
 */
function Rectangle (left, top, width, height, stylesMap) {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.stylesMap = stylesMap;

    this.renderShape = function(canvasCtx) {
        canvasCtx.fillRect(this.left, this.top, this.width, this.height, this.stylesMap);
    };
}

Rectangle.prototype = new Shape();

registerClassicalShape('Rectangle', Rectangle);

function Circle (left, top, width, height, stylesMap) {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.stylesMap = stylesMap;

    var radius = (width + height) /2;

    this.renderShape = function(canvasCtx) {
        canvasCtx.beginPath();
        canvasCtx.arc(this.left, this.top, radius, 0, 2*Math.PI, this.stylesMap);
        canvasCtx.fill();
    };
}

Circle.prototype = new Shape();

registerClassicalShape('Circle', Circle);

var lightSaber = new Image();
lightSaber.src = './img/starWars.jpg';
var falcon = new Image();
falcon.src = './img/falcon.jpg'
var alternate = true;

function starWars (left, top, width, height, stylesMap) {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.stylesMap = stylesMap;

    this.renderShape = function(canvasCtx) {
        if (alternate == true) {
            alternate = false;
            console.log(alternate);
            canvasCtx.drawImage(lightSaber, this.left, this.top);
        } else {
            alternate = true;
            console.log(alternate);
            canvasCtx.drawImage(falcon, this.left, this.top);
        }

    };
}

starWars.prototype = new Shape();

registerClassicalShape('starWars', starWars);



