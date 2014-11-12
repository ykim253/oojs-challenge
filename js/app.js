/*
    app.js
    code for the main application
    you don't need to touch anything in here
 */

var _shapeTypes = {};

/*
    registerPrototypalShape()
    registers a new shape subclass built in the prototypal style
    parameters:
        typeName [string] name of your new type (for the UI)
        factoryFn [function] reference to the factory function that will create
            new instances of your new shape suclass
*/
function registerPrototypalShape(typeName, factoryFn) {
    _shapeTypes[typeName] = factoryFn;
}

/*
    registerClassicalShape
    registers a new shape subclass built in the classical style
    parameters:
        typeName [string] name of your new type (for the UI)
        constructorFn [function] reference to the constructor function for new
            instances of your new shape subclass
*/
function registerClassicalShape(typeName, constructorFn) {
    _shapeTypes[typeName] = function(left, top, width, height, stylesMap) {
        return new constructorFn(left, top, width, height, stylesMap);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var shapes = [];
    var canvas = document.getElementById('shapes-canvas');
    var ctx = canvas.getContext('2d');
    var shapeTypeSel = document.getElementById('shape-type');
    var factoryFn;

    shapeTypeSel.innerHTML = '';
    _.forEach(_shapeTypes, function(value, key) {
        var opt = document.createElement('option');
        opt.value = key;
        opt.innerHTML = key;
        shapeTypeSel.appendChild(opt);
    });

    factoryFn = _shapeTypes[shapeTypeSel.value];
    
    shapeTypeSel.addEventListener('change', function() {
        factoryFn = _shapeTypes[this.value];
    });

    canvas.addEventListener('mousedown', function(evt) {
        if (!factoryFn) {
            return;
        }

        var shape = factoryFn(evt.clientX - canvas.offsetLeft, evt.clientY - canvas.offsetTop, 10, 10, {
            fillStyle: '#' + Math.floor(Math.random()*16777215).toString(16),
            strokeStyle: '#000000'
        });

        shape.xVelocity = Math.max(Math.floor(Math.random() * 4), 1);
        shape.yVelocity = Math.max(Math.floor(Math.random() * 4), 1);
        shapes.push(shape);
    });

    window.setInterval(function() {
        //clear the entire canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        _.forEach(shapes, function(shape) {
            //move to next position
            shape.left += shape.xVelocity;
            shape.top += shape.yVelocity;

            if (shape.left < 0) {
                shape.xVelocity = -shape.xVelocity;
                shape.left = 0;
            }

            if (shape.left + shape.width > canvas.width) {
                shape.xVelocity = -shape.xVelocity;
                shape.left = canvas.width - shape.width;
            }

            if (shape.top < 0) {
                shape.yVelocity = -shape.yVelocity;
                shape.top = 0;
            }

            if (shape.top + shape.height > canvas.height) {
                shape.yVelocity = -shape.yVelocity;
                shape.top = canvas.height - shape.height;
            }

            shape.render(ctx);
        });
    }, 20);
});
