/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/journals              ->  index
 * POST    /api/journals              ->  create
 * GET     /api/journals/:id          ->  show
 * PUT     /api/journals/:id          ->  upsert
 * PATCH   /api/journals/:id          ->  patch
 * DELETE  /api/journals/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Journal from './journal.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(updates) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, updates.patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }
    entity.markModified(updates.property);
    return entity.save();
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

// Gets a list of Journals
export function index(req, res) {
  return Journal.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Journal from the DB
export function show(req, res) {
  return Journal.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Journal from the DB by abbreviation
export function getJournalByAbbreviation(req, res) {
  return Journal.findOne({abbreviation: req.params.abbreviation}).populate('journal-properties').exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Journal in the DB
export function create(req, res) {
  return Journal.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Journal in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Journal.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Journal in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  var updates = req.body;

  return Journal.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(updates))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Journal from the DB
export function destroy(req, res) {
  return Journal.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
