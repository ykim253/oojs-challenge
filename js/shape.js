/*
    shape.js
    base "class" for all shapes
    contains both classical and prototypal styles

    use the Shape() constructor to create or subclass a Shape in the classical style
    use createShape() to create or subclass a new shape in the prototypal style
*/

function Shape(left, top, width, height, stylesMap) {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.stylesMap = stylesMap;
} //Shape()

Shape.prototype.render = function(canvasCtx) {
    //save the current context
    canvasCtx.save();

    //adjust it for all our styles
    this.adjustContext(canvasCtx);

    //render the shape itself
    this.renderShape(canvasCtx);

    //restore the context
    canvasCtx.restore();
}; //Shape.render()

Shape.prototype.adjustContext = function(canvasCtx) {
    //for every style, set the corresponding property on the canvas
    _.forEach(this.stylesMap, function(value, key) {
        if (canvasCtx.hasOwnProperty(key) && null != value) {
            canvasCtx[key] = value;
        }
    });
}; //Shape.adjustContext()

Shape.prototype.renderShape = function(canvasCtx) {
    throw new Error('you must override the renderShape() method!');
}; //Shape.renderShape()

var ShapeProto = {
    //just reuse the functions from Shape.prototype
    render: Shape.prototype.render,
    adjustContext: Shape.prototype.adjustContext,
    renderShape: Shape.prototype.renderShape
}; //ShapeProto

function createShape(left, top, width, height, stylesMap) {
    var shape = Object.create(ShapeProto);
    shape.left = left;
    shape.top = top;
    shape.width = width;
    shape.height = height;
    shape.stylesMap = stylesMap;
    return shape;
} //createShape()
