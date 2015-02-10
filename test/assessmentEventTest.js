/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

var test = require('tape');
var _ = require('lodash-node');
var util = require('util');
var jsonCompare = require('./testUtils');
var Event = require('../src/events/assessmentEvent');
var Person = require('../src/entities/lis/person');
var CourseSection = require('../src/entities/lis/courseSection');
var EPubVolume = require('../src/entities/reading/ePubVolume');
var Assessment = require('../src/entities/assessment/assessment');
var AssessmentItem = require('../src/entities/assessment/assessmentItem');
var Attempt = require('../src/entities/assignable/attempt');
var SoftwareApplication = require('../src/entities/softwareApplication');
var AssessmentActions = require('../src/actions/assessmentActions');

test('Create Assessment Event and validate attributes', function (t) {

  // Plan for N assertions
  t.plan(1);

  // The Actor for the Caliper Event
  var actor = new Person("https://some-university.edu/user/554433");
  actor.setDateCreated(1402965614516);
  actor.setDateModified(1402965614516);

  // The Action for the Caliper Event
  var action = AssessmentActions.STARTED;

  // The Object being interacted with by the Actor (Assessment)
  var eventObj = new Assessment("https://some-university.edu/politicalScience/2014/american-revolution-101/assessment1");
  eventObj.setName("American Revolution - Key Figures Assessment");
  eventObj.setIsPartOf("https://some-university.edu/politicalScience/2014/american-revolution-101");
  eventObj.setDateModified(1402965614516);
  eventObj.setDateCreated(1402965614516);
  eventObj.setDatePublished(1402965614516);
  eventObj.setDateToActivate(1402965614516);
  eventObj.setDateToShow(1402965614516);
  eventObj.setDateToStartOn(1402965614516);
  eventObj.setDateToSubmit(1402965614516);
  eventObj.setMaxAttempts(2);
  eventObj.setMaxSubmits(2);
  eventObj.setMaxScore(3.0);

  // The Assessment has three items
  var assessmentItem1 = new AssessmentItem("https://some-university.edu/politicalScience/2014/american-revolution-101/assessment1/item1");
  assessmentItem1.setName("Assessment Item 1");
  assessmentItem1.setIsPartOf("https://some-university.edu/politicalScience/2014/american-revolution-101/assessment1");
  assessmentItem1.setMaxAttempts(2);
  assessmentItem1.setMaxSubmits(2);
  assessmentItem1.setMaxScore(1.0);
  assessmentItem1.setDateCreated(0);
  assessmentItem1.setDateModified(0);
  var assessmentItem2 = new AssessmentItem("https://some-university.edu/politicalScience/2014/american-revolution-101/assessment1/item2");  
  assessmentItem2.setName("Assessment Item 2"); 
  assessmentItem2.setIsPartOf("https://some-university.edu/politicalScience/2014/american-revolution-101/assessment1");
  assessmentItem2.setMaxAttempts(2);
  assessmentItem2.setMaxSubmits(2);
  assessmentItem2.setMaxScore(1.0);
  assessmentItem2.setDateCreated(0);
  assessmentItem2.setDateModified(0);
  var assessmentItem3 = new AssessmentItem("https://some-university.edu/politicalScience/2014/american-revolution-101/assessment1/item3");  
  assessmentItem3.setName("Assessment Item 3"); 
  assessmentItem3.setIsPartOf("https://some-university.edu/politicalScience/2014/american-revolution-101/assessment1");
  assessmentItem3.setMaxAttempts(2);
  assessmentItem3.setMaxSubmits(2);
  assessmentItem3.setMaxScore(1.0);
  assessmentItem3.setDateCreated(0);
  assessmentItem3.setDateModified(0);

  eventObj.setAssessmentItems([assessmentItem1, assessmentItem2, assessmentItem3]);

  // The target object (frame) within the Event Object
  var targetObj = null;

  // The generated object (Attempt) within the Event Object
  var generatedObj = new Attempt("https://some-university.edu/politicalScience/2014/american-revolution-101/assessment1/attempt1");
  generatedObj.setName(null);
  generatedObj.setDescription(null);
  generatedObj.setDateCreated(1402965614516);
  generatedObj.setDateModified(0);
  generatedObj.setCount(1);
  generatedObj.setStartedAtTime(1402965614516);
  generatedObj.setEndedAtTime(0);
  generatedObj.setDuration(null);

  // The edApp that is part of the Learning Context
  var edApp = new SoftwareApplication("https://com.sat/super-assessment-tool");
  edApp.setName("Super Assessment Tool");
  edApp.setDateCreated(1402965614516);
  edApp.setDateModified(0);

  // The LIS Course Section for the Caliper Event
  var org = new CourseSection("https://some-university.edu/politicalScience/2014/american-revolution-101");
  org.setName("American Revolution 101");
  org.setDateCreated(1402965614516);
  org.setDateModified(1402965614516);
  org.setCourseNumber("AmRev-101");
  org.setLabel("Am Rev 101");
  org.setSemester("Spring-2014");

  // Assert that key attributes are the same
  var assessmentEvent = new Event();
  assessmentEvent.setActor(actor);
  assessmentEvent.setAction(action);
  assessmentEvent.setObject(eventObj);
  assessmentEvent.setTarget(targetObj);
  assessmentEvent.setGenerated(generatedObj);
  assessmentEvent.setEdApp(edApp);
  assessmentEvent.setLisOrganization(org);
  assessmentEvent.setStartedAtTime(1402965614516);

  console.log("Assessment Event = " + util.inspect(assessmentEvent));

  // Assert that JSON produced is the same
  jsonCompare('caliperAssessmentEvent', assessmentEvent, t);
})