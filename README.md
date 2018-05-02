InEvent
========


This is InEvent's official JS SDK. All its documentation can be accessed at [http://inevent.us/developer/](http://inevent.us/developer/).

This SDK doesn't require any dependencies.

How-to \[IN DEVELOPMENT -- DO NOT USE IN PRODUCTION\]
--------
Since this SDK is still under development, we don't have a minified `.min` version of it yet.

Include all files under directories `controllers` and `models`.

*PS: All __callbacks__ must be presented as: function(data, exception){}*

```js
var inevent = new InEvent({
	cookies : true // or false
});
```

To access a controller: `inevent.NOMEDOCONTROLADOR`.

Example:

```js
var eventController = inevent.eventController;
```

To get an unique event:

```js
var eventID = 1;
var tokenID = null;

eventController.getSingle(eventID, tokenID, function(data, exception)
{
	if(exception)
		console.log(exception);
	else
		console.log(data); // Object of type Event
});
```

Controllers
--------
Controllers created at the moment:
+ InEvent
+ Api
+ ExceptionController
+ EventController (Accessible through InEvent.eventController).
+ PersonController (Accessible through InEvent.personController).

Models created at the moment:
+ Exception (blocked access - dinamically generated in ExceptionController).
+ Person (blocked access - dinamically generated in PersonController).
+ Event (blocked access - dinamically generated in EventController).
+ Activity (blocked access - dinamically generated in EventController/Event).

Exceptions
--------
In `ExceptionController` it is possible to verify *all* thrown exceptions and the *last* one.

For each exception under `ExceptionController`, it is possible to manage:
- The status returned by our API;
- A description text of the problem;
- The location that the exception has been thrown (ie: "Person.signIn");

Example
--------
Access the file `example.js` for a SDK How-to. We also included a `index.html` to be executed from browser.

Support
--------
Just open an issue on Github and I'll get to it as soon as possible.

About
--------
This SDK is brought to you by InEvent.
