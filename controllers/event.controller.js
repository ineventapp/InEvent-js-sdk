/**
 *	Event Controller
 *	Controller of Event
 */

function EventController(parentInstance)
{
	if(parentInstance === undefined
	|| !(parentInstance instanceof InEvent))
	{
		throw "Operation not permited!";
	}

	this.parent 		= parentInstance;
	this.api 				= parentInstance.api;
	this.exception 	= parentInstance.exception;
}

EventController.prototype = {

	/**
	 *	getSingle
	 *	
	 *	@param string tokenID
	 *	@callback callback
	 */
	getSingle : function(eventID, tokenID, callback)
	{
		this.api.checkCallback(callback, true);

		var data, callbackI, save;

		if(tokenID != null
		&& tokenID !== undefined)
		{
			data = {
				method  : "event.getSingle",
				eventID : eventID,
				tokenID : tokenID
			};
		}
		else
		{
			data = {
				method  : "event.getSingle",
				eventID : eventID
			}
		}

		callbackI = new Array();

		callbackI[0] = callback;
		callbackI[1] = function(returnData, exec, from, callback)
		{
			if(parseInt(exec.status) == 200)
			{
				var singleEvent = new Event(returnData.data[0], from);

				callback(singleEvent);
			}
			else
			{
				throw from.exception.fromAPI(exec, "EventController.getSingle");
			}
		};

		this.api.get(data, callbackI, this);
	},

	/**
	 *	getEvents
	 *	
	 *	@param string tokenID
	 *	@callback callback
	 */
	getEvents : function(tokenID, callback)
	{
		this.api.checkCallback(callback, true);

		var data, callbackI, save;

		if(tokenID != null
		&& tokenID !== undefined)
		{
			data = {
				method : "event.getEvents",
				tokenID : tokenID
			};
		}
		else
		{
			data = {
				method : "event.getEvents"
			}
		}

		callbackI = new Array();

		callbackI[0] = callback;
		callbackI[1] = function(returnData, exec, from, callback)
		{
			if(parseInt(exec.status) == 200)
			{
				var events = [];
				
				for(var i in returnData.data)
				{
					events.push(new Event(returnData.data[i], from));
				}

				callback(events);
			}
			else
			{
				throw from.exception.fromAPI(exec, "EventController.getEvents");
			}
		};

		this.api.get(data, callbackI, this);
	}

};
