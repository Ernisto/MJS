/**
 * JournalProperty model events
 */

'use strict';

import {EventEmitter} from 'events';
var JournalPropertyEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
JournalPropertyEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(JournalProperty) {
  for(var e in events) {
    let event = events[e];
    JournalProperty.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    JournalPropertyEvents.emit(event + ':' + doc._id, doc);
    JournalPropertyEvents.emit(event, doc);
  };
}

export {registerEvents};
export default JournalPropertyEvents;
