'use strict';

import mongoose from 'mongoose';

var ArchiveSchema = new mongoose.Schema({
  journal: String,
  title: String,
  authors: String,
  year: Date,
  abstract: String,
  keywords: [String],
  references: [String],
  file: String
});

export default mongoose.model('Archive', ArchiveSchema);
