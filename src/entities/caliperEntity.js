/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */


function Entity() {
  // Constructor
}

// Setters for base properties of all Caliper Entities
Entity.prototype.setId = function (id) {
  this['@id'] = id;
};

Entity.prototype.setType = function (type) {
  this['@type'] = type;
};

Entity.prototype.setName = function (name) {
  this.name = name;
};

Entity.prototype.setDescription = function (description) {
  this.description = description;
};

Entity.prototype.setProperties = function (properties) {
  this.properties = properties;
};

Entity.prototype.setDateCreated = function (dateCreated) {
  this.dateCreated = dateCreated;
};

Entity.prototype.setDateModified = function (dateModified) {
  this.dateModified = dateModified;
};

Entity.prototype.Types = {
  "ACTIVITY_CONTEXT": "http://purl.imsglobal.org/caliper/v1/ActivityContext",
  "AGENT": "http://purl.imsglobal.org/caliper/v1/Agent",
  "ATTEMPT": "http://purl.imsglobal.org/caliper/v1/Attempt",
  "DIGITAL_RESOURCE": "http://purl.imsglobal.org/caliper/v1/DigitalResource",
  "ENTITY": "http://purl.imsglobal.org/caliper/v1/Entity",
  "LEARNING_OBJECTIVE": "http://purl.imsglobal.org/caliper/v1/LearningObjective",
  "RESULT": "http://purl.imsglobal.org/caliper/v1/Result",
  "VIEW": "http://purl.imsglobal.org/caliper/v1/View",
  "SESSION": "http://purl.imsglobal.org/caliper/v1/Session"
};

module.exports = Entity;
