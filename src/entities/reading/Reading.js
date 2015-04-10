/**
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var DigitalResource = require('../digitalResource');

/**
 * Represents a reading.
 * Reading's prototype set to DigitalResource
 * @constructor
 * @param {string} id URI
 * @extends DigitalResource
 */
function Reading(id) {

    DigitalResource.call(this);

    this.setId(id);
    this.setType("http://www.idpf.org/epub/vocab/structure");

    this.setName(null);
    this.setObjectType([]);
    this.setAlignedLearningObjective([]);
    this.setKeywords([]);
    this.setIsPartOf(null);
}

Reading.prototype = _.create(DigitalResource.prototype);

module.exports = reading;