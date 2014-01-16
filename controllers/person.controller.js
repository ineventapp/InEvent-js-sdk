/**
 *	Person Controller
 *	Controller of Person
 */

function PersonController(parentInstance)
{
	//If you instantiate an object without passing his parent, throw.
	if(parentInstance === undefined
	|| !(parentInstance instanceof InEvent))
	{
		throw "Operation not permited!";
	}

	//His parent prototype
	this.parent = parentInstance;

	this.exception = parentInstance.exception;
	
	//Helper
	this.api 		= parentInstance.api;

	//Signed in person will be stored here
	this.signedIn;

	//If SDK user used cookies : true
	if(this.parent.config.cookies)
	{
		if(this.api.getCookie('inevent-api-person-me-info'))
		{
			this.signedIn = new Person(this.api.getCookie('inevent-api-person-me-info'), this);
		}
	}
}

PersonController.prototype = {

	/**
	 *	signIn()
	 *	
	 *	@param string email
	 *	@param string password
	 *	@callback callback
	 */
	signIn : function(email, password, callback)
	{
		this.api.checkCallback(callback, true);

		var data, callbackI;

		data = {
			method 	 : "person.signIn",
			email		 : email,
			password : password
		};

		callbackI = new Array();

		callbackI[0] = callback;
		callbackI[1] = function(returnData, exec, from, callback)
		{
			if(parseInt(exec.status) == 200)
			{
				from.signedIn = new Person(returnData, from);

				if(from.parent.config.cookies)
				{
					from.api.setCookie('inevent-api-person-me-info', returnData);
				}

				callback(from.signedIn);
			}
			else
			{
				throw from.exception.fromAPI(exec, "PersonController.signIn");
			}
		};

		this.api.get(data, callbackI, this);
	}

};
