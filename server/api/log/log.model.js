'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './log.events';

var LogSchema = new mongoose.Schema({
  journal: { type : mongoose.Schema.ObjectId, ref : 'Journal' },
  property: { type : mongoose.Schema.ObjectId, ref : 'JournalProperty' },
  language: String,
  user: { type : mongoose.Schema.ObjectId, ref : 'User' },
  timestamp: {type: Date, default: Date.now()},
  content: String
});

registerEvents(LogSchema);
export default mongoose.model('Log', LogSchema);
