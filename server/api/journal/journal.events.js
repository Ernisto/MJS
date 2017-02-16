/**
 * Journal model events
 */

'use strict';

import {EventEmitter} from 'events';
var JournalEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
JournalEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Journal) {
  for (var e in events) {
    let event = events[e];
    Journal.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function (doc) {
    JournalEvents.emit(event + ':' + doc._id, doc);
    JournalEvents.emit(event, doc);
  };
}

export {registerEvents};
export default JournalEvents;
