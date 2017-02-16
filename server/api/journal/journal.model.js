'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './journal.events'

var JournalSchema = new mongoose.Schema({
  'title': Object,
  'abbreviation': String,
  'color': String,
  'journal-properties': [{type: mongoose.Schema.Types.ObjectId, ref: 'JournalProperty'}],
  // 'about': Object,
  'archives': [{type: mongoose.Schema.Types.ObjectId, ref: 'Archive'}],
  // 'aim-scope': Object,
  // 'terms-conditions': Object,
  // 'abstract-index': Object,
  // 'editorial-board': Object,
  // 'rules': Object,
  // 'instructions': Object
});

registerEvents(JournalSchema);

export default mongoose.model('Journal', JournalSchema);
