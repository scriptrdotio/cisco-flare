var config = require("./config.js");
var config = require("./device.js");
var config = require("./thing.js");

/**
 * This class exposes methods to manipulate a given flare zone
 * @class FlareZone
 * @constructor FlareZone
 * @param {Object} params {
 *	{String} params.name : the name of the flare zone
 *	{String} params.description : the description flare zone
 *	{Object} params.data : additional data of the flare zone
 *	{String} params.environment : the environment id
 *	{Float} params.xParameter : the xParameter of the flare zone
 *	{Float} params.yParameter : the yParameter of the flare zone
 *	{Float} params.width : the width of the flare zone
 *	{Float} params.height : the height of the flare zone
 *  }
 */
function FlareZone(params) {
  
  if (!params) {
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "params cannot be null or empty"
    };
  }
	if (!params.environment) {
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "FlareZone - params.environmentId cannot be null or empty."
    };
  }
  
  this.name = params.name;
  this.description = params.description;
  this.data = params.data;
  this.environmentId = params.environment;
  this.xParameter = params.xParameter;
  this.yParameter = params.yParameter;
  
  var paramObject = {
    "name": this.name,
    "description": this.description,
    "data": this.data,
    "environment": this.environmentId,
    "position": {"x": this.xParameter, "y": this.yParameter}
  };
  
  
  var http = require("http");
  var httpObj = {
	url: config.baseUrl + "environments/" + this.environmentId + "/zones",
    headers: {
    	"content-type": "application/json"
 	},
    method: "POST",
    bodyString: JSON.stringify(paramObject)
  };
  var response = http.request(httpObj);	
  if(response.status==200){
    this.zoneId = JSON.parse(response.body)._id;
  	console.log("FlareZone was instatiated successfully with params" + JSON.stringify(params));
  }else{
     throw {
      "errorCode": "http_failure",
      "errorDetail": "Unable to create FlareZone"
     };
  }
};

/**
 * This method updates the zone instance.  
 * @method updateZone
 *	@param {Object} params {
 *	{String} params.name : the name of the flare zone
 *	{String} params.description : the latitude of the flare zone
 *	{Object} params.data : additional data of the flare zone
 *	{Float} params.xParameter : the xParameter of the flare zone
 *	{Float} params.yParameter : the yParameter of the flare zone
 *	{Float} params.width : the width of the flare zone
 *	{Float} params.height : the height of the flare zone
 *  }
 * @return {Object}  success/failure
 */
FlareZone.prototype.updateZone = function(params) {
  params.environmentId = this.environmentId;
  params.zoneId = this.zoneId;
  return updateZone(params);
};

/**
 * This method get the zone instance.  
 * @method getZone
 * @return {Object} zone details
 */
FlareZone.prototype.getZone = function() {
  return getZone(this.environmentId, this.zoneId);
};

/**
 * This method get the additional data information of a zone instance.  
 * @method getZoneData
 * @return {Object} environment data details
 */
FlareZone.prototype.getZoneData = function() {
    return getZoneData(this.environmentId, this.zoneId);
};

/**
 * This method get zone environment Id of a zone instance.  
 * @method getZoneEnvironmentId
 * @return {String} environment Id
 */
FlareZone.prototype.getZoneEnvironmentId = function() {
	return this.environmentId;
};

/**
 * This method get zone zone Id of a zone instance.  
 * @method getZoneId
 * @return {String} zone Id
 */
FlareZone.prototype.getZoneId = function() {
	return this.environmentId;
};

/**
 * This method creates a thing in the object zone.  
 * @method createThing
 * @param {Object} params {
 *	{String} params.name : the name of the flare thing
 *	{String} params.description : the latitude of the flare thing
 *	{Object} params.data : additional data of the flare thing
 *	{String} params.environmentId : the environmentId of the flare thing
 *	{String} params.zoneId : the zoneId of the flare thing
 *	{Float} params.xParameter : the xParameter of the flare thing
 *	{Float} params.yParameter : the yParameter of the flare thing
 * }
 * @ return {FlareThing} Flare Thing Object
 */
FlareZone.prototype.createThing = function(params) {
  if(this.zoneId && this.environmentId){
    params.zoneId = this.zoneId;
    params.environmentId = this.environmentId;
    var newThing = new thing.FlareThing(params);
    return newThing;
  }else{
    throw {
      "errorCode": "no_zone_environment_available",
      "errorDetail": "The current zone instance has either not environmentId or no zoneId"
     };
  }
};

/**
 * This method creates a Device in the object zone.  
 * @method createDevice
 * @param {Object} params {
 *	{String} params.name : the name of the flare device
 *	{String} params.description : the latitude of the flare device
 *	{Object} params.data : additional data of the flare device
 *	{String} params.environmentId : the environmentId of the flare device
 *	{String} params.zoneId : the zoneId of the flare device
 *	{Float} params.xParameter : the xParameter of the flare device
 *	{Float} params.yParameter : the yParameter of the flare device
 *  }
 * @ return {FlareDevice} Flare Device Object
 */
FlareZone.prototype.createDevice = function(params) {
  if(this.zoneId && this.environmentId){
    params.zone = this.zoneId;
    params.environmentId = this.environmentId;
    var newDevice = new thing.FlareDevice(params);
    return newDevice;
  }else{
    throw {
      "errorCode": "no_zone_environment_available",
      "errorDetail": "The current zone instance has either not environmentId or no zoneId"
     };
  }
  

};

/**
 * This method updates the zone.  
 * @method updateZone
 *	@param {Object} params {
 *	{String} params.name : the name of the flare zone
 *	{String} params.description : the latitude of the flare zone
 *	{Object} params.data : additional data of the flare zone
 *	{String} params.environmentId : the latitude of the flare zone
 *	{String} params.zoneId : the latitude of the flare zone
 *	{Float} params.xParameter : the xParameter of the flare zone
 *	{Float} params.yParameter : the yParameter of the flare zone
 *	{Float} params.width : the width of the flare zone
 *	{Float} params.height : the height of the flare zone
 *  }
 * @return {Object}  success/failure
 */
function updateZone(params){
  if (!params) {
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "params cannot be null or empty"
    };
  }
	if (!params.environmentId || !params.zoneId) {
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "FlareZone - params.environmentId cannot be null or empty."
    };
  }
  var paramObject = {
    "name": params.name,
    "description": params.description,
    "data": params.data,
    "environment": params.environmentId,
    "perimeter": {"origin": {"x": params.xParameter, "y": params.yParameter},"size": {"height": params.width,"width": params.height}}
  };
  var http = require("http");
  var httpObj = {
	url: config.baseUrl + "environments/" + params.environmentId + "/zones/" + params.zoneId,
    headers: {
    	"content-type": "application/json"
 	},
    method: "PUT",
    params: {zone_id: params.zoneId},
    bodyString: JSON.stringify(paramObject)
  };
  var response = http.request(httpObj);	
  if(response.status==200){
    if(context){
      context.name = params.name;
      context.description = params.description;
      context.data = params.data;
      context.environmentId = params.environmentId;
      context.xParameter = params.xParameter;
      context.yParameter = params.yParameter;
      context.width = params.width;
      context.height = params.height;
    }
    return {status:"success"};
  }else{
     throw {
      "errorCode": "http_failure",
      "errorDetail": "Unable to create updateZone"
     };
  }
};

/**
 * This method get the zone.  
 * @method getZone
 * @param {String}  environmentId : optional, if not sent the initiated environment 
 * will be returned else the environment of id = environmentId
 * @param {String}  zoneId : optional, if not sent the initiated zone 
 * will be returned else the zone of id = zoneId
 * @return {Object} zone details
 */
function getZone(environmentId, zoneId){
  if (!environmentId || !zoneId) {
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "environmentId and zoneId cannot be null if FlareZone object is not initiated"
    };
  }
   var http = require("http");
   var httpObj = {
	url: config.baseUrl + "environments/" + environmentId + "/zones/" + zoneId,
    headers: {
    	"content-type": "application/json"
 	},
    method: "GET",
    params: {zone_id: zoneId}
  };
  var response = http.request(httpObj);	
  if(response.status==200){
    console.log("Successfully returned zone in environmentID = " + environmentId + " of zoneID = " + zoneId);
    return JSON.parse(response.body);
  }else{
     throw {
      "errorCode": "http_failure",
      "errorDetail": "Unable to getZone"
     };
  }
};

/**
 * This method get the additional data information of an environment.  
 * @method getZoneData
 * @param {String}  environmentId : optional, if not sent the initiated environment 
 * will be returned else the environment of id = environmentId
 * @return {Object} environment data details
 */
function getZoneData(environmentId, zoneId){
  if (!environmentId || !zoneId) {
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "environmentId and zoneId cannot be null if FlareZone object is not initiated"
    };
  }
   var http = require("http");
   var httpObj = {
	url: config.baseUrl + "environments/" + environmentId + "/zones/" + zoneId,
    headers: {
    	"content-type": "application/json"
 	},
    method: "GET" 
  };
  var response = http.request(httpObj);	
  if(response.status==200){
    console.log("Successfully returned zone of environmentID = " + environmentId + " and zoneId = "+ zoneId);
    var body =  JSON.parse(response.body);
    if(body.data)
      return body.data;
    else
      return {};
  }else{
     throw {
      "errorCode": "http_failure",
      "errorDetail": "Unable to get Zone Data"
     };
  }
};
