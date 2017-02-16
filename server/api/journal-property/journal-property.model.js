'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './journal-property.events';

var JournalPropertySchema = new mongoose.Schema({
  title: String,
  journal: {type: mongoose.Schema.Types.ObjectId, ref: 'Journal'},
  content: Object
});

registerEvents(JournalPropertySchema);
export default mongoose.model('JournalProperty', JournalPropertySchema);
