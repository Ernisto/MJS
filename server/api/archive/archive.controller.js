/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/archives              ->  index
 * POST    /api/archives              ->  create
 * GET     /api/archives/:id          ->  show
 * PUT     /api/archives/:id          ->  upsert
 * PATCH   /api/archives/:id          ->  patch
 * DELETE  /api/archives/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Archive from './archive.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

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

// Gets a list of Archives
export function index(req, res) {
  return Archive.find()
    .populate({
      path: 'journal', select: 'abbreviation color'
    })
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Get archives by journal
export function getArchivesByJournalId(req, res) {
  return Archive.find({'journal': req.params.journal}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Archive from the DB
export function show(req, res) {
  return Archive.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Archive in the DB
export function create(req, res) {
  return Archive.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Archive in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Archive.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Archive in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Archive.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Archive from the DB
export function destroy(req, res) {
  return Archive.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
