# IMS Global Learning Consortium, Inc.

# caliper-js

The [Caliper Analytics&reg; Specification](https://www.imsglobal.org/caliper/v1p1/caliper-spec-v1p1) provides a structured approach to describing, collecting and exchanging learning activity data at scale.  Establishing a common vocabulary for describing learning interactions is a central objective.  Promoting data interoperability, data sharing and data-informed decision making are also important goals.

Caliper also defines an application programming interface (the Sensor API&trade;) for marshalling and transmitting event data from instrumented applications to target endpoints for storage, analysis and use.  caliper-js is a reference implementation of the Sensor API&trade; written in Javascript.

## Branches
* __master__: stable, deployable branch that stores the official release history.  
* __develop__: unstable development branch.  Current work that targets a future release is merged to this branch.

## Tags
caliper-js releases are tagged and versioned MAJOR.MINOR.PATCH\[-label\] (e.g., 1.1.1).  Pre-release tags are identified with an extensions label (e.g., "1.2.0-RC01").  The tags are stored in this repository.

## Getting Started
1. *Read* the [Caliper Analytics&reg; Specification](https://www.imsglobal.org/caliper/v1p1/caliper-spec-v1p1).  
2. Fork the IMS Global caliper-js project to your Github account and clone your copy to a local development machine.  
3. Install [Node.js](https://nodejs.org/) and the Javascript package manager, [npm](https://www.npmjs.com/).  Consider using [nvm](https://github.com/creationix/nvm), a node version manager, to install Node.js and npm.   
4. Once npm is installed add the following packages:

```
npm install -g browserify
npm install grunt
npm install -g grunt-cli
``` 

### Building
From your local caliper-js directory run:

```
npm install
```

### Testing
Clone the IMS Global [caliper-common-fixtures](https://github.com/IMSGlobal/caliper-common-fixtures) repo at the same level as caliper-js. Then invoke Grunt, the Javascript task runner, to run the unit tests and build a caliper-js library file at `dist/caliperSensor-[MAJOR.MINOR.PATCH].js`. 

```
grunt
```

### Caliper Vocabulary
The [Caliper Analytics&reg; Specification](https://www.imsglobal.org/caliper/v1p1/caliper-spec-v1p1) defines a set of concepts, relationships and rules for describing learning activities. Each activity domain modeled is described in a profile. Each profile is composed of one or more `Event` types (e.g., `AssessmentEvent`, `NavigationEvent`). Each `Event` type is associated with a set of actions undertaken by learners, instructors, and others. Various `Entity` types representing people, groups, and resources are provided in order to better describe both the relationships established between participating entities and the contextual elements relevant to the interaction (e.g., `Assessment`, `Attempt`, `CourseSection`, `Person`).

### Creating Events and Entities
A Caliper `Event` describes the relationship established between two entities, one an `actor` and the other an `object`, formed as a result of a purposeful `action` undertaken by the actor at a particular moment in time and, optionally, situated within a given learning context.  Below is an example of an `AssessmentEvent` expressed as JSON-LD:

Example I: AssessmentEvent
```json
{
  "@context": "http://purl.imsglobal.org/ctx/caliper/v1p1",
  "id": "urn:uuid:27734504-068d-4596-861c-2315be33a2a2",
  "type": "AssessmentEvent",
  "actor": {
    "id": "https://example.edu/users/554433",
    "type": "Person"
  },
  "action": "Started",
  "object": {
    "id": "https://example.edu/terms/201801/courses/7/sections/1/assess/1",
    "type": "Assessment",
    "dateToStartOn": "2018-11-14T05:00:00.000Z",
    "dateToSubmit": "2018-11-18T11:59:59.000Z",
    "maxAttempts": 1,
    "maxScore": 25.0
  },
  "generated": {
    "id": "https://example.edu/terms/201801/courses/7/sections/1/assess/1/users/554433/attempts/1",
    "type": "Attempt",
    "assignee": "https://example.edu/users/554433",
    "assignable": "https://example.edu/terms/201801/courses/7/sections/1/assess/1",
    "count": 1,
    "dateCreated": "2018-11-15T10:15:00.000Z",
    "startedAtTime": "2018-11-15T10:15:00.000Z"
  },
  "eventTime": "2018-11-15T10:15:00.000Z",
  "edApp": "https://example.edu",
  "group": {
    "id": "https://example.edu/terms/201801/courses/7/sections/1",
    "type": "CourseSection",
    "courseNumber": "CPS 435-01",
    "academicSession": "Fall 2018"
  },
  "membership": {
    "id": "https://example.edu/terms/201801/courses/7/sections/1/rosters/1",
    "type": "Membership",
    "member": "https://example.edu/users/554433",
    "organization": "https://example.edu/terms/201801/courses/7/sections/1",
    "roles": ["Learner"],
    "status": "Active",
    "dateCreated": "2018-08-01T06:00:00.000Z"
  },
  "session": {
    "id": "https://example.edu/sessions/1f6442a482de72ea6ad134943812bff564a76259",
    "type": "Session",
    "user": "https://example.edu/users/554433",
    "startedAtTime": "2018-11-15T10:00:00.000Z",
    "extensions": {
      "request":  {
        "id": "d71016dc-ed2f-46f9-ac2c-b93f15f38fdc",
        "hostname": "example.edu",
        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36"
      }
    }
  }
}
```

Bear in the mind the following requirements illustrated by the above example:

* Caliper events and entity *describes* are serialized as JSON-LD documents.  Each document MUST be provisioned with a JSON-LD `@context` that references the remote IMS Caliper context document.  If you are unfamiliar with JSON-LD, consider pausing here and augmenting your Caliper knowledge by reading the [JSON-LD specification](http://json-ld.org/spec/latest/json-ld/).
* The `Event` properties `id`, `type`, `actor`, `action`, `object` and `eventTime`are required; all other properties are considered optional.  The `id` value MUST be expressed as a UUID using the form `urn:uuid:<UUID>` per RFC 4122.  A version 4 UUID SHOULD be generated.  The `type` value MUST match the term specified by Caliper (e.g., "AssessmentEvent", "MessageEvent", "NavigationEvent").
* Caliper permits `Entity` values to be expressed either as a JSON object or as a string corresponding to the resource's IRI.  If the `Entity` is expressed as an object, both the `id` and `type` properties MUST be specified; all other properties are considered optional.  The `id` value MUST be expressed as an IRI. A URI using the URN scheme MAY be provided although care should be taken when employing a location-independent identifier since it precludes the possibility of utilizing it to retrieve machine-readable data over HTTP.  The `type` value MUST match the term specified by Caliper (e.g., "Person", "Assessment", "Attempt", "CourseSection").
* Date/Time properties (e.g., `eventTime`, `dateCreated`, `startedAtTime`) Must be expressed as date and time values expressed with millisecond precision using the ISO 8601 format YYYY-MM-DDTHH:mm:ss.SSSZ set to UTC with no offset specified.
* Custom attributes not described by Caliper MAY be included but MUST be added to the `extensions` property as a map of key:value pairs. 
* Properties with a value of null or empty are excluded by caliper-js during serialization.

See the The [Caliper Analytics&reg; Specification](https://www.imsglobal.org/caliper/v1p1/caliper-spec-v1p1) for a complete description of requirements.

### Factory methods
caliper-js provides a couple of factory functions to simplify creating events and entities:

* *eventFactory()* returns a mutated `Event` object based on a caliper-js delegate to which is assigned an options object of user-provided key:value pairs. The function exposes a single method signature: *.create(delegate, opts)*.   
* *entityFactory()* returns a mutated `Entity` object based on a caliper-js delegate to which is assigned an options object of user-provided key:value pairs. The function exposes two method signatures: *.create(delegate, opts)* and *.coerce(delegate, opts)*.  Use the *.create(delegate, opts)* method to express a Caliper `Entity` as an object; use the *.coerce(delegate, opt)* method to express an `Entity` as a string that corresponds to its IRI.

#### Example II: Minting an `Assessment` entity expressed as an object
```javascript
var obj = entityFactory().create(Assessment, {
  id: "https://example.edu/terms/201801/courses/7/sections/1/assess/1",
  dateToStartOn: moment.utc("2018-08-16T05:00:00.000Z"),
  dateToSubmit: moment.utc("2018-09-28T11:59:59.000Z"),
  maxAttempts: 1,
  maxScore: 25.0
});
```

#### Example III: Minting a `SofwareApplication` entity expressed as a string 
```javascript
var edApp = entityFactory().coerce(SoftwareApplication, {id: "http://example.edu"});

```

### Using Envelopes (batching)
Caliper `Event` and `Entity` data MUST be transmitted inside a Caliper `Envelope`, a JSON data structure that includes metadata about the emitting application sensor and the data payload.  The `sensor`, `sendTime`, `dataVersion` and `data` properties are required.  The `data` array comprises an ordered collection of one or more Caliper `Event` and/or `Entity` *describe* documents.  Each `Event` and `Entity` describe transmitted inside an `Envelope` MUST be serialized as a JSON-LD document.

#### Example IV: Caliper Envelope (single ToolUseEvent data payload)
```json
{
  "sensor": "https://example.edu/sensors/1",
  "sendTime": "2016-11-15T11:05:01.000Z",
  "dataVersion": "http://purl.imsglobal.org/ctx/caliper/v1p1",
  "data": [{
    "@context": "http://purl.imsglobal.org/ctx/caliper/v1p1",
    "id": "urn:uuid:7e10e4f3-a0d8-4430-95bd-783ffae4d916",
    "type": "ToolUseEvent",
    "actor": {
      "id": "https://example.edu/users/554433",
      "type": "Person"
    },
    "action": "Used",
    "object": {
      "id": "https://example.edu",
      "type": "SoftwareApplication"
    },
    "eventTime": "2016-11-15T10:15:00.000Z",
    "edApp": "https://example.edu",
    "group": {
      "id": "https://example.edu/terms/201601/courses/7/sections/1",
      "type": "CourseSection",
      "courseNumber": "CPS 435-01",
      "academicSession": "Fall 2016"
    },
    "membership": {
      "id": "https://example.edu/terms/201601/courses/7/sections/1/rosters/1",
      "type": "Membership",
      "member": "https://example.edu/users/554433",
      "organization": "https://example.edu/terms/201601/courses/7/sections/1",
      "roles": ["Learner"],
      "status": "Active",
      "dateCreated": "2016-08-01T06:00:00.000Z"
    },
    "session": {
      "id": "https://example.edu/sessions/1f6442a482de72ea6ad134943812bff564a76259",
      "type": "Session",
      "startedAtTime": "2016-11-15T10:00:00.000Z"
    }
  }]
}

```

### Sending Envelopes
1. Initialize Sensor
2. Define HTTP options
3. Initialize and register one or more client instances.
4. Create Event(s) and/or Entity *describe(s)*
5. Create Envelope
6. Delegate transmission of Envelope to client.

```javascript
// Initialize Sensor
sensor.initialize("my_sensor_id");

// Override default HTTP options
options.uri = "https://caliper/target/endpoint";
options.headers["Authorization"] = "40dI6P62Q_qrWxpTk95z8w";

// Initialize and register client
client.initialize("my_client_id", options);
sensor.registerClient(client);

// Event property values (only required property assignments shown)
var actor = entityFactory().create(Person, {id: "https://example.edu/users/554433"});
var action = actions.started.term;
var obj = entityFactory().create(Assessment, {
  id: "https://example.edu/terms/201801/courses/7/sections/1/assess/1",
  dateToStartOn: moment.utc("2018-08-16T05:00:00.000Z"),
  dateToSubmit: moment.utc("2018-09-28T11:59:59.000Z"),
  maxAttempts: 1,
  maxScore: 25.0
});

// ... Perform additional Event property assignments ...

// Create Event and/or Entity describe
var event = EventFactory().create(AssessmentEvent, {
  id: id,
  actor: actor,
  action: action,
  object: obj,
  eventTime: new Date().toISOString(),
  edApp: edApp,
  group: group,
  membership: membership,
  session: session
});

// ... Create additional Events and/or Entity describes ...

// Create data payload
var payload = [];
payload.push(event);

// Envelope options
var opts = {
  sensor: sensor.id,
  sendTime: new Date().toISOString(),
  dataVersion: "http://purl.imsglobal.org/ctx/caliper/v1p1",
  data: payload
};

// Create envelope with data payload
var envelope = sensor.createEnvelope(opts);

// Delegate transmission responsibilities to client
sensor.sendToClient(client, envelope);
```



### Installing and using the Library:
Install and build the caliper-js library per the steps above.  Then reference the caliper-js library inside the \<head\> tag of your HTML file:

```html
<head> 
  <script src="[path to]/caliperSensor-1.1.1.js"></script>
</head>
```

## License
This project is licensed under the terms of the GNU Lesser General Public License (LGPL), version 3.  See the [LICENSE](./LICENSE) file for details.

©2018 IMS Global Learning Consortium, Inc. All Rights Reserved.
Trademark Information - http://www.imsglobal.org/copyright.html