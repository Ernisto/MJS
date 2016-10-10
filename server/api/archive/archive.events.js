/**
 * Archive model events
 */

'use strict';

import {EventEmitter} from 'events';
import Archive from './archive.model';
var ArchiveEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ArchiveEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Archive.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ArchiveEvents.emit(event + ':' + doc._id, doc);
    ArchiveEvents.emit(event, doc);
  };
}

export default ArchiveEvents;
