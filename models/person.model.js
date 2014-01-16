/**
 * Modelo para "Person"
 *
 * Aqui serão definidas toas as necessidades nas requisições
 */

function Person(info, parentInstance)
{
	if(parentInstance === undefined
	|| !(parentInstance instanceof PersonController))
	{
		throw "Operation not permited!";
	}

	this.info;
	this.parent 		= parentInstance;
	this.exception 	= parentInstance.exception;
	this.api 				= parentInstance.api;
	this.tokenID;

	if(info !== undefined)
	{
		this.info = info;

		if(info.tokenID !== undefined)
		{
			this.tokenID = info.tokenID;
		}
	}

}

Person.prototype = {

	getDetails : function(callback)
	{
		var data,
				callbackI;

		data = {
			method 	: "person.getDetails",
			tokenID : this.tokenID
		};

		callbackI = new Array();

		callbackI[0] = callback;
		callbackI[1] = function(returnData, exec, from, callback)
		{
			if(parseInt(exec.status) == 200)
			{
				from.info = returnData;

				if(from.tokenID !== undefined)
				{
					from.info.tokenID = from.tokenID;
				}

				callback(returnData);
			}
			else
			{
				throw from.exception.fromAPI(exec, "Person.getDetails");
			}
		};

		this.api.get(data, callbackI, this);
	},

	edit : function(keyField, fieldValue, callback)
	{
		if(!this.info.hasOwnProperty(keyField))
		{
			throw this.exception.simple("Field '"+keyField+"' not found.", "Person.edit");
		}

		var dataGET,
				dataPOST,
				callbackI;

		dataGET = {
			method 	: "person.edit",
			tokenID : this.tokenID,
			name	  : keyField
		};

		dataPOST = {
			value : fieldValue
		};

		callbackI = new Array();

		callbackI[0] = callback;
		callbackI[1] = function(returnData, exec, from, callback)
		{
			if(parseInt(exec.status) == 200)
			{
				if(returnData.memberID == from.info.memberID)
				{
					from.getDetails(function(returnData)
					{
						from.info = returnData;

						if(from.api.checkCallback(callback))
						{
							callback(from.info);
						}
					});
				}
			}
			else
			{
				throw from.exception.fromAPI(exec, "Person.edit");
			}
		};

		this.api.hybrid(dataGET, dataPOST, callbackI, this);
	},

	changePassword : function(oldP, newP, callback)
	{
		var data,
				callbackI;

		data = {
			method 			: "person.changePassword",
			tokenID 		: this.tokenID,
			oldPassword	: oldP,
			newPassword : newP
		};

		callbackI = new Array();

		callbackI[0] = callback;
		callbackI[1] = function(returnData, exec, from, callback)
		{
			if(parseInt(exec.status) == 200)
			{
				if(from.api.checkCallback(callback))
				{
					callback(from.info);
				}
			}
			else
			{
				throw from.exception.fromAPI(exec, "Person.changePassword");
			}
		};

		this.api.get(data, callbackI, this);
	}

};
