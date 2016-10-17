'use strict';

import mongoose from 'mongoose';

var JournalSchema = new mongoose.Schema({
  'title': String,
  'abbreviation': String,
  'about': Object,
  'aim-scope': Object,
  'terms-conditions': Object,
  'abstract-index': Object,
  'editorial-board': Object,
  'rules': Object,
  'instructions': Object,
  'color': String
});

export default mongoose.model('Journal', JournalSchema);
