"use strict";

// makeEventSource()
// mixes in on() and raise() methods to any object, allowing it
// to raise events that other code can listen for
function makeEventSource(obj) {
    //a map of all listeners
    obj.listeners = {};

    //adds a new event listener
    obj.on = function(eventName, callbackFn, thisVal) {
        //get the list of listeners for this event name
        var listeners = this.listeners[eventName];
        
        //if no listeners yet, add an empty array
        if (!listeners) {
            listeners = [];
            this.listeners[eventName] = listeners;
        }
        
        //push a new event listener object with the callback function
        //and an optional value to use as 'this' when calling it
        obj.listeners[eventName].push({
            fn: callbackFn, 
            thisVal: thisVal
        });
    }; //on()

    //used to raise an event
    obj.raise = function(eventName, eventData) {
        //get the list of listeners
        var listeners = this.listeners[eventName];
        
        //if there are some...
        if (listeners) {
            //iterate over all listeners, calling their callback function
            //and passing on any eventData that was passed to us
            var idx = 0;
            var listener;
            for (idx = 0; idx < listeners.length; ++idx) {
                listener = listeners[idx];
                listener.fn.call(listener.thisVal, eventData);
            } //for each listener
        } //if there are listeners
    }; //raise()

    //return the object so that one can chain other calls
    return obj;
} //makeEventSource()

var Person = {
    getFullName: function() {
        return this.firstName + ' ' + this.lastName;
    },

    setFirstName: function(firstName) {
        //set the first name and then raise our 'change' event
        //passing this as the event data
        this.firstName = firstName;
        this.raise('change', this);
    },

    setLastName: function(lastName) {
        //set the last name and then raise our 'change' event
        //passing this as the event data
        this.lastName = lastName;
        this.raise('change', this);
    },

    synchronize: function(sourceObj) {
        //set our properties to be the same as the source object
        this.firstName = sourceObj.firstName;
        this.lastName = sourceObj.lastName;
    }
};

function createPerson(firstName, lastName) {
    var person = Object.create(Person);
    person.firstName = firstName;
    person.lastName = lastName;

    //make this new Person instance an event source
    //before we return it
    return makeEventSource(person);
} //creatPerson()


var dave = createPerson('Dave', 'Stearns');
var daveClone = createPerson('Dave', 'Stearns');
dave.on('change', daveClone.synchronize, daveClone);

dave.setFirstName('Dr');
console.log(dave.getFullName());        // => 'Dr Stearns'
console.log(daveClone.getFullName());   // => also 'Dr Stearns'


