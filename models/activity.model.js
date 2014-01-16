/**
 * Modelo para "Activity"
 *
 * Aqui serão definidas toas as necessidades nas requisições
 */

function Activity(data, parentInstance)
{
	this.info;
	this.parent = parentInstance;
	this.api = this.parent.api;

	if(data !== undefined
	&& data != null)
	{
		this.info = data;
	}
}

Activity.prototype = {

	getAllActivities : function()
	{
		if(this.info !== undefined
		&& this.info != null)
		{
			return this.info.data;
		}
	},

	getDayActivities : function(dayIndex)
	{
		if(this.info !== undefined
		&& this.info != null)
		{
			return this.info.data[dayIndex];
		}
	},

	getActivity : function(dayIndex, activityIndex)
	{
		if(this.info !== undefined
		&& this.info != null)
		{
			return this.info.data[dayIndex][activityIndex];
		}
	}

};