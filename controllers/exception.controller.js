function ExceptionController()
{
	this.lastException;

	this.exceptions = [];
};

ExceptionController.prototype = {

	fromAPI : function(exec, from)
	{
		var aux = {};

		aux.status 	= exec.status;
		aux.message = exec.statusText;

		var exception = new Exception(aux, from, this);

		this.exceptions.push(exception);
		this.lastException = exception;

		return exception;
	},

	simple : function(message, from)
	{
		var aux = {};

		aux.message = message;

		var exception = new Exception(aux, from, this);

		this.exceptions.push(exception);
		this.lastException = exception;

		return exception;
	}

};
