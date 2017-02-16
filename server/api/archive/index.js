'use strict';

var express = require('express');
var controller = require('./archive.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/journals/:journal', controller.getArchivesByJournalId);
router.get('/:id', controller.show);
router.post('/journals/:journal', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
