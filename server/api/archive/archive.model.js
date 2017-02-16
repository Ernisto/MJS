'use strict';

import mongoose from 'mongoose';

var ArchiveSchema = new mongoose.Schema({
  journal: { type : mongoose.Schema.Types.ObjectId, ref : 'Journal' },
  title: String,
  authors: [String],
  date: Date,
  abstract: String,
  keywords: [String],
  references: [String],
  file: String
});

export default mongoose.model('Archive', ArchiveSchema);
