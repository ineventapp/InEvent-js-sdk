inevent = new InEvent({
	cookies : true
});

var eventoTeste;

inevent.event.getSingle(1, null, function(data)
{
	eventoTeste = data;
});