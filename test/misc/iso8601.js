/*
 * This file is part of IMS Caliper Analytics™ and is licensed to
 * IMS Global Learning Consortium, Inc. (http://www.imsglobal.org)
 * under one or more contributor license agreements.  See the NOTICE
 * file distributed with this work for additional information.
 *
 * IMS Caliper is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * IMS Caliper is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License along
 * with this program. If not, see http://www.gnu.org/licenses/.
 */

var test = require('tape');
var validator = require('../../src/validators/validator');

test('iso8601Test', function (t) {
  
  t.plan(7);
  
  t.ok(validator.isISO8601("2022-11-05", "Validates a plain date"));
  t.ok(validator.isISO8601("2022-05-18T09:00:00", "Validates a date+time"));
  t.ok(validator.isISO8601("2022-01-01T00:00:00-05:00", "Validates a date+time+timezone"));

  t.notOk(validator.isISO8601("2022-1105", "Rejects a malformed date string"));
  t.notOk(validator.isISO8601("2022-13-05", "Rejects a nonexistent month"));
  t.notOk(validator.isISO8601("2022-05-18T1:00:00", "Rejects without leading hour zero"));
  t.notOk(validator.isISO8601("2022-01-01T00:00:00+25:00", "Rejects a bad timezone offset"));
});
