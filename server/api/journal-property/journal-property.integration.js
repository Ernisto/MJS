'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newJournalProperty;

describe('JournalProperty API:', function() {
  describe('GET /api/journal-properties', function() {
    var journalPropertys;

    beforeEach(function(done) {
      request(app)
        .get('/api/journal-properties')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          journalPropertys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(journalPropertys).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/journal-properties', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/journal-properties')
        .send({
          name: 'New JournalProperty',
          info: 'This is the brand new journalProperty!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newJournalProperty = res.body;
          done();
        });
    });

    it('should respond with the newly created journalProperty', function() {
      expect(newJournalProperty.name).to.equal('New JournalProperty');
      expect(newJournalProperty.info).to.equal('This is the brand new journalProperty!!!');
    });
  });

  describe('GET /api/journal-properties/:id', function() {
    var journalProperty;

    beforeEach(function(done) {
      request(app)
        .get(`/api/journal-properties/${newJournalProperty._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          journalProperty = res.body;
          done();
        });
    });

    afterEach(function() {
      journalProperty = {};
    });

    it('should respond with the requested journalProperty', function() {
      expect(journalProperty.name).to.equal('New JournalProperty');
      expect(journalProperty.info).to.equal('This is the brand new journalProperty!!!');
    });
  });

  describe('PUT /api/journal-properties/:id', function() {
    var updatedJournalProperty;

    beforeEach(function(done) {
      request(app)
        .put(`/api/journal-properties/${newJournalProperty._id}`)
        .send({
          name: 'Updated JournalProperty',
          info: 'This is the updated journalProperty!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedJournalProperty = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedJournalProperty = {};
    });

    it('should respond with the updated journalProperty', function() {
      expect(updatedJournalProperty.name).to.equal('Updated JournalProperty');
      expect(updatedJournalProperty.info).to.equal('This is the updated journalProperty!!!');
    });

    it('should respond with the updated journalProperty on a subsequent GET', function(done) {
      request(app)
        .get(`/api/journal-properties/${newJournalProperty._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let journalProperty = res.body;

          expect(journalProperty.name).to.equal('Updated JournalProperty');
          expect(journalProperty.info).to.equal('This is the updated journalProperty!!!');

          done();
        });
    });
  });

  describe('PATCH /api/journal-properties/:id', function() {
    var patchedJournalProperty;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/journal-properties/${newJournalProperty._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched JournalProperty' },
          { op: 'replace', path: '/info', value: 'This is the patched journalProperty!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedJournalProperty = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedJournalProperty = {};
    });

    it('should respond with the patched journalProperty', function() {
      expect(patchedJournalProperty.name).to.equal('Patched JournalProperty');
      expect(patchedJournalProperty.info).to.equal('This is the patched journalProperty!!!');
    });
  });

  describe('DELETE /api/journal-properties/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/journal-properties/${newJournalProperty._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when journalProperty does not exist', function(done) {
      request(app)
        .delete(`/api/journal-properties/${newJournalProperty._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
