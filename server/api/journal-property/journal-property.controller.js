/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/journal-properties              ->  index
 * POST    /api/journal-properties              ->  create
 * GET     /api/journal-properties/:id          ->  show
 * PUT     /api/journal-properties/:id          ->  upsert
 * PATCH   /api/journal-properties/:id          ->  patch
 * DELETE  /api/journal-properties/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import JournalProperty from './journal-property.model';
import Log from '../log/log.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(update, userId) {
  var patches = [{
    op: "replace",
    path: `/content/${update.lang}`,
    value: update.value
  }];

  return function (entity) {
    if (entity.content[update.lang] == update.value) {
      return Promise.resolve({sameContent: true});
    }
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch (err) {
      return Promise.reject(err);
    }
    entity.markModified('content');
    return entity.save().then(function (doc) {
      Log.create({
        journal: doc.journal,
        property: doc._id,
        language: update.lang,
        user: userId,
        timestamp: Date.now(),
        content: update.value
      });
      return doc;
    });
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of JournalPropertys
export function index(req, res) {
  return JournalProperty.find().populate('user').exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single JournalProperty from the DB
export function show(req, res) {
  return JournalProperty.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new JournalProperty in the DB
export function create(req, res) {
  return JournalProperty.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given JournalProperty in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return JournalProperty.findOneAndUpdate({_id: req.params.id}, req.body, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
    runValidators: true
  }).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing JournalProperty in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return JournalProperty.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body, req.user._id))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a JournalProperty from the DB
export function destroy(req, res) {
  return JournalProperty.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
