'use strict';

import mongoose from 'mongoose';

var JournalSchema = new mongoose.Schema({
  'title': String,
  'abbreviation': String,
  'about': String,
  'aim-scope': String,
  'terms-conditions': String,
  'abstract-index': String
});

export default mongoose.model('Journal', JournalSchema);
