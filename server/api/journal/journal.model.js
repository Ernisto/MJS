'use strict';

import mongoose from 'mongoose';

var JournalSchema = new mongoose.Schema({
  title: String,
  abbreviation: String,
  info: String,
  image: String
});

export default mongoose.model('Journal', JournalSchema);
