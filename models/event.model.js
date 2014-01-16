/**
 * Modelo para "Event"
 *
 * Aqui serão definidas toas as necessidades nas requisições
 */

function Event(info, parentInstance)
{
	if(parentInstance === undefined
	|| info === undefined
	|| !(parentInstance instanceof EventController))
	{
		throw "Operation not permited!";
	}

	this.info;
	this.activities;
	this.parent 		= parentInstance;
	this.exception 	= parentInstance.exception;
	this.api 				= this.parent.api;

	if(info !== undefined)
	{
		this.info = info;
	}
}

Event.prototype = {
	/**
	 *	getActivities
	 *	
	 *	@param string tokenID
	 *	@callback callback
	 */
	getActivities : function(tokenID, callback)
	{
		if(this.info === undefined
		&& this.info == null)
		{
			throw this.exception.simple("You messed up something!", "Event.getActivities");
		}

		var data, callbackI, save;

		if(tokenID != null
		&& tokenID !== undefined)
		{
			data = {
				method 	: "event.getActivities",
				eventID : this.info.id,
				tokenID : tokenID
			};
		}
		else
		{
			data = {
				method : "event.getActivities",
				eventID : this.info.id,
			}
		}

		callbackI = new Array();

		callbackI[0] = callback;
		callbackI[1] = function(returnData, exec, from, callback)
		{
			if(parseInt(exec.status) == 200)
			{
				from.activities = new Activity(returnData, from);

				if(from.api.checkCallback(callback))
				{
					callback(from.activities);
				}
			}
			else
			{
				throw this.exception.fromAPI(exec, "Event.getActivities");
			}
		};

		this.api.get(data, callbackI, this);
	}
};