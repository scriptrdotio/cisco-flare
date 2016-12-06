var config = require("./config.js");

/**
 * This class exposes methods to manipulate a given flare device
 * @class FlareDevice
 * @constructor FlareDevice
 * @param {Object} params {
 *	{String} params.name : the name of the flare device
 *	{String} params.description : the latitude of the flare device
 *	{Object} params.data : additional data of the flare device
 *	{String} params.environmentId : the environmentId of the flare device
 *	{String} params.zoneId : the zoneId of the flare device
 *	{Float} params.xParameter : the xParameter of the flare device
 *	{Float} params.yParameter : the yParameter of the flare device
 *  }
 */
function FlareDevice(params) {
  
  if (!params) {
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "params cannot be null or empty"
    };
  }
	if (!params.environmentId || !params.zoneId) {
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "FlareDevice - params.environmentId and params.zoneId cannot be null or empty."
    };
  }
  
  this.name = params.name;
  this.description = params.description;
  this.data = params.data;
  this.environmentId = params.environmentId;
  this.zoneId = params.zoneId;
  this.xParameter = params.xParameter;
  this.yParameter = params.yParameter;
  
  var paramObject = {
    "name": this.name,
    "description": this.description,
    "data": this.data,
    "environment": this.environmentId,
    "zone": this.zoneId,
    "position": {"x": this.xParameter, "y": this.yParameter}
  };
  
  
  var http = require("http");
  var httpObj = {
	url: config.baseUrl + "environments/" + this.environmentId + "/zones/devices",
    headers: {
    	"content-type": "application/json"
 	},
    method: "POST",
    bodyString: JSON.stringify(paramObject)
  };
  var response = http.request(httpObj);	
  if(response.status==200){
    this.deviceId = JSON.parse(response.body)._id;
  	console.log("FlareDevice was instatiated successfully with params" + JSON.stringify(params));
  }else{
     throw {
      "errorCode": "http_failure",
      "errorDetail": "Unable to create FlareDevice"
     };
  }
};

/**
 * This method updates the device instance.  
 * @method updateDevice
  * @param {Object} params {
 *	{String} params.name : the name of the flare device
 *	{String} params.description : the latitude of the flare device
 *	{Object} params.data : additional data of the flare device
 *	{Float} params.xParameter : the xParameter of the flare device
 *	{Float} params.yParameter : the yParameter of the flare device
 *  }
 * @return {String} success/failure  
 */
FlareZone.prototype.updateDevice = function(params) {
	params.environmentId = this.environmentId;
  	params.zoneId = this.zoneId;
  	params.deviceId = this.deviceId;
 	return updateDevice(params, this);
};


/**
 * This method get the device instance.  
 * @method getDevice
 * @return {Object} zone details
 */
FlareZone.prototype.getDevice = function() {
  return getDevice(this.deviceId, this.environmentId, this.zoneId);
};

/**
 * This method get the additional data information of a device instance.  
 * @method getDeviceData
 * @return {Object} Device data details
 */
FlareEnvironment.prototype.getDeviceData = function() {
	return getDeviceData(this.environmentId, this.deviceId)
};

/**
 * This method get the environment Id of a device instance.  
 * @method getDeviceEnvironmentId
 * @return {String} Device environment Id
 */
FlareEnvironment.prototype.getDeviceEnvironmentId = function() {
	return this.environmentId;
};

/**
 * This method get the sone Id of a device instance.  
 * @method getDeviceZoneId
 * @return {String} Device zone Id
 */
FlareEnvironment.prototype.getDeviceZoneId = function() {
	return this.zoneId;
};

/**
 * This method get the device instance Id.  
 * @method getDeviceId
 * @return {String} Device Id
 */
FlareEnvironment.prototype.getDeviceId = function() {
	return this.deviceId;
};

/**
 * This method updates the device Object.
 * @method updateDevice
  * @param {Object} params {
 *	{String} params.name : the name of the flare device
 *	{String} params.description : the latitude of the flare device
 *	{Object} params.data : additional data of the flare device
 *	{String} params._id : the id of the flare device 
 *	{String} params.environmentId : the latitude of the flare device
 *	{String} params.zoneId : the latitude of the flare device
 *	{Float} params.xParameter : the xParameter of the flare device
 *	{Float} params.yParameter : the yParameter of the flare device
 *  }
 * @return {String}  success/failure
 */
function updateDevice(params, context){
   var environmentId = "";
  if(params.environmentId){
	environmentId = params.environmentId;
  }
  
  var zoneId = "";
  if(params.zoneId){
	zoneId = params.zoneId;
  }
  
  var deviceId = "";
  if(params.deviceId){
	deviceId = params.deviceId;
  }
  
  if (!params) {
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "params cannot be null or empty"
    };
  }
	if (!params.environmentId || !params.zoneId || !params.deviceId) {
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "FlareDevice - params.environmentId, params.zoneId, params.deviceId cannot be null or empty."
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
	url: config.baseUrl + "environments/" + environmentId + "/devices/" + deviceId,
    headers: {
    	"content-type": "application/json"
 	},
    method: "PUT",
    params: {device_id: deviceId},
    bodyString: JSON.stringify(paramObject)
  };
  var response = http.request(httpObj);	
  if(response.status==200){
    if(context){
      context.name = params.name;
      context.description = params.description;
      context.data = params.data;
      context.environmentId = environmentId;
      context.deviceId = deviceId;
      context.zoneId = zoneId;
      context.xParameter = params.xParameter;
      context.yParameter = params.yParameter;
    }
    return {status:"success"};
  }else{
     throw {
      "errorCode": "http_failure",
      "errorDetail": "Unable to update device"
     };
  }
};

/**
 * This method get the device.  
 * @method getDevice
 * @param {String}  environmentId : optional, if not sent the initiated device 
 * will be returned else the environment of id = environmentId
 * @param {String}  zoneId : optional, if not sent the initiated device 
 * will be returned else the zone of id = zoneId
 * @param {String}  deviceId : optional, if not sent the initiated device 
 * will be returned else the device of id = deviceId
 * @return {Object} zone details
 */
function getDevice(environmentId, zoneId, deviceId){
  if (!environmentId || !zoneId || !deviceId) {
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "environmentId, deviceId and zoneId cannot be null if FlareDevice object is not initiated"
    };
  }
   var http = require("http");
   var httpObj = {
	url: config.baseUrl + "environments/" + environmentId + "/devices/" + deviceId,
    headers: {
    	"content-type": "application/json"
 	},
    method: "GET",
    params: {device_id: deviceId}
  };
  var response = http.request(httpObj);	
  if(response.status==200){
    console.log("Successfully returned device in environmentID = " + environmentId + " of zoneID = " + zoneId + " and deviceId = " + deviceId);
    return JSON.parse(response.body);
  }else{
     throw {
      "errorCode": "http_failure",
      "errorDetail": "Unable to getDevice"
     };
  }
};

/**
 * This method get the additional data information of a device.  
 * @method getDeviceData
 * @param {String}  environmentId : optional, if not sent the initiated device 
 * will be returned else the environment of id = environmentId
 * @param {String}  deviceId : optional, if not sent the initiated device 
 * will be returned else the device of id = deviceId
 * @return {Object} Device data details
 */
function getDeviceData(environmentId, deviceId){
  
  if (!environmentId || !deviceId) {
    throw {
      "errorCode": "Invalid_Parameter",
      "errorDetail": "environmentId  cannot be null if FlareDevice object is not initiated"
    };
  }
   var http = require("http");
   var httpObj = {
	url: config.baseUrl + "environments/" + environmentId + "/devices/"  + deviceId + "/data",
    headers: {
    	"content-type": "application/json"
 	},
    method: "GET" 
  };
  var response = http.request(httpObj);	
  if(response.status==200){
    console.log("Successfully returned device of environmentID = " + this.environmentId + " and deviceId = " + deviceId);
    var body =  JSON.parse(response.body);
    if(body.data)
      return body.data;
    else
      return {};
  }else{
     throw {
      "errorCode": "http_failure",
      "errorDetail": "Unable to get device Data"
     };
  }
}