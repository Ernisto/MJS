'use strict';

import mongoose from 'mongoose';

var ArchiveSchema = new mongoose.Schema({
  title: String,
  authors: [String],
  abstract: String,
  keywords: [String],
  references: [String]
});

export default mongoose.model('Archive', ArchiveSchema);
