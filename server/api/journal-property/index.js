'use strict';

var express = require('express');
var controller = require('./journal-property.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', auth.isAuthenticated(), auth.hasRole('admin'), controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
