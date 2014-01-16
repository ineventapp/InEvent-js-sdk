inevent = new InEvent({
	cookies : true
});

var sampleEvent;

inevent.eventController.getSingle(1, null, function(data)
{
	sampleEvent = data;
});