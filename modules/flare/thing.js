var config = require("./config.js");

/**
 * This class exposes methods to manipulate a given flare thing
 * @class FlareThing
 * @constructor FlareThing
 * @param {Object} params {
 *	{String} params.name : the name of the flare thing
 *	{String} params.description : the latitude of the flare thing
 *	{Object} params.data : additional data of the flare thing
 *	{String} params.environmentId : the environmentId of the flare thing
  *	{String} params.zoneId : the zoneId of the flare thing
 *	{Float} params.xParameter : the xParameter of the flare thing
 *	{Float} params.yParameter : the yParameter of the flare thing
 * }
 */
function FlareThing(params) {
  
  if (!params) {
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "params cannot be null or empty"
    };
  }
	if (!params.environmentId || !params.zoneId) {
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "FlareThing - params.environmentId and params.zoneId cannot be null or empty."
    };
  }
  
  var paramObject = {
    "name": params.name,
    "description": params.description,
    "data": params.data,
    "environment": params.environmentId,
    "zone": params.zoneId,
    "position": {"x": params.xParameter, "y": params.yParameter}
  };
  
  
  var http = require("http");
  var httpObj = {
	url: config.baseUrl + "environments/" + this.environmentId + "/zones/" + params.zoneId + "/things",
    headers: {
    	"content-type": "application/json"
 	},
    method: "POST",
    bodyString: JSON.stringify(paramObject)
  };
  var response = http.request(httpObj);	
  if(response.status==200){
    this.thingId = JSON.parse(response.body)._id;
    this.name = params.name;
    this.description = params.description;
    this.data = params.data;
    this.environmentId = params.environmentId;
    this.zoneId = params.zoneId;
    this.xParameter = params.xParameter;
    this.yParameter = params.yParameter;
  	console.log("FlareThing was instatiated successfully with params" + JSON.stringify(params));
  }else{
     throw {
      "errorCode": "http_failure",
      "errorDetail": "Unable to create FlareThing"
     };
  }
};

/**
 * This method updates the thing object.  
 * @method updateThing
 * @param {Object} params {
 *	{String} params.name : the name of the flare thing
 *	{String} params.description : the latitude of the flare thing
 *	{Object} params.data : additional data of the flare thing
 *	{String} params._id : the id of the flare thing 
 *	{Float} params.xParameter : the xParameter of the flare thing
 *	{Float} params.yParameter : the yParameter of the flare thing
 *  }
 * @return {Object}  success/failure
 */
FlareThing.prototype.updateThing = function(params) {
  params.environmentId = this.environmentId;
  params.zoneId = this.zoneId;
  params.thingId = this.thingId;
  return updateThing(params, this);
};


/**
 * This method get the thing from instance.  
 * @method getThing
 * @return {Object} zone details
 */
FlareThing.prototype.getThing = function() {
  return getThing(this.thingId, this.environmentId, this.zoneId);
};

/**
 * This method get the additional data information of a thing instance.  
 * @method getThingData
 * @return {Object} Thing data details
 */
FlareThing.prototype.getThingData = function() {
 	return getThingData(this.thingId, this.environmentId, this.zoneId);
};

/**
 * This method get the environment Id of a thing instance.  
 * @method getThingEnvironmentId
 * @return {String} Environment Id 
 */
FlareThing.prototype.getThingEnvironmentId = function() {
	return this.environmentId;
};

/**
 * This method get the zone Id of a thing instance.  
 * @method getThingZoneId
 * @return {String} Zone Id 
 */
FlareThing.prototype.getThingZoneId = function() {
	return this.zoneId;
};

/**
 * This method get the thing instance Id.  
 * @method getThingId
 * @return {String} Thing Id
 */
FlareThing.prototype.getThingId = function() {
	return this.environmentId;
};

/**
 * This method updates the thing.  
 * @method updateThing
 * @param {Object} params {
 *	{String} params.name : the name of the flare thing
 *	{String} params.description : the latitude of the flare thing
 *	{Object} params.data : additional data of the flare thing
 *	{String} params._id : the id of the flare thing 
 *	{String} params.environmentId : the latitude of the flare thing
 *	{String} params.zoneId : the latitude of the flare thing
 *	{Float} params.xParameter : the xParameter of the flare thing
 *	{Float} params.yParameter : the yParameter of the flare thing
 *  }
 * @return {Object}  success/failure
 */
function updateThing(params, context){
  var environmentId = "";
  if(params.environmentId){
	environmentId = params.environmentId;
  }
  
  var zoneId = "";
  if(params.zoneId){
	zoneId = params.zoneId;
  }
  
  var thingId = "";
  if(params.thingId){
	thingId = params.thingId;
  }
  
  if (!params) {
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "params cannot be null or empty"
    };
  }
	if (!params.environmentId || !params.zoneId || !params.thingId) {
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "FlareThing - params.environmentId, params.zoneId, params.thingId cannot be null or empty."
    };
  }
  
  var paramObject = {
    "name": params.name,
    "description": params.description,
    "data": params.data,
    "environment": environmentId,
    "zone": zoneId,
    "_id": environmentId,
    "position": {"x": params.xParameter, "y": params.yParameter}
  };
  var http = require("http");
  var httpObj = {
	url: config.baseUrl + "environments/" + environmentId + "/zones/" + zoneId + "/" + thingId,
    headers: {
    	"content-type": "application/json"
 	},
    method: "PUT",
    params: {thing_id: thingId},
    bodyString: JSON.stringify(paramObject)
  };
  var response = http.request(httpObj);	
  if(response.status==200){
    if(context){
      context.name = params.name;
      context.description = params.description;
      context.data = params.data;
      context.environmentId = environmentId;
      context.thingId = thingId;
      context.zoneId = zoneId;
      context.xParameter = params.xParameter;
      context.yParameter = params.yParameter;
    }
    return {status:"success"};
  }else{
     throw {
      "errorCode": "http_failure",
      "errorDetail": "Unable to update thing"
     };
  }
};

/**
 * This method get the thing.  
 * @method getThing
 * @param {String}  environmentId : optional, if not sent the initiated thing 
 * will be returned else the environment of id = environmentId
 * @param {String}  zoneId : optional, if not sent the initiated thing 
 * will be returned else the zone of id = zoneId
 * @param {String}  thingId : optional, if not sent the initiated thing 
 * will be returned else the thing of id = thingId
 * @return {Object} zone details
 */
function getThing(environmentId, zoneId, thingId){
 
  
  if (!environmentId || !zoneId || !thingId) {
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "environmentId, thingId and zoneId cannot be null if FlareThing object is not initiated"
    };
  }
   var http = require("http");
   var httpObj = {
	url: config.baseUrl + "environments/" + environmentId + "/zones/" + zoneId + "/" + thingId,
    headers: {
    	"content-type": "application/json"
 	},
    method: "GET",
    params: {thing_id: thingId}
  };
  var response = http.request(httpObj);	
  if(response.status==200){
    console.log("Successfully returned thing in environmentID = " + environmentId + " of zoneID = " + zoneId + " and thingId = " + thingId);
    return JSON.parse(response.body);
  }else{
     throw {
      "errorCode": "http_failure",
      "errorDetail": "Unable to getThing"
     };
  }
};

/**
 * This method get the additional data information of a thing.  
 * @method getThingData
 * @param {String}  environmentId : optional, if not sent the initiated thing 
 * will be returned else the environment of id = environmentId
 * @param {String}  zoneId : optional, if not sent the initiated thing 
 * will be returned else the zone of id = zoneId
 * @param {String}  thingId : optional, if not sent the initiated thing 
 * will be returned else the thing of id = thingId
 * @return {Object} Thing data details
 */
function getThingData(environmentId, zoneId, thingId){
  
  if (!environmentId || !zoneId || !thingId) {
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "environmentId and zoneId cannot be null if FlareZone object is not initiated"
    };
  }
   var http = require("http");
   var httpObj = {
	url: config.baseUrl + "environments/" + environmentId + "/zones/" + zoneId + "/" + thingId + "/data",
    headers: {
    	"content-type": "application/json"
 	},
    method: "GET" 
  };
  var response = http.request(httpObj);	
  if(response.status==200){
    console.log("Successfully returned zone of environmentID = " + this.environmentId + " and zoneId = "+ zoneId);
    var body =  JSON.parse(response.body);
    if(body.data)
      return body.data;
    else
      return {};
  }else{
     throw {
      "errorCode": "http_failure",
      "errorDetail": "Unable to get thing Data"
     };
  }
}