function Api(parentInstance)
{
	if(parentInstance === undefined
	|| !(parentInstance instanceof InEvent))
	{
		throw "Operation not permited!";
	}

	this.parent = parentInstance;
	this.url = "http://inevent.us/developer/api/";
	this.exception = new ExceptionController();
}

Api.prototype = {

	checkCallback : function(callback, throwIt)
	{
		if(throwIt === undefined)
		{
			throwIt = false;
		}

		if(callback == null
		|| callback === undefined)
		{
			if(throwIt)
			{
				throw this.exception.simple("A callback is required.", "Api.checkCallback");
			}

			return false;
		}
		else if(typeof(callback) != "function")
		{
			if(throwIt)
			{
				throw this.exception.simple("A callback is required.", "Api.checkCallback");
			}
			
			return false;
		}

		return true;
	},

	isValidJson : function(cvalue)
	{
		try
		{
			JSON.parse(cvalue);
		}
		catch(e)
		{
			return false;
		}

		return true;
	},

	setCookie : function(cname,cvalue,exdays)
	{
		var dayToSet = new Date();
		dayToSet.setTime(dayToSet.getTime()+(exdays*24*60*60*1000));

		var expires = "expires="+dayToSet.toGMTString();

		if(cvalue.constructor == {}.constructor)
		{
			cvalue = JSON.stringify(cvalue);
		}
		else if(cvalue.constructor == [].constructor)
		{
			cvalue = cvalue.toString();
		}

		document.cookie = cname + "=" + cvalue + "; " + expires;
	},

	getCookie : function(cname)
	{
		var name = cname + "=";
		var ca = document.cookie.split(';');

		for(var i=0; i<ca.length; i++) 
		{
			var c = ca[i].trim();
			if(c.indexOf(name)==0)
			{
				var cvalue = c.substring(name.length,c.length);

				if(this.isValidJson(cvalue))
				{
					return JSON.parse(cvalue);
				}
				else if(this.isValidJson("[" + cvalue + "]"))
				{
					return JSON.parse("[" + cvalue + "]");
				}
				else
				{
					return cvalue;
				}
			}
		}

		return false;
	},

	execHttp : function() {
		try 
		{
			return new ActiveXObject('Msxml2.XMLHTTP')
		} 
		catch(e1)
		{
			try
			{
				return new ActiveXObject('Microsoft.XMLHTTP')
			}
			catch(e2)
			{
				return new XMLHttpRequest()
			}
		}
	},

	send : function(url, callback, method, from, data, sync) {

		var exec = this.execHttp();
		
		exec.open(method, url, sync);

		var api = this;

		exec.onreadystatechange = function()
		{
			if(exec.readyState == 4)
			{
				var returnData = null;

				if(exec.responseText != "" && exec.responseText != null)
				{
					returnData = JSON.parse(exec.responseText);
				}

				if(callback[1] != null && callback[1] !== undefined)
				{
					try
					{
						callback[1](returnData, exec, from, callback[0]);
					}
					catch (exception)
					{
						console.log(exception);
						
						if(api.checkCallback(callback[0]))
						{
							callback[0](null, exception);
						}
					}
				}
				else
				{
					throw from.exception.simple("A callback is required.", "Api.send");
				}
			}
			else
			{
				if(callback[1] != null && callback[1] !== undefined)
				{
					try
					{
						callback[1](returnData, exec, from, callback[0]);
					}
					catch (exception)
					{
						console.log(exception);

						if(api.checkCallback(callback[0]))
						{
							callback[0](null, exception);
						}
					}
				}
				else
				{
					throw from.exception.simple("A callback is required.", "Api.send");
				}
			}
		}

		if(method == 'POST')
		{
			exec.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		}
		else
		{
			exec.setRequestHeader('Content-type', 'text/plain');
		}

		exec.send(data);

	},

	get : function(data, callback, from, sync)
	{
		var query = [];

		for (var key in data)
		{
			query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
		}

		this.send(this.url + '?' + query.join('&'), callback, 'GET', from, null, sync);
	},

	post : function(data, callback, from, sync)
	{
		var query = [];

		for (var key in data)
		{
			query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
		}

		this.send(this.url, callback, 'POST', from, query.join('&'), sync);
	},

	hybrid : function(dataGET, dataPOST, callback, from, sync)
	{
		var queryGET = [],
				queryPOST = [];

		for (var key in dataGET)
		{
			queryGET.push(encodeURIComponent(key) + '=' + encodeURIComponent(dataGET[key]));
		}

		for (var key in dataPOST)
		{
			queryPOST.push(encodeURIComponent(key) + '=' + encodeURIComponent(dataPOST[key]));
		}

		this.send(this.url + '?' + queryGET.join('&'), callback, 'POST', from, queryPOST.join('&'), sync);
	}

	/*get : function(dataI, callback, from)
	{
		$.ajax({
			url: this.url,
			type: "GET",
			dataType: "json",
			data: dataI,
			success: function(data)
			{
				for(var key in callback)
				{
					if(callback[key] != null
					&& callback[key] !== undefined)
					{
						callback[key](data, 200, from);
					}
				}
			},
			error: function(request)
			{
				for(var key in callback)
				{
					if(callback[key] != null
					&& callback[key] !== undefined)
					{
						callback[key](null, request.status, from);
					}
				}
			}
		});
	}*/

};