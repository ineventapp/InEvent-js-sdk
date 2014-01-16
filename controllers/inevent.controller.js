/**
 *	InEvent Class
 *	Aqui será armazenado todos os dados obtidos na API
 */

function InEvent(config)
{
	this.config = {
		cookies : false
	}

	if(config !== undefined)
	{
		if(config.cookies !== undefined)
		{
			this.config.cookies = config.cookies;
		}
	}

	var InEventInstance = this;

	this.api = new Api(InEventInstance);
	this.exception = this.api.exception;
	this.eventController = new EventController(InEventInstance);
	this.personController = new PersonController(InEventInstance);

}

InEvent.prototype = {
	
};