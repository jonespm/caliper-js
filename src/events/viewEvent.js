/**
 *  @author Prashant Nayak
 *  @copyright @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Event = require('./caliperEvent');

function ViewEvent() {

  Event.call(this);

  this.setContext(this.Contexts.VIEWED);
  this.setType(this.Types.VIEWED);

  this.setGenerated(null);
  this.setStartedAtTime(null);
  this.setEndedAtTime(null);
  this.setDuration(null);
}

ViewEvent.prototype = _.create(Event.prototype);

module.exports = ViewEvent;
