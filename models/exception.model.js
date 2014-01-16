function Exception(content, from, parentInstance)
{
	if(parentInstance === undefined
	|| !(parentInstance instanceof ExceptionController))
	{
		throw "Operation not permited!";
	}

	this.content;
	this.from;
	this.parent = parentInstance;

	if(content !== undefined)
	{
		this.content = content;
	}

	if(from !== undefined)
	{
		this.from = from;
	}
};
